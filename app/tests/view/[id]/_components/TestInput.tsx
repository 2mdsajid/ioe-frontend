'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TTestLock } from '@/lib/schema/tests.schema';
import { generateRandomName } from '@/lib/utils';
import { Loader2, Play, Shuffle, Unlock, XCircle, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Props = {
    testid: string;
    token?: string;
    specialUrl?: string | null;
    testLock: TTestLock | null;
}

const TestInput: React.FC<Props> = ({ testid, token, testLock, specialUrl }) => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [testCodeInput, setTestCodeInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTestUnlockedInternally, setIsTestUnlockedInternally] = useState(false);
    const [codeError, setCodeError] = useState<string | null>(null);

    const isActuallyLocked = testLock?.isLocked ?? false;

    useEffect(() => {
        setIsTestUnlockedInternally(!isActuallyLocked);
    }, [isActuallyLocked]);

    const startTest = () => {
        if (isActuallyLocked && !isTestUnlockedInternally) {
            const enteredCode = testCodeInput.trim();
            if (testLock?.lockCodes.includes(enteredCode)) {
                setIsTestUnlockedInternally(true);
                toast.success("Authorization Verified");
            } else {
                setCodeError("Invalid clearance code.");
                return;
            }
        }

        if (!username.trim()) {
            return toast.error("Identity Required", { description: "Please enter your name to proceed." });
        }
        setIsLoading(true);
        router.push(`/tests/attend/${testid}/?username=${username.trim()}&t=${token || ''}&c=${testCodeInput}`);
    };

    return (
        <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Identity Input */}
            <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Candidate Identity</label>
                <div className="flex gap-3">
                    <Input
                        className="h-14 bg-white/5 border-white/10 text-white focus-visible:ring-amber-500 rounded-xl"
                        placeholder="e.g. Future Advocate"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Button variant="ghost" onClick={() => setUsername(generateRandomName())} className="h-14 w-14 border border-white/10 rounded-xl hover:bg-white/5 text-amber-500">
                        <Shuffle className="w-5 h-5" />
                    </Button>
                </div>
            </div>
            
            {isActuallyLocked && !isTestUnlockedInternally && (
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Access Credentials</label>
                    <Input
                        type="password"
                        placeholder="Enter Authorization Code"
                        value={testCodeInput}
                        onChange={(e) => {
                            setTestCodeInput(e.target.value);
                            if (codeError) setCodeError(null);
                        }}
                        className="h-14 bg-white/5 border-white/10 text-white focus-visible:ring-amber-500 rounded-xl"
                    />
                    {codeError && <p className="text-xs text-red-400 font-bold uppercase tracking-widest flex items-center gap-2"><XCircle className="h-3 w-3" /> {codeError}</p>}
                </div>
            )}

            <Button
                onClick={startTest}
                disabled={isLoading}
                className="w-full h-16 bg-amber-500 hover:bg-amber-400 text-black font-black text-lg uppercase tracking-widest rounded-2xl transition-all shadow-[0_10px_30px_rgba(245,158,11,0.2)]"
            >
                {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                ) : isActuallyLocked && !isTestUnlockedInternally ? (
                    <span className="flex items-center gap-2"><Unlock className="w-5 h-5" /> Verify & Attend</span>
                ) : (
                    <span className="flex items-center gap-2"><Play className="w-5 h-5 fill-current" /> Commence Exam</span>
                )}
            </Button>
        </div>
    );
};

export default TestInput;