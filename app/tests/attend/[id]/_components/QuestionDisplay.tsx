"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { TQuestionInCustomTestchema } from "@/lib/schema/questions.schema";
import { ParsedElement } from '@/lib/utils';

interface QuestionDisplayProps {
    question: TQuestionInCustomTestchema;
    questionNumber: number;
    totalQuestions: number;
    selectedAnswer?: string;
    onAnswerSelect: (questionId: string, answer: string) => void;
    onNext: () => void;
    onPrev: () => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
    question, questionNumber, totalQuestions, selectedAnswer, onAnswerSelect, onNext, onPrev,
}) => {
    return (
        <div className="space-y-6 text-slate-900">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-blue-600 text-white rounded-md text-[9px] font-black uppercase tracking-widest">
                        Qn {questionNumber}
                    </span>
                    <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded-md text-[9px] font-bold text-slate-500 uppercase">
                        {1} Mark
                    </span>
                </div>
                <div className="h-px flex-grow bg-slate-100 ml-4" />
            </div>

            <p className="text-lg md:text-xl font-bold tracking-tight leading-tight">
                {ParsedElement(question.question)}
            </p>

            <div className="grid grid-cols-1 gap-2.5">
                {Object.entries(question.options).map(([key, value]) => {
                    const isSelected = selectedAnswer === key;
                    return (
                        <button
                            key={key}
                            onClick={() => onAnswerSelect(question.id, key)}
                            className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left
                                ${isSelected 
                                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200" 
                                    : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
                                }`}
                        >
                            <span className={`w-7 h-7 flex-shrink-0 rounded-lg flex items-center justify-center font-black text-xs
                                ${isSelected ? "bg-white/20" : "bg-slate-50 text-blue-600 border border-slate-100"}`}>
                                {key}
                            </span>
                            <span className="font-bold text-sm md:text-base">{value}</span>
                        </button>
                    );
                })}
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
                <Button variant="ghost" onClick={onPrev} disabled={questionNumber === 1} className="text-slate-400 hover:text-blue-600 font-bold text-[10px] uppercase">
                    <ChevronLeft className="mr-1 h-4 w-4" /> Prev
                </Button>
                <Button onClick={onNext} disabled={questionNumber === totalQuestions} className="bg-slate-900 text-white hover:bg-blue-600 font-bold uppercase text-[10px] px-8 h-10 rounded-lg">
                    Proceed <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default QuestionDisplay;