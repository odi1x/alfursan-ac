import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-bg text-white p-4 md:p-8 flex flex-col gap-6" dir="rtl">
      <div className="max-w-[1400px] mx-auto w-full flex-1 flex flex-col gap-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-2 p-6 rounded-[20px] border border-line shadow-lg">
          <div>
            <h1 className="text-3xl font-bold font-display tracking-tight">لوحة تحكم الأكاديمية</h1>
            <p className="text-muted text-sm mt-1">مرحباً، {session.user?.name}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-[12px] transition-colors text-sm font-medium border border-line inline-flex items-center gap-2"
              target="_blank"
            >
              عرض الموقع
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-8 flex-1">
          {/* Sidebar Nav */}
          <aside className="w-full md:w-64 shrink-0">
            <AdminSidebar />
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 bg-surface-2 p-6 md:p-8 rounded-[20px] border border-line shadow-sm min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
