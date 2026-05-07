import Hero from '@/components/sections/Hero'
import TheProblem from '@/components/sections/TheProblem'
import TheSolution from '@/components/sections/TheSolution'
import HowItWorks from '@/components/sections/HowItWorks'
import WhyPixelAndPanel from '@/components/sections/WhyPixelAndPanel'
import ServiceArea from '@/components/sections/ServiceArea'
import CTABanner from '@/components/sections/CTABanner'

export const metadata = {
  title: {
    absolute: 'Websites, Signs & Print in Beaumont, Nederland & Port Arthur | Pixel & Panel',
  },
  description: 'Pixel & Panel helps businesses in Beaumont, Nederland, and Port Arthur, TX with custom signs, print materials, websites, local SEO, and QR-powered marketing.',
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TheProblem />
      <TheSolution />
      <HowItWorks />
      <WhyPixelAndPanel />
      <ServiceArea />
      <CTABanner />
    </>
  )
}
