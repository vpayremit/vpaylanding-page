import SubpageScaffold from '@/components/layout/SubpageScaffold'
import { getTranslations } from 'next-intl/server'

export default async function TermsPage() {
  const t = await getTranslations('footer')
  return <SubpageScaffold title={t('links.terms')} />
}
