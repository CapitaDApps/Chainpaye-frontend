import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  DateRangeFilter,
  DateRange,
} from "@/components/admin/date-range-filter";
import { BarChartDataPoint } from "@/lib/utils/mock-data";
import { ArrowUpRight } from "lucide-react";

export const BarTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { color: string; name: string; value: number }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 text-[13px]">
        <p className="font-semibold text-gray-700 mb-2">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="flex items-center gap-2 text-gray-500">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="capitalize">{entry.name}:</span>
            <span className="font-semibold text-gray-900">
              ${(entry.value / 1000).toFixed(0)}K
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface RevenueChartProps {
  data: BarChartDataPoint[];
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

export function RevenueChart({
  data,
  dateRange,
  onDateRangeChange,
}: RevenueChartProps) {
  return (
    <div className="flex flex-col flex-1 min-h-0 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-sm font-semibold text-[#374151]">
            Platform Revenue
          </h3>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-2xl font-bold text-[#111528]">$20,800</span>
            <span className="text-[13px] font-medium text-[#22A753] mb-1 bg-[#DDFBE7] px-2 py-1 flex items-center gap-1">
              +12.5% <ArrowUpRight size={14} />
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-4 text-[13px] font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CB3CFF]" />
              <span className="text-[#374151]">Withdrawal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00C2FF]" />
              <span className="text-[#374151]">Offramp</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22A753]" />
              <span className="text-[#374151]">Deposit</span>
            </div>
          </div>
          <DateRangeFilter value={dateRange} onChange={onDateRangeChange} />
        </div>
      </div>

      <div className="flex-1 min-h-0 w-full relative -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            barSize={12}
            barGap={2}
          >
            <CartesianGrid
              strokeDasharray="0 0"
              vertical={false}
              stroke="#9FB6F2"
              strokeOpacity={0.4}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              tickFormatter={(val) => `$${val / 1000}k`}
              dx={-10}
            />
            <Tooltip content={<BarTooltip />} cursor={{ fill: "#F9FAFB" }} />
            <Bar dataKey="withdrawal" fill="#CB3CFF" radius={[4, 4, 4, 4]} />
            <Bar dataKey="offramp" fill="#00C2FF" radius={[4, 4, 4, 4]} />
            <Bar dataKey="deposit" fill="#22A753" radius={[4, 4, 4, 4]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
