"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { AuroraBackground } from "@/components/aurora-background"

/**
 * HERO: "See Everything. Miss Nothing."
 *
 * The blur-to-focus concept:
 * - On page load, the hero text starts heavily blurred (out of focus)
 * - As the user scrolls OR after a timed reveal, the text sharpens into clarity
 * - Represents KAIRA's promise: bringing your health into focus
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [focusProgress, setFocusProgress] = useState(0) // 0 = fully blurred, 1 = sharp

  useEffect(() => {
    // Animate focus on load over 2.5s
    const start = performance.now()
    const duration = 2800

    function animate(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setFocusProgress(eased)
      if (progress < 1) requestAnimationFrame(animate)
    }

    // Start after a brief pause
    const timeout = setTimeout(() => requestAnimationFrame(animate), 400)
    return () => clearTimeout(timeout)
  }, [])

  // Also sharpen on scroll (if user scrolls before animation completes)
  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY
      const progress = Math.min(scrollY / 300, 1)
      setFocusProgress((prev) => Math.max(prev, progress))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const blurAmount = (1 - focusProgress) * 20 // 20px -> 0px
  const textOpacity = 0.15 + focusProgress * 0.85

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy"
    >
      {/* Aurora light canvas */}
      <div className="absolute inset-0 z-0">
        <AuroraBackground />
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,transparent_0%,#0A1628_100%)]" />

      {/* Noise texture */}
      <div className="absolute inset-0 z-[2] opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "128px 128px" }} />

      {/* Main content */}
      <div
        className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-20 lg:px-8 lg:pt-40 w-full"
        style={{
          filter: `blur(${blurAmount}px)`,
          opacity: textOpacity,
          transition: "filter 0.05s linear, opacity 0.05s linear",
        }}
      >
        <div className="flex flex-col items-center text-center">
          {/* Top line — minimal */}
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold/50 font-medium mb-12">
            The future of preventative medicine
          </p>

          {/* Headline */}
          <h1 className="max-w-4xl text-balance font-serif text-5xl font-bold leading-[1.0] tracking-tight text-cream sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            See Everything.
            <br />
            <span className="text-gold">Miss Nothing.</span>
          </h1>

          {/* Subhead */}
          <p className="mt-10 max-w-2xl text-pretty text-lg leading-relaxed text-cream-dim/60 md:text-xl">
            KAIRA Health combines the world{"'"}s most advanced diagnostics with
            AI-powered analysis and physician-led concierge care — so that
            nothing in your health goes unseen, unfound, or unaddressed.
          </p>

          {/* CTA */}
          <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#begin"
              className="group inline-flex items-center gap-3 rounded-full bg-gold px-10 py-4 text-[15px] font-semibold text-navy tracking-wide shadow-lg shadow-gold/15 transition-all duration-300 hover:shadow-xl hover:shadow-gold/25 hover:scale-[1.02] active:scale-[0.98]"
            >
              Begin Your Assessment
              <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#science"
              className="inline-flex items-center gap-2 rounded-full border border-cream/[0.1] px-8 py-4 text-[15px] font-medium text-cream-dim/70 transition-all duration-300 hover:border-cream/[0.2] hover:text-cream-dim"
            >
              Explore the Science
            </a>
          </div>
        </div>

        {/* Poetic line — appears last */}
        <div className="mt-24 lg:mt-32 flex justify-center">
          <blockquote className="max-w-xl text-center">
            <p className="text-base italic leading-relaxed text-cream-dim/40">
              {"\""}The most important medical discovery is the one that happens
              before you need it.{"\""}
            </p>
          </blockquote>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-700"
        style={{ opacity: focusProgress > 0.8 ? 1 : 0 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-cream-dim/30 uppercase tracking-[0.3em]">Discover</span>
          <div className="h-10 w-px bg-gradient-to-b from-gold/30 to-transparent" />
        </div>
      </div>
    </section>
  )
}
