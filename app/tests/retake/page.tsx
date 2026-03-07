// app/tests/recent/page.tsx

import { getRecentTests } from '@/lib/actions/tests.actions';
import { RecentTestsClientPage } from './_components/RecentTestsClientPage';
import ErrorPage from '@/components/reusable/ErrorPage';
import { constructMetadata } from '@/lib/data/global.data';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/auth/auth';

export const metadata = constructMetadata({
  title: "IOE Locus | Diagnostic Logs",
  description: "Review and reinitialize past engineering simulations."
});

// This is the type for the data you will receive
export type TRecentTest = {
  id: string;
  name: string;
  date: string;
  totalQuestions: number;
  score: number;
}

const Page = async () => {

  const { data: user } = await getUserSession();
  if (!user?.id) {
    redirect('/login?ru=/tests/retake');
  }

  // if (!user.isSubscribed) {
  //   return (
  //     <ErrorPage errorMessage="Only Premium Users Can Re-Attempt Test" />
  //   );
  // }

  const { data: tests, message } = await getRecentTests()

  if (!tests || tests.length === 0) {
    return <ErrorPage errorMessage={message} />
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 pt-24 pb-16 px-6 relative overflow-hidden">
      {/* Engineering Blueprint Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="relative z-10">
        <RecentTestsClientPage tests={tests} />
      </div>
    </div>
  )
};

export default Page;