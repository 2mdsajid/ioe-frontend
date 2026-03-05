import { constructMetadata } from '@/lib/data/global.data';
import { Activity, Cpu, ShieldCheck, Target, Terminal, Award } from 'lucide-react';

export const metadata = constructMetadata({
    title: 'IOE Locus | Architecture & Mission',
    description: 'Discover the engine behind Nepal’s premier IOE entrance portal. Built by engineers for future engineers.',
});

const Page = () => {
    return (
        <div className="bg-slate-50 min-h-screen relative overflow-hidden text-slate-900">
            
            {/* Engineering Grid Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
            </div>

            <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

                {/* --- Hero Section --- */}
                <section className="text-center mb-24">
                    <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-md bg-white border border-slate-200 text-blue-600 mb-8 shadow-sm">
                        <Activity className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">The Edulocus Initiative</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-6">
                        Architecting Nepal&apos;s <br />
                        <span className="text-blue-600">Future Engineers.</span>
                    </h1>
                    
                    <p className="max-w-2xl mx-auto text-lg text-slate-500 font-medium leading-relaxed border-l-2 border-slate-200 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
                        IOE Locus is the definitive high-performance engine for engineering aspirants,
                        providing rigorous, data-driven preparation for TU IOE, KU, and PU entrance exams.
                    </p>
                </section>

                {/* --- Mission Grid --- */}
                <div className="grid md:grid-cols-3 gap-6 mb-32">
                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm group hover:shadow-xl hover:border-blue-200 transition-all flex flex-col">
                        <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all shadow-sm">
                            <Target className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">System Mission</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            To democratize high-quality engineering education in Nepal by providing real-time telemetry and data-driven insights to every aspirant.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm group hover:shadow-xl hover:border-blue-200 transition-all flex flex-col">
                        <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all shadow-sm">
                            <Cpu className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">For Students</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Engineered by those who have walked the path. We understand the mathematical rigor of entrance exams and the precision required to succeed.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm group hover:shadow-xl hover:border-blue-200 transition-all flex flex-col">
                        <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all shadow-sm">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Data Integrity</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            We maintain strict standards of algorithmic security and accuracy in our mock exams, ensuring a 1:1 realistic testing environment.
                        </p>
                    </div>
                </div>

                {/* --- Story Section --- */}
                <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden mb-24 shadow-sm">
                    <div className="grid lg:grid-cols-2">
                        
                        {/* Left Content */}
                        <div className="p-10 md:p-16 flex flex-col justify-center">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 mb-8">
                                The <span className="text-blue-600">Architecture</span>
                            </h2>
                            <div className="space-y-6 text-slate-500 text-sm leading-relaxed border-l-2 border-slate-100 pl-6">
                                <p>
                                    IOE Locus began as a response to the lack of structured,
                                    highly analytical resources for engineering aspirants in Nepal.
                                    What started as a simple static question bank evolved into a
                                    sophisticated, real-time analytics platform.
                                </p>
                                <p>
                                    Today, we process thousands of mock test submissions,
                                    offering students the diagnostic tools to track their progress, identify
                                    weaknesses in specific mathematical or physical concepts, and approach their exams with absolute precision.
                                </p>
                            </div>
                            
                            {/* Stats */}
                            <div className="mt-12 flex items-center gap-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <div className="flex flex-col">
                                    <span className="text-3xl font-black text-slate-900 tracking-tighter">10Yrs+</span>
                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">Past Questions</span>
                                </div>
                                <div className="w-px h-12 bg-slate-200" />
                                <div className="flex flex-col">
                                    <span className="text-3xl font-black text-slate-900 tracking-tighter">50+</span>
                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">Mock Tests</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Graphic Banner */}
                        <div className="bg-slate-900 p-12 flex items-center justify-center relative group overflow-hidden">
                            {/* Blueprint background for the dark section */}
                            <div className="absolute inset-0 z-0 opacity-[0.1]" 
                                 style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
                            </div>

                            <Terminal className="w-64 h-64 text-slate-800 absolute rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none" />
                            
                            <div className="relative z-10 text-center bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-800">
                                <Award className="w-12 h-12 text-blue-500 mx-auto mb-6" />
                                <p className="text-2xl font-bold text-white tracking-tighter leading-tight">
                                    Nepal&apos;s Premier <br />
                                    <span className="text-blue-500">IOE Portal</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer Tag */}
                <div className="text-center pt-8 border-t border-slate-200">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">
                        IOE LOCUS &bull; CORE_v1.0.2
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Page;