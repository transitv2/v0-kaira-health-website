"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import { ArrowRight } from "lucide-react"
import { AuroraBackground } from "@/components/aurora-background"

/**
 * HERO: "See More. Miss Less."
 *
 * 5-second torch reveal sequence:
 *
 * 0.0s — Extra-dark navy (#030812). No text visible. No torch.
 * 0.3s — Torch ignites on far left — tight radial glow blooms.
 * 0.8s — Background starts brightening toward standard navy.
 * 1.0s — Torch begins sweeping left→right. Text appears ONLY where the
 *         torch touches it (tight radial mask). A horizontal trail keeps
 *         already-illuminated text visible so it doesn't go dark again.
 * 2.5s — Background fully brightened to #0A1628.
 * 5.0s — Sweep complete. Mask removed. User gets cursor control.
 *
 * Two-layer CSS mask during sweep:
 *   1. Radial gradient at torch — soft circle, text appears when torch touches
 *   2. Horizontal trail — everything left of the torch stays visible
 *
 * On mobile: tighter radius for more intimate reveal.
 */

const TOTAL_DURATION = 5000
const IGNITION_START = 300   // torch begins appearing
const SWEEP_START = 1000     // sweep begins
const BG_BRIGHTEN_START = 800
const BG_BRIGHTEN_END = 2500

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const isMobileRef = useRef(false)
  const startTimeRef = useRef(0)
  const maskState = useRef({
    x: 0,
    y: 0,
    revealed: false,
  })
  const animFrameRef = useRef<number>(0)

  // Called by AuroraBackground each frame with torch position
  const onLightMove = useCallback((x: number, y: number) => {
    if (maskState.current.revealed) return
    maskState.current.x = x
    maskState.current.y = y
    applyMask()
  }, [])

  function applyMask() {
    const el = textRef.current
    if (!el || maskState.current.revealed || !startTimeRef.current) return

    const elapsed = performance.now() - startTimeRef.current
    const { x, y } = maskState.current
    const isMobile = isMobileRef.current

    // Torch circle radius — tight, so text only appears where torch IS
    const torchRadius = isMobile ? 150 : 240

    if (elapsed < IGNITION_START) {
      // Pure darkness — hide everything
      const val = "radial-gradient(circle 0px at 0px 0px, transparent 0%, transparent 100%)"
      el.style.maskImage = val
      el.style.webkitMaskImage = val
      return
    }

    // Current radius: blooms during ignition, full during sweep
    let currentRadius: number
    if (elapsed < SWEEP_START) {
      const ignT = (elapsed - IGNITION_START) / (SWEEP_START - IGNITION_START)
      const eased = ignT * ignT * (3 - 2 * ignT) // smoothstep bloom
      currentRadius = eased * torchRadius
    } else {
      currentRadius = torchRadius
    }

    // Layer 1: Radial — soft-edged circle at torch position
    // Solid core at 20%, fades over remaining 80% — very gradual edge
    const solidPct = isMobile ? 15 : 20
    const radial = `radial-gradient(circle ${currentRadius}px at ${x}px ${y}px, black 0%, black ${solidPct}%, transparent 100%)`

    if (elapsed < SWEEP_START || x <= 60) {
      // Ignition: radial only, no trail yet
      el.style.maskImage = radial
      el.style.webkitMaskImage = radial
    } else {
      // Sweep phase: radial at torch + horizontal trail for persistence
      // Trail edge sits behind the torch so already-passed text stays visible
      const trailEdge = Math.max(x - currentRadius * 0.5, 0)
      const trailFeather = isMobile ? 50 : 80
      const trail = `linear-gradient(to right, black 0px, black ${trailEdge}px, transparent ${trailEdge + trailFeather}px)`

      el.style.maskImage = `${radial}, ${trail}`
      el.style.webkitMaskImage = `${radial}, ${trail}`
      // Composite: union of both masks (text visible if in EITHER layer)
      el.style.maskComposite = "add"
      ;(el.style as any).webkitMaskComposite = "source-over"
    }
  }

  // Master animation: background brightening + reveal timing
  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768
    startTimeRef.current = performance.now()
    const start = startTimeRef.current
    const section = sectionRef.current

    function smoothstep(t: number) {
      return t * t * (3 - 2 * t)
    }

    function animate(now: number) {
      if (maskState.current.revealed) return
      const elapsed = now - start

      // === Background: #030812 → #0A1628 over 0.8s–2.5s ===
      if (section) {
        const bgT = Math.max(0, Math.min((elapsed - BG_BRIGHTEN_START) / (BG_BRIGHTEN_END - BG_BRIGHTEN_START), 1))
        const bgE = smoothstep(bgT)
        const r = Math.round(3 + bgE * 7)    // 3 → 10
        const g = Math.round(8 + bgE * 14)   // 8 → 22
        const b = Math.round(18 + bgE * 22)  // 18 → 40
        section.style.backgroundColor = `rgb(${r},${g},${b})`
      }

      // Reveal everything at 5 seconds
      if (elapsed >= TOTAL_DURATION) {
        maskState.current.revealed = true
        setIsRevealed(true)
        const el = textRef.current
        if (el) {
          el.style.maskImage = "none"
          el.style.webkitMaskImage = "none"
        }
        if (section) section.style.backgroundColor = "rgb(10,22,40)"
        return
      }

      applyMask()
      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  // Scroll override: snap to fully revealed if user scrolls > 200px
  useEffect(() => {
    function onScroll() {
      if (maskState.current.revealed) return
      if (window.scrollY > 200) {
        maskState.current.revealed = true
        setIsRevealed(true)
        const el = textRef.current
        if (el) {
          el.style.maskImage = "none"
          el.style.webkitMaskImage = "none"
        }
        const section = sectionRef.current
        if (section) section.style.backgroundColor = "rgb(10,22,40)"
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#030812" }}
    >
      {/* Interactive cursor-tracking spotlight with particles */}
      <div className="absolute inset-0 z-[1]">
        <AuroraBackground onLightMove={onLightMove} />
      </div>

      {/* Soft edge vignette */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,transparent_0%,rgba(10,22,40,0.3)_70%,#0A1628_100%)] pointer-events-none" />

      {/* Noise texture */}
      <div className="absolute inset-0 z-[3] opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "128px 128px" }} />

      {/* Main content — two-layer mask reveal tied to torch position */}
      <div
        ref={textRef}
        className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-32 lg:px-8 lg:pt-40 lg:pb-36 w-full"
        style={{
          maskImage: "radial-gradient(circle 0px at 5% 40%, transparent 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle 0px at 5% 40%, transparent 0%, transparent 100%)",
        }}
      >
        <div className="flex flex-col items-center text-center">
          {/* Top line — minimal */}
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold-sub font-medium mb-12">
            The Future of Preventive Medicine
          </p>

          {/* Headline */}
          <h1 className="max-w-4xl text-balance font-serif text-5xl font-bold leading-[1.0] tracking-tight text-cream sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            See More.
            <br />
            <span className="text-gold">Miss Less.</span>
          </h1>

          {/* Subhead */}
          <p className="mt-10 max-w-2xl text-pretty text-lg leading-relaxed text-prose-strong md:text-xl">
            KAIRA Health combines advanced diagnostics with AI-supported analysis
            and physician-led concierge care — delivering a comprehensive view of
            your health so that risks can be identified early and addressed proactively.
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
            <p className="text-base italic leading-relaxed text-sub">
              {"\""}The most important medical insight is the one identified
              before illness takes hold.{"\""}
            </p>
          </blockquote>
        </div>
      </div>

      {/* Scroll indicator — appears after mask reveal */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-700"
        style={{ opacity: isRevealed ? 1 : 0 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-sub uppercase tracking-[0.3em]">Discover</span>
          <div className="h-10 w-px bg-gradient-to-b from-gold/30 to-transparent" />
        </div>
      </div>
    </section>
  )
}
