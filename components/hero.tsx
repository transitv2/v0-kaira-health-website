"use client"

import { Suspense, lazy } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const GenerativeMountainScene = lazy(() => import("@/components/ui/mountain-scene"))

const headlineLine1 = ["See", "More.", "Earlier."]
const headlineLine2 = ["To", "Live", "Better.", "Longer."]

export function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-[#0A0A0A] overflow-hidden">
      {/* Three.js mountain landscape — z-0 background layer */}
      <Suspense fallback={<div className="absolute inset-0 w-full h-full bg-[#0A0A0A]" />}>
        <GenerativeMountainScene />
      </Suspense>

      {/* Content — z-10 content layer */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="mx-auto max-w-5xl px-6 pt-32 pb-24 lg:px-8 lg:pt-40 lg:pb-32 w-full">
          <div className="flex flex-col items-center text-center">
            {/* Top label */}
            <p
              className="animate-fade-up text-[11px] uppercase tracking-[0.4em] font-medium text-gold mb-12"
              style={{ animationDelay: "200ms" }}
            >
              The Future of Preventive Medicine
            </p>

            {/* Headline — staggered cinematic character reveal */}
            <h1 className="max-w-4xl font-serif text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
              {/* Line 1: See More. Earlier. */}
              <span className="flex flex-wrap items-baseline justify-center gap-x-[0.3em]">
                {headlineLine1.map((word, wordIndex) => {
                  const charOffset = headlineLine1
                    .slice(0, wordIndex)
                    .reduce((sum, w) => sum + w.length, 0)
                  return (
                    <span key={wordIndex} className="inline-flex">
                      {word.split("").map((char, charIndex) => (
                        <span
                          key={charIndex}
                          className="animate-cinematic-reveal text-cream inline-block"
                          style={{
                            animationDelay: `${600 + (charOffset + charIndex) * 60}ms`,
                          }}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  )
                })}
              </span>
              <br />
              {/* Line 2: To Live Better. Longer. */}
              <span className="flex flex-wrap items-baseline justify-center gap-x-[0.3em]">
                {headlineLine2.map((word, wordIndex) => {
                  const line1Chars = headlineLine1.reduce((sum, w) => sum + w.length, 0)
                  const charOffset = headlineLine2
                    .slice(0, wordIndex)
                    .reduce((sum, w) => sum + w.length, 0)
                  return (
                    <span key={wordIndex} className="inline-flex">
                      {word.split("").map((char, charIndex) => (
                        <span
                          key={charIndex}
                          className="animate-cinematic-reveal text-gold inline-block"
                          style={{
                            animationDelay: `${600 + (line1Chars + charOffset + charIndex) * 60}ms`,
                          }}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  )
                })}
              </span>
            </h1>

            {/* Subheading */}
            <p
              className="animate-fade-up mt-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted md:text-xl"
              style={{ animationDelay: "1800ms" }}
            >
              KAIRA Health combines advanced diagnostics with AI-supported analysis
              and physician-led concierge care — delivering a comprehensive view of
              your health so that risks can be identified early and addressed proactively.
            </p>

            {/* CTAs */}
            <div
              className="animate-fade-up mt-14 flex flex-col items-center gap-4 sm:flex-row"
              style={{ animationDelay: "2200ms" }}
            >
              <Button
                asChild
                className="group cursor-pointer rounded-full bg-gold px-10 py-4 h-auto text-[15px] font-semibold text-dark tracking-wide shadow-lg shadow-gold/15 transition-all duration-300 hover:bg-gold/90 hover:shadow-xl hover:shadow-gold/25 hover:scale-[1.02] active:scale-[0.98]"
              >
                <a
                  href="/consultation"
                  className="inline-flex items-center gap-3"
                >
                  Schedule Your Consultation
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="cursor-pointer rounded-full border-cream/[0.1] bg-transparent px-8 py-4 h-auto text-[15px] font-medium text-cream/70 hover:border-cream/[0.2] hover:text-cream hover:bg-transparent transition-all duration-300"
              >
                <a href="#science">Explore the Science</a>
              </Button>
            </div>
          </div>

          {/* Bottom blockquote */}
          <div
            className="animate-fade-up mt-24 lg:mt-32 flex justify-center"
            style={{ animationDelay: "2600ms" }}
          >
            <blockquote className="max-w-xl text-center">
              <p className="text-base italic leading-relaxed text-gold font-serif">
                {'"'}The most important medical insight is the one identified
                before illness takes hold.{'"'}
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
