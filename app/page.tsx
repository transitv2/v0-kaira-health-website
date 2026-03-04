import dynamic from "next/dynamic"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { BrandStatement } from "@/components/brand-statement"
import { ScienceSection } from "@/components/science-section"
import { Footer } from "@/components/footer"

// Below-fold sections: lazy-loaded to reduce initial JS bundle
const HowItWorks = dynamic(
  () => import("@/components/how-it-works").then((m) => m.HowItWorks)
)
const StatsSection = dynamic(
  () => import("@/components/stats-section").then((m) => m.StatsSection)
)
const GlobalReach = dynamic(
  () => import("@/components/global-reach").then((m) => m.GlobalReach)
)
const CTASection = dynamic(
  () => import("@/components/cta-section").then((m) => m.CTASection)
)

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
