import prisma from "@/lib/prisma";
import AddCoachForm from "./AddCoachForm";
import Image from "next/image";
import { deleteCoach } from "@/app/actions";

export default async function CoachesAdmin() {
  const coaches = await prisma.coach.findMany();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold font-display mb-8">إدارة المدربين</h2>

      <AddCoachForm />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {coaches.map(c => (
          <div key={c.id} className="bg-surface border border-line p-4 rounded-[16px] text-center flex flex-col items-center">
            <div className="w-24 h-24 bg-surface-2 rounded-full mb-3 overflow-hidden border border-line relative">
              {c.imageUrl ? (
                <Image src={c.imageUrl} alt={c.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted text-xs">لا توجد صورة</div>
              )}
            </div>
            <div className="font-bold font-display text-[1.05rem] mb-1">{c.name}</div>
            <div className="text-[.85rem] text-muted flex-1">{c.bio}</div>

            <form action={async () => {
              "use server";
              await deleteCoach(c.id);
            }} className="mt-4 w-full border-t border-line pt-3">
              <button className="text-red-500 text-xs hover:underline w-full">حذف</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
