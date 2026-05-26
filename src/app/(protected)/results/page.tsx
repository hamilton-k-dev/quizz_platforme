'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

const results = [
  { id: 1, student: 'Alice Johnson', email: 'alice@school.edu', avatar: 'AJ', color: 'bg-blue-500', quiz: 'Math Fundamentals', score: 92, grade: 'A', passed: true },
  { id: 2, student: 'Bob Smith', email: 'bob@school.edu', avatar: 'BS', color: 'bg-purple-500', quiz: 'Science 101', score: 68, grade: 'C', passed: true },
  { id: 3, student: 'Carlos Rivera', email: 'carlos@school.edu', avatar: 'CR', color: 'bg-green-500', quiz: 'World History Quiz', score: 85, grade: 'B', passed: true },
  { id: 4, student: 'Diana Lee', email: 'diana@school.edu', avatar: 'DL', color: 'bg-orange-500', quiz: 'English Grammar', score: 54, grade: 'D', passed: false },
  { id: 5, student: 'Ethan Brown', email: 'ethan@school.edu', avatar: 'EB', color: 'bg-pink-500', quiz: 'Physics Fundamentals', score: 77, grade: 'B', passed: true },
  { id: 6, student: 'Fiona Chen', email: 'fiona@school.edu', avatar: 'FC', color: 'bg-teal-500', quiz: 'Biology Essentials', score: 91, grade: 'A', passed: true },
  { id: 7, student: 'George Kim', email: 'george@school.edu', avatar: 'GK', color: 'bg-indigo-500', quiz: 'Chemistry Basics', score: 43, grade: 'F', passed: false },
  { id: 8, student: 'Hannah Park', email: 'hannah@school.edu', avatar: 'HP', color: 'bg-rose-500', quiz: 'Geography Challenge', score: 88, grade: 'B', passed: true },
  { id: 9, student: 'Ivan Torres', email: 'ivan@school.edu', avatar: 'IT', color: 'bg-amber-500', quiz: 'Math Fundamentals', score: 62, grade: 'C', passed: true },
  { id: 10, student: 'Julia Wang', email: 'julia@school.edu', avatar: 'JW', color: 'bg-cyan-500', quiz: 'Science 101', score: 79, grade: 'B', passed: true },
  { id: 11, student: 'Kevin Patel', email: 'kevin@school.edu', avatar: 'KP', color: 'bg-violet-500', quiz: 'World History Quiz', score: 38, grade: 'F', passed: false },
  { id: 12, student: 'Laura Martinez', email: 'laura@school.edu', avatar: 'LM', color: 'bg-emerald-500', quiz: 'English Grammar', score: 95, grade: 'A', passed: true },
];

const gradeColor: Record<string, string> = {
  A: 'bg-green-50 text-green-700',
  B: 'bg-blue-50 text-blue-700',
  C: 'bg-yellow-50 text-yellow-700',
  D: 'bg-orange-50 text-orange-700',
  F: 'bg-red-50 text-red-700',
};

export default function ResultsPage() {
  const [filter, setFilter] = useState<'all' | 'passed' | 'failed'>('all');
  const [sortBy, setSortBy] = useState<'score' | 'student'>('score');

  const filtered = results
    .filter(r => filter === 'all' || (filter === 'passed' ? r.passed : !r.passed))
    .sort((a, b) => sortBy === 'score' ? b.score - a.score : a.student.localeCompare(b.student));

  const avg = Math.round(results.reduce((s, r) => s + r.score, 0) / results.length);
  const passRate = Math.round((results.filter(r => r.passed).length / results.length) * 100);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Results</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of all student quiz results</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600"><i className="ri-bar-chart-line text-lg"></i></div>
              <span className="text-sm text-gray-500">Average Score</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{avg}%</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-50 text-green-600"><i className="ri-checkbox-circle-line text-lg"></i></div>
              <span className="text-sm text-gray-500">Pass Rate</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{passRate}%</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-purple-50 text-purple-600"><i className="ri-user-line text-lg"></i></div>
              <span className="text-sm text-gray-500">Total Results</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{results.length}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            {(['all', 'passed', 'failed'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer capitalize whitespace-nowrap ${filter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>{f}</button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Sort by:</span>
            <button onClick={() => setSortBy('score')} className={`px-3 py-1 rounded-lg cursor-pointer transition-all ${sortBy === 'score' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}>Score</button>
            <button onClick={() => setSortBy('student')} className={`px-3 py-1 rounded-lg cursor-pointer transition-all ${sortBy === 'student' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}>Name</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100">
            <div className="col-span-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Student</div>
            <div className="col-span-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Quiz</div>
            <div className="col-span-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Score</div>
            <div className="col-span-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">Grade</div>
            <div className="col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</div>
          </div>
          {filtered.map((r, i) => (
            <div key={r.id} className={`grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-blue-50/30 transition-all ${i < filtered.length - 1 ? 'border-b border-gray-50' : ''}`}>
              <div className="col-span-3 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${r.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{r.avatar}</div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{r.student}</p>
                  <p className="text-xs text-gray-400 truncate">{r.email}</p>
                </div>
              </div>
              <div className="col-span-3">
                <p className="text-sm text-gray-700 truncate">{r.quiz}</p>
              </div>
              <div className="col-span-3">
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-bold ${r.score >= 70 ? 'text-green-600' : r.score >= 50 ? 'text-orange-500' : 'text-red-500'}`}>{r.score}%</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[80px]">
                    <div className={`h-full rounded-full ${r.score >= 70 ? 'bg-green-500' : r.score >= 50 ? 'bg-orange-500' : 'bg-red-500'}`} style={{ width: `${r.score}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${gradeColor[r.grade]}`}>{r.grade}</span>
              </div>
              <div className="col-span-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${r.passed ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {r.passed ? 'Passed' : 'Failed'}
                </span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <i className="ri-file-search-line text-4xl block mb-3"></i>
              <p className="text-base font-medium">No results found</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
