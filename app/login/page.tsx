import SignInLuciaGoogleButton from '@/components/reusable/SignInLuciaGoogleButton';
import { Card } from "@/components/ui/card";
import { getUserSession } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Activity, ShieldCheck, Terminal } from "lucide-react";

type Props = {
    searchParams: Promise<{
        ru: string
        error: string
    }>
};

const LoginPage = async (props: Props) => {
    const { data: user } = await getUserSession();

    if (user && user.googleId && user.id) {
        redirect('/dashboard');
    }

    const params = await props.searchParams;
    const authMessage = params.error || "";
    const redirectUrl = params.ru || "/dashboard";

    return (
        <div className='min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden text-slate-900'>
            
            {/* Engineering Grid Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
            </div>

            <div className='w-full max-w-5xl z-10'>
                <Card className='grid md:grid-cols-2 overflow-hidden shadow-2xl shadow-slate-200/50 rounded-[1.5rem] sm:rounded-[2.5rem] border border-slate-200 bg-white'>

                    {/* Left Column: System Status Sidebar */}
                    <div className='relative flex flex-col items-start justify-between p-8 sm:p-12 md:p-16 bg-slate-900 text-white overflow-hidden'>
                        {/* Dark Mode Grid Overlay */}
                        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
                             style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
                        </div>

                        <div className="relative z-10 w-full">
                            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 px-3 py-1 sm:px-4 sm:py-1.5 rounded-md mb-6 sm:mb-10 text-blue-400">
                                <Activity className="w-3 h-3 sm:w-4 h-4" />
                                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]">Secure Node</span>
                            </div>
                            
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tighter leading-[1.1]">
                                Initialize <br className="hidden sm:block" /><span className="text-blue-500">Workspace.</span>
                            </h2>
                            <p className="text-sm sm:text-base md:text-lg font-medium text-slate-400 leading-relaxed max-w-xs border-l-2 border-slate-700 pl-4">
                                Access the high-performance preparation engine for TU IOE, KU, and PU.
                            </p>
                        </div>

                        {/* Hidden on very small screens to save vertical space, shown on md+ */}
                        <div className="relative z-10 hidden sm:flex flex-col gap-4 mt-8 md:mt-0">
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                                    <ShieldCheck className="w-4 h-4 sm:w-5 h-5" />
                                </div>
                                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400">Encrypted Telemetry</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Authorization Form */}
                    <div className='p-8 sm:p-12 md:p-20 flex flex-col justify-center bg-white text-slate-900'>
                        
                        <div className="mb-8 sm:mb-12">
                            <div className="flex items-center gap-2 text-blue-600 mb-4">
                                <Terminal className="w-5 h-5 sm:w-6 h-6" />
                                <div className="h-px w-6 sm:w-8 bg-slate-200" />
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter mb-2">
                                System <span className="text-blue-600">Login</span>
                            </h1>
                            <p className="text-slate-500 font-bold text-[10px] sm:text-xs uppercase tracking-widest">
                                Authenticate your identity to access the dashboard.
                            </p>
                        </div>

                        {/* Error Handling */}
                        {authMessage && (
                            <Alert variant="destructive" className="mb-6 sm:mb-8 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl sm:rounded-2xl shadow-sm">
                                <AlertTitle className="font-black uppercase tracking-widest text-[10px] mb-1">Authorization Refused</AlertTitle>
                                <AlertDescription className="text-xs sm:text-sm font-medium">
                                    {authMessage}
                                </AlertDescription>
                            </Alert>
                        )}

                        <div className="w-full">
                            <SignInLuciaGoogleButton ru={redirectUrl} />
                        </div>

                        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-100">
                            <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] sm:tracking-[0.2em] leading-relaxed">
                                By proceeding, you acknowledge our Terms of System Usage and Privacy Protocols.
                            </p>
                        </div>
                    </div>
                </Card>
                
                {/* Footer Branding */}
                <div className="mt-8 sm:mt-10 text-center px-4 relative z-10">
                    <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] sm:tracking-[0.5em]">
                        IOE LOCUS &bull; CORE_v1.0.2
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;