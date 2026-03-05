'use client'

import { QR } from "@/lib/data/premium.data";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle, RefreshCcw } from "lucide-react"; // Added icons

export default function QRViewer({ email }: { email: string }) {
    const [current, setCurrent] = useState(0);

    // Return a message if the QR array is empty to prevent errors
    if (!QR || QR.length === 0) {
        return (
            <div className="text-center text-gray-500 bg-gray-800 p-6 rounded-xl border border-gray-700">
                No QR codes to display. Please contact support.
            </div>
        );
    }

    const nextQR = () => {
        // Move to the next QR code in the array, looping back to the start
        const nextIndex = (current + 1) % QR.length;
        setCurrent(nextIndex);
    };

    const handleError = () => {
        // Optional: If a QR image fails to load, automatically move to the next one
        // console.error("Failed to load QR image, trying next one.");
        // nextQR(); // Uncomment to enable automatic switching on error
    };

    // Helper function to convert a number to its ordinal form (e.g., 1 -> 1st, 2 -> 2nd)
    const getOrdinal = (n: number): string => {
        const suffixes = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-6  bg-gray-800 rounded-xl  border-gray-700 shadow-lg">
{/*            
            <p className="text-center text-gray-300 max-w-md pt-4">
                Scan the QR code below to proceed with your payment. Remember to include your email in the payment remarks!
            </p> */}

            <div className="relative flex flex-col items-center p-4 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg shadow-inner border border-gray-600">
                {/* <p className="text-lg font-semibold text-purple-400 mb-3">
                    Scan the {getOrdinal(current + 1)} QR Code
                </p> */}
                <div className="w-64 h-64 bg-white p-2 rounded-xl flex items-center justify-center border-4 border-purple-500 shadow-2xl shadow-purple-500/20">
                    <img
                        src={QR[current]} // Use the actual QR array
                        alt={`Payment QR Code ${current + 1}`}
                        onError={handleError}
                        className="w-full h-full object-contain rounded-lg"
                    />
                </div>
                <p className="mt-5 text-center text-sm text-gray-300">
                    Please mention your email: <strong className="text-purple-400 font-medium break-all">({email})</strong> in the payment remarks/notes.
                </p>
            </div>


            {QR.length > 1 && ( // Only show button if there's more than one QR
                <Button
                    onClick={nextQR}
                    className="w-full sm:w-auto px-8 py-3 mt-4 text-lg font-semibold text-white bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                    <RefreshCcw className="mr-3 h-5 w-5" />
                    Payment Failed? Try Next QR
                </Button>
            )}
        </div>
    );
}