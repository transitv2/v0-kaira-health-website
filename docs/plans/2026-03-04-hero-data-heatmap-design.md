# Hero Data Heatmap Design

## Summary

Replace the Three.js mountain terrain in the hero section with a Canvas 2D data heatmap grid. The heatmap renders rectangular cells colored by Perlin noise values, creating the visual impression of a live biomarker data dashboard. Mouse interaction creates a proximity glow hotspot. The existing dead zone behavior (pitch black above hero text) is preserved.

## Decision: Canvas 2D over Three.js

Canvas 2D was chosen because a flat grid of colored rectangles doesn't benefit from WebGL's 3D pipeline. Canvas 2D initializes faster and produces a smaller component bundle. Three.js dependencies are retained in the project (other components may use them); only the hero import changes.

## New File

`components/ui/data-heatmap.tsx` — exports `DataHeatmap` component.

## Grid Specification

- Columns: ~50 (desktop), ~30 (mobile, detected via `window.innerWidth < 768`)
- Rows: calculated from aspect ratio (`Math.floor(cols * (height / width))`)
- Cell gap: 1-2px transparent gap between cells (reveals `#0A1628` background)
- Cell size: `(canvas.width - gaps) / cols` and `(canvas.height - gaps) / rows`

## Color Mapping

Each cell gets a noise value 0-1 from simplex noise. The value maps:

| Range     | Color                          |
|-----------|--------------------------------|
| 0.0-0.3   | `#0A1628` to `#1A2A40` (navy)  |
| 0.3-0.6   | `#2A4A5A` to `#5B9EA6` (teal)  |
| 0.6-0.85  | teal to gold transition        |
| 0.85-1.0  | `#C9A84C` (bright gold)        |

The noise field scrolls slowly over time to simulate streaming data.

## Mouse Interaction

- Proximity radius: ~150px
- Brightness boost: multiplicative, applied to cell color
- Hotspot center: gold-white glow directly under cursor
- Falloff: quadratic from cursor position

## Dead Zone (Unchanged)

- `screenY <= 0.55` -> `lightIntensity = 0` (entire grid is black)
- Past threshold -> starts at 10%, ramps 2x to 100%
- When `lightIntensity = 0`, skip RAF render entirely

## Performance

- IntersectionObserver pauses animation when off-screen
- 30fps throttle via timestamp delta check
- No render when `lightIntensity <= 0`
- Simplex noise implemented in ~50 lines of JS (no external dependency)

## Changes to Existing Files

- `components/hero.tsx`: change dynamic import from `mountain-scene` to `data-heatmap`
- `components/ui/mountain-scene.tsx`: kept in codebase, not deleted
- `package.json`: no dependency changes (three.js deps retained)

## Not In Scope

- Removing three.js dependencies
- Deleting mountain-scene.tsx
- Changing any other section's animation
