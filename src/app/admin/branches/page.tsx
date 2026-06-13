import prisma from "@/lib/prisma";
import { updateBranch } from "@/app/actions";

export default async function BranchesAdmin() {
  const branches = await prisma.branch.findMany();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold font-display mb-8">إدارة الفروع</h2>

      <div className="grid grid-cols-1 gap-6">
        {branches.map(b => (
          <form key={b.id} action={async (formData) => {
            "use server";
            const name = formData.get("name") as string;
            const landmark = formData.get("landmark") as string;
            const phone = formData.get("phone") as string;
            const whatsapp = formData.get("whatsapp") as string;
            const rating = formData.get("rating") as string;

            await updateBranch(b.id, { name, landmark, phone, whatsapp, rating });
          }} className="bg-surface p-6 rounded-[16px] border border-line flex flex-col gap-4">
            <h3 className="font-bold font-display text-lg text-academy-red">{b.name} ({b.slug})</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted mb-1">اسم الفرع</label>
                <input name="name" defaultValue={b.name} required className="w-full bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red" />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1">العنوان (المعلم السريع)</label>
                <input name="landmark" defaultValue={b.landmark} required className="w-full bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red" />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1">رقم الاتصال</label>
                <input name="phone" defaultValue={b.phone} required className="w-full bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red" dir="ltr" />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1">رقم الواتساب (بدون 00)</label>
                <input name="whatsapp" defaultValue={b.whatsapp} required className="w-full bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red" dir="ltr" />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1">تقييم جوجل (مثال: 4.8)</label>
                <input name="rating" defaultValue={b.rating} required className="w-full bg-surface-2 border border-line rounded-[12px] p-3 text-sm focus:ring-1 focus:ring-academy-red" dir="ltr" />
              </div>
            </div>

            <button type="submit" className="bg-academy-red text-white py-2 px-6 rounded-[12px] w-fit font-display font-semibold hover:opacity-90 transition-opacity mt-2">حفظ التعديلات</button>
          </form>
        ))}
      </div>
    </div>
  );
}
