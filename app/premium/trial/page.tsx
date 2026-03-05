import React from 'react'
import { getUserSession } from '@/lib/auth/auth'
import { redirect } from 'next/navigation'
import CreateTrialForm from './_components/CreateTrialForm'
import { constructMetadata } from '@/lib/data/global.data'
import { getUserlanguage } from '@/lib/actions/language.actions'
import { LanguageSchema } from '@/lib/schema/base.schema'

type Props = {}

export const metadata = constructMetadata({
    title: "Loksewa Sopan | Subscription",
    description: "Explore membership plan by Loksewa Sopan"
})

const page =async (props: Props) => {

    redirect('/premium')
    const {data:user, message} = await getUserSession()
    if(!user){
        redirect('/login?ru=/premium/trial')
    }

    const userLanguage = await getUserlanguage()
    if (!userLanguage || !LanguageSchema.safeParse(userLanguage).success) {
        redirect('/lan?ru=/premium/register')
    }


    return (
        <div className=' '>
            {/* <CreateTrialForm user={user} language={userLanguage} /> */}
        </div>
    )
}

export default page