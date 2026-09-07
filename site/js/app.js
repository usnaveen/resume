const STORAGE_KEY = "naveen-resume-v7";

const state = {
  data: null,
  editing: false,
};

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (!parsed.courseProjects) parsed.courseProjects = clone(window.DEFAULT_RESUME.courseProjects || []);
      return parsed;
    }
  } catch (_) {
    /* ignore */
  }
  return clone(window.DEFAULT_RESUME);
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
}

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function mdToHtml(s) {
  return escapeHtml(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function htmlToMd(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  const walk = (node) => {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent;
    if (node.nodeType !== Node.ELEMENT_NODE) return "";
    const name = node.nodeName;
    const inner = [...node.childNodes].map(walk).join("");
    if (name === "STRONG" || name === "B") return `**${inner}**`;
    if (name === "EM" || name === "I") return `*${inner}*`;
    if (name === "BR") return "\n";
    if (name === "DIV" || name === "P") return inner + (inner ? "\n" : "");
    return inner;
  };
  return walk(tmp).replace(/\n+/g, " ").trim();
}

function setPath(obj, path, value) {
  const keys = path.split(".");
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    cur = cur[k];
  }
  cur[keys[keys.length - 1]] = value;
}

function getPath(obj, path) {
  return path.split(".").reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
}

function ce(path, extra = "") {
  const raw = getPath(state.data, path);
  if (state.editing) {
    return `<span contenteditable="true" data-path="${path}" data-kind="text" ${extra}>${escapeHtml(raw)}</span>`;
  }
  return `<span ${extra}>${escapeHtml(raw)}</span>`;
}

function ceMd(path) {
  const raw = getPath(state.data, path);
  if (state.editing) {
    return `<span contenteditable="true" data-path="${path}" data-kind="md">${mdToHtml(raw)}</span>`;
  }
  return mdToHtml(raw);
}

function actions(kind, index) {
  return `<div class="row-actions no-print">
    <button type="button" class="icon-btn minus" data-act="remove" data-kind="${kind}" data-index="${index}" title="Remove">−</button>
  </div>`;
}

function addBtn(kind, label) {
  return `<button type="button" class="add-row no-print" data-act="add" data-kind="${kind}">+ ${label}</button>`;
}

function iconGithub() {
  return `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.65 7.65 0 0 1 8 3.64c.68 0 1.36.09 2 .26 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>`;
}

function iconLinkedin() {
  return `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M14.5 0h-13C.67 0 0 .67 0 1.5v13C0 15.33.67 16 1.5 16h13c.83 0 1.5-.67 1.5-1.5v-13C16 .67 15.33 0 14.5 0zM4.75 13.5H2.4V6h2.35v7.5zM3.57 4.96a1.36 1.36 0 1 1 0-2.72 1.36 1.36 0 0 1 0 2.72zM13.6 13.5h-2.35V9.85c0-.87-.02-1.99-1.21-1.99-1.21 0-1.4.95-1.4 1.93v3.71H6.29V6h2.25v1.03h.03c.31-.59 1.08-1.21 2.22-1.21 2.38 0 2.81 1.56 2.81 3.59v4.09z"/></svg>`;
}

function headerHTML() {
  const gh = state.editing
    ? `${iconGithub()} ${ce("githubLabel")}`
    : `<a href="${escapeHtml(state.data.github)}" target="_blank" rel="noopener">${iconGithub()}${escapeHtml(state.data.githubLabel)}</a>`;
  const li = state.editing
    ? `${iconLinkedin()} ${ce("linkedinLabel")}`
    : `<a href="${escapeHtml(state.data.linkedin)}" target="_blank" rel="noopener">${iconLinkedin()}${escapeHtml(state.data.linkedinLabel)}</a>`;

  return `
    <header class="hdr">
      <div class="hdr-text">
        <div class="name-row">
          <div class="name">${ce("name")}</div>
          <div class="roll">${ce("roll")}</div>
          <div class="roll">${ce("pr")}</div>
        </div>
        <div class="institute">${ce("institute")}</div>
        <div class="contact">
          <span>${gh}</span>
          <span>${li}</span>
        </div>
      </div>
      <img class="logo" src="assets/iitm-logo.png" alt="IIT Madras">
    </header>`;
}

function educationHTML() {
  const rows = state.data.education
    .map(
      (row, i) => `
      <tr class="item">
        <td class="edu-program">${ce(`education.${i}.program`)}${actions("education", i)}</td>
        <td class="edu-inst">${ce(`education.${i}.institute`)}</td>
        <td class="edu-score">${ce(`education.${i}.score`)}</td>
        <td class="edu-year">${ce(`education.${i}.year`)}</td>
      </tr>`
    )
    .join("");

  const scholastic = state.data.scholastic
    .map(
      (s, i) => `
      <li class="item">${ceMd(`scholastic.${i}`)}${actions("scholastic", i)}</li>`
    )
    .join("");

  return `
    <section class="block">
      <table class="resume">
        <colgroup><col class="c-prog"><col class="c-inst"><col class="c-num"><col class="c-num"></colgroup>
        <tr><td class="sec" colspan="4">Education and Scholastic Achievements</td></tr>
        <tr class="cols">
          <th>Program</th><th>Institute</th><th>% / CGPA</th><th>Year</th>
        </tr>
        ${rows}
        <tr>
          <td class="note" colspan="4">
            <ul>${scholastic}</ul>
            ${addBtn("scholastic", "Add scholastic note")}
          </td>
        </tr>
      </table>
      ${addBtn("education", "Add education row")}
    </section>`;
}

function labeledBlock(title, kind, items, labelFn, extraBtn) {
  const rows = items
    .map((item, i) => {
      const bullets = item.bullets
        .map(
          (b, j) => `
          <li class="item">${ceMd(`${kind}.${i}.bullets.${j}`)}
            ${actions(`${kind}-bullet:${i}`, j)}
          </li>`
        )
        .join("");
      const summary =
        item.summary == null
          ? ""
          : `<div class="summary">${ceMd(`${kind}.${i}.summary`)}</div>`;
      return `
        <tr class="item">
          <td class="lab">${labelFn(i)}${actions(kind, i)}</td>
          <td>
            ${summary}
            <ul class="bullets">${bullets}</ul>
            ${addBtn(`${kind}-bullet:${i}`, "Add bullet")}
          </td>
        </tr>`;
    })
    .join("");

  return `
    <section class="block">
      <table class="resume">
        <colgroup><col class="c-lab"><col></colgroup>
        <tr><td class="sec" colspan="2">${title}</td></tr>
        ${rows}
      </table>
      ${addBtn(kind, extraBtn)}
    </section>`;
}

function experienceHTML() {
  return labeledBlock(
    "Professional Experience",
    "experience",
    state.data.experience,
    (i) => `
      ${ce(`experience.${i}.org`)}
      <span class="role">${ce(`experience.${i}.role`)}</span>
      <span class="dates">(${ce(`experience.${i}.dates`)})</span>`,
    "Add experience"
  );
}

function projectLabelHTML(kind, i) {
  const item = state.data[kind][i];
  const link = state.editing
    ? `<span class="sub">${ce(`${kind}.${i}.linkLabel`)}</span>`
    : `<a href="${escapeHtml(item.link)}" target="_blank" rel="noopener">${escapeHtml(item.linkLabel)}</a>`;
  return `
    ${ce(`${kind}.${i}.title`)}
    <span class="sub">${ce(`${kind}.${i}.subtitle`)}</span>
    <span class="dates">(${ce(`${kind}.${i}.dates`)})</span>
    ${link}`;
}

function projectBodyHTML(kind, i) {
  const item = state.data[kind][i];
  const bullets = item.bullets
    .map(
      (b, j) => `
      <li class="item">${ceMd(`${kind}.${i}.bullets.${j}`)}
        ${actions(`${kind}-bullet:${i}`, j)}
      </li>`
    )
    .join("");
  const summary =
    item.summary == null
      ? ""
      : `<div class="summary">${ceMd(`${kind}.${i}.summary`)}</div>`;
  return `
    ${summary}
    <ul class="bullets">${bullets}</ul>
    ${addBtn(`${kind}-bullet:${i}`, "Add bullet")}`;
}

function projectsHTML() {
  if (!state.data.courseProjects) state.data.courseProjects = [];

  const personal = state.data.projects
    .map(
      (item, i) => `
      <tr class="item">
        <td class="lab" colspan="2">${projectLabelHTML("projects", i)}${actions("projects", i)}</td>
        <td>${projectBodyHTML("projects", i)}</td>
      </tr>`
    )
    .join("");

  const course = state.data.courseProjects;
  const n = course.length;
  const courseRows = course
    .map((item, i) => {
      const banner =
        i === 0
          ? `<td class="course-banner" rowspan="${Math.max(n, 1)}"><div class="course-banner-text">Course Projects</div></td>`
          : "";
      return `
      <tr class="item course-row">
        ${banner}
        <td class="lab">${projectLabelHTML("courseProjects", i)}${actions("courseProjects", i)}</td>
        <td>${projectBodyHTML("courseProjects", i)}</td>
      </tr>`;
    })
    .join("");

  return `
    <section class="block">
      <table class="resume projects-table">
        <colgroup><col class="c-course"><col class="c-lab"><col></colgroup>
        <tr><td class="sec" colspan="3">Projects</td></tr>
        ${personal}
        ${courseRows}
      </table>
      ${addBtn("projects", "Add project")}
      ${addBtn("courseProjects", "Add course project")}
    </section>`;
}

function publicationHTML() {
  return `
    <section class="block">
      <table class="resume">
        <colgroup><col class="c-lab"><col></colgroup>
        <tr><td class="sec" colspan="2">Publication</td></tr>
        <tr>
          <td class="lab">
            ${ce("publication.label")}
            <span class="dates">(${ce("publication.dates")})</span>
          </td>
          <td>${ceMd("publication.text")}</td>
        </tr>
      </table>
    </section>`;
}

function porHTML() {
  return labeledBlock(
    "Positions of Responsibility",
    "por",
    state.data.por,
    (i) => `
      ${ce(`por.${i}.title`)}
      <span class="sub">${ce(`por.${i}.org`)}</span>
      <span class="dates">(${ce(`por.${i}.dates`)})</span>`,
    "Add position"
  );
}

function skillsHTML() {
  const skills = state.data.skills;
  let skillRows = "";
  for (let i = 0; i < skills.length; i++) {
    skillRows += `<tr class="item">
      <td class="lab">${ce(`skills.${i}.category`)}${actions("skills", i)}</td>
      <td class="item">${ce(`skills.${i}.items`)}</td>
    </tr>`;
  }
  return `
    <section class="block">
      <table class="resume">
        <colgroup><col class="c-lab"><col></colgroup>
        <tr><td class="sec" colspan="2">Skills</td></tr>
        ${skillRows}
      </table>
      ${addBtn("skills", "Add skill row")}
    </section>`;
}

function coursesHTML() {
  const courseSpans = state.data.courses
    .map(
      (c, i) =>
        `<span class="item">${ce(`courses.${i}`)}${actions("courses", i)}</span>`
    )
    .join(" · ");
  return `
    <section class="block">
      <table class="resume">
        <tr><td class="sec">Courses</td></tr>
        <tr>
          <td class="note">
            ${courseSpans}
            ${addBtn("courses", "Add course")}
          </td>
        </tr>
      </table>
    </section>`;
}

function extrasHTML() {
  const items = state.data.extras
    .map(
      (s, i) => `
      <li class="item">${ceMd(`extras.${i}`)}${actions("extras", i)}</li>`
    )
    .join("");
  return `
    <section class="block">
      <table class="resume">
        <tr><td class="sec">Achievements and Extra-Curriculars</td></tr>
        <tr>
          <td class="note">
            <ul>${items}</ul>
            ${addBtn("extras", "Add item")}
          </td>
        </tr>
      </table>
    </section>`;
}

function footnotesHTML() {
  if (state.data.footnotes == null) return "";
  return `<div class="footnotes">${ce("footnotes")}</div>`;
}

function render() {
  const sheet = document.getElementById("sheet");
  sheet.classList.toggle("editing", state.editing);
  sheet.innerHTML = [
    headerHTML(),
    educationHTML(),
    skillsHTML(),
    coursesHTML(),
    experienceHTML(),
    projectsHTML(),
    publicationHTML(),
    porHTML(),
    extrasHTML(),
    footnotesHTML(),
  ].join("");

  document.getElementById("btn-view").classList.toggle("active", !state.editing);
  document.getElementById("btn-edit").classList.toggle("active", state.editing);
  document.getElementById("edit-hint").hidden = !state.editing;

  const layout = () => {
    measureFit();
    scaleSheet();
  };
  requestAnimationFrame(layout);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(layout);
  }
}

