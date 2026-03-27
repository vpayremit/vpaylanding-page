import FeesContent from '@/components/sections/FeesContent'
import { createGenerateMetadata } from '@/lib/metadata'

export const generateMetadata = createGenerateMetadata('feesPage', {
  pathname: '/fees',
  image: '/images/fees-banner.png',
})

export default function FeesPage() {
  return <FeesContent />
}
