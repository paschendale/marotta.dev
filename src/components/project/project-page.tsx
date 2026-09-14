import Link from "next/link";
import { BookOpen, Check, ExternalLink, Github } from "lucide-react";
import type { Dictionary, Locale } from "@/dictionaries";
import { listProjects, type Project } from "@/content/projects";
import FlowDiagram from "./flow-diagram";
import Gallery from "./gallery";
import StackChips from "./stack-chips";
import PortfolioItem, { categoryLabel } from "@/components/portfolio-item";

const LINK_ICON = { live: ExternalLink, github: Github, docs: BookOpen } as const;

export default function ProjectPage({ project, lang, intl }: { project: Project; lang: Locale; intl: Dictionary }) {
  const all = listProjects(lang);
  const at = all.findIndex((p) => p.slug === project.slug);
  const more = [1, 2, 3].map((d) => all[(at + d) % all.length]);
  const hasGallery = project.images.length > 0;

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-10 animate-in fade-in duration-700">
      <article className="w-full max-w-6xl mx-auto">
        <nav className="mb-8 text-sm text-muted-foreground flex items-center gap-2" aria-label="Breadcrumb">
          <Link href={`/${lang}`} className="hover:text-foreground transition-colors">{intl["go-back"]}</Link>
          <span>/</span>
          <Link href={`/${lang}#projects`} className="hover:text-foreground transition-colors">{intl["check-out-projects"]}</Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-[220px] sm:max-w-[420px]">{project.title}</span>
        </nav>

        <header className="mb-8 pb-8 border-b border-border">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground mb-3">
            {categoryLabel(project.category, intl)}
            {project.client ? ` · ${project.client}` : ""}
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-4">{project.title}</h1>
          <p className="text-lg sm:text-xl text-foreground/85 leading-relaxed max-w-3xl">{project.tagline}</p>
          {project.note && (
            <p className="mt-4 inline-block rounded-md border border-border bg-muted/60 px-3 py-1.5 text-sm text-muted-foreground">
              {project.note}
            </p>
          )}
        </header>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-10">
          <div className="min-w-0 flex flex-col gap-10">
            {hasGallery ? (
              <Gallery
                images={project.images}
                captions={project.captions}
                title={project.title}
                labels={{ open: intl["gallery-open"], close: intl["gallery-close"], previous: intl["gallery-previous"], next: intl["gallery-next"] }}
              />
            ) : project.flow ? (
              <section aria-labelledby="architecture-heading" className="flex flex-col gap-3">
                <h2 id="architecture-heading" className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">{intl["architecture"]}</h2>
                <FlowDiagram nodes={project.flow} />
              </section>
            ) : null}

            <p className="text-[1.05rem] leading-8 text-foreground/90">{project.summary}</p>

            <section aria-labelledby="glance-heading" className="rounded-xl border border-border bg-card p-5 sm:p-6">
              <h2 id="glance-heading" className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground mb-4">{intl["at-a-glance"]}</h2>
              <ul className="flex flex-col gap-3 m-0 p-0 list-none">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-[0.95rem] leading-relaxed">
                    <Check size={16} className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {project.sections.map((s) => (
              <section key={s.heading} className="flex flex-col gap-4">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="text-[1.05rem] leading-8 text-foreground/90">{p}</p>
                ))}
              </section>
            ))}

            {hasGallery && project.flow && (
              <section aria-labelledby="architecture-heading-2" className="flex flex-col gap-3">
                <h2 id="architecture-heading-2" className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">{intl["architecture"]}</h2>
                <FlowDiagram nodes={project.flow} />
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-8 h-fit flex flex-col gap-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                <dt className="text-muted-foreground">{intl["role"]}</dt>
                <dd className="m-0">{project.role}</dd>
                {project.client && (
                  <>
                    <dt className="text-muted-foreground">{intl["client"]}</dt>
                    <dd className="m-0">{project.client}</dd>
                  </>
                )}
              </dl>
              {project.links.length > 0 && (
                <div className="mt-5 pt-4 border-t border-border flex flex-col gap-2">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1">{intl["links"]}</p>
                  {project.links.map((l) => {
                    const Icon = LINK_ICON[l.kind];
                    return (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/60 px-3 py-2 text-sm text-secondary-foreground hover:bg-secondary transition-colors"
                      >
                        <Icon size={15} aria-hidden="true" />
                        <span className="truncate">{l.label}</span>
                      </a>
                    );
                  })}
                </div>
              )}
              <div className="mt-5 pt-4 border-t border-border">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground mb-3">{intl["stack"]}</p>
                <StackChips items={project.stack} />
              </div>
            </div>
          </aside>
        </div>

        <section aria-labelledby="more-heading" className="mt-16 pt-10 border-t border-border">
          <div className="flex items-baseline justify-between mb-6">
            <h2 id="more-heading" className="text-xl font-semibold">{intl["more-projects"]}</h2>
            <Link href={`/${lang}#projects`} className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">{intl["all-projects"]}</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {more.map((p) => (
              <PortfolioItem key={p.slug} project={p} lang={lang} intl={intl} />
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
