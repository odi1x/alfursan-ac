import { getClubColorClass } from "@/lib/clubColors";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const hero = await prisma.hero.findFirst();
  const stats = await prisma.stat.findMany();
  const players = await prisma.player.findMany();
  const branches = await prisma.branch.findMany({
    include: { packages: true },
  });
  const reviews = await prisma.review.findMany();

  const heroHeadline = hero?.headline || "بالهمة تتحقق الأحلام";
  const heroSubheading = hero?.subheading || "أكاديمية كرة قدم للفئات السنية من 6 إلى 18 سنة — مكة المكرمة";
  const heroBgImage = hero?.bgImageUrl || "/assets/hero.webp";

  const announcements = await prisma.announcement.findMany({
    orderBy: { date: 'desc' },
    take: 3
  });

  return (
    <>
      {/* ======================= Hero ======================= */}
      <header className="relative pt-[12vh] pb-[40px] px-0 overflow-hidden min-h-[580px] border-b border-line flex flex-col">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-[center_28%] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(to_top,var(--color-bg)_0%,rgba(11,11,13,.78)_52%,rgba(11,11,13,.28)_100%),linear-gradient(115deg,rgba(165,10,18,.38),transparent_55%)]"
          style={{ backgroundImage: `url('${heroBgImage}')` }}
          role="img"
          aria-label="لاعبون من أكاديمية همة الفرسان أثناء التدريب"
        />
        <div className="relative z-10 w-[min(100%,1060px)] mx-auto px-[20px] flex flex-col items-center justify-center text-center flex-grow mt-[20px]">
          <div className="flex items-center justify-center gap-6 mb-[16px]">
            <div className="flex flex-col text-right font-display font-black text-academy-red text-[2.5rem] leading-[1.1]">
              <span>همة</span>
              <span>الفرسان</span>
            </div>
            <Image className="w-[150px] sm:w-[180px] opacity-100 drop-shadow-xl" src="/assets/logo.png" alt="شعار أكاديمية همة الفرسان" width={180} height={288} priority />
          </div>
          <div className="text-white font-display text-[1.2rem] sm:text-[1.5rem] font-bold mb-[12px] drop-shadow-md">أكاديمية همة الفرسان الرياضية</div>
          <h1 className="font-display font-[900] text-[clamp(2.5rem,10vw,4.2rem)] leading-[1.1] mb-[24px] text-white" dangerouslySetInnerHTML={{ __html: heroHeadline.replace('تتحقق', '<em class="text-academy-red not-italic">تتحقق</em>') }}>
          </h1>
          <p className="text-[#DFE1E8] font-display text-[1.1rem] sm:text-[1.2rem] leading-[1.7] max-w-[540px] mx-auto mb-[36px] px-[10px]">
            {heroSubheading}
          </p>
          <a className="inline-flex items-center justify-center font-display font-bold text-[1.2rem] rounded-full px-[48px] min-h-[64px] bg-academy-red text-white shadow-[0_8px_32px_rgba(226,7,19,0.4)] transition-transform duration-200 active:scale-95" href="#branches">اختر فرعك وابدأ</a>
        </div>
      </header>

      {/* ======================= الإعلانات ======================= */}
      {announcements.length > 0 && (
        <div className="bg-academy-red text-white py-[12px] overflow-hidden relative z-20">
          <div className="w-[min(100%,1060px)] mx-auto px-[20px]">
            <div className="flex gap-[20px] overflow-x-auto scrollbar-none snap-x snap-mandatory">
              {announcements.map(a => (
                <div key={a.id} className="flex-none whitespace-nowrap text-[.9rem] font-medium flex items-center gap-[8px]">
                  <span className="bg-white/20 px-2 py-0.5 rounded text-xs">جديد</span>
                  {a.title} — {a.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================= الإنجازات (شريط الثقة) ======================= */}
      <div className="border-b border-line relative z-10 bg-bg">
        <div className="w-[min(100%,1060px)] mx-auto px-[20px] py-[22px] grid grid-cols-3 gap-[10px] divide-x divide-x-reverse divide-line text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="font-display font-[800] text-[1.6rem] text-academy-red mb-[2px] tracking-tight flex items-center justify-center gap-[4px]">
                {s.value}
                {s.star ? <span className="text-[#FFD666] text-[1rem]">⭐</span> : ""}
              </div>
              <div className="text-muted text-[.74rem] font-medium leading-[1.3] max-w-[120px] mx-auto">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======================= اللاعبون المنتقلون ======================= */}
      <section id="players" className="pt-[54px] pb-[60px] overflow-hidden" aria-labelledby="players-title">
        <div className="w-[min(100%,1060px)] mx-auto px-[20px] mb-[26px]">
          <span className="block font-semibold text-academy-red text-[.88rem] mb-[6px]">فخر الأكاديمية</span>
          <h2 className="font-display font-[800] text-[clamp(1.7rem,8vw,2.4rem)] leading-[1.2] mb-[12px]" id="players-title">لاعبونا المنتقلون للأندية</h2>
          <p className="text-muted text-[.98rem] leading-[1.6] max-w-[600px]">20 لاعباً تدرّبوا عندنا واليوم يمثلون أندية الأهلي والوحدة في الفئات السنية.</p>
        </div>
        <div className="flex gap-[12px] px-[20px] pb-[12px] w-max animate-infinite-scroll hover:animation-paused active:animation-paused">
          {/* Double map to simulate infinite scrolling without complex JS for now, matching static visual layout */}
          {[...players, ...players].map((p, i) => (
            <article key={i} className="flex-none basis-[164px] bg-surface border border-line rounded-[16px] overflow-hidden sm:basis-[190px]" aria-hidden={i >= players.length ? 'true' : undefined}>
              <div className="bg-[#dcdcdc] relative w-full aspect-square">
                {p.imageUrl ? (
                  <Image className="w-full h-full object-cover" src={p.imageUrl} alt={i >= players.length ? "" : "اللاعب " + p.name} width={184} height={183} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-surface-2 text-muted text-xs">لا توجد صورة</div>
                )}
              </div>
              <div className="p-[14px] pt-[2px] text-center">
                <div className="font-display font-semibold text-[1rem] leading-[1.5] mt-2">{p.name}</div>
                <span className={`inline-block mt-[6px] text-[.74rem] font-semibold px-[12px] py-[3px] rounded-full text-white ${getClubColorClass(p.club)}`}>{p.club}</span>
                <span className="block text-muted text-[.72rem] mt-[5px]">مواليد {p.year}</span>
              </div>
            </article>
          ))}
        </div>
        <div className="w-[min(100%,1060px)] mx-auto px-[20px]">
          <span className="flex items-center gap-[8px] text-muted text-[.78rem] mt-[6px] after:content-['⟵'] after:text-academy-red after:animate-nudge">الشريط يتحرك تلقائياً — المسه للتوقف وتصفّحه بنفسك</span>
        </div>
      </section>

      {/* ======================= الفروع ======================= */}
      <section id="branches" className="bg-surface pt-[54px] pb-[60px]" aria-labelledby="branches-title">
        <div className="w-[min(100%,1060px)] mx-auto px-[20px]">
          <span className="block font-semibold text-academy-red text-[.88rem] mb-[6px]">فرعان في مكة المكرمة</span>
          <h2 className="font-display font-[800] text-[clamp(1.7rem,8vw,2.4rem)] leading-[1.2] mb-[12px]" id="branches-title">اختر الفرع الأقرب لك</h2>
          <p className="text-muted text-[.98rem] leading-[1.6] max-w-[600px]">كل التفاصيل داخل صفحة الفرع: الأسعار، المواعيد، الموقع على الخريطة — ثم تواصل بضغطة واحدة.</p>

          <div className="grid gap-[16px] mt-[26px] sm:grid-cols-2" id="branch-grid">
            {branches.map((b) => (
              <Link key={b.id} className="relative block bg-surface-2 border border-line rounded-[16px] py-[24px] px-[22px] overflow-hidden transition-colors duration-200 active:border-academy-red before:content-[''] before:absolute before:inset-y-0 before:start-0 before:w-[6px] before:bg-gradient-to-b before:from-academy-red before:to-academy-red-deep" href={`/branch/${b.slug}`}>
                <div className="font-display font-bold text-[1.35rem]">{b.name}</div>
                <div className="text-muted text-[.88rem] mt-[2px]">{b.landmark}</div>
                <div className="inline-flex items-center gap-[6px] mt-[12px] text-[.82rem] text-[#FFD666] font-semibold">
                  ⭐ {b.rating} <span className="text-muted font-normal">({b.ratingCount} تقييم على Google)</span>
                </div>
                <span className="flex items-center gap-[8px] mt-[16px] font-display font-semibold text-academy-red text-[.98rem] after:content-['⟵']">الأسعار والمواعيد والموقع</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= التقييمات ======================= */}
      <section id="reviews" className="pt-[54px] pb-[60px]" aria-labelledby="reviews-title">
        <div className="w-[min(100%,1060px)] mx-auto px-[20px] flex flex-col gap-[4px]">
          <span className="block font-semibold text-academy-red text-[.88rem]">آراء أولياء الأمور</span>
          <h2 className="font-display font-[800] text-[clamp(1.7rem,8vw,2.4rem)] leading-[1.2]" id="reviews-title">ماذا قالوا عنا؟</h2>
          <div className="inline-flex items-center gap-[10px] mt-[14px] bg-surface border border-line rounded-[12px] px-[16px] py-[10px] w-fit">
            <b className="font-display text-[1.3rem] text-[#FFD666]">4.8 ★</b>
            <span className="text-muted text-[.8rem]">من +165 تقييم حقيقي<br/>على Google Maps</span>
          </div>
        </div>
        <div className="flex gap-[14px] overflow-x-auto px-[20px] pt-[24px] pb-[10px] snap-x snap-mandatory scrollbar-none">
          {reviews.map((r) => (
            <article key={r.id} className="flex-none basis-[min(78vw,330px)] bg-surface border border-line rounded-[16px] p-[20px] flex flex-col gap-[10px]">
              <div className="text-[#FFD666] tracking-[3px] text-[.85rem]" aria-label="خمس نجوم">★★★★★</div>
              <p className="text-[.9rem] text-[#E7E8EC]">{r.text}</p>
              <div className="mt-auto text-muted text-[.78rem] font-semibold">{r.author} — عبر Google Maps</div>
            </article>
          ))}
        </div>
      </section>

      {/* ======================= CTA ختامي ======================= */}
      <section className="py-[80px] relative border-t border-line overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(226,7,19,0.25)_0%,var(--color-bg)_70%)] -z-10" />
        <div className="w-[min(100%,1060px)] mx-auto px-[20px] text-center relative z-10">
          <h2 className="text-[clamp(2.2rem,6vw,3rem)] font-display font-[900] mb-[20px]">جاهز لتكون البطل القادم؟</h2>
          <p className="text-[#DFE1E8] font-display text-[1.1rem] sm:text-[1.2rem] max-w-[600px] mx-auto mb-[40px]">انضم إلى مئات اللاعبين الذين بدأوا رحلتهم الاحترافية معنا. سجل الآن واحجز مكانك.</p>
          <a className="inline-flex items-center justify-center font-display font-bold text-[1.2rem] rounded-full px-[48px] min-h-[64px] bg-academy-red text-white shadow-[0_8px_32px_rgba(226,7,19,0.4)] transition-transform duration-200 active:scale-95" href="#branches">انضم للأكاديمية الآن</a>
        </div>
      </section>

      <footer className="border-t border-line pt-[36px] pb-[100px] text-center">
        <Image className="w-[74px] mx-auto mb-[12px] opacity-95" src="/assets/logo.png" alt="" width={74} height={118} />
        <div className="font-display font-semibold text-[1rem]">أكاديمية همة الفرسان الرياضية</div>
        <div className="text-muted text-[.78rem] mt-[4px]">مكة المكرمة — فرع النزهة، فرع البحيرات</div>
      </footer>
    </>
  );
}
