import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import DashboardCharts from './DashboardCharts';
import RecentActivity from './RecentActivity';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatCard icon="ri-file-list-3-line" iconBg="bg-blue-50 text-blue-600" label="Total Quizzes" value="48" trend="12%" trendUp={true} />
          <StatCard icon="ri-group-line" iconBg="bg-purple-50 text-purple-600" label="Total Students" value="1,284" trend="8%" trendUp={true} />
          <StatCard icon="ri-edit-line" iconBg="bg-green-50 text-green-600" label="Total Attempts" value="5,632" trend="23%" trendUp={true} />
          <StatCard icon="ri-bar-chart-line" iconBg="bg-orange-50 text-orange-600" label="Average Score" value="74.2%" trend="3%" trendUp={false} />
        </div>

        <DashboardCharts />
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
}
