import { LanguageSchema, STREAM } from "@/lib/schema/base.schema";
import { redirect } from "next/navigation";
import { getUserlanguage } from "@/lib/actions/language.actions";
import { getUserSession } from "@/lib/auth/auth";
import { testDataAndDescription } from "@/lib/data/tests.data";
import { LANGUAGE } from "@/lib/schema/base.schema";
import { Cpu, ShieldCheck, Zap } from "lucide-react";
import TestTypeCard from "./_conponents/TestTypeCard";

type Props = {
  params: Promise<{ level: string }>;
};

export default async function Page(props: Props) {
  const { data: user } = await getUserSession();
  const isSubscribed = user?.isSubscribed ?? false;

  const userLanguage = (await getUserlanguage()) as LANGUAGE;
  if (!userLanguage || !LanguageSchema.safeParse(userLanguage).success) {
    redirect("/lan?ru=/tests");
  }

  // --- UPDATED: Set stream to IOE for Engineering branding ---
  const stream: STREAM = "IOE"; 
  
  const testsForLanguage = testDataAndDescription[userLanguage];
  const streamAvailableTests = testsForLanguage.filter((test) =>
    test.isAvailableTo.includes(stream)
  );

  const freeTests = streamAvailableTests.filter((t) => t.accessLevel === "FREE");
  const premiumTests = streamAvailableTests.filter((t) => t.accessLevel === "PREMIUM");

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen relative overflow-hidden">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>
      
      <div className="relative z-10 w-full pb-20 pt-8 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* Free Access Modules */}
          <section id="free-tests" className="space-y-10">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3 whitespace-nowrap text-slate-900">
                <Zap className="text-blue-600 w-6 h-6 fill-blue-600/10" /> Practice Modules
              </h2>
              <div className="h-px flex-grow bg-slate-200" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {freeTests.map((testType) => (
                <div key={testType.type} className="group">
                  <TestTypeCard
                    card={testType}
                    isAvailable={true}
                    isLocked={false}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Premium / Pro Exams */}
          {premiumTests.length > 0 && (
            <section id="premium-tests" className="space-y-10">
               <div className="flex items-center gap-4">
                <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3 whitespace-nowrap text-blue-600">
                  <ShieldCheck className="w-6 h-6" /> Pro Simulators
                </h2>
                <div className="h-px flex-grow bg-blue-100" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {premiumTests.map((testType) => (
                  <div key={testType.type} className="group">
                    <TestTypeCard
                      card={testType}
                      isAvailable={true}
                      isLocked={!isSubscribed}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {streamAvailableTests.length === 0 && (
             <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200 shadow-sm">
                <Cpu className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">No engineering modules initialized. Syncing data...</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}