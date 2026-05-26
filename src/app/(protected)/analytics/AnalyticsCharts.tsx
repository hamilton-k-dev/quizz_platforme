'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

const avgScoreData = [
  { quiz: 'Math', avg: 74 }, { quiz: 'Science', avg: 68 }, { quiz: 'History', avg: 81 },
  { quiz: 'English', avg: 72 }, { quiz: 'Physics', avg: 77 }, { quiz: 'Biology', avg: 70 },
];

const passFailData = [
  { name: 'Passed', value: 68, color: '#22c55e' },
  { name: 'Failed', value: 32, color: '#ef4444' },
];

const trendData = [
  { month: 'Jan', avg: 65 }, { month: 'Feb', avg: 68 }, { month: 'Mar', avg: 71 },
  { month: 'Apr', avg: 69 }, { month: 'May', avg: 74 }, { month: 'Jun', avg: 78 },
];

const difficultyData = [
  { quiz: 'Math', easy: 8, medium: 7, hard: 5 },
  { quiz: 'Science', easy: 6, medium: 6, hard: 3 },
  { quiz: 'History', easy: 10, medium: 10, hard: 5 },
  { quiz: 'English', easy: 12, medium: 12, hard: 6 },
  { quiz: 'Physics', easy: 5, medium: 8, hard: 5 },
];

const tooltipStyle = { borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '13px' };

export default function AnalyticsCharts() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-5">Average Score per Quiz</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={avgScoreData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="quiz" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={50} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="avg" fill="#3b82f6" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-5">Pass / Fail Rate</h3>
          <div className="flex items-center justify-center gap-8">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie data={passFailData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" strokeWidth={0}>
                  {passFailData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {passFailData.map(d => (
                <div key={d.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: d.color }}></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{d.value}%</p>
                    <p className="text-xs text-gray-400">{d.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-5">Score Trend Over Time</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 90]} tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="avg" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-5">Question Difficulty Analysis</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={difficultyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="quiz" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="easy" stackId="a" fill="#22c55e" name="Easy" />
              <Bar dataKey="medium" stackId="a" fill="#f59e0b" name="Medium" />
              <Bar dataKey="hard" stackId="a" fill="#ef4444" name="Hard" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
