import ContactContent from '@/components/sections/ContactContent'
import { createGenerateMetadata } from '@/lib/metadata'

export const generateMetadata = createGenerateMetadata('contactPage')

export default function ContactPage() {
  return <ContactContent />
}
