import prisma from "@/lib/prisma";
import AddPlayerForm from "./AddPlayerForm";
import Image from "next/image";
import { deletePlayer } from "@/app/actions";

export default async function PlayersAdmin() {
  const players = await prisma.player.findMany();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold font-display mb-8">إدارة اللاعبين المنتقلين</h2>

      <AddPlayerForm />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {players.map(p => (
          <div key={p.id} className="bg-surface border border-line p-4 rounded-[16px] text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-surface-2 rounded-full mb-3 overflow-hidden border border-line relative">
              {p.imageUrl ? (
                <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted text-xs">لا توجد صورة</div>
              )}
            </div>
            <div className="font-bold font-display text-sm">{p.name}</div>
            <div className="text-xs text-muted mt-1">{p.club}</div>
            <div className="text-xs text-muted">مواليد {p.year}</div>

            <form action={async () => {
              "use server";
              await deletePlayer(p.id);
            }} className="mt-4 w-full border-t border-line pt-3">
              <button className="text-red-500 text-xs hover:underline w-full">حذف</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