function mmToPx(mm) {
  const el = document.createElement("div");
  el.style.cssText = `width:${mm}mm;position:absolute;visibility:hidden;`;
  document.body.appendChild(el);
  const px = el.getBoundingClientRect().width;
  el.remove();
  return px;
}

function measureFit() {
  const sheet = document.getElementById("sheet");
  const badge = document.getElementById("fit-badge");
  const clone = sheet.cloneNode(true);
  clone.classList.remove("editing", "over");
  clone.querySelectorAll(".no-print, .add-row, .row-actions").forEach((el) => el.remove());
  clone.style.cssText =
    "position:absolute;left:-9999px;top:0;transform:none;height:auto;min-height:0;box-shadow:none;";
  document.body.appendChild(clone);
  const pagePx = mmToPx(297);
  const used = clone.scrollHeight;
  clone.remove();
  const extraMm = ((used - pagePx) / pagePx) * 297;
  sheet.classList.toggle("over", extraMm > 1.2 && !state.editing);

  if (extraMm <= 1.2) {
    badge.textContent = "Fits 1 page";
    badge.className = "badge ok";
  } else if (extraMm <= 8) {
    badge.textContent = `Tight · +${extraMm.toFixed(0)} mm`;
    badge.className = "badge warn";
  } else {
    badge.textContent = `Overflow ${extraMm.toFixed(0)} mm`;
    badge.className = "badge bad";
  }
}

