"use client"

import { ArrowRight, Play } from "lucide-react"
import Image from "next/image"
import { ParticleField } from "@/components/particle-field"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-health.jpg"
          alt="Futuristic healthcare environment"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Interactive particle field */}
      <div className="absolute inset-0 z-[1]">
        <ParticleField />
      </div>

      {/* Floating glow orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-accent/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 h-80 w-80 rounded-full bg-accent/8 blur-3xl animate-float delay-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-8 lg:pt-40">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-sm font-medium text-foreground">
              The Future of Preventative Medicine
            </span>
          </div>

          {/* Heading */}
          <h1 className="animate-fade-up delay-100 text-balance font-serif text-5xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Take Control of
            <br />
            <span className="text-accent">Your Health.</span>
            <br />
            Your Future.
          </h1>

          {/* Subheading */}
          <p className="animate-fade-up delay-200 mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
            Kaira Health unlocks access to AI-enabled longevity medicine with the
            earliest possible detection and intervention for cancers, cardiovascular,
            and neurological disorders.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-300 mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all duration-300 hover:bg-accent hover:shadow-xl hover:shadow-accent/20"
            >
              Begin Your Journey
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#mission"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/50 backdrop-blur-sm px-8 py-4 text-base font-semibold text-foreground transition-all duration-300 hover:border-accent/50 hover:bg-card"
            >
              <Play className="h-4 w-4 text-accent" />
              How It Works
            </a>
          </div>

          {/* Stats row */}
          <div className="animate-fade-up delay-500 mt-16 flex flex-wrap gap-12">
            {[
              { value: "50+", label: "Cancer Types Detected" },
              { value: "AI", label: "Enhanced Diagnostics" },
              { value: "360\u00B0", label: "Health Assessment" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-accent font-serif lg:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in delay-700">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
          <div className="h-12 w-px bg-gradient-to-b from-accent to-transparent" />
        </div>
      </div>
    </section>
  )
}
