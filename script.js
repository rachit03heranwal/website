// ---- Configuration ----
// Paste the LIVE Dodo Payments hosted Payment Link between the quotes below (this is the only place it goes).
const DODO_PAYMENT_URL = "https://checkout.dodopayments.com/buy/pdt_0NnxV1vid8eS4FlbF3rPx?quantity=1";
const CHROME_STORE_URL = "https://chromewebstore.google.com/detail/group-chatgpt-chats-by-da/fapiomipbkcmdlocchmnpebpcmijmkpd?authuser=0&hl=en";
const GITHUB_URL = "https://github.com/rachit03heranwal/website";

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // A URL counts as configured only if it is a real https link, not empty and not the placeholder.
  function isConfigured(url) {
    return typeof url === "string" && /^https:\/\//i.test(url.trim());
  }

  // Wire every matching element to a central URL. Opens in a new tab.
  // If the URL isn't configured, the link is kept from navigating to "#" and nothing is shown to visitors.
  function wire(selector, url) {
    const els = document.querySelectorAll(selector);
    if (isConfigured(url)) {
      els.forEach((el) => {
        el.href = url.trim();
        el.target = "_blank";
        el.rel = "noopener";
      });
    } else {
      els.forEach((el) => {
        el.addEventListener("click", (e) => e.preventDefault());
      });
      if (els.length) console.warn("[site] No URL set for " + selector + ". Edit the constants at the top of script.js.");
    }
  }

  wire("[data-dodo]", DODO_PAYMENT_URL);
  wire("[data-chrome]", CHROME_STORE_URL);
  wire("[data-github]", GITHUB_URL);

  // ---- Sidebar mockup ----
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("groupSwitch");

  function setGrouped(on) {
    sidebar.dataset.grouped = String(on);
    toggle.setAttribute("aria-checked", String(on));
  }

  toggle.addEventListener("click", () => {
    setGrouped(sidebar.dataset.grouped !== "true");
  });

  sidebar.querySelectorAll(".group-head").forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.closest(".group");
      const collapsed = group.classList.toggle("is-collapsed");
      btn.setAttribute("aria-expanded", String(!collapsed));
    });
  });

  // The flat list sorts itself into date groups on load.
  if (reduceMotion) {
    setGrouped(true);
  } else {
    let touched = false;
    toggle.addEventListener("click", () => { touched = true; }, { once: true });
    setTimeout(() => { if (!touched) setGrouped(true); }, 1400);
  }
})();
