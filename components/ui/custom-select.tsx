"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function CustomSelect({ options, value, onChange, placeholder = "Seleccionar", className = "" }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative cursor-pointer select-none ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-[8px] border border-white/10 bg-[#1a1a2e] px-4 py-3 text-sm text-white outline-none transition hover:border-white/20"
      >
        <span className={selected ? "text-white" : "text-slate-500"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={16} className={`shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 origin-top overflow-auto rounded-[8px] border border-white/10 bg-[#1a1a2e] p-1 shadow-xl">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => { onChange(option.value); setOpen(false); }}
              className={`w-full rounded-[6px] px-3 py-2 text-left text-sm transition hover:bg-white/10 ${
                option.value === value ? "text-cyan-200" : "text-slate-300"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
