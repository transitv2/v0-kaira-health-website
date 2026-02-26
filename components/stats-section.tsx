"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { useEffect, useState, useRef } from "react"

interface AnimatedCounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  isVisible: boolean
}

function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2000, isVisible }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    hasAnimated.current = true
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * end))
      if (progress === 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible, end, duration])

  return (
    <span>
      {prefix}{count}{suffix}
    </span>
  )
}

const stats = [
  {
    value: 50,
    suffix: "%",
    label: "of heart attack victims had no prior symptoms",
    detail: "Making early cardiac screening critical",
  },
  {
    value: 50,
    suffix: "+",
    label: "cancer types detectable from a single blood test",
    detail: "At stages 0 and 1, before symptoms appear",
  },
  {
    value: 8,
    suffix: "x",
    label: "earlier detection than traditional screening",
    detail: "Through AI-enhanced diagnostic technology",
  },
  {
    value: 350,
    suffix: "K+",
    label: "genomic associations analyzed",
    detail: "The most comprehensive DNA health test available",
  },
]

export function StatsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-primary text-primary-foreground overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className={cn(
              "text-sm font-medium uppercase tracking-widest text-accent",
              isVisible ? "animate-fade-up" : "opacity-0"
            )}
          >
            Why It Matters
          </span>
          <h2
            className={cn(
              "mt-4 font-serif text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance",
              isVisible ? "animate-fade-up delay-100" : "opacity-0"
            )}
          >
            The Numbers Speak for Themselves
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "text-center p-6 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm",
                isVisible ? "animate-fade-up" : "opacity-0"
              )}
              style={{ animationDelay: `${200 + i * 100}ms` }}
            >
              <div className="text-4xl font-bold text-accent font-serif lg:text-5xl">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              </div>
              <p className="mt-3 text-sm font-medium text-primary-foreground/90">
                {stat.label}
              </p>
              <p className="mt-2 text-xs text-primary-foreground/50">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
