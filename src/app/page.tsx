'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  AnimatePresence,
  stagger,
  useAnimate,
} from 'framer-motion';

// ---------------------------------------------------------------------------
// Animated counter
// ---------------------------------------------------------------------------
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1800;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ---------------------------------------------------------------------------
// Shared variants
// ---------------------------------------------------------------------------
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const staggerContainer = (delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: delay } },
});

// ---------------------------------------------------------------------------
// Browser chrome wrapper
// ---------------------------------------------------------------------------
function BrowserChrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200/60 bg-white ring-1 ring-black/5">
      <div className="bg-[#f0f0f0] px-4 py-2.5 flex items-center gap-3 border-b border-gray-200/80">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 mx-2 bg-white/80 rounded-lg px-3 py-1 text-[11px] text-gray-400 flex items-center gap-1.5 border border-gray-200/60">
          <i className="ri-lock-line text-gray-300" />
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mockups
// ---------------------------------------------------------------------------
function DashboardMockup() {
  return (
    <BrowserChrome url="quizmaster.app/dashboard">
      <div className="bg-[#f8f9fb] flex" style={{ height: 360 }}>
        <div className="w-14 bg-white border-r border-gray-100 flex flex-col items-center py-4 gap-3 flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <i className="ri-brain-line text-white text-xs" />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {['ri-dashboard-line','ri-file-list-3-line','ri-question-line','ri-group-line','ri-pie-chart-line'].map((icon, i) => (
              <div key={i} className={`w-7 h-7 flex items-center justify-center rounded-lg ${i===0?'bg-blue-50 text-blue-600':'text-gray-300'}`}>
                <i className={`${icon} text-sm`} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 p-5 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-bold text-gray-900">Dashboard</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Welcome back, Admin</p>
            </div>
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-[9px] text-white font-bold">A</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { v:'48',   l:'Quizzes',  c:'text-blue-600 bg-blue-50',   i:'ri-file-list-3-line' },
              { v:'1.2k', l:'Students', c:'text-purple-600 bg-purple-50', i:'ri-group-line' },
              { v:'5.6k', l:'Attempts', c:'text-green-600 bg-green-50',   i:'ri-edit-line' },
              { v:'74%',  l:'Avg Score',c:'text-orange-600 bg-orange-50', i:'ri-bar-chart-line' },
            ].map(s => (
              <div key={s.l} className="bg-white rounded-xl p-2.5 border border-gray-100 shadow-sm">
                <div className={`w-6 h-6 rounded-lg ${s.c} flex items-center justify-center mb-2`}>
                  <i className={`${s.i} text-xs`} />
                </div>
                <p className="text-[11px] font-bold text-gray-900">{s.v}</p>
                <p className="text-[9px] text-gray-400 mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-white rounded-xl p-3 border border-gray-100">
              <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Score Dist.</p>
              <div className="flex items-end gap-1" style={{ height: 56 }}>
                {[28,58,42,76,52,88,65].map((h,i) => (
                  <div key={i} className="flex-1 rounded-t-sm" style={{ height:`${h}%`, background:`hsl(${220+i*6},70%,${58+i}%)`, opacity:0.85 }} />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                {['M','T','W','T','F','S','S'].map((d,i)=>(
                  <span key={i} className="text-[8px] text-gray-300 flex-1 text-center">{d}</span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-100">
              <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Attempts</p>
              <div className="flex items-end gap-1" style={{ height: 56 }}>
                {[40,65,55,80,70,90,75].map((h,i)=>(
                  <div key={i} className="flex-1 rounded-t-sm bg-indigo-400" style={{ height:`${h}%`, opacity:0.6+i*0.06 }} />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                {['M','T','W','T','F','S','S'].map((d,i)=>(
                  <span key={i} className="text-[8px] text-gray-300 flex-1 text-center">{d}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-3 py-2 border-b border-gray-50">
              <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">Recent Activity</p>
            </div>
            {[
              { name:'Alice J.',  quiz:'Math Fundamentals', score:92, c:'bg-blue-500' },
              { name:'Bob S.',    quiz:'Science 101',        score:68, c:'bg-purple-500' },
              { name:'Carlos R.', quiz:'World History',      score:85, c:'bg-green-500' },
            ].map((row,i)=>(
              <div key={i} className="flex items-center gap-2 px-3 py-2 border-b border-gray-50 last:border-0">
                <div className={`w-4 h-4 rounded-full ${row.c} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-[7px] text-white font-bold">{row.name[0]}</span>
                </div>
                <span className="text-[9px] text-gray-600 flex-1 truncate">{row.name} · {row.quiz}</span>
                <span className={`text-[9px] font-bold ${row.score>=70?'text-green-600':'text-orange-500'}`}>{row.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

function QuizPlayerMockup() {
  const [selected, setSelected] = useState<number|null>(1);
  return (
    <BrowserChrome url="quizmaster.app/student/take-quiz/1">
      <div className="bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/60 flex flex-col" style={{ height: 300 }}>
        <div className="bg-white/90 backdrop-blur-sm border-b border-gray-100 flex items-center px-4 py-2.5 gap-3">
          <div className="flex-1">
            <p className="text-[10px] font-semibold text-gray-900">Math Fundamentals</p>
            <p className="text-[9px] text-gray-400 mt-0.5">Question 2 of 5</p>
          </div>
          <div className="text-xs font-bold text-blue-600 flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg">
            <i className="ri-time-line text-[10px]" />24:13
          </div>
        </div>
        <div className="px-4 pt-3">
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width:'40%' }} />
          </div>
        </div>
        <div className="flex-1 flex items-center px-4 py-3">
          <div className="bg-white rounded-2xl shadow-lg shadow-blue-100/50 p-4 w-full border border-gray-100/80">
            <p className="text-[11px] font-semibold text-gray-900 mb-3">What is 15% of 200?</p>
            <div className="space-y-1.5">
              {['25','30','35','20'].map((opt,i)=>(
                <div key={i} onClick={()=>setSelected(i)}
                  className={`flex items-center gap-2.5 p-2 rounded-xl border cursor-pointer transition-all ${selected===i?'border-blue-400 bg-blue-50 shadow-sm shadow-blue-100':'border-gray-100 hover:border-gray-200'}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 transition-colors ${selected===i?'bg-blue-600 text-white':'bg-gray-100 text-gray-400'}`}>
                    {['A','B','C','D'][i]}
                  </div>
                  <span className={`text-[10px] font-medium ${selected===i?'text-blue-700':'text-gray-600'}`}>{opt}</span>
                  {selected===i && <i className="ri-check-line text-blue-500 text-xs ml-auto" />}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white/90 border-t border-gray-100 flex items-center justify-between px-4 py-2.5">
          <div className="text-[9px] text-gray-400 px-3 py-1.5 border border-gray-200 rounded-lg">← Prev</div>
          <div className="flex gap-1.5">
            {[0,1,2,3,4].map(i=>(
              <div key={i} className={`rounded-full transition-all ${i===1?'w-5 h-2 bg-blue-600':i<2?'w-2 h-2 bg-blue-300':'w-2 h-2 bg-gray-200'}`} />
            ))}
          </div>
          <div className="text-[9px] text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 rounded-lg shadow-sm shadow-blue-200">Next →</div>
        </div>
      </div>
    </BrowserChrome>
  );
}

function LeaderboardMockup() {
  return (
    <BrowserChrome url="quizmaster.app/student/leaderboard">
      <div className="bg-[#f8f9fb] p-4" style={{ height: 300 }}>
        <p className="text-[10px] font-bold text-gray-900">Leaderboard</p>
        <p className="text-[9px] text-gray-400 mt-0.5 mb-3">Top performers this week</p>
        <div className="flex items-end justify-center gap-4 mb-4" style={{ height:88 }}>
          {[
            { name:'Priya S.', score:93, h:56, badge:'bg-slate-400',  from:'from-violet-500 to-pink-500',  rank:2 },
            { name:'James C.', score:96, h:72, badge:'bg-amber-400',  from:'from-blue-500 to-indigo-600',  rank:1 },
            { name:'Lucas M.', score:91, h:44, badge:'bg-orange-500', from:'from-green-500 to-teal-600',   rank:3 },
          ].map((p,i)=>(
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="relative">
                <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${p.from} flex items-center justify-center text-white text-[9px] font-bold shadow`}>
                  {p.name[0]}
                </div>
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${p.badge} flex items-center justify-center`}>
                  <i className="ri-trophy-fill text-white" style={{ fontSize:5.5 }} />
                </div>
              </div>
              <p className="text-[8px] font-bold text-gray-700">{p.score}%</p>
              <div className={`w-10 rounded-t-xl flex items-end justify-center pb-1 ${['bg-gradient-to-b from-slate-300 to-slate-400','bg-gradient-to-b from-amber-400 to-amber-500','bg-gradient-to-b from-orange-400 to-orange-500'][i]}`}
                style={{ height:p.h }}>
                <span className="text-white font-black text-[8px]">#{p.rank}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
          {[
            { rank:4, name:'Sarah Kim', score:88, me:true },
            { rank:5, name:'Aisha O.',  score:85, me:false },
            { rank:6, name:'Tom N.',    score:82, me:false },
          ].map((e,i)=>(
            <div key={i} className={`flex items-center gap-2 px-3 py-2 border-b border-gray-50 last:border-0 ${e.me?'bg-blue-50':''}`}>
              <span className="text-[8px] font-bold text-gray-300 w-5">#{e.rank}</span>
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <span className="text-[7px] text-white font-bold">{e.name[0]}</span>
              </div>
              <span className={`text-[9px] font-medium flex-1 ${e.me?'text-blue-700':'text-gray-600'}`}>{e.name}{e.me?' (You)':''}</span>
              <div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full" style={{ width:`${e.score}%` }} />
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
// Marquee
// ---------------------------------------------------------------------------
const marqueeItems = [
  { icon:'ri-file-list-3-line', label:'Quiz Builder' },
  { icon:'ri-timer-line',        label:'Timed Exams' },
  { icon:'ri-bar-chart-line',    label:'Analytics' },
  { icon:'ri-trophy-line',       label:'Leaderboards' },
  { icon:'ri-shield-keyhole-line',label:'Secure Auth' },
  { icon:'ri-group-line',        label:'Student Mgmt' },
  { icon:'ri-pie-chart-line',    label:'Score Insights' },
  { icon:'ri-question-line',     label:'Question Bank' },
  { icon:'ri-mail-send-line',    label:'Email Reset' },
  { icon:'ri-device-line',       label:'Responsive' },
];

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm shadow-black/5 border-b border-gray-100' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200">
            <i className="ri-brain-line text-white text-sm" />
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight">QuizMaster</span>
        </div>
        <nav className="hidden md:flex items-center gap-7 text-sm text-gray-500">
          {['Features', 'Screenshots', 'How it works'].map((label) => (
            <a key={label} href={`#${label.toLowerCase().replace(/ /g, '-')}`}
              className="hover:text-gray-900 transition-colors font-medium relative group">
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-600 rounded-full transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">Sign in</Link>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/register"
              className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-gray-900/20">
              Get started <i className="ri-arrow-right-line text-xs" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function LandingPage() {
  const heroRef    = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY      = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background mesh */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.12),transparent)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-300/40 to-transparent" />
          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          {/* Floating orbs */}
          <motion.div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
            style={{ background:'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)' }}
            animate={{ scale:[1,1.1,1], rotate:[0,10,0] }}
            transition={{ duration:14, repeat:Infinity, ease:'easeInOut' }} />
          <motion.div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full"
            style={{ background:'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)' }}
            animate={{ scale:[1,1.08,1], rotate:[0,-8,0] }}
            transition={{ duration:18, repeat:Infinity, ease:'easeInOut' }} />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative w-full max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

            {/* Left copy */}
            <motion.div className="flex-1 text-center lg:text-left"
              variants={staggerContainer(0.1)} initial="hidden" animate="show">
              <motion.div variants={fadeUp}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-semibold mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                Open-source quiz platform
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-5xl lg:text-[3.75rem] font-bold text-gray-950 leading-[1.1] tracking-tight mb-6">
                The modern way
                <br />
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                    to run quizzes
                  </span>
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-gray-500 leading-relaxed mb-9 max-w-[440px] mx-auto lg:mx-0">
                Build engaging quizzes, track student performance in real time, and
                gain deep insights — all in one beautifully designed platform.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/register"
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors shadow-xl shadow-gray-900/20 text-sm">
                    <i className="ri-rocket-line" /> Start for free
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/student"
                    className="flex items-center justify-center gap-2 px-6 py-3.5 border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all text-sm shadow-sm">
                    <i className="ri-play-circle-line text-blue-600" /> Student demo
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-4 mt-9 justify-center lg:justify-start">
                <div className="flex -space-x-2.5">
                  {['bg-blue-500','bg-violet-500','bg-emerald-500','bg-orange-500','bg-pink-500'].map((c,i) => (
                    <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white flex items-center justify-center shadow-sm`}>
                      <span className="text-[9px] text-white font-bold">{['A','B','C','D','E'][i]}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500"><span className="font-semibold text-gray-800">1,284+</span> students enrolled</p>
              </motion.div>
            </motion.div>

            {/* Right — floating mockup */}
            <motion.div className="flex-1 w-full max-w-2xl relative"
              initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:0.8, delay:0.3, ease:EASE }}>

              {/* Glow */}
              <div className="absolute -inset-8 bg-gradient-to-br from-blue-400/10 via-indigo-400/10 to-violet-400/10 blur-3xl rounded-3xl" />

              <motion.div
                animate={{ y:[0,-10,0] }}
                transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
                className="relative">
                <DashboardMockup />
              </motion.div>

              {/* Badge — score */}
              <motion.div
                initial={{ opacity:0, x:-24, y:8 }} animate={{ opacity:1, x:0, y:0 }}
                transition={{ duration:0.6, delay:0.9 }}
                className="absolute -left-8 bottom-16 bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <i className="ri-checkbox-circle-fill text-emerald-500 text-xl" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Quiz Submitted!</p>
                  <p className="text-xs text-emerald-600 font-semibold mt-0.5">Score: 92% · Passed ✓</p>
                </div>
              </motion.div>

              {/* Badge — new student */}
              <motion.div
                initial={{ opacity:0, x:24, y:-8 }} animate={{ opacity:1, x:0, y:0 }}
                transition={{ duration:0.6, delay:1.1 }}
                className="absolute -right-6 top-8 bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0">
                  <i className="ri-user-add-line text-violet-500 text-xl" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">New student</p>
                  <p className="text-xs text-gray-400 mt-0.5">Laura M. enrolled</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          animate={{ y:[0,6,0] }} transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}>
          <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">Scroll</span>
          <i className="ri-arrow-down-line text-gray-300" />
        </motion.div>
      </section>

      {/* ── Marquee ─────────────────────────────────────────────────────── */}
      <div className="border-y border-gray-100 bg-gray-50/80 py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems,...marqueeItems].map((item,i)=>(
            <div key={i} className="inline-flex items-center gap-2 px-8 text-gray-400 text-sm font-medium">
              <i className={`${item.icon} text-indigo-400`} />
              {item.label}
              <span className="ml-6 text-gray-200">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={staggerContainer()} initial="hidden" whileInView="show" viewport={{ once:true, margin:'-80px' }}
            className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { value:48,   suffix:'+', label:'Quizzes created',  icon:'ri-file-list-3-line', color:'text-blue-600',   bg:'bg-blue-50' },
              { value:1284, suffix:'+', label:'Active students',  icon:'ri-group-line',        color:'text-violet-600', bg:'bg-violet-50' },
              { value:5632, suffix:'+', label:'Quiz attempts',    icon:'ri-edit-line',         color:'text-emerald-600',bg:'bg-emerald-50' },
              { value:74,   suffix:'%', label:'Average score',    icon:'ri-bar-chart-line',    color:'text-orange-600', bg:'bg-orange-50' },
            ].map(s=>(
              <motion.div key={s.label} variants={fadeUp} className="flex flex-col items-center gap-3">
                <div className={`w-14 h-14 rounded-2xl ${s.bg} ${s.color} flex items-center justify-center`}>
                  <i className={`${s.icon} text-2xl`} />
                </div>
                <p className="text-4xl font-bold text-gray-950 tabular-nums tracking-tight">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="text-sm text-gray-400 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6 bg-gray-50/60">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={staggerContainer()} initial="hidden" whileInView="show" viewport={{ once:true, margin:'-80px' }}
            className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-sm font-semibold text-indigo-600 tracking-widest uppercase mb-3">Features</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-gray-950 tracking-tight mb-5">
              Everything you need
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 max-w-md mx-auto text-lg">
              From building questions to analysing results — one platform, end to end.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.05)} initial="hidden" whileInView="show" viewport={{ once:true, margin:'-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon:'ri-file-list-3-line',   title:'Quiz Builder',    desc:'Create quizzes with MCQ questions, set time limits, and publish or keep as draft.', color:'text-blue-600',   bg:'bg-blue-50',   ring:'ring-blue-100' },
              { icon:'ri-question-line',       title:'Question Bank',   desc:'Manage a reusable bank tagged by subject and difficulty — easy, medium, or hard.',  color:'text-indigo-600', bg:'bg-indigo-50', ring:'ring-indigo-100' },
              { icon:'ri-timer-line',          title:'Timed Player',    desc:'Live countdown, free navigation between questions, and instant results on submit.',   color:'text-violet-600', bg:'bg-violet-50', ring:'ring-violet-100' },
              { icon:'ri-bar-chart-line',      title:'Rich Analytics',  desc:'Charts for score distribution, pass/fail rates, per-quiz averages, and trends.',     color:'text-emerald-600',bg:'bg-emerald-50',ring:'ring-emerald-100' },
              { icon:'ri-trophy-line',         title:'Leaderboard',     desc:'Motivating podium for the top 3 students with a ranked list for everyone else.',     color:'text-amber-600',  bg:'bg-amber-50',  ring:'ring-amber-100' },
              { icon:'ri-shield-keyhole-line', title:'Secure Auth',     desc:'Email + password with scrypt hashing, session cookies, and password-reset by email.', color:'text-rose-600',   bg:'bg-rose-50',   ring:'ring-rose-100' },
            ].map(f=>(
              <motion.div key={f.title} variants={fadeUp}
                whileHover={{ y:-4, boxShadow:'0 20px 40px -12px rgba(0,0,0,0.08)' }}
                className={`bg-white rounded-2xl p-7 ring-1 ${f.ring} transition-shadow duration-300 cursor-default`}>
                <div className={`w-12 h-12 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center mb-5`}>
                  <i className={`${f.icon} text-xl`} />
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Screenshots ─────────────────────────────────────────────────── */}
      <section id="screenshots" className="py-28 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={staggerContainer()} initial="hidden" whileInView="show" viewport={{ once:true, margin:'-80px' }}
            className="text-center mb-20">
            <motion.p variants={fadeUp} className="text-sm font-semibold text-indigo-600 tracking-widest uppercase mb-3">Screenshots</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-gray-950 tracking-tight mb-5">
              See it in action
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 max-w-md mx-auto text-lg">
              A clean, focused UI for both admins and students.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {[
              {
                label: 'Student · Quiz Player',
                labelColor: 'text-blue-600 bg-blue-50',
                mockup: <QuizPlayerMockup />,
                desc: 'Interactive quiz player with countdown timer and instant score on submit.',
                delay: 0, offset: 'lg:mt-14',
              },
              {
                label: 'Admin · Dashboard',
                labelColor: 'text-indigo-600 bg-indigo-50',
                mockup: <DashboardMockup />,
                desc: 'Full admin dashboard with stat cards, charts, and a live activity feed.',
                delay: 0.15, offset: '',
              },
              {
                label: 'Student · Leaderboard',
                labelColor: 'text-violet-600 bg-violet-50',
                mockup: <LeaderboardMockup />,
                desc: 'Motivating leaderboard with a podium for the top 3 and ranked list.',
                delay: 0.3, offset: 'lg:mt-14',
              },
            ].map((s, i) => (
              <motion.div key={i} className={s.offset}
                initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:'-60px' }}
                transition={{ duration:0.7, delay:s.delay, ease:EASE }}>
                <div className="mb-3">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${s.labelColor} px-3 py-1.5 rounded-full`}>
                    {s.label}
                  </span>
                </div>
                <motion.div whileHover={{ scale:1.01 }} transition={{ type:'spring', stiffness:300, damping:25 }}>
                  {s.mockup}
                </motion.div>
                <p className="text-sm text-gray-400 mt-4 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-28 px-6 bg-gray-50/60">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={staggerContainer()} initial="hidden" whileInView="show" viewport={{ once:true, margin:'-80px' }}
            className="text-center mb-20">
            <motion.p variants={fadeUp} className="text-sm font-semibold text-indigo-600 tracking-widest uppercase mb-3">How it works</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-gray-950 tracking-tight">
              Up and running in minutes
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.15)} initial="hidden" whileInView="show" viewport={{ once:true, margin:'-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector */}
            <div className="hidden md:block absolute top-10 left-[calc(33.33%-1rem)] right-[calc(33.33%-1rem)] h-px bg-gradient-to-r from-blue-200 via-indigo-200 to-violet-200" />

            {[
              { step:'01', icon:'ri-user-add-line',       title:'Create an account', desc:'Register with your email, set a password, and access the admin dashboard instantly.', from:'from-blue-500 to-indigo-600' },
              { step:'02', icon:'ri-file-list-3-line',     title:'Build your quiz',   desc:'Add questions to the bank, then assemble them into timed publishable quizzes.',       from:'from-indigo-500 to-violet-600' },
              { step:'03', icon:'ri-graduation-cap-line',  title:'Share & compete',   desc:'Students sign in, take quizzes, view results, and climb the leaderboard.',            from:'from-violet-500 to-purple-600' },
            ].map(s=>(
              <motion.div key={s.step} variants={fadeUp}
                className="flex flex-col items-center text-center group">
                <motion.div whileHover={{ scale:1.08 }} transition={{ type:'spring', stiffness:300 }}
                  className={`relative w-20 h-20 rounded-3xl bg-gradient-to-br ${s.from} flex items-center justify-center mb-6 shadow-xl shadow-indigo-200/50`}>
                  <i className={`${s.icon} text-white text-3xl`} />
                  <div className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                    <span className="text-[9px] font-black text-gray-600">{s.step}</span>
                  </div>
                </motion.div>
                <h3 className="font-bold text-gray-900 text-lg mb-2.5">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[220px]">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <motion.div
          initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-80px' }}
          transition={{ duration:0.7, ease:EASE }}
          className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl p-1 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 shadow-2xl shadow-indigo-500/30">
          {/* Inner card */}
          <div className="relative rounded-[20px] bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 px-12 py-16 text-center overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/5 blur-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,255,255,0.08),transparent)]" />

            <div className="relative">
              <motion.div
                animate={{ rotate:[0,5,-5,0] }} transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
                className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mx-auto mb-7 ring-1 ring-white/20">
                <i className="ri-brain-line text-white text-3xl" />
              </motion.div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight">Ready to get started?</h2>
              <p className="text-blue-100 max-w-md mx-auto mb-10 text-lg leading-relaxed">
                Create your free account and start building quizzes in under 5 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}>
                  <Link href="/register"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-sm">
                    <i className="ri-rocket-line text-indigo-600" /> Create free account
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}>
                  <Link href="/login"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors border border-white/20 text-sm">
                    Sign in
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm">
              <i className="ri-brain-line text-white text-xs" />
            </div>
            <span className="font-bold text-gray-900">QuizMaster</span>
          </div>
          <p className="text-sm text-gray-400 text-center">
            Built with Next.js 16 · better-auth · Prisma 7 · Neon · Tailwind CSS
          </p>
          <div className="flex items-center gap-5 text-sm text-gray-400">
            <Link href="/login"    className="hover:text-gray-800 transition-colors">Sign in</Link>
            <Link href="/register" className="hover:text-gray-800 transition-colors">Register</Link>
            <Link href="/docs"     className="hover:text-gray-800 transition-colors">Docs</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
