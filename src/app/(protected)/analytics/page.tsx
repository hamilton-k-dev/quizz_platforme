import DashboardLayout from '@/components/DashboardLayout';
import AnalyticsCharts from './AnalyticsCharts';

const topPerformers = [
  { rank: 1, name: 'Laura Martinez', score: 94, avatar: 'LM', color: 'bg-emerald-500' },
  { rank: 2, name: 'Alice Johnson', score: 88, avatar: 'AJ', color: 'bg-blue-500' },
  { rank: 3, name: 'Fiona Chen', score: 91, avatar: 'FC', color: 'bg-teal-500' },
  { rank: 4, name: 'Hannah Park', score: 86, avatar: 'HP', color: 'bg-rose-500' },
  { rank: 5, name: 'Carlos Rivera', score: 83, avatar: 'CR', color: 'bg-green-500' },
];

const rankColors = ['text-yellow-500', 'text-gray-400', 'text-amber-600'];

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Insights and performance metrics across all quizzes</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Quizzes', value: '48', icon: 'ri-file-list-3-line', color: 'bg-blue-50 text-blue-600' },
            { label: 'Avg Score', value: '74.2%', icon: 'ri-bar-chart-line', color: 'bg-green-50 text-green-600' },
            { label: 'Pass Rate', value: '68%', icon: 'ri-checkbox-circle-line', color: 'bg-purple-50 text-purple-600' },
            { label: 'Active Students', value: '1,284', icon: 'ri-group-line', color: 'bg-orange-50 text-orange-600' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className={`w-9 h-9 flex items-center justify-center rounded-xl ${s.color} mb-3`}>
                <i className={`${s.icon} text-base`}></i>
              </div>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <AnalyticsCharts />

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Top Performers</h3>
          <div className="space-y-3">
            {topPerformers.map((p, i) => (
              <div key={p.rank} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all">
                <span className={`text-lg font-bold w-6 text-center ${rankColors[i] || 'text-gray-400'}`}>#{p.rank}</span>
                <div className={`w-9 h-9 rounded-full ${p.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{p.avatar}</div>
                <span className="flex-1 text-sm font-medium text-gray-800">{p.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${p.score}%` }}></div>
                  </div>
                  <span className="text-sm font-bold text-gray-700 w-10 text-right">{p.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
