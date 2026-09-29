const $ = s => document.querySelector(s);
const COLORS = { "AI/ML": "#7c3aed", "Web Development": "#0f766e", "App Development": "#2563eb", "IoT": "#c2410c", "Design": "#be185d" };
const state = { q: "", cat: "All", tech: "All", sort: "featured", month: null };
let openList = [];
let currentId = null;

// generated thumbnail -- coloured banner with initials, no image files to break
function thumb(p) {
  const c = COLORS[p.category] || "#334155", o = (p.id % 4) * 20;
  const ini = p.title.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'><rect width='400' height='225' fill='${c}'/>` +
    `<path d='M${40 + o} 190H180V120H270V60H370' fill='none' stroke='#fff' stroke-opacity='.3' stroke-width='3'/>` +
    `<g fill='#fff'><circle cx='${40 + o}' cy='190' r='8'/><circle cx='180' cy='120' r='8'/><circle cx='270' cy='60' r='8'/><circle cx='370' cy='60' r='8'/></g>` +
    `<text x='24' y='80' font-family='Arial,sans-serif' font-size='52' font-weight='700' fill='#fff'>${ini}</text></svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}
const stClass = s => s === "Active" ? "act" : s === "In Development" ? "dev" : "";
const hash = p => (p.id * 2654435761 >>> 0).toString(16).slice(0, 7);
const month = d => new Date(d + "-01").toLocaleDateString("en-IN", { month: "short", year: "numeric" });

function card(p) {
  const tags = p.tech.slice(0, 3).map(t => `<span class="tag">${t}</span>`).join("");
  const gh = p.github ? `<a href="${p.github}" target="_blank" rel="noopener">GitHub</a>` : "";
  const demo = p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">Live demo</a>` : "";
  return `<article class="card" data-id="${p.id}">
    <img src="${thumb(p)}" alt="${p.title} project thumbnail" loading="lazy">
    <div class="in">
      <div class="meta"><span>${p.category}</span><span class="st ${stClass(p.status)}">${p.status}</span></div>
      <h3>${p.title}</h3>
      <p>${p.tagline}</p>
      <div class="tags">${tags}</div>
      <div class="by">By ${p.team.join(", ")}</div>
      <div class="acts">${gh}${demo}<a href="#" data-open="${p.id}">Details</a></div>
    </div></article>`;
}

function visible() {
  const q = state.q.trim().toLowerCase();
  const list = projects.filter(p =>
    (state.cat === "All" || p.category === state.cat) &&
    (state.tech === "All" || p.tech.includes(state.tech)) &&
    (state.month === null || p.date === state.month) &&
    (!q || [p.title, p.tagline, p.category, ...p.tech, ...p.team].join(" ").toLowerCase().includes(q)));
  const by = {
    newest: (a, b) => b.date.localeCompare(a.date),
    title: (a, b) => a.title.localeCompare(b.title),
    featured: (a, b) => (b.featured - a.featured) || b.date.localeCompare(a.date)
  };
  return list.sort(by[state.sort]);
}

function render() {
  const list = visible();
  $("#grid").innerHTML = list.map(card).join("");
  $("#empty").hidden = list.length > 0;
  $("#count").textContent = `Showing ${list.length} of ${projects.length} projects`;
  document.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c.dataset.cat === state.cat));
  $("#monthNote").hidden = !state.month;
  if (state.month) $("#monthLabel").textContent = month(state.month);
}

function modalHtml(p) {
  const gh = p.github ? `<a class="btn primary" href="${p.github}" target="_blank" rel="noopener">View on GitHub</a>` : "";
  const demo = p.demo ? `<a class="btn" href="${p.demo}" target="_blank" rel="noopener">Open live demo</a>` : "";
  const none = (!p.github && !p.demo) ? `<span class="note">Repository and live demo links will be added when available.</span>` : "";
  return `<img src="${thumb(p)}" alt="${p.title} project thumbnail">
    <div class="m-in">
      <div class="meta"><span>${p.category} &middot; ${month(p.date)}</span><span class="st ${stClass(p.status)}">${p.status}</span></div>
      <h2 id="m-title">${p.title}</h2>
      <p>${p.tagline}</p>
      <h3>The problem</h3><p>${p.problem}</p>
      <h3>The solution</h3><p>${p.solution}</p>
      <h3>Tech stack</h3><div class="tags">${p.tech.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      <h3>Team</h3><p>${p.team.join(", ")}</p>
      <div class="m-btns">${gh}${demo}${none}<button class="btn ghost" data-copy="${p.id}">Copy link</button></div>
    </div>`;
}

function openProject(id) {
  const p = projects.find(x => x.id == id);
  if (!p) return;
  openList = visible().some(x => x.id == id) ? visible() : projects;
  currentId = p.id;
  $("#m-body").innerHTML = modalHtml(p);
  if (!$("#modal").open) $("#modal").showModal();
  history.replaceState(null, "", "#p-" + p.id);
}
function navModal(dir) {
  if (!openList.length) return;
  const idx = openList.findIndex(p => p.id === currentId);
  const next = openList[(idx + dir + openList.length) % openList.length];
  openProject(next.id);
}
function closeModal() { $("#modal").close(); }

