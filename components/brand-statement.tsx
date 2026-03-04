"use client"

import { InView } from "@/components/ui/in-view"

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const slideFromLeft = {
  hidden: { opacity: 0, x: -40, filter: "blur(6px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)" },
}

const slideFromRight = {
  hidden: { opacity: 0, x: 40, filter: "blur(6px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)" },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
}

/* ------------------------------------------------------------------ */
/*  Brand Statement Section                                            */
/* ------------------------------------------------------------------ */

export function BrandStatement() {
  return (
    <section className="relative min-h-screen w-full bg-light py-24 lg:py-32">
      {/* Gradient fade from dark hero above */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, #0A1628 0%, #0A1628 10%, #F8F6F2 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* ── Two-column editorial layout ── */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_3fr] md:gap-0">
          {/* ── Left column: Etymology ── */}
          <div className="md:border-r md:border-gold/20 md:pr-12">
            <InView
              variants={slideFromLeft}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              viewOptions={{ once: true, margin: "-80px", amount: 0.3 }}
            >
              <p className="text-base leading-relaxed text-[#4A4A5A]">
                In Arabic,{" "}
                <em className="font-medium not-italic text-gold">KAIRA</em>{" "}
                means{" "}
                <em className="font-medium not-italic text-[#1A1A2E]">
                  goodness
                </em>{" "}
                — the best of what is possible.
              </p>
            </InView>

            <InView
              variants={slideFromLeft}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewOptions={{ once: true, margin: "-80px", amount: 0.3 }}
              className="mt-5"
            >
              <p className="text-base leading-relaxed text-[#4A4A5A]">
                In Sanskrit, it means{" "}
                <em className="font-medium not-italic text-[#1A1A2E]">
                  action — the decisive step
                </em>
                .
              </p>
            </InView>

            <InView
              variants={slideFromLeft}
              transition={{
                duration: 0.9,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewOptions={{ once: true, margin: "-80px", amount: 0.3 }}
              className="mt-5"
            >
              <p className="text-base leading-relaxed text-[#4A4A5A]">
                In Greek, it echoes{" "}
                <em className="font-medium not-italic text-[#1A1A2E]">
                  kairos
                </em>{" "}
                — the favourable moment, timely intervention.
              </p>
            </InView>
          </div>

          {/* ── Right column: Our Conviction ── */}
          <div className="md:pl-12">
            <InView
              variants={slideFromRight}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              viewOptions={{ once: true, margin: "-80px", amount: 0.3 }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-gold">
                Our Conviction
              </p>
            </InView>

            <InView
              variants={slideFromRight}
              transition={{
                duration: 0.9,
                delay: 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewOptions={{ once: true, margin: "-80px", amount: 0.3 }}
              className="mt-6"
            >
              <h2 className="font-serif text-3xl leading-tight text-[#1A1A2E] text-balance md:text-4xl">
                The most important medical insight is the one identified{" "}
                <strong className="text-gold">
                  before illness takes hold.
                </strong>
              </h2>
            </InView>

            <InView
              variants={slideFromRight}
              transition={{
                duration: 0.9,
                delay: 0.24,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewOptions={{ once: true, margin: "-80px", amount: 0.3 }}
              className="mt-8"
            >
              <p className="text-base leading-relaxed text-[#4A4A5A]">
                Healthcare often focuses on symptoms. KAIRA focuses on earlier
                understanding. We integrate advanced laboratory testing, imaging,
                genomic analysis, and AI-supported pattern recognition into a
                unified view of your health — interpreted by physicians who
                prioritise depth, data, and continuity of care.
              </p>
            </InView>

            <InView
              variants={slideFromRight}
              transition={{
                duration: 0.9,
                delay: 0.36,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewOptions={{ once: true, margin: "-80px", amount: 0.3 }}
              className="mt-6"
            >
              <p className="text-base leading-relaxed text-[#4A4A5A]">
                This goes beyond routine screening. It brings together a broad
                range of biomarkers, analysed over time, to provide a more
                comprehensive understanding of your health trajectory — supported
                by a concierge medical team committed to personalised care.
              </p>
            </InView>
          </div>
        </div>

        {/* ── Full-width accent line ── */}
        <InView
          variants={fadeUp}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          viewOptions={{ once: true, margin: "-60px", amount: 0.5 }}
          className="mt-20 flex justify-center"
        >
          <div className="h-px w-24 bg-gold/40" />
        </InView>
      </div>
    </section>
  )
}
