'use server'

import { cookies } from "next/headers";


import { TLoksewaGrades, TLoksewaLevels } from "../schema/base.schema";
import { TCreateFullSubscription, TCreateTrialRequestData, TCreateUserFeedback } from "../schema/users.schema";

export const createUserFeedback = async (formData: TCreateUserFeedback): Promise<{
    data: string | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/users/create-user-feedback`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...formData
            })
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        console.log(error)
        return { data: null, message: "Some Error Occured while creating the !" };
    }
};


export const getUserLevels = async (): Promise<{
    data: TLoksewaLevels | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/users/get-loksewa-levels`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        console.log(error)
        return { data: null, message: "Some Error Occured while getting levels!" };
    }
};



export const getUserGrades = async (): Promise<{
    data: TLoksewaGrades | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/users/get-loksewa-grades`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        console.log(error)
        return { data: null, message: "Some Error Occured while getting levels!" };
    }
};


export const createSubscriptionRequest = async (formData: TCreateFullSubscription): Promise<{
    data: string | null;
    message: string;
}> => {
    try {

        const cookieStore = await cookies();
        const authToken = cookieStore.get("ioe-auth-token")?.value;

        if (!authToken) {
            return { data: null, message: "User not logged in!" };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/subscription/create-subscription`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + authToken,
            },
            body: JSON.stringify({
                ...formData
            })
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            console.log('dq',data)
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        console.log(error)
        return { data: null, message: "Some Error Occured while creating the membership request!" };
    }
};


export const createTrialRequest = async (formData: TCreateTrialRequestData): Promise<{
    data: string | null;
    message: string;
}> => {
    try {

        const cookieStore = await cookies();
        const authToken = cookieStore.get("ioe-auth-token")?.value;

        if (!authToken) {
            return { data: null, message: "User not logged in!" };
        }


        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/subscription/create-trial`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + authToken,
            },
            body: JSON.stringify({
                ...formData
            })
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        console.log(error)
        return { data: null, message: "Some Error Occured while creating the trial request!" };
    }
};