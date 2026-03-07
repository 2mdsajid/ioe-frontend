'use client';

import React from 'react';
import { Cpu, ArrowLeft, Home, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LANGUAGE } from '@/lib/schema/base.schema';

type Props = {
  errorMessage?: string;
  children?: React.ReactNode;
  lan?: LANGUAGE;
};

const ErrorPage: React.FC<Props> = ({ errorMessage, children, lan }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen absolute top-0 bg-slate-50 text-slate-900 overflow-hidden selection:bg-blue-500/30">
      
      {/* Engineering Blueprint Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* Main Content Card */}
      <div className="relative z-10 text-center max-w-xl mx-auto px-6">
        
        {/* Animated Error Emblem */}
        <div className="flex justify-center mb-8">
          <div className="relative p-6 rounded-2xl bg-white border border-slate-200 shadow-sm group">
            <div className="absolute inset-0 bg-rose-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <TriangleAlert className="w-12 h-12 text-rose-500 relative z-10 animate-in fade-in zoom-in duration-500" />
          </div>
        </div>

        {/* Technical Heading */}
        <div className="space-y-2 mb-4">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase text-slate-900">
                SYSTEM <span className="text-blue-600">FAULT</span>
            </h2>
        </div>

        {/* Error Message with Clean Contrast */}
        <p className="text-sm md:text-base text-slate-500 mb-10 font-medium leading-relaxed max-w-md mx-auto">
          {errorMessage || 'A runtime error occurred while executing the requested module.'}
        </p>

        {/* Dynamic Content or Default Actions */}
        {children ? (
          <div className="text-slate-600 text-sm leading-relaxed mb-8 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            {children}
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto h-12 px-8 bg-slate-900 hover:bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Return Previous 
            </Button>

            <Link href="/" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full h-12 px-8 bg-white border-slate-200 hover:bg-slate-50 hover:text-blue-600 text-slate-700 font-black text-[10px] uppercase tracking-widest rounded-xl shadow-sm transition-all flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Initialize Hub
              </Button>
            </Link>
          </div>
        )}

        {/* Updated Footer Branding */}
        <div className="mt-20 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-slate-400">
                <Cpu className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">IOE Locus</span>
            </div>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                Diagnostic Terminal Offline
            </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;