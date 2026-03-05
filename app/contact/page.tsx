import { constructMetadata } from '@/lib/data/global.data';
import FeedbackForm from './_components/ContactForm'

type Props = {}

export const metadata = constructMetadata({
    title: 'IOE Locus | Technical Support',
    description: 'Connect with the IOE Locus team. Share your feedback, technical inquiries, or system suggestions.',
});

const page = (props: Props) => {
    return (
        <div className='min-h-screen flex items-center justify-center bg-slate-50 px-4 relative overflow-hidden'>
            {/* Engineering Blueprint Grid Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            
            <div className="relative z-10 w-full flex justify-center py-20">
                <FeedbackForm />
            </div>
        </div>
    )
}

export default page