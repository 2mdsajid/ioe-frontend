'use client';

import { TCustomTestMetadata, TestAccessStatus } from "@/lib/schema/tests.schema";
import { useState } from "react";
import TestAccessDenied from "./TestAccessDenied";
import StartTestForm from "./StartTestForm";
import { ArchiveX } from "lucide-react";

type Props = {
    metadata: TCustomTestMetadata;
    access: TestAccessStatus;
};

const TestInteractionWrapper = ({ metadata, access }: Props) => {
    const [isClientUnlocked, setIsClientUnlocked] = useState(false);
    const [testCode, setTestCode] = useState('');

    const onSetTestCode = (code: string) => {
        setTestCode(code);
    };

    const canStartTest = access.canStart || isClientUnlocked;

    if (metadata.archive) {
        return (
            <div className="text-center p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                <ArchiveX className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Module Offline
                </p>
                <p className="text-[10px] text-slate-400 mt-1">This simulation has been archived by the council.</p>
            </div>
        );
    }

    return canStartTest ? (
        <StartTestForm testid={metadata.id} testCode={testCode} />
    ) : (
        <TestAccessDenied
            access={access}
            metadata={metadata}
            onUnlockSuccess={() => setIsClientUnlocked(true)}
            testCode={testCode}
            onSetTestCode={onSetTestCode}
        />
    );
};

export default TestInteractionWrapper;