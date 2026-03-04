"use client"

import { useRef } from "react"
import {
  motion,
  useInView,
  type Variant,
} from "framer-motion"

interface InViewProps {
  children: React.ReactNode
  variants?: {
    hidden: Variant
    visible: Variant
  }
  transition?: {
    duration?: number
    delay?: number
    ease?: string | number[]
  }
  viewOptions?: {
    once?: boolean
    margin?: string
    amount?: "some" | "all" | number
  }
  className?: string
  as?: "div" | "span" | "section" | "article"
}

const defaultVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
}

export function InView({
  children,
  variants = defaultVariants,
  transition = { duration: 0.5, ease: "easeOut" },
  viewOptions = { once: true, margin: "-100px", amount: 0.3 },
  className,
  as = "div",
}: InViewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: viewOptions.once,
    margin: viewOptions.margin as `${number}px`,
    amount: viewOptions.amount,
  })

  const Component = motion.create(as)

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </Component>
  )
}
