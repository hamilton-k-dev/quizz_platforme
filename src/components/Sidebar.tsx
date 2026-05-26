'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', icon: 'ri-dashboard-line', label: 'Dashboard' },
  { href: '/quizzes', icon: 'ri-file-list-3-line', label: 'Quizzes' },
  { href: '/questions', icon: 'ri-question-line', label: 'Questions' },
  { href: '/attempts', icon: 'ri-edit-line', label: 'Attempts' },
  { href: '/results', icon: 'ri-bar-chart-line', label: 'Results' },
  { href: '/students', icon: 'ri-group-line', label: 'Students' },
  { href: '/analytics', icon: 'ri-pie-chart-line', label: 'Analytics' },
  { href: '/docs', icon: 'ri-book-open-line', label: 'Docs' },
];

export default function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={`fixed left-0 top-0 h-full z-30 flex flex-col transition-all duration-300 bg-white border-r border-gray-100 ${collapsed ? 'w-[72px]' : 'w-[240px]'}`}>
      <div className={`flex items-center gap-3 px-4 h-16 border-b border-gray-100 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
          <i className="ri-brain-line text-white text-base"></i>
        </div>
        {!collapsed && <span className="font-bold text-gray-900 text-base whitespace-nowrap">QuizMaster</span>}
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 cursor-pointer group ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                <i className={`${item.icon} text-lg`}></i>
              </div>
              {!collapsed && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
              {collapsed && (
                <div className="absolute left-16 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-2 border-t border-gray-100">
        <button onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 transition-all cursor-pointer">
          <div className="w-5 h-5 flex items-center justify-center">
            <i className={`${collapsed ? 'ri-arrow-right-s-line' : 'ri-arrow-left-s-line'} text-lg`}></i>
          </div>
          {!collapsed && <span className="text-sm font-medium">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
