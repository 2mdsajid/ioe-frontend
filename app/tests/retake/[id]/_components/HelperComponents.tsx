// app/tests/retake/[id]/_components/MissingComponents.tsx
import React, { useEffect } from 'react';
import { Clock, CheckCircle2, Target, XCircle } from 'lucide-react';

// 1. Timer
export const TestTimer2 = ({ expiryTimestamp, onExpire, onTick }: any) => {
    const [timeLeft, setTimeLeft] = React.useState(expiryTimestamp);

    useEffect(() => {
        if (timeLeft <= 0) { onExpire(); return; }
        const interval = setInterval(() => {
            setTimeLeft((prev: number) => {
                onTick(prev - 1000);
                return prev - 1000;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);

    const format = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    return (
        <div className="text-2xl font-black text-slate-900 tabular-nums tracking-tighter flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" /> {format(timeLeft)}
        </div>
    );
}

// 2. Question Renderer (Simplified)
export const TestQuestionRender = ({ question, index, getInput }: any) => {
    const [selected, setSelected] = React.useState<string | null>(null);

    return (
        <div className="pb-6 border-b border-slate-100 last:border-0">
            <div className="flex gap-4">
                <span className="text-xs font-black text-slate-400 mt-1">Q{index + 1}.</span>
                <div className="w-full">
                    <div className="text-sm font-bold text-slate-900 mb-4" dangerouslySetInnerHTML={{ __html: question.question }} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Object.entries(question.options).map(([key, val]: any) => (
                            <button
                                key={key} type="button"
                                onClick={() => { setSelected(key); getInput(key, question.id); }}
                                className={`text-left p-4 rounded-xl border text-sm transition-all flex items-center gap-3
                                    ${selected === key ? 'bg-blue-50 border-blue-600 shadow-sm' : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50'}`}
                            >
                                <span className={`w-6 h-6 flex items-center justify-center rounded-md text-[10px] font-black uppercase
                                    ${selected === key ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>{key}</span>
                                <span className={selected === key ? 'font-bold text-blue-900' : 'font-medium text-slate-700'}>{val}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. Post-Test Basic Analysis
export const TestBasicAnalysis = ({ total_questions, questions_attempt, corrrect_attempt }: any) => {
    const incorrect = questions_attempt - corrrect_attempt;
    const accuracy = questions_attempt > 0 ? Math.round((corrrect_attempt / questions_attempt) * 100) : 0;
    
    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Attempted</p>
                <p className="text-2xl font-black text-slate-900">{questions_attempt} <span className="text-xs text-slate-400">/ {total_questions}</span></p>
            </div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Accuracy</p>
                <p className="text-2xl font-black text-blue-600">{accuracy}%</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mb-1" />
                <p className="text-lg font-black text-emerald-700">{corrrect_attempt}</p>
            </div>
            <div className="bg-rose-50 p-3 rounded-xl border border-rose-100">
                <XCircle className="w-4 h-4 text-rose-500 mb-1" />
                <p className="text-lg font-black text-rose-700">{incorrect}</p>
            </div>
        </div>
    );
}

// 4. Chapterwise Table & Viewer (Placeholders)
export const TestChapterwiseScoreTable = ({ data }: any) => <div className="p-6 bg-white border border-slate-200 rounded-[2rem] shadow-sm"><p className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Module Breakdown Loaded</p></div>;
export const ReTestQuestionsViewer = ({ questions }: any) => <div className="p-6 bg-white border border-slate-200 rounded-[2rem] shadow-sm"><p className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Diagnostic Key Loaded</p></div>;