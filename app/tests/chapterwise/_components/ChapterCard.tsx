import { Cpu, Lock, Hash } from 'lucide-react';
import ChapterWiseStartButton from './ChapterWiseStartButton';
import { LANGUAGE } from '@/lib/schema/base.schema';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ChapterCardProps {
  subjectSlug: string;
  chapterSlug: string;
  chapterName: string;
  questionCount: number;
  locale: LANGUAGE;
  isLocked: boolean;
}

const ChapterCard: React.FC<ChapterCardProps> = ({ 
  subjectSlug, 
  chapterSlug, 
  chapterName, 
  questionCount, 
  locale, 
  isLocked 
}) => {
  return (
    <div className={`
      flex items-center justify-between p-4 bg-white
      border rounded-xl transition-all duration-300 group
      ${isLocked 
        ? 'border-slate-100 opacity-70 bg-slate-50/50' 
        : 'border-slate-200 hover:border-blue-200 hover:shadow-md hover:shadow-blue-500/5'}
    `}>
      <div className="flex items-center gap-4">
        <div className={`
          flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors
          ${isLocked ? 'bg-slate-200 text-slate-400' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'}
        `}>
          {isLocked ? (
            <Lock className="h-4 w-4" />
          ) : (
            <Cpu className="h-4 w-4" />
          )}
        </div>
        <div>
          <h4 className="font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors leading-tight text-sm">
            {chapterName}
          </h4>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Hash className="w-2.5 h-2.5 text-blue-600/50" />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              {questionCount} Problems
            </span>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 ml-4">
        {isLocked ? (
          <Button asChild className="h-8 px-4 bg-slate-100 hover:bg-blue-600 text-slate-600 hover:text-white font-bold text-[9px] uppercase tracking-widest rounded-lg transition-all border-none">
            <Link href="/membership">
              Unlock <Lock className="ml-1.5 h-2.5 w-2.5" />
            </Link>
          </Button>
        ) : (
          <ChapterWiseStartButton 
            subjectSlug={subjectSlug}
            chapterSlug={chapterSlug}
            chapterName={chapterName}
            locale={locale}
          />
        )}
      </div>
    </div>
  );
};

export default ChapterCard;