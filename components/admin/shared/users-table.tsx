import { Search, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { User } from "@/lib/utils/mock-data";

export interface UsersTableProps {
  users: User[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: readonly string[];
}

export function UsersTable({
  users,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  filters,
}: UsersTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E3E3E3] overflow-hidden flex flex-col h-full min-h-[500px]">
      <div className="px-6 pt-6 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-base font-medium text-[#5A5F73]">Users</h2>
        <div className="relative w-full md:w-105">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by Username or wallet address"
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

      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-6">
          <div className="relative w-36 h-36 mb-4">
            <Image
              src="/assets/Empty box.png"
              alt="No users"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-[#667085] text-sm text-center">
            No users found matching your search.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto flex-1 px-5 pb-5">
          <table className="w-full text-left border-collapse min-w-[800px] rounded-t-2xl overflow-hidden">
            <thead>
              <tr className="bg-[#F3F4F6] text-[12px] font-semibold text-[#667085] uppercase tracking-wide">
                <th className="px-6 py-3 font-medium">S/N</th>
                <th className="px-6 py-3 font-medium">Username</th>
                <th className="px-6 py-3 font-medium">Country</th>
                <th className="px-6 py-3 font-medium">KYC Status</th>
                <th className="px-6 py-3 font-medium">Wallet Address</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u, idx) => (
                <tr
                  key={u.id}
                  onClick={() =>
                    (window.location.href = `/admin/users/${u.id}`)
                  }
                  className="text-[13px] text-[#6B7280] hover:bg-gray-50/60 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 text-[#6B7280] font-mono">
                    {String(idx + 1).padStart(2, "0")}
                  </td>
                  <td className="px-6 py-4 font-medium text-[#111528]">
                    {u.firstName} {u.lastName}
                  </td>
                  <td className="px-6 py-4">{u.country}</td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold",
                        u.kycStatus === "Verified" &&
                          "bg-[#DDFBE7] text-[#22A753]",
                        u.kycStatus === "Pending" &&
                          "bg-[#D9D4FF] text-[#6C63FF]",
                        u.kycStatus === "Rejected" &&
                          "bg-[#F9DADA] text-[#D43939]",
                      )}
                    >
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full shrink-0",
                          u.kycStatus === "Verified" && "bg-[#22A753]",
                          u.kycStatus === "Pending" && "bg-[#6C63FF]",
                          u.kycStatus === "Rejected" && "bg-[#D43939]",
                        )}
                      />
                      {u.kycStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-[12px]">
                    {u.walletAddress}
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
