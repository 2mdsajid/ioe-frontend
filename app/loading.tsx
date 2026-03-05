import { Loader2 } from 'lucide-react';
import React from 'react';

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden text-slate-900">
      
      {/* Engineering Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        
        {/* Technical Spinner Wrapper */}
        <div className="relative flex items-center justify-center">
          {/* Subtle pulse ring behind the box */}
          <div className="absolute inset-0 border-2 border-blue-200/50 rounded-2xl animate-ping opacity-20"></div>
          
          <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm relative z-10">
            <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
          </div>
        </div>

        {/* System Status Text */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-900">
            System Loading
          </p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
            Establishing Secure Connection...
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default LoadingPage;