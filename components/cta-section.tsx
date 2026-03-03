"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>(0.15)

  return (
    <section ref={ref} id="begin" className="relative py-32 lg:py-44 overflow-hidden">
      {/* Light beam background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/brand/kaira-hero-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          opacity: "calc(0.12 * (1 - var(--scroll-brightness, 0)))",
        }}
      />
      {/* Subtle gold accent glow on bright background */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: "calc(1 - var(--scroll-brightness, 0) * 0.6)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50vh] w-[70vw] rounded-full bg-gold/[0.06] blur-[160px]" />
      </div>
      {/* Subtle grain texture — visible on light background */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: "calc(var(--scroll-brightness, 0) * 0.04)", backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "128px 128px" }} />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <div
          className={cn(
            "transition-all duration-1000",
            isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-[13px] uppercase tracking-[0.3em] text-gold-sub mb-8">
            Begin
          </p>
          <h2 className="font-serif text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-[3.5rem] text-balance">
            A More Comprehensive Approach to Your Health
          </h2>
        </div>

        <p
          className={cn(
            "mt-8 max-w-2xl mx-auto text-lg leading-relaxed text-prose-strong text-pretty transition-all duration-1000 delay-200",
            isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
          )}
        >
          KAIRA Health offers personalised longevity programs structured around your
          health profile, risk factors, and goals. Our team works with you to
          determine the appropriate level of engagement — from expanded annual
          assessments to concierge care models that include structured follow-up
          and longitudinal monitoring.
        </p>

        <div
          className={cn(
            "mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-400",
            isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
          )}
        >
          <a
            href="mailto:info@kairahealth.com"
            className="group inline-flex items-center gap-3 rounded-full bg-gold px-10 py-4 text-[15px] font-semibold text-navy tracking-wide shadow-[0_0_40px_rgba(201,168,76,0.2)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(201,168,76,0.3)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Schedule Your Consultation
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Pricing note */}
        <p
          className={cn(
            "mt-8 text-xs text-ghost italic transition-all duration-1000 delay-500",
            isVisible ? "animate-fade-in" : "opacity-0"
          )}
        >
          Programs are structured around your individual health profile.
        </p>
      </div>
    </section>
  )
}
