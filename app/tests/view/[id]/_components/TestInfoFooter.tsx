import { ExternalLink, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface TestInfoFooterProps {
    description?: string;
    specialUrl?: string;
    specialImage?: string;
}

const TestInfoFooter: React.FC<TestInfoFooterProps> = ({ description, specialUrl, specialImage }) => {
    return (
        <div className="space-y-8">
            {description && (
                <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 text-sm leading-relaxed font-medium">
                        {description}
                    </p>
                </div>
            )}
            
            {specialUrl && (
                <div className="pt-6 border-t border-slate-100">
                    <Link
                        href={specialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 shadow-sm"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-white rounded-lg border border-slate-100 group-hover:text-blue-600 transition-colors">
                                <BookOpen className="h-5 w-5" />
                            </div>
                            <div>
                                <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">Technical Resource</span>
                                <span className="block text-sm font-bold text-slate-800">Reference Syllabus & Material</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {specialImage && <img src={specialImage} alt="Ref" className="h-8 w-8 object-contain group-hover:scale-110 transition-transform" />}
                            <ExternalLink className="h-4 w-4 text-slate-300 group-hover:text-blue-600" />
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default TestInfoFooter;