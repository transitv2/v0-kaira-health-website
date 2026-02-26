"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "The comprehensive screening identified a condition I had no idea about. Early intervention made all the difference. I feel empowered knowing exactly where my health stands.",
    name: "Michael R.",
    title: "Executive, Technology Sector",
    initials: "MR",
  },
  {
    quote:
      "This isn't just another health check — it's a complete paradigm shift. The AI-enhanced diagnostics and personalized plan gave me confidence in my health for the first time.",
    name: "Sarah K.",
    title: "CEO, Financial Services",
    initials: "SK",
  },
  {
    quote:
      "As a physician myself, I was impressed by the depth and precision of the screening. The technology Kaira uses is genuinely the future of preventative medicine.",
    name: "Dr. James L.",
    title: "Cardiologist",
    initials: "JL",
  },
]

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section ref={ref} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span
            className={cn(
              "text-sm font-medium uppercase tracking-widest text-accent",
              isVisible ? "animate-fade-up" : "opacity-0"
            )}
          >
            Success Stories
          </span>
          <h2
            className={cn(
              "mt-4 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance",
              isVisible ? "animate-fade-up delay-100" : "opacity-0"
            )}
          >
            What Being in Control of Your Health Looks Like
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.name}
              className={cn(
                "group relative rounded-2xl border border-foreground/[0.08] bg-foreground/[0.03] backdrop-blur-sm p-8 transition-all duration-500 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10 hover:bg-foreground/[0.05]",
                isVisible ? "animate-fade-up" : "opacity-0"
              )}
              style={{ animationDelay: `${200 + i * 100}ms` }}
            >
              <Quote className="h-8 w-8 text-accent/30 mb-4" />
              <p className="text-sm leading-relaxed text-muted-foreground italic">
                {`"${testimonial.quote}"`}
              </p>
              <div className="mt-6 flex items-center gap-3 pt-6 border-t border-foreground/[0.06]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent text-sm font-bold font-serif">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
