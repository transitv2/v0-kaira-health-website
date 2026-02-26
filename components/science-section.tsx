"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { Microscope, Brain, UserCheck } from "lucide-react"

const pillars = [
  {
    icon: Microscope,
    title: "Advanced Diagnostics Aggregation",
    description:
      "We draw from the world\u2019s leading laboratories and imaging centers \u2014 not a single vendor, but a curated network of the best. Over 200 biomarkers across metabolic, hormonal, cardiovascular, inflammatory, immune, and genomic panels.",
    accent: "We don\u2019t choose what\u2019s convenient. We choose what\u2019s definitive.",
    number: "01",
  },
  {
    icon: Brain,
    title: "AI-Powered Pattern Recognition",
    description:
      "KAIRA\u2019s proprietary analytics engine identifies patterns, correlations, and early signals that no single physician could spot across hundreds of data points. It learns your baseline. It detects deviation. It flags what matters before it becomes a diagnosis.",
    accent: "Your data, read with a precision that matches its complexity.",
    number: "02",
  },
  {
    icon: UserCheck,
    title: "Physician-Led Concierge Care",
    description:
      "Every KAIRA client is matched with a dedicated physician who reviews every result, explains every finding, and builds a personalized longevity protocol \u2014 with direct access, unhurried consultations, and coordination across specialists when needed.",
    accent: "The rarest thing in modern medicine: a doctor who has the time to care.",
    number: "03",
  },
]

export function ScienceSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>(0.1)

  return (
    <section ref={ref} id="science" className="relative py-28 lg:py-40 bg-navy-light/50">
      {/* Background accent */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-gold/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div
          className={cn(
            "max-w-3xl transition-all duration-1000",
            isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-[13px] uppercase tracking-[0.3em] text-gold/40 mb-6">
            The Science
          </p>
          <h2 className="font-serif text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl text-balance">
            The Most Comprehensive Health Intelligence System Ever Built
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-cream-dim/50 max-w-2xl">
            {"Other platforms test. KAIRA "}
            <em>synthesizes</em>
            {". We don\u2019t believe in one test, one scan, or one data point. We believe in resolution \u2014 the kind that comes from aggregating the world\u2019s most advanced diagnostics into a single, coherent picture of your health."}
          </p>
        </div>

        {/* Three pillar cards */}
        <div className="mt-16 lg:mt-24 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.number}
                className={cn(
                  "group relative rounded-2xl border border-cream/[0.06] bg-cream/[0.02] p-8 lg:p-10 transition-all duration-700 hover:border-gold/[0.15] hover:bg-cream/[0.04]",
                  isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
                )}
                style={{ animationDelay: `${200 + i * 150}ms` }}
              >
                <span className="text-[11px] font-mono tracking-widest text-gold/30">
                  {pillar.number}
                </span>

                <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-xl border border-gold/[0.12] bg-gold/[0.05]">
                  <Icon className="h-5 w-5 text-gold/70" strokeWidth={1.5} />
                </div>

                <h3 className="mt-6 font-serif text-xl font-bold text-cream leading-snug">
                  {pillar.title}
                </h3>

                <p className="mt-4 text-[15px] leading-relaxed text-cream-dim/45">
                  {pillar.description}
                </p>

                <p className="mt-6 text-sm italic text-gold/40 leading-relaxed border-t border-cream/[0.04] pt-6">
                  {pillar.accent}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
