'use client';
import { useState } from 'react';
import StudentLayout from '@/components/StudentLayout';

const leaderboard = [
  { rank: 1, name: 'James Carter', avatar: 'J', score: 96, quizzes: 14, badge: 'gold' },
  { rank: 2, name: 'Priya Sharma', avatar: 'P', score: 93, quizzes: 12, badge: 'silver' },
  { rank: 3, name: 'Lucas Mendes', avatar: 'L', score: 91, quizzes: 15, badge: 'bronze' },
  { rank: 4, name: 'Sarah Kim', avatar: 'S', score: 88, quizzes: 12, badge: null, isMe: true },
  { rank: 5, name: 'Aisha Okonkwo', avatar: 'A', score: 85, quizzes: 11, badge: null },
  { rank: 6, name: 'Tom Nguyen', avatar: 'T', score: 82, quizzes: 10, badge: null },
  { rank: 7, name: 'Maria Gonzalez', avatar: 'M', score: 79, quizzes: 9, badge: null },
  { rank: 8, name: 'David Park', avatar: 'D', score: 76, quizzes: 13, badge: null },
  { rank: 9, name: 'Emma Wilson', avatar: 'E', score: 74, quizzes: 8, badge: null },
  { rank: 10, name: 'Raj Patel', avatar: 'R', score: 71, quizzes: 7, badge: null },
];

const badgeColors: Record<string, string> = {
  gold: 'bg-amber-400',
  silver: 'bg-gray-400',
  bronze: 'bg-orange-600',
};

const avatarColors = [
  'from-blue-500 to-indigo-600',
  'from-violet-500 to-pink-500',
  'from-green-500 to-teal-600',
  'from-orange-500 to-red-500',
  'from-cyan-500 to-blue-500',
  'from-emerald-500 to-green-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-500',
  'from-purple-500 to-violet-600',
  'from-teal-500 to-cyan-600',
];

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<'week' | 'month' | 'all'>('all');
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <StudentLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
            <p className="text-sm text-gray-500 mt-1">See how you rank among your peers</p>
          </div>
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            {(['week', 'month', 'all'] as const).map(p => (
              <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer capitalize whitespace-nowrap ${period === p ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {p === 'all' ? 'All Time' : `This ${p.charAt(0).toUpperCase() + p.slice(1)}`}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-end justify-center gap-4 pt-4 pb-8">
          {[top3[1], top3[0], top3[2]].map((entry, i) => {
            const heights = ['h-28', 'h-36', 'h-24'];
            const sizes = ['w-14 h-14', 'w-16 h-16', 'w-14 h-14'];
            const podiumBg = [
              'bg-gradient-to-b from-gray-300 to-gray-400',
              'bg-gradient-to-b from-amber-400 to-amber-500',
              'bg-gradient-to-b from-orange-400 to-orange-500',
            ];
            return (
              <div key={entry.rank} className="flex flex-col items-center gap-2">
                <div className="relative">
                  <div className={`${sizes[i]} rounded-full bg-gradient-to-br ${avatarColors[entry.rank - 1]} flex items-center justify-center text-white font-bold text-lg`}>
                    {entry.avatar}
                  </div>
                  {entry.badge && (
                    <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full ${badgeColors[entry.badge]} flex items-center justify-center`}>
                      <i className="ri-trophy-fill text-white text-xs"></i>
                    </div>
                  )}
                </div>
                <p className="text-xs font-semibold text-gray-900 text-center max-w-[80px] leading-tight">{entry.name.split(' ')[0]}</p>
                <p className="text-sm font-bold text-blue-600">{entry.score}%</p>
                <div className={`${heights[i]} w-20 rounded-t-xl flex items-end justify-center pb-3 ${podiumBg[i]}`}>
                  <span className="text-white font-bold text-lg">#{entry.rank}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {rest.map(entry => (
            <div key={entry.rank} className={`flex items-center gap-4 px-6 py-4 border-b border-gray-50 last:border-0 transition-colors ${'isMe' in entry && entry.isMe ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
              <span className="w-6 text-sm font-bold text-gray-400 text-center">#{entry.rank}</span>
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[entry.rank - 1]} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                {entry.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${'isMe' in entry && entry.isMe ? 'text-blue-700' : 'text-gray-900'}`}>
                  {entry.name} {'isMe' in entry && entry.isMe && <span className="text-xs font-normal">(You)</span>}
                </p>
                <p className="text-xs text-gray-500">{entry.quizzes} quizzes taken</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${entry.score}%` }} />
                </div>
                <span className="text-sm font-bold text-gray-900 w-10 text-right">{entry.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
