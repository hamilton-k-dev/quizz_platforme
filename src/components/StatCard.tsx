export default function StatCard({ icon, iconBg, label, value, trend, trendUp }: {
  icon: string; iconBg: string; label: string; value: string; trend: string; trendUp: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:-translate-y-1 transition-all duration-200 shadow-sm hover:shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${iconBg}`}>
          <i className={`${icon} text-xl`}></i>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
          {trendUp ? '↑' : '↓'} {trend}
        </span>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}
