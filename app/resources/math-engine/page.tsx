"use client";

import React, { useState } from 'react';
import { Calculator, Target, Zap, Clock, BrainCircuit, CheckCircle2 } from 'lucide-react';
import { ParsedElement } from '@/lib/utils';

export default function MathematicsEnginePage() {
  const [activeShortcut, setActiveShortcut] = useState(0);

  const shortcuts = [
    {
      topic: "Integral Calculus",
      name: "Euler's Form",
      problem: "&int; e<sup>x</sup> [f(x) + f'(x)] dx",
      standard: "Expand, apply integration by parts to the first term, cancel out the second term.",
      locus: "e<sup>x</sup> f(x) + C",
      timeSaved: "1.5 mins"
    },
    {
      topic: "Vectors",
      name: "Coplanar Shortcut",
      problem: "Find <i>k</i> if vectors <b>a</b>, <b>b</b>, <b>c</b> are coplanar.",
      standard: "Calculate the scalar triple product <b>a</b> &middot; (<b>b</b> &times; <b>c</b>) and set it to 0. Requires expanding a 3x3 determinant manually.",
      locus: "Set the determinant of their coefficients to 0 immediately: |a &nbsp; b &nbsp; c| = 0",
      timeSaved: "2 mins"
    },
    {
      topic: "Trigonometry",
      name: "Maximum Value",
      problem: "Find the max value of: a sin(&theta;) + b cos(&theta;)",
      standard: "Differentiate with respect to &theta;, equate to zero, find critical points, and plug back into the equation.",
      locus: "+&radic;(a<sup>2</sup> + b<sup>2</sup>)",
      timeSaved: "2.5 mins"
    },
    {
      topic: "Limits",
      name: "1-Cosine Shortcut",
      problem: "Evaluate: lim <sub>x&rarr;0</sub> [1 - cos(ax)] / x<sup>2</sup>",
      standard: "Apply L'H&ocirc;pital's Rule twice, differentiating the numerator and denominator each time.",
      locus: "a<sup>2</sup> / 2",
      timeSaved: "1 min"
    },
    {
      topic: "Quadratic Equations",
      name: "Difference of Roots",
      problem: "Find |&alpha; - &beta;| if &alpha;, &beta; are roots of ax<sup>2</sup> + bx + c = 0",
      standard: "Find &alpha; and &beta; using the quadratic formula, then subtract them and find the absolute value.",
      locus: "&radic;(b<sup>2</sup> - 4ac) / |a|",
      timeSaved: "1.5 mins"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-black uppercase tracking-widest">
            <Target className="w-3.5 h-3.5" /> Logic & Shortcuts
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">
            Mathematics <span className="text-blue-600">Engine</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-2xl text-sm md:text-base">
            IOE Mathematics requires computational speed. Interact with the Locus Engine below to discover high-yield shortcut formulas that bypass traditional lengthy derivations.
          </p>
        </div>

        {/* Interactive Shortcut Viewer */}
        <div className="bg-white border border-slate-200 rounded-[2rem] p-4 md:p-8 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row gap-8">
          
          {/* Left: Selector */}
          <div className="w-full md:w-1/3 space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 mb-4">Select Logic Node</h3>
            {shortcuts.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => setActiveShortcut(idx)}
                className={`w-full text-left p-4 rounded-xl transition-all border ${
                  activeShortcut === idx 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200' 
                    : 'bg-slate-50 text-slate-700 border-slate-100 hover:border-blue-300'
                }`}
              >
                <div className={`text-[9px] font-bold uppercase tracking-widest mb-1 ${activeShortcut === idx ? 'text-blue-200' : 'text-slate-400'}`}>
                  {sc.topic}
                </div>
                <div className="font-black text-sm">{sc.name}</div>
              </button>
            ))}
          </div>

          {/* Right: Interactive Comparison */}
          <div className="w-full md:w-2/3 bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <BrainCircuit className="w-32 h-32" />
            </div>

            <div className="relative z-10 space-y-6">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Problem Statement</h4>
                <div className="text-lg font-bold text-slate-900 bg-white p-4 rounded-xl border border-slate-200 overflow-x-auto whitespace-nowrap">
                  {ParsedElement(shortcuts[activeShortcut].problem)}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border border-rose-100">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-3 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" /> Traditional Method
                  </h4>
                  <p className="text-xs font-medium text-slate-600 leading-relaxed">
                    {ParsedElement(shortcuts[activeShortcut].standard)}
                  </p>
                </div>

                <div className="bg-blue-600 p-5 rounded-xl shadow-md">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-3 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 fill-blue-200" /> Locus Shortcut
                  </h4>
                  <div className="text-lg font-bold text-white leading-relaxed overflow-x-auto whitespace-nowrap">
                    {ParsedElement(shortcuts[activeShortcut].locus)}
                  </div>
                  <div className="mt-4 pt-3 border-t border-blue-500 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Saves approx {shortcuts[activeShortcut].timeSaved}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}