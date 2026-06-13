"use client";

import { useRef } from "react";
import { createPackage } from "@/app/actions";

type Branch = { id: string, name: string };

export default function AddPackageForm({ branches }: { branches: Branch[] }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={async (formData) => {
      const branchId = formData.get("branchId") as string;
      const name = formData.get("name") as string;
      const price = parseInt(formData.get("price") as string);
      const unit = formData.get("unit") as string;
      const sessions = formData.get("sessions") as string;
      const note = formData.get("note") as string;
      const featured = formData.get("featured") === "on";

      await createPackage({ branchId, name, price, unit, sessions, note, featured });

      formRef.current?.reset();
    }} className="bg-surface p-6 rounded-[16px] border border-line mb-8 flex flex-col gap-4">
      <h3 className="font-bold font-display text-lg">إضافة باقة جديدة</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select name="branchId" className="bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red" required>
          <option value="">اختر الفرع...</option>
          {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
        <input name="name" placeholder="اسم الباقة" required className="bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red" />
        <input name="price" type="number" placeholder="السعر" required className="bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red" />
        <input name="unit" placeholder="الوحدة (مثال: ريال / شهر)" required className="bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red" />
        <input name="sessions" placeholder="عدد الحصص" required className="bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red" />
        <input name="note" placeholder="ملاحظة إضافية (اختياري)" className="bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red" />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" name="featured" id="featured" className="w-4 h-4 text-academy-red bg-surface-2 border-line rounded focus:ring-academy-red focus:ring-offset-bg" />
        <label htmlFor="featured" className="text-sm">تمييز كـ "الأكثر توفيراً"</label>
      </div>
      <button type="submit" className="bg-academy-red text-white py-2 px-6 rounded-[12px] w-fit font-display font-semibold hover:opacity-90 transition-opacity">إضافة</button>
    </form>
  );
}
