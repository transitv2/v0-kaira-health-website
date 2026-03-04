"use client"

import { useEffect, useRef, useState } from "react"
import {
  geoOrthographic,
  geoPath,
  geoBounds,
  geoDistance,
  geoGraticule,
  type GeoPermissibleObjects,
} from "d3-geo"
import { timer as d3Timer } from "d3-timer"
import type { ExtendedFeature, GeoGeometryObjects } from "d3-geo"

/** City marker with coordinates and label */
interface CityMarker {
  name: string
  coords: [number, number] // [longitude, latitude]
  subtitle?: string
}

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
  markers?: CityMarker[]
}

const DEFAULT_MARKERS: CityMarker[] = [
  { name: "Toronto", coords: [-79.38, 43.65], subtitle: "HQ" },
  { name: "New York", coords: [-74.01, 40.71], subtitle: "2026" },
  { name: "Miami", coords: [-80.19, 25.76], subtitle: "2027" },
  { name: "Chicago", coords: [-87.63, 41.88], subtitle: "2027" },
  { name: "Bahrain", coords: [50.58, 26.07], subtitle: "2027" },
]

export default function RotatingEarth({
  width = 800,
  height = 600,
  className = "",
  markers = DEFAULT_MARKERS,
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isVisibleRef = useRef(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    // IntersectionObserver: only run timer when visible
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting },
      { threshold: 0, rootMargin: "200px" }
    )
    observer.observe(containerRef.current)

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    // Set up responsive dimensions
    const containerWidth = Math.min(width, window.innerWidth - 40)
    const containerHeight = Math.min(height, window.innerHeight - 100)
    const radius = Math.min(containerWidth, containerHeight) / 2.5
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    context.scale(dpr, dpr)

    // Create projection and path generator for Canvas
    const projection = geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = geoPath().projection(projection).context(context)

    const pointInPolygon = (
      point: [number, number],
      polygon: number[][]
    ): boolean => {
      const [x, y] = point
      let inside = false
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]
        if (
          yi > y !== yj > y &&
          x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
        ) {
          inside = !inside
        }
      }
      return inside
    }

    const pointInFeature = (
      point: [number, number],
      feature: ExtendedFeature
    ): boolean => {
      const geometry = feature.geometry
      if (!geometry) return false

      if (geometry.type === "Polygon") {
        const coordinates = (geometry as GeoGeometryObjects & { coordinates: number[][][] }).coordinates
        if (!pointInPolygon(point, coordinates[0])) return false
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) return false
        }
        return true
      } else if (geometry.type === "MultiPolygon") {
        const coordinates = (geometry as GeoGeometryObjects & { coordinates: number[][][][] }).coordinates
        for (const polygon of coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true
                break
              }
            }
            if (!inHole) return true
          }
        }
        return false
      }
      return false
    }

    const generateDotsInPolygon = (
      feature: ExtendedFeature,
      dotSpacing = 16
    ) => {
      const dots: [number, number][] = []
      const bounds = geoBounds(feature as GeoPermissibleObjects)
      const [[minLng, minLat], [maxLng, maxLat]] = bounds
      const stepSize = dotSpacing * 0.08

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat]
          if (pointInFeature(point, feature)) {
            dots.push(point)
          }
        }
      }
      return dots
    }

    interface DotData {
      lng: number
      lat: number
    }

    const allDots: DotData[] = []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let landFeatures: any

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight)

      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius

      // Draw ocean (globe background) — dark
      context.beginPath()
      context.arc(
        containerWidth / 2,
        containerHeight / 2,
        currentScale,
        0,
        2 * Math.PI
      )
      context.fillStyle = "#0A1628"
      context.fill()
      context.strokeStyle = "rgba(91, 158, 166, 0.3)"
      context.lineWidth = 1.5 * scaleFactor
      context.stroke()

      if (landFeatures) {
        // Draw graticule — subtle gold
        const graticule = geoGraticule()
        context.beginPath()
        path(graticule() as GeoPermissibleObjects)
        context.strokeStyle = "rgba(91, 158, 166, 0.08)"
        context.lineWidth = 0.5 * scaleFactor
        context.stroke()

        // Draw land outlines — muted gold
        context.beginPath()
        landFeatures.features.forEach((feature: ExtendedFeature) => {
          path(feature as GeoPermissibleObjects)
        })
        context.strokeStyle = "rgba(91, 158, 166, 0.25)"
        context.lineWidth = 0.8 * scaleFactor
        context.stroke()

        // Draw halftone dots — warm muted tone
        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat])
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight
          ) {
            context.beginPath()
            context.arc(
              projected[0],
              projected[1],
              1.0 * scaleFactor,
              0,
              2 * Math.PI
            )
            context.fillStyle = "rgba(91, 158, 166, 0.3)"
            context.fill()
          }
        })

        // Draw city markers with leader lines
        const visibleMarkers: { marker: CityMarker; px: number; py: number }[] = []
        markers.forEach((marker) => {
          const projected = projection(marker.coords)
          if (!projected) return
          const dist = geoDistance(
            marker.coords,
            projection.invert!([containerWidth / 2, containerHeight / 2]) as [number, number]
          )
          if (dist > Math.PI / 2) return
          visibleMarkers.push({ marker, px: projected[0], py: projected[1] })
        })

        // Assign staggered leader line offsets
        visibleMarkers.sort((a, b) => a.py - b.py)
        const labelPositions: { lx: number; ly: number }[] = []
        const lineLen = 30 * scaleFactor
        const labelH = 16 * scaleFactor

        visibleMarkers.forEach((vm, i) => {
          const angle = i % 2 === 0 ? -Math.PI / 4 : -Math.PI / 3
          let lx = vm.px + Math.cos(angle) * lineLen
          let ly = vm.py + Math.sin(angle) * lineLen

          for (const prev of labelPositions) {
            const dy = Math.abs(ly - prev.ly)
            const dx = Math.abs(lx - prev.lx)
            if (dy < labelH && dx < 60 * scaleFactor) {
              ly -= (labelH - dy + 4 * scaleFactor)
              lx += 15 * scaleFactor
            }
          }
          labelPositions.push({ lx, ly })
        })

        // Draw dots, leader lines, and labels
        visibleMarkers.forEach((vm, i) => {
          const { px, py, marker } = vm
          const { lx, ly } = labelPositions[i]

          // Outer glow
          context.beginPath()
          context.arc(px, py, 8 * scaleFactor, 0, 2 * Math.PI)
          context.fillStyle = "rgba(91, 158, 166, 0.15)"
          context.fill()

          // Inner glow
          context.beginPath()
          context.arc(px, py, 5 * scaleFactor, 0, 2 * Math.PI)
          context.fillStyle = "rgba(91, 158, 166, 0.3)"
          context.fill()

          // Core dot
          context.beginPath()
          context.arc(px, py, 3 * scaleFactor, 0, 2 * Math.PI)
          context.fillStyle = "#5B9EA6"
          context.fill()

          // Leader line
          context.beginPath()
          context.moveTo(px, py)
          context.lineTo(lx, ly)
          context.strokeStyle = "rgba(91, 158, 166, 0.4)"
          context.lineWidth = 1 * scaleFactor
          context.stroke()

          // Small tick
          context.beginPath()
          context.arc(lx, ly, 1.5 * scaleFactor, 0, 2 * Math.PI)
          context.fillStyle = "rgba(91, 158, 166, 0.5)"
          context.fill()

          // City label
          context.font = `${11 * scaleFactor}px "Montserrat", sans-serif`
          context.fillStyle = "#F5F3EF"
          context.textAlign = "left"
          context.fillText(marker.name, lx + 6 * scaleFactor, ly + 4 * scaleFactor)

          if (marker.subtitle) {
            context.font = `${9 * scaleFactor}px "Montserrat", sans-serif`
            context.fillStyle = "rgba(201, 168, 76, 0.6)"
            context.fillText(
              marker.subtitle,
              lx + 6 * scaleFactor,
              ly + 16 * scaleFactor
            )
          }
        })
      }
    }

    const loadWorldData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json"
        )
        if (!response.ok) throw new Error("Failed to load land data")
        landFeatures = await response.json()

        // Generate dots for all land features
        landFeatures.features.forEach((feature: ExtendedFeature) => {
          const dots = generateDotsInPolygon(feature, 16)
          dots.forEach(([lng, lat]) => {
            allDots.push({ lng, lat })
          })
        })

        render()
        setIsLoading(false)
      } catch {
        setError("Failed to load land map data")
        setIsLoading(false)
      }
    }

    // Set up rotation and interaction
    const rotation: [number, number] = [0, 0]
    let autoRotate = true
    const rotationSpeed = 0.095

    const rotate = () => {
      // Skip when off-screen
      if (!isVisibleRef.current) return
      if (autoRotate) {
        rotation[0] += rotationSpeed
        projection.rotate(rotation)
        render()
      }
    }

    const rotationTimer = d3Timer(rotate)

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false
      const startX = event.clientX
      const startY = event.clientY
      const startRotation: [number, number] = [...rotation]

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.5
        const dx = moveEvent.clientX - startX
        const dy = moveEvent.clientY - startY

        rotation[0] = startRotation[0] + dx * sensitivity
        rotation[1] = startRotation[1] - dy * sensitivity
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]))

        projection.rotate(rotation)
        render()
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        setTimeout(() => {
          autoRotate = true
        }, 2000)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    canvas.addEventListener("mousedown", handleMouseDown)

    loadWorldData()

    return () => {
      observer.disconnect()
      rotationTimer.stop()
      canvas.removeEventListener("mousedown", handleMouseDown)
    }
  }, [width, height, markers])

  if (error) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl bg-dark-surface p-8 ${className}`}
      >
        <div className="text-center">
          <p className="text-red-400 font-semibold mb-2">
            Error loading Earth visualization
          </p>
          <p className="text-muted text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-auto"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  )
}
