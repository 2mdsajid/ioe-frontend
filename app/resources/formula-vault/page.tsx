"use client";

import React, { useState } from 'react';
import { Database, BookOpen, AlertTriangle, Zap, Info, ShieldAlert } from 'lucide-react';

export default function FormulaVaultPage() {
  const [activeCategory, setActiveCategory] = useState('Mechanics');
  const [activeFormulaId, setActiveFormulaId] = useState<number | null>(0);

  const categories = ['Mechanics', 'Electromagnetism', 'Calculus', 'Chemistry'];

  const formulas: Record<string, any[]> = {
    Mechanics: [
      {
        id: 0,
        name: "Moment of Inertia (Solid Sphere)",
        equation: "I = 2/5 M R²",
        variables: [
          { sym: "M", desc: "Mass of sphere (kg)" },
          { sym: "R", desc: "Radius from axis (m)" }
        ],
        ioeTrap: "Do not confuse with a hollow sphere (2/3 MR²). IOE questions often subtly mention 'shell' vs 'solid'.",
      },
      {
        id: 1,
        name: "Escape Velocity",
        equation: "v_e = √(2GM/R) = √(2gR)",
        variables: [
          { sym: "G", desc: "Gravitational Constant" },
          { sym: "g", desc: "Acceleration due to gravity (9.8 m/s²)" }
        ],
        ioeTrap: "Escape velocity is independent of the mass of the escaping object. They will give you a mass to trick you.",
      }
    ],
    Electromagnetism: [
      {
        id: 2,
        name: "Magnetic Field at Center of Coil",
        equation: "B = (μ₀ N I) / (2 R)",
        variables: [
          { sym: "μ₀", desc: "Permeability of free space" },
          { sym: "N", desc: "Number of turns" },
          { sym: "R", desc: "Radius of the coil (m)" }
        ],
        ioeTrap: "If the wire is rewound to have double the turns, the radius halves, making the new magnetic field 4 times the original.",
      }
    ]
  };

  const currentFormulas = formulas[activeCategory] || [];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-black uppercase tracking-widest">
            <Database className="w-3.5 h-3.5" /> High-Yield Retrieval
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">
            Formula <span className="text-blue-600">Vault</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-2xl text-sm md:text-base">
            Access critical engineering formulas. Click on any formula to reveal variable definitions and common IOE entrance traps designed to trick candidates.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2rem] p-4 md:p-8 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row gap-8">
          
          {/* Left: Category & Formula List */}
          <div className="w-full md:w-1/3 space-y-6 border-r-0 md:border-r border-slate-100 pr-0 md:pr-6">
            
            {/* Category Selector */}
            <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setActiveFormulaId(formulas[cat]?.[0]?.id ?? null); }}
                  className={`shrink-0 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeCategory === cat ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Formula List */}
            <div className="space-y-3">
              {currentFormulas.length === 0 ? (
                <div className="text-xs font-bold text-slate-400 p-4 bg-slate-50 rounded-xl text-center">Module Offline</div>
              ) : (
                currentFormulas.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFormulaId(f.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all border ${
                      activeFormulaId === f.id 
                        ? 'bg-blue-50 border-blue-200 shadow-sm' 
                        : 'bg-white border-slate-100 hover:border-blue-100'
                    }`}
                  >
                    <div className="font-black text-sm text-slate-800">{f.name}</div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Right: Interactive Inspector */}
          <div className="w-full md:w-2/3">
            {activeFormulaId !== null && currentFormulas.find(f => f.id === activeFormulaId) ? (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                
                {/* Equation Display */}
                <div className="bg-slate-900 rounded-2xl p-8 relative overflow-hidden shadow-md">
                  <BookOpen className="absolute -right-4 -bottom-4 w-32 h-32 text-slate-800 opacity-50" />
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 relative z-10">Standard Notation</h4>
                  <div className="text-3xl md:text-4xl font-black text-white tracking-wider relative z-10 font-mono">
                    {currentFormulas.find(f => f.id === activeFormulaId)?.equation}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Variables */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-600" /> Parameter Glossary
                    </h4>
                    <div className="space-y-3">
                      {currentFormulas.find(f => f.id === activeFormulaId)?.variables.map((v: any, i: number) => (
                        <div key={i} className="flex gap-3 items-start border-b border-slate-200 pb-2 last:border-0 last:pb-0">
                          <span className="text-xs font-black text-slate-900 bg-white border border-slate-200 px-2 py-0.5 rounded font-mono shadow-sm">
                            {v.sym}
                          </span>
                          <span className="text-xs font-bold text-slate-600 pt-0.5">{v.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* IOE Trap */}
                  <div className="bg-rose-50 border border-rose-100 rounded-xl p-5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-600 mb-4 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4" /> IOE Entrance Trap
                    </h4>
                    <p className="text-sm font-bold text-rose-900 leading-relaxed">
                      {currentFormulas.find(f => f.id === activeFormulaId)?.ioeTrap}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
               <div className="flex flex-col items-center justify-center h-full text-slate-400 min-h-[300px]">
                 <Database className="w-12 h-12 mb-4 opacity-20" />
                 <p className="text-[10px] font-black uppercase tracking-widest">Select a formula to inspect</p>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}