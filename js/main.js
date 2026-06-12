/* ============================================================
   أكاديمية همة الفرسان — منطق الموقع
   يقرأ كل المحتوى من js/data.js ويعرضه تلقائياً
   ============================================================ */

/* ---------- تتبع التحويلات (البكسلات) ----------
   عند جاهزية معرفات البكسل: ألصق أكواد التثبيت في <head>
   (الأماكن معلّمة في ملفات HTML)، وهذه الدالة ستطلق أحداث
   "Contact" تلقائياً عند كل ضغطة اتصال أو واتساب. */
function trackContact(channel, branchId) {
  try {
    if (typeof snaptr === "function") snaptr("track", "CUSTOM_EVENT_1", { description: channel + "_" + branchId });
    if (typeof ttq === "object" && ttq.track) ttq.track("Contact", { content_type: channel, content_id: branchId });
    if (typeof fbq === "function") fbq("track", "Contact", { channel: channel, branch: branchId });
  } catch (e) { /* تجاهل أي خطأ في البكسلات */ }
}

const $ = (s, el = document) => el.querySelector(s);

function waLink(b) { return "https://wa.me/" + b.whatsapp + "?text=" + encodeURIComponent(b.waMessage); }
function telLink(b) { return "tel:" + b.phoneIntl; }

const ICON_CALL = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>';
const ICON_WA = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3a8.2 8.2 0 1 1 7 3.8zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4 0-.5.1-.7l.5-.6c.1-.2.1-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.1 2.2-.2 3.8a11.6 11.6 0 0 0 4.5 4.3c1.7.8 2.5.9 3.3.7.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0 0-.2-.1-.5-.1z"/></svg>';

/* ============================================================
   شريط التواصل الثابت
   ============================================================ */
function buildContactBar(branchId) {
  const bar = document.createElement("div");
  bar.className = "contact-bar";
  bar.setAttribute("role", "navigation");
  bar.setAttribute("aria-label", "التواصل السريع");

  if (branchId) {
    /* صفحة فرع: أزرار مباشرة برقم الفرع */
    const b = BRANCHES[branchId];
    bar.innerHTML = `<div class="contact-bar-inner">
      <a class="cbtn cbtn-wa" href="${waLink(b)}" target="_blank" rel="noopener" data-track="whatsapp">${ICON_WA}<span>واتساب</span></a>
      <a class="cbtn cbtn-call" href="${telLink(b)}" data-track="call">${ICON_CALL}<span>اتصل الآن</span></a>
    </div>`;
    bar.querySelectorAll("[data-track]").forEach(a =>
      a.addEventListener("click", () => trackContact(a.dataset.track, branchId)));
  } else {
    /* الصفحة الرئيسية: اختيار الفرع أولاً (لكل فرع رقمه) */
    bar.innerHTML = `<div class="contact-bar-inner">
      <button class="cbtn cbtn-wa" data-channel="whatsapp">${ICON_WA}<span>واتساب</span></button>
      <button class="cbtn cbtn-call" data-channel="call">${ICON_CALL}<span>اتصل الآن</span></button>
    </div>`;
    bar.querySelectorAll("[data-channel]").forEach(btn =>
      btn.addEventListener("click", () => openBranchSheet(btn.dataset.channel)));
  }
  document.body.appendChild(bar);
}

/* لوحة اختيار الفرع */
let sheetEls = null;
function openBranchSheet(channel) {
  if (!sheetEls) {
    const backdrop = document.createElement("div");
    backdrop.className = "sheet-backdrop";
    const sheet = document.createElement("div");
    sheet.className = "sheet";
    sheet.setAttribute("role", "dialog");
    sheet.setAttribute("aria-label", "اختر الفرع");
    sheet.innerHTML = `<h3>اختر الفرع للتواصل</h3>
      <div class="sheet-options"></div>
      <button class="sheet-cancel">إغلاق</button>`;
    document.body.append(backdrop, sheet);
    const close = () => { backdrop.classList.remove("show"); sheet.classList.remove("show"); };
    backdrop.addEventListener("click", close);
    $(".sheet-cancel", sheet).addEventListener("click", close);
    sheetEls = { backdrop, sheet, close };
  }
  const opts = $(".sheet-options", sheetEls.sheet);
  opts.innerHTML = "";
  Object.values(BRANCHES).forEach(b => {
    const a = document.createElement("a");
    a.className = "sheet-opt";
    a.href = channel === "whatsapp" ? waLink(b) : telLink(b);
    if (channel === "whatsapp") { a.target = "_blank"; a.rel = "noopener"; }
    a.innerHTML = `<span>${b.name}<small>${b.phone}</small></span>`;
    a.addEventListener("click", () => { trackContact(channel, b.id); sheetEls.close(); });
    opts.appendChild(a);
  });
  sheetEls.backdrop.classList.add("show");
  sheetEls.sheet.classList.add("show");
}

/* ============================================================
   عناصر الصفحة الرئيسية
   ============================================================ */
function renderStats() {
  const el = $("#stats-grid"); if (!el) return;
  el.innerHTML = STATS.map(s => `<div>
    <div class="stat-value">${s.value}${s.star ? '<span class="star">⭐</span>' : ""}</div>
    <div class="stat-label">${s.label}</div>
  </div>`).join("");
}