// ship-log heatmap: one cell per month between the earliest and latest project
function monthsRange() {
  const dates = projects.map(p => p.date).sort();
  let [y, m] = dates[0].split("-").map(Number);
  const [ey, em] = dates[dates.length - 1].split("-").map(Number);
  const out = [];
  while (y < ey || (y === ey && m <= em)) {
    out.push(`${y}-${String(m).padStart(2, "0")}`);
    m++; if (m > 12) { m = 1; y++; }
  }
  return out;
}
function renderHeatmap() {
  const months = monthsRange();
  const counts = {};
  projects.forEach(p => counts[p.date] = (counts[p.date] || 0) + 1);
  const max = Math.max(1, ...Object.values(counts));
  $("#heatmap").innerHTML = months.map(m => {
    const n = counts[m] || 0;
    const lvl = n === 0 ? 0 : Math.min(4, Math.ceil(n / max * 4));
    const label = new Date(m + "-01").toLocaleDateString("en-IN", { month: "short" });
    const desc = `${n} project${n === 1 ? "" : "s"} shipped in ${month(m)}`;
    return `<button class="hcell" data-m="${m}" data-lvl="${lvl}" aria-pressed="${state.month === m}" aria-label="${desc}" title="${desc}">
      <span class="hmonth">${label}</span>
    </button>`;
  }).join("");
}

// setup
const cats = ["All", ...new Set(projects.map(p => p.category))];
$("#chips").innerHTML = cats.map(c => `<button class="chip" data-cat="${c}" aria-pressed="false">${c}</button>`).join("");
const techs = [...new Set(projects.flatMap(p => p.tech))].sort();
$("#tech").innerHTML = `<option value="All">All technologies</option>` + techs.map(t => `<option>${t}</option>`).join("");
$("#featGrid").innerHTML = projects.filter(p => p.featured).map(card).join("");
$("#gitlog").innerHTML = [...projects].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6).map(p =>
  `<li style="--c:${COLORS[p.category]}"><button data-open="${p.id}"><b><span class="hash">${hash(p)}</span>${p.title}</b><span class="m">${p.category}, ${month(p.date)}</span></button></li>`).join("");

$("#stat-projects").textContent = String(projects.length).padStart(2, "0");
$("#stat-domains").textContent = String(cats.length - 1).padStart(2, "0");
const catCounts = {};
cats.slice(1).forEach(c => catCounts[c] = projects.filter(p => p.category === c).length);
const setNode = (id, n) => { const el = document.getElementById(id); if (el) el.textContent = `${String(n).padStart(2, "0")} project${n === 1 ? "" : "s"}`; };
setNode("node-main", projects.length);
setNode("node-aiml", catCounts["AI/ML"] || 0);
setNode("node-web", catCounts["Web Development"] || 0);
setNode("node-iot", catCounts["IoT"] || 0);
setNode("node-design", catCounts["Design"] || 0);
setNode("node-app", catCounts["App Development"] || 0);

renderHeatmap();

// events
$("#search").addEventListener("input", e => { state.q = e.target.value; render(); });
$("#tech").addEventListener("change", e => { state.tech = e.target.value; render(); });
$("#sort").addEventListener("change", e => { state.sort = e.target.value; render(); });
$("#chips").addEventListener("click", e => { const b = e.target.closest(".chip"); if (b) { state.cat = b.dataset.cat; render(); } });
$("#reset").addEventListener("click", () => {
  Object.assign(state, { q: "", cat: "All", tech: "All", month: null });
  $("#search").value = ""; $("#tech").value = "All"; render(); renderHeatmap();
});
$("#clearMonth").addEventListener("click", () => { state.month = null; render(); renderHeatmap(); });
$("#heatmap").addEventListener("click", e => {
  const b = e.target.closest(".hcell"); if (!b) return;
  const m = b.dataset.m;
  state.month = state.month === m ? null : m;
  render(); renderHeatmap();
  $("#projects").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.addEventListener("click", e => {
  const opener = e.target.closest("[data-open]");
  if (opener) { e.preventDefault(); openProject(opener.dataset.open); return; }
  const c = e.target.closest(".card");
  if (c && !e.target.closest("a")) openProject(c.dataset.id);
});
$("#m-body").addEventListener("click", e => {
  const cb = e.target.closest("[data-copy]");
  if (!cb || !navigator.clipboard) return;
  navigator.clipboard.writeText(location.href).then(() => {
    const old = cb.textContent; cb.textContent = "Copied!";
    setTimeout(() => cb.textContent = old, 1500);
  });
});
$("#close").addEventListener("click", closeModal);
$("#prev").addEventListener("click", () => navModal(-1));
$("#next").addEventListener("click", () => navModal(1));
$("#modal").addEventListener("click", e => { if (e.target === $("#modal")) closeModal(); });
$("#modal").addEventListener("close", () => history.replaceState(null, "", location.pathname + location.search));
$("#modal").addEventListener("keydown", e => {
  if (e.key === "ArrowRight") { e.preventDefault(); navModal(1); }
  if (e.key === "ArrowLeft") { e.preventDefault(); navModal(-1); }
});
document.addEventListener("keydown", e => {
  if (e.key === "/" && !["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    e.preventDefault(); $("#search").focus();
  }
});
$("#burger").addEventListener("click", () => {
  const open = $("#menu").classList.toggle("open");
  $("#burger").setAttribute("aria-expanded", open);
});
$("#menu").addEventListener("click", () => { $("#menu").classList.remove("open"); $("#burger").setAttribute("aria-expanded", false); });

render();
const initHash = location.hash.match(/^#p-(\d+)$/);
if (initHash) openProject(Number(initHash[1]));
