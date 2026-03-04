"use client"

import { Activity, Brain, Stethoscope } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { InView } from "@/components/ui/in-view"

/* ------------------------------------------------------------------ */
/*  Animation variants (snappy: 300-500ms)                             */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Pillar {
  icon: LucideIcon
  value: string
  title: string
  description: string
  accent: string
}

const pillars: Pillar[] = [
  {
    icon: Activity,
    value: "diagnostics",
    title: "Advanced Diagnostics Aggregation",
    description:
      "We draw from a network of accredited laboratories and imaging centres \u2014 not a single vendor, but a curated selection. Over 200 biomarkers across metabolic, hormonal, cardiovascular, inflammatory, immune, and genomic panels. Advanced imaging when clinically indicated. Screening protocols structured to complement standard care.",
    accent: "Depth and rigour, built into every assessment.",
  },
  {
    icon: Brain,
    value: "analysis",
    title: "AI-Supported Pattern Analysis",
    description:
      "KAIRA\u2019s analytics platform assists in identifying patterns, correlations, and longitudinal trends across large volumes of data. By establishing an individual baseline and monitoring change over time, it supports earlier recognition of meaningful shifts. All findings are reviewed and interpreted by physicians within the context of your complete clinical picture.",
    accent:
      "Your data \u2014 analysed with the depth and structure it deserves.",
  },
  {
    icon: Stethoscope,
    value: "care",
    title: "Physician-Led Personalised Care",
    description:
      "Each KAIRA client is paired with a dedicated physician who reviews results in detail, explains findings clearly, and develops an individualised care plan. Consultations are structured to allow time for thorough discussion and continuity of care, with coordination across specialists when appropriate.",
    accent:
      "Personalised medicine requires time, context, and clinical judgment.",
  },
]

/* ------------------------------------------------------------------ */
/*  Science Section                                                    */
/* ------------------------------------------------------------------ */

export function ScienceSection() {
  return (
    <section
      id="science"
      className="relative w-full bg-dark py-24 lg:py-32"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* ── Section header ── */}
        <div className="max-w-3xl">
          <InView
            variants={fadeUp}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewOptions={{ once: true, margin: "-80px", amount: 0.3 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-gold">
              The Science
            </p>
          </InView>

          <InView
            variants={fadeUp}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            viewOptions={{ once: true, margin: "-80px", amount: 0.3 }}
            className="mt-6"
          >
            <h2 className="font-serif text-3xl leading-tight text-cream text-balance md:text-4xl lg:text-5xl">
              A Comprehensive Approach to Health Intelligence
            </h2>
          </InView>

          <InView
            variants={fadeUp}
            transition={{ duration: 0.45, delay: 0.16, ease: "easeOut" }}
            viewOptions={{ once: true, margin: "-80px", amount: 0.3 }}
            className="mt-6"
          >
            <p className="text-base leading-relaxed text-muted">
              Many systems focus on individual tests. KAIRA integrates data. We
              move beyond isolated lab results or single imaging studies by
              bringing together advanced diagnostics into a unified, longitudinal
              view of your health. By combining laboratory testing, imaging,
              genomics, and AI-supported analysis, we aim to provide a
              higher-resolution understanding of risk — interpreted by physicians
              within the context of your full clinical picture.
            </p>
          </InView>
        </div>

        {/* ── Accordion pillars ── */}
        <InView
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          viewOptions={{ once: true, margin: "-60px", amount: 0.15 }}
          className="mt-16 md:mt-24"
        >
          <Accordion
            type="single"
            collapsible
            defaultValue="diagnostics"
            className="space-y-3"
          >
            {pillars.map(({ icon: Icon, value, title, description, accent }) => (
              <AccordionItem
                key={value}
                value={value}
                className="group border border-[#2A2A2A] rounded-xl overflow-hidden transition-all duration-300 data-[state=open]:border-gold/30 data-[state=open]:shadow-[0_0_30px_-8px_rgba(201,168,76,0.12)]"
              >
                <AccordionTrigger className="flex items-center justify-between w-full px-6 py-5 md:px-8 md:py-6 bg-dark-surface hover:no-underline transition-colors data-[state=open]:bg-dark-surface">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 transition-colors duration-300 group-data-[state=open]:bg-gold/20">
                      <Icon
                        className="h-5 w-5 text-gold/60 transition-colors duration-300 group-data-[state=open]:text-gold"
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="font-serif text-lg md:text-xl font-semibold text-cream/70 text-left transition-colors duration-300 group-data-[state=open]:text-cream">
                      {title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 md:px-8 border-t border-[#2A2A2A]">
                  <div className="pt-5 pb-2 pl-14">
                    <p className="text-sm leading-relaxed text-muted">
                      {description}
                    </p>
                    <p className="mt-5 text-xs italic text-gold/70">
                      {accent}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </InView>
      </div>
    </section>
  )
}
