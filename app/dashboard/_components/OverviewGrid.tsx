// components/dashboard/OverviewGrid.tsx
import { Target, CheckCircle2, XCircle, MinusCircle, Zap } from "lucide-react";
import { TDashboardAnalyticData } from "@/lib/schema/analytics.schema";

export const OverviewGrid = ({ data }: { data: TDashboardAnalyticData }) => {
  const metrics = [
    { label: "Aggregate Accuracy", val: `${data.averageAccuracy}%`, icon: Target, color: "text-blue-500", border: "border-blue-500/20" },
    { label: "Successful Identifications", val: data.totalCorrectAnswers, icon: CheckCircle2, color: "text-emerald-500", border: "border-emerald-500/20" },
    { label: "Failed Identifications", val: data.totalIncorrectanswers, icon: XCircle, color: "text-rose-500", border: "border-rose-500/20" },
    { label: "Unattempted Nodes", val: data.totalUnattemptQuestions, icon: MinusCircle, color: "text-slate-500", border: "border-slate-800" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, i) => (
        <div key={i} className={`bg-[#0B1221] border ${m.border} p-6 rounded-2xl shadow-xl transition-all hover:bg-[#0F172A]`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg bg-slate-900 ${m.color}`}>
              <m.icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{m.label}</span>
          </div>
          <div className="text-3xl font-black text-white tracking-tighter">{m.val}</div>
        </div>
      ))}
    </div>
  );
};