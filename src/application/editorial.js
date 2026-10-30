const WORDS_PER_MINUTE = 230;

/** Las apps se cuentan como prosa; el resto va al índice de herramientas. */
export function groupProjects(projects) {
  return {
    apps: projects.filter((p) => p.kind === "APP"),
    tools: rankTools(projects.filter((p) => p.kind !== "APP")),
  };
}

/**
 * Criterio editorial: relevancia para un economista.
 * Primero BCRP, Scopus y OpenAlex (en ese orden);
 * después, orden alfabético.
 *
 * No se usan estrellas de GitHub porque no todos
 * los proyectos tienen ese dato.
 *
 * Devuelve un array nuevo sin modificar el original.
 */
export function rankTools(tools) {
  const priorities = ["bcrp", "scopus", "openalex"];

  const collator = new Intl.Collator("es", {
    sensitivity: "base",
    numeric: true,
  });

  const label = (project) =>
    String(
      project.title ||
      project.name ||
      project.slug ||
      project.id ||
      ""
    );

  const priority = (project) => {
    const identifiers = [
      project.title,
      project.name,
      project.slug,
      project.id,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const index = priorities.findIndex((term) =>
      new RegExp(`(^|[^a-z0-9])${term}([^a-z0-9]|$)`)
        .test(identifiers)
    );

    return index === -1 ? priorities.length : index;
  };

  return [...tools].sort(
    (a, b) =>
      priority(a) - priority(b) ||
      collator.compare(label(a), label(b))
  );
}

export function readingMinutes(texts) {
  const words = texts
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(
    1,
    Math.round(words / WORDS_PER_MINUTE)
  );
}

export function formatDate(date, city) {
  const day = new Intl.DateTimeFormat("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return `${city}, ${day}`;
}
const ROMAN = [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];

function toRoman(n) {
  let out = "";
  for (const [value, glyph] of ROMAN) {
    while (n >= value) { out += glyph; n -= value; }
  }
  return out;
}

/** Volumen = años desde el primer proyecto (2025 = I); número = día del año. */
export function edition(date, firstYear = 2025) {
  const year = date.getFullYear();
  const number = Math.floor((date - new Date(year, 0, 0)) / 86_400_000);
  return { volume: toRoman(year - firstYear + 1), number };
}
