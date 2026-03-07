"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import TestHeader from './TestHeader';
import QuestionDisplay from './QuestionDisplay';
import TestSidebar from './TestSidebar';
import TestResults from './TestResults';

import { saveTestCodeAfterTestSubmission, sendTestAnalytic, sendUserScore } from '@/lib/actions/tests.actions';
import { TypeOfTest, STREAM } from '@/lib/schema/base.schema';
import { TQuestionInCustomTestSchema } from '@/lib/schema/questions.schema';
import { TCreateTestAnalytic, TCreateTestQuestionAnswer, TTestLockType } from '@/lib/schema/tests.schema';
import { TBaseUser } from '@/lib/schema/users.schema';

interface TestMainProps {
    id: string;
    testName: string;
    questions: TQuestionInCustomTestSchema[];
    user: TBaseUser | null;
    username: string;
    // Props carried over for backend logic
    testType?: TypeOfTest;
    stream?: STREAM;
    testCode?: string;
    lockType?: TTestLockType | null;
}

const TestMain: React.FC<TestMainProps> = ({ 
    id, testName, questions, user, username, testType, stream, testCode, lockType 
}) => {
    const TIME_PER_QUESTION = 54; // Seconds
    const NEGATIVEMARK = 0.25;
    const STORAGE_KEY = `TEST_SESSION_${id}`;
    const MAX_SAVED_TESTS = 5;

    const [isLoaded, setIsLoaded] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Core state
    const [userAnswers, setUserAnswers] = useState<Map<string, { uans: string, timetaken: number }>>(new Map());
    const [timeLeft, setTimeLeft] = useState(questions.length * TIME_PER_QUESTION);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Results state
    const [finalScore, setFinalScore] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [timeTaken, setTimeTaken] = useState(0);

    // --- 1. Storage Management ---
    const manageStorageLimit = useCallback(() => {
        const testKeys: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('TEST_SESSION_')) testKeys.push(key);
        }
        if (testKeys.length >= MAX_SAVED_TESTS) {
            const oldestTestKey = testKeys[0]; // Simplified FIFO
            localStorage.removeItem(oldestTestKey);
        }
    }, []);

    const clearStorage = useCallback(() => localStorage.removeItem(STORAGE_KEY), [STORAGE_KEY]);

    // --- 2. Hydration ---
    useEffect(() => {
        const savedDataString = localStorage.getItem(STORAGE_KEY);
        let initialTime = questions.length * TIME_PER_QUESTION;

        if (savedDataString) {
            try {
                const savedData = JSON.parse(savedDataString);
                setUserAnswers(new Map(savedData.userAnswer));
                initialTime = savedData.expiryTimestamp || initialTime;
            } catch (error) {
                console.error("Failed to parse saved session", error);
            }
        } else {
            manageStorageLimit();
        }

        setTimeLeft(initialTime);
        setIsLoaded(true);
    }, [STORAGE_KEY, questions.length, manageStorageLimit]);

    // --- 3. Submission Engine ---
    const submitForm = useCallback(async () => {
        if (isSubmitting || isSubmitted) return;
        setIsSubmitting(true);
        clearStorage();

        let total_timetaken = 0;
        let correct_questions_ids: string[] = [];
        let incorrect_questions_ids: string[] = [];
        let questions_ids_and_answers: TCreateTestQuestionAnswer[] = [];

        // Calculate Scores & Analytics
        questions.forEach((question) => {
            const userAnsData = userAnswers.get(question.id);
            const uans = userAnsData?.uans || '';
            const t_taken = userAnsData?.timetaken || 15; // default approx time

            questions_ids_and_answers.push({
                questionId: question.id,
                userAnswer: uans,
            });

            total_timetaken += t_taken;

            if (!uans) return;

            if (question.answer.toLowerCase() === uans.toLowerCase()) {
                correct_questions_ids.push(question.id);
            } else {
                incorrect_questions_ids.push(question.id);
            }
        });

        const score = correct_questions_ids.length - (incorrect_questions_ids.length * NEGATIVEMARK);
        
        setCorrectCount(correct_questions_ids.length);
        setFinalScore(score);
        setTimeTaken(total_timetaken);

        // Backend Communication
        try {
            if (lockType === 'CODE') {
                await saveTestCodeAfterTestSubmission(id, testCode);
            }
            if (testType === 'MODEL' || testType === 'MOCK') {
                await sendUserScore({ customTestId: id, username, totalScore: score });
            }
            if (user?.id) {
                console.log('sending test')
                await sendTestAnalytic({ customTestId: id, questionsWithAnswers: questions_ids_and_answers });
            }
        } catch (error) {
            console.error("Backend Sync Error:", error);
        }

        setIsSubmitted(true);
        setIsSubmitting(false);
        window.scrollTo(0, 0);
    }, [isSubmitting, isSubmitted, clearStorage, questions, userAnswers, lockType, id, testCode, testType, username, user?.id]);

    // --- 4. Timer & Auto-Submit ---
    useEffect(() => {
        if (!isLoaded || isSubmitted) return;
        
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    submitForm();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isLoaded, isSubmitted, submitForm]);

    // --- 5. Anti-Cheat (Tab Switch) ---
    useEffect(() => {
        if (testType !== 'MODEL' || isSubmitted || isSubmitting) return;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                console.warn("Tab switch detected. Auto-submitting...");
                submitForm();
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [testType, isSubmitted, isSubmitting, submitForm]);

    // --- 6. Input Handler ---
    const handleAnswerSelect = (questionId: string, ans: string) => {
        if (isSubmitting || isSubmitted) return;
        setIsSyncing(true);

        setUserAnswers((prev) => {
            const next = new Map(prev);
            next.set(questionId, { uans: ans.toLowerCase(), timetaken: 15 });

            // Save to LocalStorage
            const dataToSave = {
                expiryTimestamp: timeLeft,
                userAnswer: Array.from(next.entries()),
                lastUpdated: Date.now()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));

            setTimeout(() => setIsSyncing(false), 500);
            return next;
        });
    };

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (isSubmitted) {
        return (
            <div className="py-12 bg-slate-50 min-h-screen">
                <TestResults 
                    score={finalScore} 
                    totalQuestions={questions.length}
                    correctCount={correctCount} 
                    timeTaken={timeTaken}
                    testName={testName}
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 relative">
            
            {/* Syncing Indicator */}
            {isSyncing && (
                <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-white text-slate-800 px-4 py-2 rounded-full shadow-lg border border-slate-200 flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                        <span className="text-xs font-semibold">Syncing Progress...</span>
                    </div>
                </div>
            )}

            <TestHeader 
                testName={testName} 
                timeLeft={timeLeft} 
                answeredCount={userAnswers.size} 
                totalQuestions={questions.length} 
            />
            
            <main className="container mx-auto max-w-6xl px-4 py-6 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
                <div className="lg:col-span-8 bg-white border border-slate-200 p-5 md:p-8 rounded-2xl h-fit shadow-sm">
                    <QuestionDisplay 
                        question={questions[currentIndex]}
                        questionNumber={currentIndex + 1}
                        totalQuestions={questions.length}
                        selectedAnswer={userAnswers.get(questions[currentIndex].id)?.uans}
                        onAnswerSelect={handleAnswerSelect}
                        onNext={() => setCurrentIndex(i => Math.min(i + 1, questions.length - 1))}
                        onPrev={() => setCurrentIndex(i => Math.max(i - 1, 0))}
                    />
                </div>
                <aside className="lg:col-span-4 h-fit lg:sticky lg:top-24">
                    <div className="bg-white border border-slate-200 p-5 md:p-6 rounded-2xl shadow-sm">
                        <TestSidebar 
                            questions={questions}
                            userAnswers={userAnswers}
                            currentIndex={currentIndex}
                            onSelectQuestion={setCurrentIndex}
                            onSubmit={submitForm}
                            isSubmitting={isSubmitting}
                        />
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default TestMain;