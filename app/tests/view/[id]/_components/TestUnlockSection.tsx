// components/test/TestUnlockSection.tsx
"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Lock } from "lucide-react";
import { TTestLock } from '@/lib/schema/tests.schema'; // Import your TTestLock type
import { toast } from 'sonner';

// Assume you have a server action to update keysUsed if needed
// import { updateTestKeysUsed } from "@/lib/actions/tests.actions";

interface TestUnlockSectionProps {
    testId: string;
    testLock: TTestLock;
}

const TestUnlockSection: React.FC<TestUnlockSectionProps> = ({
    testId,
    testLock,
}) => {
    const [testCodeInput, setTestCodeInput] = useState<string>('');
    const [codeError, setCodeError] = useState<string | null>(null);

    const handleCodeSubmit = async () => {
        const enteredCode = testCodeInput.trim();

        if (testLock.lockCodes.includes(enteredCode) && !testLock.keysUsed.includes(enteredCode)) {
            setCodeError(null);
            toast.success("Test Unlocked!", {
                description: "You now have access to the test content.",
            })
            
        } else {
            setCodeError("Invalid code. Please try again.");
            toast.error("Invalid Code", {
                description: "The code you entered is incorrect.",
            });
        }
    };

    return (
        <div className="mb-6 p-4 border border-purple-300 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20 rounded-md shadow-inner text-center">
            <div className="flex items-center justify-center text-purple-700 dark:text-purple-300 mb-3">
                <Lock className="mr-2 h-5 w-5" />
                <h3 className="font-semibold text-lg">This Test is Locked</h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Please enter an unlock code to access the test questions.
            </p>
            <div className="flex space-x-2">
                <Input
                    type="text"
                    placeholder="Enter unlock code"
                    value={testCodeInput}
                    onChange={(e) => {
                        setTestCodeInput(e.target.value);
                        if (codeError) setCodeError(null); // Clear error on new input
                    }}
                    onKeyPress={(e) => { // Allow submitting with Enter key
                        if (e.key === 'Enter' && testCodeInput.trim()) {
                            handleCodeSubmit();
                        }
                    }}
                    className="flex-grow bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400"
                />
                <Button onClick={handleCodeSubmit} disabled={!testCodeInput.trim()}>
                    Unlock
                </Button>
            </div>
            {codeError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center justify-center">
                    <XCircle className="mr-1 h-4 w-4" /> {codeError}
                </p>
            )}
        </div>
    );
};

export default TestUnlockSection;