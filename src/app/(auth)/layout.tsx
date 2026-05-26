export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-2/5 xl:w-1/2 flex-col justify-between bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 p-10 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800/30 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-800/30 rounded-full translate-y-1/2 -translate-x-1/2" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
            <i className="ri-brain-line text-white text-xl" />
          </div>
          <span className="font-bold text-white text-xl tracking-tight">QuizMaster</span>
        </div>

        {/* Center content */}
        <div className="relative z-10 space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mb-8">
            <i className="ri-shield-check-line text-white text-2xl" />
          </div>
          <h2 className="text-3xl font-bold text-white leading-tight">
            The smarter way to<br />run assessments
          </h2>
          <p className="text-blue-200 text-base leading-relaxed max-w-sm">
            Create, manage, and analyze quizzes and CBTs with real-time results and detailed analytics.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {["Quiz Builder", "Live Results", "Analytics", "Leaderboards"].map((f) => (
              <span key={f} className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur text-white/80 text-sm font-medium">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="relative z-10 text-blue-300/60 text-sm">
          © {new Date().getFullYear()} QuizMaster. All rights reserved.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-6 sm:p-10">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
            <i className="ri-brain-line text-white text-base" />
          </div>
          <span className="font-bold text-gray-900 text-lg">QuizMaster</span>
        </div>

        {children}
      </div>
    </div>
  );
}