function renderPlayers() {
  const el = $("#players-rail"); if (!el) return;
  const card = (p, hidden) => `<article class="player-card" ${hidden ? 'aria-hidden="true"' : ""}>
    <img class="player-photo" src="assets/players/${p.img}.webp" alt="${hidden ? "" : "اللاعب " + p.name}" loading="lazy" width="184" height="183">
    <div class="player-info">
      <div class="player-name">${p.name}</div>
      <span class="player-club ${p.club.includes("الأهلي") ? "ahli" : "wahda"}">${p.club}</span>
      <span class="player-year">مواليد ${p.year}</span>
    </div>
  </article>`;
  /* نسختان متتاليتان من البطاقات = حلقة لا نهائية سلسة */
  el.innerHTML = PLAYERS.map(p => card(p, false)).join("") + PLAYERS.map(p => card(p, true)).join("");
  startPlayersAutoScroll(el);
}

/* حركة تلقائية متواصلة للشريط، تتوقف عند اللمس وتستأنف بعده */
function startPlayersAutoScroll(el) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const SPEED = 0.55;            /* بكسل لكل إطار — عدّلها لتسريع/إبطاء الشريط */
  let paused = false, resumeTimer = null;

  const pause = () => { paused = true; clearTimeout(resumeTimer); };
  const resume = () => { clearTimeout(resumeTimer); resumeTimer = setTimeout(() => { paused = false; }, 2500); };
  el.addEventListener("touchstart", pause, { passive: true });
  el.addEventListener("touchend", resume, { passive: true });
  el.addEventListener("mouseenter", pause);
  el.addEventListener("mouseleave", () => { paused = false; });

  let half = 0;
  const measure = () => { half = el.scrollWidth / 2; };
  measure();
  window.addEventListener("resize", measure);

  function tick() {
    if (!paused && half > 0) {
      /* RTL: التمرير نحو اليسار يكون بقيم سالبة لـ scrollLeft */
      el.scrollLeft -= SPEED;
      if (Math.abs(el.scrollLeft) >= half) el.scrollLeft += half;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function renderBranchCards() {
  const el = $("#branch-grid"); if (!el) return;
  el.innerHTML = Object.values(BRANCHES).map(b => `<a class="branch-card" href="${b.page}">
      <div class="branch-name">${b.name}</div>
      <div class="branch-landmark">${b.landmark}</div>
      <div class="branch-rating">⭐ ${b.rating} <span>(${b.ratingCount} تقييم على Google)</span></div>
      <span class="branch-cta">الأسعار والمواعيد والموقع</span>
    </a>`).join("");
}

function renderReviews() {
  const el = $("#reviews-rail"); if (!el) return;
  el.innerHTML = REVIEWS.map(r => `<article class="review-card">
    <div class="review-stars" aria-label="خمس نجوم">★★★★★</div>
    <p class="review-text">${r.text}</p>
    <div class="review-author">${r.author} — عبر Google Maps</div>
  </article>`).join("");
}

/* ============================================================
   عناصر صفحات الفروع
   ============================================================ */
function renderBranchPage(branchId) {
  const b = BRANCHES[branchId];
  document.title = `${b.name} | ${ACADEMY.name}`;

  $("#branch-name").textContent = b.name;
  $("#branch-landmark").textContent = b.landmark;
  $("#branch-rating").innerHTML = `⭐ ${b.rating} <span>(${b.ratingCount} تقييم على Google Maps)</span>`;

  /* الباقات والأسعار */
  $("#pricing-grid").innerHTML = b.packages.map(p => `
    <div class="price-card ${p.featured ? "featured" : ""}">
      ${p.featured ? '<span class="featured-tag">الأكثر توفيراً</span>' : ""}
      <div class="pkg-name">${p.name}</div>
      <div class="pkg-price">${p.price}<small>${p.unit}</small></div>
      <div class="pkg-sessions">${p.sessions}</div>
      <div class="pkg-note">${p.note}</div>
    </div>`).join("");

  /* القوائم النصية */
  $("#ages-body").innerHTML = `<ul>
    <li>نستقبل اللاعبين ${ACADEMY.ages}</li>
    <li>تقسيم اللاعبين إلى فئات عمرية متقاربة لضمان أفضل استفادة وتطور</li>
    <li>جميع المستويات مرحّب بها: من المبتدئ إلى المتقدم</li>
  </ul>`;
  $("#times-body").innerHTML = "<ul>" + SCHEDULE.times.map(t => `<li>${t}</li>`).join("") + "</ul>";
  $("#days-body").innerHTML = "<ul>" + SCHEDULE.days.map(d => `<li>${d}</li>`).join("") + "</ul>";
  $("#coaches-body").innerHTML = "<ul>" + COACHES.map(c => `<li>${c}</li>`).join("") + "</ul>";
  $("#faq-body").innerHTML = FAQ.map(f =>
    `<li style="flex-direction:column;gap:2px"><strong style="display:flex;gap:10px"><span style="color:var(--red)">س:</span>${f.q}</strong><span style="color:var(--muted)">${f.a}</span></li>`
  ).join("");

  /* الخريطة والأزرار */
  $("#map-frame").src = `https://maps.google.com/maps?q=${b.lat},${b.lng}&z=16&hl=ar&output=embed`;
  $("#map-landmark").textContent = b.landmark;
  $("#btn-open-maps").href = b.mapsShare;
  $("#btn-directions").href = `https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}`;
}

/* ============================================================
   تشغيل
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const branchId = document.body.dataset.branch || null;
  if (branchId) renderBranchPage(branchId);
  else { renderStats(); renderPlayers(); renderBranchCards(); renderReviews(); }
  buildContactBar(branchId);
});
