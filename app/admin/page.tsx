"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { DateRange } from "@/components/admin/date-range-filter";

import {
  OVERVIEW_STATS,
  TOTAL_CASHFLOW_CHART_DATA,
  PLATFORM_REVENUE_CHART_DATA,
  RECENT_TRANSACTIONS,
} from "@/lib/utils/mock-data";

// Extracted Components
import { TopStatsGrid } from "@/components/admin/overview/top-stats-grid";
import { CashflowChart } from "@/components/admin/overview/cashflow-chart";
import { RevenueChart } from "@/components/admin/overview/revenue-chart";
import { TransactionsDonut } from "@/components/admin/overview/transactions-donut";
import { TransactionsTable } from "@/components/admin/shared/transactions-table";

const STATUS_FILTERS = ["All", "Pending", "Completed", "Failed"];
const TYPE_FILTERS = ["Offramping", "Deposit"];
const ALL_FILTERS = [...STATUS_FILTERS, ...TYPE_FILTERS];

export default function OverviewPage() {
  const [activeTab, setActiveTab] = useState<
    "Total Cashflow" | "Platform Revenue"
  >("Total Cashflow");
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [chartDateRange, setChartDateRange] = useState<DateRange>({
    option: "last-1-year",
  });
  const [donutDateRange, setDonutDateRange] = useState<DateRange>({
    option: "last-1-year",
  });

  const cashflowData = useMemo(() => {
    const { option } = chartDateRange;
    if (option === "today" || option === "this-week" || option === "this-month")
      return TOTAL_CASHFLOW_CHART_DATA.slice(0, 1);
    if (option === "last-3-months")
      return TOTAL_CASHFLOW_CHART_DATA.slice(0, 3);
    if (option === "last-6-months")
      return TOTAL_CASHFLOW_CHART_DATA.slice(0, 6);
    return TOTAL_CASHFLOW_CHART_DATA;
  }, [chartDateRange]);

  const revenueData = useMemo(() => {
    const { option } = chartDateRange;
    if (option === "today" || option === "this-week" || option === "this-month")
      return PLATFORM_REVENUE_CHART_DATA.slice(0, 1);
    if (option === "last-3-months")
      return PLATFORM_REVENUE_CHART_DATA.slice(0, 3);
    if (option === "last-6-months")
      return PLATFORM_REVENUE_CHART_DATA.slice(0, 6);
    return PLATFORM_REVENUE_CHART_DATA;
  }, [chartDateRange]);

  // Filter transactions — cap at 5 most recent for the Overview snapshot
  const filteredTransactions = useMemo(() => {
    return RECENT_TRANSACTIONS.filter((tx) => {
      if (activeFilter !== "All") {
        const normalized = activeFilter.toLowerCase();
        if (normalized === "offramping") {
          if (tx.type.toLowerCase() !== "offramping") return false;
        } else if (normalized === "deposit") {
          if (tx.type.toLowerCase() !== "deposit") return false;
        } else {
          if (tx.status.toLowerCase() !== normalized) return false;
        }
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          tx.id.toLowerCase().includes(q) ||
          tx.user.toLowerCase().includes(q) ||
          tx.address.toLowerCase().includes(q)
        );
      }
      return true;
    }).slice(0, 5); // Only 5 most recent for overview
  }, [activeFilter, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Top Stats Grid */}
      <TopStatsGrid stats={OVERVIEW_STATS} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 pt-2 items-start">
        {/* Main Chart Card */}
        <div className="bg-white p-6 rounded-2xl border border-[#E3E3E3] flex flex-col h-[480px]">
          {/* Tabs */}
          <div className="flex bg-gray-100 p-1 w-fit rounded-lg border border-gray-100 mb-6">
            <button
              onClick={() => setActiveTab("Total Cashflow")}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-md transition-colors",
                activeTab === "Total Cashflow"
                  ? "bg-white text-[#111528]"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              Total Cashflow
            </button>
            <button
              onClick={() => setActiveTab("Platform Revenue")}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-md transition-colors",
                activeTab === "Platform Revenue"
                  ? "bg-white text-[#111528]"
                  : "text-[#6B7280] hover:text-gray-700",
              )}
            >
              Platform Revenue
            </button>
          </div>

          <div
            className={cn(
              "flex flex-col flex-1",
              activeTab === "Total Cashflow" ? "flex" : "hidden",
            )}
          >
            <CashflowChart
              data={cashflowData}
              dateRange={chartDateRange}
              onDateRangeChange={setChartDateRange}
            />
          </div>
          <div
            className={cn(
              "flex flex-col flex-1",
              activeTab === "Platform Revenue" ? "flex" : "hidden",
            )}
          >
            <RevenueChart
              data={revenueData}
              dateRange={chartDateRange}
              onDateRangeChange={setChartDateRange}
            />
          </div>
        </div>

        {/* Sidebar Donut */}
        <div className="flex flex-col gap-6 h-full">
          <TransactionsDonut
            dateRange={donutDateRange}
            onDateRangeChange={setDonutDateRange}
          />
        </div>
      </div>

      {/* Transactions Table Row */}
      <div className="pt-2">
        <TransactionsTable
          transactions={filteredTransactions}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={ALL_FILTERS}
        />
      </div>
    </div>
  );
}
