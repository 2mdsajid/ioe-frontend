import React from 'react';

export default function Page() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-900 overflow-hidden p-6">
      {/* Engineering Blueprint Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      ></div>

      <div className="relative z-10 text-center max-w-3xl mx-auto space-y-8">
        {/* Branding Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px] font-black uppercase tracking-widest mx-auto mb-4">
            System Initialization in Progress
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
            IOE <span className="text-indigo-600">Locus</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">
            The Engineer's Entrance Terminal
          </p>
        </div>

        {/* Informational Text */}
        <div className="space-y-6">
          <p className="text-2xl md:text-3xl font-bold text-slate-700 leading-tight">
            Precision-Engineered Preparation <br /> 
            <span className="text-indigo-500">Launching Soon.</span>
          </p>
          <p className="max-w-xl mx-auto text-base md:text-lg text-slate-500 font-medium leading-relaxed border-l-4 border-indigo-100 pl-6 text-left">
            We are assembling the ultimate diagnostic platform for Pulchowk and IOE-affiliated entrance exams. Prepare to transition from rote learning to technical mastery.
          </p>
        </div>

        {/* Subtle Loading Element */}
        <div className="pt-8">
          <div className="w-48 h-1 bg-slate-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-indigo-600 w-1/3 animate-pulse"></div>
          </div>
          <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Compiling Resources & Mock Modules
          </p>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
        © 2026 IOE Locus • Edulocus Initiative
      </div>
    </div>
  );
}