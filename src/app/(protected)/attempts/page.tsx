'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

type Attempt = {
  id: number; student: string; avatar: string; color: string; quiz: string; subject: string;
  score: number; total: number; date: string; duration: string;
};

const attempts: Attempt[] = [
  { id: 1, student: 'Alice Johnson', avatar: 'AJ', color: 'bg-blue-500', quiz: 'Math Fundamentals', subject: 'Mathematics', score: 92, total: 100, date: '2 min ago', duration: '24 min' },
  { id: 2, student: 'Bob Smith', avatar: 'BS', color: 'bg-purple-500', quiz: 'Science 101', subject: 'Science', score: 68, total: 100, date: '15 min ago', duration: '22 min' },
  { id: 3, student: 'Carlos Rivera', avatar: 'CR', color: 'bg-green-500', quiz: 'World History Quiz', subject: 'History', score: 85, total: 100, date: '1h ago', duration: '38 min' },
  { id: 4, student: 'Diana Lee', avatar: 'DL', color: 'bg-orange-500', quiz: 'English Grammar', subject: 'English', score: 54, total: 100, date: '2h ago', duration: '41 min' },
  { id: 5, student: 'Ethan Brown', avatar: 'EB', color: 'bg-pink-500', quiz: 'Physics Fundamentals', subject: 'Physics', score: 77, total: 100, date: '3h ago', duration: '33 min' },
  { id: 6, student: 'Fiona Chen', avatar: 'FC', color: 'bg-teal-500', quiz: 'Biology Essentials', subject: 'Biology', score: 91, total: 100, date: '5h ago', duration: '37 min' },
  { id: 7, student: 'George Kim', avatar: 'GK', color: 'bg-indigo-500', quiz: 'Chemistry Basics', subject: 'Chemistry', score: 43, total: 100, date: '1d ago', duration: '28 min' },
  { id: 8, student: 'Hannah Park', avatar: 'HP', color: 'bg-rose-500', quiz: 'Geography Challenge', subject: 'Geography', score: 88, total: 100, date: '1d ago', duration: '23 min' },
  { id: 9, student: 'Ivan Torres', avatar: 'IT', color: 'bg-amber-500', quiz: 'Math Fundamentals', subject: 'Mathematics', score: 62, total: 100, date: '2d ago', duration: '29 min' },
  { id: 10, student: 'Julia Wang', avatar: 'JW', color: 'bg-cyan-500', quiz: 'Science 101', subject: 'Science', score: 79, total: 100, date: '2d ago', duration: '21 min' },
];

const mockAnswers = [
  { q: 'What is the value of π to two decimal places?', student: '3.14', correct: '3.14', ok: true },
  { q: 'Which planet is known as the Red Planet?', student: 'Mars', correct: 'Mars', ok: true },
  { q: 'What is the chemical symbol for Gold?', student: 'Gd', correct: 'Au', ok: false },
  { q: 'In which year did World War II end?', student: '1945', correct: '1945', ok: true },
  { q: "What is Newton's Second Law?", student: 'E = mc²', correct: 'F = ma', ok: false },
];

export default function AttemptsPage() {
  const [selected, setSelected] = useState<Attempt | null>(null);
  const [search, setSearch] = useState('');

  const filtered = attempts.filter(a =>
    a.student.toLowerCase().includes(search.toLowerCase()) ||
    a.quiz.toLowerCase().includes(search.toLowerCase())
  );

  const scoreColor = (s: number) => s >= 70 ? 'text-green-600' : s >= 50 ? 'text-orange-500' : 'text-red-500';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attempts</h1>
          <p className="text-sm text-gray-500 mt-1">{attempts.length} total attempts recorded</p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <i className="ri-search-line text-sm"></i>
            </div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by student or quiz..."
              className="pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 text-gray-700 w-72" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100">
            <div className="col-span-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Student</div>
            <div className="col-span-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Quiz</div>
            <div className="col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Score</div>
            <div className="col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Duration</div>
            <div className="col-span-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</div>
            <div className="col-span-1 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">Details</div>
          </div>
          {filtered.map((a, i) => (
            <div key={a.id} className={`grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-blue-50/30 transition-all ${i < filtered.length - 1 ? 'border-b border-gray-50' : ''}`}>
              <div className="col-span-3 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${a.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{a.avatar}</div>
                <span className="text-sm font-medium text-gray-800 truncate">{a.student}</span>
              </div>
              <div className="col-span-3">
                <p className="text-sm text-gray-800 truncate">{a.quiz}</p>
                <p className="text-xs text-blue-500 mt-0.5">{a.subject}</p>
              </div>
              <div className="col-span-2">
                <span className={`text-sm font-bold ${scoreColor(a.score)}`}>{a.score}</span>
                <span className="text-xs text-gray-400">/{a.total}</span>
                <div className="w-20 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                  <div className={`h-full rounded-full ${a.score >= 70 ? 'bg-green-500' : a.score >= 50 ? 'bg-orange-500' : 'bg-red-500'}`} style={{ width: `${a.score}%` }}></div>
                </div>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <i className="ri-time-line text-xs"></i>{a.duration}
                </span>
              </div>
              <div className="col-span-1">
                <span className="text-xs text-gray-400">{a.date}</span>
              </div>
              <div className="col-span-1 flex justify-end">
                <button onClick={() => setSelected(a)} className="text-xs text-blue-500 hover:text-blue-600 font-medium cursor-pointer whitespace-nowrap">View →</button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <i className="ri-file-search-line text-4xl block mb-3"></i>
              <p className="text-base font-medium">No attempts found</p>
            </div>
          )}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelected(null)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col z-10">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Attempt Details</h2>
                <p className="text-sm text-gray-500 mt-0.5">{selected.student} · {selected.quiz}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-2xl font-bold ${scoreColor(selected.score)}`}>{selected.score}%</span>
                <button onClick={() => setSelected(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 cursor-pointer">
                  <i className="ri-close-line text-lg"></i>
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
              {mockAnswers.map((ans, i) => (
                <div key={i} className={`p-4 rounded-xl border-l-4 ${ans.ok ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'}`}>
                  <p className="text-sm font-medium text-gray-800 mb-2">Q{i + 1}. {ans.q}</p>
                  <div className="flex gap-4 text-xs">
                    <span className={`flex items-center gap-1 ${ans.ok ? 'text-green-600' : 'text-red-500'}`}>
                      <i className={ans.ok ? 'ri-check-line' : 'ri-close-line'}></i>
                      Student: {ans.student}
                    </span>
                    {!ans.ok && <span className="text-green-600 flex items-center gap-1"><i className="ri-check-double-line"></i>Correct: {ans.correct}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
