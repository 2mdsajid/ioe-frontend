import { constructMetadata } from '@/lib/data/global.data';
import { 
  BarChart3, BookOpenCheck, Zap, Target, 
  History, ShieldAlert, Cpu, Globe, ArrowRight,
  Activity
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = constructMetadata({
    title: 'IOE Locus | Advanced Capabilities',
    description: 'Explore the high-performance features of Nepal’s premier IOE entrance preparation engine.',
});

export default function FeaturesPage() {
  const features = [
    {
      title: "Real-time Analytics",
      description: "Get instant feedback on your performance with detailed accuracy metrics and speed tracking.",
      icon: BarChart3,
    },
    {
      title: "Exam Simulations",
      description: "Full-length mock tests modeled exactly after TU IOE, KU, and PU engineering entrance patterns.",
      icon: BookOpenCheck,
    },
    {
      title: "Weakness Detection",
      description: "Our algorithm identifies specific subjects (Math, Physics, Chemistry) and chapters requiring focus.",
      icon: Target,
    },
    {
      title: "Instant Results",
      description: "Zero latency. Receive your score and a detailed diagnostic breakdown immediately after submission.",
      icon: Zap,
    },
    {
      title: "Past Paper Access",
      description: "Access a decade's worth of categorized past IOE questions with step-by-step mathematical explanations.",
      icon: History,
    },
    {
      title: "Secure Architecture",
      description: "Industry-standard data protection ensuring your test telemetry and identity remain strictly private.",
      icon: ShieldAlert,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen relative overflow-hidden text-slate-900">
      
      {/* Engineering Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <section className="text-center mb-24">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-md bg-blue-50 border border-blue-100 text-blue-600 mb-8 shadow-sm">
            <Activity className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Advanced Capabilities</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-6">
            The Toolkit of a <br />
            <span className="text-blue-600">Future Engineer.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-slate-500 font-medium leading-relaxed border-l-2 border-slate-200 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
            We’ve combined academic expertise with data science to build the most 
            comprehensive, high-performance entrance preparation platform in Nepal.
          </p>
        </section>

        {/* --- Feature Grid --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group flex flex-col">
              <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all shadow-sm shrink-0">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
                {f.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>

        {/* --- Tech Deep Dive Section --- */}
        <section className="bg-white rounded-3xl border border-slate-200 p-12 md:p-20 relative overflow-hidden shadow-sm group mb-32">
          {/* Subtle background icon */}
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-1000 pointer-events-none">
             <Globe className="w-64 h-64 text-slate-900" />
          </div>
          
          <div className="max-w-3xl relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900 mb-8 leading-tight">
              Built for <span className="text-blue-600">Performance</span>, <br />
              Architected for Success.
            </h2>
            <p className="text-slate-500 text-lg mb-10 font-medium leading-relaxed border-l-2 border-slate-100 pl-6">
              Our core system is optimized for low-latency feedback. Whether you&apos;re 
              practicing on a mobile device in the Himalayas or a desktop workstation in Kathmandu, 
              your telemetry stays synced and strictly secure.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 bg-slate-50 p-6 rounded-2xl border border-slate-100 w-fit">
              <div>
                <p className="text-3xl font-black text-slate-900 tracking-tighter">100ms</p>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">Response Time</p>
              </div>
              <div className="hidden md:block w-px h-12 bg-slate-200 mx-auto" />
              <div>
                <p className="text-3xl font-black text-slate-900 tracking-tighter">99.9%</p>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">System Uptime</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Final CTA --- */}
        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 tracking-tighter">
            Initialize the <span className="text-blue-600">IOE Locus</span> Advantage
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild className="w-full sm:w-auto px-10 py-7 bg-slate-900 hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-[11px] rounded-xl shadow-xl shadow-slate-200/50 transition-all">
                <Link href="/tests">
                    Launch Simulator <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
            <Link href="/about" className="text-slate-500 hover:text-blue-600 font-bold uppercase text-[11px] tracking-widest transition-colors flex items-center gap-2">
              Review System Architecture
            </Link>
          </div>
        </section>

        <div className="text-center mt-24 pt-8 border-t border-slate-200">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">
            IOE LOCUS &bull; CORE_v1.0.2
          </p>
        </div>
      </div>
    </div>
  );
}