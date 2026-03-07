import ErrorPage from '@/components/reusable/ErrorPage';
import { getDashboardAnalytics } from '@/lib/actions/analytis.actions';
import { getUserlanguage } from '@/lib/actions/language.actions';
import { getUserSession } from '@/lib/auth/auth';
import { constructMetadata } from '@/lib/data/global.data';
import { LanguageSchema } from '@/lib/schema/base.schema';
import { redirect } from 'next/navigation';
import DashboardClient from './_components/DashboardClient';
import { Activity, ShieldCheck } from 'lucide-react'; // Added for the structural badge

type Props = {};

export const metadata = constructMetadata({
    title: "IOE Locus | Dashboard",
    description: "Your personal performance and analytics dashboard."
})

const page = async (props: Props) => {
    const { data: user } = await getUserSession();
    if (!user?.id) {
        redirect('/login?ru=/dashboard');
    }

    const userLanguage = await getUserlanguage()
    if (!userLanguage || !LanguageSchema.safeParse(userLanguage).success) {
        redirect('/lan?ru=/dashboard')
    }

    const {
        data: dashboardAnalyticsData,
        message: dashboardAnalyticsMessage,
    } = await getDashboardAnalytics(user.id);

    if (!dashboardAnalyticsData) {
        return <ErrorPage errorMessage={dashboardAnalyticsMessage || "Could not load dashboard data."} />;
    }

    return (
        <div className='w-full bg-slate-50 min-h-screen relative overflow-hidden text-slate-900 pt-12 lg:pt-24'>
            {/* IOE Locus Engineering Grid Background */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
            </div>

            <div className='relative z-10 max-w-7xl mx-auto space-y-8 pb-16 px-4 sm:px-6 lg:px-8'>
                <header className="border-b border-slate-200 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

 

                        {/* Right: User Session & Subscription Pill */}
                        <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-full border border-slate-200 shadow-sm shrink-0">
                            {/* Avatar / Image */}
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt={user.name || "User Avatar"}
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <span className="text-slate-500 font-bold text-lg">
                                        {user.name?.charAt(0).toUpperCase() || 'U'}
                                    </span>
                                )}
                            </div>

                            {/* User Details & Subscription */}
                            <div className="flex flex-col justify-center">
                                <span className="text-sm font-bold text-slate-900 leading-tight">
                                    {user.name}
                                </span>

                                <div className="flex items-center mt-1">
                                    {/* Replace 'user.isPremium' or 'user.plan' with your actual DB property. 
                        This renders a gold/amber badge for Pro users, and a standard slate badge for Free users.
                    */}
                                    {user.isSubscribed ? (
                                        <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50">
                                            <ShieldCheck className="w-3 h-3" /> Pro Access
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                                            Basic Tier
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main>
                    {/* Passing the heavily nested Zod-validated data to the client */}
                    <DashboardClient data={dashboardAnalyticsData} />
                </main>
            </div>
        </div>
    );
};

export default page;