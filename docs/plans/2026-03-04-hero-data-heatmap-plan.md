# Hero Data Heatmap Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the Three.js mountain terrain in the hero with a Canvas 2D data heatmap grid that evokes biomarker data visualization.

**Architecture:** A single `DataHeatmap` React component renders a full-screen `<canvas>` element. A standalone `initHeatmap()` function handles all Canvas 2D setup, noise computation, mouse interaction, and the animation loop. The component is dynamically imported by `hero.tsx` with `ssr: false`.

**Tech Stack:** React 19, Canvas 2D API, simplex noise (inline JS implementation), next/dynamic

---

### Task 1: Create the simplex noise utility and DataHeatmap component skeleton

**Files:**
- Create: `components/ui/data-heatmap.tsx`

**Step 1: Write the component file with simplex noise + grid rendering**

The entire component in one file. This is a self-contained Canvas 2D heatmap with:
- Inline 2D simplex noise function
- Grid rendering with color mapping
- Mouse proximity glow
- Dead zone (pitch black above 55% viewport)
- IntersectionObserver + 30fps throttle
- Resize handling

```tsx
"use client"

import React, { useRef, useEffect } from "react"

/**
 * DataHeatmap
 * Renders a Canvas 2D heatmap grid that evokes biomarker data visualization.
 * Replaces the Three.js mountain terrain in the hero section.
 */
export function DataHeatmap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    return initHeatmap(container, canvas)
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full z-0">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}

// ─── Simplex Noise (2D) ─────────────────────────────────────────────────────
// Compact JS port — no external dependency

function noise2D(xin: number, yin: number): number {
  const F2 = 0.5 * (Math.sqrt(3.0) - 1.0)
  const G2 = (3.0 - Math.sqrt(3.0)) / 6.0

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
  const x2 = x0 - 1.0 + 2.0 * G2
  const y2 = y0 - 1.0 + 2.0 * G2

  const ii = i & 255
  const jj = j & 255

  const g0 = GRAD[PERM[(ii + PERM[jj & 255]) & 255] % 12]
  const g1 = GRAD[PERM[(ii + i1 + PERM[(jj + j1) & 255]) & 255] % 12]
  const g2 = GRAD[PERM[(ii + 1 + PERM[(jj + 1) & 255]) & 255] % 12]

  let n0 = 0, n1 = 0, n2 = 0
  let t0 = 0.5 - x0 * x0 - y0 * y0
  if (t0 > 0) { t0 *= t0; n0 = t0 * t0 * (g0[0] * x0 + g0[1] * y0) }
  let t1 = 0.5 - x1 * x1 - y1 * y1
  if (t1 > 0) { t1 *= t1; n1 = t1 * t1 * (g1[0] * x1 + g1[1] * y1) }
  let t2 = 0.5 - x2 * x2 - y2 * y2
  if (t2 > 0) { t2 *= t2; n2 = t2 * t2 * (g2[0] * x2 + g2[1] * y2) }

  // Scale to [0, 1]
  return (70.0 * (n0 + n1 + n2) + 1) / 2
}

const GRAD: number[][] = [
  [1,1],[−1,1],[1,−1],[−1,−1],
  [1,0],[−1,0],[0,1],[0,−1],
  [1,1],[−1,1],[1,−1],[−1,−1],
]

// Seeded permutation table
const PERM: number[] = (() => {
  const p: number[] = []
  for (let i = 0; i < 256; i++) p[i] = i
  // Fisher-Yates with fixed seed
  let seed = 42
  for (let i = 255; i > 0; i--) {
    seed = (seed * 16807 + 0) % 2147483647
    const j = seed % (i + 1);
    [p[i], p[j]] = [p[j], p[i]]
  }
  // Double the table to avoid index wrapping
  for (let i = 0; i < 256; i++) p[256 + i] = p[i]
  return p
})()

// ─── Color helpers ──────────────────────────────────────────────────────────

// Brand colors as RGB tuples
const NAVY     = [10, 22, 40]    // #0A1628
const NAVY_MID = [26, 42, 64]    // #1A2A40
const TEAL_DIM = [42, 74, 90]    // #2A4A5A
const TEAL     = [91, 158, 166]  // #5B9EA6
const GOLD     = [201, 168, 76]  // #C9A84C

function lerpColor(a: number[], b: number[], t: number): number[] {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ]
}

/** Map noise value (0-1) to an RGB color */
function valueToColor(v: number): number[] {
  if (v < 0.3) return lerpColor(NAVY, NAVY_MID, v / 0.3)
  if (v < 0.6) return lerpColor(TEAL_DIM, TEAL, (v - 0.3) / 0.3)
  if (v < 0.85) return lerpColor(TEAL, GOLD, (v - 0.6) / 0.25)
  return GOLD
}

// ─── Main init function ─────────────────────────────────────────────────────

function initHeatmap(container: HTMLDivElement, canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  let isVisible = true
  const observer = new IntersectionObserver(
    ([entry]) => { isVisible = entry.isIntersecting },
    { threshold: 0 }
  )
  observer.observe(container)

  // Grid config
  const GAP = 2  // px gap between cells
  const isMobile = window.innerWidth < 768
  let cols = isMobile ? 30 : 50

  // State
  let mouseX = -9999
  let mouseY = -9999
  let lightIntensity = 0
  let frameId: number
  let lastRenderTime = 0
  const FRAME_INTERVAL = 1000 / 30

  // Sizing
  function resize() {
    const dpr = Math.min(window.devicePixelRatio, 2)
    const w = container.clientWidth
    const h = container.clientHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    cols = (window.innerWidth < 768) ? 30 : 50
  }
  resize()

  // Render
  function render(time: number) {
    const w = container.clientWidth
    const h = container.clientHeight
    const rows = Math.floor(cols * (h / w))
    const cellW = (w - (cols + 1) * GAP) / cols
    const cellH = (h - (rows + 1) * GAP) / rows
    const t = time * 0.0001  // slow scroll

    ctx.clearRect(0, 0, w, h)

    const PROXIMITY_RADIUS = 150

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Cell position
        const x = GAP + col * (cellW + GAP)
        const y = GAP + row * (cellH + GAP)
        const cx = x + cellW / 2
        const cy = y + cellH / 2

        // Noise value — scrolls over time
        const noiseVal = noise2D(col * 0.15, row * 0.15 + t)

        // Base color from noise
        const baseColor = valueToColor(noiseVal)

        // Mouse proximity glow
        let brightness = 1.0
        const dx = cx - mouseX
        const dy = cy - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < PROXIMITY_RADIUS) {
          const falloff = 1 - (dist / PROXIMITY_RADIUS)
          brightness = 1.0 + falloff * falloff * 1.5
        }

        // Apply light intensity (dead zone)
        const r = Math.min(255, Math.round(baseColor[0] * brightness * lightIntensity))
        const g = Math.min(255, Math.round(baseColor[1] * brightness * lightIntensity))
        const b = Math.min(255, Math.round(baseColor[2] * brightness * lightIntensity))

        ctx.fillStyle = `rgb(${r},${g},${b})`
        ctx.fillRect(x, y, cellW, cellH)
      }
    }
  }

  // Animation loop
  function animate(t: number) {
    frameId = requestAnimationFrame(animate)
    if (!isVisible) return
    if (lightIntensity <= 0) return
    if (t - lastRenderTime < FRAME_INTERVAL) return
    lastRenderTime = t
    render(t)
  }
  animate(0)

  // Event handlers
  function handleResize() { resize() }

  function handleMouseMove(e: MouseEvent) {
    if (!isVisible) return
    mouseX = e.clientX
    mouseY = e.clientY

    // Dead zone: pitch black above "See More" text (~55% viewport)
    // Starts at 10% once past threshold, scales 2x faster to reach 100%
    const screenY = e.clientY / window.innerHeight
    const threshold = 0.55
    if (screenY <= threshold) {
      lightIntensity = 0
    } else {
      const ramp = Math.min(1, ((screenY - threshold) / (1 - threshold)) * 2)
      lightIntensity = 0.1 + 0.9 * ramp
    }
  }

  window.addEventListener("resize", handleResize)
  window.addEventListener("mousemove", handleMouseMove)

  return () => {
    observer.disconnect()
    cancelAnimationFrame(frameId)
    window.removeEventListener("resize", handleResize)
    window.removeEventListener("mousemove", handleMouseMove)
  }
}

export default DataHeatmap
```

