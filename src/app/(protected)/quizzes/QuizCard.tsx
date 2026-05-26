import Link from 'next/link';

export type Quiz = {
  id: number; title: string; subject: string; questions: number;
  timeLimit: number; status: 'published' | 'draft'; attempts: number; avgScore: number;
};

export default function QuizCard({ quiz, onEdit, onDelete }: { quiz: Quiz; onEdit: (q: Quiz) => void; onDelete: (id: number) => void }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden">
      <div className="h-2 w-full" style={{ background: quiz.status === 'published' ? 'linear-gradient(90deg,#3b82f6,#6366f1)' : 'linear-gradient(90deg,#9ca3af,#d1d5db)' }}></div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${quiz.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
            {quiz.status === 'published' ? 'Published' : 'Draft'}
          </span>
          <div className="flex gap-1">
            <button onClick={() => onEdit(quiz)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition-all cursor-pointer">
              <i className="ri-edit-line text-sm"></i>
            </button>
            <button onClick={() => onDelete(quiz.id)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all cursor-pointer">
              <i className="ri-delete-bin-line text-sm"></i>
            </button>
          </div>
        </div>
        <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-2">{quiz.title}</h3>
        <p className="text-sm text-blue-500 font-medium mb-4">{quiz.subject}</p>
        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1"><i className="ri-question-line"></i>{quiz.questions} questions</span>
          <span className="flex items-center gap-1"><i className="ri-time-line"></i>{quiz.timeLimit} min</span>
          <span className="flex items-center gap-1"><i className="ri-user-line"></i>{quiz.attempts} attempts</span>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Avg Score</p>
            <p className="text-sm font-semibold text-gray-700">{quiz.avgScore > 0 ? `${quiz.avgScore}%` : 'N/A'}</p>
          </div>
          {quiz.status === 'published' ? (
            <Link href={`/student/take-quiz/${quiz.id}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-all whitespace-nowrap">
              <i className="ri-play-line text-xs"></i>Take Quiz
            </Link>
          ) : (
            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gray-300 rounded-full" style={{ width: '0%' }}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
