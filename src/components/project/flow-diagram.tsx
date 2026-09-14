import { ArrowRight } from "lucide-react";
import type { FlowNode } from "@/content/projects/types";

/**
 * Architecture flow for projects without screenshots. Stacks vertically on phones and
 * lays out horizontally from `sm` up; `compact` renders the small version used on cards.
 */
export default function FlowDiagram({ nodes, compact = false }: { nodes: FlowNode[]; compact?: boolean }) {
  if (compact) {
    return (
      <ol className="flex flex-col items-center justify-center gap-1 h-full w-full p-5" aria-label="Architecture">
        {nodes.map((n, i) => (
          <li key={n.label} className="flex flex-col items-center gap-1">
            <span className="rounded-md border border-border bg-background/80 px-2.5 py-1 font-mono text-[0.68rem] tracking-tight text-foreground/90 shadow-sm">
              {n.label}
            </span>
            {i < nodes.length - 1 && <span className="h-2 w-px bg-border" aria-hidden="true" />}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className="flex flex-col sm:flex-row sm:flex-wrap items-stretch justify-center gap-y-2 rounded-xl border border-border bg-muted/40 p-5 sm:p-6">
      {nodes.map((n, i) => (
        <li key={n.label} className="flex flex-col sm:flex-row items-center">
          <div className="w-full sm:w-auto sm:min-w-[9rem] sm:max-w-[13rem] rounded-lg border border-border bg-card px-3.5 py-2.5 shadow-sm">
            <div className="text-sm font-semibold leading-snug">{n.label}</div>
            {n.sub && <div className="mt-0.5 font-mono text-[0.7rem] leading-snug text-muted-foreground">{n.sub}</div>}
          </div>
          {i < nodes.length - 1 && (
            <ArrowRight
              className="my-1 sm:my-0 sm:mx-2 h-4 w-4 shrink-0 rotate-90 sm:rotate-0 text-muted-foreground"
              aria-hidden="true"
            />
          )}
        </li>
      ))}
    </ol>
  );
}
