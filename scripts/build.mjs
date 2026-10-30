// Composición: único punto que conoce las tres capas. Escribe el sitio estático.
import { writeFile } from "node:fs/promises";
import { site, person, story, facts, projects } from "../src/domain/profile.js";
import { groupProjects, readingMinutes, formatDate, edition } from "../src/application/editorial.js";
import { page, sitemap } from "../src/ui/page.js";

const now = new Date();
const { apps, tools } = groupProjects(projects);

const model = {
  site, person, story, facts, projects, apps, tools,
  minutes: readingMinutes([story.dek, ...story.paragraphs, ...projects.map((p) => p.summary)]),
  issue: edition(now),
  modified: now.toISOString(),
  dateline: {
    // Fecha local, no UTC: en Perú (UTC−5) la noche ya es "mañana" en UTC.
    iso: [now.getFullYear(), now.getMonth() + 1, now.getDate()].map((n) => String(n).padStart(2, "0")).join("-"),
    year: now.getFullYear(),
    text: formatDate(now, person.city).replace(`${person.city}, `, ""),
    short: new Intl.DateTimeFormat("es-PE", { day: "numeric", month: "long", year: "numeric" }).format(now),
  },
};

const root = new URL("../", import.meta.url);
await writeFile(new URL("index.html", root), page(model));
await writeFile(new URL("sitemap.xml", root), sitemap(model));
console.log(`index.html y sitemap.xml generados · ${apps.length} apps, ${tools.length} herramientas`);
