import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import TheProblem from '@/components/sections/TheProblem'
import TheSolution from '@/components/sections/TheSolution'
import HowItWorks from '@/components/sections/HowItWorks'
import WhyPixelAndPanel from '@/components/sections/WhyPixelAndPanel'
import ServiceArea from '@/components/sections/ServiceArea'
import CTABanner from '@/components/sections/CTABanner'

export const metadata = {
  title: 'Pixel & Panel | Phygital Branding Agency — Beaumont, TX',
  description: 'Pixel & Panel bridges physical signage and digital marketing for Texas businesses. Custom signs with QR tracking, websites, local SEO, and CRM automation.',
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <TheProblem />
      <TheSolution />
      <HowItWorks />
      <WhyPixelAndPanel />
      <ServiceArea />
      <CTABanner />
      <Footer />
    </>
  )
}