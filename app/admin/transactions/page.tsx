"use client";

import { useState, useMemo } from "react";
import { RECENT_TRANSACTIONS, Transaction } from "@/lib/utils/mock-data";
import { TransactionsTable } from "@/components/admin/shared/transactions-table";

const FILTERS = [
  "All",
  "Ongoing",
  "Completed",
  "Failed",
  "offramping",
  "Deposit",
] as const;

function filterTransactions(
  transactions: Transaction[],
  activeFilter: string,
  searchQuery: string,
) {
  return transactions.filter((tx) => {
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
        tx.user.toLowerCase().includes(q) ||
        tx.address.toLowerCase().includes(q)
      );
    }
    return true;
  });
}

export default function TransactionsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = useMemo(
    () => filterTransactions(RECENT_TRANSACTIONS, activeFilter, searchQuery),
    [activeFilter, searchQuery],
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-[calc(100vh-120px)] flex flex-col">
      <TransactionsTable
        transactions={filteredTransactions}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={FILTERS}
        hideTitle={false}
      />
    </div>
  );
}
