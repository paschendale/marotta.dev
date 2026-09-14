"use client";

import { useState } from "react";
import type { Dictionary, Locale } from "@/dictionaries";
import type { Project, ProjectCategory } from "@/content/projects";
import PortfolioItem from "./portfolio-item";

const CHIPS: Array<"all" | ProjectCategory> = ["all", "client", "product", "rnd", "team"];

export default function PortfolioGrid({ projects, lang, intl }: { projects: Project[]; lang: Locale; intl: Dictionary }) {
  const [active, setActive] = useState<"all" | ProjectCategory>("all");
  const visible = projects.filter((p) => active === "all" || p.category === active);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-row flex-wrap gap-2 justify-center" role="tablist" aria-label={intl["check-out-projects"]}>
        {CHIPS.map((chip) => {
          const count = chip === "all" ? projects.length : projects.filter((p) => p.category === chip).length;
          return (
            <button
              key={chip}
              role="tab"
              aria-selected={active === chip}
              onClick={() => setActive(chip)}
              className={`px-3 py-1 rounded-full text-sm transition-colors border ${
                active === chip
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary text-secondary-foreground border-transparent hover:border-border"
              }`}
            >
              {intl[`portfolio-filter-${chip}` as const]}
              <span className={`ml-1.5 font-mono text-[0.68rem] ${active === chip ? "opacity-80" : "text-muted-foreground"}`}>{count}</span>
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {visible.map((project) => (
          <PortfolioItem key={project.slug} project={project} lang={lang} intl={intl} />
        ))}
      </div>
    </div>
  );
}
