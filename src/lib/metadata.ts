import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { routing } from '@/i18n/routing'
import type { LocalePageProps } from '@/types'

const FALLBACK_SITE_URL = 'https://vpaylanding-page.vercel.app'

function normalizePathname(pathname: string) {
  if (pathname === '/') {
    return '/'
  }

  return pathname.startsWith('/') ? pathname : `/${pathname}`
}

function getLocalizedPath(locale: string, pathname: string) {
  const normalizedPathname = normalizePathname(pathname)

  if (normalizedPathname === '/') {
    return `/${locale}`
  }

  return `/${locale}${normalizedPathname}`
}

function getXDefaultPath(pathname: string) {
  const normalizedPathname = normalizePathname(pathname)
  return normalizedPathname === '/' ? '/' : normalizedPathname
}

export function getSiteUrl() {
  const rawSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : FALLBACK_SITE_URL)

  return new URL(rawSiteUrl)
}

export function createBasicMetadata({
  locale,
  pathname,
  title,
  description,
  image,
  type = 'website',
}: {
  locale: string
  pathname: string
  title: string
  description: string
  image: string
  type?: 'website' | 'article'
}): Metadata {
  const localizedPath = getLocalizedPath(locale, pathname)
  const xDefaultPath = getXDefaultPath(pathname)
  const localizedImages = [{ url: image, alt: title }]

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath,
      languages: {
        ko: getLocalizedPath('ko', pathname),
        en: getLocalizedPath('en', pathname),
        'x-default': xDefaultPath,
      },
    },
    openGraph: {
      type,
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      url: localizedPath,
      title,
      description,
      siteName: 'V Pay',
      images: localizedImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export function createGenerateMetadata(
  namespace: string,
  options: { pathname: string; image: string }
) {
  return async function generateMetadata({
    params,
  }: LocalePageProps): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace })
    return createBasicMetadata({
      locale,
      pathname: options.pathname,
      title: t('metaTitle'),
      description: t('metaDescription'),
      image: options.image,
    })
  }
}