**IMPORTANT:** The `GRAD` array above uses Unicode minus signs for readability in the plan. In the actual implementation, use standard ASCII hyphens for negative numbers: `[-1,1]`, `[1,-1]`, `[-1,-1]`, etc.

**Step 2: Verify the file compiles**

Run: `cd /Users/natehough/Desktop/v0-kaira-health-website && npx tsc --noEmit components/ui/data-heatmap.tsx 2>&1 || pnpm run build 2>&1 | tail -20`

Expected: No TypeScript errors related to data-heatmap.tsx

**Step 3: Commit**

```bash
git add components/ui/data-heatmap.tsx
git commit -m "feat: add Canvas 2D data heatmap component

Renders a grid of noise-driven colored cells with mouse proximity
glow and dead zone behavior. Replaces mountain terrain visually."
```

---

### Task 2: Wire the DataHeatmap into the hero section

**Files:**
- Modify: `components/hero.tsx` (lines 7-9, line 19)

**Step 1: Update the dynamic import**

Change the import from `mountain-scene` to `data-heatmap`:

```tsx
// OLD (lines 7-9):
const GenerativeMountainScene = dynamic(
  () => import("@/components/ui/mountain-scene").then((m) => m.GenerativeMountainScene),
  { ssr: false, loading: () => null }
)

// NEW:
const DataHeatmap = dynamic(
  () => import("@/components/ui/data-heatmap").then((m) => m.DataHeatmap),
  { ssr: false, loading: () => null }
)
```

