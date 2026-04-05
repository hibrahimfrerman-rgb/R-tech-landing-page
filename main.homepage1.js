const config = {
  // Replace with the seller WhatsApp number in international format, no +, no spaces.
  // Example (Kenya): 254712345678
  whatsappPhone: "254700000000",
  defaultMessage: "Hi! I'd like a quote. Please share details.",
};

function buildWhatsAppLink(message) {
  const text = encodeURIComponent(message ?? config.defaultMessage);
  return `https://wa.me/${config.whatsappPhone}?text=${text}`;
}

function setHref(id, href) {
  const el = document.getElementById(id);
  if (el) el.href = href;
}

function initWhatsAppLinks() {
  const link = buildWhatsAppLink();
  setHref("whatsAppUsTop", link);
  setHref("whatsAppUsMid", link);
  setHref("waCardLink", link);
  setHref("waFooterLink", link);
}

function initNav() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const next = !(toggle.getAttribute("aria-expanded") === "true");
    toggle.setAttribute("aria-expanded", String(next));
    menu.classList.toggle("is-open", next);
  });

  menu.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
  });
}

function initHighlightsCarousel() {
  const root = document.getElementById("highlightsCarousel");
  if (!root) return;

  const track = root.querySelector(".carousel__track");
  if (!track) return;

  const slides = Array.from(root.querySelectorAll(".carousel__slide"));
  const dots = Array.from(root.querySelectorAll(".dot"));
  const prevBtn = root.querySelector('[data-carousel="prev"]');
  const nextBtn = root.querySelector('[data-carousel="next"]');
  let autoTimer = 0;

  function clampIndex(index) {
    return Math.max(0, Math.min(slides.length - 1, index));
  }

  function getActiveIndex() {
    const width = track.clientWidth || 1;
    return clampIndex(Math.round(track.scrollLeft / width));
  }

  function setActiveDot(index) {
    dots.forEach((dot, i) => dot.classList.toggle("dot--active", i === index));
  }

  function goTo(index, behavior = "smooth") {
    const next = clampIndex(index);
    const left = next * track.clientWidth;
    track.scrollTo({ left, behavior });
    setActiveDot(next);
  }

  function goPrev() {
    const idx = getActiveIndex();
    goTo(idx === 0 ? slides.length - 1 : idx - 1);
  }
  function goNext() {
    const idx = getActiveIndex();
    goTo(idx === slides.length - 1 ? 0 : idx + 1);
  }

  function stopAuto() {
    if (autoTimer) window.clearInterval(autoTimer);
    autoTimer = 0;
  }
  function startAuto() {
    stopAuto();
    autoTimer = window.setInterval(() => {
      if (document.hidden) return;
      goNext();
    }, 4500);
  }

  if (prevBtn)
    prevBtn.addEventListener("click", () => {
      stopAuto();
      goPrev();
      startAuto();
    });
  if (nextBtn)
    nextBtn.addEventListener("click", () => {
      stopAuto();
      goNext();
      startAuto();
    });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = Number(dot.getAttribute("data-slide") || "0");
      stopAuto();
      goTo(idx);
      startAuto();
    });
  });

  let raf = 0;
  track.addEventListener("scroll", () => {
    if (raf) return;
    raf = window.requestAnimationFrame(() => {
      raf = 0;
      setActiveDot(getActiveIndex());
    });
  });

  track.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      stopAuto();
      goPrev();
      startAuto();
    }
    if (event.key === "ArrowRight") {
      stopAuto();
      goNext();
      startAuto();
    }
  });

  let dragging = false;
  let startX = 0;
  let startLeft = 0;
  track.addEventListener("pointerdown", (event) => {
    dragging = true;
    startX = event.clientX;
    startLeft = track.scrollLeft;
    track.setPointerCapture(event.pointerId);
    stopAuto();
  });
  track.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const dx = event.clientX - startX;
    track.scrollLeft = startLeft - dx;
  });
  function endDrag() {
    dragging = false;
    startAuto();
  }
  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);

  root.addEventListener("pointerenter", stopAuto);
  root.addEventListener("pointerleave", startAuto);
  root.addEventListener("focusin", stopAuto);
  root.addEventListener("focusout", startAuto);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAuto();
    else startAuto();
  });

  startAuto();
}

function initQuoteForm() {
  const form = document.getElementById("quote");
  const hint = document.getElementById("formHint");
  const sendViaWhatsApp = document.getElementById("sendViaWhatsApp");

  if (!form || !hint || !sendViaWhatsApp) return;

  function buildMessage() {
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const lines = [
      "R-tech gear - Quote request",
      name ? `Name: ${name}` : null,
      phone ? `Phone: ${phone}` : null,
      email ? `Email: ${email}` : null,
      message ? `Message: ${message}` : null,
    ].filter(Boolean);

    return lines.join("\n");
  }

  function openWhatsApp(message) {
    const link = buildWhatsAppLink(message);
    const opened = window.open(link, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = link;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const msg = buildMessage();
    hint.textContent =
      'Request ready. Click "Send via WhatsApp" for the fastest response, or connect this form to your email/backend.';
    sendViaWhatsApp.focus();
    form.dataset.lastMessage = msg;
  });

  sendViaWhatsApp.addEventListener("click", () => {
    if (typeof form.reportValidity === "function" && !form.reportValidity()) return;
    const msg = form.dataset.lastMessage || buildMessage();
    openWhatsApp(msg);
  });
}

function initYear() {
  const yearEl = document.getElementById("year");
  if (!yearEl) return;
  yearEl.textContent = String(new Date().getFullYear());
}

initWhatsAppLinks();
initNav();
initHighlightsCarousel();
initQuoteForm();
initYear();

