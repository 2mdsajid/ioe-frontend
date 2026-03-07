// app/tests/recent/_components/RecentTestsClientPage.tsx
'use client';

import Link from 'next/link';
import { TRecentTest } from '../page';
import { RotateCcw, History, Calendar, Target } from 'lucide-react';

export const RecentTestsClientPage = ({ tests }: { tests: TRecentTest[] }) => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Header Area */}
            <div className="border-b border-slate-200 pb-6 mb-8">
                <div className="flex items-center gap-3 mb-2 text-slate-900">
                    <History className="w-5 h-5 text-blue-600" />
                    <h1 className="text-2xl font-black tracking-tight uppercase">Simulation <span className="text-blue-600">Logs</span></h1>
                </div>
                <p className="text-slate-500 font-medium text-xs uppercase tracking-widest">Review historical performance and reinitialize past modules.</p>
            </div>

            {/* Diagnostic Logs List */}
            <div className="grid grid-cols-1 gap-3">
                {tests.map((test) => {
                    const accuracy = test.totalQuestions > 0 ? Math.round((test.score / test.totalQuestions) * 100) : 0;
                    
                    return (
                    <div 
                        key={test.id} 
                        className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                        {/* Left: Test Identity & Meta */}
                        <div className="flex-1">
                            <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight mb-2">
                                {test.name}
                            </h2>
                            <div className="flex flex-wrap items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                                <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                                    <Calendar className="w-3 h-3 text-blue-600" />
                                    {new Date(test.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </span>
                                <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                                    <Target className="w-3 h-3 text-blue-600" />
                                    {test.totalQuestions} Nodes
                                </span>
                            </div>
                        </div>

                        {/* Right: Analytics & Action */}
                        <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                            
                            {/* Replaced bulky ScoreCircle with a technical readout */}
                            <div className="text-right">
                                <div className="text-2xl font-black text-slate-900 tabular-nums leading-none">
                                    {test.score}<span className="text-[11px] text-slate-400 ml-1">/ {test.totalQuestions}</span>
                                </div>
                                <div className="text-[9px] font-black text-blue-600 uppercase tracking-widest mt-1.5">
                                    {accuracy}% Accuracy
                                </div>
                            </div>
                            
                            <div className="h-8 w-px bg-slate-200 hidden md:block"></div>

                            <Link 
                                href={`/tests/retake/${test.id}`} 
                                className="flex items-center justify-center gap-2 h-10 px-5 bg-slate-900 hover:bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-sm shrink-0"
                            >
                                Reinitialize <RotateCcw className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                )})}
            </div>
        </div>
    );
};