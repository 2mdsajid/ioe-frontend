// components/dashboard/TechnicalMastery.tsx
import { TDashboardAnalyticData } from "@/lib/schema/analytics.schema";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const TechnicalMastery = ({ data }: { data: TDashboardAnalyticData }) => {
  const { subjects, chapters } = data.performance;

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Subject Performance List */}
      <div className="lg:col-span-1 space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-blue-500 mb-4 px-2">Module Proficiency</h3>
        {Object.entries(subjects.stats).map(([name, stat]) => (
          <div key={name} className="bg-[#0B1221] border border-slate-800 p-5 rounded-2xl">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-white">{name}</span>
              <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-400">
                {stat.accuracy}% ACC
              </Badge>
            </div>
            <Progress value={stat.accuracy} className="h-1.5 bg-slate-900" />
            <div className="flex gap-3 mt-3 text-[9px] font-bold text-slate-500 uppercase">
              <span>{stat.correct} Correct</span>
              <span>{stat.incorrect} Incorrect</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chapter Diagnostics - Nested Subject -> Chapter Logic */}
      <div className="lg:col-span-2 space-y-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-blue-500 mb-4 px-2">Chapter failure analysis</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(chapters.insights).map(([subject, insight]) => (
            <div key={subject} className="bg-[#0B1221] border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{subject}</span>
                <span className="text-[9px] font-bold text-rose-500 uppercase">Weakest Nodes</span>
              </div>
              <div className="space-y-3">
                {insight.weakest.slice(0, 3).map((chapter, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-xs text-slate-300 truncate pr-4">{chapter.name}</span>
                    <span className="text-[10px] font-mono font-bold text-rose-400">{chapter.accuracy}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};