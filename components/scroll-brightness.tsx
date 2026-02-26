"use client"

import { useEffect, useRef, type ReactNode } from "react"

/**
 * Wraps the page and dynamically transitions the background
 * from deep navy (#0A1628) → white (#FFFFFF) as the user scrolls.
 *
 * Two curves:
 *  - `progress` (background): transitions over rawProgress 0.28–0.42
 *  - `fgProgress` (foreground: text, borders, cards, accents): transitions
 *    over rawProgress 0.24–0.36 — starts earlier and finishes earlier so
 *    dark text/borders settle BEFORE the white background fully arrives.
 *
 * Overrides the Tailwind CSS custom properties so text-cream, text-gold,
 * border-border, bg-card etc automatically adapt to the changing brightness.
 */

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t)
}

function toHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, "0")).join("")
}

export function ScrollBrightness({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function update() {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const rawProgress = maxScroll > 0 ? scrollY / maxScroll : 0

      // === BACKGROUND curve ===
      // Dark for first ~28%, rapid flip 28-42%, fully bright after 42%
      let progress: number
      if (rawProgress < 0.28) {
        progress = 0
      } else if (rawProgress < 0.42) {
        progress = smoothstep((rawProgress - 0.28) / 0.14)
      } else {
        progress = 1
      }

      // === FOREGROUND curve ===
      // Same shape but shifted ~4% earlier, compressed to 12% range (faster)
      // Text/borders/cards lead the background transition by 10-15%
      let fgProgress: number
      if (rawProgress < 0.24) {
        fgProgress = 0
      } else if (rawProgress < 0.36) {
        fgProgress = smoothstep((rawProgress - 0.24) / 0.12)
      } else {
        fgProgress = 1
      }

      // Background: navy (#0A1628) → white (#FFFFFF) — uses `progress`
      const bgR = lerp(10, 255, progress)
      const bgG = lerp(22, 255, progress)
      const bgB = lerp(40, 255, progress)
      el.style.backgroundColor = `rgb(${Math.round(bgR)}, ${Math.round(bgG)}, ${Math.round(bgB)})`

      // === Foreground colors — all use `fgProgress` ===

      // cream: #F5F3EF → #131320 (darker endpoint for better contrast at low opacities)
      const creamR = lerp(245, 19, fgProgress)
      const creamG = lerp(243, 19, fgProgress)
      const creamB = lerp(239, 32, fgProgress)
      el.style.setProperty("--color-cream", toHex(creamR, creamG, creamB))

      // cream-dim: #E8E4DF → #111118 (darker for body text at 45-60% opacity)
      const creamDimR = lerp(232, 17, fgProgress)
      const creamDimG = lerp(228, 17, fgProgress)
      const creamDimB = lerp(223, 24, fgProgress)
      el.style.setProperty("--color-cream-dim", toHex(creamDimR, creamDimG, creamDimB))

      // gold: darken earlier (from fgProgress 0.3+) for contrast on brightening bg
      const goldDarken = Math.max(0, fgProgress - 0.3) * 1.43 // ramps 0→1 over 0.3→1.0
      const goldR = lerp(201, 138, goldDarken)
      const goldG = lerp(168, 110, goldDarken)
      const goldB = lerp(76, 20, goldDarken)
      el.style.setProperty("--color-gold", toHex(goldR, goldG, goldB))

      // ink: #FFFFFF → #000000 — generic contrasting mark for borders/fills
      const inkV = lerp(255, 0, fgProgress)
      el.style.setProperty("--color-ink", toHex(inkV, inkV, inkV))

      // Border colors: subtle blue-gray → subtle light gray — uses `fgProgress`
      const borderR = lerp(30, 208, fgProgress)
      const borderG = lerp(45, 208, fgProgress)
      const borderB = lerp(69, 216, fgProgress)
      el.style.setProperty("--color-border", toHex(borderR, borderG, borderB))

      // Card backgrounds: dark navy → near-white — uses `fgProgress`
      const cardBgR = lerp(15, 243, fgProgress)
      const cardBgG = lerp(29, 243, fgProgress)
      const cardBgB = lerp(48, 248, fgProgress)
      el.style.setProperty("--color-card", toHex(cardBgR, cardBgG, cardBgB))

      // === Text hierarchy — alpha baked in for bright-bg readability ===
      // Reuses creamDim base (same color curve) but transitions alpha too.
      // Low alpha on dark bg (subtle hierarchy) → high alpha on bright bg (readable).
      const r = Math.round, f2 = (v: number) => v.toFixed(2)
      el.style.setProperty("--color-prose",
        `rgba(${r(creamDimR)},${r(creamDimG)},${r(creamDimB)},${f2(lerp(0.50, 0.70, fgProgress))})`)
      el.style.setProperty("--color-prose-strong",
        `rgba(${r(creamDimR)},${r(creamDimG)},${r(creamDimB)},${f2(lerp(0.65, 0.82, fgProgress))})`)
      el.style.setProperty("--color-sub",
        `rgba(${r(creamDimR)},${r(creamDimG)},${r(creamDimB)},${f2(lerp(0.35, 0.48, fgProgress))})`)
      el.style.setProperty("--color-ghost",
        `rgba(${r(creamDimR)},${r(creamDimG)},${r(creamDimB)},${f2(lerp(0.22, 0.30, fgProgress))})`)
      // gold-sub: muted gold labels — darkens color AND increases alpha
      el.style.setProperty("--color-gold-sub",
        `rgba(${r(goldR)},${r(goldG)},${r(goldB)},${f2(lerp(0.50, 0.80, fgProgress))})`)

      // Progress variables for components
      el.style.setProperty("--scroll-brightness", progress.toFixed(3))
      el.style.setProperty("--fg-progress", fgProgress.toFixed(3))
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update, { passive: true })

    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <div ref={ref} className="min-h-screen transition-none">
      {children}
    </div>
  )
}
