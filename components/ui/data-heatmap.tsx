"use client"

import React, { useRef, useEffect } from "react"

/* ─────────────────────────────────────────────────────────
   2D Simplex Noise  (seeded, deterministic, inline)
   Returns values in [0, 1].
   ───────────────────────────────────────────────────────── */

const GRAD: [number, number][] = [
  [1, 1], [-1, 1], [1, -1], [-1, -1],
  [1, 0], [-1, 0], [0, 1], [0, -1],
]

function buildPerm(seed: number): Uint8Array {
  const p = new Uint8Array(256)
  for (let i = 0; i < 256; i++) p[i] = i
  // Fisher-Yates seeded shuffle
  let s = seed
  for (let i = 255; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647
    const j = s % (i + 1)
    const tmp = p[i]
    p[i] = p[j]
    p[j] = tmp
  }
  // Double the table so we can index without masking
  const perm = new Uint8Array(512)
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255]
  return perm
}

const PERM = buildPerm(42)

function dot2(g: [number, number], x: number, y: number): number {
  return g[0] * x + g[1] * y
}

/** 2D simplex noise, returns value in [0, 1] */
function simplex2(xin: number, yin: number): number {
  const F2 = 0.5 * (Math.sqrt(3) - 1)
  const G2 = (3 - Math.sqrt(3)) / 6

  const s = (xin + yin) * F2
  const i = Math.floor(xin + s)
  const j = Math.floor(yin + s)

  const t = (i + j) * G2
  const X0 = i - t
  const Y0 = j - t
  const x0 = xin - X0
  const y0 = yin - Y0

  let i1: number, j1: number
  if (x0 > y0) { i1 = 1; j1 = 0 } else { i1 = 0; j1 = 1 }

  const x1 = x0 - i1 + G2
  const y1 = y0 - j1 + G2
  const x2 = x0 - 1 + 2 * G2
  const y2 = y0 - 1 + 2 * G2

  const ii = i & 255
  const jj = j & 255
  const gi0 = PERM[ii + PERM[jj]] % 8
  const gi1 = PERM[ii + i1 + PERM[jj + j1]] % 8
  const gi2 = PERM[ii + 1 + PERM[jj + 1]] % 8

  let n0 = 0, n1 = 0, n2 = 0

  let t0 = 0.5 - x0 * x0 - y0 * y0
  if (t0 >= 0) { t0 *= t0; n0 = t0 * t0 * dot2(GRAD[gi0], x0, y0) }

  let t1 = 0.5 - x1 * x1 - y1 * y1
  if (t1 >= 0) { t1 *= t1; n1 = t1 * t1 * dot2(GRAD[gi1], x1, y1) }

  let t2 = 0.5 - x2 * x2 - y2 * y2
  if (t2 >= 0) { t2 *= t2; n2 = t2 * t2 * dot2(GRAD[gi2], x2, y2) }

  // Scale to [0, 1]
  return (70 * (n0 + n1 + n2) + 1) * 0.5
}

/* ─────────────────────────────────────────────────────────
   Color Mapping: noise [0,1] -> navy/teal/gold gradient
   ───────────────────────────────────────────────────────── */

function hexToRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.slice(1), 16)
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255]
}

function lerpColor(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ]
}

// Pre-computed color stops
const C_NAVY_DARK = hexToRgb("#0A1628")
const C_NAVY_LIGHT = hexToRgb("#1A2A40")
const C_TEAL_DARK = hexToRgb("#2A4A5A")
const C_TEAL_LIGHT = hexToRgb("#5B9EA6")
const C_GOLD = hexToRgb("#C9A84C")

function noiseToColor(n: number): [number, number, number] {
  if (n < 0.3) {
    return lerpColor(C_NAVY_DARK, C_NAVY_LIGHT, n / 0.3)
  } else if (n < 0.6) {
    return lerpColor(C_TEAL_DARK, C_TEAL_LIGHT, (n - 0.3) / 0.3)
  } else if (n < 0.85) {
    return lerpColor(C_TEAL_LIGHT, C_GOLD, (n - 0.6) / 0.25)
  }
  return C_GOLD
}

/* ─────────────────────────────────────────────────────────
   DataHeatmap React Component
   ───────────────────────────────────────────────────────── */

export function DataHeatmap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isVisibleRef = useRef(true)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const cleanup = initHeatmap(container, canvas, isVisibleRef)
    return cleanup
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full z-0">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   initHeatmap  — standalone setup, returns cleanup fn
   ───────────────────────────────────────────────────────── */

