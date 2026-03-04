"use client"

import { Search, Brain, ClipboardCheck, Activity } from "lucide-react"
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline"
import { InView } from "@/components/ui/in-view"

const timelineData = [
  {
    id: 1,
    title: "Comprehensive Assessment",
    date: "Step 01",
    content:
      "Your journey begins with an in-depth consultation and an expanded diagnostic panel \u2014 which may include blood, hormonal, metabolic, inflammatory, and genomic markers, along with advanced imaging when clinically appropriate. Each assessment is structured around your individual risk profile and health goals.",
    category: "Assessment",
    icon: Search,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "AI-Supported Analysis",
    date: "Step 02",
    content:
      "Your results are integrated into KAIRA\u2019s analytics platform, where AI-enabled tools assist in identifying patterns, correlations, and longitudinal trends across multiple data sources. By examining data collectively rather than in isolation, this approach supports a more structured and contextual understanding of your health. All insights are reviewed and interpreted by physicians.",
    category: "Analysis",
    icon: Brain,
    relatedIds: [1, 3],
    status: "in-progress" as const,
    energy: 75,
  },
  {
    id: 3,
    title: "Physician Review & Personalised Plan",
    date: "Step 03",
    content:
      "Your dedicated KAIRA physician reviews each finding in detail and develops an individualised health plan. This may include nutrition guidance, supplementation strategies, pharmaceutical therapy when indicated, specialist referrals, and defined monitoring targets.",
    category: "Planning",
    icon: ClipboardCheck,
    relatedIds: [2, 4],
    status: "pending" as const,
    energy: 50,
  },
  {
    id: 4,
    title: "Ongoing Monitoring",
    date: "Step 04",
    content:
      "Health evolves over time. KAIRA supports periodic reassessment of biomarkers and clinical indicators to help identify meaningful changes and guide adjustments to your care plan as appropriate. Physician access and follow-up are structured to ensure continuity and clarity.",
    category: "Monitoring",
    icon: Activity,
    relatedIds: [3],
    status: "pending" as const,
    energy: 25,
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative w-full bg-light py-16 lg:py-20"
    >
      {/* Gradient fade from dark science section above */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-24"
        style={{
          background: "linear-gradient(to bottom, var(--color-dark) 0%, var(--color-light) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-6 flex flex-col items-center text-center">
          <InView
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewOptions={{ once: true, margin: "-80px", amount: 0.3 }}
          >
            <p className="text-gold uppercase tracking-[0.25em] text-xs font-sans mb-5">
              How It Works
            </p>
          </InView>
          <InView
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            viewOptions={{ once: true, margin: "-80px", amount: 0.3 }}
          >
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1A1A2E] leading-tight">
              From Complexity to Clarity
            </h2>
          </InView>
          <InView
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            viewOptions={{ once: true, margin: "-80px", amount: 0.3 }}
          >
            <p className="text-[#4A4A5A] text-sm sm:text-base mt-4 max-w-lg">
              Click any node to explore each step of your KAIRA journey
            </p>
          </InView>
        </div>

        <RadialOrbitalTimeline timelineData={timelineData} theme="light" />
      </div>
    </section>
  )
}
