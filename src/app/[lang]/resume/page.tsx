import type { Metadata } from "next";
import BackButton from "@/components/back-button";
import PrintButton from "@/components/print-button";
import { EDUCATION, EXPERIENCE, PUBLICATIONS } from "@/content/experience";
import { getDictionary } from "@/dictionaries";
import { LangProps } from "@/interfaces";

export async function generateMetadata({ params: { lang } }: LangProps): Promise<Metadata> {
  const intl = await getDictionary(lang);
  return {
    title: intl["resume-title"],
    alternates: { canonical: `https://marotta.dev/${lang}/resume` },
  };
}

const SKILLS = {
  Geospatial: ["PostGIS", "GeoServer", "QGIS / PyQGIS", "GDAL / PDAL", "Entwine / Potree", "LADM", "Photogrammetry", "GNSS"],
  "Full-stack": ["TypeScript", "React", "Next.js", "Node.js", "Fastify / Express", "Python", "FastAPI", "Django", "Ionic"],
  "Orchestration & infra": ["n8n", "Ordo", "Docker", "Kubernetes", "Argo Workflows", "Cloudflare", "GitOps", "Sentinel"],
};

const HEADLINE: Record<string, string> = {
  en: "Surveying & Cartographic Engineer · Founder, Territorial · Geographic Information Technologist, IBGE · Brasília, Brazil",
  pt: "Engenheiro Agrimensor e Cartógrafo · Fundador, Territorial · Tecnologista em Informações Geográficas, IBGE · Brasília, Brasil",
  es: "Ingeniero Agrimensor y Cartógrafo · Fundador, Territorial · Tecnólogo en Información Geográfica, IBGE · Brasilia, Brasil",
};

const LABELS: Record<string, { experience: string; education: string; publications: string; skills: string }> = {
  en: { experience: "Experience", education: "Education", publications: "Publications", skills: "Skills" },
  pt: { experience: "Experiência", education: "Formação", publications: "Publicações", skills: "Competências" },
  es: { experience: "Experiencia", education: "Formación", publications: "Publicaciones", skills: "Competencias" },
};

export default async function Resume({ params: { lang } }: LangProps) {
  const intl = await getDictionary(lang);
  const t = LABELS[lang];

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-10 animate-in fade-in duration-700">
      <div className="print:hidden flex flex-row justify-between items-center">
        <BackButton lang={lang} />
        <PrintButton label={intl["resume-print"]} />
      </div>

      <article className="max-w-3xl mx-auto mt-6 w-full flex flex-col gap-8 print:mt-0 print:text-black">
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Victor Marotta</h1>
          <p className="text-foreground/80 print:text-black">{HEADLINE[lang]}</p>
          <p className="text-sm text-foreground/70 print:text-black">victor@marotta.dev · marotta.dev · linkedin.com/in/victor-marotta-5055ab60 · github.com/paschendale</p>
        </header>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold border-b border-border pb-1">{t.experience}</h2>
          <div className="flex flex-col gap-5">
            {EXPERIENCE.map((job) => (
              <div key={`${job.org}-${job.period}`} className="flex flex-col gap-1 print:break-inside-avoid">
                <div className="flex flex-row justify-between flex-wrap gap-x-4">
                  <span className="font-semibold">{job.role[lang]} — {job.org}</span>
                  <span className="text-sm text-foreground/70 print:text-black whitespace-nowrap">{job.period} · {job.location}</span>
                </div>
                <p className="m-0 text-sm text-foreground/85 print:text-black leading-relaxed">{job.summary[lang]}</p>
                {job.bullets && (
                  <ul className="list-disc pl-5 text-sm text-foreground/85 print:text-black leading-relaxed">
                    {job.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold border-b border-border pb-1">{t.education}</h2>
          {EDUCATION.map((e) => (
            <div key={e.degree.en} className="flex flex-row justify-between flex-wrap gap-x-4 text-sm">
              <span><span className="font-semibold">{e.degree[lang]}</span> — {e.org}</span>
              <span className="text-foreground/70 print:text-black whitespace-nowrap">{e.period}</span>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold border-b border-border pb-1">{t.publications}</h2>
          <ul className="list-disc pl-5 text-sm text-foreground/85 print:text-black leading-relaxed">
            {PUBLICATIONS.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </section>

        <section className="flex flex-col gap-3 print:break-inside-avoid">
          <h2 className="text-lg font-semibold border-b border-border pb-1">{t.skills}</h2>
          <div className="flex flex-col gap-2 text-sm">
            {Object.entries(SKILLS).map(([group, items]) => (
              <div key={group}>
                <span className="font-semibold">{group}: </span>
                <span className="text-foreground/85 print:text-black">{items.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
