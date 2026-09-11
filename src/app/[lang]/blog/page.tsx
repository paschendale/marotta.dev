import type { Metadata } from "next";
import BackButton from "@/components/back-button";
import BlogList from "@/components/blog/blog-list";
import { getDictionary } from "@/dictionaries";
import { LangProps } from "@/interfaces";
import { getBlogPosts, toBlogLocale } from "@/lib/blog";

export async function generateMetadata({ params: { lang } }: LangProps): Promise<Metadata> {
  const intl = await getDictionary(lang);
  return { title: intl["blog"], description: intl["blog-intro"], alternates: { canonical: `https://marotta.dev/${lang}/blog` } };
}

export default async function BlogPage({ params: { lang } }: LangProps) {
  const intl = await getDictionary(lang);
  const posts = getBlogPosts(toBlogLocale(lang));

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-10 animate-in fade-in duration-700">
      <BackButton lang={lang} />
      <main className="w-full max-w-3xl mx-auto mt-6 flex flex-col gap-8">
        <header className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold">{intl["blog-title"]}</h1>
          <p className="text-foreground/90 leading-relaxed">{intl["blog-intro"]}</p>
        </header>
        <BlogList posts={posts} lang={lang} readPost={intl["read-post"]} empty={intl["blog-empty"]} />
      </main>
    </div>
  );
}
