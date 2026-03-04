"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface InfiniteSliderProps {
  children: ReactNode
  speed?: number
  direction?: "left" | "right"
  className?: string
  gap?: number
}

export function InfiniteSlider({
  children,
  speed = 30,
  direction = "left",
  className,
  gap = 48,
}: InfiniteSliderProps) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className="flex w-max animate-marquee"
        style={{
          "--marquee-duration": `${speed}s`,
          gap: `${gap}px`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        } as React.CSSProperties}
      >
        {children}
        {children}
      </div>
    </div>
  )
}
