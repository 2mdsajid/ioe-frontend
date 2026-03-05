'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateRandomName } from '@/lib/utils';
import { Loader2, Zap, Shuffle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

type Props = {
    testid: string;
    testCode?: string;
};

const StartTestForm = ({ testid, testCode }: Props) => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const generateUsername = () => {
        setUsername(generateRandomName());
    };

    const startTest = () => {
        if (!username.trim()) {
            return toast.error("Identity Required", { description: "Please enter a name to initialize the simulation." });
        }
        setIsLoading(true);
        router.push(`/tests/attend/${testid}/?username=${username.trim()}&c=${testCode}`);
    };

    return (
        <div className="w-full space-y-3 pt-2">
            <div className="flex gap-2">
                <Input
                    className="flex-grow bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-blue-600 rounded-xl text-sm h-11"
                    placeholder="Enter Candidate Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && startTest()}
                />
                <Button 
                    variant="outline" 
                    onClick={generateUsername} 
                    className="bg-slate-50 border-slate-200 hover:bg-slate-100 hover:text-blue-600 rounded-xl h-11"
                >
                    <Shuffle className="w-4 h-4" />
                </Button>
            </div>

            <Button
                onClick={startTest}
                disabled={isLoading || !username.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 text-sm uppercase tracking-widest rounded-xl shadow-md shadow-blue-100 transition-all"
            >
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Zap className="w-4 h-4 mr-2 fill-current" />
                )}
                Initialize Test
            </Button>
        </div>
    );
};

export default StartTestForm;