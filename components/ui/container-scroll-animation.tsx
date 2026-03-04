"use client"

import { useRef, useState, useEffect, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ContainerScrollProps {
  titleComponent: ReactNode
  children: ReactNode
  className?: string
}

export function ContainerScroll({
  titleComponent,
  children,
  className,
}: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // On mobile: no 3D transform, just fade in
  const scaleDimensions = useTransform(
    scrollYProgress,
    [0.1, 0.5],
    isMobile ? [1, 1] : [0.9, 1]
  )
  const rotate = useTransform(
    scrollYProgress,
    [0.1, 0.5],
    isMobile ? [0, 0] : [20, 0]
  )
  const translateY = useTransform(
    scrollYProgress,
    [0.1, 0.5],
    isMobile ? [40, 0] : [100, 0]
  )
  const opacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1])

  return (
    <div
      ref={containerRef}
      className={className}
      style={isMobile ? undefined : { perspective: "1200px" }}
    >
      <div className="relative mx-auto max-w-5xl w-full">
        <motion.div style={{ opacity, translateY }}>
          {titleComponent}
        </motion.div>
        <motion.div
          style={{
            rotateX: rotate,
            scale: scaleDimensions,
          }}
          className="mx-auto w-full origin-top"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
