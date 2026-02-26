"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { KairaLogo } from "@/components/kaira-logo"

const navLinks = [
  { label: "The Science", href: "#science" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Physicians", href: "#physicians" },
  { label: "About", href: "#about" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        isScrolled
          ? "bg-navy/80 backdrop-blur-2xl border-b border-gold/[0.08]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <a href="#" className="relative z-50">
          <KairaLogo size={30} />
        </a>

        {/* Desktop Links — centered */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium tracking-wide text-cream-dim/50 transition-colors duration-300 hover:text-cream-dim"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="#begin"
            className="group inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.06] px-5 py-2.5 text-[13px] font-medium text-gold tracking-wide transition-all duration-300 hover:bg-gold/[0.12] hover:border-gold/50"
          >
            Begin Your Assessment
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden relative z-50 p-2 text-cream-dim"
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-navy/[0.98] backdrop-blur-xl transition-all duration-500 md:hidden",
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex h-full flex-col items-center justify-center gap-10">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "text-2xl font-serif font-bold tracking-wide text-cream-dim transition-all duration-300 hover:text-gold",
                isMobileOpen ? "animate-fade-up" : "opacity-0"
              )}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#begin"
            onClick={() => setIsMobileOpen(false)}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-8 py-3 text-base font-medium text-gold transition-all hover:bg-gold/20"
          >
            Begin Your Assessment
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  )
}
