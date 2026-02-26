"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import {
  Activity,
  Dna,
  ScanLine,
  HeartPulse,
  BrainCircuit,
  Sparkles,
} from "lucide-react"

const services = [
  {
    icon: ScanLine,
    title: "Full-Body MRI with AI",
    description:
      "Safe, high-resolution, non-invasive body and brain scans with AI-enhanced detection of tumours, tissue changes, and neurological conditions.",
    tag: "Screening",
  },
  {
    icon: HeartPulse,
    title: "Cardiac CT Angiography",
    description:
      "AI-powered detection of early arterial plaque formation — identifying heart attack and stroke risk before symptoms appear.",
    tag: "Heart",
  },
  {
    icon: Activity,
    title: "Early Cancer Detection",
    description:
      "AI-enhanced blood analysis detecting over 50 cancer types at stages 0-1, including 45+ types that lack routine screening tools.",
    tag: "Cancer",
  },
  {
    icon: Dna,
    title: "Whole Genome Sequencing",
    description:
      "Deep DNA analysis with 350,000+ genomic associations — the most comprehensive genetic health assessment available.",
    tag: "Genomics",
  },
  {
    icon: BrainCircuit,
    title: "Cognitive Health Screening",
    description:
      "Earliest possible detection of Alzheimer's, dementia, and other neurological conditions through advanced AI brain imaging.",
    tag: "Brain",
  },
  {
    icon: Sparkles,
    title: "Health Optimization",
    description:
      "Personalized treatment plans including lifestyle programs, IV therapy, nutraceuticals, and innovative interventions for peak performance.",
    tag: "Optimization",
  },
]

export function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section ref={ref} id="services" className="relative py-24 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span
            className={cn(
              "text-sm font-medium uppercase tracking-widest text-accent",
              isVisible ? "animate-fade-up" : "opacity-0"
            )}
          >
            Our Services
          </span>
          <h2
            className={cn(
              "mt-4 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance",
              isVisible ? "animate-fade-up delay-100" : "opacity-0"
            )}
          >
            Advanced Screening & Diagnostics
          </h2>
          <p
            className={cn(
              "mt-6 text-lg leading-relaxed text-muted-foreground text-pretty",
              isVisible ? "animate-fade-up delay-200" : "opacity-0"
            )}
          >
            A comprehensive suite of AI-enabled biomedical scans and assessments
            — providing the deepest insights into your personal biology.
          </p>
        </div>

        {/* Services grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border bg-background p-8 transition-all duration-500 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1",
                isVisible ? "animate-fade-up" : "opacity-0"
              )}
              style={{ animationDelay: `${300 + i * 80}ms` }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                  <service.icon className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {service.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground font-serif">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
