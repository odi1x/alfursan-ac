import prisma from "@/lib/prisma";
import AddPackageForm from "./AddPackageForm";
import PackageCard from "./PackageCard";

export const dynamic = "force-dynamic";

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
                <PackageCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
