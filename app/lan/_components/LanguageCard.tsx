'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, Globe } from 'lucide-react';
import { LANGUAGE, TLanguageDetails } from '@/lib/schema/base.schema';

type Props = {
    details: TLanguageDetails[keyof TLanguageDetails];
    langKey: LANGUAGE;
    isSelected: boolean;
    onSelect: (language: LANGUAGE) => void;
};

const LanguageCard = ({ details, langKey, isSelected, onSelect }: Props) => {
    return (
        <button
            onClick={() => onSelect(langKey)}
            className={cn(
                "relative w-72 h-56 p-6 flex flex-col items-center justify-center text-center",
                "bg-white border-2 rounded-2xl shadow-lg cursor-pointer",
                "transition-all duration-300 ease-in-out transform",
                "hover:shadow-2xl hover:-translate-y-2 focus:outline-none",
                isSelected
                    ? "border-blue-600 ring-4 ring-blue-600/20"
                    : "border-gray-200 hover:border-blue-400"
            )}
        >
            {/* Selected Checkmark */}
            {isSelected && (
                <div className="absolute top-4 right-4 text-blue-600">
                    <CheckCircle2 className="w-7 h-7" />
                </div>
            )}
            
            <Globe className="w-12 h-12 mb-4 text-gray-400" />
            
            <h3 className="text-3xl font-bold text-slate-800">{details.title}</h3>
            <p className="mt-2 text-2xl font-semibold text-slate-600">{details.desc}</p>
        </button>
    );
};

export default LanguageCard;