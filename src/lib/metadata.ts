import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export function createGenerateMetadata(namespace: string) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>
  }): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace })
    return {
      title: t('metaTitle'),
      description: t('metaDescription'),
    }
  }
}
