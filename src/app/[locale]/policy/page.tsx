import PolicyContent from '@/components/sections/PolicyContent'
import { createGenerateMetadata } from '@/lib/metadata'

export const generateMetadata = createGenerateMetadata('policyPage')

export default function PolicyPage() {
  return <PolicyContent />
}