function initHeatmap(
  container: HTMLDivElement,
  canvas: HTMLCanvasElement,
  isVisibleRef: React.RefObject<boolean>,
): () => void {
  const ctx = canvas.getContext("2d")
  if (!ctx) return () => {}
  const cx = ctx // narrowed to non-null

  // ── IntersectionObserver: pause when off-screen ──
  const observer = new IntersectionObserver(
    ([entry]) => {
      (isVisibleRef as React.MutableRefObject<boolean>).current = entry.isIntersecting
    },
    { threshold: 0 },
  )
  observer.observe(container)

  // ── State ──
  let mouseX = -9999
  let mouseY = -9999
  let lightIntensity = 0
  let cols = 50
  let rows = 30
  let cellW = 10
  let cellH = 10
  const GAP = 2
  const PROXIMITY_RADIUS = 150
  const NOISE_SCALE = 0.12 // controls heatmap feature size

  // ── Canvas sizing ──
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = container.clientWidth
    const h = container.clientHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    cx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const isMobile = w < 768
    cols = isMobile ? 30 : 50
    cellW = (w - GAP * (cols - 1)) / cols
    rows = Math.ceil(h / (cellW + GAP))
    cellH = (h - GAP * (rows - 1)) / rows
  }
  resize()

  // Mobile/touch: no mousemove, so show heatmap at full intensity
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    lightIntensity = 1
  }

  // ── Pre-compute noise grid ──
  let noiseGrid: Float32Array = new Float32Array(0)
  function computeNoise() {
    noiseGrid = new Float32Array(cols * rows)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Multi-octave noise for richer detail
        let val = simplex2(c * NOISE_SCALE, r * NOISE_SCALE) * 0.6
        val += simplex2(c * NOISE_SCALE * 2.3 + 50, r * NOISE_SCALE * 2.3 + 50) * 0.3
        val += simplex2(c * NOISE_SCALE * 4.7 + 100, r * NOISE_SCALE * 4.7 + 100) * 0.1
        // Clamp to [0, 1]
        noiseGrid[r * cols + c] = Math.max(0, Math.min(1, val))
      }
    }
  }
  computeNoise()

  // ── Render one frame ──
  function draw() {
    const w = container.clientWidth
    const h = container.clientHeight
    // Clear to background color
    cx.fillStyle = "#0A1628"
    cx.fillRect(0, 0, w, h)

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * (cellW + GAP)
        const y = r * (cellH + GAP)
        const noise = noiseGrid[r * cols + c]
        const [baseR, baseG, baseB] = noiseToColor(noise)

        // Mouse proximity brightness boost (quadratic falloff)
        let brightness = 1.0
        const cellCenterX = x + cellW * 0.5
        const cellCenterY = y + cellH * 0.5
        const dx = cellCenterX - mouseX
        const dy = cellCenterY - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < PROXIMITY_RADIUS) {
          const factor = 1 - (dist / PROXIMITY_RADIUS)
          brightness += factor * factor * 1.5 // quadratic boost
        }

        // Apply light intensity (dead zone logic)
        const finalR = Math.min(255, (baseR * brightness * lightIntensity) | 0)
        const finalG = Math.min(255, (baseG * brightness * lightIntensity) | 0)
        const finalB = Math.min(255, (baseB * brightness * lightIntensity) | 0)

        cx.fillStyle = `rgb(${finalR},${finalG},${finalB})`
        cx.fillRect(x, y, cellW, cellH)
      }
    }
  }

  // ── Animation loop (30 fps throttle) ──
  let frameId: number
  let lastRenderTime = 0
  const FRAME_INTERVAL = 1000 / 30

  function animate(t: number) {
    frameId = requestAnimationFrame(animate)

    // Skip when off-screen
    if (!isVisibleRef.current) return

    // Skip when pitch black
    if (lightIntensity <= 0) return

    // Throttle to ~30 fps
    if (t - lastRenderTime < FRAME_INTERVAL) return
    lastRenderTime = t

    draw()
  }
  frameId = requestAnimationFrame(animate)

  // ── Event handlers ──
  function handleResize() {
    resize()
    computeNoise()
    // Redraw immediately if visible and lit
    if (isVisibleRef.current && lightIntensity > 0) {
      draw()
    }
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isVisibleRef.current) return

    const rect = canvas.getBoundingClientRect()
    mouseX = e.clientX - rect.left
    mouseY = e.clientY - rect.top

    // Dead zone logic stays using viewport coordinates (e.clientY)
    const screenY = e.clientY / window.innerHeight
    const threshold = 0.55
    if (screenY <= threshold) {
      lightIntensity = 0
    } else {
      const ramp = Math.min(1, ((screenY - threshold) / (1 - threshold)) * 2)
      lightIntensity = 0.1 + 0.9 * ramp
    }
  }

  function handleTouchMove(e: TouchEvent) {
    if (!isVisibleRef.current || !e.touches[0]) return
    const rect = canvas.getBoundingClientRect()
    mouseX = e.touches[0].clientX - rect.left
    mouseY = e.touches[0].clientY - rect.top
  }

  window.addEventListener("resize", handleResize)
  window.addEventListener("mousemove", handleMouseMove)
  window.addEventListener("touchmove", handleTouchMove, { passive: true })

  // ── Cleanup ──
  return () => {
    observer.disconnect()
    cancelAnimationFrame(frameId)
    window.removeEventListener("resize", handleResize)
    window.removeEventListener("mousemove", handleMouseMove)
    window.removeEventListener("touchmove", handleTouchMove)
  }
}

export default DataHeatmap
