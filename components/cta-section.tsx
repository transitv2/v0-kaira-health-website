"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>(0.15)

  return (
    <section ref={ref} id="begin" className="relative py-32 lg:py-44 overflow-hidden bg-navy-light/30">
      {/* Atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50vh] w-[70vw] rounded-full bg-gold/[0.03] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <div
          className={cn(
            "transition-all duration-1000",
            isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-[13px] uppercase tracking-[0.3em] text-gold/40 mb-8">
            Begin
          </p>
          <h2 className="font-serif text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-[3.5rem] text-balance">
            Your Health Deserves More Than an Annual Physical
          </h2>
        </div>

        <p
          className={cn(
            "mt-8 max-w-2xl mx-auto text-lg leading-relaxed text-cream-dim/50 text-pretty transition-all duration-1000 delay-200",
            isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
          )}
        >
          KAIRA Health offers personalized longevity programs designed around your
          health profile, risk factors, and goals. Our team will work with you to
          determine the right level of engagement — from comprehensive annual
          assessments to full concierge care with continuous monitoring.
        </p>

        <div
          className={cn(
            "mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-400",
            isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
          )}
        >
          <a
            href="mailto:info@kairahealth.com"
            className="group inline-flex items-center gap-3 rounded-full bg-gold px-10 py-4 text-[15px] font-semibold text-navy tracking-wide shadow-lg shadow-gold/15 transition-all duration-300 hover:shadow-xl hover:shadow-gold/25 hover:scale-[1.02] active:scale-[0.98]"
          >
            Schedule Your Consultation
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Pricing note */}
        <p
          className={cn(
            "mt-8 text-xs text-cream-dim/25 italic transition-all duration-1000 delay-500",
            isVisible ? "animate-fade-in" : "opacity-0"
          )}
        >
          Programs are tailored by consultation. No generic packages.
        </p>
      </div>
    </section>
  )
}
