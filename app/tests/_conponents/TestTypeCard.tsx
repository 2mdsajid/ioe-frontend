"use client";

import React from 'react';
import Link from 'next/link';
import {
  BarChart3,
  BookOpen,
  FileText,
  Lock,
  ChevronRight,
  Settings
} from 'lucide-react';
import { cn } from "@/lib/utils";

const iconMap: Record<string, any> = {
  BarChart: BarChart3,
  BookOpen: BookOpen,
  FileText: FileText,
};

interface TestTypeCardProps {
  card: {
    type: string;
    title: string;
    description: string;
    icon: string;
    href: string;
    accessLevel: string;
  };
  isAvailable: boolean;
  isLocked: boolean;
}

const TestTypeCard: React.FC<TestTypeCardProps> = ({ card, isLocked }) => {
  const Icon = iconMap[card.icon] || Settings;
  const destination = `/tests/${card.href}`;

  return (
    <Link
      href={isLocked ? "#" : destination}
      className={cn(
        "relative group block w-full rounded-2xl transition-all duration-300",
        isLocked ? "cursor-not-allowed" : "hover:-translate-y-1"
      )}
    >
      {/* Main Card Body - Condensed Light Theme */}
      <div className={cn(
        "relative h-full bg-white border rounded-2xl p-5 flex flex-col overflow-hidden transition-all duration-300",
        isLocked
          ? "border-slate-100 opacity-80"
          : "border-slate-200 shadow-sm hover:border-blue-200 hover:shadow-md hover:shadow-blue-500/5"
      )}>

        {/* Header: Smaller Icon & Status */}
        <div className="flex justify-between items-start mb-4">
          <div className={cn(
            "p-2.5 rounded-xl transition-all duration-500",
            isLocked
              ? "bg-slate-50 text-slate-400"
              : "bg-blue-600 text-white shadow-md shadow-blue-100 group-hover:scale-105"
          )}>
            <Icon className="w-5 h-5" />
          </div>

          {isLocked ? (
            <div className="bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Lock className="w-2.5 h-2.5 text-slate-400" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Pro</span>
            </div>
          ) : (
            <div className="bg-blue-50 px-2 py-0.5 rounded-md flex items-center gap-1">
              <div className="w-1 h-1 bg-blue-600 rounded-full animate-pulse" />
              <span className="text-[9px] font-bold text-blue-600 uppercase tracking-tight">Ready</span>
            </div>
          )}
        </div>

        {/* Content - Tighter Typography */}
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-slate-900 mb-1 tracking-tight group-hover:text-blue-600 transition-colors">
            {card.title}
          </h3>
          <p className="text-slate-500 text-[11px] leading-snug mb-4 font-medium line-clamp-2">
            {card.description}
          </p>
        </div>

        {/* Action Footer - Low Profile */}
        <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
          <span className={cn(
            "text-[14px] font-black uppercase tracking-wider",
            isLocked ? "text-slate-300" : "text-blue-600"
          )}>
            {isLocked ? "Locked" : "Start Now"}
          </span>
          <div className={cn(
            "w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300",
            isLocked ? "bg-slate-50 text-slate-200" : "bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white"
          )}>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TestTypeCard;