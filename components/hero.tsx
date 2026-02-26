"use client"

import { ArrowRight, Play } from "lucide-react"
import { ParticleField } from "@/components/particle-field"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Deep gradient background layers */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient — deep midnight to teal hint */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[oklch(0.15_0.04_200)]" />
        {/* Top-left radial glow */}
        <div className="absolute -top-1/4 -left-1/4 h-[80vh] w-[80vh] rounded-full bg-accent/[0.07] blur-[120px]" />
        {/* Bottom-right radial glow */}
        <div className="absolute -bottom-1/4 -right-1/4 h-[60vh] w-[60vh] rounded-full bg-[oklch(0.5_0.1_260)]/[0.06] blur-[100px]" />
        {/* Center subtle warm wash */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[90vh] w-[90vh] rounded-full bg-accent/[0.03] blur-[160px]" />
      </div>

      {/* Interactive particle field */}
      <div className="absolute inset-0 z-[1]">
        <ParticleField />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-8 lg:pt-40 w-full">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left — main copy */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.08] backdrop-blur-sm px-4 py-1.5 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-sm font-medium text-foreground/90">
                The Future of Preventative Medicine
              </span>
            </div>

            {/* Heading */}
            <h1 className="animate-fade-up delay-100 text-balance font-serif text-5xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
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
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-foreground transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 hover:scale-[1.02]"
              >
                Begin Your Journey
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#mission"
                className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/20 backdrop-blur-md px-8 py-4 text-base font-semibold text-foreground transition-all duration-300 hover:border-accent/40 hover:bg-card/30"
              >
                <Play className="h-4 w-4 text-accent" />
                How It Works
              </a>
            </div>
          </div>

          {/* Right — Glass stat cards */}
          <div className="animate-fade-up delay-400 hidden lg:flex flex-col gap-5">
            {/* Glass card cluster */}
            <div className="relative">
              {/* Glow behind cards */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-accent/[0.08] blur-[80px] pointer-events-none" />

              {/* Card 1 — main stat */}
              <div className="relative rounded-2xl border border-foreground/[0.08] bg-foreground/[0.04] backdrop-blur-xl p-8 mb-5 overflow-hidden">
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-accent/[0.06] blur-[40px] pointer-events-none" />
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Early Detection</p>
                    <p className="mt-1 font-serif text-4xl font-bold text-foreground">50+</p>
                    <p className="text-sm text-muted-foreground mt-1">Cancer types identified</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 rounded-full bg-foreground/[0.06] overflow-hidden">
                  <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-accent/80 to-accent animate-fade-in delay-600" />
                </div>
              </div>

              {/* Card row — two smaller cards */}
              <div className="grid grid-cols-2 gap-5">
                <div className="rounded-2xl border border-foreground/[0.08] bg-foreground/[0.04] backdrop-blur-xl p-6 overflow-hidden relative">
                  <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-accent/[0.05] blur-[30px] pointer-events-none" />
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">AI Diagnostics</p>
                  <p className="mt-2 font-serif text-3xl font-bold text-foreground">99.2%</p>
                  <p className="text-xs text-muted-foreground mt-1">Accuracy rate</p>
                </div>
                <div className="rounded-2xl border border-foreground/[0.08] bg-foreground/[0.04] backdrop-blur-xl p-6 overflow-hidden relative">
                  <div className="absolute top-0 right-0 h-20 w-20 rounded-full bg-[oklch(0.5_0.1_260)]/[0.05] blur-[30px] pointer-events-none" />
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">Assessment</p>
                  <p className="mt-2 font-serif text-3xl font-bold text-foreground">{'360\u00B0'}</p>
                  <p className="text-xs text-muted-foreground mt-1">Full-body mapping</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in delay-700">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
          <div className="h-12 w-px bg-gradient-to-b from-accent/60 to-transparent" />
        </div>
      </div>
    </section>
  )
}
