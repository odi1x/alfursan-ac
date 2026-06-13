"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0B0D] p-4" dir="rtl">
      <div className="max-w-md w-full bg-[#16161A] rounded-2xl shadow-xl p-8 border border-white/5">
        <h2 className="text-3xl font-bold text-center text-white mb-8 font-['Changa']">لوحة التحكم</h2>
        {error && <div className="bg-red-500/10 text-red-500 p-3 rounded-xl mb-6 text-center text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#E82B2B] focus:border-transparent text-white transition-all"
              required
              dir="ltr"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#E82B2B] focus:border-transparent text-white transition-all"
              required
              dir="ltr"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#E82B2B] to-[#C01919] text-white py-3 px-4 rounded-xl font-medium hover:opacity-90 transition-opacity font-['Changa']"
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
}
