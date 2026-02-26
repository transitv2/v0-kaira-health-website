"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const features = [
  "AI-enhanced MRI interpretation for earliest cancer detection",
  "Proprietary algorithms detecting 50+ cancer types from blood samples",
  "Coronary soft-plaque detection before cardiac events",
  "Machine-learning biological age assessment from DNA methylation",
  "Whole genome sequencing with 350,000+ health associations",
  "Continuous R&D partnerships with global diagnostic leaders",
]

export function ScienceSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section ref={ref} id="science" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div
            className={cn(
              "relative",
              isVisible ? "animate-scale-in" : "opacity-0"
            )}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/services-lab.jpg"
                alt="Advanced diagnostic laboratory"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 rounded-xl border border-border bg-card p-5 shadow-xl lg:-right-8 animate-float">
              <div className="text-3xl font-bold text-accent font-serif">98%</div>
              <div className="text-xs text-muted-foreground mt-1">Detection Accuracy</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span
              className={cn(
                "text-sm font-medium uppercase tracking-widest text-accent",
                isVisible ? "animate-fade-up" : "opacity-0"
              )}
            >
              The Science
            </span>
            <h2
              className={cn(
                "mt-4 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance",
                isVisible ? "animate-fade-up delay-100" : "opacity-0"
              )}
            >
              Breakthrough AI-Enabled Diagnostics
            </h2>
            <p
              className={cn(
                "mt-6 text-lg leading-relaxed text-muted-foreground text-pretty",
                isVisible ? "animate-fade-up delay-200" : "opacity-0"
              )}
            >
              Global advancements in diagnostic R&D combined with breakthrough AI
              have propelled screening technologies to levels almost unimaginable
              a short time ago. Kaira Health brings these innovations to you.
            </p>

            <ul className="mt-8 space-y-4">
              {features.map((feature, i) => (
                <li
                  key={i}
                  className={cn(
                    "flex items-start gap-3",
                    isVisible ? "animate-fade-up" : "opacity-0"
                  )}
                  style={{ animationDelay: `${300 + i * 60}ms` }}
                >
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className={cn(
                "group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all duration-300 hover:gap-3",
                isVisible ? "animate-fade-up delay-700" : "opacity-0"
              )}
            >
              Learn more about our science
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
