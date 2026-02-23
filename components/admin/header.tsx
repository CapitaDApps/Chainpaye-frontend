"use client";

import { usePathname } from "next/navigation";
import { ArrowDownToLine, Menu } from "lucide-react";
import {
  OverviewIcon,
  TransactionsIcon,
  UsersIcon,
} from "@/components/ui/icons";

interface HeaderProps {
  onMenuClick: () => void;
  onToggleCollapse: () => void;
}

export function Header({ onMenuClick, onToggleCollapse }: HeaderProps) {
  const pathname = usePathname();

  const getHeaderInfo = () => {
    if (pathname === "/admin") return { title: "Overview", Icon: OverviewIcon };
    if (pathname === "/admin/users") return { title: "Users", Icon: UsersIcon };
    if (pathname === "/admin/transactions")
      return { title: "Transactions", Icon: TransactionsIcon };

    if (pathname.startsWith("/admin/users/"))
      return { title: "User", Icon: UsersIcon };
    if (pathname.startsWith("/admin/transactions/"))
      return { title: "Transaction", Icon: TransactionsIcon };

    return { title: "Dashboard", Icon: OverviewIcon };
  };

  const { title, Icon } = getHeaderInfo();

  return (
    <header className="h-20 bg-white border-b border-[#E3E3E3] flex items-center justify-between px-4 md:px-8 shrink-0">
      <div className="flex items-center gap-3 text-[#667085]">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={24} className="text-[#111528]" />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleCollapse}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Icon className="w-5 h-5" isActive={true} />
          </button>
        </div>
        <h1 className="text-lg font-medium text-[#111528]">{title}</h1>
      </div>

      <button className="flex items-center gap-2 px-4 md:px-6 py-2 bg-[#E8EDFF] text-[#00174F] rounded-lg font-medium transition-all text-sm md:text-base">
        <span>Export</span>
        <ArrowDownToLine size={18} />
      </button>
    </header>
  );
}
