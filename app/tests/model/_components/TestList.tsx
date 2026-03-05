'use client';

import { Badge } from '@/components/ui/badge';
import { TBaseCustomTest } from '@/lib/schema/tests.schema';
import { Lock, Cpu, Calendar, User, ChevronRight } from 'lucide-react';
import Link from 'next/link';

type Props = {
  tests: TBaseCustomTest[];
  isPremium: boolean;
};

const TestList = ({ tests, isPremium }: Props) => {
  const freeTests = tests.filter((t) => !t.isAvailableToPremium);
  const premiumTests = tests.filter((t) => t.isAvailableToPremium);

  const renderCard = (test: TBaseCustomTest, locked: boolean) => {
    const href = locked ? '/membership' : `/tests/view/${test.id}`;
    const formattedDate = new Date(test.date).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    return (
      <Link
        key={test.id}
        href={href}
        className={`group relative flex flex-col justify-between bg-white border border-slate-200 rounded-2xl p-5 transition-all duration-300 ${
          locked ? 'opacity-70 grayscale-[0.5]' : 'hover:border-blue-600/30 hover:shadow-md hover:shadow-blue-500/5'
        }`}
      >
        <div>
          <div className="flex items-start justify-between mb-4">
             <div className={`p-2.5 rounded-xl transition-all ${
               locked ? 'bg-slate-100 text-slate-400' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
             }`}>
                <Cpu className="w-4 h-4" />
             </div>
             {locked ? (
                <Lock className="w-4 h-4 text-slate-300" />
             ) : (
                <Badge className={`text-[9px] font-bold px-2 py-0 border-none shadow-none ${
                  test.isAvailableToPremium ? "bg-blue-600 text-white" : "bg-emerald-500 text-white"
                }`}>
                  {test.isAvailableToPremium ? 'PRO' : 'FREE'}
                </Badge>
             )}
          </div>

          <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-1 group-hover:text-blue-600 transition-colors">
            {test.name}
          </h3>
          
          <div className="flex items-center gap-1.5 text-slate-400 mb-6">
            <User className="w-2.5 h-2.5" />
            <span className="text-[9px] font-bold uppercase tracking-wider">{test.creator || 'IOE Council'}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Calendar className="w-2.5 h-2.5" />
            <span className="text-[9px] font-bold uppercase tracking-tighter">{formattedDate}</span>
          </div>
          
          <div className={`flex items-center gap-1 font-black text-[9px] uppercase tracking-widest transition-all ${
            locked ? 'text-slate-300' : 'text-blue-600 group-hover:gap-2'
          }`}>
             {locked ? 'Upgrade' : 'Initialize'}
             <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="space-y-16">
      {freeTests.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
             <h2 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">Standard Simulations</h2>
             <div className="h-px flex-grow bg-slate-200" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {freeTests.map((test) => renderCard(test, false))}
          </div>
        </section>
      )}

      {premiumTests.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
             <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Advanced Pro Exams</h2>
             <div className="h-px flex-grow bg-slate-200" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {premiumTests.map((test) => renderCard(test, !isPremium))}
          </div>
        </section>
      )}
    </div>
  );
};

export default TestList;