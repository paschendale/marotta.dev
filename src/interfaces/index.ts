import { Locale } from "@/dictionaries"

export type LangProps = {
  params: {
    lang: Locale
  }
}

export type LangSlugProps = {
  params: {
    lang: Locale
    slug: string
  }
}
