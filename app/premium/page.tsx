import { Button } from "@/components/ui/button";
import { constructMetadata } from "@/lib/data/global.data";
import { 
    CheckCircle, ChevronRight, Star, Zap, BarChart, BookOpen, 
    TrendingUp, Cpu, Mail, MessageSquare, Phone, ArrowRight, ShieldCheck, Activity, Database
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
    title: "IOE Locus | Pro Access",
    description: "Unlock advanced telemetry, unlimited mock exams, and premium diagnostic tools for IOE preparation.",
});

// Hardcoded English Features for IOE Locus
const freeFeatures = [
    { title: "Standard Mock Exams (Limited)", icon: BookOpen },
    { title: "Basic Performance Analytics", icon: BarChart },
    { title: "Public Leaderboard Access", icon: TrendingUp },
    { title: "Recent Past Papers (3 Years)", icon: Database },
];

const premiumFeatures = [
    { title: "Unlimited IOE, KU & PU Mock Exams", icon: Cpu },
    { title: "Deep Diagnostic Analytics & Telemetry", icon: Activity },
    { title: "AI-Driven Weakness Detection", icon: Target },
    { title: "Complete Past Paper Archive (10+ Yrs)", icon: Database },
    { title: "Priority System Support", icon: Zap },
    { title: "Ad-Free Secure Workspace", icon: ShieldCheck },
];

const Page = () => {
    return (
        <div className="bg-slate-50 text-slate-900 min-h-screen relative overflow-hidden">
            
            {/* Engineering Grid Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
            </div>

            {/* ========= Hero Section ========= */}
            <section className="relative text-center pt-12 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    
                    {/* System Badge */}
                    <div className="inline-flex items-center gap-2 py-1 px-3 rounded-md bg-blue-50 border border-blue-100 text-blue-600 mb-8 shadow-sm">
                        <Activity className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">System Upgrade</span>
                    </div>

                    <h1 className="mb-6 text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl leading-tight">
                        Initialize <br className="hidden sm:block" />
                        <span className="text-blue-600">Pro Access.</span>
                    </h1>
                    
                    <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-500 font-medium leading-relaxed border-l-2 border-slate-200 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
                        Access the full suite of advanced telemetry, unlimited mock exams, and premium diagnostic tools engineered for top-tier IOE preparation.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button asChild className="rounded-xl px-10 py-7 text-[11px] font-bold bg-slate-900 hover:bg-blue-600 text-white shadow-xl shadow-slate-200/50 transition-all uppercase tracking-widest">
                            <Link href={'/premium/register'}>
                                Activate Pro License <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
            
            {/* ========= Features Comparison Section ========= */}
            <section className="container mx-auto px-4 py-24 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900">
                        Capability Comparison
                    </h2>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-4">Review System Tiers</p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:items-start max-w-6xl mx-auto">
                    
                    {/* --- FREE Tier --- */}
                    <div className="h-full bg-white border border-slate-200 rounded-2xl p-10 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                        <div className="mb-8 pb-8 border-b border-slate-100">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Basic Tier</h3>
                            <div className="text-3xl font-bold tracking-tighter text-slate-900">Free Access</div>
                        </div>
                        
                        <ul className="space-y-6 flex-1">
                            {freeFeatures.map(feature => (
                                <li key={feature.title} className="flex items-center group">
                                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-400 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                                        <feature.icon className="h-5 w-5" />
                                    </div>
                                    <span className="font-bold text-slate-600 text-sm">{feature.title}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* --- PREMIUM Tier --- */}
                    <div className="relative h-full bg-slate-900 border border-slate-800 rounded-2xl p-10 shadow-2xl flex flex-col overflow-hidden">
                        {/* Dark Grid Background for Premium Card */}
                        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
                             style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
                        </div>

                        <div className="absolute top-0 right-8 bg-blue-600 text-white text-[9px] font-black px-4 py-1.5 rounded-b-xl uppercase tracking-widest shadow-sm z-10">
                            Recommended
                        </div>
                        
                        <div className="mb-8 pb-8 border-b border-slate-800 relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <Star className="h-4 w-4 text-blue-500" />
                                <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Pro Tier</h3>
                            </div>
                            <div className="text-3xl font-bold tracking-tighter text-white">Premium License</div>
                        </div>

                        <ul className="space-y-6 flex-1 relative z-10">
                            {premiumFeatures.map(feature => (
                                <li key={feature.title} className="flex items-center group">
                                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all">
                                        <CheckCircle className="h-4 w-4" />
                                    </div>
                                    <span className="font-bold text-slate-200 text-sm group-hover:text-white transition-colors">{feature.title}</span>
                                </li>
                            ))}
                        </ul>

                        <Button asChild className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white font-bold py-7 rounded-xl uppercase tracking-widest text-[11px] shadow-lg relative z-10 transition-transform">
                            <Link href={'/premium/register'}>
                                Initialize Pro Workspace <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* ========= Contact Section ========= */}
            <section className="bg-white py-24 border-y border-slate-200 relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tighter text-slate-900">System Support</h2>
                    <p className="mx-auto max-w-2xl text-sm text-slate-500 mb-12 font-medium">
                        Need assistance with your license activation? Our technical team is on standby.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <ContactCard
                            icon={MessageSquare}
                            title="Facebook Support"
                            href="https://www.facebook.com/edu.locus"
                        />
                        <ContactCard
                            icon={Phone}
                            title="WhatsApp Interface"
                            href="https://wa.me/9779763249052"
                        />
                        <ContactCard
                            icon={Mail}
                            title="Email Technical Team"
                            href="mailto:support@ioelocus.com"
                        />
                    </div>
                </div>
            </section>

            {/* ========= Final CTA Section ========= */}
            <section className="py-20 relative z-10 bg-slate-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 mb-10">
                        Ready to elevate your <span className="text-blue-600">Preparation?</span>
                    </h2>
                    <Button asChild className="rounded-xl px-10 py-7 text-[11px] font-bold bg-slate-900 text-white hover:bg-blue-600 shadow-xl shadow-slate-200/50 transition-all uppercase tracking-widest">
                        <Link href={'/premium/register'}>
                            Activate Pro Now <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
                
                {/* Footer Branding */}
                <div className="mt-16 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                        IOE LOCUS &bull; CORE_v1.0.2
                    </p>
                </div>
            </section>
        </div>
    );
};

// Sub-component for Contact Links
const ContactCard = ({ icon: Icon, title, href }: { icon: React.ElementType; title: string; href: string; }) => (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="group">
        <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col items-center">
            <div className="w-14 h-14 bg-white border border-slate-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all text-blue-600 shadow-sm">
                <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest group-hover:text-blue-600 transition-colors">{title}</h3>
        </div>
    </Link>
);

// Target icon since we swapped the import up top for Activity
function Target(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

export default Page;