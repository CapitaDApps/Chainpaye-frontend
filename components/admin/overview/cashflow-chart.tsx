import {
  AreaChart,
  Area,
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
import { LineChartDataPoint } from "@/lib/utils/mock-data";

export const LineTooltip = ({
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

interface CashflowChartProps {
  data: LineChartDataPoint[];
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

export function CashflowChart({
  data,
  dateRange,
  onDateRangeChange,
}: CashflowChartProps) {
  return (
    <div className="flex flex-col flex-1 min-h-0 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-sm font-semibold text-[#374151]">
            Total Cashflow
          </h3>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-2xl font-bold text-[#111528]">$240,800</span>
            <span className="text-[13px] font-medium text-green-500 mb-1">
              +12.5%
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
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorWithdrawal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#CB3CFF" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#CB3CFF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOfframp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00C2FF" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#00C2FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDeposit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22A753" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#22A753" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Tooltip content={<LineTooltip />} cursor={{ stroke: "#E5E7EB" }} />
            <Area
              type="monotone"
              dataKey="withdrawal"
              stroke="#CB3CFF"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorWithdrawal)"
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="offramp"
              stroke="#00C2FF"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorOfframp)"
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="deposit"
              stroke="#22A753"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorDeposit)"
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
