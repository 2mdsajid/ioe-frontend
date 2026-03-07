'use client';

import { toast } from 'sonner';
import { startCustomTest } from '@/lib/actions/tests.actions';
import { CustomTestQuestionCounts, CustomTestSelections, TTotalQuestionsPerSubjectAndChapter } from '@/lib/schema/tests.schema';
import { useRouter } from 'next/navigation';
import React, { useState, useMemo } from 'react';
import { Checkbox, QuestionInput, Spinner } from './HelperComponents';
import { Zap, LayoutGrid, Info, Filter } from 'lucide-react';

export const CustomTestForm = ({ allQuestionsData }: { allQuestionsData: TTotalQuestionsPerSubjectAndChapter }) => {
    const router = useRouter();
    const [selections, setSelections] = useState<CustomTestSelections>({});
    const [questionCounts, setQuestionCounts] = useState<CustomTestQuestionCounts>({});
    const [isLoading, setIsLoading] = useState(false);

    const { subjectTotals, grandTotal } = useMemo(() => {
        let grandTotal = 0;
        const subjectTotals: { [subject: string]: number } = {};
        for (const subject in questionCounts) {
            let subjectTotal = 0;
            const chapters = questionCounts[subject];
            for (const chapter in chapters) {
                subjectTotal += Number(chapters[chapter]) || 0;
            }
            subjectTotals[subject] = subjectTotal;
            grandTotal += subjectTotal;
        }
        return { subjectTotals, grandTotal };
    }, [questionCounts]);

    const handleSubjectToggle = (subject: string) => {
        setSelections(prev => {
            const newSelections = { ...prev };
            newSelections[subject] ? delete newSelections[subject] : newSelections[subject] = {};
            return newSelections;
        });
        // Clear counts if subject is unchecked
        setQuestionCounts(prev => {
            const newCounts = { ...prev };
            delete newCounts[subject];
            return newCounts;
        });
    };

    const handleChapterToggle = (subject: string, chapter: string) => {
        setSelections(prev => {
            const newSelections = { ...prev };
            const newChapters = { ...(newSelections[subject] || {}) };
            newChapters[chapter] ? delete newChapters[chapter] : newChapters[chapter] = true;
            newSelections[subject] = newChapters;
            return newSelections;
        });
        // Clear counts if chapter is unchecked
        setQuestionCounts(prev => {
            const newCounts = { ...prev };
            if (newCounts[subject]) delete newCounts[subject][chapter];
            return newCounts;
        });
    };

    const handleCountChange = (subject: string, chapter: string, count: number) => {
        const maxQuestions = allQuestionsData[subject]?.[chapter] ?? 0;
        const validCount = Math.max(0, Math.min(count, maxQuestions));
        setQuestionCounts(prev => ({
            ...prev,
            [subject]: { ...prev[subject], [chapter]: validCount }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation: 10 to 150 rule
        if (grandTotal < 10) {
            toast.error('Node Deficit', { description: 'A minimum of 10 nodes is required for system simulation.'});
            return;
        }
        if (grandTotal > 150) {
            toast.error('System Overflow', { description: 'Maximum allowed is 150 nodes per simulation.'});
            return;
        }

        setIsLoading(true);

        // Sanitize Payload: Only send chapters that have at least 1 question selected
        const payload: CustomTestQuestionCounts = {};
        for (const sub in questionCounts) {
            for (const chap in questionCounts[sub]) {
                const count = questionCounts[sub][chap];
                if (count && count > 0) {
                    if (!payload[sub]) payload[sub] = {};
                    payload[sub][chap] = count;
                }
            }
        }

        const { data: testId, message } = await startCustomTest(payload);
        
        if (!testId) {
            toast.error("Initialization failed.", { description: message });
        } else {
            toast.success('Simulation Ready');
            router.push(`/tests/view/${testId}`);
        }
        setIsLoading(false);
    };

    // Helper for clean string formatting
    const formatName = (name: string) => name ? name.charAt(0).toUpperCase() + name.slice(1).replaceAll('_', ' ') : '';

    return (
        <div className="container mx-auto max-w-6xl px-6">
            <div className="flex flex-col md:flex-row gap-8 items-start">

                {/* Left: Configuration Area */}
                <div className="w-full md:w-2/3 space-y-6">
                    <div className="mb-8 border-b border-slate-200 pb-6">
                        <div className="flex items-center gap-3 mb-2 text-slate-900">
                            <Filter className="w-5 h-5 text-blue-600" />
                            <h1 className="text-2xl font-black tracking-tight uppercase">Simulation <span className="text-blue-600">Configurator</span></h1>
                        </div>
                        <p className="text-slate-500 font-medium text-xs uppercase tracking-widest">Select targets and define volume via the terminal.</p>
                    </div>

                    <form id="custom-test-form" onSubmit={handleSubmit} className="space-y-4">
                        {Object.keys(allQuestionsData).map(subject => (
                            <div key={subject} className="bg-white border border-slate-200 p-6 rounded-[1.5rem] shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-center justify-between pb-4">
                                    <Checkbox
                                        id={subject}
                                        label={formatName(subject)}
                                        checked={!!selections[subject]}
                                        onChange={() => handleSubjectToggle(subject)}
                                    />
                                    {selections[subject] && (
                                        <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-widest border border-blue-100">
                                            Active
                                        </span>
                                    )}
                                </div>
                                
                                {selections[subject] && (
                                    <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                        {Object.keys(allQuestionsData[subject]).map(chapter => (
                                            <div key={chapter} className="bg-slate-50 p-3 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                                                <Checkbox
                                                    id={`${subject}-${chapter}`}
                                                    label={`${formatName(chapter)} (${allQuestionsData[subject][chapter]})`}
                                                    checked={!!selections[subject]?.[chapter]}
                                                    onChange={() => handleChapterToggle(subject, chapter)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </form>
                </div>

                {/* Right: Diagnostic Summary (Sticky) */}
                <div className="w-full md:w-1/3 md:sticky md:top-28">
                    <div className="bg-white border border-slate-200 p-6 rounded-[1.5rem] shadow-sm">
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 text-slate-900">
                            <LayoutGrid className="w-4 h-4 text-blue-600" />
                            <h2 className="text-xs font-black uppercase tracking-widest">Payload Summary</h2>
                        </div>

                        <div className="space-y-6 min-h-[150px] max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {Object.keys(selections).length === 0 ? (
                                <div className="text-center py-8 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50">
                                    <Info className="w-5 h-5 text-slate-300 mx-auto mb-2" />
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Awaiting Selection</p>
                                </div>
                            ) : (
                                Object.keys(selections).map(subject => {
                                    const selectedChapters = Object.keys(selections[subject] || {});
                                    if (selectedChapters.length === 0) return null;

                                    return (
                                        <div key={subject} className="space-y-3">
                                            <div className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                                                <h3 className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{formatName(subject)}</h3>
                                                <span className="text-[9px] font-bold text-slate-500 tabular-nums">Subtotal: {subjectTotals[subject] || 0}</span>
                                            </div>
                                            <div className="px-1">
                                                {selectedChapters.map(chapter => (
                                                    <QuestionInput
                                                        key={chapter}
                                                        label={formatName(chapter)}
                                                        max={allQuestionsData[subject][chapter]}
                                                        value={questionCounts[subject]?.[chapter] || 0}
                                                        onChange={(val) => handleCountChange(subject, chapter, val)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-200">
                            <div className="flex justify-between items-center mb-4 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Nodes</span>
                                <span className={`text-xl font-black tabular-nums 
                                    ${grandTotal < 10 || grandTotal > 150 ? 'text-rose-500' : 'text-blue-600'}
                                `}>
                                    {grandTotal} <span className="text-[10px] text-slate-400">/ 150</span>
                                </span>
                            </div>

                            <button
                                form="custom-test-form"
                                type="submit"
                                disabled={isLoading || grandTotal < 10 || grandTotal > 150}
                                className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-40 disabled:hover:bg-slate-900 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest"
                            >
                                {isLoading ? <Spinner /> : <><Zap className="w-3.5 h-3.5 fill-current" /> Initialize Module</>}
                            </button>

                            {/* Warning States */}
                            {grandTotal < 10 && Object.keys(selections).length > 0 && (
                                <p className="mt-3 text-[9px] text-rose-500 font-black text-center uppercase tracking-tighter">
                                    System Error: Minimum 10 Nodes Required
                                </p>
                            )}
                            {grandTotal > 150 && (
                                <p className="mt-3 text-[9px] text-rose-500 font-black text-center uppercase tracking-tighter">
                                    System Overflow: Maximum 150 Nodes Allowed
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};