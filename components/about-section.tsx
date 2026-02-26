"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import Image from "next/image"

const timeline = [
  {
    year: "Founded",
    title: "From RegenaLife to Kaira Health",
    description:
      "Building on years of experience in functional medicine, our team rebranded with a sharper vision — to bring AI-enabled longevity medicine to local markets worldwide.",
  },
  {
    year: "Technology",
    title: "Global Diagnostic Partnerships",
    description:
      "Aligned with cross-border US partners to make breakthrough screening technologies available in local markets across the world for the first time.",
  },
  {
    year: "Vision",
    title: "Democratizing Longevity Medicine",
    description:
      "Our mission is to make proactive, preventative healthcare accessible — not just for the privileged few, but for everyone who wants to take control of their health.",
  },
]

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section ref={ref} id="about" className="relative py-24 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <span
              className={cn(
                "text-sm font-medium uppercase tracking-widest text-accent",
                isVisible ? "animate-fade-up" : "opacity-0"
              )}
            >
              About Us
            </span>
            <h2
              className={cn(
                "mt-4 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance",
                isVisible ? "animate-fade-up delay-100" : "opacity-0"
              )}
            >
              Pioneering the Future of Proactive Medicine
            </h2>
            <p
              className={cn(
                "mt-6 text-lg leading-relaxed text-muted-foreground text-pretty",
                isVisible ? "animate-fade-up delay-200" : "opacity-0"
              )}
            >
              Kaira Health is designed to work in harmony with both private
              supplemental primary care and public healthcare systems. Our goal is
              to complement your existing care with the most advanced preventative
              medicine available today.
            </p>

            {/* Timeline */}
            <div className="mt-10 space-y-8">
              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  className={cn(
                    "relative flex gap-6",
                    isVisible ? "animate-fade-up" : "opacity-0"
                  )}
                  style={{ animationDelay: `${300 + i * 120}ms` }}
                >
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-bold font-mono shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="mt-2 h-full w-px bg-border" />
                    )}
                  </div>
                  <div className="pb-8">
                    <span className="text-xs font-medium uppercase tracking-widest text-accent">
                      {item.year}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-foreground font-serif">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div
            className={cn(
              "order-1 lg:order-2 relative",
              isVisible ? "animate-scale-in delay-200" : "opacity-0"
            )}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/doctor-consultation.jpg"
                alt="Compassionate doctor-patient consultation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
