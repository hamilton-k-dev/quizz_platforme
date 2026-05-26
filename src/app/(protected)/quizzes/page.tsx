'use client';
import { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import QuizCard, { Quiz } from './QuizCard';
import QuizModal from './QuizModal';

const initialQuizzes: Quiz[] = [
  { id: 1, title: 'Math Fundamentals', subject: 'Mathematics', questions: 20, timeLimit: 30, status: 'published', attempts: 142, avgScore: 74 },
  { id: 2, title: 'Science 101', subject: 'Science', questions: 15, timeLimit: 25, status: 'published', attempts: 98, avgScore: 68 },
  { id: 3, title: 'World History Quiz', subject: 'History', questions: 25, timeLimit: 40, status: 'published', attempts: 76, avgScore: 81 },
  { id: 4, title: 'English Grammar Mastery', subject: 'English', questions: 30, timeLimit: 45, status: 'published', attempts: 203, avgScore: 72 },
  { id: 5, title: 'Physics Fundamentals', subject: 'Physics', questions: 18, timeLimit: 35, status: 'draft', attempts: 0, avgScore: 0 },
  { id: 6, title: 'Chemistry Basics', subject: 'Chemistry', questions: 22, timeLimit: 30, status: 'draft', attempts: 0, avgScore: 0 },
  { id: 7, title: 'Geography Challenge', subject: 'Geography', questions: 20, timeLimit: 25, status: 'published', attempts: 55, avgScore: 77 },
  { id: 8, title: 'Biology Essentials', subject: 'Biology', questions: 24, timeLimit: 40, status: 'published', attempts: 89, avgScore: 70 },
  { id: 9, title: 'Computer Science Intro', subject: 'CS', questions: 16, timeLimit: 20, status: 'draft', attempts: 0, avgScore: 0 },
];

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes);
  const [modalOpen, setModalOpen] = useState(false);
  const [editQuiz, setEditQuiz] = useState<Quiz | null>(null);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [search, setSearch] = useState('');

  const filtered = quizzes.filter(q => {
    const matchFilter = filter === 'all' || q.status === filter;
    const matchSearch = q.title.toLowerCase().includes(search.toLowerCase()) || q.subject.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleSave = (data: Partial<Quiz>) => {
    if (editQuiz) {
      setQuizzes(qs => qs.map(q => q.id === editQuiz.id ? { ...q, ...data } : q));
    } else {
      setQuizzes(qs => [...qs, { id: Date.now(), title: data.title || '', subject: data.subject || '', questions: data.questions || 0, timeLimit: data.timeLimit || 30, status: data.status || 'draft', attempts: 0, avgScore: 0 }]);
    }
  };

  const handleDelete = (id: number) => setQuizzes(qs => qs.filter(q => q.id !== id));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quizzes</h1>
            <p className="text-sm text-gray-500 mt-1">{quizzes.filter(q => q.status === 'published').length} published · {quizzes.filter(q => q.status === 'draft').length} drafts</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/student" className="flex items-center gap-2 px-4 py-2.5 border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap">
              <i className="ri-graduation-cap-line text-base"></i>Student View
            </Link>
            <button onClick={() => { setEditQuiz(null); setModalOpen(true); }}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all cursor-pointer shadow-sm whitespace-nowrap">
              <i className="ri-add-line text-base"></i>Create Quiz
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-xs">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <i className="ri-search-line text-sm"></i>
            </div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search quizzes..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 text-gray-700" />
          </div>
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            {(['all', 'published', 'draft'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer capitalize whitespace-nowrap ${filter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(quiz => (
            <QuizCard key={quiz.id} quiz={quiz} onEdit={q => { setEditQuiz(q); setModalOpen(true); }} onDelete={handleDelete} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <i className="ri-file-list-3-line text-4xl block mb-3"></i>
            <p className="text-base font-medium">No quizzes found</p>
            <p className="text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        )}
      </div>

      {modalOpen && <QuizModal quiz={editQuiz} onClose={() => setModalOpen(false)} onSave={handleSave} />}
    </DashboardLayout>
  );
}
