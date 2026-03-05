'use server'

import { cookies } from "next/headers";
import { LANGUAGE, STREAM } from "../schema/base.schema";


//  jsut setting the language in the cookie not in be so will be easy to fixxxx --  no db modification needed
export const setUserLanguage = async (language: LANGUAGE) => {
    const cookieStore = await cookies()
    cookieStore.set('locale', language, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
    })
}

export const getUserlanguage = async () : Promise<LANGUAGE | null> => { 
    const cookieStore = await cookies()
    return cookieStore.get('locale')?.value as LANGUAGE || 'en'
}



