import React from 'react';
import ErrorPage from '@/components/reusable/ErrorPage';
import { getAllTestsByType } from '@/lib/actions/tests.actions';
import { getUserSession } from '@/lib/auth/auth';
import { constructMetadata } from '@/lib/data/global.data';
import { Metadata } from 'next';
import TestList from './_components/TestList';
import { getUserlanguage } from '@/lib/actions/language.actions';
import { LANGUAGE, LanguageSchema } from '@/lib/schema/base.schema';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Cpu } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: "IOE Locus | Full Simulation Exams",
  description: "Experience the Pulchowk CBT environment with full-length engineering model tests."
});

const page = async () => {
  const userLanguage = await getUserlanguage() as LANGUAGE;
  if (!userLanguage || !LanguageSchema.safeParse(userLanguage).success) {
    return redirect(`/lan?ru=/tests/model`);
  }

  const { data: user } = await getUserSession();
  const isPremium = user?.isSubscribed ?? false;

  const { data: customTestsData, message: customTestsDataMessage } = await getAllTestsByType('MODEL');

  if (!customTestsData || customTestsData.length === 0) {
    return <ErrorPage errorMessage={customTestsDataMessage || "No engineering simulations available."} />;
  }

  const backHref = `/tests`;

  return (
    <div className="w-full min-h-screen pb-20 bg-slate-50 text-slate-900 relative overflow-hidden">
      {/* Blueprint Grid Decor */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto py-12 px-6 pt-24">
          <div className="mb-10">
            <Link
              href={backHref}
              className="group inline-flex items-center gap-3 text-slate-500 hover:text-blue-600 font-bold text-[10px] uppercase tracking-widest transition-all"
            >
              <div className="p-2 rounded-lg bg-white border border-slate-200 group-hover:border-blue-600/30 transition-all shadow-sm">
                <ArrowLeft className="w-3.5 h-3.5" />
              </div>
              <span>Return to Dashboard</span>
            </Link>
          </div>

        <TestList tests={customTestsData} isPremium={isPremium} />
      </div>
    </div>
  );
};

export default page;