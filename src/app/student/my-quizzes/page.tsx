'use client';
import { useState } from 'react';
import Link from 'next/link';
import StudentLayout from '@/components/StudentLayout';

const allQuizzes = [
  { id: 1, title: 'Math Fundamentals', subject: 'Mathematics', questions: 20, timeLimit: 30, difficulty: 'Medium', attempts: 142, avgScore: 74, status: 'not-started', color: 'from-blue-500 to-indigo-600' },
  { id: 2, title: 'Science 101', subject: 'Science', questions: 15, timeLimit: 25, difficulty: 'Easy', attempts: 98, avgScore: 68, status: 'completed', score: 85, color: 'from-green-500 to-teal-600' },
  { id: 3, title: 'World History Quiz', subject: 'History', questions: 25, timeLimit: 40, difficulty: 'Hard', attempts: 76, avgScore: 81, status: 'not-started', color: 'from-orange-500 to-red-500' },
  { id: 4, title: 'English Grammar Mastery', subject: 'English', questions: 30, timeLimit: 45, difficulty: 'Medium', attempts: 203, avgScore: 72, status: 'completed', score: 70, color: 'from-purple-500 to-pink-500' },
  { id: 7, title: 'Geography Challenge', subject: 'Geography', questions: 20, timeLimit: 25, difficulty: 'Easy', attempts: 55, avgScore: 77, status: 'not-started', color: 'from-cyan-500 to-blue-500' },
  { id: 8, title: 'Biology Essentials', subject: 'Biology', questions: 24, timeLimit: 40, difficulty: 'Medium', attempts: 89, avgScore: 70, status: 'not-started', color: 'from-emerald-500 to-green-600' },
];

const difficultyColor: Record<string, string> = {
  Easy: 'bg-green-50 text-green-600',
  Medium: 'bg-amber-50 text-amber-600',
  Hard: 'bg-red-50 text-red-600',
};

export default function MyQuizzesPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'not-started' | 'completed'>('all');
  const [difficulty, setDifficulty] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all');

  const filtered = allQuizzes.filter(q => {
    const matchSearch = q.title.toLowerCase().includes(search.toLowerCase()) || q.subject.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || q.status === filter;
    const matchDiff = difficulty === 'all' || q.difficulty === difficulty;
    return matchSearch && matchFilter && matchDiff;
  });

  return (
    <StudentLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Quizzes</h1>
          <p className="text-sm text-gray-500 mt-1">{allQuizzes.filter(q => q.status === 'not-started').length} pending · {allQuizzes.filter(q => q.status === 'completed').length} completed</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <i className="ri-search-line text-sm"></i>
            </div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search quizzes..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 text-gray-700" />
          </div>
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            {(['all', 'not-started', 'completed'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${filter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {f === 'not-started' ? 'Pending' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            {(['all', 'Easy', 'Medium', 'Hard'] as const).map(d => (
              <button key={d} onClick={() => setDifficulty(d)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${difficulty === d ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {d === 'all' ? 'All Levels' : d}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(quiz => (
            <div key={quiz.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div className={`h-2 bg-gradient-to-r ${quiz.color}`} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug">{quiz.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{quiz.subject}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${difficultyColor[quiz.difficulty]}`}>{quiz.difficulty}</span>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><i className="ri-question-line"></i>{quiz.questions} Qs</span>
                  <span className="flex items-center gap-1"><i className="ri-time-line"></i>{quiz.timeLimit} min</span>
                  <span className="flex items-center gap-1"><i className="ri-group-line"></i>{quiz.attempts} attempts</span>
                </div>

                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="text-gray-500">Class avg: <span className="font-semibold text-gray-700">{quiz.avgScore}%</span></span>
                  {'score' in quiz && quiz.status === 'completed' && (
                    <span className={`font-semibold ${(quiz.score as number) >= 70 ? 'text-green-600' : 'text-red-500'}`}>Your score: {quiz.score}%</span>
                  )}
                </div>

                {'score' in quiz && quiz.status === 'completed' && (
                  <div className="mb-4">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${(quiz.score as number) >= 70 ? 'bg-green-500' : 'bg-red-400'}`} style={{ width: `${quiz.score}%` }} />
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Link href={`/student/take-quiz/${quiz.id}`}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${quiz.status === 'completed' ? 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                    <i className={`${quiz.status === 'completed' ? 'ri-refresh-line' : 'ri-play-circle-line'} text-base`}></i>
                    {quiz.status === 'completed' ? 'Retake' : 'Start Quiz'}
                  </Link>
                  {quiz.status === 'completed' && (
                    <Link href="/student/results"
                      className="px-3 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all cursor-pointer flex items-center justify-center">
                      <i className="ri-bar-chart-line text-base"></i>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <i className="ri-file-list-3-line text-4xl block mb-3"></i>
            <p className="text-base font-medium">No quizzes found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
