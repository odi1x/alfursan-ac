"use client";

import { useState } from "react";
import { deletePackage } from "@/app/actions";
import EditPackageForm from "./EditPackageForm";

export default function PackageCard({ p }: { p: { id: string, name: string, price: number, unit: string, sessions: string, note: string | null, featured: boolean } }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-surface border border-line p-4 rounded-[16px] relative">
      {p.featured && <span className="absolute top-3 end-3 bg-academy-red text-white text-xs px-2 py-1 rounded-full">مميزة</span>}

      {!isEditing ? (
        <>
          <div className="font-bold font-display mb-1 pr-12">{p.name}</div>
          <div className="text-xl font-bold font-display text-academy-red">{p.price} {p.unit}</div>
          <div className="text-sm mt-1">{p.sessions}</div>
          {p.note && <div className="text-xs text-muted mt-1">{p.note}</div>}

          <div className="flex gap-4 mt-4">
            <button onClick={() => setIsEditing(true)} className="text-blue-400 text-sm hover:underline">تعديل</button>
            <form action={async () => {
              await deletePackage(p.id);
            }}>
              <button className="text-red-500 text-sm hover:underline">حذف</button>
            </form>
          </div>
        </>
      ) : (
        <EditPackageForm pkg={p} onCancel={() => setIsEditing(false)} />
      )}
    </div>
  );
}
