import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { MissionSection } from "@/components/mission-section"
import { PackagesMarquee } from "@/components/packages-marquee"
import { ServicesSection } from "@/components/services-section"
import { ScienceSection } from "@/components/science-section"
import { StatsSection } from "@/components/stats-section"
import { AboutSection } from "@/components/about-section"
import { CTASection } from "@/components/cta-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <PackagesMarquee />
      <MissionSection />
      <ServicesSection />
      <ScienceSection />
      <StatsSection />
      <TestimonialsSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </main>
  )
}
