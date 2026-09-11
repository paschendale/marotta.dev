import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/dictionaries";
import type { BlogPostSummary } from "@/lib/blog";

function formatDate(date: string, lang: string): string {
  const locale = lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US";
  return new Date(`${date}T12:00:00Z`).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogList({ posts, lang, readPost, empty }: { posts: BlogPostSummary[]; lang: Locale; readPost: string; empty: string }) {
  if (!posts.length) return <p className="text-muted-foreground">{empty}</p>;
  return (
    <div className="flex flex-col gap-8">
      {posts.map((post) => (
        <article key={post.slug} className="rounded-lg border border-border bg-card overflow-hidden">
          {post.coverImage ? (
            <Link href={`/${lang}/blog/${post.slug}`} className="relative block w-full aspect-[16/8] border-b border-border">
              <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
            </Link>
          ) : null}
          <div className="p-6 flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">{formatDate(post.date, lang)}</p>
            <h2 className="text-xl font-semibold">
              <Link href={`/${lang}/blog/${post.slug}`} className="hover:underline">{post.title}</Link>
            </h2>
            <p className="text-foreground/90 leading-relaxed">{post.description}</p>
            {post.tags.length ? (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs">{tag}</span>
                ))}
              </div>
            ) : null}
            <Link href={`/${lang}/blog/${post.slug}`} className="w-fit">
              <Button variant="outline" className="transition-transform hover:scale-105">{readPost}</Button>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
