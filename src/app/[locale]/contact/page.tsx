import ContactContent from '@/components/sections/ContactContent'
import { createGenerateMetadata } from '@/lib/metadata'

export const generateMetadata = createGenerateMetadata('contactPage', {
  pathname: '/contact',
  image: '/images/contact-office-photo.png',
})

export default function ContactPage() {
  return <ContactContent />
}
