"use client";

import React, { useState } from 'react';
import { Map, CalendarCheck, FileText, Monitor, CheckCircle2, Circle, AlertCircle } from 'lucide-react';

export default function EntranceRoadmapPage() {
  const [activePhase, setActivePhase] = useState(1);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const toggleCheck = (item: string) => {
    setChecklist(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const phases = [
    {
      id: 1,
      icon: CalendarCheck,
      title: "Preparation Phase",
      timeframe: "Now - September",
      desc: "Calibrate your technical fundamentals. Shift from subjective +2 board exam writing to objective, speed-based CBT problem solving.",
      tasks: ["Master all Locus Shortcuts", "Complete 5 Full-Length Mock CBTs", "Revise Formula Vault"]
    },
    {
      id: 2,
      icon: FileText,
      title: "IOE Registration",
      timeframe: "Mid September",
      desc: "The official IOE portal opens. You must fill out the form flawlessly. Minor errors in documentation can lead to form rejection.",
      tasks: ["Prepare Scanned Citizenship Card", "Bank Voucher / eSewa Payment (Rs. 2000)", "+2 Transcript / Marksheet Scan", "Standard Passport Size Photo"]
    },
    {
      id: 3,
      icon: Monitor,
      title: "CBT Examination",
      timeframe: "Late October",
      desc: "The 2-hour, 140-mark computer-based test at ICTC, Pulchowk Campus. 10% negative marking applies to all incorrect attempts.",
      tasks: ["Print Admit Card (Color)", "Locate your assigned shift time", "Carry valid original ID"]
    }
  ];

  const currentPhaseData = phases.find(p => p.id === activePhase);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-black uppercase tracking-widest mb-4">
            <Map className="w-3.5 h-3.5" /> Admission Cycle Tracker
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mb-4">
            Entrance <span className="text-blue-600">Roadmap</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm max-w-xl mx-auto">Track your position in the IOE admission timeline and complete your logistics checklist to ensure you don't miss critical deadlines.</p>
        </div>

        {/* Horizontal Timeline Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 relative">
          <div className="hidden sm:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 -translate-y-1/2 rounded-full"></div>
          
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`relative flex flex-col items-center gap-3 bg-slate-50 p-2 transition-all ${activePhase === phase.id ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-4 border-slate-50 shadow-sm ${
                activePhase === phase.id ? 'bg-blue-600 text-white shadow-blue-200' : 'bg-white text-slate-400 border-slate-200'
              }`}>
                <phase.icon className="w-5 h-5" />
              </div>
              <div className="text-center">
                <div className={`text-xs font-black uppercase tracking-widest ${activePhase === phase.id ? 'text-slate-900' : 'text-slate-500'}`}>
                  {phase.title}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Phase Details Card */}
        {currentPhaseData && (
          <div className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-10 shadow-xl shadow-slate-200/50 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex flex-col md:flex-row gap-10">
              
              {/* Info Column */}
              <div className="w-full md:w-1/2 space-y-4">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-md border border-blue-100">
                  {currentPhaseData.timeframe}
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{currentPhaseData.title}</h2>
                <p className="text-sm font-medium text-slate-600 leading-relaxed border-l-2 border-slate-200 pl-4">
                  {currentPhaseData.desc}
                </p>

                <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-bold text-amber-800">
                    Stay updated with the official IOE website (entrance.ioe.edu.np) for exact dates, as the academic calendar fluctuates yearly.
                  </p>
                </div>
              </div>

              {/* Interactive Checklist Column */}
              <div className="w-full md:w-1/2 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Phase Logistics Checklist</h3>
                <div className="space-y-3">
                  {currentPhaseData.tasks.map((task, idx) => {
                    const isChecked = checklist[`${currentPhaseData.id}-${idx}`] || false;
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleCheck(`${currentPhaseData.id}-${idx}`)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                          isChecked 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                            : 'bg-white border-slate-200 hover:border-blue-300 text-slate-700'
                        }`}
                      >
                        {isChecked ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                        )}
                        <span className={`text-sm font-bold ${isChecked ? 'line-through opacity-70' : ''}`}>
                          {task}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}