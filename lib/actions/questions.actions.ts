'use server'

import { cookies } from "next/headers";


import { TTotalQuestionsPerSubject } from "../schema/questions.schema";
import { LoksewaTopicsTranslation, STREAM, TLoksewaSubjectsTranslation } from "../schema/base.schema";
import { TTotalQuestionsPerSubjectAndChapter } from "../schema/tests.schema";

const stream: STREAM = 'IOE'

export const getTotalQuestionsPerSubject = async (): Promise<{
    data: TTotalQuestionsPerSubject[] | null;
    message: string;
}> => {
    try {

        const cookieStore = await cookies();
        const authToken = cookieStore.get("ioe-auth-token")?.value;

        const response = await fetch(`${process.env.BACKEND}/questions/get-total-questions-per-subject?stream=${stream}`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "stream": stream,
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
        return { data: null, message: "Some Error Occured while fetching all tests!" };
    }
};



export const getLoksewaSubjectsTranslations = async (): Promise<{
    data: TLoksewaSubjectsTranslation | null;
    message: string;
}> => {
    try {

        const cookieStore = await cookies();
        const authToken = cookieStore.get("ioe-auth-token")?.value;

        const response = await fetch(`${process.env.BACKEND}/questions/get-loksewa-subjects-translations`, {
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
        return { data: null, message: "Some Error Occured while fetching all tests!" };
    }
};


export const getTotalQuestionsPerSubjectAndChapter = async (): Promise<{
    data: TTotalQuestionsPerSubjectAndChapter | null;
    message: string;
}> => {
    try {

        const cookieStore =await  cookies();
        const authToken = cookieStore.get("ioe-auth-token")?.value;

        const response = await fetch(`${process.env.BACKEND}/questions/get-total-questions-per-subject-and-chapter?stream=${stream}`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "stream": stream,
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
        return { data: null, message: "Some Error Occured while fetching all tests!" };
    }
};



export const getLoksewaChaptersTranslations = async (): Promise<{
    data: LoksewaTopicsTranslation | null;
    message: string;
}> => {
    try {

        const cookieStore = await cookies();
        const authToken = cookieStore.get("ioe-auth-token")?.value;

        const response = await fetch(`${process.env.BACKEND}/questions/get-loksewa-chapters-translations`, {
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
        return { data: null, message: "Some Error Occured while fetching all tests!" };
    }
};