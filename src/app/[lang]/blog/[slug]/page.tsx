import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPost from "@/components/blog/blog-post";
import { getDictionary } from "@/dictionaries";
import { LangSlugProps } from "@/interfaces";
import { getBlogPostBySlug, toBlogLocale } from "@/lib/blog";

export async function generateMetadata({ params: { lang, slug } }: LangSlugProps): Promise<Metadata> {
  const post = getBlogPostBySlug(slug, toBlogLocale(lang));
  if (!post) return {};
  const url = `https://marotta.dev/${lang}/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: post.title, description: post.description, images: post.coverImage ? [{ url: post.coverImage }] : undefined, publishedTime: post.date },
  };
}

export default async function BlogPostPage({ params: { lang, slug } }: LangSlugProps) {
  const post = getBlogPostBySlug(slug, toBlogLocale(lang));
  if (!post) notFound();
  const intl = await getDictionary(lang);
  const labels = {
    home: intl["go-back"],
    blog: intl["blog"],
    minRead: intl["min-read"],
    published: intl["published"],
    readingTime: intl["reading-time"],
    minutes: intl["minutes"],
    aboutArticle: intl["about-article"],
    linkedinProfile: intl["linkedin-profile"],
    share: intl["share"],
    copyLink: intl["copy-link"],
    linkCopied: intl["link-copied"],
    contents: intl["contents"],
  };
  return <BlogPost post={post} lang={lang} labels={labels} />;
}
