"use client";

import React, { useState } from 'react';
import { Atom, Settings2, Play, RefreshCcw } from 'lucide-react';
import { ParsedElement } from '@/lib/utils';

export default function PhysicsSimulatorPage() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [simulated, setSimulated] = useState(false);

  const scenarios = [
    {
      title: "Gravitational Force",
      formula: "F = G(m<sub>1</sub>m<sub>2</sub>) / r<sup>2</sup>",
      variable: "Distance (r)",
      action: "Halve the distance (r/2)",
      concept: "Inverse Square Law",
      result: "F<sub>new</sub> = 4F",
      explanation: "Because <i>r</i> is squared in the denominator, halving it (&frac12;)<sup>2</sup> results in a factor of &frac14; in the denominator, multiplying the total force by 4."
    },
    {
      title: "Kinetic Energy",
      formula: "KE = &frac12; m v<sup>2</sup>",
      variable: "Velocity (v)",
      action: "Double the velocity (2v)",
      concept: "Quadratic Dependency",
      result: "KE<sub>new</sub> = 4 &times; KE",
      explanation: "Kinetic energy is directly proportional to the square of the velocity. Doubling velocity (2)<sup>2</sup> increases the energy fourfold."
    },
    {
      title: "Simple Pendulum",
      formula: "T = 2&pi;&radic;(L/g)",
      variable: "Length (L)",
      action: "Increase length by 4x",
      concept: "Square Root Dependency",
      result: "T<sub>new</sub> = 2T",
      explanation: "The time period relates to the square root of the length. Increasing length by a factor of 4 increases the time period by a factor of &radic;4 = 2."
    },
    {
      title: "Capacitance",
      formula: "C = (&epsilon;<sub>0</sub>A) / d",
      variable: "Dielectric Constant (K)",
      action: "Insert dielectric (K=3)",
      concept: "Linear Dependency",
      result: "C<sub>new</sub> = 3C",
      explanation: "Capacitance is directly proportional to the dielectric constant <i>K</i> of the material between the plates. Inserting a dielectric of K=3 triples the capacitance."
    },
    {
      title: "Doppler Effect",
      formula: "f' = f [v / (v - v<sub>s</sub>)]",
      variable: "Source Velocity (v<sub>s</sub>)",
      action: "Source approaches at half speed of sound (v/2)",
      concept: "Apparent Frequency",
      result: "f' = 2f",
      explanation: "If v<sub>s</sub> = v/2, the denominator becomes v - v/2 = v/2. The fraction evaluates to v / (v/2) = 2, doubling the apparent frequency."
    }
  ];

  const handleSimulate = () => {
    setSimulated(true);
  };

  const handleReset = () => {
    setSimulated(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />

      <div className="max-w-4xl mx-auto relative z-10 space-y-12">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-black uppercase tracking-widest">
            <Atom className="w-3.5 h-3.5" /> Conceptual Physics
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">
            Physics <span className="text-blue-600">Simulator</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-2xl text-sm md:text-base">
            IOE heavily tests variable dependencies. Use the interactive terminal below to simulate how altering one physical property impacts the final outcome.
          </p>
        </div>

        {/* Interactive Simulator UI */}
        <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50">
          {/* Top Navbar */}
          <div className="bg-slate-900 px-6 py-4 flex gap-4 overflow-x-auto custom-scrollbar">
            {scenarios.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => { setActiveScenario(idx); setSimulated(false); }}
                className={`shrink-0 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                  activeScenario === idx ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {sc.title}
              </button>
            ))}
          </div>

          {/* Simulator Body */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              
              {/* Left: Input Variables */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Base Formula</h4>
                  <div className="text-xl md:text-2xl font-bold text-slate-900 overflow-x-auto whitespace-nowrap">
                    {ParsedElement(scenarios[activeScenario].formula)}
                  </div>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-xs font-bold text-slate-500">Target Variable</span>
                    <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-1 rounded text-right ml-4">
                      {ParsedElement(scenarios[activeScenario].variable)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-xs font-bold text-slate-500">Action</span>
                    <span className="text-xs font-black text-slate-900 text-right ml-4">
                      {ParsedElement(scenarios[activeScenario].action)}
                    </span>
                  </div>
                </div>

                {!simulated ? (
                  <button 
                    onClick={handleSimulate}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <Play className="w-4 h-4 fill-current" /> Execute Simulation
                  </button>
                ) : (
                  <button 
                    onClick={handleReset}
                    className="w-full h-12 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                  >
                    <RefreshCcw className="w-4 h-4" /> Reset Variables
                  </button>
                )}
              </div>

              {/* Right: Output Result */}
              <div className="relative h-full min-h-[250px] flex flex-col justify-center items-center p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-white overflow-hidden">
                {simulated ? (
                  <div className="animate-in zoom-in duration-300 w-full overflow-x-auto">
                    <div className="text-center mb-6">
                      <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">
                        Simulation Complete
                      </span>
                    </div>
                    <div className="text-3xl font-black text-slate-900 text-center mb-4">
                      {ParsedElement(scenarios[activeScenario].result)}
                    </div>
                    <p className="text-xs font-medium text-slate-500 text-center leading-relaxed">
                      {ParsedElement(scenarios[activeScenario].explanation)}
                    </p>
                  </div>
                ) : (
                  <div className="text-center opacity-50">
                    <Settings2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Awaiting Execution</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}