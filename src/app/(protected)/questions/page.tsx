'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import QuestionModal from './QuestionModal';

export type Question = {
  id: number; text: string; choices: string[]; correct: number;
  difficulty: 'easy' | 'medium' | 'hard'; subject: string; type: 'MCQ';
};

const initialQuestions: Question[] = [
  { id: 1, text: 'What is the value of π (pi) to two decimal places?', choices: ['3.14', '3.16', '3.12', '3.18'], correct: 0, difficulty: 'easy', subject: 'Mathematics', type: 'MCQ' },
  { id: 2, text: 'Which planet is known as the Red Planet?', choices: ['Venus', 'Jupiter', 'Mars', 'Saturn'], correct: 2, difficulty: 'easy', subject: 'Science', type: 'MCQ' },
  { id: 3, text: 'Who wrote "To Kill a Mockingbird"?', choices: ['Mark Twain', 'Harper Lee', 'Ernest Hemingway', 'F. Scott Fitzgerald'], correct: 1, difficulty: 'medium', subject: 'English', type: 'MCQ' },
  { id: 4, text: 'What is the chemical symbol for Gold?', choices: ['Go', 'Gd', 'Au', 'Ag'], correct: 2, difficulty: 'medium', subject: 'Chemistry', type: 'MCQ' },
  { id: 5, text: 'In which year did World War II end?', choices: ['1943', '1944', '1946', '1945'], correct: 3, difficulty: 'easy', subject: 'History', type: 'MCQ' },
  { id: 6, text: 'What is the powerhouse of the cell?', choices: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'], correct: 1, difficulty: 'easy', subject: 'Biology', type: 'MCQ' },
  { id: 7, text: "What is Newton's Second Law of Motion?", choices: ['F = ma', 'E = mc²', 'v = u + at', 'P = mv'], correct: 0, difficulty: 'medium', subject: 'Physics', type: 'MCQ' },
  { id: 8, text: 'What is the largest ocean on Earth?', choices: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], correct: 3, difficulty: 'easy', subject: 'Geography', type: 'MCQ' },
  { id: 9, text: 'What does CPU stand for?', choices: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Core Processing Unit'], correct: 0, difficulty: 'easy', subject: 'CS', type: 'MCQ' },
  { id: 10, text: 'Solve: If x² - 5x + 6 = 0, what are the values of x?', choices: ['x = 2, x = 3', 'x = 1, x = 6', 'x = -2, x = -3', 'x = 2, x = -3'], correct: 0, difficulty: 'hard', subject: 'Mathematics', type: 'MCQ' },
  { id: 11, text: 'What is the speed of light in a vacuum?', choices: ['3×10⁸ m/s', '3×10⁶ m/s', '3×10¹⁰ m/s', '3×10⁴ m/s'], correct: 0, difficulty: 'medium', subject: 'Physics', type: 'MCQ' },
  { id: 12, text: 'Which gas do plants absorb during photosynthesis?', choices: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correct: 2, difficulty: 'easy', subject: 'Biology', type: 'MCQ' },
];

const difficultyConfig = {
  easy: { color: 'text-green-600 bg-green-50', dot: 'bg-green-500' },
  medium: { color: 'text-orange-600 bg-orange-50', dot: 'bg-orange-500' },
  hard: { color: 'text-red-600 bg-red-50', dot: 'bg-red-500' },
};

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [modalOpen, setModalOpen] = useState(false);
  const [editQ, setEditQ] = useState<Question | null>(null);
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const subjects = ['all', ...Array.from(new Set(questions.map(q => q.subject)))];

  const filtered = questions.filter(q => {
    const matchSearch = q.text.toLowerCase().includes(search.toLowerCase());
    const matchDiff = diffFilter === 'all' || q.difficulty === diffFilter;
    const matchSubject = subjectFilter === 'all' || q.subject === subjectFilter;
    return matchSearch && matchDiff && matchSubject;
  });

  const handleSave = (data: Partial<Question>) => {
    if (editQ) {
      setQuestions(qs => qs.map(q => q.id === editQ.id ? { ...q, ...data } : q));
    } else {
      setQuestions(qs => [...qs, { id: Date.now(), type: 'MCQ', ...data } as Question]);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Question Bank</h1>
            <p className="text-sm text-gray-500 mt-1">{questions.length} questions total</p>
          </div>
          <button onClick={() => { setEditQ(null); setModalOpen(true); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all cursor-pointer shadow-sm whitespace-nowrap">
            <i className="ri-add-line text-base"></i>Add Question
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <i className="ri-search-line text-sm"></i>
            </div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search questions..."
              className="pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 text-gray-700 w-64" />
          </div>
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            {(['all', 'easy', 'medium', 'hard'] as const).map(d => (
              <button key={d} onClick={() => setDiffFilter(d)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer capitalize whitespace-nowrap ${diffFilter === d ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>{d}</button>
            ))}
          </div>
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl overflow-x-auto">
            {subjects.map(s => (
              <button key={s} onClick={() => setSubjectFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer capitalize whitespace-nowrap ${subjectFilter === s ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>{s}</button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100">
            <div className="col-span-6 text-xs font-semibold text-gray-500 uppercase tracking-wide">Question</div>
            <div className="col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Subject</div>
            <div className="col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</div>
            <div className="col-span-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">Difficulty</div>
            <div className="col-span-1 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">Actions</div>
          </div>
          {filtered.map((q, i) => (
            <div key={q.id} className={`grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-blue-50/30 transition-all ${i < filtered.length - 1 ? 'border-b border-gray-50' : ''}`}>
              <div className="col-span-6">
                <p className="text-sm text-gray-800 line-clamp-2">{q.text}</p>
                <p className="text-xs text-gray-400 mt-1">{q.choices[q.correct]} (correct)</p>
              </div>
              <div className="col-span-2">
                <span className="text-xs text-blue-600 font-medium">{q.subject}</span>
              </div>
              <div className="col-span-2">
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-50 text-blue-600">{q.type}</span>
              </div>
              <div className="col-span-1">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize flex items-center gap-1 w-fit ${difficultyConfig[q.difficulty].color}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${difficultyConfig[q.difficulty].dot}`}></span>
                  {q.difficulty}
                </span>
              </div>
              <div className="col-span-1 flex justify-end gap-1">
                <button onClick={() => { setEditQ(q); setModalOpen(true); }} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition-all cursor-pointer">
                  <i className="ri-edit-line text-sm"></i>
                </button>
                <button onClick={() => setQuestions(qs => qs.filter(x => x.id !== q.id))} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all cursor-pointer">
                  <i className="ri-delete-bin-line text-sm"></i>
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <i className="ri-question-line text-4xl block mb-3"></i>
              <p className="text-base font-medium">No questions found</p>
            </div>
          )}
        </div>
      </div>

      {modalOpen && <QuestionModal question={editQ} onClose={() => setModalOpen(false)} onSave={handleSave} />}
    </DashboardLayout>
  );
}
