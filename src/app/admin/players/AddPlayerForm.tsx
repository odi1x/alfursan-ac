"use client";

import { useState, useRef } from "react";
import ImageKitUploader from "@/components/ImageKitUploader";
import { createPlayer } from "@/app/actions";

export default function AddPlayerForm() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={async (formData) => {
      const name = formData.get("name") as string;
      const club = formData.get("club") as string;
      const year = formData.get("year") as string;

      await createPlayer({ name, club, year, imageUrl });

      formRef.current?.reset();
      setImageUrl(null);
    }} className="bg-surface p-6 rounded-[16px] border border-line mb-8 flex flex-col gap-4">
      <h3 className="font-bold font-display text-lg">إضافة لاعب جديد</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="name" placeholder="اسم اللاعب" required className="bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red" />
        <select name="club" required className="bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red">
          <option value="نادي الأهلي">نادي الأهلي</option>
          <option value="نادي الهلال">نادي الهلال</option>
          <option value="نادي النصر">نادي النصر</option>
          <option value="نادي الاتحاد">نادي الاتحاد</option>
          <option value="نادي الشباب">نادي الشباب</option>
          <option value="نادي التعاون">نادي التعاون</option>
          <option value="نادي الاتفاق">نادي الاتفاق</option>
          <option value="نادي الفتح">نادي الفتح</option>
          <option value="نادي الفيحاء">نادي الفيحاء</option>
          <option value="نادي ضمك">نادي ضمك</option>
          <option value="نادي الرياض">نادي الرياض</option>
          <option value="نادي الخليج">نادي الخليج</option>
          <option value="نادي الرائد">نادي الرائد</option>
          <option value="نادي الطائي">نادي الطائي</option>
          <option value="نادي أبها">نادي أبها</option>
          <option value="نادي الأخدود">نادي الأخدود</option>
          <option value="نادي الحزم">نادي الحزم</option>
          <option value="نادي الوحدة">نادي الوحدة</option>
        </select>
        <input name="year" placeholder="سنة الميلاد (مثال: 2010)" required className="bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red" />
      </div>

      <div className="mt-2">
        <label className="block text-sm mb-2 text-muted">صورة اللاعب</label>
        <ImageKitUploader
          folder="/players"
          onUploadSuccess={(url) => setImageUrl(url)}
        />
      </div>

      <button type="submit" className="bg-academy-red text-white py-2 px-6 rounded-[12px] w-fit font-display font-semibold hover:opacity-90 transition-opacity mt-4">إضافة لاعب</button>
    </form>
  );
}
