/* global window, document */
(function () {
  "use strict";

  function scrollableRange() {
    const el = document.documentElement;
    return Math.max(0, el.scrollHeight - el.clientHeight);
  }

  function updateScrollProgress() {
    const fill = document.getElementById("scrollProgressFill");
    const track = fill && fill.closest(".scroll-progress-fixed");
    const y = window.scrollY || document.documentElement.scrollTop;
    const max = scrollableRange();
    const pct = max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0;
    const pctRounded = Math.round(pct);

    if (fill) fill.style.width = pct + "%";
    if (track) track.setAttribute("aria-valuenow", String(pctRounded));
  }

  let scheduled = false;
  function onScroll() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      updateScrollProgress();
    });
  }

  function init() {
    updateScrollProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
