import {
  History,
  Users,
  DollarSign,
  ArrowUpRight,
  Search,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STATS = [
  {
    name: "Total Cashflow",
    value: "$240,800",
    change: "+12.5%",
    icon: DollarSign,
  },
  {
    name: "Platform Revenue",
    value: "$20,800",
    change: "+12.5%",
    icon: DollarSign,
  },
  {
    name: "Total transactions",
    value: "12,000",
    change: "+1.5%",
    icon: History,
  },
  { name: "Active users", value: "2,000", change: "+1.5%", icon: Users },
];

const RECENT_TRANSACTIONS = [
  {
    id: "010..12dcb",
    user: "Idowu Blessing",
    time: "Jan 1, 2026 14:24",
    amount: "$150,000",
    type: "Offramping",
    status: "Pending",
    address: "0x1...36gf",
  },
  {
    id: "025..12deh",
    user: "Temitope",
    time: "Jan 1, 2026 14:24",
    amount: "$2m",
    type: "Deposit",
    status: "Failed",
    address: "0x1...76hg",
  },
  {
    id: "060..56dc",
    user: "Saga",
    time: "Jan 1, 2026 14:24",
    amount: "$20,000",
    type: "Offramping",
    status: "Completed",
    address: "0x1...11jf",
  },
];

export default function OverviewPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <div
            key={stat.name}
            className="bg-white p-6 rounded-xl border border-[#E3E3E3] shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#667085]">{stat.name}</span>
              <div className="p-2 bg-gray-50 rounded-lg text-[#667085]">
                <stat.icon size={18} />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-[#111528]">
                {stat.value}
              </h3>
              <div className="flex items-center gap-1 text-xs font-medium text-green-600">
                <ArrowUpRight size={14} />
                <span>{stat.change}</span>
                <span className="text-gray-400 font-normal">vs last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area: Charts/Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-[#E3E3E3] shadow-sm flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex bg-[#F3F4FF] p-1 rounded-lg">
              <button className="px-4 py-1.5 text-sm font-medium bg-white text-[#111528] rounded-md shadow-sm">
                Total Cashflow
              </button>
              <button className="px-4 py-1.5 text-sm font-medium text-[#667085] hover:text-[#111528] transition-colors">
                Platform Revenue
              </button>
            </div>
            <div className="text-sm font-medium text-[#667085] flex items-center gap-2">
              <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded">
                12.5% ↗
              </span>
              <span className="text-gray-400">Jan 2025 - Dec 2025</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end">
            {/* Chart Placeholder */}
            <div className="w-full h-64 bg-slate-50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center text-[#667085]">
              Chart Interaction / Visualization Component
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#E3E3E3] shadow-sm flex flex-col">
          <h3 className="text-lg font-medium text-[#111528] mb-6">
            Transactions
          </h3>
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Circular Progress Placeholder */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-8 border-gray-100" />
              <div className="absolute inset-0 rounded-full border-8 border-purple-500 border-t-transparent border-r-transparent -rotate-45" />
              <div className="text-center">
                <div className="text-3xl font-bold text-[#111528]">23,648</div>
                <div className="text-xs text-[#667085]">Total transactions</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-8">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500" /> Ongoing
              </span>
              <span className="font-medium">15,624</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" /> Completed
              </span>
              <span className="font-medium">2,478</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" /> Failed
              </span>
              <span className="font-medium">2,478</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-xl border border-[#E3E3E3] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E3E3E3] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-lg font-medium text-[#111528]">
            Recent Transactions
          </h3>
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by transaction ID, Username or wallet address"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-[#E3E3E3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003DFF] focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs font-medium text-[#667085] uppercase tracking-wider">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Username</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Transaction type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Wallet Address</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {RECENT_TRANSACTIONS.map((tx) => (
                <tr
                  key={tx.id}
                  className="text-sm text-[#111528] hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{tx.id}</td>
                  <td className="px-6 py-4">{tx.user}</td>
                  <td className="px-6 py-4">{tx.time}</td>
                  <td className="px-6 py-4">{tx.amount}</td>
                  <td className="px-6 py-4">{tx.type}</td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium",
                        tx.status === "Pending" && "bg-blue-50 text-blue-600",
                        tx.status === "Completed" &&
                          "bg-green-50 text-green-600",
                        tx.status === "Failed" && "bg-red-50 text-red-600",
                      )}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#667085] font-mono">
                    {tx.address}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
