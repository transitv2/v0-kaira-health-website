"use client"

import { CountAnimation } from "@/components/ui/count-animation"
import { InfiniteSlider } from "@/components/ui/infinite-slider"
import { InView } from "@/components/ui/in-view"

const stats: {
  target: number
  suffix?: string
  label: string
}[] = [
  { target: 200, suffix: "+", label: "Biomarkers analysed per client" },
  { target: 6, label: "Diagnostic categories integrated" },
  { target: 2, label: "Markets served: North America & Middle East (2027)" },
  { target: 60, suffix: "+", label: "Minutes per consultation" },
]

const trustSignals: string[] = [
  "Currently operating and serving patients",
  "Founded by practicing physicians",
  "Accredited laboratory and imaging network",
  "PIPEDA/PHIPA and HIPAA-compliant, enterprise-grade security",
]

export function StatsSection() {
  return (
    <section
      id="credibility"
      className="relative min-h-screen w-full bg-[#0D1525] py-24 lg:py-32"
    >
      {/* Gradient fade from light section above */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-28"
        style={{
          background: "linear-gradient(to bottom, var(--color-light) 0%, #0D1525 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* ---- Header ---- */}
        <div className="mb-16 md:mb-20">
          <InView
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewOptions={{ once: true, margin: "-80px", amount: 0.3 }}
          >
            <p className="text-gold uppercase tracking-[0.25em] text-xs font-sans mb-5">
              Built on Evidence
            </p>
          </InView>

          <InView
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            viewOptions={{ once: true, margin: "-80px", amount: 0.3 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight">
              Designed for Depth
            </h2>
          </InView>

          <InView
            transition={{ duration: 0.45, delay: 0.16, ease: "easeOut" }}
            viewOptions={{ once: true, margin: "-80px", amount: 0.3 }}
          >
            <p className="mt-6 text-muted text-base md:text-lg leading-relaxed max-w-2xl font-sans">
              KAIRA Health was founded by physicians and technologists who
              recognised an opportunity: to bring together advanced diagnostics,
              longitudinal data analysis, and physician-led care into one
              integrated model &mdash; structured for depth, continuity, and
              earlier understanding.
            </p>
          </InView>
        </div>

        {/* ---- Stats 2x2 grid ---- */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <InView
              key={stat.label}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
                ease: "easeOut",
              }}
              viewOptions={{ once: true, margin: "-60px", amount: 0.2 }}
            >
              <div className="rounded-xl border border-white/[0.06] bg-dark-surface p-6 md:p-8">
                <CountAnimation
                  target={stat.target}
                  suffix={stat.suffix}
                  duration={2000}
                  className="font-serif text-6xl md:text-8xl text-gold block"
                />
                <p className="mt-3 text-muted text-sm font-sans">
                  {stat.label}
                </p>
              </div>
            </InView>
          ))}
        </div>

        {/* ---- Trust signals marquee ---- */}
        <div className="mt-14 md:mt-20">
          <InView
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            viewOptions={{ once: true, margin: "-40px", amount: 0.3 }}
          >
            <InfiniteSlider speed={35} direction="left" gap={24}>
              {trustSignals.map((signal) => (
                <div
                  key={signal}
                  className="flex items-center gap-2 rounded-full border border-gold/20 bg-gold/[0.04] px-4 py-2 shrink-0"
                >
                  {/* Gold checkmark icon */}
                  <svg
                    className="h-3.5 w-3.5 shrink-0 text-gold"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M13.5 4.5L6.5 11.5L3 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-cream/80 text-xs font-sans whitespace-nowrap">
                    {signal}
                  </span>
                </div>
              ))}
            </InfiniteSlider>
          </InView>
        </div>
      </div>
    </section>
  )
}
