import prisma from "@/lib/prisma";
import { deletePackage } from "@/app/actions";
import AddPackageForm from "./AddPackageForm";

export default async function PackagesAdmin() {
  const branches = await prisma.branch.findMany({ include: { packages: true } });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold font-display mb-8">إدارة الباقات</h2>

      <AddPackageForm branches={branches} />

      <div className="grid gap-6">
        {branches.map(b => (
          <div key={b.id}>
            <h3 className="text-lg font-bold font-display mb-4 text-academy-red">{b.name}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {b.packages.map(p => (
                <div key={p.id} className="bg-surface border border-line p-4 rounded-[16px] relative">
                  {p.featured && <span className="absolute top-3 end-3 bg-academy-red text-white text-xs px-2 py-1 rounded-full">مميزة</span>}
                  <div className="font-bold font-display mb-1">{p.name}</div>
                  <div className="text-xl font-bold font-display text-academy-red">{p.price} {p.unit}</div>
                  <div className="text-sm mt-1">{p.sessions}</div>

                  <form action={async () => {
                    "use server";
                    await deletePackage(p.id);
                  }} className="mt-4">
                    <button className="text-red-500 text-sm hover:underline">حذف الباقة</button>
                  </form>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
