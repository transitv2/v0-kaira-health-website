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
    <section ref={ref} id="science" className="relative py-28 lg:py-40">
      {/* Neural network background image — fades out as page brightens */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/brand/kaira-science-section-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: "calc(0.10 * (1 - var(--scroll-brightness, 0)))",
        }}
      />
      {/* Background accent — growing gold presence */}
      <div
        className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[150px] pointer-events-none"
        style={{ opacity: "calc(1 - var(--scroll-brightness, 0) * 0.6)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div
          className={cn(
            "max-w-3xl transition-all duration-1000",
            isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-[13px] uppercase tracking-[0.3em] text-gold-sub mb-6">
            The Science
          </p>
          <h2 className="font-serif text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl text-balance">
            The Most Comprehensive Health Intelligence System Ever Built
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-prose max-w-2xl">
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
                  "group relative rounded-2xl border border-border bg-card backdrop-blur-sm p-8 lg:p-10 transition-all duration-700 hover:border-gold/20 hover:bg-card",
                  isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
                )}
                style={{ animationDelay: `${200 + i * 150}ms` }}
              >
                {/* Decorative watermark number */}
                <span className="absolute top-4 right-6 text-7xl font-serif font-bold text-gold/[0.07] select-none pointer-events-none leading-none">
                  {pillar.number}
                </span>

                <span className="relative text-[11px] font-mono tracking-widest text-gold/30">
                  {pillar.number}
                </span>

                <div className="relative mt-6 flex h-12 w-12 items-center justify-center rounded-xl border border-gold/[0.12] bg-gold/[0.05] shadow-[0_0_30px_rgba(201,168,76,0.15)]">
                  <Icon className="h-5 w-5 text-gold/70" strokeWidth={1.5} />
                </div>

                <h3 className="mt-6 font-serif text-xl font-bold text-cream leading-snug">
                  {pillar.title}
                </h3>

                <p className="mt-4 text-[15px] leading-relaxed text-prose">
                  {pillar.description}
                </p>

                <p className="mt-6 text-sm italic text-gold-sub leading-relaxed border-t border-border pt-6">
                  {pillar.accent}
                </p>
              </div>
            )
          })}
        </div>

        {/* Transition phrase — fades in as you scroll toward the light */}
        <div
          className="mt-24 lg:mt-32"
          style={{ opacity: "var(--scroll-brightness, 0)" }}
        >
          <p
            className={cn(
              "text-center font-serif text-3xl italic text-cream sm:text-4xl lg:text-5xl leading-snug transition-all duration-1000 delay-500",
              isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
            )}
          >
            An approach that takes you out of the darkness
            <br />
            and into the light.
          </p>
          {/* Decorative wave accent */}
          <div
            className={cn(
              "mt-8 flex justify-center transition-all duration-1000 delay-700",
              isVisible ? "animate-fade-up" : "opacity-0 translate-y-4"
            )}
          >
            <svg width="120" height="20" viewBox="0 0 120 20" fill="none" className="text-gold/40">
              <path
                d="M0 10 Q15 0 30 10 Q45 20 60 10 Q75 0 90 10 Q105 20 120 10"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
