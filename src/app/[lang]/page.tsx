import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Capabilities from "@/components/capabilities";
import ExperienceTimeline from "@/components/experience-timeline";
import PortfolioGrid from "@/components/portfolio-grid";
import SocialLinks from "@/components/social-links";
import { listProjects } from "@/content/projects";
import { getDictionary, locales } from "@/dictionaries";
import { LangProps } from "@/interfaces";
import { getBlogPosts, toBlogLocale } from "@/lib/blog";

export async function generateMetadata({ params: { lang } }: LangProps): Promise<Metadata> {
  const intl = await getDictionary(lang);
  const url = `https://marotta.dev/${lang}`;
  return {
    title: { absolute: intl["meta-home-title"] },
    description: intl["meta-home-description"],
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `https://marotta.dev/${l}`])),
    },
    openGraph: { type: "website", url, title: intl["meta-home-title"], description: intl["meta-home-description"] },
  };
}

function formatDate(date: string, lang: string): string {
  const locale = lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US";
  return new Date(`${date}T12:00:00Z`).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
}

export default async function Home({ params: { lang } }: LangProps) {
  const intl = await getDictionary(lang);
  const projects = listProjects(lang);
  const posts = getBlogPosts(toBlogLocale(lang)).slice(0, 3);

  const sectionHeading = (id: string, title: string, intro?: string) => (
    <div className="flex flex-col gap-2 mb-8">
      <h2 id={id} className="text-2xl font-semibold tracking-tight">{title}</h2>
      {intro && <p className="text-foreground/75 leading-relaxed max-w-2xl">{intro}</p>}
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col items-center px-4 pb-16 pt-20 md:px-10 md:pt-24">
      {/* Hero */}
      <section className="w-full max-w-5xl animate-in fade-in duration-700" aria-labelledby="hero-heading">
        <div className="grid gap-8 md:grid-cols-[160px_minmax(0,1fr)] md:gap-12">
          <div className="flex md:justify-end">
            <Image
              src="/me.png"
              alt="Victor Marotta"
              width={160}
              height={160}
              sizes="160px"
              className="h-[120px] w-[120px] md:h-[160px] md:w-[160px] rounded-2xl border border-border object-cover shadow-lg"
              priority
            />
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h1 id="hero-heading" className="text-3xl sm:text-4xl font-semibold tracking-tight">{intl["hello"]}</h1>
              <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.12em] text-muted-foreground">{intl["hero-role"]}</p>
            </div>
            <div className="flex flex-col gap-4 text-[1.02rem] leading-relaxed text-foreground/90">
              <p>{intl["home-text-1"]}</p>
              <p>{intl["home-text-2"]}</p>
              <p>{intl["home-text-3"]}</p>
              <p>{intl["home-text-4"]}</p>
            </div>
            <div className="flex flex-row flex-wrap items-center gap-4 pt-1">
              <div className="flex flex-row flex-wrap gap-3">
                <Link
                  href="mailto:victor@marotta.dev"
                  className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {intl["email"]}
                </Link>
                <Link
                  href="https://territorial.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  territorial.dev
                </Link>
                <Link
                  href={`/${lang}/resume`}
                  className="inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {intl["resume"]}
                </Link>
              </div>
              <SocialLinks />
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="w-full max-w-5xl mt-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300" aria-labelledby="capabilities-heading">
        {sectionHeading("capabilities-heading", intl["capabilities-title"], intl["capabilities-intro"])}
        <Capabilities intl={intl} />
      </section>

      {/* Projects */}
      <section id="projects" className="w-full max-w-6xl mt-20 scroll-mt-24 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500" aria-labelledby="projects-heading">
        <div className="max-w-5xl mx-auto w-full">{sectionHeading("projects-heading", intl["check-out-projects"], intl["projects-intro"])}</div>
        <PortfolioGrid projects={projects} lang={lang} intl={intl} />
      </section>

      {/* Experience */}
      <section className="w-full max-w-5xl mt-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500" aria-labelledby="experience-heading">
        {sectionHeading("experience-heading", intl["experience-title"])}
        <ExperienceTimeline lang={lang} intl={intl} />
      </section>

      {/* Blog */}
      {posts.length > 0 && (
        <section className="w-full max-w-5xl mt-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700" aria-labelledby="blog-heading">
          <div className="flex items-baseline justify-between mb-8">
            <h2 id="blog-heading" className="text-2xl font-semibold tracking-tight">{intl["latest-posts"]}</h2>
            <Link href={`/${lang}/blog`} className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">{intl["all-posts"]}</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${lang}/blog/${post.slug}`}
                className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-lg"
              >
                <p className="font-mono text-xs text-muted-foreground">{formatDate(post.date, lang)}</p>
                <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-sm text-foreground/75 leading-relaxed line-clamp-3">{post.description}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm text-muted-foreground">
                  {intl["read-post"]} <ArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="w-full max-w-5xl mt-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700" aria-labelledby="contact-heading">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-10 flex flex-col items-center text-center gap-4">
          <h2 id="contact-heading" className="text-2xl font-semibold tracking-tight">{intl["contact-title"]}</h2>
          <p className="text-foreground/80 max-w-xl leading-relaxed">{intl["contact-text"]}</p>
          <div className="flex flex-row flex-wrap justify-center gap-3 pt-2">
            <Link href="mailto:victor@marotta.dev" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90">
              {intl["email"]}
            </Link>
            <Link href="https://territorial.dev" target="_blank" rel="noopener noreferrer" className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition hover:bg-secondary">
              territorial.dev
            </Link>
            <Link href={`/${lang}/resume`} className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition hover:bg-secondary">
              {intl["resume"]}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
