"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

interface KairaLogoProps {
  size?: number
  className?: string
  showText?: boolean
  textClassName?: string
}

export function KairaLogo({
  size = 32,
  className,
  showText = true,
  textClassName,
}: KairaLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      {/* Logo mark — crossfade between dark and light versions */}
      <span
        className="relative inline-block flex-shrink-0"
        style={{ width: size, height: size }}
      >
        {/* Dark version (gold K on navy) — visible on dark bg */}
        <Image
          src="/images/brand/kaira-icon-mark.png"
          alt="KAIRA Health logo"
          width={size}
          height={size}
          className="absolute inset-0 object-contain transition-none"
          style={{ opacity: "calc(1 - var(--scroll-brightness, 0))" }}
          priority
        />
        {/* Light version (navy K on cream) — visible on bright bg */}
        <Image
          src="/images/brand/kaira-icon-mark-light.png"
          alt=""
          width={size}
          height={size}
          className="absolute inset-0 object-contain transition-none"
          style={{ opacity: "var(--scroll-brightness, 0)" }}
          priority
          aria-hidden
        />
      </span>

      {showText && (
        <span className={cn("flex flex-col leading-none", textClassName)}>
          <span className="text-lg font-serif font-bold tracking-[0.2em] text-cream-dim">
            KAIRA
          </span>
          <span className="text-[9px] tracking-[0.35em] text-gold-sub uppercase mt-0.5">
            Health
          </span>
        </span>
      )}
    </span>
  )
}
