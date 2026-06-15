"use client";

import { useRef, useState } from "react";
import { updatePackage } from "@/app/actions";

export default function EditPackageForm({ pkg, onCancel }: { pkg: { id: string, name: string, price: number, unit: string, sessions: string, note: string | null, featured: boolean }, onCancel: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form ref={formRef} action={async (formData) => {
      setIsSubmitting(true);
      const name = formData.get("name") as string;
      const price = parseInt(formData.get("price") as string);
      const unit = formData.get("unit") as string;
      const sessions = formData.get("sessions") as string;
      const note = formData.get("note") as string;
      const featured = formData.get("featured") === "on";

      await updatePackage(pkg.id, { name, price, unit, sessions, note, featured });

      setIsSubmitting(false);
      onCancel();
    }} className="bg-surface-2 p-4 rounded-[12px] border border-academy-red mt-4 flex flex-col gap-3">
      <h4 className="font-bold text-sm text-academy-red mb-2">تعديل الباقة</h4>
      <div className="grid grid-cols-1 gap-3">
        <input name="name" defaultValue={pkg.name} placeholder="اسم الباقة" required className="bg-surface border border-line rounded-[12px] p-2 text-sm focus:ring-1 focus:ring-academy-red w-full" />
        <div className="flex gap-2">
            <input name="price" type="number" defaultValue={pkg.price} placeholder="السعر" required className="bg-surface border border-line rounded-[12px] p-2 text-sm focus:ring-1 focus:ring-academy-red flex-1" />
            <input name="unit" defaultValue={pkg.unit} placeholder="الوحدة" required className="bg-surface border border-line rounded-[12px] p-2 text-sm focus:ring-1 focus:ring-academy-red flex-1" />
        </div>
        <input name="sessions" defaultValue={pkg.sessions} placeholder="عدد الحصص" required className="bg-surface border border-line rounded-[12px] p-2 text-sm focus:ring-1 focus:ring-academy-red w-full" />
        <input name="note" defaultValue={pkg.note || ""} placeholder="ملاحظة إضافية" className="bg-surface border border-line rounded-[12px] p-2 text-sm focus:ring-1 focus:ring-academy-red w-full" />
      </div>
      <div className="flex items-center gap-2 mt-1">
        <input type="checkbox" name="featured" id={`featured-${pkg.id}`} defaultChecked={pkg.featured} className="w-4 h-4 text-academy-red bg-surface-2 border-line rounded focus:ring-academy-red" />
        <label htmlFor={`featured-${pkg.id}`} className="text-xs">مميزة</label>
      </div>
      <div className="flex gap-2 mt-2">
        <button type="submit" disabled={isSubmitting} className="bg-academy-red text-white py-1.5 px-4 rounded-[8px] text-sm font-semibold hover:opacity-90 flex-1">حفظ التعديلات</button>
        <button type="button" onClick={onCancel} className="bg-surface border border-line text-white py-1.5 px-4 rounded-[8px] text-sm font-semibold hover:bg-surface-2 flex-1">إلغاء</button>
      </div>
    </form>
  );
}
