"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export function GlobalReach() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>(0.15)

  return (
    <section ref={ref} id="global" className="relative py-28 lg:py-40 overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] bg-gold/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8 text-center">
        <div
          className={cn(
            "transition-all duration-1000",
            isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-[13px] uppercase tracking-[0.3em] text-gold/40 mb-6">
            Global Reach
          </p>
          <h2 className="font-serif text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl text-balance">
            One Standard. No Borders.
          </h2>
        </div>

        <div
          className={cn(
            "mt-10 max-w-3xl mx-auto transition-all duration-1000 delay-200",
            isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-lg leading-relaxed text-cream-dim/50 text-pretty">
            The best preventive medicine has historically lived in a handful of
            cities. If you weren{"'"}t near one of those institutions, you traveled to
            them. KAIRA eliminates that compromise.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-cream-dim/50 text-pretty">
            We deliver the same depth of diagnostic intelligence and physician-led
            care whether you{"'"}re in Toronto, New York, Dubai, or Riyadh. Your
            geography should never determine the quality of your health surveillance.
          </p>
        </div>

        {/* Location markers */}
        <div
          className={cn(
            "mt-16 flex flex-wrap items-center justify-center gap-8 lg:gap-16",
            isVisible ? "animate-fade-up delay-400" : "opacity-0"
          )}
        >
          {["Toronto", "New York", "Dubai", "Riyadh"].map((city, i) => (
            <div key={city} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-700",
                  i === 0 ? "bg-gold" : "bg-gold/30"
                )}
              />
              <span className="text-sm text-cream-dim/40 tracking-wide">
                {city}
              </span>
              {i === 0 && (
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold/40">
                  HQ
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Separator line */}
        <div
          className={cn(
            "mt-16 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-gold/20 to-transparent",
            isVisible ? "animate-fade-in delay-600" : "opacity-0"
          )}
        />

        <p
          className={cn(
            "mt-8 text-sm text-cream-dim/30 italic",
            isVisible ? "animate-fade-in delay-700" : "opacity-0"
          )}
        >
          Multilingual support. Culturally informed care. Built around how you live.
        </p>
      </div>
    </section>
  )
}
