"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  layer: number // 0 = far, 1 = mid, 2 = close
  hue: number
  pulseOffset: number
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
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
    mouseRef.current = { x: -1000, y: -1000 }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    const PARTICLE_COUNT = 140
    const CONNECTION_DIST = 150

    function resize() {
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function initParticles() {
      if (!canvas) return
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      particles = Array.from({ length: PARTICLE_COUNT }, () => {
        const layer = Math.random() < 0.3 ? 2 : Math.random() < 0.6 ? 1 : 0
        const speed = [0.15, 0.3, 0.5][layer]
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          radius: [1, 1.5, 2.5][layer],
          opacity: [0.15, 0.35, 0.6][layer],
          layer,
          hue: 180 + Math.random() * 30, // teal range
          pulseOffset: Math.random() * Math.PI * 2,
        }
      })
    }

    function animate() {
      if (!canvas || !ctx) return
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const time = frameRef.current * 0.01
      frameRef.current++

      ctx.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const mouseActive = mx > -500

      // Update particles
      for (const p of particles) {
        // Mouse repulsion / attraction based on layer
        if (mouseActive) {
          const dx = p.x - mx
          const dy = p.y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          const influence = p.layer === 2 ? 200 : p.layer === 1 ? 150 : 100

          if (dist < influence && dist > 0) {
            const force = ((influence - dist) / influence) * 0.02
            if (p.layer === 2) {
              // Close particles repel
              p.vx += (dx / dist) * force
              p.vy += (dy / dist) * force
            } else {
              // Far particles attract gently
              p.vx -= (dx / dist) * force * 0.3
              p.vy -= (dy / dist) * force * 0.3
            }
          }
        }

        // Damping
        p.vx *= 0.998
        p.vy *= 0.998

        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        // Pulsing opacity
        const pulse = Math.sin(time * 2 + p.pulseOffset) * 0.15
        const drawOpacity = Math.max(0.05, p.opacity + pulse)

        // Glow for close particles
        if (p.layer === 2) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${drawOpacity * 0.15})`
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 70%, 65%, ${drawOpacity})`
        ctx.fill()
      }

      // Draw connections (only between mid and close layers)
      for (let i = 0; i < particles.length; i++) {
        if (particles[i].layer === 0) continue
        for (let j = i + 1; j < particles.length; j++) {
          if (particles[j].layer === 0) continue
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.12
            const gradient = ctx.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y
            )
            gradient.addColorStop(0, `hsla(${particles[i].hue}, 60%, 60%, ${opacity})`)
            gradient.addColorStop(1, `hsla(${particles[j].hue}, 60%, 60%, ${opacity})`)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // Mouse glow halo
      if (mouseActive) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 180)
        grad.addColorStop(0, "hsla(185, 70%, 55%, 0.06)")
        grad.addColorStop(0.5, "hsla(185, 70%, 55%, 0.02)")
        grad.addColorStop(1, "hsla(185, 70%, 55%, 0)")
        ctx.beginPath()
        ctx.arc(mx, my, 180, 0, Math.PI * 2)
        ctx.fillStyle = grad
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
    window.addEventListener("resize", () => {
      resize()
      initParticles()
    })

    return () => {
      cancelAnimationFrame(animationId)
      el.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("resize", resize)
    }
  }, [handleMouseMove, handleMouseLeave])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{ cursor: "default" }}
      aria-hidden="true"
    />
  )
}
