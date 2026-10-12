/* =========================================================
   FADE HUB — script.js
   Renders sample data + demonstrates event bubbling & capturing
========================================================= */

/* ---------------------------------------------------------
   1. SAMPLE DATA
--------------------------------------------------------- */

const services = [
  { name: "Haircut", price: "₱300", desc: "Classic cut, wash & style" },
  { name: "Haircut + Beard", price: "₱480", desc: "Full cut with beard sculpt" },
  { name: "Hair Coloring", price: "₱800", desc: "Full or partial color" },
  { name: "Skin Fade", price: "₱400", desc: "Bald-to-blend with sharp line-up" },
];

const barbers = [
  { name: "P. Mark", specialty: "Skin Fades", exp: "6 yrs experience", rating: "4.9", img: "image/PMark.jpg" },
  { name: "B. Denmark", specialty: "Beard Sculpting", exp: "4 yrs experience", rating: "4.8", img: "image/BDenmark.jpg" },
  { name: "M. Sev", specialty: "Classic Tapers", exp: "8 yrs experience", rating: "5.0", img: "image/MSev.jpg" },
  { name: "A. Justin", specialty: "Modern Crops", exp: "5 yrs experience", rating: "4.8", img: "image/AJustin.jpg" },
];

const gallery = [
  { name: "Skin Fade", img: "skin-fade.jpg" },
  { name: "Pompadour", img: "pompadour.jpg" },
  { name: "Textured Crop", img: "textured-cropped.jpg" },
  { name: "Slick Back", img: "slick-back-fade.jpg" },
  { name: "Side Part", img: "side-part.jpg" },
  { name: "French Crop", img: "french-crop.jpg" },
  { name: "Crew Cut", img: "crew-cut.jpg" },
  { name: "Blow Out Low Taper", img: "blowout-low-taper.jpg" },
  { name: "Warrior Cut", img: "warrior-cut.jpg" },
];

const reviews = [
  { name: "Ralph A.", text: "Solid fade, edewhoop!!" },
  { name: "Hallee D.", text: "Galing mag gupit ni Mark, my idol" },
  { name: "Ethan D.", text: "Clean shop, ganda ng result. Mag bobook ulit ako." },
];

/* ---------------------------------------------------------
   2. RENDER FUNCTIONS
--------------------------------------------------------- */

function renderServices() {
  const grid = document.getElementById("servicesGrid");
  if (!grid) return;
  grid.innerHTML = services.map((s, i) => `
    <div class="service-card" data-name="${s.name}" data-type="service">
      <div class="service-card-bg"></div>
      <div class="service-icon">${String(i + 1).padStart(2, "0")}</div>
      <div class="service-card-content">
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
        <span class="service-price">${s.price}</span>
      </div>
    </div>
  `).join("");
}

function renderBarbers() {
  const grid = document.getElementById("barbersGrid");
  if (!grid) return;
  grid.innerHTML = barbers.map(b => `
    <div class="barber-card" data-name="${b.name}" data-type="barber">
      <div class="barber-image">
        ${b.img ? `<img src="${b.img}" alt="${b.name}" loading="lazy">` : ""}
        <div class="barber-rating">★ ${b.rating}</div>
      </div>
      <div class="barber-info">
        <h3>${b.name}</h3>
        <p class="barber-specialty">${b.specialty}</p>
        <p class="barber-experience">${b.exp}</p>
      </div>
    </div>
  `).join("");
}

function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  grid.innerHTML = gallery.map(style => `
    <div class="gallery-item" data-name="${style.name}" data-type="style">
      <img src="image/${style.img}" alt="${style.name} hairstyle" loading="lazy">
      <div class="gallery-overlay"><strong>${style.name}</strong></div>
    </div>
  `).join("");
}

