import 'server-only'
 
export type Locale = keyof typeof dictionaries
 
const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  pt: () => import('./pt.json').then((module) => module.default),
  es: () => import('./es.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: Locale) => dictionaries[locale]()