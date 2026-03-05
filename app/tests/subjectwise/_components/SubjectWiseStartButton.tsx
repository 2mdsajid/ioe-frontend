'use client'

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Zap } from 'lucide-react'
import { startSubjectWiseTest } from '@/lib/actions/tests.actions'
import { toast } from 'sonner'
import { LANGUAGE } from '@/lib/schema/base.schema'

type Props = {
    slug: string
    name: string
    locale: LANGUAGE
}

const SubjectWiseStartButton = ({ name, slug , locale,}: Props) => {
    const router = useRouter();
    const [isStarting, setIsStarting] = useState(false);

    const handleStartTest = async () => {
        setIsStarting(true);
        const { data: testId, message } = await startSubjectWiseTest(name, slug, locale);
        console.log(testId)
        if (!testId) {
            toast.error("Initialization Failed", {
                description: message || "Please check your network connection.",
            });
            setIsStarting(false);
            return;
        }

        toast.success("Module Initialized", {
            description: "Loading engineering test environment...",
        });
        
        router.push(`/tests/attend/${testId}`);
    };

    return (
        <Button
            onClick={handleStartTest}
            disabled={isStarting}
            className="w-full group bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest py-5 rounded-xl shadow-md shadow-blue-100 transition-all"
        >
            {isStarting ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                </>
            ) : (
                <>
                    Initialize Test
                    <Zap className="ml-2 h-3.5 w-3.5 fill-current transition-transform duration-300 group-hover:scale-110" />
                </>
            )}
        </Button>
    );
};

export default SubjectWiseStartButton;