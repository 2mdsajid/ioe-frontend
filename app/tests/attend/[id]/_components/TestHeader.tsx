"use client";
import React from 'react';
import { Clock, Cpu, Activity } from "lucide-react";

interface TestHeaderProps {
    testName: string;
    timeLeft: number;
    answeredCount: number;
    totalQuestions: number;
}

const TestHeader: React.FC<TestHeaderProps> = ({ testName, timeLeft, answeredCount, totalQuestions }) => {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const progress = (answeredCount / totalQuestions) * 100;

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 h-14 flex items-center shadow-sm">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    {/* <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                        <Cpu className="h-4 w-4" />
                    </div> */}
                    <h1 className="text-sm font-black uppercase tracking-tighter text-slate-900 truncate max-w-[120px] md:max-w-none">
                        {testName}
                    </h1>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex flex-col items-end gap-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase">Load Progress</span>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 px-3 py-1.5 rounded-lg shadow-sm">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="text-xs font-black tabular-nums">{formatTime(timeLeft)}</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TestHeader;