function renderReviews() {
  const grid = document.getElementById("reviewsGrid");
  if (!grid) return;
  grid.innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-stars">★★★★★</div>
      <p class="review-text">"${r.text}"</p>
      <div class="reviewer">
        <div class="reviewer-avatar">${r.name.charAt(0)}</div>
        <div>
          <strong>${r.name}</strong>
          <span>Verified client</span>
        </div>
      </div>
    </div>
  `).join("");
}

renderServices();
renderBarbers();
renderGallery();
renderReviews();

/* ---------------------------------------------------------
   3. TOAST HELPER
--------------------------------------------------------- */

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

/* ---------------------------------------------------------
   4. EVENT BUBBLING — event delegation
   ---------------------------------------------------------
   Instead of adding a click listener to every single
   .service-card / .barber-card / .gallery-item (which would
   mean 4 + 4 + 8 = 16 separate listeners, and more every time
   the data grows), we add ONE listener on a shared ancestor.

   A click on a child element (e.g. an <h3> inside a card)
   does not stay on that child — it fires on the <h3>, then
   BUBBLES UP through every parent (.service-card-content ->
   .service-card -> .services-grid -> .container -> ...) until
   it reaches document. We catch it at document level and use
   event.target.closest() to figure out which card was
   actually clicked, no matter which inner element started it.
--------------------------------------------------------- */

document.addEventListener("click", (event) => {
  const card = event.target.closest("[data-type]");
  if (!card) return; // click happened somewhere else on the page

  const type = card.dataset.type;
  const name = card.dataset.name;

  if (type === "service") {
    showToast(`Selected service: ${name} — head to Book Now to reserve.`);
  } else if (type === "barber") {
    showToast(`${name} — view availability on the Booking page.`);
  } else if (type === "style") {
    showToast(`Liked "${name}"? Try the Style Roulette or AI Style Finder to explore similar cuts.`);
  }
}, false); // false = respond during the BUBBLING phase (the default)

/* ---------------------------------------------------------
   5. EVENT CAPTURING — mobile nav menu
   ---------------------------------------------------------
   Capturing is the OPPOSITE direction: the event travels from
   document DOWN toward the actual target, before bubbling back
   up. Passing `true` as the third argument to addEventListener
   makes a listener run in this capture phase.

   We use it here to close the mobile menu on an outside click.
   Registering this listener on `document` with capture = true
   guarantees it runs before any bubbling-phase listener below
   it (like the delegation listener in section 4, or a future
   listener placed inside the menu) gets a chance to stop the
   event — so "click outside to close" stays reliable even if
   other click handling is added to the menu later.
--------------------------------------------------------- */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
function openMenu() {
  navMenu.classList.add("open");
  menuToggle.classList.add("open");
  menuToggle.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  navMenu.classList.remove("open");
  menuToggle.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", (event) => {
  // stop this click from reaching the capturing listener below,
  // otherwise opening the menu would immediately close it again
  event.stopPropagation();
  navMenu.classList.contains("open") ? closeMenu() : openMenu();
});

document.addEventListener("click", (event) => {
  if (navMenu.classList.contains("open") && !navMenu.contains(event.target)) {
    closeMenu();
  }
}, true); // true = CAPTURING phase, runs on the way down, before bubbling listeners

// also close the menu once a nav link is actually chosen
navMenu.addEventListener("click", (event) => {
  if (event.target.tagName === "A") closeMenu();
});
} // end menuToggle && navMenu guard

/* ---------------------------------------------------------
   6. ACTIVE NAV LINK ON SCROLL
--------------------------------------------------------- */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu > a[href^='#']");

if (sections.length && navLinks.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-50% 0px -45% 0px" });

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------
   7. STYLE ROULETTE (pages/roulette.html)
--------------------------------------------------------- */

const rouletteStyles = [
  { name: "Low Taper Fade", desc: "Subtle fade that stays close to the natural hairline.", maint: "Low" },
  { name: "Mid Fade", desc: "Balanced blend starting just above the ear.", maint: "Medium" },
  { name: "High Fade", desc: "Dramatic contrast — sharp and bold.", maint: "Medium" },
  { name: "Textured Crop", desc: "Choppy, matte finish on top.", maint: "Low" },
  { name: "French Crop", desc: "Short fringe with tight, clean sides.", maint: "Low" },
  { name: "Pompadour", desc: "Volume on top, swept back with hold product.", maint: "High" },
  { name: "Side Part", desc: "Clean, classic, office-ready.", maint: "Medium" },
  { name: "Buzz Cut", desc: "Uniform length, ultra low maintenance.", maint: "Low" },
  { name: "Slick Back", desc: "Polished, all hair swept backward.", maint: "High" },
  { name: "Crew Cut", desc: "Short and neat, slightly longer on top.", maint: "Low" },
];

const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");

if (wheel && spinBtn) {
  // build the wheel's conic-gradient slices + labels to match rouletteStyles
  const segAngle = 360 / rouletteStyles.length;
  const colors = ["#d5a354", "#171717"]; // alternating gold / dark slices
  const gradient = rouletteStyles.map((_, i) =>
    `${colors[i % colors.length]} ${i * segAngle}deg ${(i + 1) * segAngle}deg`
  ).join(", ");
  wheel.style.background = `conic-gradient(${gradient})`;

  const labelsEl = document.getElementById("wheelLabels");
  if (labelsEl) {
    labelsEl.innerHTML = rouletteStyles.map((s, i) => {
      const angle = i * segAngle + segAngle / 2;
      // labels on the left half would read upside-down, so flip them upright
      const flip = angle > 180 ? " flip" : "";
      const onGold = colors[i % colors.length] === "#d5a354";
      return `<div class="wheel-label${flip}" style="transform: rotate(${angle - 90}deg); color:${onGold ? "#111" : "#fff"};"><span>${s.name}</span></div>`;
    }).join("");
  }

  let spinning = false;
  let currentRotation = 0;

  function spinWheel() {
    if (spinning) return;
    spinning = true;
    spinBtn.disabled = true;
    document.getElementById("wheelResult")?.classList.remove("show");

    const idx = Math.floor(Math.random() * rouletteStyles.length);
    const targetCenter = idx * segAngle + segAngle / 2;
    // spin at least 5 full turns, landing so the pointer (fixed at top) sits on the chosen segment
    const extraTurns = 360 * 5;
    currentRotation += extraTurns + ((360 - targetCenter) - (currentRotation % 360));
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
      const s = rouletteStyles[idx];
      document.getElementById("wheelStyleName").textContent = s.name;
      document.getElementById("wheelStyleDesc").textContent = s.desc;
      document.getElementById("wheelMaint").textContent = `${s.maint} maintenance`;
      document.getElementById("wheelResult").classList.add("show");
      spinning = false;
      spinBtn.disabled = false;
    }, 4200);
  }

  spinBtn.addEventListener("click", spinWheel);
  document.getElementById("tryAnotherBtn")?.addEventListener("click", spinWheel);
}

