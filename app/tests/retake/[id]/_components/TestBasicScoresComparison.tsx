// app/tests/retake/[id]/_components/TestBasicScoresComparison.tsx
import { Minus, TrendingDown, TrendingUp, Activity, History } from 'lucide-react';
import React from 'react';
import { TestBasicAnalysis } from './HelperComponents';

type Props = {
    total_timetaken: number;
    total_questions: number;
    questions_attempt: number;
    corrrect_attempt: number;
    new_total_timetaken: number;
    new_total_questions: number;
    new_questions_attempt: number;
    new_corrrect_attempt: number;
}

const StatComparison: React.FC<{ label: string; past: number; current: number; isIncorrect?: boolean }> = ({ label, past, current, isIncorrect = false }) => {
    const difference = current - past;
    let isImproved = isIncorrect ? difference < 0 : difference > 0;
    let isDeclined = isIncorrect ? difference > 0 : difference < 0;

    const textColorClass = isImproved ? 'text-emerald-600' : isDeclined ? 'text-rose-600' : 'text-slate-400';
    const icon = isImproved ? <TrendingUp className="w-4 h-4 text-emerald-500" /> : isDeclined ? <TrendingDown className="w-4 h-4 text-rose-500" /> : <Minus className="w-4 h-4 text-slate-300" />;

    return (
        <div className="flex justify-between items-center py-4 border-b border-slate-100 last:border-b-0">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{label}</span>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-mono">{past}</span>
                    <span className="text-slate-300">→</span>
                    <span className={`text-sm font-black font-mono ${textColorClass}`}>{current}</span>
                </div>
                <div className={`flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100 ${textColorClass}`}>
                    {icon}
                    <span className="text-[10px] font-bold tabular-nums">
                        {difference !== 0 ? `${difference > 0 ? '+' : ''}${difference}` : '0'}
                    </span>
                </div>
            </div>
        </div>
    );
};

const TestBasicScoresComparison = (props: Props) => {
    const { questions_attempt, corrrect_attempt, new_questions_attempt, new_corrrect_attempt } = props;

    const pastIncorrect = questions_attempt - corrrect_attempt;
    const pastScore = corrrect_attempt - (pastIncorrect * 0.25);
    const newIncorrect = new_questions_attempt - new_corrrect_attempt;
    const newScore = new_corrrect_attempt - (newIncorrect * 0.25);

    return (
        <div className="w-full flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Performance */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-blue-200 p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
                    <h2 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-6 flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Current Calibration
                    </h2>
                    <TestBasicAnalysis
                        total_questions={props.new_total_questions}
                        questions_attempt={props.new_questions_attempt}
                        corrrect_attempt={props.new_corrrect_attempt}
                    />
                </div>

                {/* Past Performance */}
                <div className="bg-slate-50 rounded-[2rem] border border-slate-200 p-6 relative overflow-hidden opacity-90">
                    <div className="absolute top-0 left-0 w-full h-1 bg-slate-300"></div>
                    <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                        <History className="w-4 h-4" /> Previous Calibration
                    </h2>
                    <TestBasicAnalysis
                        total_questions={props.total_questions}
                        questions_attempt={props.questions_attempt}
                        corrrect_attempt={props.corrrect_attempt}
                    />
                </div>
            </div>

            {/* Delta Analysis */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8">
                <h2 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-tight">
                    Delta <span className="text-blue-600">Analysis</span>
                </h2>
                <div className="space-y-1">
                    <StatComparison label="Total Attempted" past={questions_attempt} current={new_questions_attempt} />
                    <StatComparison label="Correct Nodes" past={corrrect_attempt} current={new_corrrect_attempt} />
                    <StatComparison label="Failed Nodes" past={pastIncorrect} current={newIncorrect} isIncorrect={true} />
                    <StatComparison label="Net Score" past={Math.round(pastScore * 100) / 100} current={Math.round(newScore * 100) / 100} />
                </div>
                
                {/* Visual Context  */}
            </div>
        </div>
    );
}

export default TestBasicScoresComparison;