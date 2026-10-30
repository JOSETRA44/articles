// Utilidades de presentación: escape y enlaces. Toda cadena de datos pasa por esc().

const ENTITIES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ENTITIES[c]);

export function link(text, href, rel) {
  if (!href) return esc(text);
  const external = /^https?:/.test(href);
  const relAttr = rel ?? (external ? "noopener" : null);
  return `<a href="${esc(href)}"${relAttr ? ` rel="${relAttr}"` : ""}>${esc(text)}</a>`;
}
