import prisma from "@/lib/prisma";

export default async function Dashboard() {
  const branchCount = await prisma.branch.count();
  const packageCount = await prisma.package.count();
  const playerCount = await prisma.player.count();
  const reviewCount = await prisma.review.count();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold font-display mb-8">نظرة عامة على البيانات</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-surface p-6 rounded-[16px] border border-line">
          <div className="text-muted text-sm font-medium mb-2">الفروع النشطة</div>
          <div className="text-4xl font-bold font-display text-academy-red">{branchCount}</div>
        </div>
        <div className="bg-surface p-6 rounded-[16px] border border-line">
          <div className="text-muted text-sm font-medium mb-2">إجمالي الباقات</div>
          <div className="text-4xl font-bold font-display text-academy-red">{packageCount}</div>
        </div>
        <div className="bg-surface p-6 rounded-[16px] border border-line">
          <div className="text-muted text-sm font-medium mb-2">اللاعبون المنتقلون للأندية</div>
          <div className="text-4xl font-bold font-display text-academy-red">{playerCount}</div>
        </div>
        <div className="bg-surface p-6 rounded-[16px] border border-line">
          <div className="text-muted text-sm font-medium mb-2">تقييمات أولياء الأمور</div>
          <div className="text-4xl font-bold font-display text-academy-red">{reviewCount}</div>
        </div>
      </div>
    </div>
  );
}
