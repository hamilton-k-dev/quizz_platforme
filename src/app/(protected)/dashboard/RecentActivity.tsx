const activities = [
  { id: 1, name: 'Alice Johnson', action: 'completed "Math Basics"', score: 92, time: '2m ago', avatar: 'AJ', color: 'bg-blue-500' },
  { id: 2, name: 'Bob Smith', action: 'started "Science 101"', score: null, time: '8m ago', avatar: 'BS', color: 'bg-purple-500' },
  { id: 3, name: 'Carlos Rivera', action: 'completed "History Quiz"', score: 78, time: '25m ago', avatar: 'CR', color: 'bg-green-500' },
  { id: 4, name: 'Diana Lee', action: 'completed "English Grammar"', score: 65, time: '1h ago', avatar: 'DL', color: 'bg-orange-500' },
  { id: 5, name: 'Ethan Brown', action: 'completed "Physics Fundamentals"', score: 88, time: '2h ago', avatar: 'EB', color: 'bg-pink-500' },
  { id: 6, name: 'Fiona Chen', action: 'started "Chemistry Basics"', score: null, time: '3h ago', avatar: 'FC', color: 'bg-teal-500' },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-blue-500 hover:text-blue-600 cursor-pointer font-medium">View All →</button>
      </div>
      <div>
        {activities.map((a, i) => (
          <div key={a.id} className={`flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-all cursor-pointer ${i < activities.length - 1 ? 'border-b border-gray-50' : ''}`}>
            <div className={`w-9 h-9 rounded-full ${a.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{a.avatar}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800">
                <span className="font-semibold">{a.name}</span> {a.action}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
            </div>
            {a.score !== null && (
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${a.score >= 70 ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                {a.score}%
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
