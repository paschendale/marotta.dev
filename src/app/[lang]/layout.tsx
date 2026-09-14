import { notFound } from "next/navigation";
import { isLocale, locales } from "@/dictionaries";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLocale(lang)) notFound();
  return children;
}
