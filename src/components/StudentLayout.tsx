'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const navItems = [
  { href: '/student', icon: 'ri-home-4-line', label: 'Home' },
  { href: '/student/my-quizzes', icon: 'ri-file-list-3-line', label: 'My Quizzes' },
  { href: '/student/results', icon: 'ri-bar-chart-line', label: 'My Results' },
  { href: '/student/leaderboard', icon: 'ri-trophy-line', label: 'Leaderboard' },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const [showProfile, setShowProfile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 h-16 z-30 bg-white border-b border-gray-100 flex items-center px-6 gap-6">
        <Link href="/student" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <i className="ri-graduation-cap-line text-white text-base"></i>
          </div>
          <span className="font-bold text-gray-900 text-base">QuizMaster</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 flex-1">
          {navItems.map(item => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className={`${item.icon} text-base`}></i>
                </div>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <div className="relative">
            <button onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-gray-100 transition-all cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">S</div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">Student</span>
              <div className="w-4 h-4 flex items-center justify-center text-gray-400">
                <i className="ri-arrow-down-s-line text-sm"></i>
              </div>
            </button>
            {showProfile && (
              <div className="absolute right-0 top-12 w-52 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">Student</p>
                </div>
                <Link href="/student/results" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-all cursor-pointer">My Results</Link>
                <Link href="/dashboard" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-all cursor-pointer">Admin View</Link>
                <div className="border-t border-gray-100">
                  <button onClick={handleSignOut} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-all cursor-pointer">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {showProfile && <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />}
      </header>

      <div className="pt-16">
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 flex">
          {navItems.map(item => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-all cursor-pointer ${active ? 'text-blue-600' : 'text-gray-500'}`}>
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className={`${item.icon} text-lg`}></i>
                </div>
                {item.label}
              </Link>
            );
          })}
        </div>
        <main className="p-6 pb-24 md:pb-6">
          {children}
        </main>
      </div>
    </div>
  );
}
