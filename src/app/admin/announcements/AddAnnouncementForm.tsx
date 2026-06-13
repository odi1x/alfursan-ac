"use client";

import { useRef } from "react";
import { createAnnouncement } from "@/app/actions";

export default function AddAnnouncementForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={async (formData) => {
      const title = formData.get("title") as string;
      const content = formData.get("content") as string;

      await createAnnouncement({ title, content });
      formRef.current?.reset();
    }} className="bg-surface p-6 rounded-[16px] border border-line mb-8 flex flex-col gap-4">
      <h3 className="font-bold font-display text-lg">إضافة إعلان جديد</h3>

      <input name="title" placeholder="عنوان الإعلان" required className="w-full bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red" />
      <textarea name="content" placeholder="نص الإعلان" required rows={4} className="w-full bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red resize-none"></textarea>

      <button type="submit" className="bg-academy-red text-white py-2 px-6 rounded-[12px] w-fit font-display font-semibold hover:opacity-90 transition-opacity">نشر الإعلان</button>
    </form>
  );
}
