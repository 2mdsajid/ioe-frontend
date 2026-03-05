'use client'

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { startChapterWiseTest } from '@/lib/actions/tests.actions'
import { useRouter } from 'next/navigation'
import { Loader2, Zap } from 'lucide-react'
import { toast } from 'sonner'
import { LANGUAGE } from '@/lib/schema/base.schema'

type Props = {
    subjectSlug: string;
    chapterSlug: string;
    chapterName: string;
    locale: LANGUAGE
}

const ChapterWiseStartButton = (props: Props) => {
    const router = useRouter();
    const [isStarting, setIsStarting] = useState(false);

    const handleStartTest = async () => {
        setIsStarting(true);
        
        toast.promise(startChapterWiseTest(props.chapterName, props.subjectSlug, props.chapterSlug, props.locale), {
            loading: `Initializing...`,
            success: (res) => {
                if (!res.data) throw new Error(res.message || "Logic Error");
                router.push(`/tests/attend/${res.data}`);
                return "Module Ready!";
            },
            error: (err) => {
                setIsStarting(false);
                return err.message || "Connection failure.";
            },
        });
    };

    return (
        <Button
            onClick={handleStartTest}
            disabled={isStarting}
            className="h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[9px] uppercase tracking-widest rounded-lg transition-all"
        >
            {isStarting ? (
                <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
                <span className="flex items-center gap-1.5">
                    Start <Zap className="h-2.5 w-2.5 fill-current" />
                </span>
            )}
        </Button>
    );
};

export default ChapterWiseStartButton;