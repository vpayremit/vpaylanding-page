import FeesContent from '@/components/sections/FeesContent'
import { createGenerateMetadata } from '@/lib/metadata'

export const generateMetadata = createGenerateMetadata('feesPage')

export default function FeesPage() {
  return <FeesContent />
}
