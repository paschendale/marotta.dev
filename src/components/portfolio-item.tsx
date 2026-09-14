import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary, Locale } from "@/dictionaries";
import type { Project, ProjectCategory } from "@/content/projects";
import FlowDiagram from "./project/flow-diagram";
import StackChips from "./project/stack-chips";

export function categoryLabel(category: ProjectCategory, intl: Dictionary): string {
  return intl[`category-${category}` as const];
}

/** Uniform project card: fixed 16:10 cover (screenshot or architecture flow), eyebrow, title, tagline, stack. */
export default function PortfolioItem({ project, lang, intl }: { project: Project; lang: Locale; intl: Dictionary }) {
  const cover = project.images[0];
  return (
    <Link
      href={`/${lang}/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-gradient-to-br from-secondary/80 to-muted/40">
        {cover ? (
          <Image
            src={cover.src}
            alt={project.captions?.[0] ?? project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : project.flow ? (
          <FlowDiagram nodes={project.flow} compact />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-wider text-muted-foreground">{project.title}</div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="flex items-center justify-between gap-3 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
          <span className="shrink-0">{categoryLabel(project.category, intl)}</span>
          {project.client && <span className="truncate text-right">{project.clientShort ?? project.client}</span>}
        </div>
        <h3 className="flex items-start justify-between gap-2 text-lg font-semibold leading-snug">
          <span className="transition-colors group-hover:text-primary">{project.title}</span>
          <ArrowUpRight size={18} className="mt-1 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" aria-hidden="true" />
        </h3>
        <p className="text-sm leading-relaxed text-foreground/75 line-clamp-3">{project.tagline}</p>
        <StackChips items={project.stack} limit={4} className="mt-auto pt-2" />
      </div>
    </Link>
  );
}
