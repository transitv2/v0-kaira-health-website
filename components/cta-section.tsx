"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section ref={ref} id="contact" className="relative py-32 lg:py-44 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] w-[80vw] rounded-full bg-accent/[0.04] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
        {/* Tagline */}
        <p
          className={cn(
            "text-lg text-muted-foreground italic",
            isVisible ? "animate-fade-up" : "opacity-0"
          )}
        >
          Life is short?
        </p>

        {/* Bold statement */}
        <h2
          className={cn(
            "mt-4 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance",
            isVisible ? "animate-fade-up delay-100" : "opacity-0"
          )}
        >
          We disagree.
        </h2>

        <p
          className={cn(
            "mt-8 max-w-2xl mx-auto text-lg leading-relaxed text-muted-foreground text-pretty",
            isVisible ? "animate-fade-up delay-200" : "opacity-0"
          )}
        >
          Kaira Health brings you the most advanced preventative diagnostics available
          — so you can spend more time doing what matters most.
        </p>

        <div
          className={cn(
            "mt-12 flex flex-col sm:flex-row items-center justify-center gap-4",
            isVisible ? "animate-fade-up delay-300" : "opacity-0"
          )}
        >
          <a
            href="mailto:info@kairahealth.com"
            className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-10 py-4.5 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Your Assessment
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#mission"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/[0.12] bg-foreground/[0.04] backdrop-blur-xl px-8 py-4 text-base font-medium text-foreground/80 transition-all duration-300 hover:border-foreground/[0.2] hover:bg-foreground/[0.07]"
          >
            How It Works
          </a>
        </div>
      </div>
    </section>
  )
}
