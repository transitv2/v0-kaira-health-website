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
              <em className="text-cream-dim">action — the decisive step</em>.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-prose-strong lg:text-xl">
              In Greek, it echoes{" "}
              <em className="text-cream-dim">kairos</em> — the favourable moment, timely intervention.
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
            The most important medical insight is the one identified{" "}
            <span className="text-gold">before illness takes hold.</span>
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
              Healthcare often focuses on symptoms. KAIRA focuses on earlier understanding.
              We integrate advanced laboratory testing, imaging, genomic analysis, and
              AI-supported pattern recognition into a unified view of your health —
              interpreted by physicians who prioritise depth, data, and continuity of care.
            </p>
            <p>
              This goes beyond routine screening. It brings together a broad range of
              biomarkers, analysed over time, to provide a more comprehensive understanding
              of your health trajectory — supported by a concierge medical team committed
              to personalised care.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
