"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, Zap } from "lucide-react";
import { TQuestionInCustomTestSchema } from "@/lib/schema/questions.schema";

interface TestSidebarProps {
    questions: TQuestionInCustomTestSchema[];
    userAnswers: Map<string, { uans: string }>;
    currentIndex: number;
    onSelectQuestion: (index: number) => void;
    onSubmit: () => void;
    isSubmitting: boolean;
}

const TestSidebar: React.FC<TestSidebarProps> = ({
    questions, userAnswers, currentIndex, onSelectQuestion, onSubmit, isSubmitting,
}) => {
    return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Node Grid</h3>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {userAnswers.size} / {questions.length}
                </span>
            </div>
            
            <div className="grid grid-cols-6 lg:grid-cols-5 gap-1.5">
                {questions.map((q, index) => {
                    const isAnswered = userAnswers.has(q.id);
                    const isCurrent = currentIndex === index;

                    return (
                        <button
                            key={q.id}
                            onClick={() => onSelectQuestion(index)}
                            className={`h-8 rounded-lg font-black text-[10px] transition-all border
                                ${isCurrent ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200" : 
                                  isAnswered ? "bg-emerald-50 text-emerald-600 border-emerald-200" : 
                                  "bg-white text-slate-400 border-slate-200 hover:border-blue-400"}`}
                        >
                            {index + 1}
                        </button>
                    );
                })}
            </div>

            <Button
                onClick={onSubmit}
                disabled={isSubmitting}
                className="w-full h-11 bg-slate-900 hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-[10px] rounded-xl transition-all shadow-lg shadow-slate-200"
            >
                {isSubmitting ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                    <span className="flex items-center gap-2">
                        Submit Protocol <Zap className="h-3.5 w-3.5 fill-current" />
                    </span>
                )}
            </Button>
        </div>
    );
};

export default TestSidebar;