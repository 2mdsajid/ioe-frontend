import { Cpu, Hash } from 'lucide-react';
import SubjectWiseStartButton from './SubjectWiseStartButton';
import { LANGUAGE } from '@/lib/schema/base.schema';

type Props = {
    slug: string;
    name: string;
    count: number;
    locale: LANGUAGE
};

const SubjectCard = ({ slug, name, count, locale }: Props) => {
    return (
        <div className="
            group flex flex-col h-full bg-white
            border border-slate-200 rounded-2xl p-5
            transition-all duration-300 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="
                    w-10 h-10 rounded-xl bg-blue-50 
                    flex items-center justify-center border border-blue-100 
                    group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm shadow-blue-50"
                >
                    <Cpu className="w-5 h-5 text-blue-600 group-hover:text-white" />
                </div>
            </div>

            <div className="flex-grow">
                <h3 className="text-lg font-bold text-slate-900 mb-1 tracking-tight group-hover:text-blue-600 transition-colors">
                    {name}
                </h3>
                
                <div className="flex items-center gap-1.5 text-slate-400">
                    <Hash className="w-3 h-3 text-blue-600/50" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                        {count} Problems Loaded
                    </span>
                </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-50">
                <SubjectWiseStartButton
                    name={name}
                    slug={slug}
                    locale={locale}
                />
            </div>
        </div>
    );
};

export default SubjectCard;