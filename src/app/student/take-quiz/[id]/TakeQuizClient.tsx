'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const quizData: Record<string, { title: string; subject: string; timeLimit: number; questions: { id: number; text: string; choices: string[]; correct: number }[] }> = {
  '1': {
    title: 'Math Fundamentals', subject: 'Mathematics', timeLimit: 30,
    questions: [
      { id: 1, text: 'What is the value of π (pi) to two decimal places?', choices: ['3.14', '3.16', '3.12', '3.18'], correct: 0 },
      { id: 2, text: 'What is 15% of 200?', choices: ['25', '30', '35', '20'], correct: 1 },
      { id: 3, text: 'Solve: 3x + 7 = 22. What is x?', choices: ['4', '5', '6', '3'], correct: 1 },
      { id: 4, text: 'What is the square root of 144?', choices: ['11', '12', '13', '14'], correct: 1 },
      { id: 5, text: 'What is 2⁸?', choices: ['128', '256', '512', '64'], correct: 1 },
    ],
  },
  '2': {
    title: 'Science 101', subject: 'Science', timeLimit: 25,
    questions: [
      { id: 1, text: 'Which planet is known as the Red Planet?', choices: ['Venus', 'Jupiter', 'Mars', 'Saturn'], correct: 2 },
      { id: 2, text: 'What is the powerhouse of the cell?', choices: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'], correct: 1 },
      { id: 3, text: 'Which gas do plants absorb during photosynthesis?', choices: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correct: 2 },
      { id: 4, text: 'What is the chemical symbol for Gold?', choices: ['Go', 'Gd', 'Au', 'Ag'], correct: 2 },
      { id: 5, text: "What is Newton's Second Law of Motion?", choices: ['F = ma', 'E = mc²', 'v = u + at', 'P = mv'], correct: 0 },
    ],
  },
  '3': {
    title: 'World History Quiz', subject: 'History', timeLimit: 40,
    questions: [
      { id: 1, text: 'In which year did World War II end?', choices: ['1943', '1944', '1946', '1945'], correct: 3 },
      { id: 2, text: 'Who was the first President of the United States?', choices: ['John Adams', 'Thomas Jefferson', 'George Washington', 'Benjamin Franklin'], correct: 2 },
      { id: 3, text: 'The French Revolution began in which year?', choices: ['1776', '1789', '1799', '1804'], correct: 1 },
      { id: 4, text: 'Which empire was ruled by Julius Caesar?', choices: ['Greek', 'Ottoman', 'Roman', 'Byzantine'], correct: 2 },
      { id: 5, text: 'The Berlin Wall fell in which year?', choices: ['1987', '1988', '1989', '1990'], correct: 2 },
    ],
  },
  '4': {
    title: 'English Grammar Mastery', subject: 'English', timeLimit: 45,
    questions: [
      { id: 1, text: 'Which sentence is grammatically correct?', choices: ["She don't like apples.", "She doesn't likes apples.", "She doesn't like apples.", "She not like apples."], correct: 2 },
      { id: 2, text: 'What is the plural of "criterion"?', choices: ['Criterions', 'Criterias', 'Criteria', 'Criterium'], correct: 2 },
      { id: 3, text: 'Choose the correct form: "Neither of the students ___ ready."', choices: ['are', 'is', 'were', 'have been'], correct: 1 },
      { id: 4, text: 'Which word is an adverb in: "She sings beautifully"?', choices: ['She', 'sings', 'beautifully', 'None'], correct: 2 },
      { id: 5, text: 'What punctuation ends an imperative sentence?', choices: ['?', '!', '.', ';'], correct: 2 },
    ],
  },
  '7': {
    title: 'Geography Challenge', subject: 'Geography', timeLimit: 25,
    questions: [
      { id: 1, text: 'What is the largest ocean on Earth?', choices: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], correct: 3 },
      { id: 2, text: 'Which country has the most natural lakes?', choices: ['Russia', 'Canada', 'USA', 'Brazil'], correct: 1 },
      { id: 3, text: 'What is the capital of Australia?', choices: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'], correct: 2 },
      { id: 4, text: 'Which is the longest river in the world?', choices: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'], correct: 1 },
      { id: 5, text: 'Mount Everest is located in which mountain range?', choices: ['Andes', 'Alps', 'Rockies', 'Himalayas'], correct: 3 },
    ],
  },
  '8': {
    title: 'Biology Essentials', subject: 'Biology', timeLimit: 40,
    questions: [
      { id: 1, text: 'What is the basic unit of life?', choices: ['Atom', 'Molecule', 'Cell', 'Organ'], correct: 2 },
      { id: 2, text: 'DNA stands for?', choices: ['Deoxyribonucleic Acid', 'Diribonucleic Acid', 'Deoxyribose Nucleic Acid', 'None'], correct: 0 },
      { id: 3, text: 'Which organ produces insulin?', choices: ['Liver', 'Kidney', 'Pancreas', 'Stomach'], correct: 2 },
      { id: 4, text: 'How many chromosomes do humans have?', choices: ['23', '44', '46', '48'], correct: 2 },
      { id: 5, text: 'What process do plants use to make food?', choices: ['Respiration', 'Photosynthesis', 'Digestion', 'Fermentation'], correct: 1 },
    ],
  },
};

const defaultQuiz = quizData['1'];

export default function TakeQuizClient({ quizId }: { quizId: string }) {
  const quiz = quizData[quizId] || defaultQuiz;
  const questions = quiz.questions;
  const TOTAL_TIME = quiz.timeLimit * 60;

  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    if (!started || submitted) return;
    const t = setInterval(() => setTimeLeft(s => {
      if (s <= 1) { clearInterval(t); setSubmitted(true); return 0; }
      return s - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [started, submitted]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timeColor = timeLeft > 600 ? 'text-blue-600' : timeLeft > 180 ? 'text-orange-500' : 'text-red-500';
  const answered = answers.filter(a => a !== null).length;

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    setShowConfirm(false);
  }, []);

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-6">
            <i className="ri-file-list-3-line text-white text-3xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">{quiz.title}</h1>
          <p className="text-sm text-gray-500 text-center mb-8">{quiz.subject}</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { icon: 'ri-question-line', label: 'Questions', value: `${questions.length}` },
              { icon: 'ri-time-line', label: 'Time Limit', value: `${quiz.timeLimit} min` },
              { icon: 'ri-checkbox-circle-line', label: 'Pass Mark', value: '70%' },
            ].map(item => (
              <div key={item.label} className="text-center p-4 bg-gray-50 rounded-2xl">
                <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2 text-blue-600">
                  <i className={`${item.icon} text-xl`}></i>
                </div>
                <p className="text-lg font-bold text-gray-900">{item.value}</p>
                <p className="text-xs text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
            <div className="flex gap-3">
              <i className="ri-information-line text-amber-600 flex-shrink-0 mt-0.5"></i>
              <div className="text-xs text-amber-700 space-y-1">
                <p className="font-semibold">Before you begin:</p>
                <p>• The timer starts as soon as you click Start Quiz</p>
                <p>• You can navigate between questions freely</p>
                <p>• Make sure to submit before time runs out</p>
              </div>
            </div>
          </div>

          <button onClick={() => setStarted(true)}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-base transition-all cursor-pointer shadow-lg shadow-blue-200">
            Start Quiz
          </button>
          <Link href="/student/my-quizzes" className="block text-center mt-4 text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    const score = answers.reduce((acc, a, i) => (acc ?? 0) + (a === questions[i].correct ? 1 : 0), 0) as number;
    const pct = Math.round((score / questions.length) * 100);
    const passed = pct >= 70;

    if (showReview) {
      return (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => setShowReview(false)} className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-100 cursor-pointer">
                <i className="ri-arrow-left-line text-base"></i>
              </button>
              <h2 className="text-lg font-bold text-gray-900">Answer Review</h2>
            </div>
            <div className="space-y-4">
              {questions.map((q, qi) => {
                const userAns = answers[qi];
                const isCorrect = userAns === q.correct;
                return (
                  <div key={q.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0 text-sm font-bold ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {qi + 1}
                      </div>
                      <p className="text-sm font-medium text-gray-900 leading-relaxed">{q.text}</p>
                    </div>
                    <div className="space-y-2 ml-10">
                      {q.choices.map((choice, ci) => {
                        const isCorrectChoice = ci === q.correct;
                        const isUserChoice = ci === userAns;
                        let cls = 'border-gray-100 text-gray-600';
                        if (isCorrectChoice) cls = 'border-green-300 bg-green-50 text-green-700';
                        else if (isUserChoice && !isCorrect) cls = 'border-red-300 bg-red-50 text-red-600';
                        return (
                          <div key={ci} className={`flex items-center gap-3 p-3 rounded-xl border-2 ${cls}`}>
                            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-xs font-bold flex-shrink-0 border border-current">
                              {['A', 'B', 'C', 'D'][ci]}
                            </div>
                            <span className="text-sm flex-1">{choice}</span>
                            {isCorrectChoice && <i className="ri-check-line text-green-500 text-sm"></i>}
                            {isUserChoice && !isCorrect && <i className="ri-close-line text-red-500 text-sm"></i>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${passed ? 'bg-green-100' : 'bg-red-100'}`}>
            <i className={`${passed ? 'ri-trophy-line text-green-500' : 'ri-close-circle-line text-red-500'} text-4xl`}></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Quiz Completed!</h2>
          <p className="text-gray-500 text-sm mb-6">{quiz.title}</p>

          <div className={`text-6xl font-bold mb-2 ${passed ? 'text-green-500' : 'text-red-500'}`}>{pct}%</div>
          <p className="text-gray-500 mb-2">{score} / {questions.length} correct</p>
          <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${passed ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {passed ? 'Passed' : 'Failed'}
          </span>

          <div className="grid grid-cols-3 gap-3 mt-8 mb-8">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-lg font-bold text-green-600">{score}</p>
              <p className="text-xs text-gray-500">Correct</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-lg font-bold text-red-500">{questions.length - score}</p>
              <p className="text-xs text-gray-500">Wrong</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-lg font-bold text-gray-500">{answers.filter(a => a === null).length}</p>
              <p className="text-xs text-gray-500">Skipped</p>
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={() => setShowReview(true)}
              className="w-full py-3 border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl font-medium transition-all cursor-pointer">
              Review Answers
            </button>
            <Link href="/student/my-quizzes"
              className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all cursor-pointer">
              Back to Quizzes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      <div className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center px-6 z-20 gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{quiz.title}</p>
          <p className="text-xs text-gray-400">Question {current + 1} of {questions.length}</p>
        </div>
        <div className={`text-xl font-bold tabular-nums ${timeColor} flex items-center gap-1.5 flex-shrink-0`} suppressHydrationWarning={true}>
          <i className="ri-time-line text-lg"></i>
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </div>
        <button onClick={() => setShowConfirm(true)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${answered === questions.length ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
          Submit
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center pt-16 pb-24 px-4">
        <div className="w-full max-w-2xl">
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
              <span>{answered} of {questions.length} answered</span>
              <span>{Math.round((answered / questions.length) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: `${(answered / questions.length) * 100}%` }} />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-600 rounded-full">Question {current + 1}</span>
              {answers[current] !== null && (
                <span className="text-xs text-green-600 flex items-center gap-1">
                  <i className="ri-check-line text-xs"></i>
                  Answered
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-8 leading-relaxed">{q.text}</h2>
            <div className="space-y-3">
              {q.choices.map((choice, i) => {
                const selected = answers[current] === i;
                return (
                  <button key={i}
                    onClick={() => setAnswers(a => { const n = [...a]; n[current] = i; return n; })}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${selected ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-200 hover:bg-blue-50/50'}`}>
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold flex-shrink-0 transition-all ${selected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                      {['A', 'B', 'C', 'D'][i]}
                    </div>
                    <span className={`text-sm font-medium flex-1 ${selected ? 'text-blue-700' : 'text-gray-700'}`}>{choice}</span>
                    {selected && <i className="ri-check-line text-blue-500 text-base"></i>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-md border-t border-gray-100 flex items-center px-6 gap-4 z-20">
        <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer whitespace-nowrap">
          <i className="ri-arrow-left-line text-sm"></i>
          Prev
        </button>
        <div className="flex-1 flex items-center justify-center gap-1.5 overflow-x-auto">
          {questions.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`flex-shrink-0 transition-all cursor-pointer rounded-full ${i === current ? 'w-6 h-3 bg-blue-600' : answers[i] !== null ? 'w-3 h-3 bg-blue-400' : 'w-3 h-3 bg-gray-200 hover:bg-gray-300'}`} />
          ))}
        </div>
        <button onClick={() => current < questions.length - 1 ? setCurrent(c => c + 1) : setShowConfirm(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all cursor-pointer whitespace-nowrap">
          {current < questions.length - 1 ? 'Next' : 'Finish'}
          <i className="ri-arrow-right-line text-sm"></i>
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowConfirm(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center z-10">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-100 mx-auto mb-4">
              <i className="ri-alert-line text-orange-500 text-2xl"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Submit Quiz?</h3>
            <p className="text-sm text-gray-500 mb-6">
              {questions.length - answered > 0 ? `You have ${questions.length - answered} unanswered question(s). Submit anyway?` : 'Are you sure you want to submit your quiz?'}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all cursor-pointer whitespace-nowrap">Go Back</button>
              <button onClick={handleSubmit} className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all cursor-pointer whitespace-nowrap">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
