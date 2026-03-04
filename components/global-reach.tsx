"use client"

import RotatingEarth from "@/components/ui/rotating-earth"
import { InView } from "@/components/ui/in-view"

export function GlobalReach() {
  return (
    <section
      id="global-reach"
      className="relative min-h-screen w-full bg-[#080E1A] py-24 lg:py-32 overflow-hidden"
    >
      {/* Background effects at z-0 — subtle blue nebula */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-[#1E3A5F]/[0.08] blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-gold/[0.03] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column: text content */}
          <div>
            <InView
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewOptions={{ once: true, margin: "-80px", amount: 0.2 }}
            >
              <p className="text-gold/50 uppercase tracking-[0.2em] text-[11px] font-sans">
                Global Reach
              </p>
            </InView>

            <InView
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              viewOptions={{ once: true, margin: "-80px", amount: 0.2 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream mt-5 leading-[1.1]">
                Consistent Care.{" "}
                <span className="text-gold">Global Reach.</span>
              </h2>
            </InView>

            <InView
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              viewOptions={{ once: true, margin: "-80px", amount: 0.2 }}
            >
              <p className="text-muted text-base leading-relaxed mt-6 max-w-lg">
                Access to thorough preventive care has not always been
                convenient. KAIRA was designed to bring structured, physician-led
                health intelligence to clients wherever they are.
              </p>
            </InView>

            <InView
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              viewOptions={{ once: true, margin: "-80px", amount: 0.2 }}
            >
              <p className="text-muted text-base leading-relaxed mt-4 max-w-lg">
                We deliver the same depth of diagnostic assessment and
                physician-led care whether you&apos;re in Toronto, New York,
                Miami, Chicago, or Bahrain — with multilingual support, culturally
                informed care, and a concierge model designed around how you
                actually live.
              </p>
            </InView>

            {/* Closing line */}
            <InView
              transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
              viewOptions={{ once: true, margin: "-60px", amount: 0.2 }}
            >
              <p className="text-cream/60 italic font-serif text-lg mt-10">
                Structured preventive care, designed to travel with you.
              </p>
            </InView>
          </div>

          {/* Right column: interactive d3 globe */}
          <InView
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewOptions={{ once: true, margin: "-60px", amount: 0.1 }}
            className="flex items-center justify-center"
          >
            <RotatingEarth
              className="w-full max-w-[520px]"
              width={520}
              height={520}
            />
          </InView>
        </div>
      </div>
    </section>
  )
}
