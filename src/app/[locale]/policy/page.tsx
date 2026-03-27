import PolicyContent from '@/components/sections/PolicyContent'
import { createGenerateMetadata } from '@/lib/metadata'

export const generateMetadata = createGenerateMetadata('policyPage', {
  pathname: '/policy',
  image: '/images/policy-hero-banner.png',
})

export default function PolicyPage() {
  return <PolicyContent />
}