/* ---------------------------------------------------------
   8. AI STYLE FINDER (pages/ai-style-finder.html)
   ---------------------------------------------------------
   Uses event delegation (bubbling, section 4's pattern) on the
   whole quiz form instead of one listener per option button.
--------------------------------------------------------- */

const styleLibrary = [
  { name: "Textured Crop", desc: "Matte, choppy texture that suits most face shapes.", maint: "Low", tags: ["Casual", "Trendy", "Low"] },
  { name: "Low Taper Fade", desc: "Clean and versatile — works in professional settings.", maint: "Low", tags: ["Professional", "Casual", "Low"] },
  { name: "Pompadour", desc: "Volume-forward style that elongates rounder faces.", maint: "High", tags: ["Bold", "Trendy", "High"] },
  { name: "Side Part", desc: "Sharp and structured — great for oval and square faces.", maint: "Medium", tags: ["Professional", "Medium"] },
  { name: "Buzz Cut", desc: "Zero fuss, works with any hair type.", maint: "Low", tags: ["Casual", "Low"] },
  { name: "French Crop", desc: "Trendy fringe silhouette with tight sides.", maint: "Low", tags: ["Trendy", "Bold", "Low"] },
  { name: "Slick Back", desc: "Polished look with maximum hold and shine.", maint: "High", tags: ["Bold", "High"] },
];

const quizForm = document.getElementById("quizForm");

