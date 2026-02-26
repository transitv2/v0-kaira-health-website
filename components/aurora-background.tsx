"use client"

import { useEffect, useRef } from "react"

/**
 * A WebGL-style aurora / light-through-darkness animation.
 * Renders soft luminous blobs that drift like moonlight cutting through night sky.
 * The canvas uses golden hues on deep navy — KAIRA's palette.
 */
export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let w = 0
    let h = 0

    const blobs = [
      { x: 0.3, y: 0.3, r: 0.35, vx: 0.008, vy: 0.006, color: "rgba(201,168,76,0.07)" },
      { x: 0.7, y: 0.6, r: 0.4, vx: -0.006, vy: 0.009, color: "rgba(201,168,76,0.05)" },
      { x: 0.5, y: 0.2, r: 0.3, vx: 0.005, vy: -0.007, color: "rgba(74,144,184,0.04)" },
      { x: 0.2, y: 0.7, r: 0.32, vx: -0.007, vy: -0.005, color: "rgba(201,168,76,0.06)" },
      { x: 0.8, y: 0.4, r: 0.28, vx: 0.004, vy: 0.008, color: "rgba(126,196,160,0.03)" },
    ]

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = w + "px"
      canvas!.style.height = h + "px"
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h)

      for (const blob of blobs) {
        blob.x += blob.vx * 0.12
        blob.y += blob.vy * 0.12

        // Gentle bounce at boundaries
        if (blob.x < -0.2 || blob.x > 1.2) blob.vx *= -1
        if (blob.y < -0.2 || blob.y > 1.2) blob.vy *= -1

        const cx = blob.x * w
        const cy = blob.y * h
        const radius = blob.r * Math.min(w, h)

        const gradient = ctx!.createRadialGradient(cx, cy, 0, cx, cy, radius)
        gradient.addColorStop(0, blob.color)
        gradient.addColorStop(1, "rgba(0,0,0,0)")

        ctx!.fillStyle = gradient
        ctx!.beginPath()
        ctx!.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx!.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}
