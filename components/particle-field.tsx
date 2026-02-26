"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  layer: number
  hue: number
  sat: number
  pulseOffset: number
  life: number
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const frameRef = useRef(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    let w = 0
    let h = 0
    const PARTICLE_COUNT = 200
    const CONNECTION_DIST = 160
    const MOUSE_RADIUS = 250

    function resize() {
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function createParticle(x?: number, y?: number): Particle {
      const layer = Math.random() < 0.2 ? 2 : Math.random() < 0.5 ? 1 : 0
      const speed = [0.12, 0.25, 0.45][layer]
      return {
        x: x ?? Math.random() * w,
        y: y ?? Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: [0.8, 1.5, 2.8][layer],
        opacity: [0.12, 0.3, 0.55][layer],
        layer,
        hue: 175 + Math.random() * 40,
        sat: 50 + Math.random() * 30,
        pulseOffset: Math.random() * Math.PI * 2,
        life: 1,
      }
    }

    function initParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle())
    }

    // Draw the ambient mesh-gradient backdrop (GLSL-inspired)
    function drawMeshGradient(time: number) {
      if (!ctx) return

      // Large moving blobs that simulate a shader mesh gradient
      const blobs = [
        {
          x: w * 0.2 + Math.sin(time * 0.3) * w * 0.1,
          y: h * 0.3 + Math.cos(time * 0.2) * h * 0.1,
          r: w * 0.4,
          color: "hsla(190, 80%, 40%, 0.045)",
        },
        {
          x: w * 0.75 + Math.cos(time * 0.25) * w * 0.12,
          y: h * 0.2 + Math.sin(time * 0.35) * h * 0.08,
          r: w * 0.35,
          color: "hsla(240, 60%, 30%, 0.04)",
        },
        {
          x: w * 0.5 + Math.sin(time * 0.4) * w * 0.15,
          y: h * 0.7 + Math.cos(time * 0.3) * h * 0.1,
          r: w * 0.45,
          color: "hsla(185, 70%, 35%, 0.035)",
        },
        {
          x: w * 0.85 + Math.cos(time * 0.2) * w * 0.08,
          y: h * 0.8 + Math.sin(time * 0.15) * h * 0.06,
          r: w * 0.3,
          color: "hsla(210, 50%, 25%, 0.03)",
        },
      ]

      for (const blob of blobs) {
        const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r)
        grad.addColorStop(0, blob.color)
        grad.addColorStop(1, "hsla(0, 0%, 0%, 0)")
        ctx.beginPath()
        ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }
    }

    function animate() {
      if (!ctx) return
      const time = frameRef.current * 0.008
      frameRef.current++

      ctx.clearRect(0, 0, w, h)

      // Draw ambient mesh gradient first
      drawMeshGradient(time)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const mouseActive = mx > -5000

      // Update & draw particles
      for (const p of particles) {
        // Mouse interaction
        if (mouseActive) {
          const dx = p.x - mx
          const dy = p.y - my
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < MOUSE_RADIUS && dist > 0) {
            const strength = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS)
            const force = strength * strength * 0.04

            if (p.layer >= 1) {
              // Mid + close repel away from cursor
              p.vx += (dx / dist) * force * (p.layer === 2 ? 1.5 : 1)
              p.vy += (dy / dist) * force * (p.layer === 2 ? 1.5 : 1)
            } else {
              // Far particles gently orbit
              p.vx += (-dy / dist) * force * 0.2
              p.vy += (dx / dist) * force * 0.2
            }
          }
        }

        // Damping
        const damp = [0.997, 0.995, 0.993][p.layer]
        p.vx *= damp
        p.vy *= damp

        p.x += p.vx
        p.y += p.vy

        // Soft edge wrapping
        const margin = 20
        if (p.x < -margin) p.x = w + margin
        if (p.x > w + margin) p.x = -margin
        if (p.y < -margin) p.y = h + margin
        if (p.y > h + margin) p.y = -margin

        // Pulsing
        const pulse = Math.sin(time * 1.8 + p.pulseOffset) * 0.2
        const drawOpacity = Math.max(0.04, p.opacity + pulse)

        // Glow halo for close particles
        if (p.layer === 2) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 6, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, 55%, ${drawOpacity * 0.08})`
          ctx.fill()

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, 60%, ${drawOpacity * 0.15})`
          ctx.fill()
        }

        // Mid layer subtle glow
        if (p.layer === 1) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, 55%, ${drawOpacity * 0.06})`
          ctx.fill()
        }

        // Core dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, 70%, ${drawOpacity})`
        ctx.fill()
      }

      // Draw connections — only mid + close layers
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i]
        if (pi.layer === 0) continue
        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j]
          if (pj.layer === 0) continue
          const dx = pi.x - pj.x
          const dy = pi.y - pj.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.1
            const grad = ctx.createLinearGradient(pi.x, pi.y, pj.x, pj.y)
            grad.addColorStop(0, `hsla(${pi.hue}, ${pi.sat}%, 60%, ${opacity})`)
            grad.addColorStop(1, `hsla(${pj.hue}, ${pj.sat}%, 60%, ${opacity})`)
            ctx.beginPath()
            ctx.moveTo(pi.x, pi.y)
            ctx.lineTo(pj.x, pj.y)
            ctx.strokeStyle = grad
            ctx.stroke()
          }
        }
      }

      // Mouse proximity connections — connect cursor to nearby particles
      if (mouseActive) {
        for (const p of particles) {
          if (p.layer === 0) continue
          const dx = p.x - mx
          const dy = p.y - my
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < MOUSE_RADIUS * 0.8) {
            const opacity = (1 - dist / (MOUSE_RADIUS * 0.8)) * 0.15
            ctx.beginPath()
            ctx.moveTo(mx, my)
            ctx.lineTo(p.x, p.y)
            ctx.strokeStyle = `hsla(185, 70%, 60%, ${opacity})`
            ctx.lineWidth = 0.4
            ctx.stroke()
          }
        }

        // Mouse glow
        const mglow = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_RADIUS * 0.6)
        mglow.addColorStop(0, "hsla(185, 80%, 55%, 0.06)")
        mglow.addColorStop(0.4, "hsla(185, 70%, 50%, 0.025)")
        mglow.addColorStop(1, "hsla(185, 60%, 45%, 0)")
        ctx.beginPath()
        ctx.arc(mx, my, MOUSE_RADIUS * 0.6, 0, Math.PI * 2)
        ctx.fillStyle = mglow
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    resize()
    initParticles()
    animate()

    const el = canvas
    el.addEventListener("mousemove", handleMouseMove)
    el.addEventListener("mouseleave", handleMouseLeave)

    const resizeHandler = () => {
      resize()
      initParticles()
    }
    window.addEventListener("resize", resizeHandler)

    return () => {
      cancelAnimationFrame(animationId)
      el.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("resize", resizeHandler)
    }
  }, [handleMouseMove, handleMouseLeave])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ cursor: "default" }}
      aria-hidden="true"
    />
  )
}
