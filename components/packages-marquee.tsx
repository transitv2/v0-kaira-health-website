"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const packages = [
  "MedAdvance Baseline",
  "MedAdvance Cancer",
  "MedAdvance Heart",
  "MedAdvance Brain",
  "MedAdvance Complete",
  "Health Optimization",
  "Genome Sequencing",
  "Biological Age Analysis",
]

export function PackagesMarquee() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section ref={ref} className="py-16 overflow-hidden border-y border-border bg-secondary">
      <div
        className={cn(
          "flex",
          isVisible ? "animate-fade-in" : "opacity-0"
        )}
      >
        <div className="flex shrink-0 animate-marquee items-center gap-8">
          {[...packages, ...packages].map((pkg, i) => (
            <div key={i} className="flex shrink-0 items-center gap-8">
              <span className="whitespace-nowrap text-lg font-medium text-foreground/60 font-serif lg:text-xl">
                {pkg}
              </span>
              <span className="h-2 w-2 rounded-full bg-accent/40" />
            </div>
          ))}
        </div>
        <div className="flex shrink-0 animate-marquee items-center gap-8" aria-hidden="true">
          {[...packages, ...packages].map((pkg, i) => (
            <div key={i} className="flex shrink-0 items-center gap-8">
              <span className="whitespace-nowrap text-lg font-medium text-foreground/60 font-serif lg:text-xl">
                {pkg}
              </span>
              <span className="h-2 w-2 rounded-full bg-accent/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
