"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/logo";
import Image from "next/image";
import { LayoutGrid, History, Users, LogOut, Bell, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Overview", href: "/admin", icon: LayoutGrid },
  { name: "Transactions", href: "/admin/transactions", icon: History },
  { name: "Users", href: "/admin/users", icon: Users },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
}

export function Sidebar({ isOpen, onClose, isCollapsed }: SidebarProps) {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    window.location.reload();
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 bg-[#F3F4F6] border-r border-[#E3E3E3] h-full z-50 transition-all duration-300 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          isCollapsed ? "md:w-20" : "md:w-64",
        )}
      >
        <div
          className={cn(
            "p-6 flex items-center justify-between",
            isCollapsed && "px-4 justify-center",
          )}
        >
          {isCollapsed ? (
            <div className="w-10 h-10 flex items-center justify-center">
              <Image
                src="/assets/Favicon.png"
                alt="Favicon"
                width={32}
                height={32}
              />
            </div>
          ) : (
            <Logo />
          )}
          <button onClick={onClose} className="md:hidden text-gray-500">
            <X size={24} />
          </button>
        </div>

        <nav
          className={cn(
            "flex-1 py-8 space-y-2",
            isCollapsed ? "px-2" : "pl-4 pr-0",
          )}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => onClose()}
                className={cn(
                  "flex items-center gap-3 px-4 text-base font-medium py-3 transition-all relative",
                  isActive
                    ? "bg-[#F3F4FF] text-[#003DFF] border-r-0"
                    : "text-[#3D3D3D]",
                  isCollapsed && "px-0 justify-center rounded-lg",
                )}
              >
                <item.icon
                  size={20}
                  className={cn(isActive ? "text-[#003DFF]" : "text-[#667085]")}
                />
                {!isCollapsed && <span>{item.name}</span>}

                {/* Active Indicator - Right Border Alignment */}
                {isActive && !isCollapsed && (
                  <div className="absolute top-0 right-0 bottom-0 w-1 bg-[#003DFF]" />
                )}
                {isActive && isCollapsed && (
                  <div className="absolute top-0 right-0 bottom-0 w-1 bg-[#003DFF]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div
          className={cn(
            "p-4 border-[#E3E3E3] space-y-4 flex flex-col items-center",
            !isCollapsed && "items-stretch",
          )}
        >
          {/* Notifications */}
          <div
            className={cn(
              "flex items-center justify-between rounded-lg hover:bg-gray-200/50 cursor-pointer transition-all",
              isCollapsed ? "p-2" : "px-4 py-3",
            )}
          >
            {!isCollapsed && (
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="text-base font-normal text-[#3D3D3D] truncate">
                  Idowu Blessing
                </span>
              </div>
            )}
            <div className="relative">
              <Bell size={20} className="text-[#3D3D3D]" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                2
              </span>
            </div>
          </div>

          {/* Logout */}
          <div className="w-[calc(100%+2rem)] -mx-4 h-[1px] bg-[#E3E3E3]" />
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-3 text-[#3D3D3D] transition-all",
              isCollapsed ? "p-2 justify-center" : "w-full px-4 py-3",
            )}
            title={isCollapsed ? "Log out" : undefined}
          >
            <LogOut size={20} className="text-[#3D3D3D]" />
            {!isCollapsed && <span>Log out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
