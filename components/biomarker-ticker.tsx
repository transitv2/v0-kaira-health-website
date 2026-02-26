"use client"

import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const biomarkers = [
  { name: "ApoB", value: "78", unit: "mg/dL", status: "optimal" },
  { name: "hs-CRP", value: "0.4", unit: "mg/L", status: "optimal" },
  { name: "HbA1c", value: "5.2", unit: "%", status: "optimal" },
  { name: "Vitamin D", value: "62", unit: "ng/mL", status: "optimal" },
  { name: "TSH", value: "1.8", unit: "mIU/L", status: "optimal" },
  { name: "Cortisol", value: "14", unit: "mcg/dL", status: "normal" },
  { name: "Ferritin", value: "85", unit: "ng/mL", status: "optimal" },
  { name: "LDL-P", value: "980", unit: "nmol/L", status: "normal" },
  { name: "Omega-3", value: "8.1", unit: "%", status: "optimal" },
  { name: "Insulin", value: "4.2", unit: "uIU/mL", status: "optimal" },
  { name: "Testosterone", value: "620", unit: "ng/dL", status: "optimal" },
  { name: "Biological Age", value: "-5", unit: "years", status: "optimal" },
]

const statusColors: Record<string, string> = {
  optimal: "bg-accent/80",
  normal: "bg-[oklch(0.7_0.1_150)]",
  warning: "bg-[oklch(0.7_0.15_80)]",
}

function BiomarkerCard({ marker }: { marker: typeof biomarkers[0] }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-4 rounded-xl border border-foreground/[0.06] bg-foreground/[0.02] backdrop-blur-sm px-5 py-3 transition-all duration-300 hover:border-accent/20 hover:bg-foreground/[0.04]">
      <div className={cn("h-2 w-2 rounded-full", statusColors[marker.status])} />
      <div className="flex items-baseline gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">
          {marker.name}
        </span>
        <span className="font-serif text-lg font-bold text-foreground tabular-nums">
          {marker.value}
        </span>
        <span className="text-xs text-muted-foreground/70">{marker.unit}</span>
      </div>
    </div>
  )
}

export function BiomarkerTicker() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section
      ref={ref}
      className="py-8 overflow-hidden border-y border-foreground/[0.04] bg-background/50"
    >
      <div
        className={cn(
          "flex gap-4 animate-marquee",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{ width: "max-content" }}
      >
        {/* Double the items for seamless loop */}
        {[...biomarkers, ...biomarkers].map((marker, i) => (
          <BiomarkerCard key={`${marker.name}-${i}`} marker={marker} />
        ))}
      </div>
    </section>
  )
}
