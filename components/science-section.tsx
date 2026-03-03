"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { Microscope, Brain, UserCheck } from "lucide-react"

const pillars = [
  {
    icon: Microscope,
    title: "Advanced Diagnostics Aggregation",
    description:
      "We draw from a network of accredited laboratories and imaging centres \u2014 not a single vendor, but a curated selection. Over 200 biomarkers across metabolic, hormonal, cardiovascular, inflammatory, immune, and genomic panels. Advanced imaging when clinically indicated. Screening protocols structured to complement standard care.",
    accent: "Depth and rigour, built into every assessment.",
    number: "01",
  },
  {
    icon: Brain,
    title: "AI-Supported Pattern Analysis",
    description:
      "KAIRA\u2019s analytics platform assists in identifying patterns, correlations, and longitudinal trends across large volumes of data. By establishing an individual baseline and monitoring change over time, it supports earlier recognition of meaningful shifts. All findings are reviewed and interpreted by physicians within the context of your complete clinical picture.",
    accent: "Your data \u2014 analysed with the depth and structure it deserves.",
    number: "02",
  },
  {
    icon: UserCheck,
    title: "Physician-Led Personalised Care",
    description:
      "Each KAIRA client is paired with a dedicated physician who reviews results in detail, explains findings clearly, and develops an individualised care plan. Consultations are structured to allow time for thorough discussion and continuity of care, with coordination across specialists when appropriate.",
    accent: "Personalised medicine requires time, context, and clinical judgment.",
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
        {/* Header — staggered reveal */}
        <div className="max-w-3xl">
          <p
            className={cn(
              "text-[13px] uppercase tracking-[0.3em] text-gold-sub mb-6 transition-all duration-700",
              isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
            )}
          >
            The Science
          </p>
          <h2
            className={cn(
              "font-serif text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl text-balance transition-all duration-700",
              isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
            )}
            style={{ animationDelay: "100ms" }}
          >
            A Comprehensive Approach to Health Intelligence
          </h2>
          <p
            className={cn(
              "mt-6 text-lg leading-relaxed text-prose max-w-2xl transition-all duration-700",
              isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
            )}
            style={{ animationDelay: "200ms" }}
          >
            Many systems focus on individual tests. KAIRA integrates data. We move beyond isolated lab results or single imaging studies by bringing together advanced diagnostics into a unified, longitudinal view of your health. By combining laboratory testing, imaging, genomics, and AI-supported analysis, we aim to provide a higher-resolution understanding of risk — interpreted by physicians within the context of your full clinical picture.
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
                style={{ animationDelay: `${300 + i * 150}ms` }}
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
            The most valuable health insight is the one
            <br />
            that arrives before symptoms do.
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
