"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { Shield, Brain, Heart } from "lucide-react"

const pillars = [
  {
    icon: Shield,
    number: "01",
    title: "Earliest Detection",
    description:
      "AI-powered diagnostics that detect conditions before symptoms appear, giving you the critical advantage of time.",
  },
  {
    icon: Brain,
    number: "02",
    title: "Proactive Intervention",
    description:
      "Evidence-based treatments and lifestyle programs tailored to your unique biology — preventing disease, not just treating it.",
  },
  {
    icon: Heart,
    number: "03",
    title: "Optimized Longevity",
    description:
      "A comprehensive approach to extending healthspan and lifespan through cutting-edge science and compassionate care.",
  },
]

export function MissionSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section ref={ref} id="mission" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl">
          <span
            className={cn(
              "text-sm font-medium uppercase tracking-widest text-accent",
              isVisible ? "animate-fade-up" : "opacity-0"
            )}
          >
            Our Mission
          </span>
          <h2
            className={cn(
              "mt-4 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance",
              isVisible ? "animate-fade-up delay-100" : "opacity-0"
            )}
          >
            The Changing Healthcare Paradigm
          </h2>
          <p
            className={cn(
              "mt-6 text-lg leading-relaxed text-muted-foreground text-pretty",
              isVisible ? "animate-fade-up delay-200" : "opacity-0"
            )}
          >
            Transition from reactive care to proactive, preventative medicine.
            Kaira Health leverages breakthrough AI-enabled technologies to provide
            the earliest possible detection of serious conditions — empowering
            interventions that can prevent progression and ultimately extend both
            healthspan and lifespan.
          </p>
        </div>

        {/* Pillars */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.number}
              className={cn(
                "group relative rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5",
                isVisible ? "animate-fade-up" : "opacity-0"
              )}
              style={{ animationDelay: `${300 + i * 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/20">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  {pillar.number}
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground font-serif">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
              {/* Decorative line */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
