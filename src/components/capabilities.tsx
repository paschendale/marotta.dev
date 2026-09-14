import { Database, Layers3, MonitorSmartphone, ServerCog } from "lucide-react";
import type { Dictionary } from "@/dictionaries";

const AREAS = [
  { key: "geo", Icon: Layers3, tools: ["PostGIS", "GDAL / PDAL", "GeoServer", "QGIS", "LADM", "Entwine / Potree", "Photogrammetry"] },
  { key: "backend", Icon: ServerCog, tools: ["TypeScript / Node.js", "Python / FastAPI", "PostgreSQL", "n8n", "Ordo", "MCP"] },
  { key: "clients", Icon: MonitorSmartphone, tools: ["React / Next.js", "MapLibre / OpenLayers", "Cesium / Potree", "Ionic", "Tailwind CSS"] },
  { key: "infra", Icon: Database, tools: ["Docker", "Kubernetes", "Argo Workflows", "Cloudflare", "GitOps", "Sentinel"] },
] as const;

export default function Capabilities({ intl }: { intl: Dictionary }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {AREAS.map(({ key, Icon, tools }) => (
        <article key={key} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon size={18} aria-hidden="true" />
            </span>
            <h3 className="text-base font-semibold">{intl[`cap-${key}-title` as const]}</h3>
          </div>
          <p className="text-sm leading-relaxed text-foreground/80">{intl[`cap-${key}-body` as const]}</p>
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {tools.map((t) => (
              <li key={t} className="rounded-md border border-border bg-secondary/60 px-2 py-0.5 font-mono text-[0.7rem] text-secondary-foreground">{t}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
