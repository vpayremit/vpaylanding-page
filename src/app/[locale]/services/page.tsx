import { getTranslations } from 'next-intl/server'

import SubpageScaffold from '@/components/layout/SubpageScaffold'

export default async function ServicesPage() {
  const t = await getTranslations('nav')

  return <SubpageScaffold title={t('services')} />
}
