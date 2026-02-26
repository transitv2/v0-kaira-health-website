"use client"

interface KairaLogoProps {
  className?: string
  size?: number
  showText?: boolean
  textClassName?: string
  variant?: "default" | "light"
}

export function KairaLogo({
  className = "",
  size = 36,
  showText = true,
  textClassName = "",
  variant = "default",
}: KairaLogoProps) {
  const fgColor = variant === "light" ? "#ffffff" : "currentColor"

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Kaira Health logo"
      >
        {/* Abstract mark: stylised leaf / pulse / helix intersection */}
        {/* Outer soft glow circle */}
        <circle cx="40" cy="40" r="38" className="stroke-accent/20" strokeWidth="1" />

        {/* Main mark — two curved strokes forming a K-like helix shape */}
        {/* Left rising arc — represents upward health trajectory */}
        <path
          d="M22 58 C22 38, 32 22, 40 16"
          stroke="url(#kaira-grad-1)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right branching arc — discovery / expansion */}
        <path
          d="M36 40 C42 34, 52 26, 60 22"
          stroke="url(#kaira-grad-2)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Lower branch — prevention / foundation */}
        <path
          d="M36 40 C42 46, 50 54, 58 60"
          stroke="url(#kaira-grad-1)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Radiant node at intersection — symbolising diagnostic insight */}
        <circle cx="36" cy="40" r="4" className="fill-accent" />
        <circle cx="36" cy="40" r="8" className="fill-accent/15" />

        {/* Small pulse nodes at endpoints */}
        <circle cx="40" cy="16" r="2.5" className="fill-foreground/70" />
        <circle cx="60" cy="22" r="2" className="fill-accent/60" />
        <circle cx="58" cy="60" r="2" className="fill-accent/60" />

        {/* Gradients */}
        <defs>
          <linearGradient id="kaira-grad-1" x1="22" y1="58" x2="40" y2="16" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="oklch(0.68 0.14 190)" />
            <stop offset="100%" stopColor="oklch(0.82 0.10 190)" />
          </linearGradient>
          <linearGradient id="kaira-grad-2" x1="36" y1="40" x2="60" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="oklch(0.68 0.14 190)" />
            <stop offset="100%" stopColor="oklch(0.55 0.12 260)" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <span className={`font-serif font-bold tracking-tight leading-none ${textClassName}`}>
          <span className="text-foreground">Kaira</span>
          <span className="text-accent ml-1.5">Health</span>
        </span>
      )}
    </span>
  )
}
