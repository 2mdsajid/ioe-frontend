import Link from 'next/link';
import { Terminal, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { constructMetadata } from '@/lib/data/global.data';

export const metadata = constructMetadata({
    title: '404 - Route Not Found | IOE Locus',
    description: 'The requested system module does not exist in our architecture.',
});

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden text-slate-900">
      
      {/* Engineering Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-xl w-full text-center relative z-10 mt-[-10vh]">
        
        {/* Animated Icon Section */}
        <div className="relative mb-8 inline-block">
          <div className="w-20 h-20 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center text-rose-600 mx-auto relative z-10 shadow-sm">
            <Terminal className="w-10 h-10" />
          </div>
          {/* Subtle pulse behind the icon indicating a system error */}
          <div className="absolute inset-0 bg-rose-100 blur-2xl rounded-full scale-150 opacity-50 animate-pulse pointer-events-none" />
        </div>

        {/* Massive Error Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0">
          <h1 className="text-[12rem] font-black text-slate-200/50 tracking-tighter leading-none">
            404
          </h1>
        </div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-md bg-white border border-slate-200 text-slate-500 mb-6 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest">System Error</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4 leading-tight">
            Route <span className="text-rose-600">Not Found.</span>
          </h2>
          <p className="text-slate-500 font-bold uppercase tracking-[0.15em] text-[10px] mb-12 max-w-sm mx-auto leading-relaxed">
            The requested module or endpoint has been moved, deleted, or does not exist within the current architecture.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <Button asChild className="w-full sm:w-auto px-8 py-6 bg-slate-900 hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-[11px] rounded-xl shadow-xl shadow-slate-200/50 transition-all">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> System Base
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full sm:w-auto px-8 py-6 text-slate-600 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 bg-white border border-slate-200 rounded-xl font-bold uppercase tracking-widest text-[11px] transition-all">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Dashboard
            </Link>
          </Button>
        </div>

        {/* Help Text / System Tag */}
        <div className="mt-20 pt-8 border-t border-slate-200 relative z-10">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
            IOE LOCUS &bull; CORE_v1.0.2
          </p>
        </div>
      </div>
    </div>
  );
}