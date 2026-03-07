// app/tests/retake/[id]/_components/ReTestMain.tsx
'use client'

import SubmitButton from '@/components/reusable/SubmitButton';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { sendTestAnalytic } from '@/lib/actions/tests.actions';
import { ANSWER, TypeOfTest } from '@/lib/schema/base.schema';
import { TQuestionInCustomTestSchema } from '@/lib/schema/questions.schema';
import { TCreateTestAnalytic, TCreateTestQuestionAnswer, TScoreBreakdown, TSubjectWiseChapterScores } from '@/lib/schema/tests.schema';
import { TBaseUser } from '@/lib/schema/users.schema';
import { CheckCircle, Send, Cpu, AlertTriangle, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ReTestAnalysis from './ReTestAnalysis';
import { ReTestQuestionsViewer, TestQuestionRender, TestTimer2 } from './HelperComponents';

type Props = {
    id: string;
    questions: TQuestionInCustomTestSchema[],
    testName: string;
    userid: string
    user: TBaseUser | null
    previousScore: TScoreBreakdown
    authToken?: string
    typeOfTest?: TypeOfTest | null
}

const ReTestMain = (props: Props) => {
    const router = useRouter()
    const submitref = useRef<HTMLButtonElement | null>(null)

    const TIME_PER_QUESTION = 540000
    const NEGATIVEMARK = 0.25

    const { id: testid, user, previousScore } = props

    const [timeout, setTimeout] = useState(0)
    const [currentcountdown, setCurrentCountdown] = useState(0)
    const [counttop, setCountTop] = useState(0)

    const [uquestions, setUquestions] = useState<TQuestionInCustomTestSchema[]>([])
    const [userAnswer, setUserAnswer] = useState<Map<string, { uans: string; timetaken: number }>>(new Map());

    const categorizeQuestionsBySubject = (questions: TQuestionInCustomTestSchema[]) => {
        return questions.reduce((acc, q) => {
            const sub = q.subject || 'Uncategorized';
            if (!acc[sub]) acc[sub] = [];
            acc[sub].push(q);
            return acc;
        }, {} as Record<string, TQuestionInCustomTestSchema[]>);
    }

    const [categorizedQuestions, setCategorizedQuestions] = useState(categorizeQuestionsBySubject(props.questions));
    const SUBJECTS = Object.keys(categorizedQuestions)

    const [questionsAttempt, setQuesitionsAttempt] = useState<string[]>([])
    const [correctAttempt, setCorrectAttempt] = useState<string[]>([])
    const [subjectWiseChapterScore, setSubjectWiseChapterScore] = useState<TSubjectWiseChapterScores>({})
    const [totalTimeTaken, setTotalTimeTaken] = useState(0)

    const [istestsubmitted, setIsTestSubmitted] = useState(false)
    const [issubmitclicked, setIsSubmitClicked] = useState(false)
    const [isAnswerReady, setIsAnswerReady] = useState(false)

    const submitForm = async () => {
        setIsSubmitClicked(true);

        let total_timetaken = 0;
        let correct_questions_ids = [] as string[]
        let incorrect_questions_ids = [] as string[]
        let subject_wise_chapter_scores = {} as TSubjectWiseChapterScores
        let test_analytic = {} as TCreateTestAnalytic
        let questions_ids_and_answers = [] as TCreateTestQuestionAnswer[]

        const mergedQuestions = uquestions.map((question) => {
            const userAnsData = userAnswer.get(question.id) || { uans: '', timetaken: 0 };
            return {
                ...question,
                uans: userAnsData.uans as ANSWER,
                timetaken: userAnsData.timetaken,
            };
        });

        setUquestions(mergedQuestions)

        mergedQuestions.forEach((question) => {
            questions_ids_and_answers.push({
                questionId: question.id,
                userAnswer: question.uans || '',
            });
            total_timetaken += question.timetaken;

            const subject = question.subject;
            const chapter = question.chapter;

            if (!subject || !chapter) return;

            if (!subject_wise_chapter_scores[subject]) subject_wise_chapter_scores[subject] = {};
            if (!subject_wise_chapter_scores[subject][chapter]) {
                subject_wise_chapter_scores[subject][chapter] = { total: 0, correct: 0, incorrect: 0, unattempt: 0 };
            }

            subject_wise_chapter_scores[subject][chapter].total++;

            if (!question.uans) {
                subject_wise_chapter_scores[subject][chapter].unattempt++;
                return;
            }

            if (question.answer.toLowerCase() === question.uans.toLowerCase()) {
                correct_questions_ids.push(question.id);
                subject_wise_chapter_scores[subject][chapter].correct++;
            } else {
                incorrect_questions_ids.push(question.id);
                subject_wise_chapter_scores[subject][chapter].incorrect++;
            }
        });

        setSubjectWiseChapterScore(subject_wise_chapter_scores);
        setTotalTimeTaken(total_timetaken)
        setCorrectAttempt(correct_questions_ids)

        setIsTestSubmitted(true)
        window.scrollTo(0, 0);

        if (user && user !== null && user.id) {
            test_analytic = { customTestId: testid, questionsWithAnswers: questions_ids_and_answers }
            await sendTestAnalytic(test_analytic)
        }
        setIsAnswerReady(true)
    };

    const checkAns = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (submitref.current) submitref.current.click();
        await submitForm();
    };

    const getInput = (value: string, id: string) => {
        if (issubmitclicked) return;
        const timetaken = counttop - currentcountdown;

        setUserAnswer((prev) => {
            const next = new Map(prev);
            next.set(id, { uans: value.toLowerCase(), timetaken: timetaken || 0 });
            return next;
        });
        setCountTop(currentcountdown);
        if (!questionsAttempt.includes(id)) setQuesitionsAttempt([...questionsAttempt, id]);
    };

    useEffect(() => {
        setUquestions(props.questions)
        setTimeout(TIME_PER_QUESTION * props.questions.length)
        setCountTop(TIME_PER_QUESTION * props.questions.length)
    }, [])

    return (
        <div className='w-full relative'>
            {istestsubmitted
                ? <div className='flex flex-col gap-8'>
                    <ReTestAnalysis
                        newCorrectAttempt={correctAttempt.length}
                        newQuestionsAttempt={questionsAttempt.length}
                        newTotalTimeTaken={totalTimeTaken}
                        totalQuestions={uquestions.length}
                        correctAttempt={previousScore.correct}
                        questionsAttempt={previousScore.total - previousScore.unattempt}
                        totalTimeTaken={totalTimeTaken}
                        subjectWiseChapterScore={subjectWiseChapterScore}
                        authToken={props.authToken}
                    />
                    {/* <ReTestQuestionsViewer questions={uquestions} /> */}
                </div>
                : <div className='w-full'>

                    {/* NEW STICKY HUD: Top-aligned, matches content width */}
                    <div className="sticky top-16 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm mb-8 py-3 rounded-b-2xl">
                        <div className="flex items-center justify-between gap-4 px-6">
                            
                            {/* Left: Timer */}
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-50 p-2 rounded-lg hidden sm:block">
                                    <Cpu className="w-5 h-5 text-blue-600" />
                                </div>
                                {/* {timeout > 0 && (
                                    <TestTimer2
                                        expiryTimestamp={timeout}
                                        onExpire={checkAns}
                                        onTick={setCurrentCountdown}
                                        className="text-lg md:text-2xl font-black text-slate-900 tracking-tighter tabular-nums"
                                    />
                                )} */}
                            </div>

                            {/* Right: Progress & Submit */}
                            <div className="flex items-center gap-4 md:gap-6">
                                <div className="flex items-center gap-2">
                                    <Target className="w-4 h-4 text-slate-400 hidden sm:block" />
                                    <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest hidden sm:inline">Attempted:</span>
                                    <span className='text-sm md:text-lg font-black text-blue-600 tabular-nums'>
                                        {questionsAttempt.length} <span className="text-slate-400 text-[10px] md:text-sm">/ {uquestions.length}</span>
                                    </span>
                                </div>

                                <Dialog>
                                    {!issubmitclicked && (
                                        <DialogTrigger ref={submitref} asChild>
                                            <button className="h-10 px-4 md:px-6 bg-slate-900 hover:bg-blue-600 text-white font-bold text-[10px] md:text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm">
                                                <Send className="w-3.5 h-3.5" /> 
                                                <span className="hidden sm:inline">Force Submit</span>
                                                <span className="sm:hidden">Submit</span>
                                            </button>
                                        </DialogTrigger>
                                    )}

                                    <DialogContent className="p-6 rounded-[2rem] shadow-2xl bg-white border border-slate-200">
                                        <div className="text-center mb-6">
                                            <AlertTriangle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Confirm Submission</h2>
                                        </div>
                                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex justify-between items-center mb-6">
                                            <div className="text-center">
                                                <p className="text-2xl font-black text-slate-900">{questionsAttempt.length}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Attempted</p>
                                            </div>
                                            <div className="w-px h-8 bg-slate-200"></div>
                                            <div className="text-center">
                                                <p className="text-2xl font-black text-rose-500">{uquestions.length - questionsAttempt.length}</p>
                                                <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Pending</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => submitForm()}
                                            disabled={issubmitclicked}
                                            className="w-full bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest py-4 rounded-xl shadow-md hover:bg-blue-700 transition disabled:opacity-50"
                                        >
                                            {issubmitclicked ? "Processing..." : "Execute Final Submission"}
                                        </button>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>

                    {/* Form Container */}
                    <form className="w-full space-y-12 pb-20" onSubmit={checkAns}>
                        {SUBJECTS.map((s, i) => (
                            <div key={s} className="bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-black">{i + 1}</div>
                                    <h2 className='text-xl font-black text-slate-900 uppercase tracking-tight'>{s}</h2>
                                </div>
                                <div className="space-y-6">
                                    {categorizedQuestions[s].map((question, index) => (
                                        <TestQuestionRender
                                            key={question.id}
                                            question={question}
                                            index={index}
                                            getInput={getInput}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </form>
                </div>}
        </div>
    )
}

export default ReTestMain