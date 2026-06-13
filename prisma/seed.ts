import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clear existing
  await prisma.package.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.player.deleteMany();
  await prisma.review.deleteMany();
  await prisma.stat.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.user.deleteMany();

  // 1. Admin
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      passwordHash: adminPasswordHash,
      name: 'Admin',
    },
  });

  // 2. Branches & Packages
  const nuzhah = await prisma.branch.create({
    data: {
      slug: 'nuzhah',
      name: 'فرع النزهة',
      landmark: 'شارع محمد سرور الصبان — بعد النقابة العامة للسيارات',
      phone: '0561825351',
      phoneIntl: '+966561825351',
      whatsapp: '966561825351',
      waMessage: 'السلام عليكم، أرغب بالاستفسار عن التسجيل في فرع النزهة',
      mapsUrl: 'https://share.google/tYsQ4FkIu3pYEHrme',
      lat: 21.4414375,
      lng: 39.7840625,
      rating: '4.8',
      ratingCount: '165+',
      packages: {
        create: [
          { name: 'الباقة الشهرية', price: 250, unit: 'ريال / شهر', sessions: '12 حصة تدريبية', note: '3 أيام في الأسبوع' },
          { name: 'باقة 3 أشهر', price: 650, unit: 'ريال / 3 أشهر', sessions: '36 حصة تدريبية', note: 'وفّر أكثر مع الاشتراك الفصلي', featured: true },
        ],
      },
    },
  });

  const buhayrat = await prisma.branch.create({
    data: {
      slug: 'buhayrat',
      name: 'فرع البحيرات',
      landmark: 'حي البحيرات — مقابل نكهة الزعفران',
      phone: '0543469746',
      phoneIntl: '+966543469746',
      whatsapp: '966543469746',
      waMessage: 'السلام عليكم، أرغب بالاستفسار عن التسجيل في فرع البحيرات',
      mapsUrl: 'https://share.google/VtPceX6uJ7iXIVJnN',
      lat: 21.471904,
      lng: 39.7836039,
      rating: '5.0',
      ratingCount: '12+',
      packages: {
        create: [
          { name: 'الباقة الشهرية', price: 210, unit: 'ريال / شهر', sessions: '12 حصة تدريبية', note: '3 أيام في الأسبوع' },
          { name: 'باقة 3 أشهر', price: 550, unit: 'ريال / 3 أشهر', sessions: '36 حصة تدريبية', note: 'وفّر أكثر مع الاشتراك الفصلي', featured: true },
        ],
      },
    },
  });

  // 3. Stats
  await prisma.stat.createMany({
    data: [
      { value: '20', label: 'لاعباً انتقلوا للأندية', star: false },
      { value: '+6', label: 'سنوات خبرة المدربين', star: false },
      { value: '4.8', label: 'تقييم Google Maps', star: true },
    ],
  });

  // 4. Players
  await prisma.player.createMany({
    data: [
      { name: 'حمزة برناوي', club: 'نادي الأهلي', year: '2009', imageUrl: '/assets/players/hamza-barnawi.webp' },
      { name: 'عبدالإله بدوي', club: 'نادي الأهلي', year: '2008', imageUrl: '/assets/players/abdulelah-badawi.webp' },
      { name: 'بتال المحمادي', club: 'نادي الأهلي', year: '2009', imageUrl: '/assets/players/battal-almahmadi.webp' },
      { name: 'محمد ساكا', club: 'نادي الأهلي', year: '2009', imageUrl: '/assets/players/mohammed-saka.webp' },
      { name: 'إبراهيم المصعبي', club: 'نادي الأهلي', year: '2009', imageUrl: '/assets/players/ibrahim-almusabi.webp' },
      { name: 'عامر الحربي', club: 'نادي الأهلي', year: '2013', imageUrl: '/assets/players/amer-alharbi.webp' },
      { name: 'قصي اليماني', club: 'نادي الوحدة', year: '2010', imageUrl: '/assets/players/qusai-alyamani.webp' },
      { name: 'راشد المولد', club: 'نادي الوحدة', year: '2010', imageUrl: '/assets/players/rashed-almawlad.webp' },
      { name: 'عبدالله الشريف', club: 'نادي الوحدة', year: '2011', imageUrl: '/assets/players/abdullah-alsharif.webp' },
      { name: 'عزام الشمراني', club: 'نادي الوحدة', year: '2012', imageUrl: '/assets/players/azzam-alshamrani.webp' },
      { name: 'يزيد بافيل', club: 'نادي الوحدة', year: '2010', imageUrl: '/assets/players/yazeed-bafail.webp' },
      { name: 'عزام الزهراني', club: 'نادي الوحدة', year: '2010', imageUrl: '/assets/players/azzam-alzahrani.webp' },
      { name: 'عبدالله المالكي', club: 'نادي الوحدة', year: '2012', imageUrl: '/assets/players/abdullah-almalki.webp' },
      { name: 'عبدالعزيز العويس', club: 'نادي الوحدة', year: '2011', imageUrl: '/assets/players/abdulaziz-alowais.webp' },
      { name: 'عبدالله أبو حمرا', club: 'نادي الوحدة', year: '2011', imageUrl: '/assets/players/abdullah-abuhamra.webp' },
      { name: 'معن الحربي', club: 'نادي الوحدة', year: '2012', imageUrl: '/assets/players/maan-alharbi.webp' },
      { name: 'عبدالعزيز المحمادي', club: 'نادي الوحدة', year: '2011', imageUrl: '/assets/players/abdulaziz-almahmadi.webp' },
      { name: 'عبدالإله الحربي', club: 'نادي الوحدة', year: '2011', imageUrl: '/assets/players/abdulelah-alharbi.webp' },
      { name: 'صهيب رجب', club: 'نادي الوحدة', year: '2009', imageUrl: '/assets/players/suhaib-rajab.webp' },
      { name: 'عبدالعزيز الشريف', club: 'نادي الوحدة', year: '2010', imageUrl: '/assets/players/abdulaziz-alsharif.webp' },
    ],
  });

  // 5. Reviews
  await prisma.review.createMany({
    data: [
      { author: 'A.F', text: 'من أفضل الأكاديميات في مكة. لاحظت الاهتمام في ابني والمتابعة مع ولي الأمر في التفاصيل والاهتمام بتطور أداء الطالب.', rating: 5 },
      { author: 'وليد هوساوي', text: 'أكاديمية ممتازة.. تعليم.. أدب.', rating: 5 },
      { author: 'أحمد العبدالله', text: 'من أفضل أكاديميات مكة.', rating: 5 },
      { author: 'ولي أمر', text: 'ما شاء الله، لي أسبوعين في الأكاديمية وتطورت بسرعة، والتمارين جداً ممتازة ومباريات خارجية وداخلية، والكل يلعب ويطلع من التمرين وهو مبسوط ومتحمس للتمارين والمباريات الجاية.', rating: 5 },
      { author: 'لاعب سابق', text: 'صراحة من أفضل الأكاديميات من ناحية الجودة، واهتموا في الدين والصلاة والحفاظ على الأخلاق الحسنة. عشت تجربة أكاديمية الفرسان وكانت من أفضل التجارب.', rating: 5 },
    ],
  });

  // 6. FAQs
  await prisma.fAQ.createMany({
    data: [
      { question: 'ما الأعمار التي تقبلها الأكاديمية؟', answer: 'نستقبل اللاعبين من عمر 6 سنوات حتى 18 سنة، ويتم تقسيمهم إلى فئات عمرية متقاربة لضمان أفضل استفادة.' },
      { question: 'كيف أسجّل ابني في الأكاديمية؟', answer: 'ببساطة تواصل معنا عبر زر الواتساب أو الاتصال في أسفل الشاشة، وسنحدد لك الفئة المناسبة وموعد التدريب لحظة الاشتراك.' },
      { question: 'ما أوقات التدريب؟', answer: 'التدريب من بعد العصر إلى العشاء (4:30 – 9:00 مساءً)، والجمعة إجازة. الوقت الدقيق يعتمد على الفئة العمرية ويُحدد عند التواصل.' },
      { question: 'كم عدد الحصص في الأسبوع؟', answer: '3 حصص تدريبية أسبوعياً: إما (السبت – الاثنين – الأربعاء) أو (الأحد – الثلاثاء – الخميس) حسب الفئة.' },
      { question: 'ماذا يحضر اللاعب معه للتدريب؟', answer: 'ملابس رياضية مريحة، حذاء كرة قدم، جوارب طويلة، وقارورة ماء.' },
      { question: 'هل التدريب مناسب للمبتدئين؟', answer: 'نعم، نستقبل جميع المستويات من المبتدئ إلى المتقدم، ويُقسّم اللاعبون حسب العمر والمستوى.' },
      { question: 'هل يمكنني زيارة الفرع قبل الاشتراك؟', answer: 'بكل تأكيد، تواصل معنا عبر واتساب وسنرحب بزيارتك خلال أوقات التدريب للاطلاع على الملعب وطريقة التدريب.' },
    ],
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
