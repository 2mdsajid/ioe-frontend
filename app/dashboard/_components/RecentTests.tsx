import { TRecentTestInDashboardData } from '@/lib/schema/analytics.schema';
import { format } from 'date-fns';

export const RecentTests = ({ tests }: { tests: TRecentTestInDashboardData[] }) => {
  return (
    <div className="bg-[#0B1221] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800">
        <h3 className="font-bold text-white">Recent Activity</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#0F172A] text-slate-500 text-[10px] uppercase font-black tracking-widest">
            <tr>
              <th className="px-6 py-4">Test Name</th>
              <th className="px-6 py-4">Score</th>
              <th className="px-6 py-4 text-right">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {tests.map((test) => (
              <tr key={test.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                    <p className="font-bold text-slate-200 text-sm">{test.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase mt-1">
                        {format(new Date(test.date), 'MMM dd, yyyy')}
                    </p>
                </td>
                <td className="px-6 py-4 text-sm font-mono text-slate-400">{test.score}/{test.totalQuestions}</td>
                <td className="px-6 py-4 text-right">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-black tracking-tighter ${
                    (test.score / test.totalQuestions) > 0.4 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                  }`}>
                    {Math.round((test.score / test.totalQuestions) * 100)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};