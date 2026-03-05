import { getLoksewaChaptersTranslations, getLoksewaSubjectsTranslations, getTotalQuestionsPerSubjectAndChapter } from '@/lib/actions/questions.actions';
import ErrorPage from '@/components/reusable/ErrorPage';
import { constructMetadata } from '@/lib/data/global.data';
import { getUserlanguage } from '@/lib/actions/language.actions';
import { redirect } from 'next/navigation';
import { LanguageSchema, LANGUAGE } from '@/lib/schema/base.schema';
import ChapterwiseMainPage from './_components/ChapterWiseMainPage';
import { getUserSession } from '@/lib/auth/auth';
import Link from 'next/link';
import { ArrowLeft, Cpu } from 'lucide-react';

export const metadata = constructMetadata({
  title: "IOE Locus | Chapter Mastery",
  description: "Granular engineering prep: focus on specific chapters in Math, Physics, and Chemistry."
});

const page = async () => {
  const userLanguage = await getUserlanguage() as LANGUAGE;
  if (!userLanguage || !LanguageSchema.safeParse(userLanguage).success) {
    return redirect(`/lan?ru=/tests/chapterwise`);
  }

  const { data: user } = await getUserSession();
  const isPremium = user?.isSubscribed ?? false;

  const { data: chaptersTranslations, message: chaptersMessage } = await getLoksewaChaptersTranslations();
  const { data: subjectsTranslations, message: subjectsMessage } = await getLoksewaSubjectsTranslations();
  const { data: totalQuestionsData, message: totalQuestionsMessage } = await getTotalQuestionsPerSubjectAndChapter();

  if (!chaptersTranslations || !subjectsTranslations || !totalQuestionsData) {
    return <ErrorPage errorMessage={chaptersMessage || subjectsMessage || totalQuestionsMessage} />;
  }
  
  const backHref = `/tests`;

  return (
    <div className='bg-slate-50 text-slate-900 min-h-screen relative overflow-hidden'>
      {/* Blueprint Decor */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      
      <div className='relative z-10 w-full max-w-6xl mx-auto py-12 px-6 pt-24'>
        <div className="mb-10">
          <Link
            href={backHref}
            className="group inline-flex items-center gap-3 text-slate-500 hover:text-blue-600 font-bold text-[10px] uppercase tracking-widest transition-all"
          >
            <div className="p-2 rounded-lg bg-white border border-slate-200 group-hover:border-blue-600/30 transition-all shadow-sm">
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            <span>System Dashboard</span>
          </Link>
        </div>

        <ChapterwiseMainPage
          data={totalQuestionsData}
          subjectsTranslations={subjectsTranslations}
          chaptersTranslations={chaptersTranslations}
          language={userLanguage}
          isPremiumUser={isPremium}
        />
      </div>
    </div>
  );
};

export default page;