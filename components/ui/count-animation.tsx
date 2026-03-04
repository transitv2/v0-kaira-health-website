"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useInView } from "framer-motion"

interface CountAnimationProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function CountAnimation({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  className,
}: CountAnimationProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const hasAnimated = useRef(false)

  const animate = useCallback(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [target, duration])

  useEffect(() => {
    if (isInView) animate()
  }, [isInView, animate])

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  )
}
