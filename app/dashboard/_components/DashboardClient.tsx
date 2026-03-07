"use client";

import React, { useState } from 'react';
import {
  Target,
  CheckCircle2,
  XCircle,
  History,
  TrendingUp,
  Activity,
  ChevronRight,
  AlertTriangle,
  Trophy,
  BookOpen,
  BarChart3,
  ChevronDown
} from 'lucide-react';

// Assuming these types match your Zod schemas
import { TDashboardAnalyticData, TPerformanceStat } from '@/lib/schema/analytics.schema';

interface DashboardClientProps {
  data: TDashboardAnalyticData;
}

const DashboardClient: React.FC<DashboardClientProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview');

  // Get list of subjects dynamically
  const availableSubjects = Object.keys(data.performance.subjects.stats);
  const [selectedSubject, setSelectedSubject] = useState<string>(availableSubjects[0] || '');

  // Initialize with the first subject open by default
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const toggleSubject = (subject: string) => {
    setExpandedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject) // Close if already open
        : [...prev, subject]              // Open without closing others
    );
  };

  return (
    <div className="space-y-6">

      {/* 1. Global KPI Telemetry (Always Visible) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="System Accuracy"
          value={`${data.averageAccuracy.toFixed(1)}%`}
          icon={<Target className="text-blue-600 w-5 h-5" />}
          progress={data.averageAccuracy}
        />
        <KPICard
          title="Total Attempts"
          value={data.totalQuestionsAttempt.toString()}
          icon={<Activity className="text-slate-600 w-5 h-5" />}
          subtext={`Across ${data.totalTests} test sessions`}
        />
        <KPICard
          title="Correct Modules"
          value={data.totalCorrectAnswers.toString()}
          icon={<CheckCircle2 className="text-emerald-500 w-5 h-5" />}
          progress={(data.totalCorrectAnswers / (data.totalQuestionsAttempt || 1)) * 100}
          progressColor="bg-emerald-500"
        />
        <KPICard
          title="Error Rate"
          value={data.totalIncorrectanswers.toString()}
          icon={<XCircle className="text-rose-500 w-5 h-5" />}
          progress={(data.totalIncorrectanswers / (data.totalQuestionsAttempt || 1)) * 100}
          progressColor="bg-rose-500"
        />
      </section>

      {/* 2. Interactive View Controller */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 bg-slate-50/50 p-2 gap-2 overflow-x-auto">
          <TabButton
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
            icon={<BarChart3 className="w-4 h-4" />}
            label="Overview"
          />
          <TabButton
            active={activeTab === 'history'}
            onClick={() => setActiveTab('history')}
            icon={<History className="w-4 h-4" />}
            label="Recent Tests"
          />
        </div>

        {/* Tab Content Area */}
        <div className="p-2 py-6 md:p-8 min-h-[500px]">

          {/* --- TAB: SUBJECT DIAGNOSTICS --- */}
          {activeTab === 'overview' && (
            <div className="space-y-4 animation-fade-in">
              {availableSubjects.map((subject) => {
                const isExpanded = expandedSubjects.includes(subject);

                return (
                  <div key={subject} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-all">

                    {/* Dropdown Header / Trigger */}
                    <button
                      onClick={() => toggleSubject(subject)}
                      className={`w-full px-6 py-5 flex items-center justify-between transition-colors ${isExpanded ? 'bg-slate-50 border-b border-slate-200' : 'hover:bg-slate-50'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${isExpanded ? 'bg-blue-600' : 'bg-slate-300'}`} />
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">{subject}</h3>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-blue-600' : 'text-slate-400'}`}
                      />
                    </button>

                    {/* Dropdown Content */}
                    {isExpanded && (
                      <div className="p-6 space-y-6 bg-white animate-in slide-in-from-top-2 duration-200">

                        {/* Insights Row (Top vs Weakest) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-5 border border-emerald-100 bg-emerald-50/30 rounded-xl">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2 mb-3">
                              <Trophy className="w-4 h-4" /> Strongest Chapters
                            </h4>
                            <div className="space-y-3">
                              {data.performance.chapters.insights[subject]?.top.slice(0, 3).map((insight, idx) => (
                                <div key={idx} className="flex justify-between items-center text-sm bg-white p-2.5 rounded-lg border border-emerald-100">
                                  <span className="font-bold text-slate-900 truncate pr-2 capitalize">{(insight.name).replaceAll('_',' ')}</span>
                                  <span className="font-black text-emerald-600">{insight.accuracy.toFixed(0)}%</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="p-5 border border-rose-100 bg-rose-50/30 rounded-xl">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-600 flex items-center gap-2 mb-3">
                              <AlertTriangle className="w-4 h-4" /> Requires Attention
                            </h4>
                            <div className="space-y-3">
                              {data.performance.chapters.insights[subject]?.weakest.slice(0, 3).map((insight, idx) => (
                                <div key={idx} className="flex justify-between items-center text-sm bg-white p-2.5 rounded-lg border border-rose-100">
                                  <span className="font-bold text-slate-900 truncate pr-2 capitalize">{(insight.name).replaceAll('_',' ')}</span>
                                  <span className="font-black text-rose-600">{insight.accuracy.toFixed(0)}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Detailed Chapter Data Table */}
                        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                          <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Chapter Breakdown</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Accuracy</span>
                          </div>
                          <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto custom-scrollbar">
                            {Object.entries(data.performance.chapters.stats[subject] || {}).map(([chapter, stats]) => (
                              <div key={chapter} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                <div className="flex flex-col">
                                  <span className="font-bold text-slate-900 text-sm">{chapter}</span>
                                  <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
                                    {stats.correct} Correct / {stats.incorrect} Incorrect
                                  </span>
                                </div>
                                <div className="flex items-center gap-4 w-32">
                                  <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full transition-all duration-500 ${stats.accuracy >= 70 ? 'bg-emerald-500' : stats.accuracy >= 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                                      style={{ width: `${stats.accuracy}%` }}
                                    />
                                  </div>
                                  <span className="text-xs font-black text-slate-700 w-8 text-right tabular-nums">{stats.accuracy.toFixed(0)}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* --- TAB: HISTORY LOG --- */}
          {activeTab === 'history' && (
            <div className="animation-fade-in border border-slate-200 rounded-xl overflow-hidden bg-white">
              <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 grid grid-cols-4 md:grid-cols-5 gap-4">
                <span className="col-span-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Test Parameter</span>
                <span className="hidden md:block text-[10px] font-black uppercase tracking-widest text-slate-500">Date</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Score</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Action</span>
              </div>
              <div className="divide-y divide-slate-100">
                {data.recentTests.map((test) => (
                  <div key={test.id} className="px-6 py-4 grid grid-cols-4 md:grid-cols-5 gap-4 items-center hover:bg-slate-50 transition-colors">
                    <div className="col-span-2 flex flex-col">
                      <span className="font-bold text-slate-900 text-sm truncate">{test.name}</span>
                      <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest md:hidden">
                        {new Date(test.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="hidden md:block text-xs font-medium text-slate-600">
                      {new Date(test.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-blue-50 text-blue-700 text-xs font-black px-2 py-1 rounded-md">
                        {test.score} / {test.totalQuestions}
                      </span>
                    </div>
                    <div className="text-right">
                      <button className="text-blue-600 hover:text-blue-800 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-end gap-1 w-full">
                        Review <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// Internal Components for cleaner code
const KPICard = ({ title, value, icon, subtext, progress, progressColor = "bg-blue-600" }: { title: string, value: string, icon: React.ReactNode, subtext?: string, progress?: number, progressColor?: string }) => (
  <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
    <div className="flex justify-between items-start mb-4">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{title}</span>
      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 group-hover:scale-110 transition-transform">{icon}</div>
    </div>
    <div className="text-3xl font-bold text-slate-900 tracking-tighter mb-1">{value}</div>
    {subtext && <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2">{subtext}</div>}

    {progress !== undefined && (
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100">
        <div className={`h-full ${progressColor} transition-all duration-1000 ease-out`} style={{ width: `${progress}%` }} />
      </div>
    )}
  </div>
);

const TabButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${active
      ? 'bg-white text-blue-600 shadow-sm border border-slate-200/60'
      : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-900'
      }`}
  >
    {icon} {label}
  </button>
);

export default DashboardClient;