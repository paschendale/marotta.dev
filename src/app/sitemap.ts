import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/blog";
import { PROJECT_SLUGS } from "@/content/projects";

export const runtime = "edge";

const LOCALES = ["en", "pt", "es"] as const;


export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://marotta.dev";
  const blogSlugs = getAllBlogSlugs();

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of LOCALES) {
    entries.push({ url: `${base}/${lang}`, changeFrequency: "monthly", priority: 1 });
    entries.push({ url: `${base}/${lang}/blog`, changeFrequency: "weekly", priority: 0.8 });
    for (const slug of PROJECT_SLUGS) {
      entries.push({ url: `${base}/${lang}/projects/${slug}`, changeFrequency: "yearly", priority: 0.6 });
    }
    for (const slug of blogSlugs) {
      entries.push({ url: `${base}/${lang}/blog/${slug}`, changeFrequency: "monthly", priority: 0.7 });
    }
  }

  return entries;
}
