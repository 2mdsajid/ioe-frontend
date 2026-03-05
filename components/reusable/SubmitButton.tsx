'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, SendHorizontal } from "lucide-react";

interface SubmitButtonProps {
  isLoadingState?: boolean;
  initialstate?: string;
  loadingstate?: string;
  className?: string;
  icon?: React.ElementType;
}

const SubmitButton = ({
  isLoadingState,
  initialstate = "Submit",
  loadingstate = "Processing...",
  className,
  icon: Icon = SendHorizontal, // Default icon
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoadingState}
      className={cn(
        "w-full py-7 rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed",
        /* Legal-Path Branding: Amber background, Navy text, Black font weight */
        "bg-amber-500 hover:bg-amber-600 text-[#020817] font-black uppercase tracking-[0.15em] shadow-lg shadow-amber-900/10",
        className
      )}
    >
      {isLoadingState ? (
        <div className="flex items-center justify-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>{loadingstate}</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3">
          <span>{initialstate}</span>
          <Icon className="h-5 w-5" />
        </div>
      )}
    </Button>
  );
};

export default SubmitButton;