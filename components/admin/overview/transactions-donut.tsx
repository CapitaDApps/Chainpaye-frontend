import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  DateRangeFilter,
  DateRange,
} from "@/components/admin/date-range-filter";
import { DONUT_STATS } from "@/lib/utils/mock-data";

const PIE_COLORS = ["#CB3CFF", "#00DC1A", "#FF0004"];
const PIE_DATA = [
  { name: "Ongoing", value: parseInt(DONUT_STATS.ongoing.replace(/,/g, "")) },
  {
    name: "Completed",
    value: parseInt(DONUT_STATS.completed.replace(/,/g, "")),
  },
  { name: "Failed", value: parseInt(DONUT_STATS.failed.replace(/,/g, "")) },
];

interface TransactionsDonutProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

export function TransactionsDonut({
  dateRange,
  onDateRangeChange,
}: TransactionsDonutProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#E3E3E3] flex flex-col h-[480px]">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-base font-semibold text-[#5A5F73]">Transactions</h3>
        <DateRangeFilter value={dateRange} onChange={onDateRangeChange} />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="relative flex flex-col items-center justify-center">
          <div className="h-[180px] w-full max-w-[300px] mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={115}
                  outerRadius={135}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {PIE_DATA.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Center Text */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <div className="text-[36px] font-semibold text-[#3D3D3D] leading-none mb-1">
              {DONUT_STATS.total}
            </div>
            <div className="text-[14px] text-[#9CA3AF]">Total transactions</div>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full mt-auto">
          <div className="w-full divide-y divide-gray-100 flex flex-col">
            <div className="flex items-center justify-between py-4 text-[15px]">
              <span className="flex items-center gap-2.5 text-[#667085]">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: PIE_COLORS[0] }}
                />
                Ongoing
              </span>
              <span className="font-semibold text-[#374151] text-[15px]">
                {DONUT_STATS.ongoing}
              </span>
            </div>
            <div className="flex items-center justify-between py-4 text-[15px]">
              <span className="flex items-center gap-2.5 text-[#667085]">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: PIE_COLORS[1] }}
                />
                Completed
              </span>
              <span className="font-semibold text-[#374151] text-[15px]">
                {DONUT_STATS.completed}
              </span>
            </div>
            <div className="flex items-center justify-between py-4 text-[15px]">
              <span className="flex items-center gap-2.5 text-[#667085]">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: PIE_COLORS[2] }}
                />
                Failed
              </span>
              <span className="font-semibold text-[#374151] text-[15px]">
                {DONUT_STATS.failed}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
