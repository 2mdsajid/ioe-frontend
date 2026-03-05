import { TDashboardAnalyticData } from '@/lib/schema/analytics.schema';
import { TrendingUp, AlertTriangle } from 'lucide-react';

export const SubjectInsights = ({ data }: { data: TDashboardAnalyticData['performance'] }) => {
  const subjectKeys = Object.keys(data.chapters.insights);

  return (
    <div className="space-y-6">
      {subjectKeys.map((subject) => {
        const insight = data.chapters.insights[subject];
        return (
          <div key={subject} className="bg-[#0B1221] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="px-6 py-4 bg-[#0F172A] border-b border-slate-800">
              <h3 className="text-sm font-black text-amber-500 uppercase tracking-[0.2em]">{subject}</h3>
            </div>
            
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
              {/* Strengths */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4 text-emerald-400 font-bold text-sm uppercase tracking-tight">
                  <TrendingUp className="w-4 h-4" />
                  <h4>Top Chapters</h4>
                </div>
                <div className="space-y-2">
                  {insight.top.map((chapter) => (
                    <div key={chapter.name} className="flex justify-between items-center p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                      <span className="text-sm font-medium text-slate-300">{chapter.name}</span>
                      <span className="text-sm font-bold text-emerald-400">{chapter.accuracy}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weaknesses */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4 text-amber-500 font-bold text-sm uppercase tracking-tight">
                  <AlertTriangle className="w-4 h-4" />
                  <h4>Focus Needed</h4>
                </div>
                <div className="space-y-2">
                  {insight.weakest.map((chapter) => (
                    <div key={chapter.name} className="flex justify-between items-center p-3 bg-amber-500/5 rounded-lg border border-amber-500/10">
                      <span className="text-sm font-medium text-slate-300">{chapter.name}</span>
                      <span className="text-sm font-bold text-amber-500">{chapter.accuracy}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};