"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const conditions = [
  { name: "Heart Disease", category: "Cardiovascular" },
  { name: "Stroke", category: "Cardiovascular" },
  { name: "Type 2 Diabetes", category: "Metabolic" },
  { name: "Breast Cancer", category: "Cancer" },
  { name: "Colon Cancer", category: "Cancer" },
  { name: "Lung Cancer", category: "Cancer" },
  { name: "Prostate Cancer", category: "Cancer" },
  { name: "Pancreatic Cancer", category: "Cancer" },
  { name: "Alzheimer's", category: "Neurological" },
  { name: "Thyroid Disorders", category: "Endocrine" },
  { name: "Chronic Kidney Disease", category: "Organ" },
  { name: "Liver Disease", category: "Organ" },
  { name: "Lupus", category: "Autoimmune" },
  { name: "Celiac Disease", category: "Autoimmune" },
  { name: "Rheumatoid Arthritis", category: "Autoimmune" },
  { name: "Osteoporosis", category: "Skeletal" },
  { name: "Anemia", category: "Blood" },
  { name: "PCOS", category: "Hormonal" },
  { name: "Leukemia", category: "Cancer" },
  { name: "Lymphoma", category: "Cancer" },
]

const categoryColors: Record<string, string> = {
  Cardiovascular: "border-[oklch(0.65_0.15_15)]/30 hover:border-[oklch(0.65_0.15_15)]/60",
  Metabolic: "border-[oklch(0.7_0.12_60)]/30 hover:border-[oklch(0.7_0.12_60)]/60",
  Cancer: "border-accent/30 hover:border-accent/60",
  Neurological: "border-[oklch(0.6_0.12_280)]/30 hover:border-[oklch(0.6_0.12_280)]/60",
  Endocrine: "border-[oklch(0.7_0.1_150)]/30 hover:border-[oklch(0.7_0.1_150)]/60",
  Organ: "border-[oklch(0.65_0.1_50)]/30 hover:border-[oklch(0.65_0.1_50)]/60",
  Autoimmune: "border-[oklch(0.6_0.1_320)]/30 hover:border-[oklch(0.6_0.1_320)]/60",
  Skeletal: "border-foreground/[0.15] hover:border-foreground/[0.3]",
  Blood: "border-[oklch(0.6_0.15_20)]/30 hover:border-[oklch(0.6_0.15_20)]/60",
  Hormonal: "border-[oklch(0.65_0.12_310)]/30 hover:border-[oklch(0.65_0.12_310)]/60",
}

export function DiseaseMonitor() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-foreground/[0.02]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <span
            className={cn(
              "text-sm font-medium uppercase tracking-widest text-accent",
              isVisible ? "animate-fade-up" : "opacity-0"
            )}
          >
            Comprehensive Coverage
          </span>
          <h2
            className={cn(
              "mt-4 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance",
              isVisible ? "animate-fade-up delay-100" : "opacity-0"
            )}
          >
            Monitor for early indicators of thousands of diseases
          </h2>
          <p
            className={cn(
              "mt-6 text-lg leading-relaxed text-muted-foreground text-pretty",
              isVisible ? "animate-fade-up delay-200" : "opacity-0"
            )}
          >
            Our comprehensive testing panels screen for the earliest biomarker signals
            across every major disease category.
          </p>
        </div>

        {/* Disease tag cloud */}
        <div
          className={cn(
            "flex flex-wrap justify-center gap-3",
            isVisible ? "animate-fade-up delay-300" : "opacity-0"
          )}
        >
          {conditions.map((condition, i) => (
            <div
              key={condition.name}
              className={cn(
                "rounded-full border bg-foreground/[0.02] backdrop-blur-sm px-5 py-2.5 text-sm font-medium text-foreground/80 transition-all duration-300 cursor-default hover:bg-foreground/[0.05]",
                categoryColors[condition.category]
              )}
              style={{ animationDelay: `${300 + i * 30}ms` }}
            >
              {condition.name}
            </div>
          ))}
        </div>

        {/* Bottom indicator */}
        <p
          className={cn(
            "mt-10 text-center text-sm text-muted-foreground",
            isVisible ? "animate-fade-up delay-500" : "opacity-0"
          )}
        >
          And hundreds more conditions detected through 100+ biomarker tests
        </p>
      </div>
    </section>
  )
}