**Step 2: Update the JSX usage**

```tsx
// OLD (line 19):
<GenerativeMountainScene />

// NEW:
<DataHeatmap />
```

**Step 3: Update the comment**

```tsx
// OLD (line 18):
{/* Three.js mountain landscape — z-0 background layer */}

// NEW:
{/* Data heatmap grid — z-0 background layer */}
```

**Step 4: Verify build passes**

Run: `cd /Users/natehough/Desktop/v0-kaira-health-website && pnpm run build 2>&1 | tail -20`

Expected: Build succeeds with zero errors.

**Step 5: Commit**

```bash
git add components/hero.tsx
git commit -m "feat: swap hero background from mountain terrain to data heatmap

Dynamic import now loads data-heatmap.tsx instead of mountain-scene.tsx.
Mountain scene file retained in codebase for potential future use."
```

---

### Task 3: Visual verification and tuning

**Files:**
- Possibly modify: `components/ui/data-heatmap.tsx` (tuning only)

**Step 1: Start dev server and verify rendering**

Run: `cd /Users/natehough/Desktop/v0-kaira-health-website && pnpm run dev`

Check in browser at `http://localhost:3000`:
1. Hero section loads with dark background
2. Grid is invisible (black) when mouse is above ~55% viewport
3. Moving mouse below the "See More" text illuminates the heatmap grid
4. Cells show varying colors: navy, teal, gold
5. Mouse proximity creates a bright hotspot
6. Cells have visible gaps between them (grid lines)
7. Grid resizes on window resize
8. No console errors

**Step 2: Tune parameters if needed**

Potential adjustments (modify in `data-heatmap.tsx`):
- `cols`: increase/decrease grid density (line where `cols` is set)
- `GAP`: change gap between cells (line where `GAP = 2`)
- `PROXIMITY_RADIUS`: change mouse glow radius (line where `PROXIMITY_RADIUS = 150`)
- `0.15` in noise2D calls: change noise frequency (higher = more varied, lower = smoother blobs)
- `0.0001` time multiplier: change animation speed (higher = faster scrolling data)
- Color thresholds in `valueToColor`: adjust when teal/gold kicks in

**Step 3: Verify mobile**

Open dev tools responsive mode at 375px width:
- Grid reduces to ~30 columns
- Performance is smooth
- No horizontal scroll

**Step 4: Final build check**

Run: `cd /Users/natehough/Desktop/v0-kaira-health-website && pnpm run build 2>&1 | tail -10`

Expected: Clean build, no errors.

**Step 5: Commit any tuning changes**

```bash
git add components/ui/data-heatmap.tsx
git commit -m "fix: tune heatmap grid density, colors, and mouse proximity"
```

(Skip this commit if no tuning was needed.)

---

### Task 4: Push and deploy

**Step 1: Push to remote**

```bash
git push
```

**Step 2: Deploy to Vercel**

```bash
vercel --prod --yes
```

Expected: Deployment succeeds, live URL shows heatmap grid in hero.
