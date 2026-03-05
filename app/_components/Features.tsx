import React from 'react';
import { Calculator, Atom, Beaker, Map, ArrowUpRight, Activity } from 'lucide-react';
import Link from 'next/link';

// Preserving your exact object structure and types
const coreFeatures = [
  {
    title: 'Mathematics Engine',
    desc: 'Master Calculus, Vectors, and Algebra with 2500+ problems tailored for the IOE marking scheme.',
    icon: Calculator,
    color: 'text-blue-600',
    bg: 'bg-white',
    span: 'md:col-span-2 lg:col-span-3', 
  },
  {
    title: 'Formula Vault',
    desc: 'High-yield PDF cheat sheets for Physics and Chemistry derivations.',
    icon: Beaker,
    color: 'text-rose-600',
    bg: 'bg-white',
    span: 'md:col-span-1 lg:col-span-2',
  },
  {
    title: 'Physics Simulator',
    desc: 'Deep dive into Mechanics and Optics with conceptual explanations and past question analysis.',
    icon: Atom,
    color: 'text-emerald-600',
    bg: 'bg-white',
    span: 'md:col-span-1 lg:col-span-2',
  },
  {
    title: 'Entrance Roadmap',
    desc: 'Step-by-step guidance for Pulchowk, WRC, ERC, and Thapathali admission cycles.',
    icon: Map,
    color: 'text-slate-600',
    bg: 'bg-white',
    span: 'md:col-span-2 lg:col-span-3', 
  }
];

const Features: React.FC = () => {
  return (
    <section className="relative bg-white text-slate-900 py-24 overflow-hidden">
      {/* Engineering Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-md bg-blue-50 border border-blue-100 text-blue-600">
            <Activity className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Technical Modules</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter leading-tight">
            Precision in <br className="hidden md:block"/>
            <span className="text-blue-600">Engineering Prep.</span>
          </h2>
          
          <p className="text-lg text-slate-500 max-w-xl leading-relaxed border-l-2 border-slate-200 pl-6">
            Beyond rote learning. We provide the mathematical and analytical tools needed to clear the Pulchowk Entrance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {coreFeatures.map((f, i) => (
            <div
              key={i}
              className={`${f.span} p-8 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all group flex flex-col`}
            >
              {/* Icon Box */}
              <div className={`w-14 h-14 rounded-xl ${f.bg} border border-slate-100 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform`}>
                <f.icon className={`w-7 h-7 ${f.color}`} />
              </div>

              {/* Content */}
              <div className="flex justify-between items-start gap-4 mt-auto">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-12 flex justify-center">
          <Link 
            href="/features" 
            className="px-8 py-4 bg-slate-900 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            Explore all modules <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;