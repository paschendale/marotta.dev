import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPage from "@/components/project/project-page";
import { getProject, PROJECT_SLUGS } from "@/content/projects";
import { getDictionary, isLocale, locales } from "@/dictionaries";
import { LangSlugProps } from "@/interfaces";

export function generateStaticParams() {
  return locales.flatMap((lang) => PROJECT_SLUGS.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params: { lang, slug } }: LangSlugProps): Promise<Metadata> {
  const project = getProject(slug, lang);
  if (!project) return {};
  const url = `https://marotta.dev/${lang}/projects/${slug}`;
  const image = project.images[0]?.src;
  return {
    title: project.title,
    description: project.tagline,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `https://marotta.dev/${l}/projects/${slug}`])),
    },
    openGraph: {
      type: "article",
      url,
      title: project.title,
      description: project.tagline,
      images: image ? [{ url: image, width: project.images[0].width, height: project.images[0].height }] : undefined,
    },
  };
}

export default async function Page({ params: { lang, slug } }: LangSlugProps) {
  if (!isLocale(lang)) notFound();
  const project = getProject(slug, lang);
  if (!project) notFound();
  const intl = await getDictionary(lang);
  return <ProjectPage project={project} lang={lang} intl={intl} />;
}
