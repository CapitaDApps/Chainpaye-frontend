"use client";

import { useState, useMemo } from "react";
import { DateRange } from "@/components/admin/date-range-filter";
import { USERS, USER_STATS } from "@/lib/utils/mock-data";
import { UserStatsGrid } from "@/components/admin/users/user-stats-grid";
import { UserDemographyChart } from "@/components/admin/users/user-demography-chart";
import { UsersTable } from "@/components/admin/shared/users-table";

const KYC_FILTERS = [
  "All",
  "Pending",
  "Verified",
  "Rejected",
  "Deposit",
] as const;

export default function UsersPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [demoDateRange, setDemoDateRange] = useState<DateRange>({
    option: "last-1-year",
  });

  const filteredUsers = useMemo(() => {
    return USERS.filter((u) => {
      if (activeFilter !== "All" && activeFilter !== "Deposit") {
        if (u.kycStatus !== activeFilter) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
          u.walletAddress.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 flex flex-col min-h-full">
      <UserStatsGrid stats={USER_STATS} />

      <div className="w-full lg:w-[400px]">
        <UserDemographyChart
          dateRange={demoDateRange}
          onDateRangeChange={setDemoDateRange}
        />
      </div>

      <div className="w-full flex-1">
        <UsersTable
          users={filteredUsers}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={KYC_FILTERS}
        />
      </div>
    </div>
  );
}
