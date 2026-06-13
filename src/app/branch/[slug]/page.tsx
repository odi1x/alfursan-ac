import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BranchPage({ params }: { params: { slug: string } }) {
  const branch = await prisma.branch.findUnique({
    where: { slug: params.slug },
    include: { packages: true },
  });

  if (!branch) {
    notFound();
  }

  const faqs = await prisma.fAQ.findMany();
  const coaches = await prisma.coach.findMany();

  return (
    <div data-branch={branch.slug} className="pb-[100px]">
      {/* ======================= رأس الفرع ======================= */}
      <header className="relative pt-[86px] pb-[34px] overflow-hidden border-b border-line bg-[radial-gradient(120%_90%_at_85%_-10%,rgba(165,10,18,0.45),transparent_60%),var(--color-surface)]">
        <Link className="absolute top-[18px] start-[20px] inline-flex items-center gap-[8px] text-muted text-[.85rem] before:content-['⟶']" href="/">الرئيسية</Link>
        <div className="w-[min(100%,1060px)] mx-auto px-[20px] flex items-center gap-[18px]">
          <Image className="w-[64px] shrink-0" src="/assets/logo.png" alt="شعار أكاديمية همة الفرسان" width={64} height={102} priority />
          <div>
            <h1 id="branch-name" className="font-display font-[800] text-[clamp(1.6rem,7vw,2.3rem)] leading-[1.3]">{branch.name}</h1>
            <div className="text-muted text-[.88rem]" id="branch-landmark">{branch.landmark}</div>
            <div className="text-[#FFD666] text-[.82rem] font-semibold mt-[6px]" id="branch-rating">⭐ {branch.rating} <span className="text-muted font-normal">({branch.ratingCount} تقييم على Google Maps)</span></div>
          </div>
        </div>
      </header>

      {/* ======================= تفاصيل الفرع (Accordion) ======================= */}
      <section className="pt-[28px] pb-[20px]">
        <div className="w-[min(100%,1060px)] mx-auto px-[20px]">
          <span className="block font-semibold text-academy-red text-[.88rem] mb-[6px]">كل ما تحتاج معرفته</span>
          <h2 className="font-display font-[800] text-[clamp(1.7rem,8vw,2.4rem)] leading-[1.2] mb-[12px]">تفاصيل الفرع</h2>

          <div className="mt-[26px] flex flex-col gap-[12px]">
            {/* الأعمار */}
            <details className="bg-surface border border-line rounded-[16px] overflow-hidden group open:border-[rgba(226,7,19,0.45)]" open>
              <summary className="list-none flex items-center gap-[14px] p-[18px_20px] cursor-pointer select-none font-display font-semibold text-[1.08rem] [&::-webkit-details-marker]:hidden">
                <span className="w-[38px] h-[38px] shrink-0 grid place-items-center bg-[rgba(226,7,19,0.12)] text-academy-red rounded-[11px] text-[1.1rem]">👦</span>
                الأعمار
                <span className="ms-auto text-muted transition-transform duration-250 ease text-[.8rem] group-open:rotate-180">▼</span>
              </summary>
              <div className="p-[2px_20px_20px] text-[#DDDEE3] text-[.93rem]" id="ages-body">
                <ul className="flex flex-col gap-[10px]">
                  <li className="flex gap-[10px] before:content-[''] before:shrink-0 before:w-[7px] before:h-[7px] before:mt-[11px] before:bg-academy-red before:rotate-45">نستقبل اللاعبين من 6 إلى 18 سنة</li>
                  <li className="flex gap-[10px] before:content-[''] before:shrink-0 before:w-[7px] before:h-[7px] before:mt-[11px] before:bg-academy-red before:rotate-45">تقسيم اللاعبين إلى فئات عمرية متقاربة لضمان أفضل استفادة وتطور</li>
                  <li className="flex gap-[10px] before:content-[''] before:shrink-0 before:w-[7px] before:h-[7px] before:mt-[11px] before:bg-academy-red before:rotate-45">جميع المستويات مرحّب بها: من المبتدئ إلى المتقدم</li>
                </ul>
              </div>
            </details>

            {/* الباقات */}
            <details className="bg-surface border border-line rounded-[16px] overflow-hidden group open:border-[rgba(226,7,19,0.45)]">
              <summary className="list-none flex items-center gap-[14px] p-[18px_20px] cursor-pointer select-none font-display font-semibold text-[1.08rem] [&::-webkit-details-marker]:hidden">
                <span className="w-[38px] h-[38px] shrink-0 grid place-items-center bg-[rgba(226,7,19,0.12)] text-academy-red rounded-[11px] text-[1.1rem]">🏷️</span>
                الباقات والأسعار
                <span className="ms-auto text-muted transition-transform duration-250 ease text-[.8rem] group-open:rotate-180">▼</span>
              </summary>
              <div className="p-[2px_20px_20px] text-[#DDDEE3] text-[.93rem]">
                <div className="grid gap-[12px] sm:grid-cols-2" id="pricing-grid">
                  {branch.packages.map(p => (
                    <div key={p.id} className={`relative bg-surface-2 border ${p.featured ? "border-academy-red" : "border-line"} rounded-[14px] p-[18px]`}>
                      {p.featured && <span className="absolute top-[14px] end-[14px] bg-academy-red text-white text-[.66rem] font-semibold px-[10px] py-[3px] rounded-full">الأكثر توفيراً</span>}
                      <div className="font-display font-semibold text-[1rem]">{p.name}</div>
                      <div className="font-display font-[800] text-[2.1rem] text-academy-red leading-[1.25]">{p.price}<small className="text-[.78rem] text-muted font-normal ms-[6px]">{p.unit}</small></div>
                      <div className="font-semibold text-[.88rem] mt-[2px]">{p.sessions}</div>
                      <div className="text-muted text-[.78rem] mt-[2px]">{p.note}</div>
                    </div>
                  ))}
                </div>
                <p className="text-muted text-[.78rem] mt-[12px]">الاشتراك والدفع يتمان في الفرع أو عبر التواصل معنا مباشرة.</p>
              </div>
            </details>

            {/* أوقات التدريب */}
            <details className="bg-surface border border-line rounded-[16px] overflow-hidden group open:border-[rgba(226,7,19,0.45)]">
              <summary className="list-none flex items-center gap-[14px] p-[18px_20px] cursor-pointer select-none font-display font-semibold text-[1.08rem] [&::-webkit-details-marker]:hidden">
                <span className="w-[38px] h-[38px] shrink-0 grid place-items-center bg-[rgba(226,7,19,0.12)] text-academy-red rounded-[11px] text-[1.1rem]">🕓</span>
                أوقات التدريب
                <span className="ms-auto text-muted transition-transform duration-250 ease text-[.8rem] group-open:rotate-180">▼</span>
              </summary>
              <div className="p-[2px_20px_20px] text-[#DDDEE3] text-[.93rem]" id="times-body">
                <ul className="flex flex-col gap-[10px]">
                  <li className="flex gap-[10px] before:content-[''] before:shrink-0 before:w-[7px] before:h-[7px] before:mt-[11px] before:bg-academy-red before:rotate-45">التدريب يومياً من بعد العصر إلى العشاء (4:30 – 9:00 مساءً)</li>
                  <li className="flex gap-[10px] before:content-[''] before:shrink-0 before:w-[7px] before:h-[7px] before:mt-[11px] before:bg-academy-red before:rotate-45">الجمعة إجازة</li>
                  <li className="flex gap-[10px] before:content-[''] before:shrink-0 before:w-[7px] before:h-[7px] before:mt-[11px] before:bg-academy-red before:rotate-45">كل فئة عمرية لها وقت محدد — تواصل معنا لمعرفة وقت فئة ابنك بدقة</li>
                </ul>
              </div>
            </details>

            {/* أيام التدريب */}
            <details className="bg-surface border border-line rounded-[16px] overflow-hidden group open:border-[rgba(226,7,19,0.45)]">
              <summary className="list-none flex items-center gap-[14px] p-[18px_20px] cursor-pointer select-none font-display font-semibold text-[1.08rem] [&::-webkit-details-marker]:hidden">
                <span className="w-[38px] h-[38px] shrink-0 grid place-items-center bg-[rgba(226,7,19,0.12)] text-academy-red rounded-[11px] text-[1.1rem]">📅</span>
                أيام التدريب
                <span className="ms-auto text-muted transition-transform duration-250 ease text-[.8rem] group-open:rotate-180">▼</span>
              </summary>
              <div className="p-[2px_20px_20px] text-[#DDDEE3] text-[.93rem]" id="days-body">
                <ul className="flex flex-col gap-[10px]">
                  <li className="flex gap-[10px] before:content-[''] before:shrink-0 before:w-[7px] before:h-[7px] before:mt-[11px] before:bg-academy-red before:rotate-45">3 أيام تدريبية في الأسبوع لكل لاعب</li>
                  <li className="flex gap-[10px] before:content-[''] before:shrink-0 before:w-[7px] before:h-[7px] before:mt-[11px] before:bg-academy-red before:rotate-45">المجموعة الأولى: السبت — الاثنين — الأربعاء</li>
                  <li className="flex gap-[10px] before:content-[''] before:shrink-0 before:w-[7px] before:h-[7px] before:mt-[11px] before:bg-academy-red before:rotate-45">المجموعة الثانية: الأحد — الثلاثاء — الخميس</li>
                  <li className="flex gap-[10px] before:content-[''] before:shrink-0 before:w-[7px] before:h-[7px] before:mt-[11px] before:bg-academy-red before:rotate-45">يتم تحديد مجموعتك وموعدك الدقيق لحظة الاشتراك حسب الفئة العمرية</li>
                </ul>
              </div>
            </details>

            {/* كادر التدريب */}
            <details className="bg-surface border border-line rounded-[16px] overflow-hidden group open:border-[rgba(226,7,19,0.45)]">
              <summary className="list-none flex items-center gap-[14px] p-[18px_20px] cursor-pointer select-none font-display font-semibold text-[1.08rem] [&::-webkit-details-marker]:hidden">
                <span className="w-[38px] h-[38px] shrink-0 grid place-items-center bg-[rgba(226,7,19,0.12)] text-academy-red rounded-[11px] text-[1.1rem]">🎽</span>
                كادر التدريب
                <span className="ms-auto text-muted transition-transform duration-250 ease text-[.8rem] group-open:rotate-180">▼</span>
              </summary>
              <div className="p-[2px_20px_20px] text-[#DDDEE3] text-[.93rem]" id="coaches-body">
                {coaches.length > 0 ? (
                  <ul className="flex flex-col gap-[10px]">
                    {coaches.map(c => (
                      <li key={c.id} className="flex gap-[10px] before:content-[''] before:shrink-0 before:w-[7px] before:h-[7px] before:mt-[11px] before:bg-academy-red before:rotate-45">
                        {c.name} — {c.bio}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="flex flex-col gap-[10px]">
                    <li className="flex gap-[10px] before:content-[''] before:shrink-0 before:w-[7px] before:h-[7px] before:mt-[11px] before:bg-academy-red before:rotate-45">مدربون معتمدون بخبرة تتجاوز 6 سنوات في تدريب الفئات السنية</li>
                    <li className="flex gap-[10px] before:content-[''] before:shrink-0 before:w-[7px] before:h-[7px] before:mt-[11px] before:bg-academy-red before:rotate-45">منهجية تدريب حديثة تجمع بين المهارات الفردية واللعب الجماعي</li>
                    <li className="flex gap-[10px] before:content-[''] before:shrink-0 before:w-[7px] before:h-[7px] before:mt-[11px] before:bg-academy-red before:rotate-45">متابعة مستمرة لتطور كل لاعب وتواصل دوري مع ولي الأمر</li>
                    <li className="flex gap-[10px] before:content-[''] before:shrink-0 before:w-[7px] before:h-[7px] before:mt-[11px] before:bg-academy-red before:rotate-45">تخريج لاعبين للأندية السعودية — 20 لاعباً حتى الآن</li>
                  </ul>
                )}
              </div>
            </details>

            {/* الأسئلة الشائعة */}
            <details className="bg-surface border border-line rounded-[16px] overflow-hidden group open:border-[rgba(226,7,19,0.45)]">
              <summary className="list-none flex items-center gap-[14px] p-[18px_20px] cursor-pointer select-none font-display font-semibold text-[1.08rem] [&::-webkit-details-marker]:hidden">
                <span className="w-[38px] h-[38px] shrink-0 grid place-items-center bg-[rgba(226,7,19,0.12)] text-academy-red rounded-[11px] text-[1.1rem]">❓</span>
                الأسئلة الشائعة
                <span className="ms-auto text-muted transition-transform duration-250 ease text-[.8rem] group-open:rotate-180">▼</span>
              </summary>
              <div className="p-[2px_20px_20px] text-[#DDDEE3] text-[.93rem]">
                <ul className="flex flex-col gap-[10px]" id="faq-body">
                  {faqs.map(f => (
                    <li key={f.id} className="flex flex-col gap-[2px] before:hidden">
                      <strong className="flex gap-[10px]"><span className="text-academy-red">س:</span>{f.question}</strong>
                      <span className="text-muted">{f.answer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ======================= الموقع ======================= */}
      <section className="pt-[8px] pb-[40px]">
        <div className="w-[min(100%,1060px)] mx-auto px-[20px]">
          <span className="block font-semibold text-academy-red text-[.88rem] mb-[6px]">موقع الفرع</span>
          <h2 className="font-display font-[800] text-[clamp(1.7rem,8vw,2.4rem)] leading-[1.2] mb-[12px]">كيف تصل إلينا؟</h2>

          <div className="mt-[26px] bg-surface border border-line rounded-[16px] overflow-hidden">
            <iframe className="w-full h-[280px] sm:h-[340px] border-0 block grayscale-[0.15] contrast-[1.05]" id="map-frame" src={`https://maps.google.com/maps?q=${branch.lat},${branch.lng}&z=16&hl=ar&output=embed`} title="خريطة موقع الفرع" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe>
            <div className="p-[18px_20px_20px]">
              <div className="text-muted text-[.88rem]" id="map-landmark">{branch.landmark}</div>
              <div className="grid grid-cols-2 gap-[10px] mt-[14px]">
                <a className="flex items-center justify-center gap-[8px] border-[1.5px] border-academy-red rounded-[12px] p-[12px] font-display font-semibold text-[.9rem] transition-colors duration-200 bg-academy-red shadow-[0_8px_22px_rgba(226,7,19,0.3)]" id="btn-directions" href={`https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`} target="_blank" rel="noopener noreferrer">🧭 الاتجاهات</a>
                <a className="flex items-center justify-center gap-[8px] border-[1.5px] border-line rounded-[12px] p-[12px] font-display font-semibold text-[.9rem] transition-colors duration-200 active:border-academy-red" id="btn-open-maps" href={branch.mapsUrl} target="_blank" rel="noopener noreferrer">فتح في خرائط Google</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= CTA ختامي ======================= */}
      <section className="text-center bg-[radial-gradient(90%_120%_at_50%_120%,rgba(165,10,18,0.5),transparent_65%),var(--color-bg)] pt-[30px] pb-[60px]">
        <div className="w-[min(100%,1060px)] mx-auto px-[20px]">
          <h2 className="font-display font-[800] text-[clamp(1.4rem,6vw,2rem)] leading-[1.2] mb-[12px]">احجز مكان ابنك قبل اكتمال الفئات</h2>
          <p className="text-muted text-[.98rem] leading-[1.6] max-w-[600px] mx-auto">تواصل معنا الآن من الأزرار بالأسفل وسنحدد لك الفئة والموعد المناسب.</p>
        </div>
      </section>

      <footer className="border-t border-line pt-[36px] pb-[28px] text-center">
        <Image className="w-[74px] mx-auto mb-[12px] opacity-95" src="/assets/logo.png" alt="" width={74} height={118} />
        <div className="font-display font-semibold text-[1rem]">أكاديمية همة الفرسان الرياضية</div>
        <div className="text-muted text-[.78rem] mt-[4px]">مكة المكرمة — فرع النزهة، فرع البحيرات</div>
      </footer>
    </div>
  );
}
