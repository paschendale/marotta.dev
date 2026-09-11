"use client";

import Image from "next/image";
import Link from "next/link";
import { Link2, Linkedin, Twitter } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/dictionaries";
import type { BlogPost as Post } from "@/lib/blog";

export type BlogPostLabels = {
  home: string;
  blog: string;
  minRead: string;
  published: string;
  readingTime: string;
  minutes: string;
  aboutArticle: string;
  linkedinProfile: string;
  share: string;
  copyLink: string;
  linkCopied: string;
  contents: string;
};

type TocItem = { id: string; text: string; level: 2 | 3 };

function slugifyHeading(text: string): string {
  return text.toLowerCase().replace(/&[a-z0-9#]+;/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

function buildHtmlWithAnchors(html: string): { html: string; toc: TocItem[] } {
  const counts = new Map<string, number>();
  const toc: TocItem[] = [];
  const out = html.replace(/<(h[23])>([\s\S]*?)<\/h[23]>/g, (full, tag: string, inner: string) => {
    const plain = inner.replace(/<[^>]+>/g, "").trim();
    if (!plain) return full;
    const base = slugifyHeading(plain);
    const n = counts.get(base) ?? 0;
    counts.set(base, n + 1);
    const id = n === 0 ? base : `${base}-${n + 1}`;
    toc.push({ id, text: plain, level: tag === "h2" ? 2 : 3 });
    return `<${tag} id="${id}">${inner}</${tag}>`;
  });
  return { html: out, toc };
}

function formatDate(date: string, lang: string): string {
  const locale = lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US";
  return new Date(`${date}T12:00:00Z`).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPost({ post, lang, labels }: { post: Post; lang: Locale; labels: BlogPostLabels }) {
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState("");
  const { html, toc } = useMemo(() => buildHtmlWithAnchors(post.html), [post.html]);

  useEffect(() => {
    if (!toc.length) return;
    const update = () => {
      const els = toc.map((t) => document.getElementById(t.id)).filter((e): e is HTMLElement => e !== null);
      if (!els.length) return;
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= 180) current = el.id;
        else break;
      }
      setActive((prev) => (prev === current ? prev : current));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [toc]);

  const canonicalUrl = `https://marotta.dev/${lang}/blog/${post.slug}`;
  const shareUrl = encodeURIComponent(canonicalUrl);
  const readingMinutes = Math.max(1, Math.ceil(post.html.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length / 220));
  const headline = lang === "pt" ? post.author.headlinePt ?? post.author.headline : post.author.headline ?? post.author.headlinePt;
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(canonicalUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-10 animate-in fade-in duration-700">
      <article className="w-full max-w-6xl mx-auto">
        <nav className="mb-8 text-sm text-muted-foreground flex items-center gap-2">
          <Link href={`/${lang}`} className="hover:text-foreground transition-colors">{labels.home}</Link>
          <span>/</span>
          <Link href={`/${lang}/blog`} className="hover:text-foreground transition-colors">{labels.blog}</Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-[220px] sm:max-w-[380px]">{post.title}</span>
        </nav>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-10">
          <div>
            <header className="mb-8 pb-6 border-b border-border">
              <p className="text-sm text-muted-foreground mb-3">
                {formatDate(post.date, lang)} · {readingMinutes} {labels.minRead}
              </p>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4 leading-tight">{post.title}</h1>
              <p className="text-lg text-foreground/90 leading-relaxed">{post.description}</p>
            </header>

            {post.coverImage ? (
              <div className="relative w-full aspect-[16/8] rounded-lg overflow-hidden border border-border mb-8">
                <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 1024px) 100vw, 820px" className="object-cover" />
              </div>
            ) : null}

            <div className="blog-markdown leading-8 text-[1.05rem]">
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-8 h-fit space-y-4">
            <div className="rounded-lg border border-border bg-card p-5">
              <h2 className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-4">{labels.aboutArticle}</h2>
              <div className="flex items-center gap-3 mb-5">
                <Image src={post.author.photo} alt={post.author.name} width={44} height={44} className="rounded-full border border-border" />
                <div>
                  <p className="font-semibold leading-tight">{post.author.name}</p>
                  {headline ? <p className="text-xs text-muted-foreground mt-1">{headline}</p> : null}
                </div>
              </div>
              <div className="space-y-2 text-sm mb-4">
                <p><span className="text-muted-foreground">{labels.published}</span> {formatDate(post.date, lang)}</p>
                <p><span className="text-muted-foreground">{labels.readingTime}</span> {readingMinutes} {labels.minutes}</p>
              </div>
              <a href={post.author.linkedin} target="_blank" rel="noopener noreferrer" className="w-full mb-5 inline-flex items-center justify-center gap-2 px-3 py-2.5 text-sm border border-border rounded-md bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity">
                <Linkedin size={16} />
                {labels.linkedinProfile}
              </a>
              <div className="pt-4 border-t border-border">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-3">{labels.share}</p>
                <div className="flex items-center gap-2">
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" title="Share on LinkedIn" className="inline-flex items-center justify-center size-10 border border-border rounded-md hover:bg-secondary transition-colors">
                    <Linkedin size={16} />
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X" title="Share on X" className="inline-flex items-center justify-center size-10 border border-border rounded-md hover:bg-secondary transition-colors">
                    <Twitter size={16} />
                  </a>
                  <button type="button" onClick={copyLink} aria-label={labels.copyLink} title={labels.copyLink} className={`inline-flex items-center justify-center size-10 border rounded-md transition-colors ${copied ? "border-primary text-primary" : "border-border hover:bg-secondary"}`}>
                    <Link2 size={16} />
                  </button>
                  <span className="text-xs text-muted-foreground ml-1 min-w-[72px]">{copied ? labels.linkCopied : ""}</span>
                </div>
              </div>
            </div>

            {toc.length ? (
              <div className="rounded-lg border border-border bg-card p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-4">{labels.contents}</p>
                <ul className="m-0 p-0 list-none space-y-1.5">
                  {toc.map((item) => (
                    <li key={item.id} className={item.level === 3 ? "pl-3 text-sm" : "text-sm"}>
                      <a href={`#${item.id}`} className={`block rounded px-2 py-1 transition-colors ${active === item.id ? "bg-secondary text-secondary-foreground" : "text-foreground/80 hover:text-foreground hover:bg-secondary/60"}`}>
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </article>
    </div>
  );
}
