// Presentación: metadatos para buscadores y redes. Recibe modelos, devuelve texto.
import { esc } from "./html.js";

export function jsonLd({ site, person, projects, modified }) {
  const id = `${site.url}#person`;
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: site.url,
    name: site.title,
    inLanguage: site.lang,
    dateModified: modified,
    mainEntity: {
      "@type": "Person",
      "@id": id,
      name: person.name,
      givenName: person.givenName,
      familyName: person.familyName,
      jobTitle: person.jobTitle,
      image: new URL(person.photo.src, site.url).href,
      email: `mailto:${person.email}`,
      url: site.url,
      homeLocation: { "@type": "Place", name: person.hometown },
      address: { "@type": "PostalAddress", addressLocality: person.city, addressCountry: person.country },
      affiliation: { "@type": "CollegeOrUniversity", name: person.university.name, url: person.university.url },
      knowsLanguage: person.languages.map((l) => l.code),
      knowsAbout: person.knowsAbout,
      sameAs: person.links.map((l) => l.href),
      owns: projects
        .filter((p) => p.href || p.repo)
        .map((p) => ({ "@type": "SoftwareApplication", name: p.title, description: p.summary, url: p.href ?? p.repo })),
    },
  };
  // "<" escapado: un "</script>" dentro de un texto no puede cerrar el bloque.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function head({ site, person, projects, modified }) {
  const image = new URL(person.photo.src, site.url).href;
  return `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(site.title)}</title>
  <meta name="description" content="${esc(site.description)}">
  <meta name="author" content="${esc(person.name)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${esc(site.url)}">
  ${person.links.map((l) => `<link rel="me" href="${esc(l.href)}">`).join("\n  ")}
  <meta name="theme-color" content="#f3eee3" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#16140f" media="(prefers-color-scheme: dark)">
  <meta name="color-scheme" content="light dark">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="sitemap" type="application/xml" href="sitemap.xml">

  <meta property="og:type" content="profile">
  <meta property="og:locale" content="${esc(site.locale)}">
  <meta property="og:url" content="${esc(site.url)}">
  <meta property="og:title" content="${esc(person.name)}">
  <meta property="og:description" content="${esc(site.description)}">
  <meta property="og:image" content="${esc(image)}">
  <meta property="og:image:width" content="${person.photo.width}">
  <meta property="og:image:height" content="${person.photo.height}">
  <meta property="og:image:alt" content="${esc(person.photo.alt)}">
  <meta property="profile:first_name" content="${esc(person.givenName)}">
  <meta property="profile:last_name" content="${esc(person.familyName)}">
  <meta name="twitter:card" content="summary">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&display=swap&text=${encodeURIComponent(person.name)}">
  <link rel="preload" as="image" href="${esc(person.photo.src)}">
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/article.css">
  <link rel="stylesheet" href="css/print.css" media="print">
  <script type="application/ld+json">${jsonLd({ site, person, projects, modified })}</script>`;
}
