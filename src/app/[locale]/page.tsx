import FAQ from '@/components/sections/FAQ'
import Hero from '@/components/sections/Hero'
import RemittanceProcess from '@/components/sections/RemittanceProcess'
import Services from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'
import WhyVPay from '@/components/sections/WhyVPay'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <Testimonials />
      <WhyVPay />
      <RemittanceProcess />
      <FAQ />
    </main>
  )
}
