'use client';
import { useState, useEffect } from 'react';
import { Question } from './page';

export default function QuestionModal({ question, onClose, onSave }: { question: Question | null; onClose: () => void; onSave: (q: Partial<Question>) => void }) {
  const [form, setForm] = useState({ text: '', choices: ['', '', '', ''], correct: 0, difficulty: 'medium' as 'easy' | 'medium' | 'hard', subject: '' });

  useEffect(() => {
    if (question) setForm({ text: question.text, choices: [...question.choices], correct: question.correct, difficulty: question.difficulty, subject: question.subject });
    else setForm({ text: '', choices: ['', '', '', ''], correct: 0, difficulty: 'medium', subject: '' });
  }, [question]);

  const setChoice = (i: number, val: string) => setForm(f => { const c = [...f.choices]; c[i] = val; return { ...f, choices: c }; });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col z-10">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">{question ? 'Edit Question' : 'Add Question'}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 cursor-pointer transition-all">
            <i className="ri-close-line text-lg"></i>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Question Text</label>
            <textarea value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} rows={3}
              placeholder="Enter your question here..."
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:border-blue-400 transition-all resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
              <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="e.g. Mathematics"
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:border-blue-400 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Difficulty</label>
              <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
                {(['easy', 'medium', 'hard'] as const).map(d => (
                  <button key={d} onClick={() => setForm(f => ({ ...f, difficulty: d }))}
                    className={`flex-1 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer capitalize whitespace-nowrap ${form.difficulty === d ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>{d}</button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Answer Choices</label>
            <div className="space-y-2">
              {['A', 'B', 'C', 'D'].map((label, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${form.correct === i ? 'border-green-400 bg-green-50' : 'border-gray-200'}`}>
                  <button onClick={() => setForm(f => ({ ...f, correct: i }))}
                    className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold flex-shrink-0 transition-all cursor-pointer ${form.correct === i ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{label}</button>
                  <input value={form.choices[i]} onChange={e => setChoice(i, e.target.value)} placeholder={`Choice ${label}`}
                    className="flex-1 text-sm bg-transparent text-gray-900 focus:outline-none placeholder-gray-400" />
                  {form.correct === i && <i className="ri-check-line text-green-500 text-base"></i>}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">Click a letter to mark it as the correct answer</p>
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all cursor-pointer whitespace-nowrap">Cancel</button>
          <button onClick={() => { onSave(form); onClose(); }}
            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all cursor-pointer whitespace-nowrap">
            {question ? 'Save Changes' : 'Add Question'}
          </button>
        </div>
      </div>
    </div>
  );
}
