'use client';

import { startDifficultyTest } from '@/lib/actions/tests.actions';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { DifficultyButton, Spinner } from './HelperComponents';
import { TTotalQuestionsPerSubject } from '@/lib/schema/questions.schema';
import { toast } from 'sonner';
import { Settings2, Minus, Plus, Zap, Target } from 'lucide-react';

export const DifficultyTestForm = ({ subjectsData }: { subjectsData: TTotalQuestionsPerSubject[] }) => {
    const router = useRouter();
    const [selectedSubject, setSelectedSubject] = useState<string>('');
    const [selectedLevel, setSelectedLevel] = useState<'e' | 'm' | 'h' | null>(null);
    const [numQuestions, setNumQuestions] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const QUESTION_LIMIT = 50;
    const MIN_QUESTIONS = 10;

    const handleSubjectChange = (subject: string) => {
        setSelectedSubject(subject);
        setSelectedLevel(null);
        setNumQuestions(MIN_QUESTIONS);
    };

    const handleLevelSelect = (level: 'e' | 'm' | 'h') => {
        setSelectedLevel(level);
    };

    const maxQuestionsForCurrentSubject = Math.min(
        subjectsData.find(s => s.subject === selectedSubject)?.count || QUESTION_LIMIT,
        QUESTION_LIMIT
    );

    const handleCountChange = (value: number) => {
        const validValue = Math.max(MIN_QUESTIONS, Math.min(value, maxQuestionsForCurrentSubject));
        setNumQuestions(validValue);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSubject) return toast.error('Configuration Error', { description: 'Please select a target subject.' });
        if (!selectedLevel) return toast.error('Configuration Error', { description: 'Please define difficulty parameters.' });
        if (numQuestions < MIN_QUESTIONS) return toast.error('Node Deficit', { description: `Minimum ${MIN_QUESTIONS} questions required.` });

        setIsLoading(true);

        const { data: testId, message } = await startDifficultyTest(selectedLevel, numQuestions, selectedSubject);

        if (!testId) {
            toast.error("Initialization Failed", { description: message });
            setIsLoading(false);
        } else {
            toast.success('Simulation Ready');
            router.push(`/tests/view/${testId}`);
        }
    };

    const formatName = (name: string) => name.charAt(0).toUpperCase() + name.slice(1).replaceAll('_', ' ');

    return (
        <div className="w-full space-y-8">           
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm space-y-8">

                {/* Step 1: Subject Selection Grid (Replaces Select Dropdown) */}
                <div>
                    <div className="flex items-center gap-2 mb-4 text-slate-900">
                        <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">1</div>
                        <h2 className="text-xs font-black uppercase tracking-widest">Select Target Module</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {subjectsData.map(subjectInfo => (
                            <button
                                key={subjectInfo.subject}
                                type="button"
                                onClick={() => handleSubjectChange(subjectInfo.subject)}
                                disabled={isLoading}
                                className={`py-4 px-3 rounded-xl border text-xs font-bold uppercase tracking-tight transition-all duration-200
                                    ${selectedSubject === subjectInfo.subject
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                                        : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                                    }`}
                            >
                                {formatName(subjectInfo.subject)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Step 2: Difficulty Selection */}
                <div className={`transition-all duration-500 ${!selectedSubject ? 'opacity-30 pointer-events-none grayscale' : ''}`}>
                    <div className="flex items-center gap-2 mb-4 text-slate-900 pt-6 border-t border-slate-100">
                        <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">2</div>
                        <h2 className="text-xs font-black uppercase tracking-widest">Define Parameters</h2>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <DifficultyButton label="Standard" onClick={() => handleLevelSelect('e')} isActive={selectedLevel === 'e'} disabled={isLoading || !selectedSubject} />
                        <DifficultyButton label="Advanced" onClick={() => handleLevelSelect('m')} isActive={selectedLevel === 'm'} disabled={isLoading || !selectedSubject} />
                        <DifficultyButton label="Complex" onClick={() => handleLevelSelect('h')} isActive={selectedLevel === 'h'} disabled={isLoading || !selectedSubject} />
                    </div>
                </div>

                {/* Step 3: Volume Slider */}
                <div className={`transition-all duration-500 ${(!selectedSubject || !selectedLevel) ? 'opacity-30 pointer-events-none grayscale' : ''}`}>
                    <div className="flex items-center justify-between mb-4 pt-6 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-slate-900">
                            <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">3</div>
                            <h2 className="text-xs font-black uppercase tracking-widest">Node Volume</h2>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Max: {maxQuestionsForCurrentSubject}</span>
                    </div>

                    <div className="flex flex-col gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <div className="flex justify-between items-center">
                            <button
                                type="button"
                                onClick={() => handleCountChange(numQuestions - 1)}
                                disabled={numQuestions <= MIN_QUESTIONS || isLoading}
                                className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-300 rounded-xl disabled:opacity-30 transition-all shadow-sm"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <div className="text-4xl font-black text-slate-900 tabular-nums tracking-tighter">
                                {numQuestions}
                            </div>
                            <button
                                type="button"
                                onClick={() => handleCountChange(numQuestions + 1)}
                                disabled={numQuestions >= maxQuestionsForCurrentSubject || isLoading}
                                className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-300 rounded-xl disabled:opacity-30 transition-all shadow-sm"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <input
                            type="range"
                            min={MIN_QUESTIONS}
                            max={maxQuestionsForCurrentSubject}
                            value={numQuestions}
                            onChange={(e) => handleCountChange(parseInt(e.target.value, 10))}
                            disabled={isLoading}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>
                </div>

                {/* Submit Action */}
                <div className="pt-6 border-t border-slate-100">
                    <button
                        type="submit"
                        disabled={isLoading || !selectedSubject || !selectedLevel || numQuestions < MIN_QUESTIONS}
                        className="w-full h-14 flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-[11px] rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-40 disabled:hover:bg-slate-900"
                    >
                        {isLoading ? <Spinner /> : <><Zap className="w-4 h-4 fill-current" /> Initialize Calibration Test</>}
                    </button>
                </div>
            </form>
        </div>
    );
};