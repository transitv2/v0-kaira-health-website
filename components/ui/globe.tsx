"use client"

import { useEffect, useRef, useCallback } from "react"
import createGlobe from "cobe"

interface GlobeProps {
  className?: string
  markers?: Array<{
    location: [number, number]
    size: number
  }>
  dark?: number
  diffuse?: number
  mapSamples?: number
  mapBrightness?: number
  baseColor?: [number, number, number]
  markerColor?: [number, number, number]
  glowColor?: [number, number, number]
}

export function Globe({
  className,
  markers = [],
  dark = 1,
  diffuse = 1.2,
  mapSamples = 16000,
  mapBrightness = 1.2,
  baseColor = [0.3, 0.3, 0.3],
  markerColor = [0.79, 0.66, 0.30],
  glowColor = [0.15, 0.15, 0.15],
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  const globeRef = useRef<ReturnType<typeof createGlobe>>()
  const isVisibleRef = useRef(false)

  const onResize = useCallback(() => {
    if (canvasRef.current) {
      widthRef.current = canvasRef.current.offsetWidth
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      phi: 0,
      theta: 0.25,
      dark,
      diffuse,
      mapSamples,
      mapBrightness,
      baseColor,
      markerColor,
      glowColor,
      markers,
      onRender: (state) => {
        if (!isVisibleRef.current) return

        if (!pointerInteracting.current) {
          phiRef.current += 0.003
        }
        state.phi = phiRef.current + pointerInteractionMovement.current
        state.width = widthRef.current * 2
        state.height = widthRef.current * 2
      },
    })

    globeRef.current = globe

    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
      observer.disconnect()
    }
  }, [dark, diffuse, mapSamples, mapBrightness, baseColor, markerColor, glowColor, markers, onResize])

  return (
    <div className={className} style={{ aspectRatio: "1" }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
        }}
        onPointerUp={() => {
          pointerInteracting.current = null
          if (canvasRef.current) canvasRef.current.style.cursor = "grab"
        }}
        onPointerOut={() => {
          pointerInteracting.current = null
          if (canvasRef.current) canvasRef.current.style.cursor = "grab"
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta
          }
        }}
      />
    </div>
  )
}
