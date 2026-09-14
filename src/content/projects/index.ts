import { PROJECTS, PROJECT_SLUGS } from "./meta";
import { en } from "./en";
import { pt } from "./pt";
import { es } from "./es";
import type { Project, ProjectText } from "./types";

export type { Project, ProjectCategory, FlowNode } from "./types";
export { PROJECT_SLUGS };

const TEXT: Record<string, Record<string, ProjectText>> = { en, pt, es };

function textFor(lang: string, slug: string): ProjectText {
  return TEXT[lang]?.[slug] ?? en[slug];
}

export function listProjects(lang: string): Project[] {
  return PROJECTS.map((meta) => ({ ...meta, ...textFor(lang, meta.slug) }));
}

export function getProject(slug: string, lang: string): Project | null {
  const meta = PROJECTS.find((p) => p.slug === slug);
  if (!meta || !en[slug]) return null;
  return { ...meta, ...textFor(lang, slug) };
}
