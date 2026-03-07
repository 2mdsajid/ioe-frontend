'use server'

import { cookies } from "next/headers";
import { TQuesitonInAiRequestSchema } from "../schema/questions.schema";



export const askGemini = async (): Promise<{
    data: string | null;
    message: string;
}> => {
    try {
        const cookieStore = await cookies();
        const authToken = cookieStore.get("loks-token-auth")?.value;

        if (!authToken || authToken === undefined || authToken === null) {
            return { data: null, message: "User not logged in!" };
        }

        
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/google/ask-gemini`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
        });


        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while fetching ai data!" };
    }
};


export const getGeminiExplanation = async (questionData:TQuesitonInAiRequestSchema): Promise<{
    data: string | null;
    message: string;
}> => {
    try {

        const { question, options, uans } = questionData
        // console.log("🚀 ~ getGeminiExplanation ~ questionData:", questionData)
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/google/get-gemini-explanation`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question, options, correctAnswer: uans }),
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while fetching ai data!" };
    }
};