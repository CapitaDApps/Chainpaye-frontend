"use client";

import { usePathname } from "next/navigation";
import { ArrowDownToLine, LayoutGrid, Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  onToggleCollapse: () => void;
}

export function Header({ onMenuClick, onToggleCollapse }: HeaderProps) {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === "/admin") return "Overview";
    const segment = pathname.split("/").pop();
    if (!segment) return "Dashboard";
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <header className="h-20 bg-white border-b border-[#E3E3E3] flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-3 text-[#667085]">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={24} className="text-[#111528]" />
        </button>
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={onToggleCollapse}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LayoutGrid size={20} className="text-[#111528]" />
          </button>
        </div>
        <h1 className="text-lg font-medium text-[#111528]">{getTitle()}</h1>
      </div>

      <button className="flex items-center gap-2 px-4 md:px-6 py-2 bg-[#E8EDFF] text-[#00174F] rounded-lg font-medium transition-all text-sm md:text-base">
        <span>Export</span>
        <ArrowDownToLine size={18} />
      </button>
    </header>
  );
}
