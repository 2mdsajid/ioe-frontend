"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import { Target, CheckCircle, XCircle, Percent, LayoutGrid } from "lucide-react";
import Link from "next/link";

interface TestResultsProps {
    score: number;
    totalQuestions: number;
    correctCount: number;
    timeTaken: number;
    testName: string;
}

const TestResults: React.FC<TestResultsProps> = ({ 
    score, totalQuestions, correctCount, timeTaken, testName 
}) => {
    const accuracy = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;

    return (
        <div className="max-w-2xl mx-auto space-y-6 pt-10 text-slate-900">
            <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-xl text-center">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                    Simulation Report
                </span>
                
                <div className="my-8">
                    <div className="text-7xl font-black tracking-tighter text-slate-900">
                        {score.toFixed(0)}<span className="text-blue-600 text-2xl ml-1">/140</span>
                    </div>
                    <h2 className="text-sm font-bold text-slate-400 uppercase mt-2">{testName}</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    <ResultStat icon={Target} value={totalQuestions} label="Total" />
                    <ResultStat icon={CheckCircle} value={correctCount} label="Correct" color="text-emerald-500" />
                    <ResultStat icon={XCircle} value={totalQuestions - correctCount} label="Incorrect" color="text-rose-500" />
                    <ResultStat icon={Percent} value={`${accuracy.toFixed(0)}%`} label="Accuracy" />
                </div>
                
                <div className="mt-8">
                    <Button asChild className="bg-slate-900 hover:bg-blue-600 text-white font-black uppercase tracking-widest rounded-xl px-10 h-12 w-full">
                        <Link href="/dashboard" className="flex items-center gap-2">
                           <LayoutGrid className="w-4 h-4" /> Dashboard
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

const ResultStat = ({ icon: Icon, value, label, color = "text-blue-600" }: any) => (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center">
        <Icon className={`h-4 w-4 mb-2 ${color}`} />
        <div className="text-lg font-black">{value}</div>
        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</div>
    </div>
);

export default TestResults;