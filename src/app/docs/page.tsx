import Link from 'next/link';

const sections = [
  {
    id: 'overview',
    title: 'Overview',
    icon: 'ri-book-open-line',
    content: (
      <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
        <p>
          <strong className="text-gray-900">QuizMaster</strong> is a full-stack quiz platform built with
          Next.js 16, better-auth, Prisma 7, and Neon PostgreSQL. It supports an admin dashboard
          for managing quizzes, questions, students, and results, plus a dedicated student-facing
          interface for taking quizzes.
        </p>
        <p>
          All pages are statically pre-rendered where possible. Authentication is handled by
          better-auth with email + password only — no magic links or social providers.
        </p>
      </div>
    ),
  },
  {
    id: 'stack',
    title: 'Tech Stack',
    icon: 'ri-stack-line',
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { name: 'Next.js 16.2',        role: 'App Router, Turbopack, SSG/SSR',              color: 'bg-gray-900 text-white' },
          { name: 'React 19',            role: 'UI layer, Server + Client components',         color: 'bg-blue-500 text-white' },
          { name: 'Tailwind CSS v4',     role: 'Utility-first styling (no config file)',       color: 'bg-teal-500 text-white' },
          { name: 'better-auth v1',      role: 'Email/password auth, password reset',          color: 'bg-violet-600 text-white' },
          { name: 'Prisma 7',            role: 'ORM — config in prisma.config.ts',             color: 'bg-indigo-600 text-white' },
          { name: 'Neon (PostgreSQL)',    role: 'Serverless DB via @prisma/adapter-neon',       color: 'bg-emerald-600 text-white' },
          { name: 'Resend',              role: 'Transactional email (password reset)',          color: 'bg-orange-500 text-white' },
          { name: 'recharts',            role: 'Analytics charts (bar, line, pie)',             color: 'bg-rose-500 text-white' },
          { name: 'react-hook-form+zod', role: 'Form validation on auth pages',                color: 'bg-amber-500 text-white' },
          { name: 'sonner',              role: 'Toast notifications',                           color: 'bg-gray-600 text-white' },
          { name: 'framer-motion',       role: 'Landing page animations',                      color: 'bg-pink-500 text-white' },
        ].map(item => (
          <div key={item.name} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className={`text-xs font-bold px-2 py-1 rounded-lg ${item.color} whitespace-nowrap flex-shrink-0`}>{item.name}</span>
            <span className="text-sm text-gray-500">{item.role}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'routes',
    title: 'App Routes',
    icon: 'ri-route-line',
    content: (
      <div className="space-y-5">
        {[
          {
            group: 'Public',
            color: 'bg-gray-100 text-gray-600',
            routes: [
              { path: '/',              desc: 'Marketing landing page' },
              { path: '/docs',          desc: 'This page — platform reference (public)' },
              { path: '/login',         desc: 'Email + password sign-in with callbackUrl support' },
              { path: '/register',      desc: 'New account registration' },
              { path: '/reset-password',desc: 'Request reset email · Set new password via token' },
            ],
          },
          {
            group: 'Admin (protected)',
            color: 'bg-blue-50 text-blue-700',
            routes: [
              { path: '/dashboard',     desc: 'Stats, score distribution chart, recent activity' },
              { path: '/quizzes',       desc: 'Create, edit, delete quizzes · publish / draft toggle' },
              { path: '/questions',     desc: 'MCQ question bank with difficulty & subject filters' },
              { path: '/attempts',      desc: 'All student attempts with per-question detail modal' },
              { path: '/results',       desc: 'Results table with grade badges and pass/fail filter' },
              { path: '/students',      desc: 'Student cards with profile modal and performance bar' },
              { path: '/analytics',     desc: 'Charts: avg scores, pass/fail donut, trend, difficulty' },
            ],
          },
          {
            group: 'Student (protected)',
            color: 'bg-emerald-50 text-emerald-700',
            routes: [
              { path: '/student',               desc: 'Home: personal stats + available quizzes grid' },
              { path: '/student/my-quizzes',    desc: 'Browse quizzes with search, status, difficulty filters' },
              { path: '/student/results',       desc: 'Personal attempt history with grade badges' },
              { path: '/student/leaderboard',   desc: 'Podium for top 3 + ranked list with progress bars' },
              { path: '/student/take-quiz/[id]',desc: 'Interactive quiz player with countdown timer' },
            ],
          },
          {
            group: 'API',
            color: 'bg-purple-50 text-purple-700',
            routes: [
              { path: '/api/auth/[...all]', desc: 'better-auth catch-all handler (sign-in, sign-up, reset-password, session…)' },
            ],
          },
        ].map(group => (
          <div key={group.group}>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${group.color}`}>{group.group}</span>
            <div className="mt-3 space-y-2">
              {group.routes.map(r => (
                <div key={r.path} className="flex items-baseline gap-3 pl-2">
                  <code className="text-xs font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded whitespace-nowrap">{r.path}</code>
                  <span className="text-sm text-gray-500">{r.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'auth',
    title: 'Authentication',
    icon: 'ri-shield-keyhole-line',
    content: (
      <div className="space-y-4 text-sm text-gray-600">
        <p>
          Route protection is handled by{' '}
          <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">src/proxy.ts</code>{' '}
          (Next.js 16 renamed <em>middleware</em> to <em>proxy</em>). Any unauthenticated request
          to a non-public route is redirected to{' '}
          <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">/login?callbackUrl=…</code>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: 'Session cookie',   value: '7 days, refreshed every 24 h' },
            { label: 'Cookie cache TTL', value: '5 minutes (reduces DB reads)' },
            { label: 'Password hashing', value: 'scrypt (node:crypto) via @better-auth/utils' },
            { label: 'Reset token',      value: 'Emailed via Resend, single-use' },
          ].map(row => (
            <div key={row.label} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-xs font-semibold text-gray-700 mb-0.5">{row.label}</p>
              <p className="text-sm text-gray-500">{row.value}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'database',
    title: 'Database Schema',
    icon: 'ri-database-2-line',
    content: (
      <div className="space-y-3 text-sm text-gray-600">
        <p>
          Prisma 7 uses{' '}
          <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">prisma.config.ts</code>{' '}
          for datasource URLs — they are <strong>not</strong> declared inside{' '}
          <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">schema.prisma</code>.
          The Neon adapter is passed to <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">PrismaClient</code> directly at runtime.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-3 py-2 font-semibold text-gray-700 border border-gray-200 rounded-tl-lg">Model</th>
                <th className="px-3 py-2 font-semibold text-gray-700 border border-gray-200">Purpose</th>
                <th className="px-3 py-2 font-semibold text-gray-700 border border-gray-200 rounded-tr-lg">Key fields</th>
              </tr>
            </thead>
            <tbody>
              {[
                { model: 'User',         purpose: 'Identity record per person',     fields: 'id · email · name · emailVerified' },
                { model: 'Session',      purpose: 'Active login session',           fields: 'token · expiresAt · userId → User' },
                { model: 'Account',      purpose: 'Auth provider binding',          fields: 'providerId ("credential") · accountId · password (hashed)' },
                { model: 'Verification', purpose: 'Password-reset tokens',          fields: 'identifier · value · expiresAt' },
              ].map((row, i) => (
                <tr key={row.model} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-3 py-2 font-mono text-blue-600 border border-gray-200">{row.model}</td>
                  <td className="px-3 py-2 text-gray-600 border border-gray-200">{row.purpose}</td>
                  <td className="px-3 py-2 text-gray-500 font-mono border border-gray-200">{row.fields}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    id: 'seed',
    title: 'Seed Data',
    icon: 'ri-plant-line',
    content: (
      <div className="space-y-3 text-sm text-gray-600">
        <p>
          Run <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">npm run db:seed</code> to
          populate the database with demo accounts. The script is idempotent — re-running it skips existing emails.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs font-semibold text-blue-700 mb-2">Admin account</p>
            <p className="font-mono text-xs text-blue-600">admin@quizmaster.dev</p>
            <p className="font-mono text-xs text-blue-600 mt-0.5">Admin1234</p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <p className="text-xs font-semibold text-emerald-700 mb-2">Student accounts (×12)</p>
            <p className="font-mono text-xs text-emerald-600">alice@school.edu … laura@school.edu</p>
            <p className="font-mono text-xs text-emerald-600 mt-0.5">Student123 (all)</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'env',
    title: 'Environment Variables',
    icon: 'ri-settings-3-line',
    content: (
      <div className="space-y-2">
        {[
          { key: 'NEXT_PUBLIC_APP_URL',        example: 'http://localhost:3000',          desc: 'Public base URL — used by auth client' },
          { key: 'BETTER_AUTH_URL',            example: 'http://localhost:3000',          desc: 'Same as APP_URL — used server-side by better-auth' },
          { key: 'BETTER_AUTH_SECRET',         example: '(openssl rand -base64 32)',      desc: 'Secret key for session signing — required in prod' },
          { key: 'BETTER_AUTH_TRUSTED_ORIGINS',example: 'https://yourapp.com',            desc: 'Comma-separated list for CORS / preview deploys' },
          { key: 'DATABASE_URL',               example: 'postgresql://…?sslmode=require', desc: 'Pooled Neon URL used by Prisma at runtime' },
          { key: 'DIRECT_URL',                 example: 'postgresql://…?sslmode=require', desc: 'Direct Neon URL used by Prisma CLI for migrations' },
          { key: 'RESEND_API_KEY',             example: 're_…',                           desc: 'Resend API key for sending password-reset emails' },
          { key: 'EMAIL_FROM',                 example: 'noreply@yourdomain.com',         desc: 'From address for transactional emails' },
        ].map(v => (
          <div key={v.key} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <code className="text-xs font-mono text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded whitespace-nowrap flex-shrink-0">{v.key}</code>
            <div className="min-w-0">
              <p className="text-xs text-gray-500">{v.desc}</p>
              <p className="text-xs font-mono text-gray-400 mt-0.5">{v.example}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'scripts',
    title: 'NPM Scripts',
    icon: 'ri-terminal-line',
    content: (
      <div className="space-y-2">
        {[
          { cmd: 'npm run dev',        desc: 'Start dev server (Turbopack)' },
          { cmd: 'npm run build',      desc: 'Production build with type-checking' },
          { cmd: 'npm run db:migrate', desc: 'Run Prisma migrations (prisma migrate dev)' },
          { cmd: 'npm run db:seed',    desc: 'Seed the database with demo accounts' },
          { cmd: 'npm run db:studio',  desc: 'Open Prisma Studio (visual DB browser)' },
        ].map(s => (
          <div key={s.cmd} className="flex items-center gap-4 p-3 bg-gray-900 rounded-xl">
            <code className="text-xs font-mono text-emerald-400 flex-shrink-0">{s.cmd}</code>
            <span className="text-xs text-gray-400">{s.desc}</span>
          </div>
        ))}
      </div>
    ),
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm">
                <i className="ri-brain-line text-white text-xs" />
              </div>
              <span className="font-bold text-gray-900 text-sm">QuizMaster</span>
            </Link>
            <span className="text-gray-200 text-sm">/</span>
            <span className="text-sm font-medium text-gray-500">Docs</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">
              Sign in
            </Link>
            <Link href="/register"
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold rounded-lg transition-colors">
              Get started
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 flex gap-10 py-12">
        {/* Sidebar nav */}
        <aside className="hidden lg:block w-52 flex-shrink-0">
          <div className="sticky top-24 space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 px-3">On this page</p>
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all group">
                <i className={`${s.icon} text-base text-gray-300 group-hover:text-indigo-400 transition-colors`} />
                {s.title}
              </a>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          {/* Page header */}
          <div className="mb-10 pb-8 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">Reference</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-950 tracking-tight mb-2">Documentation</h1>
            <p className="text-gray-500">Platform reference — tech stack, routes, authentication, database, and scripts.</p>
          </div>

          {/* Mobile section links */}
          <nav className="flex flex-wrap gap-2 mb-10 lg:hidden">
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-indigo-50 hover:text-indigo-700 text-xs font-medium text-gray-600 transition-all">
                <i className={`${s.icon} text-sm`} />{s.title}
              </a>
            ))}
          </nav>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map(s => (
              <section key={s.id} id={s.id}
                className="scroll-mt-20 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50 bg-gray-50/50">
                  <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 flex-shrink-0">
                    <i className={`${s.icon} text-base`} />
                  </div>
                  <h2 className="text-base font-bold text-gray-900">{s.title}</h2>
                </div>
                <div className="px-6 py-5">{s.content}</div>
              </section>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 text-center">
            <p className="text-sm font-semibold text-gray-900 mb-1">Ready to get started?</p>
            <p className="text-sm text-gray-500 mb-4">Create your free account and start building quizzes in minutes.</p>
            <Link href="/register"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
              <i className="ri-rocket-line text-indigo-400" /> Create free account
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
