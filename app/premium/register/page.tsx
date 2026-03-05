import { getUserSession } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import FullSubscriptionForm from './_components/FullSubscriptionForm';
import { constructMetadata } from '@/lib/data/global.data';

export const metadata = constructMetadata({
    title: "IOE Locus | Pro License Activation",
    description: "Complete your registration to access the advanced IOE preparation engine."
});

const Page = async () => {
    const { data: user } = await getUserSession();
    
    if (!user) {
        redirect('/login?ru=/premium/register');
    }

    // Removed language fetching logic as requested

    return (
        <div className='min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden text-slate-900'>
            
            {/* Engineering Grid Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
            </div>

            <FullSubscriptionForm user={user} />
        </div>
    );
};

export default Page;