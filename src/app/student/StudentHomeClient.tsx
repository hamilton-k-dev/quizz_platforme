'use client';
import Link from 'next/link';

const stats = [
  { label: 'Quizzes Taken', value: '12', icon: 'ri-file-list-3-line', color: 'bg-blue-50 text-blue-600' },
  { label: 'Avg. Score', value: '78%', icon: 'ri-bar-chart-line', color: 'bg-violet-50 text-violet-600' },
  { label: 'Best Score', value: '96%', icon: 'ri-trophy-line', color: 'bg-amber-50 text-amber-600' },
  { label: 'Rank', value: '#4', icon: 'ri-medal-line', color: 'bg-green-50 text-green-600' },
];

const availableQuizzes = [
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

export default function StudentHomeClient() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Sarah!</h1>
          <p className="text-sm text-gray-500 mt-1">Ready to test your knowledge today?</p>
        </div>
        <Link href="/student/my-quizzes"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all cursor-pointer shadow-sm whitespace-nowrap">
          <i className="ri-file-list-3-line text-base"></i>
          Browse All Quizzes
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 flex items-center justify-center rounded-xl mb-3 ${s.color}`}>
              <i className={`${s.icon} text-xl`}></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Available Quizzes</h2>
          <Link href="/student/my-quizzes" className="text-sm text-blue-600 hover:underline cursor-pointer">View all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {availableQuizzes.map(quiz => (
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
                  <span className="flex items-center gap-1"><i className="ri-group-line"></i>{quiz.attempts}</span>
                </div>

                {'score' in quiz && quiz.status === 'completed' && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">Your score</span>
                      <span className={`font-semibold ${(quiz.score as number) >= 70 ? 'text-green-600' : 'text-red-500'}`}>{quiz.score}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${(quiz.score as number) >= 70 ? 'bg-green-500' : 'bg-red-400'}`} style={{ width: `${quiz.score}%` }} />
                    </div>
                  </div>
                )}

                <Link href={`/student/take-quiz/${quiz.id}`}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${quiz.status === 'completed' ? 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                  <i className={`${quiz.status === 'completed' ? 'ri-refresh-line' : 'ri-play-circle-line'} text-base`}></i>
                  {quiz.status === 'completed' ? 'Retake Quiz' : 'Start Quiz'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
