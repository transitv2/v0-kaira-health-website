"use client"

import { useEffect, useRef } from "react"

// ---------------------------------------------------------------------------
// Perlin noise
// ---------------------------------------------------------------------------
class Grad {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  dot2(x: number, y: number) {
    return this.x * x + this.y * y
  }
}

class Noise {
  private perm: number[]
  private gradP: Grad[]
  private grad3: Grad[]
  private p: number[]

  constructor(seed = 0) {
    this.grad3 = [
      new Grad(1, 1), new Grad(-1, 1), new Grad(1, -1), new Grad(-1, -1),
      new Grad(1, 0), new Grad(-1, 0), new Grad(1, 0), new Grad(-1, 0),
      new Grad(0, 1), new Grad(0, -1), new Grad(0, 1), new Grad(0, -1),
    ]
    this.p = [
      151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,
      142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,
      203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,
      74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,
      220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,
      132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,
      186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,
      59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,
      70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,
      178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,
      241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,
      176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,
      128,195,78,66,215,61,156,180,
    ]
    this.perm = new Array(512)
    this.gradP = new Array(512)
    this.seed(seed)
  }

  seed(seed: number) {
    if (seed > 0 && seed < 1) seed *= 65536
    seed = Math.floor(seed)
    if (seed < 256) seed |= seed << 8
    for (let i = 0; i < 256; i++) {
      const v = i & 1
        ? this.p[i] ^ (seed & 255)
        : this.p[i] ^ ((seed >> 8) & 255)
      this.perm[i] = this.perm[i + 256] = v
      this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12]
    }
  }

  private fade(t: number) {
    return t * t * t * (t * (t * 6 - 15) + 10)
  }
  private lerp(a: number, b: number, t: number) {
    return (1 - t) * a + t * b
  }

  perlin2(x: number, y: number) {
    let X = Math.floor(x)
    let Y = Math.floor(y)
    x -= X; y -= Y
    X &= 255; Y &= 255
    const n00 = this.gradP[X + this.perm[Y]].dot2(x, y)
    const n01 = this.gradP[X + this.perm[Y + 1]].dot2(x, y - 1)
    const n10 = this.gradP[X + 1 + this.perm[Y]].dot2(x - 1, y)
    const n11 = this.gradP[X + 1 + this.perm[Y + 1]].dot2(x - 1, y - 1)
    const u = this.fade(x)
    return this.lerp(this.lerp(n00, n10, u), this.lerp(n01, n11, u), this.fade(y))
  }
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const BLOCK = 7
const CELL = 10
const GOLD_R = 201
const GOLD_G = 168
const GOLD_B = 76
const MIN_OPACITY = 0.03
const MAX_OPACITY = 0.20

// Wave displacement
const WAVE_AMP_X = 12
const WAVE_AMP_Y = 10

// Wave speeds — multiple layers at different speeds create visible rolling
const SPEED1 = 0.03        // slow broad swell
const SPEED2 = 0.06        // medium ripple
const SPEED3 = 0.10        // fast surface shimmer

interface PixelatedWaveformProps {
  className?: string
}

export function PixelatedWaveform({ className }: PixelatedWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const noiseRef = useRef(new Noise(Math.random()))
  const sizeRef = useRef({ w: 0, h: 0, cols: 0, rows: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    function setSize() {
      if (!canvas) return
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
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      sizeRef.current = {
        w,
        h,
        cols: Math.ceil((w + 60) / CELL),
        rows: Math.ceil((h + 60) / CELL),
      }
    }

    function render(time: number) {
      const { w, h, cols, rows } = sizeRef.current
      if (cols === 0 || rows === 0) {
        frameRef.current = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, w, h)

      const noise = noiseRef.current
      const t = time * 0.001 // seconds
      const opRange = MAX_OPACITY - MIN_OPACITY

      const xOff = (w - cols * CELL) / 2
      const yOff = (h - rows * CELL) / 2

      for (let r = 0; r <= rows; r++) {
        const oy = yOff + r * CELL

        for (let c = 0; c <= cols; c++) {
          const ox = xOff + c * CELL

          // --- Position displacement (3 octaves of Perlin noise) ---

          // Octave 1: broad slow swell
          const n1 = noise.perlin2(
            (ox + t * SPEED1 * 1000) * 0.002,
            (oy + t * SPEED1 * 600) * 0.0018,
          )
          // Octave 2: medium wave, different direction
          const n2 = noise.perlin2(
            (ox - t * SPEED2 * 800) * 0.004,
            (oy + t * SPEED2 * 500) * 0.0035,
          )
          // Octave 3: fast fine ripple
          const n3 = noise.perlin2(
            (ox + t * SPEED3 * 400) * 0.008,
            (oy - t * SPEED3 * 300) * 0.007,
          )

          const combined = n1 * 0.5 + n2 * 0.3 + n3 * 0.2

          // Displacement
          const dx = Math.cos(combined * 12) * WAVE_AMP_X + Math.sin(combined * 8) * WAVE_AMP_X * 0.3
          const dy = Math.sin(combined * 12) * WAVE_AMP_Y + Math.cos(combined * 6) * WAVE_AMP_Y * 0.3

          const fx = ox + dx
          const fy = oy + dy

          // --- Opacity (separate noise layers for visible wave bands) ---

          // Slow rolling brightness bands
          const opN1 = noise.perlin2(
            (ox + t * 20) * 0.004,
            (oy + t * 14) * 0.004,
          )
          // Faster shimmer
          const opN2 = noise.perlin2(
            (ox - t * 35) * 0.009,
            (oy + t * 25) * 0.007,
          )

          const opNorm = ((opN1 * 0.6 + opN2 * 0.4) + 1) * 0.5
          const alpha = MIN_OPACITY + opNorm * opRange

          if (alpha < 0.02) continue

          ctx.fillStyle = `rgba(${GOLD_R},${GOLD_G},${GOLD_B},${alpha})`
          ctx.fillRect(
            Math.round(fx - BLOCK / 2),
            Math.round(fy - BLOCK / 2),
            BLOCK,
            BLOCK,
          )
        }
      }

      frameRef.current = requestAnimationFrame(render)
    }

    setSize()
    frameRef.current = requestAnimationFrame(render)

    const ro = new ResizeObserver(setSize)
    ro.observe(canvas.parentElement || canvas)

    return () => {
      cancelAnimationFrame(frameRef.current)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  )
}
