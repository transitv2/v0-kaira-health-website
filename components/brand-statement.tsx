"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { PixelatedWaveform } from "@/components/pixelated-waveform"

export function BrandStatement() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>(0.2)

  return (
    <section ref={ref} className="relative py-28 lg:py-40 overflow-hidden">
      {/* Pixelated waveform water animation — subtle animated backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: "calc(0.8 * (1 - var(--scroll-brightness, 0) * 0.7))" }}
      >
        <PixelatedWaveform />
      </div>
      {/* Subtle gold glow — first hint of light */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/[0.025] rounded-full blur-[120px] pointer-events-none"
        style={{ opacity: "calc(1 - var(--scroll-brightness, 0) * 0.6)" }}
      />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        {/* Etymology block */}
        <div
          className={cn(
            "transition-all duration-1000",
            isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
          )}
        >
          <blockquote className="border-l-2 border-gold/30 pl-8 lg:pl-12">
            <p className="text-lg leading-relaxed text-prose-strong lg:text-xl">
              In Arabic, <span className="text-gold italic">KAIRA</span> means{" "}
              <em className="text-cream-dim">goodness</em> — the best of what is possible.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-prose-strong lg:text-xl">
              In Sanskrit, it means{" "}
              <em className="text-cream-dim">a ray of light</em>.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-prose-strong lg:text-xl">
              In Greek, it echoes{" "}
              <em className="text-cream-dim">kairos</em> — the right moment.
            </p>
          </blockquote>
        </div>

        {/* Core conviction */}
        <div
          className={cn(
            "mt-16 lg:mt-20 transition-all duration-1000 delay-200",
            isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-[13px] uppercase tracking-[0.3em] text-gold-sub mb-8">
            Our Conviction
          </p>
          <h2 className="font-serif text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-[2.75rem] text-balance">
            The most important medical discovery is the one that happens{" "}
            <span className="text-gold">before you need it.</span>
          </h2>
        </div>

        {/* Expanded copy */}
        <div
          className={cn(
            "mt-12 transition-all duration-1000 delay-400",
            isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"
          )}
        >
          <div className="max-w-3xl space-y-6 text-base leading-relaxed text-prose lg:text-[17px]">
            <p>
              Most healthcare waits for symptoms. By then, the story is already being
              written. KAIRA rewrites the timeline. We combine the world{"'"}s finest
              laboratory testing, advanced imaging, genomic analysis, and AI-enabled
              pattern recognition into a single, unified view of your health — read by
              physicians who have the time, the data, and the mandate to find what
              others miss.
            </p>
            <p>
              This is not annual bloodwork. This is not a single scan. This is the
              aggregation of hundreds of biomarkers, interpreted through technology that
              learns your body{"'"}s language over time — and a concierge medical team
              that treats you as a person, not a patient number.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
