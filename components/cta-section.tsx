"use client"

import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"
import { InView } from "@/components/ui/in-view"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section
      id="begin"
      className="relative w-full overflow-hidden"
    >
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(8, 15, 30)"
        gradientBackgroundEnd="rgb(11, 18, 33)"
        firstColor="59, 130, 246"
        secondColor="37, 99, 235"
        thirdColor="29, 78, 216"
        fourthColor="96, 165, 250"
        fifthColor="14, 55, 140"
        pointerColor="59, 130, 246"
        size="80%"
        blendingValue="hard-light"
        interactive
        containerClassName="w-full"
        className="relative z-10 flex items-center justify-center px-6 py-24 lg:py-32"
      >
        <div className="mx-auto max-w-3xl text-center">
          <InView
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewOptions={{ once: true, margin: "-80px", amount: 0.2 }}
          >
            <p className="text-gold/50 uppercase tracking-[0.2em] text-[11px] font-sans">
              Begin
            </p>
          </InView>

          <InView
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            viewOptions={{ once: true, margin: "-80px", amount: 0.2 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream mt-5 leading-[1.1]">
              A More Comprehensive Approach to{" "}
              <span className="text-gold">Your Health</span>
            </h2>
          </InView>

          <InView
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            viewOptions={{ once: true, margin: "-80px", amount: 0.2 }}
          >
            <p className="text-cream/70 text-base md:text-lg leading-relaxed mt-8 max-w-2xl mx-auto">
              KAIRA Health offers personalised longevity programs structured
              around your health profile, risk factors, and goals. Our team
              works with you to determine the appropriate level of engagement
              — from expanded annual assessments to concierge care models
              that include structured follow-up and longitudinal monitoring.
            </p>
          </InView>

          <InView
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            viewOptions={{ once: true, margin: "-60px", amount: 0.2 }}
          >
            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="bg-dark text-cream hover:bg-dark-surface cursor-pointer px-8 py-3 text-sm tracking-wide"
              >
                <a href="/consultation">Schedule Your Consultation</a>
              </Button>
            </div>
          </InView>

          <InView
            transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
            viewOptions={{ once: true, margin: "-60px", amount: 0.2 }}
          >
            <p className="text-cream/40 text-xs mt-5">
              Programs are structured around your individual health profile.
            </p>
          </InView>
        </div>
      </BackgroundGradientAnimation>
    </section>
  )
}
