import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { BrandStatement } from "@/components/brand-statement"
import { ScienceSection } from "@/components/science-section"
import { HowItWorks } from "@/components/how-it-works"
import { StatsSection } from "@/components/stats-section"
import { GlobalReach } from "@/components/global-reach"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { ScrollBrightness } from "@/components/scroll-brightness"

function SectionDivider({ intensity = 15 }: { intensity?: number }) {
  return (
    <div
      className="h-px w-full"
      style={{
        background: `linear-gradient(to right, transparent, rgba(201, 168, 76, ${intensity / 100}) 50%, transparent)`,
      }}
    />
  )
}

export default function Home() {
  return (
    <ScrollBrightness>
      <main className="noise-overlay">
        <Navigation />
        <Hero />
        <SectionDivider intensity={8} />
        <BrandStatement />
        <SectionDivider intensity={10} />
        <ScienceSection />
        <SectionDivider intensity={12} />
        <HowItWorks />
        <SectionDivider intensity={15} />
        <StatsSection />
        <SectionDivider intensity={18} />
        <GlobalReach />
        <SectionDivider intensity={22} />
        <CTASection />
        <Footer />
      </main>
    </ScrollBrightness>
  )
}
