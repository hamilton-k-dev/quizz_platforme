'use client';
import StudentLayout from '@/components/StudentLayout';
import Link from 'next/link';

const myResults = [
  { id: 1, quiz: 'Science 101', subject: 'Science', score: 85, date: 'Apr 5, 2026', timeTaken: '18 min', passed: true, grade: 'A' },
  { id: 2, quiz: 'English Grammar Mastery', subject: 'English', score: 70, date: 'Apr 3, 2026', timeTaken: '32 min', passed: true, grade: 'B' },
  { id: 3, quiz: 'Math Fundamentals', subject: 'Mathematics', score: 60, date: 'Mar 28, 2026', timeTaken: '25 min', passed: false, grade: 'D' },
  { id: 4, quiz: 'Geography Challenge', subject: 'Geography', score: 80, date: 'Mar 20, 2026', timeTaken: '20 min', passed: true, grade: 'B' },
  { id: 5, quiz: 'Biology Essentials', subject: 'Biology', score: 90, date: 'Mar 15, 2026', timeTaken: '28 min', passed: true, grade: 'A' },
];

const gradeColor: Record<string, string> = {
  A: 'bg-green-50 text-green-700',
  B: 'bg-blue-50 text-blue-700',
  C: 'bg-yellow-50 text-yellow-700',
  D: 'bg-red-50 text-red-700',
  F: 'bg-red-100 text-red-800',
};

export default function StudentResultsPage() {
  const avg = Math.round(myResults.reduce((a, r) => a + r.score, 0) / myResults.length);
  const passed = myResults.filter(r => r.passed).length;

  return (
    <StudentLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Results</h1>
          <p className="text-sm text-gray-500 mt-1">Track your quiz performance over time</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Quizzes Taken', value: myResults.length, icon: 'ri-file-list-3-line', color: 'text-blue-600 bg-blue-50' },
            { label: 'Passed', value: passed, icon: 'ri-checkbox-circle-line', color: 'text-green-600 bg-green-50' },
            { label: 'Failed', value: myResults.length - passed, icon: 'ri-close-circle-line', color: 'text-red-500 bg-red-50' },
            { label: 'Avg. Score', value: `${avg}%`, icon: 'ri-bar-chart-line', color: 'text-violet-600 bg-violet-50' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className={`w-10 h-10 flex items-center justify-center rounded-xl mb-3 ${s.color}`}>
                <i className={`${s.icon} text-xl`}></i>
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Attempt History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Quiz</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Time</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Score</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Grade</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {myResults.map(r => (
                  <tr key={r.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{r.quiz}</p>
                      <p className="text-xs text-gray-500">{r.subject}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{r.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{r.timeTaken}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${r.passed ? 'bg-green-500' : 'bg-red-400'}`} style={{ width: `${r.score}%` }} />
                        </div>
                        <span className={`text-sm font-semibold ${r.passed ? 'text-green-600' : 'text-red-500'}`}>{r.score}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${gradeColor[r.grade]}`}>{r.grade}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${r.passed ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {r.passed ? 'Passed' : 'Failed'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/student/take-quiz/${r.id}`}
                        className="text-xs text-blue-600 hover:underline cursor-pointer whitespace-nowrap">
                        Retake
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
