import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getDictionary, Locale } from "@/dictionaries";

interface BackButtonProps {
  lang: Locale;
}

export default async function BackButton({ lang }: BackButtonProps) {
  const intl = await getDictionary(lang);

  return (
    <Link href={`/${lang}`}>
      <Button
        variant={"link"}
        className="transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        aria-label={intl["go-back"]}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="m7.825 13l5.6 5.6L12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2z"
          ></path>
        </svg>
        <span>{intl["go-back"]}</span>
      </Button>
    </Link>
  );
}

