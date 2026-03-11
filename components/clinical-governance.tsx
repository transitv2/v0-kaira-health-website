"use client"

import { InView } from "@/components/ui/in-view"
import { Shield } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
}

export function ClinicalGovernance() {
  return (
    <section className="relative w-full bg-[#0A1628] py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <InView
          variants={fadeUp}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewOptions={{ once: true, margin: "-80px", amount: 0.3 }}
        >
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-teal/10">
            <Shield className="h-6 w-6 text-teal/70" strokeWidth={1.5} />
          </div>
        </InView>

        <InView
          variants={fadeUp}
          transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
          viewOptions={{ once: true, margin: "-80px", amount: 0.3 }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-gold mb-5">
            Clinical Governance
          </p>
        </InView>

        <InView
          variants={fadeUp}
          transition={{ duration: 0.45, delay: 0.16, ease: "easeOut" }}
          viewOptions={{ once: true, margin: "-80px", amount: 0.3 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl text-cream leading-tight">
            Physician-Led. Evidence-Based.
          </h2>
        </InView>

        <InView
          variants={fadeUp}
          transition={{ duration: 0.45, delay: 0.24, ease: "easeOut" }}
          viewOptions={{ once: true, margin: "-80px", amount: 0.3 }}
          className="mt-8"
        >
          <p className="text-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            KAIRA&apos;s preventive health programs are developed and overseen
            by physician leadership with experience in clinical care, medical
            governance, and health system innovation. Clinical protocols are
            reviewed to ensure that diagnostic testing, risk evaluation, and
            care recommendations align with responsible medical practice.
          </p>
        </InView>

        <InView
          variants={fadeUp}
          transition={{ duration: 0.45, delay: 0.32, ease: "easeOut" }}
          viewOptions={{ once: true, margin: "-80px", amount: 0.3 }}
          className="mt-6"
        >
          <p className="text-muted/60 text-sm leading-relaxed max-w-2xl mx-auto">
            Programs delivered through partner clinics are provided by licensed
            clinicians practicing within their respective jurisdictions.
          </p>
        </InView>
      </div>
    </section>
  )
}
