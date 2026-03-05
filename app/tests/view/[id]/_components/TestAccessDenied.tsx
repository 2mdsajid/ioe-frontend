'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TCustomTestMetadata, TestAccessStatus } from "@/lib/schema/tests.schema";
import { LockKeyhole, Unlock, XCircle, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
    access: TestAccessStatus;
    metadata: TCustomTestMetadata;
    onUnlockSuccess: () => void;
    testCode: string;
    onSetTestCode: (code: string) => void;
};

const TestAccessDenied = ({ access, metadata, onUnlockSuccess, onSetTestCode, testCode }: Props) => {
    const [error, setError] = useState<string | null>(null);

    const handleValidateCode = () => {
        const validCodes = metadata.testLock?.lockCodes ?? [];
        if (validCodes.includes(testCode.trim())) {
            setError(null);
            toast.success("Access Granted", { description: "Simulation protocol initialized." });
            onUnlockSuccess();
        } else {
            setError("Incorrect authorization code.");
            toast.error("Access Denied");
        }
    };

    return (
        <div className="text-center p-6 bg-blue-50/50 border border-blue-100 rounded-2xl space-y-4">
            <div className="flex justify-center">
                <div className="p-3 bg-white rounded-full shadow-sm border border-blue-100">
                    <LockKeyhole className="h-6 w-6 text-blue-600" />
                </div>
            </div>
            <div className="space-y-1">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Access Restricted</h3>
                <p className="text-[10px] font-medium text-slate-500">{access.reason}</p>
            </div>

            {metadata.testLock?.lockType === 'CODE' && (
                <div className="space-y-3">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Enter Clearance Code"
                            value={testCode}
                            onChange={(e) => {
                                onSetTestCode(e.target.value);
                                if (error) setError(null);
                            }}
                            className="bg-white border-slate-200 h-10 text-xs focus-visible:ring-blue-600 rounded-lg"
                        />
                        <Button onClick={handleValidateCode} disabled={!testCode.trim()} className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-4">
                            <Unlock className="w-3.5 h-3.5 mr-2" /> Verify
                        </Button>
                    </div>
                    {error && (
                        <p className="text-[10px] text-rose-500 font-bold flex items-center justify-center gap-1 uppercase">
                            <XCircle className="h-3 w-3" /> {error}
                        </p>
                    )}
                    {metadata.specialUrl && (
                        <Button asChild variant="link" className="text-blue-600 text-[10px] h-auto p-0 hover:no-underline font-bold uppercase tracking-wider">
                            <a href={metadata.specialUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                Obtain Credentials <ExternalLink className="h-2.5 w-2.5" />
                            </a>
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

export default TestAccessDenied;