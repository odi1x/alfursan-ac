"use client";

import { useState } from "react";
import ImageKitUploader from "@/components/ImageKitUploader";
import { updateHero, createHero } from "@/app/actions";

export default function HeroForm({
  hero
}: {
  hero?: { id: string, headline: string, subheading: string, bgImageUrl: string | null } | null
}) {
  const [bgImageUrl, setBgImageUrl] = useState<string | null>(hero?.bgImageUrl || null);

  return (
    <form action={async (formData) => {
      const headline = formData.get("headline") as string;
      const subheading = formData.get("subheading") as string;

      if (hero) {
        await updateHero(hero.id, { headline, subheading, bgImageUrl });
      } else {
        await createHero({ headline, subheading, bgImageUrl });
      }
    }} className="bg-surface p-6 rounded-[16px] border border-line flex flex-col gap-6">

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm mb-2 text-muted">العنوان الرئيسي</label>
          <input name="headline" defaultValue={hero?.headline || "بالهمة تتحقق الأحلام"} required className="w-full bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red" />
          <p className="text-xs text-muted mt-1">تلميح: إذا أردت تلوين كلمة معينة بالأحمر، لا يدعمها هذا الحقل البسيط حالياً (يتم عرض النص بالكامل بلون واحد لتبسيط الإدارة).</p>
        </div>

        <div>
          <label className="block text-sm mb-2 text-muted">العنوان الفرعي</label>
          <input name="subheading" defaultValue={hero?.subheading || "أكاديمية كرة قدم للفئات السنية من 6 إلى 18 سنة — مكة المكرمة"} required className="w-full bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red" />
        </div>
      </div>

      <div>
        <label className="block text-sm mb-2 text-muted">صورة الخلفية</label>
        <ImageKitUploader
          folder="/hero"
          onUploadSuccess={(url) => setBgImageUrl(url)}
        />
        {bgImageUrl && <p className="text-xs text-green-500 mt-2">✓ تم تحديد صورة خلفية بنجاح.</p>}
      </div>

      <button type="submit" className="bg-academy-red text-white py-3 px-8 rounded-[12px] w-fit font-display font-semibold hover:opacity-90 transition-opacity">
        حفظ التعديلات
      </button>
    </form>
  );
}
