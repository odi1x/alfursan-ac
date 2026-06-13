"use client";

import { useState, useRef } from "react";
import ImageKitUploader from "@/components/ImageKitUploader";
import { createCoach } from "@/app/actions";

export default function AddCoachForm() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={async (formData) => {
      const name = formData.get("name") as string;
      const bio = formData.get("bio") as string;

      await createCoach({ name, bio, imageUrl });

      formRef.current?.reset();
      setImageUrl(null);
    }} className="bg-surface p-6 rounded-[16px] border border-line mb-8 flex flex-col gap-4">
      <h3 className="font-bold font-display text-lg">إضافة مدرب جديد</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="name" placeholder="اسم المدرب" required className="bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red" />
        <input name="bio" placeholder="نبذة (مثال: معتمد بخبرة 6 سنوات)" required className="bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red" />
      </div>

      <div className="mt-2">
        <label className="block text-sm mb-2 text-muted">صورة المدرب</label>
        <ImageKitUploader
          folder="/coaches"
          onUploadSuccess={(url) => setImageUrl(url)}
        />
      </div>

      <button type="submit" className="bg-academy-red text-white py-2 px-6 rounded-[12px] w-fit font-display font-semibold hover:opacity-90 transition-opacity mt-4">إضافة مدرب</button>
    </form>
  );
}
