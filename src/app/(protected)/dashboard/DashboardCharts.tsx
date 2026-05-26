'use client';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const scoreData = [
  { range: '0-20', count: 4 }, { range: '21-40', count: 8 }, { range: '41-60', count: 22 },
  { range: '61-80', count: 45 }, { range: '81-100', count: 31 },
];

const attemptsData = [
  { day: 'Mon', attempts: 24 }, { day: 'Tue', attempts: 38 }, { day: 'Wed', attempts: 31 },
  { day: 'Thu', attempts: 52 }, { day: 'Fri', attempts: 47 }, { day: 'Sat', attempts: 19 },
  { day: 'Sun', attempts: 14 },
];

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-gray-900">Score Distribution</h3>
          <div className="flex gap-1">
            {['7D', '30D', 'All'].map((t, i) => (
              <button key={t} className={`text-xs px-3 py-1 rounded-full cursor-pointer transition-all ${i === 2 ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>{t}</button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={scoreData}>
            <defs>
              <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="range" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '13px' }} />
            <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2.5} fill="url(#scoreGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-gray-900">Attempts This Week</h3>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={attemptsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '13px' }} />
            <Bar dataKey="attempts" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