function scaleSheet() {
  const wrap = document.querySelector(".sheet-wrap");
  const sheet = document.getElementById("sheet");
  const stage = document.querySelector(".stage");
  if (!wrap || !sheet) return;
  wrap.style.zoom = "1";
  sheet.style.transform = "none";
  wrap.style.width = "210mm";
  wrap.style.height = "auto";
  const pagePx = mmToPx(210);
  const avail = stage ? stage.clientWidth : document.documentElement.clientWidth - 16;
  const scale = Math.min(1, Math.max(0.2, avail / pagePx));
  sheet.style.transformOrigin = "top left";
  sheet.style.transform = scale < 0.999 ? `scale(${scale})` : "none";
  wrap.style.width = `${pagePx * scale}px`;
  wrap.style.height = `${sheet.scrollHeight * scale}px`;
}

function blankOf(kind) {
  switch (kind) {
    case "education":
      return { program: "Program", institute: "Institute", score: "—", year: "20XX" };
    case "scholastic":
      return "New scholastic achievement";
    case "experience":
      return {
        org: "Company, City",
        role: "Role",
        dates: "Mon'YY – Mon'YY",
        summary: "One-line summary of the project",
        bullets: ["Impact with a metric"],
      };
    case "projects":
    case "courseProjects":
      return {
        title: "Project",
        subtitle: "Subtitle",
        dates: "Mon'YY – Present",
        link: "https://github.com/usnaveen",
        linkLabel: "GitHub",
        summary: "One-line summary of the project",
        bullets: ["What you built and why it matters"],
      };
    case "por":
      return {
        title: "Role",
        org: "Organization",
        dates: "Mon'YY – Mon'YY",
        summary: "One-line summary of the role",
        bullets: ["What you owned"],
      };
    case "courses":
      return "New course";
    case "skills":
      return { category: "Category", items: "Tools, libraries" };
    case "extras":
      return "New achievement";
    default:
      return null;
  }
}

