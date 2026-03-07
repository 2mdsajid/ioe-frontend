import { Loader2 } from "lucide-react";

export const Spinner = () => <Loader2 className="animate-spin h-4 w-4" />;

export const DifficultyButton = ({ label, onClick, isActive, disabled }: { label: string; onClick: () => void; isActive: boolean; disabled: boolean; }) => {
    const baseClasses = "w-full rounded-xl py-3 text-[10px] font-black uppercase tracking-widest transition-all border";
    const activeClasses = "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200 scale-105";
    const inactiveClasses = "bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:bg-slate-50";
    const disabledClasses = "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed opacity-50";
    
    return (
        <button type="button" onClick={onClick} disabled={disabled} className={`${baseClasses} ${disabled ? disabledClasses : isActive ? activeClasses : inactiveClasses}`}>
            {label}
        </button>
    );
};