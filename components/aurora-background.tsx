"use client"

import { useEffect, useRef, useCallback } from "react"

/**
 * Subtle ambient light that responds to cursor position.
 * Pitch black when cursor is at or above the 70% mark of the hero.
 * Light fades in from the bottom as cursor moves below 70%.
 * Uses a quadratic ramp so brightness stays very low until the cursor
 * is near the very bottom of the viewport.
 * Light grey / silver tones — clean, medical, not saturated.
 *
 * Exposes the torch position to the parent via onLightMove callback.
 */

const MAX_PARTICLES = 60
const TORCH_RADIUS = 320

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  maxLife: number
  isLight: boolean
}

interface AuroraBackgroundProps {
  onLightMove?: (x: number, y: number) => void
}

export function AuroraBackground({ onLightMove }: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const smoothMouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const isMobileRef = useRef(false)
  // Tracks the raw cursor Y ratio (0 = top, 1 = bottom). Default to 0 (dead zone).
  const cursorYRatioRef = useRef(0)
  // Smoothed intensity so transitions aren't jarring
  const smoothIntensityRef = useRef(0)

  const spawnParticle = useCallback((x: number, y: number): Particle => {
    const angle = Math.random() * Math.PI * 2
    const dist = Math.random() * TORCH_RADIUS * 0.8
    return {
      x: x + Math.cos(angle) * dist,
      y: y + Math.sin(angle) * dist,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      size: Math.random() * 2.5 + 0.8,
      life: 0,
      maxLife: Math.random() * 160 + 80,
      isLight: Math.random() < 0.7,
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let w = 0
    let h = 0

    isMobileRef.current = window.innerWidth < 768

    function resize() {
      const dpr = window.devicePixelRatio || 1
      w = canvas!.offsetWidth
      h = canvas!.offsetHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      isMobileRef.current = window.innerWidth < 768
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      const rawX = e.clientX - rect.left
      const rawY = e.clientY - rect.top

      // Store raw position for the torch to follow
      mouseRef.current.x = rawX
      mouseRef.current.y = rawY

      // Store the Y ratio for dead zone calculation
      cursorYRatioRef.current = rawY / rect.height
    }

    function onMouseLeave() {
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
      // Reset to dead zone when cursor leaves
      cursorYRatioRef.current = 0
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h)

      // Smooth mouse tracking
      const lerpFactor = 0.12
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * lerpFactor
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * lerpFactor

      // ── DEAD ZONE INTENSITY ──
      // cursor at ≤70% = 0 intensity (pitch black)
      // cursor at 70%→100% = quadratic ramp 0→1 (stays very dim until near bottom)
      const yRatio = cursorYRatioRef.current
      const linearRamp = yRatio <= 0.7 ? 0 : Math.min(1, (yRatio - 0.7) / 0.3)
      const targetIntensity = linearRamp * linearRamp // quadratic curve — gentle start, strong finish

      // Smooth the intensity transition (fade in/out over ~0.5s)
      const intensityLerp = targetIntensity > smoothIntensityRef.current ? 0.04 : 0.06
      smoothIntensityRef.current += (targetIntensity - smoothIntensityRef.current) * intensityLerp
      const intensity = smoothIntensityRef.current

      // Determine light position — follows cursor directly
      let lightX: number, lightY: number
      const userHasCursor = !isMobileRef.current && mouseRef.current.x > -500

      if (userHasCursor) {
        lightX = smoothMouseRef.current.x
        lightY = smoothMouseRef.current.y
      } else {
        // Mobile / no cursor: place torch below canvas (invisible)
        lightX = w * 0.5
        lightY = h * 1.5
      }

      // Report torch position to parent (for mask reveal)
      if (onLightMove) {
        onLightMove(lightX, lightY)
      }

      if (intensity > 0.005) {
        const i = intensity

        // Inner core — soft silver / light grey
        const coreR = TORCH_RADIUS * 0.35
        const coreGrad = ctx!.createRadialGradient(lightX, lightY, 0, lightX, lightY, coreR)
        coreGrad.addColorStop(0, `rgba(210, 215, 220, ${0.28 * i})`)
        coreGrad.addColorStop(0.5, `rgba(190, 195, 205, ${0.14 * i})`)
        coreGrad.addColorStop(1, "rgba(170, 178, 190, 0)")
        ctx!.fillStyle = coreGrad
        ctx!.fillRect(0, 0, w, h)

        // Mid glow — cool grey with subtle blue shift
        const midR = TORCH_RADIUS * 0.75
        const midGrad = ctx!.createRadialGradient(lightX, lightY, 0, lightX, lightY, midR)
        midGrad.addColorStop(0, `rgba(185, 195, 210, ${0.16 * i})`)
        midGrad.addColorStop(0.4, `rgba(165, 175, 195, ${0.08 * i})`)
        midGrad.addColorStop(0.8, `rgba(140, 150, 175, ${0.03 * i})`)
        midGrad.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx!.fillStyle = midGrad
        ctx!.fillRect(0, 0, w, h)

        // Outer ambient — very faint grey haze
        const outerR = TORCH_RADIUS * 2.5
        const outerGrad = ctx!.createRadialGradient(lightX, lightY, 0, lightX, lightY, outerR)
        outerGrad.addColorStop(0, `rgba(150, 160, 180, ${0.05 * i})`)
        outerGrad.addColorStop(0.3, `rgba(130, 140, 165, ${0.025 * i})`)
        outerGrad.addColorStop(0.6, `rgba(100, 115, 140, ${0.01 * i})`)
        outerGrad.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx!.fillStyle = outerGrad
        ctx!.fillRect(0, 0, w, h)

        // Spawn particles (only when torch is visible)
        if (i > 0.15 && particlesRef.current.length < MAX_PARTICLES && Math.random() < 0.25) {
          particlesRef.current.push(spawnParticle(lightX, lightY))
        }
      }

      // === UPDATE & DRAW PARTICLES ===
      const particles = particlesRef.current
      for (let idx = particles.length - 1; idx >= 0; idx--) {
        const p = particles[idx]
        p.life++

        if (p.life >= p.maxLife) {
          particles.splice(idx, 1)
          continue
        }

        const lifeRatio = p.life / p.maxLife
        const fadeIn = Math.min(p.life / 20, 1)
        const fadeOut = 1 - lifeRatio * lifeRatio
        // Gate particle visibility by the dead zone intensity
        const alpha = fadeIn * fadeOut * intensity

        p.vx += (Math.random() - 0.5) * 0.02
        p.vy -= 0.005
        p.x += p.vx
        p.y += p.vy

        const currentSize = p.size * (1 - lifeRatio * 0.4)

        let r: number, g: number, b: number
        if (p.isLight) {
          // Silver / light grey particles
          r = 200; g = 205; b = 215
        } else {
          // Slightly blue-grey accent
          r = 175; g = 185; b = 210
        }

        if (alpha > 0.01) {
          const glowSize = currentSize * 4
          const glowGrad = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize)
          glowGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.2})`)
          glowGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
          ctx!.fillStyle = glowGrad
          ctx!.fillRect(p.x - glowSize, p.y - glowSize, glowSize * 2, glowSize * 2)

          ctx!.beginPath()
          ctx!.arc(p.x, p.y, currentSize, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.7})`
          ctx!.fill()
        }
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener("resize", resize)
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mouseleave", onMouseLeave)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", onMouseMove)
      canvas.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [spawnParticle, onLightMove])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}
