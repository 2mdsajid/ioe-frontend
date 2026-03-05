import React from 'react';
import Link from 'next/link';
import { 
  Binary, 
  ChevronRight, 
  Atom, 
  FlaskConical, 
  Variable, 
  Terminal,
  Activity
} from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-white text-slate-900 flex items-center pt-20 lg:pt-0">
      {/* Engineering Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Content */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-md bg-rose-50 border border-rose-100 text-rose-600">
            <Activity className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Entrance Season 2082/83</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-tight">
            Solve. <br />
            <span className="text-blue-600">Iterate.</span> <br />
            Engineer.
          </h1>

          <p className="text-lg text-slate-500 max-w-lg leading-relaxed border-l-2 border-slate-200 pl-6">
            IOE Locus is a high-performance practice engine for the Pulchowk Entrance. 
            No fluff. Just 2000+ targeted problems in Physics, Chemistry, and Mathematics.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/solve" className="px-8 py-4 bg-slate-900 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center gap-2">
              Get Started <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/roadmap" className="px-8 py-4 bg-white border border-slate-200 rounded-lg font-bold hover:border-slate-400 transition-all">
              View Roadmap
            </Link>
          </div>
        </div>

        {/* Right Side: Subject Cards (Completely different from the Stats Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SubjectCard 
            title="Mathematics" 
            icon={<Variable className="text-blue-500" />} 
            weight="50 Marks" 
            desc="Calculus, Vectors & Algebra"
          />
          <SubjectCard 
            title="Physics" 
            icon={<Atom className="text-rose-500" />} 
            weight="45 Marks" 
            desc="Mechanics & Thermodynamics"
          />
          <SubjectCard 
            title="Chemistry" 
            icon={<FlaskConical className="text-emerald-500" />} 
            weight="25 Marks" 
            desc="Organic & Physical Chemistry"
          />
          <SubjectCard 
            title="English/Aptitude" 
            icon={<Terminal className="text-slate-500" />} 
            weight="20 Marks" 
            desc="Logic & Vocabulary"
          />
        </div>
      </div>
    </section>
  );
};

// Internal Sub-component for the Subject Grid
const SubjectCard = ({ title, icon, weight, desc }: { title: string, icon: React.ReactNode, weight: string, desc: string }) => (
  <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
    <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="font-bold text-slate-900">{title}</h3>
    <div className="text-xs font-black text-blue-600 uppercase mb-2 tracking-tighter">{weight}</div>
    <p className="text-xs text-slate-500 leading-snug">{desc}</p>
  </div>
);

export default Hero;