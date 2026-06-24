"use client";

import { useCallback } from "react";

type MonetaryInputProps = {
  name: string;
  value?: number | string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  currency?: string;
  required?: boolean;
  min?: number;
};

function formatARS(value: string) {
  const raw = value.replace(/[^0-9]/g, "");
  if (!raw) return "";
  try {
    return new Intl.NumberFormat("es-AR").format(Number(raw));
  } catch {
    return raw;
  }
}

export function MonetaryInput({ name, value, onChange, placeholder = "$ 0", className = "", currency = "ARS", required, min }: MonetaryInputProps) {
  const inputValue = typeof value === "number" ? String(value) : (value ?? "");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^0-9]/g, "");
      onChange?.(raw);
    },
    [onChange]
  );

  return (
    <div className={`relative ${className}`}>
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
        {currency}
      </span>
      <input
        type="text"
        inputMode="numeric"
        name={name}
        value={formatARS(inputValue)}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        min={min}
        className="w-full rounded-[8px] border border-white/10 bg-white/[0.07] px-4 py-3 pl-12 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
      />
    </div>
  );
}
