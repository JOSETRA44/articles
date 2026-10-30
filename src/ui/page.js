// Presentación: la página completa como texto HTML. No decide nada, solo compone.
import { esc, link } from "./html.js";
import { head } from "./seo.js";

const KIND_LABEL = { APP: "App", MCP: "Servidor MCP", CLI: "CLI", SISTEMA: "Sistema" };

function masthead({ person, dateline, issue }) {
  return `
  <header class="masthead">
    <div class="masthead__ears">
      <span>${esc(person.city)}, Perú</span>
      <span>Edición digital</span>
    </div>
    <p class="masthead__name">${esc(person.name)}</p>
    <p class="masthead__motto">Economía, datos y software para la vida cotidiana</p>
    <div class="masthead__bar">
      <span>Vol. ${esc(issue.volume)} · N.º ${issue.number}</span>
      <time datetime="${esc(dateline.iso)}">${esc(dateline.text)}</time>
      <span>Gratis</span>
    </div>
  </header>`;
}

function meta(parts) {
  return parts.filter(Boolean).map(esc).join(" · ");
}

function app(p) {
  const links = [p.href && link("Ver en vivo", p.href), p.repo && link("Código", p.repo)].filter(Boolean);
  return `
        <article class="entry">
          <h3 class="entry__title">${link(p.title, p.href ?? p.repo)}</h3>
          <p class="entry__meta">${meta([p.year, p.role, p.status])}</p>
          <p>${esc(p.summary)}</p>
          ${p.stack ? `<p class="entry__stack">${meta(p.stack)}</p>` : ""}
          ${links.length ? `<p class="entry__links">${links.join(" · ")}</p>` : ""}
        </article>`;
}

function tool(p) {
  return `
          <li>
            <span class="index__name">${link(p.title, p.repo)}</span>.
            ${esc(p.summary)}
            <span class="index__meta">${meta([KIND_LABEL[p.kind], ...(p.stack ?? [])])}</span>
          </li>`;
}

function summaryBox({ facts, person, apps, tools }) {
  return `
      <aside class="summary" aria-labelledby="summary-title">
        <h2 class="summary__title" id="summary-title">En resumen</h2>
        <dl>
          ${facts.map((f) => `<dt>${esc(f.term)}</dt><dd>${esc(f.value)}</dd>`).join("\n          ")}
          <dt>Proyectos</dt><dd>${apps.length} apps · ${tools.length} herramientas</dd>
        </dl>
        <p class="summary__contact">${link(person.email, `mailto:${person.email}`)}</p>
        <p class="summary__links">${person.links.map((l) => link(l.label, l.href, "me noopener")).join(" · ")}</p>
      </aside>`;
}

export function page(model) {
  const { site, person, story, facts, apps, tools, minutes, dateline } = model;
  const { photo } = person;
  return `<!doctype html>
<!-- Generado por scripts/build.mjs. Edita src/ y ejecuta: npm run build -->
<html lang="${esc(site.lang)}">
<head>${head(model)}
</head>
<body>
  <a class="skip" href="#contenido">Saltar al artículo</a>
  ${masthead(model)}

  <main class="sheet" id="contenido">
    <header class="lede">
      <p class="kicker">${esc(story.kicker)}</p>
      <h1 class="headline">${esc(story.headline)}</h1>
      <p class="dek">${esc(story.dek)}</p>
      <p class="byline">Por <strong>${esc(person.name)}</strong> · ${minutes} min de lectura · Actualizado el <time datetime="${esc(dateline.iso)}">${esc(dateline.short)}</time></p>
    </header>

    <div class="columns">
      <article class="body">
        <figure class="figure">
          <img src="${esc(photo.src)}" alt="${esc(photo.alt)}" width="${photo.width}" height="${photo.height}" fetchpriority="high" decoding="async">
          <figcaption class="caption">${esc(story.caption)}</figcaption>
        </figure>

        ${story.paragraphs.map((t) => `<p>${esc(t)}</p>`).join("\n        ")}

        <h2 class="section-title">Lo que construye</h2>
        ${apps.map(app).join("")}

        <h2 class="section-title">Herramientas para agentes de IA</h2>
        <ul class="index">${tools.map(tool).join("")}
        </ul>

        <h2 class="section-title">Contacto</h2>
        <p class="end">Se le puede escribir a ${link(person.email, `mailto:${person.email}`)}, o seguir su trabajo en ${person.links.map((l) => link(l.label, l.href, "me noopener")).join(" y ")}.</p>
      </article>
      ${summaryBox(model)}
    </div>
  </main>

  <footer class="colophon">
    <p>© ${dateline.year} ${esc(person.name)} · Compuesto en Libre Caslon y UnifrakturMaguntia · Sin rastreadores, sin JavaScript.</p>
  </footer>
</body>
</html>
`;
}

export function sitemap({ site, dateline }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${esc(site.url)}</loc><lastmod>${dateline.iso}</lastmod></url>
</urlset>
`;
}
