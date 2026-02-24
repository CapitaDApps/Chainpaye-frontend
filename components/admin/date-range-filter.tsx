"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export type DateRangeOption =
  | "today"
  | "this-week"
  | "this-month"
  | "last-3-months"
  | "last-6-months"
  | "last-1-year"
  | "from-beginning"
  | "custom";

export interface DateRange {
  option: DateRangeOption;
  startDate?: string;
  endDate?: string;
}

const PRESET_OPTIONS: { value: DateRangeOption; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "this-week", label: "This week" },
  { value: "this-month", label: "This Month" },
  { value: "last-3-months", label: "Last 3 months" },
  { value: "last-6-months", label: "Last 6 months" },
  { value: "last-1-year", label: "Last 1 year" },
  { value: "from-beginning", label: "From beginning" },
];

function formatMonthYear(iso: string): string {
  if (!iso) return "";
  const [year, month] = iso.split("-").map(Number);
  const date = new Date(year, month - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function getLabel(range: DateRange): string {
  if (range.option === "custom") {
    const start = range.startDate ? formatMonthYear(range.startDate) : "?";
    const end = range.endDate ? formatMonthYear(range.endDate) : "?";
    return `${start} - ${end}`;
  }
  const found = PRESET_OPTIONS.find((o) => o.value === range.option);
  return found?.label ?? "Jan 2025 - Dec 2025";
}

function MonthPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [year, setYear] = useState(() =>
    value ? parseInt(value.split("-")[0]) : new Date().getFullYear(),
  );
  const [month, setMonth] = useState(() =>
    value ? parseInt(value.split("-")[1]) : new Date().getMonth() + 1,
  );

  const monthName = new Date(year, month - 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const prev = () => {
    if (month === 1) {
      setMonth(12);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const next = () => {
    if (month === 12) {
      setMonth(1);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  useEffect(() => {
    onChange(`${year}-${String(month).padStart(2, "0")}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  const display = formatMonthYear(`${year}-${String(month).padStart(2, "0")}`);

  return (
    <div className="space-y-2">
      <p className="text-[12px] font-medium text-[#374151]">{label}</p>
      <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2.5 bg-white">
        <span className="text-sm text-[#374151] font-medium">{display}</span>
        <Calendar size={15} className="text-gray-400" />
      </div>

      <div className="flex items-center justify-between px-1">
        <button
          onClick={prev}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 transition-colors"
        >
          ‹
        </button>
        <span className="text-[13px] font-medium text-[#374151]">
          {monthName}
        </span>
        <button
          onClick={next}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 transition-colors"
        >
          ›
        </button>
      </div>
    </div>
  );
}

interface DateRangeFilterProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

export function DateRangeFilter({
  value,
  onChange,
  className,
}: DateRangeFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingOption, setPendingOption] = useState<DateRangeOption>(
    value.option,
  );
  const [customStart, setCustomStart] = useState(value.startDate ?? "");
  const [customEnd, setCustomEnd] = useState(value.endDate ?? "");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handlePresetSelect = (opt: DateRangeOption) => {
    setPendingOption(opt);
    if (opt !== "custom") {
      onChange({ option: opt });
      setIsOpen(false);
    }
  };

  const handleSave = () => {
    onChange({ option: "custom", startDate: customStart, endDate: customEnd });
    setIsOpen(false);
  };

  return (
    <div ref={ref} className={cn(" border-[#E3E3E3] relative", className)}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[13px] text-[#5A5F73] bg-white hover:bg-gray-50 transition-colors"
      >
        <Calendar size={13} className="text-gray-400" />
        <span>{getLabel(value)}</span>
        <span className="text-[10px] text-gray-400 ml-0.5">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
          <div className="p-4 space-y-2">
            {PRESET_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => handlePresetSelect(opt.value)}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors",
                    pendingOption === opt.value
                      ? "border-[#003DFF] bg-[#003DFF]"
                      : "border-gray-300 bg-white group-hover:border-[#003DFF]/50",
                  )}
                >
                  {pendingOption === opt.value && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path
                        d="M1 3.5L3.5 6L8 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-[#374151] group-hover:text-[#111528] transition-colors">
                  {opt.label}
                </span>
              </label>
            ))}

            <div
              className="pl-7 cursor-pointer"
              onClick={() => setPendingOption("custom")}
            >
              <span
                className={cn(
                  "text-sm transition-colors",
                  pendingOption === "custom"
                    ? "font-semibold text-[#003DFF]"
                    : "text-[#374151] hover:text-[#111528]",
                )}
              >
                Custom
              </span>
            </div>

            {pendingOption === "custom" && (
              <div className="mt-3 space-y-4 pt-3 border-t border-gray-100">
                <MonthPicker
                  label="Start Date"
                  value={customStart}
                  onChange={setCustomStart}
                />
                <MonthPicker
                  label="End Date"
                  value={customEnd}
                  onChange={setCustomEnd}
                />
                <button
                  onClick={handleSave}
                  className="w-full bg-[#003DFF] hover:bg-[#002FCC] text-white font-semibold rounded-xl py-2.5 text-sm transition-colors"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
