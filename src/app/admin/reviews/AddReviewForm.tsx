"use client";

import { useRef } from "react";
import { createReview } from "@/app/actions";

export default function AddReviewForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={async (formData) => {
      const author = formData.get("author") as string;
      const text = formData.get("text") as string;
      const rating = parseInt(formData.get("rating") as string);

      await createReview({ author, text, rating });
      formRef.current?.reset();
    }} className="bg-surface p-6 rounded-[16px] border border-line mb-8 flex flex-col gap-4">
      <h3 className="font-bold font-display text-lg">إضافة تقييم جديد</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="author" placeholder="اسم الكاتب" required className="bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red" />
        <select name="rating" required className="bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red">
          <option value="5">5 نجوم ★★★★★</option>
          <option value="4">4 نجوم ★★★★☆</option>
        </select>
      </div>

      <textarea name="text" placeholder="نص التقييم" required rows={3} className="bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red resize-none"></textarea>

      <button type="submit" className="bg-academy-red text-white py-2 px-6 rounded-[12px] w-fit font-display font-semibold hover:opacity-90 transition-opacity">إضافة التقييم</button>
    </form>
  );
}
