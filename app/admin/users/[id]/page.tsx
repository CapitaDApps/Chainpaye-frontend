"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { USERS, RECENT_TRANSACTIONS } from "@/lib/utils/mock-data";

import { UserProfileCard } from "@/components/admin/users/user-profile-card";
import { UserDetailsGrid } from "@/components/admin/users/user-details-grid";
import { TransactionsTable } from "@/components/admin/shared/transactions-table";

const TX_FILTERS = [
  "All",
  "Ongoing",
  "Completed",
  "Failed",
  "offramping",
  "Deposit",
] as const;

export default function UserDetailPage() {
  const params = useParams();
  const userId = params.id as string;

  const user = USERS.find((u) => u.id === userId);

  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTx = useMemo(() => {
    return RECENT_TRANSACTIONS.filter((tx) => {
      if (activeFilter !== "All") {
        const f = activeFilter.toLowerCase();
        if (f === "offramping") {
          if (tx.type.toLowerCase() !== "offramping") return false;
        } else if (f === "deposit") {
          if (tx.type.toLowerCase() !== "deposit") return false;
        } else if (f === "ongoing") {
          if (tx.status !== "Pending") return false;
        } else {
          if (tx.status.toLowerCase() !== f) return false;
        }
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          tx.id.toLowerCase().includes(q) ||
          tx.address.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeFilter, searchQuery]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <p className="text-[#667085] text-sm">User not found.</p>
        <button
          onClick={() => (window.location.href = "/admin/users")}
          className="flex items-center gap-2 text-[#003DFF] text-sm font-medium hover:underline"
        >
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <UserProfileCard user={user} />
      <UserDetailsGrid user={user} />

      <TransactionsTable
        transactions={filteredTx}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={TX_FILTERS}
        hideUser
      />
    </div>
  );
}
