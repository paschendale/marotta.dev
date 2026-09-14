"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { ProjectImage } from "@/content/projects/types";

export type GalleryLabels = { open: string; close: string; previous: string; next: string };

/**
 * Standardised screenshot gallery: a fixed 16:9 stage (object-contain so tall and wide
 * captures look consistent), thumbnails, and a keyboard-navigable lightbox.
 */
export default function Gallery({
  images,
  captions = [],
  title,
  labels,
}: {
  images: ProjectImage[];
  captions?: string[];
  title: string;
  labels: GalleryLabels;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const count = images.length;
  const alt = (i: number) => captions[i] ?? `${title} screenshot ${i + 1}`;

  const step = useCallback((delta: number) => setIndex((i) => (i + delta + count) % count), [count]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, step]);

  if (!count) return null;
  const current = images[index];

  return (
    <div className="flex flex-col gap-3">
      <figure className="m-0">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block w-full aspect-[16/9] overflow-hidden rounded-xl border border-border bg-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={labels.open}
        >
          <Image
            key={current.src}
            src={current.src}
            alt={alt(index)}
            fill
            sizes="(max-width: 1024px) 100vw, 860px"
            className="object-contain"
            priority={index === 0}
          />
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-background/90 px-2 py-1 text-xs text-foreground/80 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <Maximize2 size={12} aria-hidden="true" /> {labels.open}
          </span>
        </button>
        {captions[index] && (
          <figcaption className="mt-2 text-sm text-muted-foreground">
            <span className="font-mono text-xs mr-2">{index + 1}/{count}</span>
            {captions[index]}
          </figcaption>
        )}
      </figure>

      {count > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2" role="tablist" aria-label={title}>
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => setIndex(i)}
              className={`relative aspect-video overflow-hidden rounded-md border bg-muted/60 transition ${
                i === index ? "border-primary ring-2 ring-primary/40" : "border-border opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={img.src} alt={alt(i)} fill sizes="200px" className="object-cover object-top" />
            </button>
          ))}
        </div>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt(index)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={labels.close}
            className="absolute top-4 right-4 rounded-md bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X size={20} />
          </button>
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); step(-1); }}
                aria-label={labels.previous}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-md bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); step(1); }}
                aria-label={labels.next}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
          <figure className="m-0 flex max-h-full max-w-6xl w-full flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full" style={{ aspectRatio: `${current.width} / ${current.height}`, maxHeight: "82vh" }}>
              <Image src={current.src} alt={alt(index)} fill sizes="100vw" className="object-contain" />
            </div>
            {captions[index] && <figcaption className="text-center text-sm text-white/80">{captions[index]}</figcaption>}
          </figure>
        </div>
      )}
    </div>
  );
}
