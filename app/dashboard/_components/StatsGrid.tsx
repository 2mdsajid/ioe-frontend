import { TDashboardAnalyticData } from '@/lib/schema/analytics.schema';
import { BookOpen, CheckCircle2, Target, XCircle } from 'lucide-react';

export const StatsGrid = ({ data }: { data: TDashboardAnalyticData }) => {
  const stats = [
    { label: 'Total Tests', value: data.totalTests, icon: BookOpen, color: 'text-blue-400' },
    { label: 'Avg. Accuracy', value: `${data.averageAccuracy}%`, icon: Target, color: 'text-amber-500' },
    { label: 'Correct', value: data.totalCorrectAnswers, icon: CheckCircle2, color: 'text-emerald-400' },
    { label: 'Incorrect', value: data.totalIncorrectanswers, icon: XCircle, color: 'text-rose-400' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-[#0B1221] p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex flex-col gap-4">
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{stat.label}</p>
              <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};