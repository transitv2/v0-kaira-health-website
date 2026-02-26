interface KairaLogoProps {
  className?: string
  size?: number
  showText?: boolean
  textClassName?: string
}

export function KairaLogo({
  className = "",
  size = 36,
  showText = true,
  textClassName = "",
}: KairaLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Kaira Health logo"
      >
        {/* Outer ring — life cycle */}
        <circle
          cx="32"
          cy="32"
          r="30"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-accent/40"
        />

        {/* Inner teal radiance ring */}
        <circle
          cx="32"
          cy="32"
          r="24"
          stroke="currentColor"
          strokeWidth="2"
          className="text-accent"
          strokeDasharray="6 4"
        />

        {/* Stylised K — two strokes forming a forward-leaning K */}
        {/* Vertical stem */}
        <path
          d="M24 18 L24 46"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-foreground"
        />
        {/* Upper diagonal */}
        <path
          d="M24 32 L38 18"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-foreground"
        />
        {/* Lower diagonal */}
        <path
          d="M28 34 L40 46"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-accent"
        />

        {/* Pulse / heartbeat accent — small arc top right */}
        <path
          d="M40 20 Q44 16, 48 22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-accent"
          fill="none"
        />

        {/* Small radiant dot */}
        <circle cx="48" cy="22" r="2" className="fill-accent" />
      </svg>

      {showText && (
        <span className={`font-serif font-bold tracking-tight leading-none ${textClassName}`}>
          <span className="text-foreground">Kaira</span>
          <span className="text-accent">Health</span>
        </span>
      )}
    </span>
  )
}
