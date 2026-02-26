import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { BrandStatement } from "@/components/brand-statement"
import { ScienceSection } from "@/components/science-section"
import { HowItWorks } from "@/components/how-it-works"
import { StatsSection } from "@/components/stats-section"
import { GlobalReach } from "@/components/global-reach"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <BrandStatement />
      <ScienceSection />
      <HowItWorks />
      <StatsSection />
      <GlobalReach />
      <CTASection />
      <Footer />
    </main>
  )
}
