import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center space-y-3">
        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto">
          <i className="ri-brain-line text-blue-600 text-2xl" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">
          Welcome, {session.user.name ?? session.user.email}!
        </h1>
        <p className="text-sm text-gray-500">Your QuizMaster dashboard is coming soon.</p>
      </div>
    </div>
  );
}
