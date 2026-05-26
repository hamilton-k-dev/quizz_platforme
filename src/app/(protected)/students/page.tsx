'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import DashboardLayout from '@/components/DashboardLayout';
import AddStudentModal, { type Student } from './AddStudentModal';

const INITIAL_STUDENTS: Student[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@school.edu', avatar: 'AJ', color: 'bg-blue-500', attempts: 12, avgScore: 88, passRate: 92, joined: 'Jan 2024' },
  { id: 2, name: 'Bob Smith', email: 'bob@school.edu', avatar: 'BS', color: 'bg-purple-500', attempts: 8, avgScore: 71, passRate: 75, joined: 'Feb 2024' },
  { id: 3, name: 'Carlos Rivera', email: 'carlos@school.edu', avatar: 'CR', color: 'bg-green-500', attempts: 15, avgScore: 83, passRate: 87, joined: 'Jan 2024' },
  { id: 4, name: 'Diana Lee', email: 'diana@school.edu', avatar: 'DL', color: 'bg-orange-500', attempts: 6, avgScore: 62, passRate: 67, joined: 'Mar 2024' },
  { id: 5, name: 'Ethan Brown', email: 'ethan@school.edu', avatar: 'EB', color: 'bg-pink-500', attempts: 10, avgScore: 79, passRate: 80, joined: 'Feb 2024' },
  { id: 6, name: 'Fiona Chen', email: 'fiona@school.edu', avatar: 'FC', color: 'bg-teal-500', attempts: 14, avgScore: 91, passRate: 100, joined: 'Jan 2024' },
  { id: 7, name: 'George Kim', email: 'george@school.edu', avatar: 'GK', color: 'bg-indigo-500', attempts: 5, avgScore: 55, passRate: 60, joined: 'Apr 2024' },
  { id: 8, name: 'Hannah Park', email: 'hannah@school.edu', avatar: 'HP', color: 'bg-rose-500', attempts: 11, avgScore: 86, passRate: 91, joined: 'Mar 2024' },
  { id: 9, name: 'Ivan Torres', email: 'ivan@school.edu', avatar: 'IT', color: 'bg-amber-500', attempts: 9, avgScore: 68, passRate: 78, joined: 'Feb 2024' },
  { id: 10, name: 'Julia Wang', email: 'julia@school.edu', avatar: 'JW', color: 'bg-cyan-500', attempts: 13, avgScore: 77, passRate: 85, joined: 'Jan 2024' },
  { id: 11, name: 'Kevin Patel', email: 'kevin@school.edu', avatar: 'KP', color: 'bg-violet-500', attempts: 4, avgScore: 48, passRate: 50, joined: 'May 2024' },
  { id: 12, name: 'Laura Martinez', email: 'laura@school.edu', avatar: 'LM', color: 'bg-emerald-500', attempts: 16, avgScore: 94, passRate: 100, joined: 'Jan 2024' },
];

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Student | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const handleAddStudent = (data: Omit<Student, 'id'>) => {
    const id = Math.max(...students.map(s => s.id)) + 1;
    setStudents(prev => [...prev, { id, ...data }]);
    toast.success(`${data.name} has been added successfully`);
  };

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Students</h1>
            <p className="text-sm text-gray-500 mt-1">{students.length} enrolled students</p>
          </div>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all cursor-pointer shadow-sm whitespace-nowrap">
            <i className="ri-user-add-line text-base"></i>
            Add Student
          </button>
        </div>

        <div className="relative max-w-xs">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <i className="ri-search-line text-sm"></i>
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 text-gray-700" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(s => (
            <div key={s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full ${s.color} flex items-center justify-center text-white font-bold text-base flex-shrink-0`}>{s.avatar}</div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{s.name}</p>
                  <p className="text-xs text-gray-400 truncate">{s.email}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Joined {s.joined}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: 'Attempts', value: s.attempts },
                  { label: 'Avg Score', value: `${s.avgScore}%` },
                  { label: 'Pass Rate', value: `${s.passRate}%` },
                ].map(stat => (
                  <div key={stat.label} className="text-center p-2 bg-gray-50 rounded-xl">
                    <p className="text-base font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Performance</span>
                  <span>{s.avgScore}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${s.avgScore >= 80 ? 'bg-green-500' : s.avgScore >= 60 ? 'bg-blue-500' : 'bg-orange-500'}`} style={{ width: `${s.avgScore}%` }}></div>
                </div>
              </div>
              <button onClick={() => setSelected(s)} className="w-full py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-all cursor-pointer whitespace-nowrap">
                View Profile
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <i className="ri-user-search-line text-4xl block mb-3"></i>
            <p className="text-base font-medium">No students found</p>
          </div>
        )}
      </div>

      {showAdd && (
        <AddStudentModal onClose={() => setShowAdd(false)} onAdd={handleAddStudent} />
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelected(null)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">Student Profile</h2>
              <button onClick={() => setSelected(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 cursor-pointer">
                <i className="ri-close-line text-lg"></i>
              </button>
            </div>
            <div className="text-center mb-6">
              <div className={`w-20 h-20 rounded-full ${selected.color} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3`}>{selected.avatar}</div>
              <h3 className="text-xl font-bold text-gray-900">{selected.name}</h3>
              <p className="text-sm text-gray-500">{selected.email}</p>
              <p className="text-xs text-gray-400 mt-1">Member since {selected.joined}</p>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: 'Attempts', value: selected.attempts, icon: 'ri-edit-line', color: 'text-blue-600 bg-blue-50' },
                { label: 'Avg Score', value: `${selected.avgScore}%`, icon: 'ri-bar-chart-line', color: 'text-green-600 bg-green-50' },
                { label: 'Pass Rate', value: `${selected.passRate}%`, icon: 'ri-checkbox-circle-line', color: 'text-purple-600 bg-purple-50' },
              ].map(stat => (
                <div key={stat.label} className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${stat.color} mx-auto mb-2`}>
                    <i className={`${stat.icon} text-sm`}></i>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Overall Performance</p>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${selected.avgScore >= 80 ? 'bg-green-500' : selected.avgScore >= 60 ? 'bg-blue-500' : 'bg-orange-500'}`} style={{ width: `${selected.avgScore}%` }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0%</span><span>{selected.avgScore}%</span><span>100%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
