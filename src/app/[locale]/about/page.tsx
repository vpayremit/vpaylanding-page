import AboutContent from '@/components/sections/AboutContent'
import { createGenerateMetadata } from '@/lib/metadata'

export const generateMetadata = createGenerateMetadata('aboutPage')

export default function AboutPage() {
  return <AboutContent />
}
