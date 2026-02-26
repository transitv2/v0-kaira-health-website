"use client"

import { useEffect, useRef, useCallback } from "react"

interface PixelatedWaveformProps {
  className?: string
}

const BLOCK_SIZE = 10
const GOLD_R = 201
const GOLD_G = 168
const GOLD_B = 76
const MIN_OPACITY = 0.03
const MAX_OPACITY = 0.08
const OPACITY_RANGE = MAX_OPACITY - MIN_OPACITY

export function PixelatedWaveform({ className }: PixelatedWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const colsRef = useRef(0)
  const rowsRef = useRef(0)

  const render = useCallback((time: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const cols = colsRef.current
    const rows = rowsRef.current

    if (cols === 0 || rows === 0) {
      animationRef.current = requestAnimationFrame(render)
      return
    }

    ctx.clearRect(0, 0, width, height)

    // Time factors for slow movement (seconds)
    const t = time * 0.001

    // Precompute wave parameters per column to avoid redundant sin calls per row
    // Layer 1: broad horizontal wave
    const l1Freq = 0.006
    const l1Speed = 0.4
    // Layer 2: medium wave moving opposite direction
    const l2Freq = 0.012
    const l2Speed = -0.3
    // Layer 3: fine ripple
    const l3Freq = 0.02
    const l3Speed = 0.6

    // Precompute column-based horizontal wave offsets
    const colWave1 = new Float32Array(cols)
    const colWave2 = new Float32Array(cols)
    const colWave3 = new Float32Array(cols)

    for (let cx = 0; cx < cols; cx++) {
      const px = cx * BLOCK_SIZE
      colWave1[cx] = Math.sin(px * l1Freq + t * l1Speed)
      colWave2[cx] = Math.sin(px * l2Freq + t * l2Speed)
      colWave3[cx] = Math.sin(px * l3Freq + t * l3Speed)
    }

    // Vertical wave frequencies
    const v1Freq = 0.008
    const v1Speed = 0.35
    const v2Freq = 0.015
    const v2Speed = -0.25
    const v3Freq = 0.022
    const v3Speed = 0.5

    // Draw blocks row by row (batch by setting fillStyle once per unique alpha)
    // Since alpha varies per block, we batch using a single fillStyle format
    // and draw rectangles directly for maximum performance
    for (let ry = 0; ry < rows; ry++) {
      const py = ry * BLOCK_SIZE

      // Vertical wave components for this row
      const rowWave1 = Math.sin(py * v1Freq + t * v1Speed)
      const rowWave2 = Math.sin(py * v2Freq + t * v2Speed)
      const rowWave3 = Math.sin(py * v3Freq + t * v3Speed)

      for (let cx = 0; cx < cols; cx++) {
        // Combine horizontal and vertical waves for each layer
        // Layer 1: broad, dominant
        const w1 = (colWave1[cx] + rowWave1) * 0.5
        // Layer 2: medium, secondary
        const w2 = (colWave2[cx] + rowWave2) * 0.5
        // Layer 3: fine detail
        const w3 = (colWave3[cx] + rowWave3) * 0.5

        // Combine layers: weighted sum normalized to 0..1
        // Each wave ranges -1..1, combined ranges roughly -1..1
        const combined = w1 * 0.45 + w2 * 0.35 + w3 * 0.2

        // Map from [-1, 1] to [0, 1]
        const normalized = (combined + 1) * 0.5

        // Map to opacity range
        const alpha = MIN_OPACITY + normalized * OPACITY_RANGE

        // Only draw if opacity is meaningful (skip nearly invisible blocks)
        if (alpha > 0.025) {
          ctx.fillStyle = `rgba(${GOLD_R},${GOLD_G},${GOLD_B},${alpha})`
          ctx.fillRect(cx * BLOCK_SIZE, py, BLOCK_SIZE - 1, BLOCK_SIZE - 1)
        }
      }
    }

    animationRef.current = requestAnimationFrame(render)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const updateSize = () => {
      const parent = canvas.parentElement
      if (!parent) return

      const rect = parent.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const w = Math.floor(rect.width)
      const h = Math.floor(rect.height)

      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.scale(dpr, dpr)
      }

      colsRef.current = Math.ceil(w / BLOCK_SIZE)
      rowsRef.current = Math.ceil(h / BLOCK_SIZE)
    }

    updateSize()

    const observer = new ResizeObserver(updateSize)
    observer.observe(canvas.parentElement || canvas)

    animationRef.current = requestAnimationFrame(render)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(animationRef.current)
    }
  }, [render])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  )
}
