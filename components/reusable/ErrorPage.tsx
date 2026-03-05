'use client';

import React from 'react';
import { Scale, ArrowLeft, Home, TriangleAlert } from 'lucide-react';
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
    <div className="flex flex-col items-center justify-center min-h-screen w-screen absolute top-0 bg-[#050A18] text-white overflow-hidden selection:bg-amber-500/30">
      
      {/* Background Decorative Mesh */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Content Card */}
      <div className="relative z-10 text-center max-w-xl mx-auto px-6">
        
        {/* Animated Error Emblem */}
        <div className="flex justify-center mb-10">
          <div className="relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 group">
            <div className="absolute inset-0 bg-red-500/10 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <TriangleAlert className="w-16 h-16 text-amber-500 relative z-10 animate-in fade-in zoom-in duration-500" />
          </div>
        </div>

        {/* Legal-Grade Heading */}
        <div className="space-y-2 mb-6">
            <h2 className="text-6xl md:text-7xl font-black tracking-tighter uppercase text-white">
                NOT <span className="text-amber-500">Found</span>
            </h2>
            {/* <div className="h-1 w-24 bg-amber-500 mx-auto rounded-full"></div> */}
        </div>

        {/* Error Message with High Contrast
        <p className="text-lg md:text-xl text-slate-400 mb-10 font-medium leading-relaxed max-w-md mx-auto">
          {errorMessage || 'A procedural error has occurred while processing your request.'}
        </p> */}

        {/* Dynamic Content or Default Actions */}
        {children ? (
          <div className="text-slate-300 text-lg leading-relaxed mb-8 p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl">
            {children}
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto h-14 px-8 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest rounded-2xl shadow-[0_10px_20px_rgba(245,158,11,0.2)] transition-all active:scale-95 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Return 
            </Button>

            <Link href="/" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full h-14 px-8 bg-transparent border-white/10 hover:bg-white/5 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
          </div>
        )}

        {/* Updated Footer Branding */}
        <div className="mt-16 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-slate-600">
                <Scale className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Legal-Path Nepal</span>
            </div>
            <p className="text-[10px] text-slate-700 font-bold uppercase tracking-widest">
                Academic Integrity & Excellence
            </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;