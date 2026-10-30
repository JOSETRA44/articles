// Dominio: datos puros. Sin HTML, sin formato. Fuente: cv.txt y lib/projects.ts.

export const site = {
  url: "https://josetra44.github.io/articles/",
  locale: "es_PE",
  lang: "es",
  title: "José Gabriel Huanaco Muñoz · Economía y desarrollo de software",
  description:
    "Estudiante de Economía en la UNSA (Arequipa) y becario por excelencia académica. Construye apps y herramientas de IA para problemas económicos cotidianos.",
};

export const person = {
  name: "José Gabriel Huanaco Muñoz",
  givenName: "José Gabriel",
  familyName: "Huanaco Muñoz",
  jobTitle: "Estudiante de Economía y desarrollador de software",
  city: "Arequipa",
  country: "PE",
  hometown: "Challhuahuacho, Cotabambas",
  email: "josehuanacomunoz@gmail.com",
  university: { name: "Universidad Nacional de San Agustín de Arequipa", short: "UNSA", url: "https://www.unsa.edu.pe" },
  languages: [
    { code: "qu", name: "Quechua", level: "nativo" },
    { code: "es", name: "Español", level: "nativo" },
    { code: "en", name: "Inglés", level: "básico (A2)" },
  ],
  knowsAbout: ["Economía", "Análisis de datos", "Python", "Excel", "Desarrollo móvil", "Model Context Protocol", "Inteligencia artificial"],
  links: [
    { label: "GitHub", href: "https://github.com/JOSETRA44" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jose-gabriel-hm" },
  ],
  photo: { src: "jose-gabriel.jpg", alt: "Retrato de José Gabriel Huanaco Muñoz", width: 1000, height: 1230 },
};

export const story = {
  kicker: "Perfil · Economía y software",
  headline: "Un economista que escribe software para los problemas de todos los días",
  dek: "Estudiante de la UNSA y becario por excelencia académica, José Gabriel convierte preguntas económicas cotidianas en herramientas que funcionan incluso sin internet.",
  caption: "José Gabriel Huanaco Muñoz estudia Economía en la Universidad Nacional de San Agustín de Arequipa.",
  paragraphs: [
    "José Gabriel Huanaco Muñoz creció en Challhuahuacho, en la provincia de Cotabambas, donde aprendió pronto que la tecnología tiene que adaptarse a las personas, y no al revés. Hoy estudia Economía en la Universidad Nacional de San Agustín de Arequipa, como becario por excelencia académica y en el tercio superior de su promoción.",
    "Su perfil es híbrido: combina la formación económica con el desarrollo de software para resolver problemas concretos. Se forma en análisis de datos con Python y en Excel avanzado en la Cámara de Comercio Exterior, y prototipa rápido lo que aprende.",
    "Habla quechua y español como lenguas nativas, además de inglés básico, una combinación que le da otra mirada para diseñar productos para las comunidades andinas.",
  ],
};

/** Datos de un vistazo, para quien solo tiene treinta segundos. */
export const facts = [
  { term: "Estudia", value: "Economía, UNSA · desde 2025" },
  { term: "Distinción", value: "Becario por excelencia académica · tercio superior" },
  { term: "Formación", value: "Python y Excel avanzado · CCEX, en curso" },
  { term: "Idiomas", value: "Quechua y español nativos · inglés A2" },
  { term: "Base", value: "Arequipa, Perú" },
];

/**
 * kind: "APP" | "MCP" | "CLI" | "SISTEMA"
 * stack: solo lo verificado en el código fuente de cada proyecto.
 */
export const projects = [
  { title: "Wayqui", kind: "APP", year: 2026, status: "en desarrollo", role: "Fullstack y diseño UI",
    href: "https://josetra44.github.io/wayqui/", stack: ["Riverpod", "Clean Architecture", "SHA-256"],
    summary: "Gestión de préstamos personales con cobros directos por Yape y Plin, sin intermediarios." },
  { title: "unicali", kind: "APP", year: 2025, status: "en desarrollo", role: "Líder de proyecto y frontend",
    href: "https://unicali.app", stack: ["iOS", "Android", "Offline-first"],
    summary: "Centraliza la información curricular de la UNSA y calcula notas sin conexión a internet." },
  { title: "KOLKI", kind: "APP", year: 2025, status: "activo", role: "Fundador",
    stack: ["Reconocimiento de voz"],
    summary: "Registro de gastos por voz que automatiza las finanzas personales." },
  { title: "ASCHU", kind: "APP", year: 2025, status: "beta", role: "Fundador",
    href: "https://josetra44.github.io/aschu/", stack: ["Google Maps", "Supabase Realtime"],
    summary: "Rastreo vehicular en tiempo real para la logística rural de Cotabambas." },
  { title: "JARVIS", kind: "SISTEMA", repo: "https://github.com/JOSETRA44/jarvis", stack: ["Fastify", "node-pty", "React"],
    summary: "Control remoto de una terminal desde el teléfono, por WhatsApp, Telegram o web." },
  { title: "Jaravi", kind: "MCP", repo: "https://github.com/JOSETRA44/jaravi",
    summary: "Un agente de IA como orquestador determinista de otros agentes." },
  { title: "Wacon", kind: "MCP", repo: "https://github.com/JOSETRA44/wacon-mcp", stack: ["SQLite"],
    summary: "WhatsApp para agentes de IA, con memoria de estilo por contacto." },
  { title: "gdocs-native", kind: "MCP", repo: "https://github.com/JOSETRA44/mcp-google-docs",
    summary: "Edición de Google Docs por intención, no por índice." },
  { title: "Scopus MCP", kind: "MCP", repo: "https://github.com/JOSETRA44/scopus-mcp",
    summary: "La base académica de Elsevier al alcance de un agente." },
  { title: "OpenAlex MCP", kind: "MCP", repo: "https://github.com/JOSETRA44/openalex-mcp",
    summary: "Más de 250 millones de trabajos académicos, sin API key." },
  { title: "BCRP MCP", kind: "MCP", repo: "https://github.com/JOSETRA44/BCRP-mcp",
    summary: "Series macroeconómicas oficiales del Banco Central de Reserva del Perú." },
  { title: "DUTIC MCP", kind: "CLI", repo: "https://github.com/JOSETRA44/DUTIC-mcp", stack: ["Playwright"],
    summary: "Las tareas que el aula virtual de la UNSA no muestra en el calendario." },
  { title: "IA Detector", kind: "CLI", stack: [".NET 10", "ONNX"],
    summary: "Detección local de texto generado por IA; el texto nunca sale del equipo." },
];
