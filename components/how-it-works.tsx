"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: "01",
    title: "Comprehensive Assessment",
    description:
      "Your journey begins with an in-depth consultation and an expanded diagnostic panel \u2014 which may include blood, hormonal, metabolic, inflammatory, and genomic markers, along with advanced imaging when clinically appropriate. Each assessment is structured around your individual risk profile and health goals.",
  },
  {
    number: "02",
    title: "AI-Supported Analysis",
    description:
      "Your results are integrated into KAIRA\u2019s analytics platform, where AI-enabled tools assist in identifying patterns, correlations, and longitudinal trends across multiple data sources. By examining data collectively rather than in isolation, this approach supports a more structured and contextual understanding of your health. All insights are reviewed and interpreted by physicians.",
  },
  {
    number: "03",
    title: "Physician Review & Personalised Plan",
    description:
      "Your dedicated KAIRA physician reviews each finding in detail and develops an individualised health plan. This may include nutrition guidance, supplementation strategies, pharmaceutical therapy when indicated, specialist referrals, and defined monitoring targets.",
  },
  {
    number: "04",
    title: "Ongoing Monitoring",
    description:
      "Health evolves over time. KAIRA supports periodic reassessment of biomarkers and clinical indicators to help identify meaningful changes and guide adjustments to your care plan as appropriate. Physician access and follow-up are structured to ensure continuity and clarity.",
  },
]

export function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>(0.1)

  return (
    <section ref={ref} id="how-it-works" className="relative py-28 lg:py-40">
      {/* Gold particle stream accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/brand/kaira_hero_bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: "calc(0.08 * (1 - var(--scroll-brightness, 0)))",
        }}
      />
      {/* Growing gold glow — light emerging */}
      <div
        className="absolute left-0 top-1/3 w-[500px] h-[500px] bg-gold/[0.025] rounded-full blur-[120px] pointer-events-none"
        style={{ opacity: "calc(1 - var(--scroll-brightness, 0) * 0.6)" }}
      />
      <div
        className="absolute right-0 bottom-1/4 w-[300px] h-[300px] bg-gold/[0.02] rounded-full blur-[100px] pointer-events-none"
        style={{ opacity: "calc(1 - var(--scroll-brightness, 0) * 0.6)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header — staggered reveal */}
        <div className="max-w-2xl">
          <p
            className={cn(
              "text-[13px] uppercase tracking-[0.3em] text-gold-sub mb-6 transition-all duration-700",
              isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
            )}
          >
            How It Works
          </p>
          <h2
            className={cn(
              "font-serif text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl text-balance transition-all duration-700",
              isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
            )}
            style={{ animationDelay: "100ms" }}
          >
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
                  "relative flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-16",
                  isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
                )}
                style={{ animationDelay: `${200 + i * 150}ms` }}
              >
                {/* Step number dot with pulse ring */}
                <div className="flex-shrink-0 flex items-center gap-4 lg:w-12">
                  <div className="relative flex h-12 w-12 items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-gold/20 bg-gold/[0.05]" />
                    {/* Pulse ring on scroll reveal */}
                    {isVisible && (
                      <div
                        className="absolute inset-0 rounded-full border-2 border-gold/30 animate-pulse-ring"
                        style={{ animationDelay: `${300 + i * 200}ms` }}
                      />
                    )}
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
                  <p className="mt-4 text-[15px] leading-relaxed text-prose">
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
