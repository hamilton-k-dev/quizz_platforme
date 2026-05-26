'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <TopNavbar sidebarCollapsed={collapsed} />
      <main className={`transition-all duration-300 pt-16 ${collapsed ? 'ml-[72px]' : 'ml-[240px]'}`}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
