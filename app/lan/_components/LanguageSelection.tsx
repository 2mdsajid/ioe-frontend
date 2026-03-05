'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import LanguageCard from './LanguageCard';
import { LANGUAGE_DETAILS } from '@/lib/data/global.data';
import { LANGUAGE } from '@/lib/schema/base.schema';
import { setUserLanguage } from '@/lib/actions/language.actions';

type Props = {
    ru: string; // The redirect URL
};

const LanguageSelection = ({ ru }: Props) => {
    const router = useRouter();
    const [selectedLanguage, setSelectedLanguage] = useState<LANGUAGE | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleProceed = async () => {
        if (!selectedLanguage) return;

        setIsLoading(true);
        const promise = setUserLanguage(selectedLanguage);

        toast.promise(promise, {
            loading: 'Saving your preference...',
            success: (data) => {
                router.push(ru || '/dashboard');
                return 'Language saved successfully!';
            },
            error: 'Failed to save language. Please try again.',
            finally: () => {
                setIsLoading(false);
            }
        });
    };

    return (
        <div className="flex flex-col items-center gap-10">
            {/* Language Cards */}
            <div className="flex flex-col sm:flex-row items-center gap-8">
                <LanguageCard
                    details={LANGUAGE_DETAILS.en}
                    langKey="en"
                    isSelected={selectedLanguage === 'en'}
                    onSelect={setSelectedLanguage}
                />
                <LanguageCard
                    details={LANGUAGE_DETAILS.np}
                    langKey="np"
                    isSelected={selectedLanguage === 'np'}
                    onSelect={setSelectedLanguage}
                />
            </div>

            {/* Confirmation Button */}
            <div className="w-full max-w-xs">
                <Button
                    onClick={handleProceed}
                    disabled={!selectedLanguage || isLoading}
                    className="w-full h-14 text-lg font-semibold"
                    size="lg"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        'Confirm and Proceed'
                    )}
                </Button>
            </div>
        </div>
    );
};

export default LanguageSelection;