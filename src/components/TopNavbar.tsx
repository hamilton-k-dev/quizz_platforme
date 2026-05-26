'use client';
import { useState } from 'react';
import Link from 'next/link';
import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const notifications = [
  { id: 1, text: 'Alice Johnson completed "Math Basics" quiz', time: '2m ago', read: false },
  { id: 2, text: 'New student Bob Smith registered', time: '15m ago', read: false },
  { id: 3, text: 'Quiz "Science 101" was published', time: '1h ago', read: true },
  { id: 4, text: 'Carlos Rivera scored 95% on "History Quiz"', time: '3h ago', read: true },
];

export default function TopNavbar({ sidebarCollapsed }: { sidebarCollapsed: boolean }) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <header className={`fixed top-0 right-0 h-16 z-20 flex items-center px-6 gap-4 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300 ${sidebarCollapsed ? 'left-[72px]' : 'left-[240px]'}`}>
      <div className="flex-1 max-w-md">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-gray-400">
            <i className="ri-search-line text-base"></i>
          </div>
          <input type="text" placeholder="Search quizzes, students..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-blue-400 text-gray-700 placeholder-gray-400 transition-all" />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <div className="relative">
          <button onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-all cursor-pointer relative">
            <i className="ri-notification-3-line text-lg"></i>
            {unread > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>}
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <span className="font-semibold text-sm text-gray-900">Notifications</span>
                <span className="text-xs text-blue-500 cursor-pointer hover:underline">Mark all read</span>
              </div>
              {notifications.map(n => (
                <div key={n.id} className={`px-4 py-3 flex gap-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 ${!n.read ? 'bg-blue-50/50' : ''}`}>
                  <div className="w-2 h-2 flex items-center justify-center mt-1.5 flex-shrink-0">
                    {!n.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 leading-relaxed">{n.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-gray-100 transition-all cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">A</div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
            <div className="w-4 h-4 flex items-center justify-center text-gray-400">
              <i className="ri-arrow-down-s-line text-sm"></i>
            </div>
          </button>
          {showProfile && (
            <div className="absolute right-0 top-12 w-52 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@quizmaster.io</p>
              </div>
              <Link href="/student" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-all cursor-pointer">Student View</Link>
              <div className="border-t border-gray-100">
                <button onClick={handleSignOut} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-all cursor-pointer">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {(showNotifications || showProfile) && (
        <div className="fixed inset-0 z-40" onClick={() => { setShowNotifications(false); setShowProfile(false); }} />
      )}
    </header>
  );
}
