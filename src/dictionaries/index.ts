import 'server-only'

export const locales = ['en', 'pt', 'es'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  pt: () => import('./pt.json').then((module) => module.default),
  es: () => import('./es.json').then((module) => module.default),
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/**
 * Any path that is not a real file and carries no locale prefix (e.g. `/apple-touch-icon.png`)
 * lands in the `[lang]` segment. Fall back to English instead of throwing; the `[lang]` layout
 * turns those requests into a 404.
 */
export const getDictionary = async (locale: string) =>
  dictionaries[isLocale(locale) ? locale : defaultLocale]()

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
