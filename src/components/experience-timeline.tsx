import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dictionary, Locale } from "@/dictionaries";
import { EXPERIENCE } from "@/content/experience";

export default function ExperienceTimeline({ lang, intl }: { lang: Locale; intl: Dictionary }) {
  const entries = EXPERIENCE.filter((e) => e.home);
  return (
    <div className="flex flex-col gap-6">
      <ol className="relative m-0 flex list-none flex-col gap-0 p-0 border-l border-border ml-2">
        {entries.map((e) => (
          <li key={`${e.org}-${e.period}`} className="relative pl-6 pb-7 last:pb-0">
            <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-background bg-primary" aria-hidden="true" />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-4">
              <p className="m-0 font-semibold leading-snug">
                {e.role[lang]} <span className="text-muted-foreground font-normal">· {e.org}</span>
              </p>
              <p className="m-0 shrink-0 font-mono text-xs text-muted-foreground">{e.period}</p>
            </div>
            <p className="m-0 mt-1 text-sm leading-relaxed text-foreground/75">{e.summary[lang]}</p>
          </li>
        ))}
      </ol>
      <Link href={`/${lang}/resume`} className="inline-flex w-fit items-center gap-2 text-sm underline underline-offset-4 hover:text-primary">
        {intl["experience-more"]} <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </div>
  );
}
