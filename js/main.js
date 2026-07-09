/* =====================================================================
   CASRHA FOUNDATION — Interactions
   main.js  ·  vanilla JS, no dependencies
   ===================================================================== */
(function () {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header shadow ---------- */
  const header = $(".header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile nav ---------- */
  const toggle   = $(".nav__toggle");
  const menu     = $(".nav__menu");
  const backdrop = $(".nav__backdrop");
  if (toggle && menu) {
    const setOpen = (open) => {
      menu.classList.toggle("is-open", open);
      if (backdrop) backdrop.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open && window.innerWidth <= 940 ? "hidden" : "";
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    if (backdrop) backdrop.addEventListener("click", () => setOpen(false));
    $$(".nav__menu a").forEach(a => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", e => { if (e.key === "Escape") setOpen(false); });
    window.addEventListener("resize", () => { if (window.innerWidth > 940) setOpen(false); });
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = $$(".reveal");
  if (reveals.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveals.forEach(el => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      reveals.forEach(el => io.observe(el));
    }
  }

  /* ---------- Animated counters ---------- */
  const counters = $$("[data-count]");
  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    const dur = 1600;
    const start = performance.now();
    const fmt = (n) => Math.round(n).toLocaleString("en-US");
    if (reduceMotion) { el.textContent = fmt(target); return; }
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(runCounter);
    } else {
      const cio = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { runCounter(entry.target); cio.unobserve(entry.target); }
        });
      }, { threshold: 0.5 });
      counters.forEach(el => cio.observe(el));
    }
  }

  /* ---------- Fund progress bar ---------- */
  const fill = $(".fund__fill");
  if (fill) {
    const pct = fill.dataset.pct || "0";
    const fio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { fill.style.width = pct + "%"; fio.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    fio.observe(fill);
  }

  /* ---------- Gallery lightbox ---------- */
  const lightbox = $(".lightbox");
  if (lightbox) {
    const lbImg = $(".lightbox img", lightbox);
    const close = () => { lightbox.classList.remove("is-open"); document.body.style.overflow = ""; };
    $$(".gallery__item").forEach(item => {
      item.addEventListener("click", () => {
        const img = $("img", item);
        if (!img) return;
        lbImg.src = img.dataset.full || img.currentSrc || img.src;
        lbImg.alt = img.alt;
        lightbox.classList.add("is-open");
        document.body.style.overflow = "hidden";
      });
    });
    $(".lightbox__close", lightbox).addEventListener("click", close);
    lightbox.addEventListener("click", e => { if (e.target === lightbox) close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }

  /* ---------- Impact calculator ---------- */
  const calc = $(".calc");
  if (calc) {
    const chips = $$(".calc__chip", calc);
    const out = $(".calc__result-text", calc);
    // We don't estimate "children reached" — instead show how the gift is stewarded.
    const update = (amount) => {
      const naira = "₦" + Number(amount).toLocaleString("en-US");
      out.innerHTML = `Your <strong>${naira}</strong> gift helps us publish outreach articles, publicise events and trainings, support our volunteers with data and stipends, and print tracts for children and adolescents.`;
    };
    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        chips.forEach(c => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        update(parseFloat(chip.dataset.amount));
      });
    });
    if (chips[1]) chips[1].click();
  }

  /* ---------- Copy-to-clipboard (bank details) ---------- */
  $$(".copy-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const text = btn.dataset.copy || "";
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch {}
        document.body.removeChild(ta);
      }
      const label = btn.querySelector(".copy-label");
      const prev = label ? label.textContent : "";
      btn.classList.add("is-copied");
      if (label) label.textContent = "Copied!";
      setTimeout(() => { btn.classList.remove("is-copied"); if (label) label.textContent = prev; }, 1800);
    });
  });

  /* ---------- Active nav link on scroll (home) ---------- */
  const sections = $$("section[id]");
  const navLinks = $$(".nav__links a[href^='#']");
  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const map = new Map(navLinks.map(a => [a.getAttribute("href").slice(1), a]));
    const sio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => a.classList.remove("is-active"));
          const link = map.get(entry.target.id);
          if (link) link.classList.add("is-active");
        }
      });
    }, { threshold: 0.4, rootMargin: "-30% 0px -50% 0px" });
    sections.forEach(s => sio.observe(s));
  }

  /* ---------- Event countdown (SAC page) ----------
     Driven by markup so it stays generic across years:
       data-countdown="<event start ISO>"  (required)
       data-countdown-end="<event end ISO>" (optional; enables the "live" window)
     Compares against the visitor's current clock on each tick. */
  const cd = $("[data-countdown]");
  if (cd) {
    const startAt = new Date(cd.dataset.countdown).getTime();
    const endRaw  = cd.dataset.countdownEnd;
    const endAt   = endRaw ? new Date(endRaw).getTime() : NaN;
    const numEls  = {
      days:    $("[data-cd='days']", cd),
      hours:   $("[data-cd='hours']", cd),
      minutes: $("[data-cd='minutes']", cd),
      seconds: $("[data-cd='seconds']", cd),
    };
    const grid    = $(".countdown", cd);
    const status  = $(".countdown__status", cd);
    const valid   = !Number.isNaN(startAt) && Object.values(numEls).every(Boolean);

    if (valid) {
      const pad = (n) => String(n).padStart(2, "0");
      let timer = null;
      const render = () => {
        const now = Date.now();

        if (now < startAt) {                       // before it begins → count down
          let diff = Math.floor((startAt - now) / 1000);
          const d = Math.floor(diff / 86400); diff -= d * 86400;
          const h = Math.floor(diff / 3600);  diff -= h * 3600;
          const m = Math.floor(diff / 60);    const s = diff - m * 60;
          numEls.days.textContent    = d;
          numEls.hours.textContent   = pad(h);
          numEls.minutes.textContent = pad(m);
          numEls.seconds.textContent = pad(s);
          return;
        }

        // event started
        if (grid) grid.classList.add("hide");
        if (status) {
          const live = !Number.isNaN(endAt) && now <= endAt;
          status.innerHTML = live
            ? '<span class="countdown__live">Live now — join us</span>'
            : "This year’s conference has concluded. Thank you for joining us — see you next year!";
        }
        if (timer) { clearInterval(timer); timer = null; }
      };
      render();
      if (Date.now() < startAt) timer = setInterval(render, 1000);
    }
  }
})();
