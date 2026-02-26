"use client"

import { cn } from "@/lib/utils"

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
      {/* Abstract aperture mark — light focused through a lens */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="KAIRA Health logo"
      >
        <circle cx="24" cy="24" r="22" stroke="#C9A84C" strokeWidth="1.2" opacity="0.3" />
        <path d="M24 6C24 6 31 14 31 24C31 34 24 42 24 42" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <path d="M24 6C24 6 17 14 17 24C17 34 24 42 24 42" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <path d="M6 24C6 24 14 17 24 17C34 17 42 24 42 24" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <path d="M6 24C6 24 14 31 24 31C34 31 42 24 42 24" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        {/* Diagonal light rays */}
        <path d="M9 9C9 9 16 17 24 24" stroke="#C9A84C" strokeWidth="0.8" strokeLinecap="round" opacity="0.25" />
        <path d="M39 9C39 9 32 17 24 24" stroke="#C9A84C" strokeWidth="0.8" strokeLinecap="round" opacity="0.25" />
        {/* Center focal point */}
        <circle cx="24" cy="24" r="4.5" fill="#C9A84C" opacity="0.85" />
        <circle cx="24" cy="24" r="2" fill="#F5F3EF" />
      </svg>

      {showText && (
        <span className={cn("flex flex-col leading-none", textClassName)}>
          <span className="text-lg font-serif font-bold tracking-[0.2em] text-cream-dim">
            KAIRA
          </span>
          <span className="text-[9px] tracking-[0.35em] text-gold/50 uppercase mt-0.5">
            Health
          </span>
        </span>
      )}
    </span>
  )
}
