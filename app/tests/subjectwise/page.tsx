import ErrorPage from '@/components/reusable/ErrorPage';
import { getLoksewaSubjectsTranslations, getTotalQuestionsPerSubject } from '@/lib/actions/questions.actions';
import SubjectsList from './_components/SubjectsList';
import { constructMetadata } from '@/lib/data/global.data';
import { getUserlanguage } from '@/lib/actions/language.actions';
import { redirect } from 'next/navigation';
import { LANGUAGE, LanguageSchema } from '@/lib/schema/base.schema';

import Link from "next/link";
import { ArrowLeft, Cpu } from "lucide-react";

export const metadata = constructMetadata({
    title: "IOE Locus | Subject Mastery",
    description: "Deep dive into Physics, Chemistry, and Mathematics with targeted IOE modules."
});

const page = async () => {
    const userLanguage = await getUserlanguage() as LANGUAGE;
    
    if (!userLanguage || !LanguageSchema.safeParse(userLanguage).success) {
        return redirect(`/lan?ru=/tests/subjectwise`);
    }

    const { data: subjectTranslations, message } = await getLoksewaSubjectsTranslations();
    if (!subjectTranslations) {
        return <ErrorPage errorMessage={message} />;
    }

    const {
        data: totalQuestionsPerSubjectData,
        message: totalQuestionsPerSubjectMessage
    } = await getTotalQuestionsPerSubject();

    if (!totalQuestionsPerSubjectData || totalQuestionsPerSubjectData.length === 0) {
        return <ErrorPage errorMessage={totalQuestionsPerSubjectMessage} />;
    }

    const backHref = `/tests`;

    return (
        <div className='bg-slate-50 text-slate-900 min-h-screen relative overflow-hidden selection:bg-blue-500/30'>
             {/* Engineering Blueprint Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            
            <div className='relative z-10 w-full max-w-6xl mx-auto py-12 px-6 pt-24'>
                {/* Back Button */}
                <div className="mb-10">
                    <Link 
                        href={backHref}
                        className="group inline-flex items-center gap-3 text-slate-500 hover:text-blue-600 font-bold text-[10px] uppercase tracking-widest transition-all"
                    >
                        <div className="p-2 rounded-lg bg-white border border-slate-200 group-hover:border-blue-600/30 transition-all shadow-sm">
                            <ArrowLeft className="w-3.5 h-3.5" />
                        </div>
                        <span>Return to Modules</span>
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-px w-12 bg-blue-600/30" />
                        <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em]">Vertical Specialization</span>
                    </div>
                </div>

                <SubjectsList
                    subjects={totalQuestionsPerSubjectData}
                    translations={subjectTranslations}
                    language={userLanguage}
                />
            </div>
        </div>
    );
};

export default page;