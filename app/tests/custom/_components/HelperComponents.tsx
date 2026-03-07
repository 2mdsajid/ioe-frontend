import { useState, useEffect } from "react";

export const Spinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const Checkbox = ({ id, label, checked, onChange, disabled = false }: { id: string, label: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, disabled?: boolean }) => (
    <div className="flex items-center group cursor-pointer">
        <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
        />
        <label htmlFor={id} className={`ml-3 block text-xs font-bold uppercase tracking-tight cursor-pointer transition-colors ${disabled ? 'text-slate-300' : 'text-slate-700 group-hover:text-blue-600'}`}>
            {label}
        </label>
    </div>
);

export const QuestionInput = ({ label, value, onChange, max }: { label: string, value: number, onChange: (val: number) => void, max: number }) => {
    const [displayValue, setDisplayValue] = useState(value.toString());

    useEffect(() => {
        if (parseInt(displayValue, 10) !== value) {
            setDisplayValue(value.toString());
        }
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedValue = e.target.value.replace(/[^0-9]/g, '');
        setDisplayValue(sanitizedValue);
        let numValue = sanitizedValue === '' ? 0 : parseInt(sanitizedValue, 10);
        if (numValue > max) {
            numValue = max;
            setDisplayValue(max.toString());
        }
        onChange(numValue);
    };

    return (
        <div className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0">
            <label className="text-[11px] font-medium text-slate-500 truncate pr-4">{label}</label>
            <input
                type="text" 
                inputMode="numeric" 
                value={displayValue} 
                onChange={handleInputChange}
                onBlur={() => setDisplayValue(value.toString())}
                className="w-14 h-8 rounded-md border border-slate-200 bg-slate-50 text-center text-xs font-bold text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                placeholder="0"
            />
        </div>
    );
};