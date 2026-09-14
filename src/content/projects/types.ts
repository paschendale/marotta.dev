export type ProjectCategory = "client" | "product" | "rnd" | "team";

export type ProjectLink = { label: string; href: string; kind: "live" | "github" | "docs" };

export type ProjectImage = { src: string; width: number; height: number };

export type ProjectMeta = {
  slug: string;
  category: ProjectCategory;
  /** Client or organisation the work was done for/at (public names only). */
  client?: string;
  /** Short client label for cards; falls back to `client`. */
  clientShort?: string;
  images: ProjectImage[];
  links: ProjectLink[];
  stack: string[];
  /** Show this project prominently on the home grid. */
  featured?: boolean;
};

export type ProjectSection = { heading: string; body: string[] };

export type FlowNode = { label: string; sub?: string };

export type ProjectText = {
  title: string;
  /** One line for fast readers; used on cards and as the page subtitle. */
  tagline: string;
  /** Two-sentence card summary. */
  summary: string;
  role: string;
  /** "At a glance" bullets. */
  highlights: string[];
  sections: ProjectSection[];
  /** Captions matching `ProjectMeta.images` by index. */
  captions?: string[];
  /** Architecture flow rendered when there are no screenshots (and on the card). */
  flow?: FlowNode[];
  /** Short note shown under the header (e.g. NDA disclaimer). */
  note?: string;
};

export type Project = ProjectMeta & ProjectText;
