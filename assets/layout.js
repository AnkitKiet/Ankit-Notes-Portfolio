/* global window, document */

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
    <header class="container position-sticky top-0 z-3 pt-3">
      <nav class="navbar nav-glass px-3 py-2">
        <div class="container-fluid px-0">
          <a class="navbar-brand fw-bold d-flex align-items-center gap-2" href="${brandHref}" aria-label="Home">
            <span class="chip">Backend</span>
            <span class="d-none d-sm-inline text-nowrap">Engineering Portfolio</span>
          </a>

          <div class="d-flex align-items-center ms-auto">
            <ul class="nav nav-pill align-items-center gap-1">
              <li class="nav-item"><a class="nav-link" href="${learningsHref}">Learnings</a></li>
              <li class="nav-item"><a class="nav-link" href="${papersHref}">Papers</a></li>
              <li class="nav-item"><a class="nav-link" href="projects.html">Systems</a></li>
              <li class="nav-item"><a class="nav-link" href="writing.html">Writing</a></li>
              <li class="nav-item"><a class="nav-link" href="${contactHref}">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
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

function mountLayout() {
  const headerMount = document.getElementById("siteHeader");
  const footerMount = document.getElementById("siteFooter");

  if (headerMount) {
    headerMount.innerHTML = renderHeader();
    setActiveNav(headerMount);
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

