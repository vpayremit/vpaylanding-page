import AboutContent from '@/components/sections/AboutContent'
import { createGenerateMetadata } from '@/lib/metadata'

export const generateMetadata = createGenerateMetadata('aboutPage', {
  pathname: '/about',
  image: '/images/og-about.png',
})

export default function AboutPage() {
  return <AboutContent />
}
