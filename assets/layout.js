/* global window, document */

(function initThemeEarly() {
  // Check local storage immediately to prevent flash of unstyled content (FOUC)
  if (typeof window !== "undefined" && window.localStorage && localStorage.getItem("theme") === "terminal") {
    document.documentElement.setAttribute("data-theme", "terminal");
  }
})();

function isHomePage() {
  const path = window.location.pathname || "";
  return path.endsWith("/") || path.endsWith("/index.html") || path === "" || path.endsWith("index.html");
}

function currentPageKey() {
  const path = (window.location.pathname || "").toLowerCase();
  if (path.endsWith("projects.html")) return "systems";
  if (path.endsWith("writing.html")) return "writing";
  if (path.endsWith("learnings.html")) return "learnings_page";
  return "home";
}

function setActiveNav(rootEl) {
  const key = currentPageKey();
  const activeHref = key === "systems" ? "projects.html" : key === "writing" ? "writing.html" : null;
  if (!activeHref) return;

  rootEl.querySelectorAll('a.nav-link[href="' + activeHref + '"]').forEach((a) => {
    a.classList.add("active");
    a.setAttribute("aria-current", "page");
  });
}

function renderHeader() {
  const home = isHomePage();
  const brandHref = home ? "#top" : "index.html#top";

  const learningsHref = home ? "#learnings" : "index.html#learnings";
  const papersHref = home ? "#papers" : "index.html#papers";
  const contactHref = home ? "#contact" : "index.html#contact";

  return `
    <div class="scroll-progress-fixed" role="progressbar" aria-label="Page scroll progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
      <div class="scroll-progress-fill" id="scrollProgressFill"></div>
    </div>
    <div class="site-header-bar">
      <div class="container site-header-bar-inner pt-3 pb-0">
        <nav class="navbar nav-glass navbar-light px-3 py-2" aria-label="Primary">
          <div class="container-fluid px-0 align-items-center">
            <div class="site-nav-brand-wrap me-2">
              <a class="navbar-brand site-nav-brand mb-0 grad-text text-decoration-none" href="${brandHref}" aria-label="Home — Engineering Portfolio">
                Engineering Portfolio
              </a>
            </div>
            <button id="devThemeToggle" class="btn btn-ghost theme-toggle-btn me-2 flex-shrink-0" aria-label="Toggle Theme" title="Enable Developer Mode">
              <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            </button>
            <button
              class="navbar-toggler nav-toggler-glass flex-shrink-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#siteNavCollapse"
              aria-controls="siteNavCollapse"
              aria-expanded="false"
              aria-label="Open or close menu"
            >
              <span class="navbar-toggler-icon" aria-hidden="true"></span>
            </button>
            <div class="collapse navbar-collapse nav-collapse-panel" id="siteNavCollapse">
              <ul class="navbar-nav ms-auto nav-pill site-nav-menu gap-1 py-3 py-md-2">
                <li class="nav-item"><a class="nav-link" href="${learningsHref}">Learnings</a></li>
                <li class="nav-item"><a class="nav-link" href="${papersHref}">Papers</a></li>
                <li class="nav-item"><a class="nav-link" href="projects.html">Systems</a></li>
                <li class="nav-item"><a class="nav-link" href="writing.html">Writing</a></li>
                <li class="nav-item"><a class="nav-link" href="${contactHref}">Contact</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  `;
}

function renderFooter() {
  return `
    <footer class="container footer mt-auto">
      <div class="d-flex flex-column flex-md-row justify-content-between gap-2">
        <div class="meta">© <span id="year"></span> Ankit Maurya</div>
      </div>
    </footer>
  `;
}

function setupNavCollapse(rootEl) {
  const collapseEl = rootEl.querySelector("#siteNavCollapse");
  if (!collapseEl || typeof window.bootstrap === "undefined") return;
  const Collapse = window.bootstrap.Collapse;
  if (!Collapse) return;

  const toggler = rootEl.querySelector('[data-bs-target="#siteNavCollapse"]');
  collapseEl.addEventListener("shown.bs.collapse", () => {
    if (toggler) toggler.setAttribute("aria-expanded", "true");
  });
  collapseEl.addEventListener("hidden.bs.collapse", () => {
    if (toggler) toggler.setAttribute("aria-expanded", "false");
  });

  collapseEl.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const inst = Collapse.getInstance(collapseEl);
      if (inst && collapseEl.classList.contains("show")) {
        inst.hide();
      }
    });
  });
}

function initThemeToggle() {
  const toggleBtn = document.getElementById("devThemeToggle");
  if (!toggleBtn) return;

  const root = document.documentElement;

  // Sync button text on initial load
  if (root.getAttribute("data-theme") === "terminal") {
    toggleBtn.title = "Enable Normal Mode";
  } else {
    toggleBtn.title = "Enable Developer Mode";
  }

  toggleBtn.addEventListener("click", () => {
    if (root.getAttribute("data-theme") === "terminal") {
      root.removeAttribute("data-theme");
      localStorage.removeItem("theme");
      toggleBtn.title = "Enable Developer Mode";
    } else {
      root.setAttribute("data-theme", "terminal");
      localStorage.setItem("theme", "terminal");
      toggleBtn.title = "Enable Normal Mode";
    }
  });
}

function mountLayout() {
  const headerMount = document.getElementById("siteHeader");
  const footerMount = document.getElementById("siteFooter");

  if (headerMount) {
    headerMount.innerHTML = renderHeader();
    setActiveNav(headerMount);
    setupNavCollapse(headerMount);
    initThemeToggle();
  }

  if (footerMount) {
    footerMount.innerHTML = renderFooter();
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountLayout);
} else {
  mountLayout();
}
