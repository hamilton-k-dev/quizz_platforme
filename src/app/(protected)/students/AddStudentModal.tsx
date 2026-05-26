'use client';
import { useState } from 'react';

const COLORS = [
  'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500',
  'bg-pink-500', 'bg-teal-500', 'bg-indigo-500', 'bg-rose-500',
  'bg-amber-500', 'bg-cyan-500', 'bg-violet-500', 'bg-emerald-500',
];

export type Student = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  color: string;
  attempts: number;
  avgScore: number;
  passRate: number;
  joined: string;
};

export default function AddStudentModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (s: Omit<Student, 'id'>) => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validate = () => {
    const e: { name?: string; email?: string } = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email address';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;
    const initials = name.trim().split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const now = new Date();
    const joined = now.toLocaleString('default', { month: 'short' }) + ' ' + now.getFullYear();
    onAdd({ name: name.trim(), email: email.trim(), avatar: initials, color, attempts: 0, avgScore: 0, passRate: 0, joined });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Add Student</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 cursor-pointer transition-all">
            <i className="ri-close-line text-lg" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <i className="ri-user-line text-base" />
              </div>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAdd()}
                placeholder="e.g. Jane Doe"
                className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:border-blue-400 transition-all ${errors.name ? 'border-red-400 focus:border-red-400' : 'border-gray-200'}`}
              />
            </div>
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <i className="ri-mail-line text-base" />
              </div>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAdd()}
                placeholder="e.g. jane@school.edu"
                type="email"
                className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:border-blue-400 transition-all ${errors.email ? 'border-red-400 focus:border-red-400' : 'border-gray-200'}`}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all cursor-pointer whitespace-nowrap">
            Cancel
          </button>
          <button onClick={handleAdd} className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all cursor-pointer whitespace-nowrap">
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
}
