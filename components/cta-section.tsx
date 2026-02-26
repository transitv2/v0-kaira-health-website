"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section ref={ref} id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative rounded-3xl bg-primary overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          </div>

          <div className="relative px-8 py-16 sm:px-16 sm:py-24 lg:px-24 lg:py-32">
            <div className="mx-auto max-w-2xl text-center">
              <h2
                className={cn(
                  "font-serif text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl text-balance",
                  isVisible ? "animate-fade-up" : "opacity-0"
                )}
              >
                What Will You Do With Your Healthy Decades Ahead?
              </h2>
              <p
                className={cn(
                  "mt-6 text-lg leading-relaxed text-primary-foreground/70 text-pretty",
                  isVisible ? "animate-fade-up delay-100" : "opacity-0"
                )}
              >
                The perfect pairing of innovation, compassionate care, and a
                thoughtful plan is your new guide through the journey of life.
                Start your journey with Kaira Health today.
              </p>
              <div
                className={cn(
                  "mt-10 flex flex-col sm:flex-row items-center justify-center gap-4",
                  isVisible ? "animate-fade-up delay-200" : "opacity-0"
                )}
              >
                <a
                  href="mailto:info@kairahealth.com"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-foreground transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 hover:scale-105"
                >
                  Begin Your Journey
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="tel:18007502745"
                  className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-8 py-4 text-base font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary-foreground/10"
                >
                  Call 1 (800) 750-2745
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
