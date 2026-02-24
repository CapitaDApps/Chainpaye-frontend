import { Search, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Transaction } from "@/lib/utils/mock-data";

export interface TransactionsTableProps {
  transactions: Transaction[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: readonly string[];
  hideTitle?: boolean;
  hideUser?: boolean;
}

export function TransactionsTable({
  transactions,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  filters,
  hideTitle = false,
  hideUser = false,
}: TransactionsTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E3E3E3] overflow-hidden flex flex-col h-full">
      <div className="px-6 pt-6 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {!hideTitle && (
          <h2 className="text-base font-medium text-[#5A5F73]">
            Recent Transactions
          </h2>
        )}
        <div
          className={cn(
            "relative w-full",
            hideTitle ? "md:w-full" : "md:w-105",
          )}
        >
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by transaction ID, Username or wallet address"
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-0 text-[#5A5F73]  placeholder:text-[#9CA3AF] transition-all"
          />
        </div>
      </div>

      <div className="px-6 pb-4 flex flex-wrap items-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={cn(
              "px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors border",
              activeFilter === filter
                ? "bg-[#E5E7EB] text-[#6B7280] border-none"
                : "bg-white text-[#5A5F73] border-gray-200 hover:bg-gray-50",
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-6">
          <div className="relative w-36 h-36 mb-4">
            <Image
              src="/assets/Empty box.png"
              alt="No transactions"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-[#667085] text-sm text-center">
            No transactions found for the selected filters
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto flex-1 px-5">
          <table className="w-full text-left border-collapse rounded-tl-2xl rounded-tr-2xl">
            <thead>
              <tr className="bg-[#F3F4F6] text-[12px] font-semibold text-[#667085] uppercase tracking-wide">
                <th className="px-6 py-3 font-medium">ID</th>
                {!hideUser && (
                  <th className="px-6 py-3 font-medium">Username</th>
                )}
                <th className="px-6 py-3 font-medium">Time</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Transaction type</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Receiving Address</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((tx, idx) => (
                <tr
                  key={`${tx.id}-${idx}`}
                  onClick={() =>
                    (window.location.href = `/admin/transactions/${
                      tx.fullId || tx.id
                    }`)
                  }
                  className="text-[13px] text-[#6B7280] hover:bg-gray-50/60 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 font-mono text-[12px] text-[#6B7280]">
                    {tx.id}
                  </td>
                  {!hideUser && (
                    <td className="px-6 py-4 font-medium">{tx.user}</td>
                  )}
                  <td className="px-6 py-4 text-gray-500">{tx.time}</td>
                  <td className="px-6 py-4 font-semibold">{tx.amount}</td>
                  <td className="px-6 py-4 text-gray-500">{tx.type}</td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold",
                        tx.status === "Pending" &&
                          "bg-[#D9D4FF] text-[#6C63FF]",
                        tx.status === "Completed" &&
                          "bg-[#DDFBE7] text-[#22A753]",
                        tx.status === "Failed" && "bg-[#F9DADA] text-[#D43939]",
                      )}
                    >
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full shrink-0",
                          tx.status === "Pending" && "bg-[#6C63FF]",
                          tx.status === "Completed" && "bg-[#22A753]",
                          tx.status === "Failed" && "bg-[#D43939]",
                        )}
                      />
                      {tx.status === "Pending" ? "Pending" : tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-[12px] text-[#667085]">
                    {tx.address}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
