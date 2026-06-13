import prisma from "@/lib/prisma";
import HeroForm from "./HeroForm";

export default async function HeroAdmin() {
  const hero = await prisma.hero.findFirst();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
      <h2 className="text-2xl font-bold font-display mb-8">إدارة القسم الرئيسي (Hero)</h2>
      <HeroForm hero={hero} />
    </div>
  );
}
