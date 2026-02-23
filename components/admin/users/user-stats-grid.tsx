import { DollarSign, Wallet, Users, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatCard } from "@/lib/utils/mock-data";

interface UserStatsGridProps {
  stats: StatCard[];
}

export function UserStatsGrid({ stats }: UserStatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-[#E3E3E3] flex flex-col overflow-hidden"
        >
          {/* Content Area */}
          <div className="p-5 flex flex-col gap-4 border-b border-[#E3E3E3]">
            <div className="flex items-start justify-between">
              <span className="text-base font-medium text-[#5A5F73]">
                {stat.name}
              </span>
              <div
                className={`w-9 h-9 border-[#999999] rounded-full flex items-center justify-center text-[#999999] ${
                  stat.iconType === "dollar" ? "border-2" : "border-none"
                }`}
              >
                {stat.iconType === "dollar" && (
                  <DollarSign size={16} strokeWidth={2} />
                )}
                {stat.iconType === "wallet" && (
                  <Wallet size={20} strokeWidth={2} />
                )}
                {stat.iconType === "users" && (
                  <Users size={20} strokeWidth={2} />
                )}
                {!["dollar", "wallet", "users"].includes(
                  stat.iconType || ""
                ) && <LayoutGrid size={16} strokeWidth={2} />}
              </div>
            </div>

            <h3 className="text-[32px] font-medium font-sans text-[#3D3D3D] leading-none tracking-tight">
              {stat.value}
            </h3>
          </div>

          {/* Footer Area */}
          <div className="px-5 py-3.5 bg-[#F9FAFB] border-t border-[#F3F4F6] mt-auto">
            <div className="flex items-center gap-2 text-[13px] mx-auto w-fit">
              <span
                className={cn(
                  "flex items-center gap-1 font-semibold",
                  stat.isPositive ? "text-[#10B981]" : "text-[#EF4444]"
                )}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0"
                >
                  {stat.isPositive ? (
                    <path
                      d="M23 6L13.5 15.5L8.5 10.5L1 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    <path
                      d="M23 18L13.5 8.5L8.5 13.5L1 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                  {stat.isPositive ? (
                    <path
                      d="M17 6H23V12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    <path
                      d="M17 18H23V12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
                {stat.isPositive ? "+" : "-"}
                {stat.change}
              </span>
              <span className="text-[#9CA3AF] font-medium">vs last month</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
