import ErrorPage from '@/components/reusable/ErrorPage';
import { getTotalQuestionsPerSubject } from '@/lib/actions/questions.actions';
import { getUserSession } from '@/lib/auth/auth';
import { constructMetadata } from '@/lib/data/global.data';
import { redirect } from 'next/navigation';
import { DifficultyTestForm } from './_components/DifficultyTestForm';
import { Settings2 } from 'lucide-react';

export const metadata = constructMetadata({
  title: "IOE Locus | Adaptive Modules",
  description: "Calibrate your engineering fundamentals with difficulty-scaled diagnostic tests."
});

const Page = async () => {
  const { data: user } = await getUserSession();
  if (!user) {
    redirect('/login?ru=/tests/difficulty');
  }
  // if (!user.isCompleted) {
  //   redirect('/login/stream?ru=/tests/difficulty');
  // }
  // if (!user.isSubscribed) {
  //   return <ErrorPage errorMessage='Pro Membership required to access Adaptive Modules.' />;
  // }

  const {
    data: totalQuestionsPerSubjectData,
    message: totalQuestionsPerSubjectMessage
  } = await getTotalQuestionsPerSubject()

  if (!totalQuestionsPerSubjectData || totalQuestionsPerSubjectData.length === 0) {
    return <ErrorPage errorMessage={totalQuestionsPerSubjectMessage || "System Error: No subjects indexed."} />
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 pt-12 pb-16 px-6 relative overflow-hidden">
      {/* Engineering Blueprint Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="max-w-3xl text-center flex flex-col gap-3 mb-8 text-slate-900">
        {/* <Settings2 className="w-6 h-6 text-blue-600" /> */}
        <h1 className="text-3xl font-black tracking-tight uppercase">Adaptive <span className="text-blue-600">Module</span></h1>
        <p className="text-slate-500 font-medium text-sm">Calibrate test parameters to target specific proficiency levels.</p>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <DifficultyTestForm subjectsData={totalQuestionsPerSubjectData} />
      </div>
    </div>
  );
};

export default Page;