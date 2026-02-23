import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import {
  DateRangeFilter,
  DateRange,
} from "@/components/admin/date-range-filter";
import { USER_DEMOGRAPHY } from "@/lib/utils/mock-data";
import { MoveRight } from "lucide-react";

const DEMO_COLORS = USER_DEMOGRAPHY.breakdown.map((b) => b.color);
const PIE_DATA = USER_DEMOGRAPHY.breakdown.map((b) => ({
  name: b.label,
  value: parseInt(b.value.replace(/,/g, "")),
}));

interface UserDemographyChartProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

export function UserDemographyChart({
  dateRange,
  onDateRangeChange,
}: UserDemographyChartProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#E3E3E3]flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-semibold text-[#5A5F73]">
          Users Demography
        </h3>
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
                      key={index}
                      fill={DEMO_COLORS[index % DEMO_COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Center Text */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <div className="text-[32px] font-bold text-[#111528] leading-none mb-1">
              {USER_DEMOGRAPHY.total}
            </div>
            <div className="text-[12px] text-[#667085]">Total users</div>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full space-y-4 mt-8 pb-4 border-b border-gray-50">
          {USER_DEMOGRAPHY.breakdown.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between text-[14px]"
            >
              <span className="flex items-center gap-2.5 text-[#667085]">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {item.label}
              </span>
              <span className="font-semibold text-[#374151]">{item.value}</span>
            </div>
          ))}
        </div>

        {/* View All */}
        <button className="flex items-center gap-2 text-[#667085] text-[13px] font-medium mt-4 hover:text-[#111528] transition-colors">
          View all <MoveRight size={14} />
        </button>
      </div>
    </div>
  );
}
