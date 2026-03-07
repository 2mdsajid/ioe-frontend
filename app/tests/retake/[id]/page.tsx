// app/tests/retake/[id]/page.tsx
import ErrorPage from '@/components/reusable/ErrorPage'
import { getSingleTestById, getTestBasicScores } from '@/lib/actions/tests.actions'
import { getUserSession } from '@/lib/auth/auth'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import ReTestMain from './_components/ReTestMain'
import { constructMetadata } from '@/lib/data/global.data'

type Props = {
    params: Promise<{ id: string }>,
    searchParams: { c: string }
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const params = await props.params
    const testid = params.id

    const { data: testData } = await getSingleTestById(testid)
    if (!testData) {
        return constructMetadata({
            title: `IOE Locus | Re-Calibration`,
            description: `Reinitialize diagnostic module.`
        });
    }
    return constructMetadata({
        title: `IOE Locus | ${testData.test.slug}`,
        description: `Diagnostic module created by ${testData.test.createdBy}.`,
    });
};

const Page = async (props: Props) => {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('auth-token')?.value

    const { data: user } = await getUserSession()
    if (!user || (!user.isSubscribed)) {
        return <ErrorPage errorMessage='Clearance Denied: Pro Membership required for module re-calibration.' />;
    }

    const params = await props.params
    const testid = params.id
    const testCode = props.searchParams.c
    const { data: testData, message } = await getSingleTestById(testid, testCode)

    if (!testData?.test) {
        return <ErrorPage errorMessage={message || 'Module Offline or Deprecated'} />
    }

    const { test, access } = testData

    if (!access.canStart) {
        return <ErrorPage errorMessage={access.reason} />
    }

    const { data: previousScore } = await getTestBasicScores(testid)
    if (!previousScore) {
        return <ErrorPage errorMessage='Prerequisite missing: You must execute the initial simulation before re-calibrating.' />
    }

    return (
        <div className='min-h-screen bg-slate-50 pt-12 pb-16 px-4 md:px-8'>
            <div className='max-w-4xl mx-auto'>
                <ReTestMain
                    id={test.id}
                    testName={test.name}
                    questions={test.questions}
                    userid={user?.id as string}
                    user={user}
                    previousScore={previousScore}
                    authToken={authToken}
                />
            </div>
        </div>
    )
}

export default Page