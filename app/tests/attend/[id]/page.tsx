import ErrorPage from '@/components/reusable/ErrorPage';
import { getSingleTestById } from '@/lib/actions/tests.actions';
import { getUserSession } from '@/lib/auth/auth';
import { constructMetadata } from '@/lib/data/global.data';
import { generateRandomName } from '@/lib/utils';
import { Metadata } from 'next';
import TestMain from './_components/TestMain';

type Props = {
    params: Promise<{ id: string }>,
    searchParams: { username: string; c: string; t: string }
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const params = await props.params;
    const testid = params.id

    const { data: testData } = await getSingleTestById(testid);
    const siteName = "IOE Locus";

    if (!testData) {
        return constructMetadata({
            title: `${siteName} | Entrance`,
            description: `Nepal's premier IOE entrance simulation.`
        });
    }

    const { test } = testData;
    return constructMetadata({
        title: `${siteName} | ${test.name}`,
        description: `Official IOE entrance simulation: ${test.name}.`,
    });
};

const Page = async (props: Props) => {
    const { data: user } = await getUserSession();
    const params = await props.params;

    const testid = params.id
    const testCode = props.searchParams.c;

    const { data: testData, message } = await getSingleTestById(testid, testCode);

    if (!testData?.test || testData?.test.archive) {
        return <ErrorPage errorMessage={message || "Simulation protocol currently offline."} />;
    }

    const username = props.searchParams.username || generateRandomName();
    const { test } = testData;

    return (
        <div className='min-h-screen bg-slate-50'>
            <TestMain
                id={test.id}
                testName={test.name}
                questions={test.questions}
                username={username}
                user={user}
            />
        </div>
    );
};

export default Page;