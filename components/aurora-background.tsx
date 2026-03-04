"use client"

import { useEffect, useRef, useCallback } from "react"

/**
 * Torch in a dark cave — a broad, calm emanating light that follows the cursor.
 * Slow, gentle particles drift around the light source.
 * No flicker — steady, cool blue, meditative.
 *
 * 5-second reveal sequence:
 * 0.0s – 0.3s: Nothing visible (pure darkness)
 * 0.3s – 1.0s: Torch ignites on far left — glow blooms from 0 to full
 * 1.0s – 5.0s: Torch sweeps left → right across content area
 * 5.0s+:       Gentle figure-8 idle pattern; user cursor takes over on desktop
 *
 * Exposes the torch position to the parent via onLightMove callback.
 */

const MAX_PARTICLES = 80
const TORCH_RADIUS = 300
const TOTAL_DURATION = 5000  // total reveal time
const IGNITION_START = 300   // torch begins appearing
const SWEEP_START = 1000     // sweep begins
const SWEEP_END = 5000       // sweep ends

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  maxLife: number
  isGold: boolean
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
  const autoLightRef = useRef({ angle: 0 })
  const startTimeRef = useRef(0)
  const userMovedRef = useRef(false)

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
      isGold: Math.random() < 0.75,
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

    startTimeRef.current = performance.now()
    isMobileRef.current = window.innerWidth < 768

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2)
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
      const yRatio = rawY / rect.height // 0 = top, 1 = bottom

      // Hard dead zone: mouse at ≤50% of viewport = torch pushed completely off-screen.
      // Below 50%, torch linearly rises into view. This keeps the hero pitch black
      // when the cursor rests at a normal position (center or above).
      if (yRatio <= 0.5) {
        // Push torch way below the canvas — invisible
        mouseRef.current.x = rawX
        mouseRef.current.y = rect.height * 2
      } else {
        // Map 50%–100% of viewport onto the visible bottom portion
        const visibleT = (yRatio - 0.5) / 0.5 // 0 at 50%, 1 at bottom
        mouseRef.current.x = rawX
        mouseRef.current.y = rect.height * (1.0 - visibleT * 0.5) // enters from below
      }
      userMovedRef.current = true
    }

    function onMouseLeave() {
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
    }

    // Ignition position — bottom center (starts in darkness, rises up)
    function getIgnitionPosition(): { x: number; y: number } {
      return { x: w * 0.5, y: h * 1.1 }
    }

    // Sweep: bottom center → rises up to lower-third, then sweeps across
    function getSweepPosition(t: number): { x: number; y: number } {
      const eased = t * t * (3 - 2 * t) // smoothstep
      // First 40%: rise from off-screen to ~75% height
      // Rest: sweep left-to-right at that height
      if (t < 0.4) {
        const riseT = t / 0.4
        const riseEased = riseT * riseT * (3 - 2 * riseT)
        return { x: w * 0.3, y: h * 1.1 - riseEased * h * 0.35 }
      }
      const sweepT = (t - 0.4) / 0.6
      const sweepEased = sweepT * sweepT * (3 - 2 * sweepT)
      const x = w * 0.15 + sweepEased * w * 0.7
      const y = h * 0.75 + Math.sin(sweepEased * Math.PI) * h * 0.06
      return { x, y }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h)

      const now = performance.now()
      const elapsed = now - startTimeRef.current

      // Smooth mouse tracking
      const lerpFactor = 0.22
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * lerpFactor
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * lerpFactor

      // Determine light source position and intensity
      let lightX: number, lightY: number
      let intensity = 1 // glow intensity multiplier (0–1)

      const sweepComplete = elapsed >= SWEEP_END
      const userHasCursor = !isMobileRef.current && mouseRef.current.x > -500

      if (elapsed < IGNITION_START) {
        // Before ignition — no light
        const pos = getIgnitionPosition()
        lightX = pos.x
        lightY = pos.y
        intensity = 0
      } else if (elapsed < SWEEP_START) {
        // Ignition phase: torch blooms at far left
        const ignT = (elapsed - IGNITION_START) / (SWEEP_START - IGNITION_START)
        const pos = getIgnitionPosition()
        lightX = pos.x
        lightY = pos.y
        intensity = ignT * ignT // ease-in — gentle bloom
      } else if (!sweepComplete) {
        // Sweep phase — torch always follows the scripted sweep path
        // No cursor override: the reveal is cinematic, user gets control after
        const sweepT = Math.min((elapsed - SWEEP_START) / (SWEEP_END - SWEEP_START), 1)
        const pos = getSweepPosition(sweepT)
        lightX = pos.x
        lightY = pos.y
        intensity = 1
      } else {
        // Post-sweep: user cursor or idle figure-8
        if (userHasCursor && userMovedRef.current) {
          lightX = smoothMouseRef.current.x
          lightY = smoothMouseRef.current.y
        } else {
          autoLightRef.current.angle += 0.003
          const a = autoLightRef.current.angle
          lightX = w * 0.5 + Math.sin(a) * w * 0.15
          // Idle sits at ~85% height — below the dead zone, a gentle glow from the bottom
          lightY = h * 0.85 + Math.sin(a * 1.5) * h * 0.06
        }
        intensity = 1
      }

      // Report torch position to parent (for mask reveal)
      if (onLightMove) {
        onLightMove(lightX, lightY)
      }

      if (intensity > 0.01) {
        // === TORCH GLOW — scaled by intensity ===
        const i = intensity

        // Inner core — warm white / cream (NOT blue)
        const coreR = TORCH_RADIUS * 0.35
        const coreGrad = ctx!.createRadialGradient(lightX, lightY, 0, lightX, lightY, coreR)
        coreGrad.addColorStop(0, `rgba(245, 240, 230, ${0.25 * i})`)
        coreGrad.addColorStop(0.5, `rgba(235, 230, 218, ${0.12 * i})`)
        coreGrad.addColorStop(1, "rgba(220, 218, 210, 0)")
        ctx!.fillStyle = coreGrad
        ctx!.fillRect(0, 0, w, h)

        // Mid glow — soft white with a whisper of blue
        const midR = TORCH_RADIUS * 0.75
        const midGrad = ctx!.createRadialGradient(lightX, lightY, 0, lightX, lightY, midR)
        midGrad.addColorStop(0, `rgba(220, 228, 240, ${0.14 * i})`)
        midGrad.addColorStop(0.4, `rgba(200, 212, 230, ${0.07 * i})`)
        midGrad.addColorStop(0.8, `rgba(160, 185, 215, ${0.025 * i})`)
        midGrad.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx!.fillStyle = midGrad
        ctx!.fillRect(0, 0, w, h)

        // Outer ambient — very subtle blue tint, barely visible
        const outerR = TORCH_RADIUS * 2.5
        const outerGrad = ctx!.createRadialGradient(lightX, lightY, 0, lightX, lightY, outerR)
        outerGrad.addColorStop(0, `rgba(140, 170, 210, ${0.04 * i})`)
        outerGrad.addColorStop(0.3, `rgba(100, 140, 190, ${0.02 * i})`)
        outerGrad.addColorStop(0.6, `rgba(60, 100, 160, ${0.008 * i})`)
        outerGrad.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx!.fillStyle = outerGrad
        ctx!.fillRect(0, 0, w, h)

        // Spawn particles (only when torch has some intensity)
        if (i > 0.3 && particlesRef.current.length < MAX_PARTICLES && Math.random() < 0.3) {
          particlesRef.current.push(spawnParticle(lightX, lightY))
        }
      }

      // === UPDATE & DRAW PARTICLES ===
      const particles = particlesRef.current
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++

        if (p.life >= p.maxLife) {
          particles.splice(i, 1)
          continue
        }

        const lifeRatio = p.life / p.maxLife
        const fadeIn = Math.min(p.life / 20, 1)
        const fadeOut = 1 - lifeRatio * lifeRatio
        const alpha = fadeIn * fadeOut

        p.vx += (Math.random() - 0.5) * 0.02
        p.vy -= 0.005
        p.x += p.vx
        p.y += p.vy

        const currentSize = p.size * (1 - lifeRatio * 0.4)

        let r: number, g: number, b: number
        if (p.isGold) {
          // Warm cream/white particles
          r = 240; g = 235; b = 220
        } else {
          // Pale blue-white accent particles
          r = 200; g = 215; b = 235
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
