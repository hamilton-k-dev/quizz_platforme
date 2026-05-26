'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// ---------------------------------------------------------------------------
// Scroll-reveal hook
// ---------------------------------------------------------------------------
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('in-view'); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ---------------------------------------------------------------------------
// Animated counter
// ---------------------------------------------------------------------------
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const duration = 1800;
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(eased * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ---------------------------------------------------------------------------
// Mock screens
// ---------------------------------------------------------------------------

function BrowserChrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-200/80 bg-white">
      <div className="bg-gray-100 px-4 py-2.5 flex items-center gap-2.5 border-b border-gray-200">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 mx-2 bg-white rounded-md px-3 py-1 text-xs text-gray-400 flex items-center gap-1.5 border border-gray-200">
          <i className="ri-lock-line text-gray-300 text-xs" />
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}

function DashboardMockup() {
  return (
    <BrowserChrome url="quizmaster.app/dashboard">
      <div className="bg-gray-50 flex" style={{ height: 340 }}>
        {/* Sidebar */}
        <div className="w-14 bg-white border-r border-gray-100 flex flex-col items-center py-4 gap-3 flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <i className="ri-brain-line text-white text-xs" />
          </div>
          <div className="mt-2 flex flex-col gap-2">
            {['ri-dashboard-line', 'ri-file-list-3-line', 'ri-question-line', 'ri-group-line', 'ri-pie-chart-line'].map((icon, i) => (
              <div key={i} className={`w-7 h-7 flex items-center justify-center rounded-lg ${i === 0 ? 'bg-blue-50 text-blue-600' : 'text-gray-300'}`}>
                <i className={`${icon} text-sm`} />
              </div>
            ))}
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 p-4 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-bold text-gray-900">Dashboard</p>
              <p className="text-[10px] text-gray-400">Welcome back, Admin</p>
            </div>
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-[9px] text-white font-bold">A</span>
            </div>
          </div>
          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {[
              { v: '48', l: 'Quizzes', c: 'bg-blue-50 text-blue-600', i: 'ri-file-list-3-line' },
              { v: '1.2k', l: 'Students', c: 'bg-purple-50 text-purple-600', i: 'ri-group-line' },
              { v: '5.6k', l: 'Attempts', c: 'bg-green-50 text-green-600', i: 'ri-edit-line' },
              { v: '74%', l: 'Avg Score', c: 'bg-orange-50 text-orange-600', i: 'ri-bar-chart-line' },
            ].map(s => (
              <div key={s.l} className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
                <div className={`w-5 h-5 rounded-md ${s.c} flex items-center justify-center mb-1.5`}>
                  <i className={`${s.i} text-xs`} />
                </div>
                <p className="text-xs font-bold text-gray-900">{s.v}</p>
                <p className="text-[9px] text-gray-400">{s.l}</p>
              </div>
            ))}
          </div>
          {/* Charts row */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="bg-white rounded-lg p-2.5 border border-gray-100">
              <p className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Score Distribution</p>
              <div className="flex items-end gap-1" style={{ height: 52 }}>
                {[28, 58, 42, 76, 52, 88, 65].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm"
                    style={{ height: `${h}%`, background: `hsl(${220 + i * 5}, 70%, ${55 + i * 2}%)`, opacity: 0.85 }} />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <span key={i} className="text-[8px] text-gray-300 flex-1 text-center">{d}</span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg p-2.5 border border-gray-100">
              <p className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Attempts</p>
              <div className="flex items-end gap-1" style={{ height: 52 }}>
                {[40, 65, 55, 80, 70, 90, 75].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm bg-indigo-400" style={{ height: `${h}%`, opacity: 0.7 + i * 0.04 }} />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <span key={i} className="text-[8px] text-gray-300 flex-1 text-center">{d}</span>
                ))}
              </div>
            </div>
          </div>
          {/* Recent activity */}
          <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
            <div className="px-2.5 py-1.5 border-b border-gray-50">
              <p className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide">Recent Activity</p>
            </div>
            {[
              { name: 'Alice J.', quiz: 'Math Fundamentals', score: 92, color: 'bg-blue-500' },
              { name: 'Bob S.', quiz: 'Science 101', score: 68, color: 'bg-purple-500' },
              { name: 'Carlos R.', quiz: 'World History', score: 85, color: 'bg-green-500' },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 border-b border-gray-50 last:border-0">
                <div className={`w-4 h-4 rounded-full ${row.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-[7px] text-white font-bold">{row.name[0]}</span>
                </div>
                <span className="text-[9px] text-gray-600 flex-1 truncate">{row.name} · {row.quiz}</span>
                <span className={`text-[9px] font-bold ${row.score >= 70 ? 'text-green-600' : 'text-orange-500'}`}>{row.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

function QuizPlayerMockup() {
  const [selected, setSelected] = useState<number | null>(1);
  return (
    <BrowserChrome url="quizmaster.app/student/take-quiz/1">
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col" style={{ height: 280 }}>
        {/* Top bar */}
        <div className="bg-white/90 border-b border-gray-100 flex items-center px-4 py-2 gap-3">
          <div className="flex-1">
            <p className="text-[10px] font-semibold text-gray-900">Math Fundamentals</p>
            <p className="text-[9px] text-gray-400">Question 2 of 5</p>
          </div>
          <div className="text-xs font-bold text-blue-600 flex items-center gap-1">
            <i className="ri-time-line text-xs" />24:13
          </div>
          <div className="px-2.5 py-1 bg-blue-600 rounded-lg text-[9px] font-medium text-white">Submit</div>
        </div>
        {/* Progress */}
        <div className="px-4 pt-3">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }} />
          </div>
        </div>
        {/* Question card */}
        <div className="flex-1 flex items-center justify-center px-4 py-2">
          <div className="bg-white rounded-2xl shadow-lg p-4 w-full">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-semibold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">Question 2</span>
              <span className="text-[9px] text-green-600 flex items-center gap-1"><i className="ri-check-line text-[9px]" />Answered</span>
            </div>
            <p className="text-[11px] font-semibold text-gray-900 mb-3">What is 15% of 200?</p>
            <div className="space-y-1.5">
              {['25', '30', '35', '20'].map((opt, i) => (
                <div key={i}
                  onClick={() => setSelected(i)}
                  className={`flex items-center gap-2 p-2 rounded-lg border-2 cursor-pointer transition-all ${selected === i ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 ${selected === i ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {['A','B','C','D'][i]}
                  </div>
                  <span className={`text-[10px] font-medium ${selected === i ? 'text-blue-700' : 'text-gray-700'}`}>{opt}</span>
                  {selected === i && <i className="ri-check-line text-blue-500 text-xs ml-auto" />}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Bottom nav */}
        <div className="bg-white/90 border-t border-gray-100 flex items-center justify-between px-4 py-2">
          <div className="text-[9px] text-gray-400 px-3 py-1 border border-gray-200 rounded-lg">← Prev</div>
          <div className="flex gap-1">
            {[0,1,2,3,4].map(i => (
              <div key={i} className={`rounded-full ${i === 1 ? 'w-4 h-2.5 bg-blue-600' : i < 2 ? 'w-2.5 h-2.5 bg-blue-400' : 'w-2.5 h-2.5 bg-gray-200'}`} />
            ))}
          </div>
          <div className="text-[9px] text-white bg-blue-600 px-3 py-1 rounded-lg">Next →</div>
        </div>
      </div>
    </BrowserChrome>
  );
}

function LeaderboardMockup() {
  return (
    <BrowserChrome url="quizmaster.app/student/leaderboard">
      <div className="bg-gray-50 p-4" style={{ height: 280 }}>
        <p className="text-[10px] font-bold text-gray-900 mb-1">Leaderboard</p>
        <p className="text-[9px] text-gray-400 mb-3">See how you rank among your peers</p>
        {/* Podium */}
        <div className="flex items-end justify-center gap-3 mb-4" style={{ height: 80 }}>
          {[
            { name: 'Priya S.', score: 93, h: 56, badge: 'bg-gray-400', rank: 2 },
            { name: 'James C.', score: 96, h: 72, badge: 'bg-amber-400', rank: 1 },
            { name: 'Lucas M.', score: 91, h: 48, badge: 'bg-orange-600', rank: 3 },
          ].map((p, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="relative">
                <div className={`w-7 h-7 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-[9px] font-bold ${['from-violet-500 to-pink-500','from-blue-500 to-indigo-600','from-green-500 to-teal-600'][i]}`}>
                  {p.name[0]}
                </div>
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${p.badge} flex items-center justify-center`}>
                  <i className="ri-trophy-fill text-white" style={{ fontSize: 6 }} />
                </div>
              </div>
              <p className="text-[8px] font-semibold text-gray-700">{p.score}%</p>
              <div className={`w-10 rounded-t-lg flex items-end justify-center pb-1 ${['bg-gradient-to-b from-gray-300 to-gray-400','bg-gradient-to-b from-amber-400 to-amber-500','bg-gradient-to-b from-orange-400 to-orange-500'][i]}`}
                style={{ height: p.h }}>
                <span className="text-white font-bold text-[9px]">#{p.rank}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Ranked list */}
        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
          {[
            { rank: 4, name: 'Sarah Kim', score: 88, me: true },
            { rank: 5, name: 'Aisha O.', score: 85, me: false },
            { rank: 6, name: 'Tom N.', score: 82, me: false },
          ].map((e, i) => (
            <div key={i} className={`flex items-center gap-2 px-2.5 py-1.5 border-b border-gray-50 last:border-0 ${e.me ? 'bg-blue-50' : ''}`}>
              <span className="text-[8px] font-bold text-gray-400 w-4">#{e.rank}</span>
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <span className="text-[7px] text-white font-bold">{e.name[0]}</span>
              </div>
              <span className={`text-[9px] font-medium flex-1 ${e.me ? 'text-blue-700' : 'text-gray-700'}`}>{e.name}{e.me ? ' (You)' : ''}</span>
              <div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${e.score}%` }} />
              </div>
              <span className="text-[9px] font-bold text-gray-700">{e.score}%</span>
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}

// ---------------------------------------------------------------------------
// Feature marquee strip
// ---------------------------------------------------------------------------
const marqueeItems = [
  { icon: 'ri-file-list-3-line', label: 'Quiz Builder' },
  { icon: 'ri-timer-line', label: 'Timed Exams' },
  { icon: 'ri-bar-chart-line', label: 'Analytics' },
  { icon: 'ri-trophy-line', label: 'Leaderboards' },
  { icon: 'ri-shield-keyhole-line', label: 'Secure Auth' },
  { icon: 'ri-group-line', label: 'Student Mgmt' },
  { icon: 'ri-pie-chart-line', label: 'Score Insights' },
  { icon: 'ri-question-line', label: 'Question Bank' },
  { icon: 'ri-mail-send-line', label: 'Email Reset' },
  { icon: 'ri-device-line', label: 'Responsive' },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function LandingPage() {
  // Reveal refs for each scroll section
  const statsRef     = useReveal();
  const featuresRef  = useReveal();
  const screensRef   = useReveal();
  const howRef       = useReveal();
  const ctaRef       = useReveal();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <i className="ri-brain-line text-white text-base" />
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">QuizMaster</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-500">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#screenshots" className="hover:text-gray-900 transition-colors">Screenshots</a>
            <a href="#how" className="hover:text-gray-900 transition-colors">How it works</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Sign in
            </Link>
            <Link href="/register"
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all shadow-sm shadow-blue-200">
              Get started
              <i className="ri-arrow-right-line text-sm" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden">
        {/* Animated gradient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <div className="animate-blob absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-blue-100 opacity-40 blur-3xl" />
          <div className="animate-blob absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-indigo-100 opacity-40 blur-3xl" style={{ animationDelay: '2s' }} />
          <div className="animate-blob absolute bottom-0 left-1/2 w-[400px] h-[400px] rounded-full bg-violet-100 opacity-30 blur-3xl" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left copy */}
            <div className="flex-1 text-center lg:text-left" style={{ animation: 'fadeUp 0.8s ease forwards' }}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse-soft" />
                Open-source quiz platform
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                The modern way to{' '}
                <span className="relative">
                  <span className="text-transparent bg-clip-text"
                    style={{ backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)', backgroundSize: '200% auto', animation: 'shimmer 4s linear infinite' }}>
                    create & manage
                  </span>
                  {/* Underline decoration */}
                  <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 300 6" fill="none" aria-hidden>
                    <path d="M0 3 Q75 0 150 3 Q225 6 300 3" stroke="url(#grad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <defs>
                      <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <br />quizzes
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                Build engaging quizzes, track student performance in real time, and gain deep insights —
                all from a single, beautifully designed platform.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                <Link href="/register"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-200 text-sm">
                  <i className="ri-rocket-line" />Start for free
                </Link>
                <Link href="/student"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 font-semibold rounded-xl transition-all text-sm">
                  <i className="ri-play-circle-line text-blue-500" />Student demo
                </Link>
              </div>

              {/* Mini social proof */}
              <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {['bg-blue-500','bg-purple-500','bg-green-500','bg-orange-500','bg-pink-500'].map((c,i) => (
                    <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-white flex items-center justify-center`}>
                      <span className="text-[8px] text-white font-bold">{['A','B','C','D','E'][i]}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500"><span className="font-semibold text-gray-800">1,284+</span> students already enrolled</p>
              </div>
            </div>

            {/* Right — floating dashboard mockup */}
            <div className="flex-1 w-full max-w-2xl lg:max-w-none relative" style={{ animation: 'fadeUp 0.8s ease 0.25s forwards', opacity: 0 }}>
              {/* Glow backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 blur-3xl rounded-3xl" />
              {/* Floating main card */}
              <div className="relative animate-float" style={{ transformOrigin: 'center bottom' }}>
                <DashboardMockup />
              </div>
              {/* Floating badge — correct answer */}
              <div className="absolute -left-6 bottom-20 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-3 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                  <i className="ri-checkbox-circle-line text-green-600 text-lg" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Quiz Submitted!</p>
                  <p className="text-xs text-green-600 font-semibold">Score: 92% · Passed</p>
                </div>
              </div>
              {/* Floating badge — new student */}
              <div className="absolute -right-4 top-10 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-3 animate-float-slow" style={{ animationDelay: '1.5s' }}>
                <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
                  <i className="ri-user-add-line text-purple-600 text-lg" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">New student</p>
                  <p className="text-xs text-gray-500">Laura M. enrolled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee strip ───────────────────────────────────────────────── */}
      <div className="border-y border-gray-100 bg-gray-50 py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="inline-flex items-center gap-2 px-6 text-gray-500 text-sm font-medium">
              <i className={`${item.icon} text-blue-500`} />
              {item.label}
              <span className="ml-4 text-gray-300">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div ref={statsRef} className="reveal max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 48, suffix: '+', label: 'Quizzes created', icon: 'ri-file-list-3-line', color: 'text-blue-600 bg-blue-50' },
            { value: 1284, suffix: '+', label: 'Active students', icon: 'ri-group-line', color: 'text-purple-600 bg-purple-50' },
            { value: 5632, suffix: '+', label: 'Quiz attempts', icon: 'ri-edit-line', color: 'text-green-600 bg-green-50' },
            { value: 74, suffix: '%', label: 'Average score', icon: 'ri-bar-chart-line', color: 'text-orange-600 bg-orange-50' },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-2xl ${s.color} flex items-center justify-center mb-1`}>
                <i className={`${s.icon} text-xl`} />
              </div>
              <p className="text-4xl font-bold text-gray-900 tabular-nums">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────── */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div ref={featuresRef} className="reveal text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Features</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4">Everything you need to run quizzes</h2>
            <p className="text-gray-500 max-w-xl mx-auto">From building questions to analysing results — QuizMaster handles the whole lifecycle.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'ri-file-list-3-line', title: 'Quiz Builder', desc: 'Create quizzes with MCQ questions, set time limits, and publish or save as draft.', color: 'bg-blue-50 text-blue-600', delay: 0 },
              { icon: 'ri-question-line', title: 'Question Bank', desc: 'Manage a reusable bank of questions tagged by subject and difficulty (easy/medium/hard).', color: 'bg-indigo-50 text-indigo-600', delay: 100 },
              { icon: 'ri-timer-line', title: 'Timed Quiz Player', desc: 'Students see a live countdown, navigate freely between questions, and get instant results.', color: 'bg-violet-50 text-violet-600', delay: 200 },
              { icon: 'ri-bar-chart-line', title: 'Rich Analytics', desc: 'Charts for score distribution, pass/fail rates, per-quiz averages, and score trends.', color: 'bg-green-50 text-green-600', delay: 300 },
              { icon: 'ri-trophy-line', title: 'Leaderboard', desc: 'A motivating podium view for the top 3 students with a ranked list for everyone else.', color: 'bg-amber-50 text-amber-600', delay: 400 },
              { icon: 'ri-shield-keyhole-line', title: 'Secure Auth', desc: 'Email + password sign-in with scrypt hashing, session cookies, and password-reset via email.', color: 'bg-rose-50 text-rose-600', delay: 500 },
            ].map(f => (
              <div key={f.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                style={{ animation: `fadeUp 0.6s ease ${f.delay}ms both` }}>
                <div className={`w-11 h-11 rounded-2xl ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <i className={`${f.icon} text-xl`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── App Screenshots ─────────────────────────────────────────────── */}
      <section id="screenshots" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div ref={screensRef} className="reveal text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Screenshots</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4">See it in action</h2>
            <p className="text-gray-500 max-w-lg mx-auto">A clean, focused UI for admins and students alike.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left screen — quiz player */}
            <div className="reveal-left lg:mt-12" ref={useReveal()}>
              <div className="mb-3">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  <i className="ri-play-circle-line mr-1" />Student · Quiz Player
                </span>
              </div>
              <QuizPlayerMockup />
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                Interactive quiz player with countdown timer, free navigation between questions, and instant score on submit.
              </p>
            </div>
            {/* Center screen — dashboard (elevated) */}
            <div className="reveal" ref={useReveal()}>
              <div className="mb-3">
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  <i className="ri-dashboard-line mr-1" />Admin · Dashboard
                </span>
              </div>
              <DashboardMockup />
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                Full admin dashboard with stat cards, score distribution charts, and a live activity feed.
              </p>
            </div>
            {/* Right screen — leaderboard */}
            <div className="reveal-right lg:mt-12" ref={useReveal()}>
              <div className="mb-3">
                <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-3 py-1 rounded-full">
                  <i className="ri-trophy-line mr-1" />Student · Leaderboard
                </span>
              </div>
              <LeaderboardMockup />
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                Motivating leaderboard with podium for the top 3 and a ranked list with score progress bars.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <section id="how" className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div ref={howRef} className="reveal text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">How it works</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4">Up and running in minutes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-violet-200" />
            {[
              { step: '01', icon: 'ri-user-add-line', title: 'Create an account', desc: 'Register with your email, set a password, and access the admin dashboard instantly.', color: 'from-blue-500 to-indigo-500', delay: 0 },
              { step: '02', icon: 'ri-file-list-3-line', title: 'Build your quiz', desc: 'Add questions to the question bank, then assemble them into timed, publishable quizzes.', color: 'from-indigo-500 to-violet-500', delay: 150 },
              { step: '03', icon: 'ri-graduation-cap-line', title: 'Share with students', desc: 'Students sign in, take quizzes, view their results, and compete on the leaderboard.', color: 'from-violet-500 to-purple-500', delay: 300 },
            ].map(s => (
              <div key={s.step} className="flex flex-col items-center text-center group"
                style={{ animation: `fadeUp 0.65s ease ${s.delay}ms both` }}>
                <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <i className={`${s.icon} text-white text-2xl`} />
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center">
                    <span className="text-[9px] font-black text-gray-600">{s.step}</span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div ref={ctaRef} className="reveal max-w-4xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-12 text-center shadow-2xl shadow-blue-200">
          {/* Decorative blobs inside banner */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
            <div className="animate-blob absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
            <div className="animate-blob absolute -bottom-12 -right-12 w-56 h-56 rounded-full bg-white/10 blur-2xl" style={{ animationDelay: '3s' }} />
          </div>
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
              <i className="ri-brain-line text-white text-3xl" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-blue-100 max-w-md mx-auto mb-8 leading-relaxed">
              Create your free account today and start building quizzes in under 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/register"
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg text-sm">
                <i className="ri-rocket-line" />Create free account
              </Link>
              <Link href="/login"
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/20 text-sm">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <i className="ri-brain-line text-white text-sm" />
            </div>
            <span className="font-bold text-gray-900">QuizMaster</span>
          </div>
          <p className="text-sm text-gray-400 text-center">
            Built with Next.js 16 · better-auth · Prisma 7 · Neon · Tailwind CSS
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Link href="/login" className="hover:text-gray-900 transition-colors">Sign in</Link>
            <Link href="/register" className="hover:text-gray-900 transition-colors">Register</Link>
            <Link href="/docs" className="hover:text-gray-900 transition-colors">Docs</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
