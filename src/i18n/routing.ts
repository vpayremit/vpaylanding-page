import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
  localeDetection: false,
})

export function isValidLocale(locale: string): locale is (typeof routing.locales)[number] {
  return routing.locales.some((value) => value === locale)
}
