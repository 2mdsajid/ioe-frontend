import React from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  Atom, 
  Database, 
  Map as MapIcon, 
  ChevronRight, 
  Cpu, 
  Wrench 
} from 'lucide-react';
import { constructMetadata } from '@/lib/data/global.data';

export const metadata = constructMetadata({
  title: `IOE Locus | Engineering Resources`,
  description: `Interactive learning tools, physics simulators, math engines, and admission roadmaps for IOE entrance preparation.`,
});

export default function ResourcesHubPage() {
  const resources = [
    {
      title: "Mathematics Engine",
      tag: "50 Marks • Shortcuts",
      desc: "Compare traditional long-form solutions with instant 'Locus Method' shortcuts to drastically improve your computational speed.",
      icon: Calculator,
      href: "/resources/math-engine",
      color: "blue"
    },
    {
      title: "Physics Simulator",
      tag: "45 Marks • Dependencies",
      desc: "Execute interactive simulations to see exactly how altering physical variables impacts formulas—a key IOE question format.",
      icon: Atom,
      href: "/resources/physics-simulator",
      color: "emerald"
    },
    {
      title: "Formula Vault",
      tag: "High-Yield • IOE Traps",
      desc: "Access an interactive glossary of critical formulas. Reveal common entrance traps and detailed parameter breakdowns.",
      icon: Database,
      href: "/resources/formula-vault",
      color: "purple"
    },
    {
      title: "Entrance Roadmap",
      tag: "Timeline • Logistics",
      desc: "Track your position in the IOE admission cycle. Manage your logistics checklist to ensure flawless form registration.",
      icon: MapIcon,
      href: "/resources/roadmap",
      color: "amber"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6 relative overflow-hidden selection:bg-blue-500/30">
      {/* Blueprint Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-black uppercase tracking-widest mx-auto mb-2">
            <Wrench className="w-3.5 h-3.5" /> Learning Sandboxes
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            System <span className="text-blue-600">Resources</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">
            Shift from passive reading to active execution. Utilize our interactive terminal tools to calibrate your conceptual understanding and speed.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {resources.map((resource, idx) => (
            <Link 
              key={idx} 
              href={resource.href}
              className="group relative bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 flex flex-col h-full hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Background Glow Effect on Hover */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-slate-50 rounded-full blur-3xl group-hover:bg-blue-50 transition-colors duration-500 -z-10" />

              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <resource.icon className="w-7 h-7" />
                </div>
                <span className="text-[9px] font-black text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md uppercase tracking-widest border border-slate-100 group-hover:border-blue-200 group-hover:text-blue-600 transition-colors">
                  {resource.tag}
                </span>
              </div>
              
              <div className="flex-grow">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3 group-hover:text-blue-600 transition-colors">
                  {resource.title}
                </h2>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
                  {resource.desc}
                </p>
              </div>

              {/* Action Footer */}
              <div className="pt-5 border-t border-slate-100 flex items-center justify-between mt-auto">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">
                  Initialize Module
                </span>
                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Support / Tech Notice */}
        <div className="mt-16 text-center border-t border-slate-200 pt-8">
          <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
             <Cpu className="w-4 h-4" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em]">System Diagnostics</span>
          </div>
          <p className="text-xs font-bold text-slate-400">
            All sandboxes are continuously synced with the latest IOE syllabus updates.
          </p>
        </div>

      </div>
    </div>
  );
}