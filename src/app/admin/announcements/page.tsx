import prisma from "@/lib/prisma";
import { deleteAnnouncement } from "@/app/actions";
import AddAnnouncementForm from "./AddAnnouncementForm";

export default async function AnnouncementsAdmin() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { date: "desc" }
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold font-display mb-8">إدارة الإعلانات والأخبار</h2>

      <AddAnnouncementForm />

      <div className="flex flex-col gap-4">
        {announcements.map(a => (
          <div key={a.id} className="bg-surface border border-line p-5 rounded-[16px]">
            <div className="flex justify-between items-start gap-4 mb-2">
              <h4 className="font-bold font-display text-lg text-academy-red">{a.title}</h4>
              <span className="text-xs text-muted whitespace-nowrap bg-surface-2 px-2 py-1 rounded">{new Date(a.date).toLocaleDateString('ar-SA')}</span>
            </div>
            <p className="text-[.9rem] text-[#E7E8EC]">{a.content}</p>

            <form action={async () => {
              "use server";
              await deleteAnnouncement(a.id);
            }} className="mt-4 pt-3 border-t border-line">
              <button className="text-red-500 text-xs hover:underline">حذف الإعلان</button>
            </form>
          </div>
        ))}
        {announcements.length === 0 && (
          <div className="text-center text-muted py-8 bg-surface rounded-[16px] border border-line border-dashed">
            لا توجد إعلانات حالياً
          </div>
        )}
      </div>
    </div>
  );
}
