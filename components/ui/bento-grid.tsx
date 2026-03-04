import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface BentoGridProps {
  children: ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[18rem] grid-cols-1 gap-4 md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  )
}

interface BentoCardProps {
  name: string
  className?: string
  background?: ReactNode
  Icon?: React.ComponentType<{ className?: string }>
  description: string
  href?: string
  cta?: string
  children?: ReactNode
}

export function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  children,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl",
        "bg-dark-surface border border-[#1E3A5F]",
        "transition-all duration-300 hover:border-gold/30",
        className
      )}
    >
      {background && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          {background}
        </div>
      )}
      <div className="relative z-10 flex flex-1 flex-col justify-end p-6">
        {Icon && (
          <Icon className="h-10 w-10 text-gold mb-4 transition-transform duration-300 group-hover:scale-110 origin-left" />
        )}
        <h3 className="font-serif text-xl font-semibold text-cream mb-2">
          {name}
        </h3>
        <p className="text-sm leading-relaxed text-muted max-w-lg">
          {description}
        </p>
        {children}
        {href && cta && (
          <a
            href={href}
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 cursor-pointer"
          >
            {cta}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}
