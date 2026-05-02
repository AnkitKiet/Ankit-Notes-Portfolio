/* global window, document */

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function linesToList(lines) {
  if (!Array.isArray(lines) || lines.length === 0) return "";
  return `<ul class="text-secondary mb-0">${lines.map((l) => `<li>${escapeHtml(l)}</li>`).join("")}</ul>`;
}

function renderCard({ colClass, chip, meta, title, summary, modalId, ariaLabel }) {
  return `
    <div class="${escapeHtml(colClass)}">
      <div
        class="glass-card hover-lift p-4 js-modal-card h-100"
        role="button"
        tabindex="0"
        data-bs-toggle="modal"
        data-bs-target="#${escapeHtml(modalId)}"
        aria-label="${escapeHtml(ariaLabel)}"
      >
        <div class="d-flex align-items-center justify-content-between gap-2 mb-2">
          <div class="chip">${escapeHtml(chip)}</div>
          <div class="meta">${escapeHtml(meta || "")}</div>
        </div>
        <h3 class="h6 fw-bold mb-2">${escapeHtml(title)}</h3>
        <p class="mb-0 text-secondary">${escapeHtml(summary)}</p>
      </div>
    </div>
  `;
}

function renderModal({ modalId, chip, title, bodyHtml, link }) {
  const linkHtml = link?.url
    ? `
      <div class="mt-3">
        <a class="btn btn-primary" href="${escapeHtml(link.url)}" target="_blank" rel="noopener">
          ${escapeHtml(link.label || "Open link")}
        </a>
      </div>
    `
    : "";

  return `
    <div class="modal fade" id="${escapeHtml(modalId)}" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <div>
              <div class="chip mb-2">${escapeHtml(chip)}</div>
              <h3 class="h5 fw-bold mb-0">${escapeHtml(title)}</h3>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body pt-0">
            ${bodyHtml}
            ${linkHtml}
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-ghost" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function mountHtml(id, html) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = html;
}

function initKeyboardClick(selector) {
  document.querySelectorAll(selector).forEach((el) => {
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        el.click();
      }
    });
  });
}

function renderPapers(papers) {
  const cards = papers
    .map((p) =>
      renderCard({
        colClass: "col-12 col-md-6",
        chip: p.tag,
        meta: p.meta,
        title: p.title,
        summary: p.summary,
        modalId: p.id,
        ariaLabel: `Open paper modal: ${p.title}`,
      }),
    )
    .join("");

  const modals = papers
    .map((p) => {
      const bodyHtml = `
        <p class="text-secondary mb-3">${escapeHtml(p.summary)}</p>
        <div class="glass-card p-3 mb-3">
          <div class="fw-bold mb-2">${escapeHtml(p.gistTitle || "Gist")}</div>
          ${linesToList(p.gist)}
        </div>
      `;

      return renderModal({
        modalId: p.id,
        chip: p.tag,
        title: p.title,
        bodyHtml,
        link: { url: p.linkUrl, label: p.linkLabel },
      });
    })
    .join("");

  mountHtml("papersGrid", cards);
  mountHtml("papersModals", modals);
}

function renderProjects(projects) {
  const cards = projects
    .map((p) =>
      renderCard({
        colClass: "col-12 col-md-6 col-lg-4",
        chip: p.tag,
        meta: p.meta,
        title: p.title,
        summary: p.summary,
        modalId: p.id,
        ariaLabel: `Open project modal: ${p.title}`,
      }),
    )
    .join("");

  const modals = projects
    .map((p) => {
      const bodyHtml = `
        <p class="text-secondary mb-3">${escapeHtml(p.summary)}</p>
        ${
          p.highlights?.length
            ? `
              <div class="glass-card p-3 mb-3">
                <div class="fw-bold mb-2">${escapeHtml(p.highlightsTitle || "Highlights")}</div>
                ${linesToList(p.highlights)}
              </div>
            `
            : ""
        }
        ${
          p.learnings?.length
            ? `
              <div class="glass-card p-3 mb-3">
                <div class="fw-bold mb-2">${escapeHtml(p.learningsTitle || "Learnings")}</div>
                ${linesToList(p.learnings)}
              </div>
            `
            : ""
        }
      `;

      return renderModal({
        modalId: p.id,
        chip: p.tag,
        title: p.title,
        bodyHtml,
      });
    })
    .join("");

  mountHtml("projectsGrid", cards);
  mountHtml("projectsModals", modals);
}

function renderWriting(items) {
  const html = items
    .map((it) => {
      const right = [it.source, it.readTime].filter(Boolean).join(" · ");
      return `
        <div class="d-flex flex-column flex-md-row justify-content-between gap-2">
          <div>
            <a class="fw-bold" href="${escapeHtml(it.url || "#")}" target="_blank" rel="noopener">
              ${escapeHtml(it.title)}
            </a>
            <div class="meta">${escapeHtml(it.summary || "")}</div>
          </div>
          ${right ? `<div class="meta text-nowrap">${escapeHtml(right)}</div>` : ""}
        </div>
      `;
    })
    .join("");

  mountHtml("writingList", html);
}

function main() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const page = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  const isHome = page === "" || page === "index.html";

  const papers = window.PAPERS_DATA || [];
  const projects = window.PROJECTS_DATA || [];
  const writing = window.WRITING_DATA || [];

  renderPapers(isHome ? papers.slice(0, 2) : papers);
  renderProjects(isHome ? projects.slice(0, 6) : projects);
  renderWriting(isHome ? writing.slice(0, 4) : writing);

  // Keyboard accessibility for all modal cards (learnings + generated sections)
  initKeyboardClick(".learning-card, .js-modal-card");
}

main();

