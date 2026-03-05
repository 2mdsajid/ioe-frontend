"use client";
import React, { useState, useEffect, useCallback } from 'react';
import TestHeader from './TestHeader';
import QuestionDisplay from './QuestionDisplay';
import TestSidebar from './TestSidebar';
import TestResults from './TestResults';
import { TQuestionInCustomTestchema } from '@/lib/schema/questions.schema';
import { TBaseUser } from '@/lib/schema/users.schema';

interface TestMainProps {
    id: string;
    testName: string;
    questions: TQuestionInCustomTestchema[];
    user: TBaseUser | null;
    username: string;
}

const TestMain: React.FC<TestMainProps> = ({ id, testName, questions, user, username }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Map<string, { uans: string }>>(new Map());
    const [timeLeft, setTimeLeft] = useState(questions.length * 60);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitForm = useCallback(async () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitted(true);
            setIsSubmitting(false);
        }, 1500);
    }, []);

    useEffect(() => {
        if (isSubmitted) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => prev > 0 ? prev - 1 : (submitForm(), 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [isSubmitted, submitForm]);

    if (isSubmitted) {
        return (
            <div className="py-12 bg-slate-50 min-h-screen">
                <TestResults 
                    score={85} 
                    totalQuestions={questions.length}
                    correctCount={18} 
                    timeTaken={questions.length * 60 - timeLeft}
                    testName={testName}
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50"> {/* Changed from dark to light */}
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
                        onAnswerSelect={(id, ans) => setUserAnswers(new Map(userAnswers.set(id, { uans: ans })))}
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