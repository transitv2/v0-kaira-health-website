"use client"

import { cn } from "@/lib/utils"

interface KairaLogoProps {
  size?: number
  className?: string
  showText?: boolean
  textClassName?: string
}

/**
 * Inline SVG logo mark — uses currentColor so it inherits text color
 * from the parent. On dark bg the gold CSS variable gives it a warm gold tone;
 * the transparent background naturally shows whatever is behind it.
 */
function KairaIconMark({ size = 32 }: { size?: number }) {
  // viewBox cropped to actual logo bounds (560w x 300h) so visual center aligns with geometric center
  const aspectRatio = 300 / 560
  return (
    <svg
      viewBox="240 245 560 300"
      width={size}
      height={Math.round(size * aspectRatio)}
      fill="currentColor"
      aria-hidden="true"
    >
      <path transform="translate(502,265)" d="m0 0h28l20 4 8 2v1l-9-1-8-1h-30l-17 3-9 3-17 6-11 6-10 7-10 9-10 10-9 13-9 17-6 21-2 11v28l4 20 6 16 8 15 10 14 13 13v2l4 2 11 8 14 8 14 6 21 6 17 2h17l15-2 19-5 18-8 16-10 14-12 12-13 10-15 8-17 2-6 1 4-5 17-9 19-10 14-12 13-10 10-21 14-18 8-16 5-16 3-8 1h-21l-18-2-22-6-19-8-18-12-11-9-13-13-13-18-9-19-5-15-3-15-1-9v-23l3-19 7-22 12-22 12-14 13-13 11-8 13-8 20-9 25-6z" />
      <path transform="translate(515,392)" d="m0 0 5 5 29 31 9 9 7 8 11 12 16 17 7 8v2h-29l-8-8-7-8-9-10-14-15-9-10-7-7-7-8-10-11 2-4 12-9h2z" />
      <path transform="translate(614,284)" d="m0 0h18l-1 3-8 7-10 9-11 9-9 8h-2v2l-11 9-14 12-11 9-13 11-10 8-13 11-16 13-12 10-14 11-10 9-10 8-16 13-4 2 1-3 8-7 8-8 8-7 17-16 13-12 16-15 8-7 5-4 5-5 17-16 11-9 5-5 12-11 5-5 13-12 15-13 8-8z" />
      <path transform="translate(472,312)" d="m0 0h21l1 26v49l-13 12h-2v2h-2v2l-6 4v-94z" />
      <path transform="translate(492,411)" d="m0 0 2 1v72h-23v-56l14-12z" />
      <path transform="translate(584,363)" d="m0 0 3 1-26 12-16 7-10 5 71 2 24 1v1l-22 1-72 2 38 15 9 4-3 1-50-17-14-6 5-4 14-6 29-11z" />
    </svg>
  )
}

export function KairaLogo({
  size = 32,
  className,
  showText = true,
  textClassName,
}: KairaLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span className="text-gold flex-shrink-0">
        <KairaIconMark size={size} />
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
