"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "نظرة عامة", href: "/admin/dashboard" },
    { name: "الفروع", href: "/admin/branches" },
    { name: "القسم الرئيسي (Hero)", href: "/admin/hero" },
    { name: "الباقات", href: "/admin/packages" },
    { name: "المدربون", href: "/admin/coaches" },
    { name: "اللاعبون", href: "/admin/players" },
    { name: "التقييمات", href: "/admin/reviews" },
    { name: "الإعلانات والأخبار", href: "/admin/announcements" },
  ];

  return (
    <nav className="bg-surface-2 p-4 rounded-[20px] border border-line flex flex-col gap-2 sticky top-8">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href) ||
          (pathname === '/admin' && item.href === '/admin/dashboard');

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-3 rounded-[12px] font-display font-medium transition-colors ${
              isActive
                ? "bg-[rgba(226,7,19,0.15)] text-academy-red border border-[rgba(226,7,19,0.3)]"
                : "text-gray-300 hover:bg-white/5 border border-transparent"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
