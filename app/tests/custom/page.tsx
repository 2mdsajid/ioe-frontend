import { getUserSession } from '@/lib/auth/auth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ErrorPage from '@/components/reusable/ErrorPage';
import { getTotalQuestionsPerSubjectAndChapter } from '@/lib/actions/questions.actions';
import { constructMetadata } from '@/lib/data/global.data';
import { CustomTestForm } from './_components/CustomTestForm';

export const metadata = constructMetadata({
  title: "IOE Locus | Custom Simulation",
  description: "Configure custom engineering modules to target specific technical chapters."
});

const Page = async () => {
  const { data: user } = await getUserSession();
  if (!user?.id) {
    redirect('/login?ru=/tests/custom');
  }
//   if (!user.isCompleted) {
//     redirect('/login/stream?ru=/tests/custom');
//   }
//   if (!user.isSubscribed) {
//     return <ErrorPage errorMessage='Pro Membership required for Custom Module Generation.' />;
//   }

  console.log('this is custom test page')

  const {
    data: totalQuestionsPerSubjectAndChapterData,
    message: totalQuestionsPerSubjectAndChapterMessage
  } = await getTotalQuestionsPerSubjectAndChapter();

  if (!totalQuestionsPerSubjectAndChapterData) {
    return <ErrorPage errorMessage={totalQuestionsPerSubjectAndChapterMessage || 'Failed to initialize system data.'} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-12 pb-16">
        <CustomTestForm allQuestionsData={totalQuestionsPerSubjectAndChapterData} />
    </div>
  );
};

export default Page;