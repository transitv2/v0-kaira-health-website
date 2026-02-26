"use client"

import { ArrowRight } from "lucide-react"
import { ParticleField } from "@/components/particle-field"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Deep layered gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,oklch(0.18_0.04_200),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,oklch(0.14_0.03_260),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_70%,oklch(0.16_0.04_190),transparent)]" />
      </div>

      {/* Particle mesh */}
      <div className="absolute inset-0 z-[1]">
        <ParticleField />
      </div>

      {/* Main content — centered, immersive */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-8 lg:pt-40 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/[0.06] backdrop-blur-xl px-5 py-2 mb-10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-sm font-medium text-foreground/80 tracking-wide">
              Now Accepting Early Members
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up delay-100 max-w-5xl text-balance font-serif text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            {"It's time you own "}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-accent via-[oklch(0.72_0.12_200)] to-accent bg-clip-text text-transparent">
              your health
            </span>
          </h1>

          {/* Subhead */}
          <p className="animate-fade-up delay-200 mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            AI-powered longevity medicine. The earliest possible detection and intervention
            for cancers, cardiovascular disease, and neurological disorders.
            Every year. Starting at one comprehensive assessment.
          </p>

          {/* CTA row */}
          <div className="animate-fade-up delay-300 mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-10 py-4.5 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Your Assessment
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#mission"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/[0.12] bg-foreground/[0.04] backdrop-blur-xl px-8 py-4 text-base font-medium text-foreground/80 transition-all duration-300 hover:border-foreground/[0.2] hover:bg-foreground/[0.07] hover:text-foreground"
            >
              How It Works
            </a>
          </div>
        </div>

        {/* Glass stat cards — floating below the hero text */}
        <div className="animate-fade-up delay-500 mt-20 lg:mt-28 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {[
            { value: "100+", label: "Biomarkers Tested", sub: "Annual comprehensive panel" },
            { value: "50+", label: "Cancer Types Detected", sub: "From a single blood draw" },
            { value: "8x", label: "Earlier Detection", sub: "Than traditional screening" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="group relative rounded-2xl border border-foreground/[0.08] bg-foreground/[0.03] backdrop-blur-2xl p-6 lg:p-8 text-center transition-all duration-500 hover:border-accent/25 hover:bg-foreground/[0.05]"
              style={{ animationDelay: `${600 + i * 100}ms` }}
            >
              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
              <div className="relative">
                <p className="font-serif text-3xl font-bold text-accent lg:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-foreground/90">{stat.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in delay-800">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground/60 uppercase tracking-[0.2em]">Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-accent/40 to-transparent" />
        </div>
      </div>
    </section>
  )
}
