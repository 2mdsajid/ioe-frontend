import React from 'react';
import { Calculator, Atom, Beaker, Map, ArrowUpRight, Activity } from 'lucide-react';
import Link from 'next/link';

// Added 'href' to map to the new interactive pages
const coreFeatures = [
  {
    title: 'Mathematics Engine',
    desc: 'Master Calculus, Vectors, and Algebra with 2500+ problems tailored for the IOE marking scheme.',
    icon: Calculator,
    color: 'text-blue-600',
    bg: 'bg-white',
    span: 'md:col-span-2 lg:col-span-3', 
    href: '/resources/math-engine'
  },
  {
    title: 'Formula Vault',
    desc: 'High-yield PDF cheat sheets for Physics and Chemistry derivations.',
    icon: Beaker,
    color: 'text-rose-600',
    bg: 'bg-white',
    span: 'md:col-span-1 lg:col-span-2',
    href: '/resources/formula-vault'
  },
  {
    title: 'Physics Simulator',
    desc: 'Deep dive into Mechanics and Optics with conceptual explanations and past question analysis.',
    icon: Atom,
    color: 'text-emerald-600',
    bg: 'bg-white',
    span: 'md:col-span-1 lg:col-span-2',
    href: '/resources/physics-simulator'
  },
  {
    title: 'Entrance Roadmap',
    desc: 'Step-by-step guidance for Pulchowk, WRC, ERC, and Thapathali admission cycles.',
    icon: Map,
    color: 'text-slate-600',
    bg: 'bg-white',
    span: 'md:col-span-2 lg:col-span-3', 
    href: '/resources/roadmap'
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
            <span className="text-[10px] font-black uppercase tracking-widest">Technical Modules</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-none">
            Precision in <br className="hidden md:block"/>
            <span className="text-blue-600">Engineering Prep.</span>
          </h2>
          
          <p className="text-lg text-slate-500 max-w-xl leading-relaxed border-l-2 border-slate-200 pl-6 font-medium">
            Beyond rote learning. We provide the mathematical and analytical tools needed to clear the Pulchowk Entrance.
          </p>
        </div>

        {/* Features Grid (Now fully clickable Links) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {coreFeatures.map((f, i) => (
            <Link
              href={f.href}
              key={i}
              className={`${f.span} p-8 bg-slate-50 border border-slate-200 rounded-[2rem] hover:bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group flex flex-col`}
            >
              {/* Icon Box */}
              <div className={`w-14 h-14 rounded-2xl ${f.bg} border border-slate-100 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all duration-300`}>
                <f.icon className={`w-6 h-6 ${f.color}`} />
              </div>

              {/* Content */}
              <div className="flex justify-between items-start gap-4 mt-auto">
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight group-hover:text-blue-600 transition-colors">{f.title}</h3>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 mt-1 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-12 flex justify-center">
          <Link 
            href="/resources" 
            className="px-8 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:shadow-lg transition-all flex items-center gap-2"
          >
            Explore all modules <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;