function onAdd(kind) {
  const bulletMatch = kind.match(/^(experience|projects|courseProjects|por)-bullet:(\d+)$/);
  if (bulletMatch) {
    const [, section, idx] = bulletMatch;
    state.data[section][Number(idx)].bullets.push("New bullet");
    save();
    render();
    return;
  }
  const blank = blankOf(kind);
  if (blank == null) return;
  state.data[kind].push(blank);
  save();
  render();
}

function onRemove(kind, index) {
  const bulletMatch = kind.match(/^(experience|projects|courseProjects|por)-bullet:(\d+)$/);
  if (bulletMatch) {
    const [, section, idx] = bulletMatch;
    const list = state.data[section][Number(idx)].bullets;
    if (list.length <= 1) return;
    list.splice(index, 1);
    save();
    render();
    return;
  }
  const list = state.data[kind];
  if (!Array.isArray(list) || list.length <= 1) return;
  list.splice(index, 1);
  save();
  render();
}

function bind() {
  const sheet = document.getElementById("sheet");

  sheet.addEventListener("input", (e) => {
    const el = e.target.closest("[data-path]");
    if (!el) return;
    const kind = el.dataset.kind;
    const value = kind === "md" ? htmlToMd(el.innerHTML) : el.innerText.replace(/\n+/g, " ").trimEnd();
    setPath(state.data, el.dataset.path, value);
    save();
    measureFit();
  });

  sheet.addEventListener("paste", (e) => {
    const el = e.target.closest("[data-path]");
    if (!el) return;
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData("text/plain");
    document.execCommand("insertText", false, text);
  });

  sheet.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
      const el = e.target.closest('[data-kind="md"]');
      if (!el) return;
      e.preventDefault();
      document.execCommand("bold");
    }
    if (e.key === "Enter" && e.target.closest("[data-path]")) {
      e.preventDefault();
    }
  });

  sheet.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-act]");
    if (!btn) return;
    const act = btn.dataset.act;
    const kind = btn.dataset.kind;
    if (act === "add") onAdd(kind);
    if (act === "remove") onRemove(kind, Number(btn.dataset.index));
  });

  document.getElementById("btn-view").addEventListener("click", () => {
    state.editing = false;
    render();
  });
  document.getElementById("btn-edit").addEventListener("click", () => {
    state.editing = true;
    render();
  });
  document.getElementById("btn-print").addEventListener("click", () => {
    state.editing = false;
    render();
    setTimeout(() => window.print(), 50);
  });
  document.getElementById("btn-export").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state.data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "naveen-us-resume.json";
    a.click();
    URL.revokeObjectURL(a.href);
  });
  document.getElementById("btn-import").addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        state.data = JSON.parse(reader.result);
        save();
        render();
      } catch (err) {
        alert("Could not read that JSON file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  });
  document.getElementById("btn-reset").addEventListener("click", () => {
    if (!confirm("Reset to the rewritten one-page resume? Unsaved custom edits in this browser will be lost.")) return;
    state.data = clone(window.DEFAULT_RESUME);
    save();
    render();
  });

  window.addEventListener("resize", scaleSheet);
  window.addEventListener("beforeprint", () => {
    const wrap = document.querySelector(".sheet-wrap");
    wrap.style.zoom = "1";
    wrap.style.transform = "none";
    wrap.style.width = "210mm";
    wrap.style.height = "auto";
  });
  window.addEventListener("afterprint", scaleSheet);
}

function init() {
  try {
    const params = new URLSearchParams(location.search);
    if (!window.DEFAULT_RESUME) throw new Error("Resume data failed to load");
    state.data = params.get("fresh") === "1" ? clone(window.DEFAULT_RESUME) : load();
    if (params.get("edit") === "1") state.editing = true;
    bind();
    render();
  } catch (err) {
    const badge = document.getElementById("fit-badge");
    const sheet = document.getElementById("sheet");
    if (badge) badge.textContent = err.message;
    if (sheet) sheet.innerHTML = `<pre style="padding:16px;white-space:pre-wrap">${escapeHtml(err.stack || err.message)}</pre>`;
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
