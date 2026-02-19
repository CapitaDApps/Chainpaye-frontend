"use client";

import { useState, useEffect } from "react";
import { AdminLoginPage } from "@/components/admin/admin-login-page";
import { Sidebar } from "@/components/admin/sidebar";
import { Header } from "@/components/admin/header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Check authentication on mount
    const authStatus = localStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Show nothing while checking auth to avoid flickering
  if (isAuthenticated === null) return null;

  if (!isAuthenticated) {
    return <AdminLoginPage />;
  }

  return (
    <div className="flex h-screen bg-[#F8F9FB] font-sans relative overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isCollapsed}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onMenuClick={() => setIsSidebarOpen(true)}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
