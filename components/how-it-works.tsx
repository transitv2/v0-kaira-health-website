"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: "01",
    title: "Comprehensive Assessment",
    description:
      "Your journey begins with a deep-intake consultation and the most thorough diagnostic panel available \u2014 blood, hormonal, metabolic, inflammatory, and genomic markers, plus advanced imaging as indicated by your risk profile. This is not a checklist. It\u2019s a custom protocol designed around you.",
  },
  {
    number: "02",
    title: "AI-Powered Analysis",
    description:
      "Your results flow into KAIRA\u2019s analytics platform, where AI-enabled pattern recognition synthesizes data across every modality \u2014 identifying correlations, outliers, and early signals that single-test platforms cannot detect. Your health is not a spreadsheet. It\u2019s a system, and we read it as one.",
  },
  {
    number: "03",
    title: "Physician Review & Longevity Protocol",
    description:
      "Your dedicated KAIRA physician reviews every finding, translates complexity into clarity, and designs a personalized longevity protocol \u2014 covering nutrition, supplementation, pharmaceutical intervention when warranted, specialist referrals, and ongoing monitoring targets.",
  },
  {
    number: "04",
    title: "Continuous Monitoring & Optimization",
    description:
      "Health is not a snapshot. KAIRA tracks your biomarkers over time, detects trends before they become problems, and adjusts your protocol as your body changes. Your physician is always accessible. Your data is always current. Your health is always attended to.",
  },
]

export function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>(0.1)

  return (
    <section ref={ref} id="how-it-works" className="relative py-28 lg:py-40">
      {/* Subtle left glow */}
      <div className="absolute left-0 top-1/3 w-[400px] h-[400px] bg-gold/[0.015] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div
          className={cn(
            "max-w-2xl transition-all duration-1000",
            isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-[13px] uppercase tracking-[0.3em] text-gold/40 mb-6">
            How It Works
          </p>
          <h2 className="font-serif text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl text-balance">
            From Complexity to Clarity
          </h2>
        </div>

        {/* Steps — vertical timeline */}
        <div className="mt-16 lg:mt-24 relative">
          {/* Vertical line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-gold/20 via-gold/10 to-transparent hidden lg:block" />

          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={cn(
                  "relative flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12",
                  isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
                )}
                style={{ animationDelay: `${200 + i * 150}ms` }}
              >
                {/* Step number dot */}
                <div className="flex-shrink-0 flex items-center gap-4 lg:w-12">
                  <div className="relative flex h-12 w-12 items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-gold/20 bg-gold/[0.05]" />
                    <span className="relative text-xs font-mono font-bold text-gold tracking-widest">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content card */}
                <div className="flex-1 max-w-2xl lg:pt-1">
                  <h3 className="font-serif text-xl font-bold text-cream lg:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-cream-dim/45">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
