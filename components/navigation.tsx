"use client"

import { useState, useEffect } from "react"
import { Menu, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { KairaLogo } from "@/components/kaira-logo"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet"

const navLinks = [
  { label: "The Science", href: "#science" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Clinic Network", href: "/clinics" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className={cn(
          "flex w-full max-w-3xl items-center justify-between rounded-full border px-5 py-2.5 transition-all duration-500",
          isScrolled
            ? "border-border bg-dark/70 backdrop-blur-2xl shadow-lg shadow-black/10"
            : "border-border/50 bg-dark/40 backdrop-blur-xl"
        )}
      >
        {/* Logo */}
        <a
          href="#"
          className="relative z-10 flex items-center justify-center transition-all duration-300 hover:brightness-125 hover:drop-shadow-[0_0_8px_rgba(201,168,76,0.3)]"
        >
          <KairaLogo size={36} showText={false} />
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium tracking-wide text-cream/50 transition-colors duration-300 hover:text-cream"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button
            asChild
            size="sm"
            className="rounded-full border border-gold/30 bg-gold/[0.08] px-5 py-2 text-[12px] font-medium tracking-wide text-gold hover:bg-gold/[0.15] hover:border-gold/50 transition-all duration-300"
          >
            <a
              href="/consultation"
              className="group inline-flex items-center gap-2"
            >
              Schedule Consultation
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </Button>
        </div>

        {/* Mobile Hamburger + Sheet — only mount after hydration to avoid Radix ID mismatch */}
        <div className="md:hidden">
          {mounted ? (
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-cream hover:bg-white/5"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-l border-border bg-dark backdrop-blur-2xl sm:max-w-sm"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex h-full flex-col items-center justify-center gap-10">
                {navLinks.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-serif font-bold tracking-wide text-cream transition-colors duration-300 hover:text-gold animate-fade-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="/consultation"
                  onClick={() => setMobileOpen(false)}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-8 py-3 text-base font-medium text-gold transition-all hover:bg-gold/20 animate-fade-up"
                  style={{ animationDelay: `${navLinks.length * 80}ms` }}
                >
                  Schedule Consultation
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </SheetContent>
          </Sheet>
          ) : (
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-cream hover:bg-white/5"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
      </nav>
    </header>
  )
}