if (quizForm) {
  const answers = {};

  // one delegated listener for every option button in the quiz —
  // bubbling means we don't need a listener on each individual button
  quizForm.addEventListener("click", (event) => {
    const opt = event.target.closest(".quiz-opt");
    if (!opt) return;
    const group = opt.closest(".quiz-row");
    group.querySelectorAll(".quiz-opt").forEach(b => b.classList.remove("sel"));
    opt.classList.add("sel");
    answers[group.dataset.q] = opt.textContent.trim();
  });

  document.getElementById("getRecsBtn").addEventListener("click", () => {
    const needed = ["face", "type", "length", "style", "maintenance"];
    const missing = needed.filter(k => !answers[k]);
    if (missing.length) {
      showToast("Please answer every question before submitting.");
      return;
    }

    const scored = styleLibrary
      .map(s => {
        let score = 0;
        if (s.tags.includes(answers.style)) score += 2;
        if (s.tags.includes(answers.maintenance)) score += 1;
        return { ...s, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const results = document.getElementById("recResults");
    results.innerHTML = scored.map(s => `
      <div class="rec-card">
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
        <p class="rec-why">Matches your ${answers.style.toLowerCase()} preference</p>
        <span class="match-tag">${s.maint} maintenance</span>
        <a href="booking.html" class="btn btn-primary" style="margin-top:16px;width:100%;">Book This Style</a>
      </div>
    `).join("");
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

/* ---------------------------------------------------------
   9. BOOKING FORM (pages/booking.html)
   ---------------------------------------------------------
   Confirmed bookings are saved to localStorage so the
   Dashboard page can show the "Upcoming Appointment" after
   navigating away — a small persistence layer between pages.
--------------------------------------------------------- */

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  const serviceSelect = document.getElementById("fService");
  const barberSelect = document.getElementById("fBarber");

  serviceSelect.innerHTML = services.map(s => `<option>${s.name}</option>`).join("");
  barberSelect.innerHTML = barbers.map(b => `<option>${b.name}</option>`).join("") + `<option>Any available</option>`;

  // pre-fill from a "Book Again" link, e.g. booking.html?service=..&barber=..&style=..
  const params = new URLSearchParams(location.search);
  if (params.get("service")) serviceSelect.value = params.get("service");
  if (params.get("barber")) barberSelect.value = params.get("barber");
  if (params.get("style")) document.getElementById("fNotes").value = `Rebooking: ${params.get("style")}`;

  document.getElementById("confirmBookingBtn").addEventListener("click", () => {
    const booking = {
      service: serviceSelect.value,
      barber: barberSelect.value,
      date: document.getElementById("fDate").value || "Today",
      time: document.getElementById("fTime").value,
      notes: document.getElementById("fNotes").value,
    };
    localStorage.setItem("fadehub_upcoming", JSON.stringify(booking));

    const box = document.getElementById("confirmBox");
    box.innerHTML = `
      <p class="eyebrow">APPOINTMENT CONFIRMED</p>
      <p>${booking.service} with ${booking.barber} on ${booking.date} at ${booking.time}.</p>
    `;
    box.classList.add("show");
    showToast("Appointment confirmed!");
  });
}

/* ---------------------------------------------------------
   10. DASHBOARD (pages/dashboard.html)
--------------------------------------------------------- */

const dashUpcoming = document.getElementById("dashUpcoming");

if (dashUpcoming) {
  const saved = JSON.parse(localStorage.getItem("fadehub_upcoming") || "null");
  dashUpcoming.innerHTML = saved
    ? `<b>${saved.service}</b> with ${saved.barber}<br>${saved.date} · ${saved.time}`
    : `No upcoming appointment — <a href="booking.html" style="color:var(--accent);">book one now</a>.`;

  const dashHistory = [
    { style: "Low Taper Fade", date: "Aug 14, 2026", barber: "P. Mark", service: "Skin Fade", price: "₱400" },
    { style: "Textured Crop", date: "Jun 2, 2026", barber: "M. Sev", service: "Haircut", price: "₱300" },
    { style: "Pompadour", date: "Mar 20, 2026", barber: "A. Justin", service: "Haircut + Beard", price: "₱480" },
  ];
  const dashFavorites = [
    { name: "Blow Out Low Taper", img: "image/blowout-low-taper.jpg", crop: "lower" },
    { name: "Warrior Cut", img: "image/warrior-cut.jpg", crop: "lower" },
    { name: "Crew Cut", img: "image/crew-cut.jpg" },
    { name: "French Crop", img: "image/french-crop.jpg" },
  ];

  document.getElementById("dashHistory").innerHTML = dashHistory.map(h => `
    <div class="hist-item">
      <div class="hist-thumb"></div>
      <div class="hist-info">
        <b>${h.style}</b>
        <div class="hist-meta">${h.date} · ${h.barber} · ${h.service} · ${h.price}</div>
      </div>
      <a class="btn btn-outline"
         href="booking.html?service=${encodeURIComponent(h.service)}&barber=${encodeURIComponent(h.barber)}&style=${encodeURIComponent(h.style)}">
        Book Again
      </a>
    </div>
  `).join("");

  document.getElementById("dashFavorites").innerHTML = dashFavorites.map(f => `
    <div class="fav-card">
      <div class="fav-thumb${f.crop ? ` fav-thumb--${f.crop}` : ""}"><img src="${f.img}" alt="${f.name} haircut" loading="lazy"></div>
      <p>${f.name}</p>
      <a class="btn btn-outline" style="width:100%;" href="booking.html?style=${encodeURIComponent(f.name)}">Book This</a>
    </div>
  `).join("");
}