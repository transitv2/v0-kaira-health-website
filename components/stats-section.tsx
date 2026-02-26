"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { useEffect, useState, useRef } from "react"

function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2200,
  isVisible,
}: {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  isVisible: boolean
}) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    hasAnimated.current = true
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress === 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible, end, duration])

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

const stats = [
  { value: 200, suffix: "+", label: "Biomarkers analyzed per client" },
  { value: 5, suffix: "x", label: "More comprehensive than standard physicals" },
  { value: 2, suffix: "", label: "Markets served: North America & Middle East" },
  { value: 24, suffix: "/7", label: "Physician access for concierge members" },
]

const trustSignals = [
  "Currently operating and serving patients",
  "Founded by practicing physicians",
  "World-leading laboratory and imaging network",
  "HIPAA-compliant, enterprise-grade security",
]

export function StatsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>(0.1)

  return (
    <section ref={ref} id="credibility" className="relative py-28 lg:py-40">
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: "calc(1 - var(--scroll-brightness, 0) * 0.6)" }}>
        {/* Stronger gold presence — approaching the light */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gold/[0.035] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[300px] bg-gold/[0.025] rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div
          className={cn(
            "max-w-3xl transition-all duration-1000",
            isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-[13px] uppercase tracking-[0.3em] text-gold-sub mb-6">
            Built on Evidence
          </p>
          <h2 className="font-serif text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl text-balance">
            Trusted by Those Who Demand the Best
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-prose-strong max-w-2xl">
            {"KAIRA Health was founded by physicians and technologists who believe that the gap between what modern medicine "}
            <em>can</em>
            {" detect and what it "}
            <em>does</em>
            {" detect is the greatest preventable risk in healthcare today."}
          </p>
        </div>

        {/* Stat grid */}
        <div className="mt-16 lg:mt-20 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "rounded-2xl border border-border bg-card p-6 lg:p-8 transition-all duration-700",
                isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
              )}
              style={{ animationDelay: `${200 + i * 100}ms` }}
            >
              <div className="font-serif text-4xl font-bold text-gold lg:text-6xl">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              </div>
              <div className="mt-2 h-px w-8 bg-gradient-to-r from-gold/30 to-transparent" />
              <p className="mt-3 text-sm leading-snug text-prose">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Trust signals */}
        <div
          className={cn(
            "mt-16 flex flex-wrap gap-3",
            isVisible ? "animate-fade-up delay-600" : "opacity-0"
          )}
        >
          {trustSignals.map((signal) => (
            <span
              key={signal}
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-5 py-2.5 text-[13px] text-prose"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold/60" />
              {signal}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
