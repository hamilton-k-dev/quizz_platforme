'use client';
import { useState, useEffect } from 'react';
import { Quiz } from './QuizCard';

const allQuestions = [
  { id: 1, text: 'What is 2 + 2?' }, { id: 2, text: 'What is the capital of France?' },
  { id: 3, text: 'Who wrote Romeo and Juliet?' }, { id: 4, text: 'What is H2O?' },
  { id: 5, text: 'What planet is closest to the Sun?' }, { id: 6, text: 'What is the speed of light?' },
];

export default function QuizModal({ quiz, onClose, onSave }: { quiz: Quiz | null; onClose: () => void; onSave: (q: Partial<Quiz>) => void }) {
  const [form, setForm] = useState({ title: '', subject: '', description: '', timeLimit: 30, status: 'draft' as 'published' | 'draft', selectedQ: [] as number[] });

  useEffect(() => {
    if (quiz) setForm({ title: quiz.title, subject: quiz.subject, description: '', timeLimit: quiz.timeLimit, status: quiz.status, selectedQ: [] });
    else setForm({ title: '', subject: '', description: '', timeLimit: 30, status: 'draft', selectedQ: [] });
  }, [quiz]);

  const toggleQ = (id: number) => setForm(f => ({ ...f, selectedQ: f.selectedQ.includes(id) ? f.selectedQ.filter(q => q !== id) : [...f.selectedQ, id] }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col z-10">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">{quiz ? 'Edit Quiz' : 'Create New Quiz'}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 cursor-pointer transition-all">
            <i className="ri-close-line text-lg"></i>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Quiz Title</label>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Math Fundamentals"
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:border-blue-400 transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
              <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="e.g. Mathematics"
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:border-blue-400 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Time Limit (min)</label>
              <input type="number" value={form.timeLimit} onChange={e => setForm(f => ({ ...f, timeLimit: +e.target.value }))}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:border-blue-400 transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
              placeholder="Brief description of this quiz..."
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:border-blue-400 transition-all resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
            <div className="flex gap-3">
              {(['draft', 'published'] as const).map(s => (
                <button key={s} onClick={() => setForm(f => ({ ...f, status: s }))}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all cursor-pointer capitalize ${form.status === s ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Questions</label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {allQuestions.map(q => (
                <label key={q.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-all">
                  <input type="checkbox" checked={form.selectedQ.includes(q.id)} onChange={() => toggleQ(q.id)} className="w-4 h-4 accent-blue-600" />
                  <span className="text-sm text-gray-700">{q.text}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all cursor-pointer whitespace-nowrap">Cancel</button>
          <button onClick={() => { onSave({ ...form, questions: form.selectedQ.length || 10 }); onClose(); }}
            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all cursor-pointer whitespace-nowrap">
            {quiz ? 'Save Changes' : 'Create Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
}
