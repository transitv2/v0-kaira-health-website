import { KairaLogo } from "@/components/kaira-logo"

const exploreLinks = [
  { label: "The Science", href: "#science" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Clinic Network", href: "/clinics" },
]

const connectLinks = [
  { label: "Schedule Consultation", href: "/consultation" },
  { label: "Contact Us", href: "mailto:consulting@regenalife.ca" },
]

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
]

export function Footer() {
  return (
    <footer className="relative w-full bg-dark">
      {/* Top gold accent line */}
      <div className="mx-auto h-px w-full max-w-xs bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-14">
        {/* Three columns: Brand, Explore, Connect */}
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand column — spans 2 */}
          <div className="lg:col-span-2">
            <a href="#" aria-label="KAIRA Health home">
              <KairaLogo size={28} />
            </a>
            <p className="mt-5 text-muted text-sm leading-relaxed max-w-sm">
              A comprehensive health intelligence platform. Serving clients
              across North America and the Middle East.
            </p>
            <p className="mt-4 text-muted/50 text-xs">
              Toronto &middot; Serving North America &amp; the Middle East
            </p>
          </div>

          {/* Explore column */}
          <div>
            <h4 className="text-gold/50 uppercase tracking-[0.2em] text-[11px] font-medium">
              Explore
            </h4>
            <ul className="mt-4 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div>
            <h4 className="text-gold/50 uppercase tracking-[0.2em] text-[11px] font-medium">
              Connect
            </h4>
            <ul className="mt-4 space-y-3">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar: copyright + legal */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-muted/50 text-xs">
            &copy; {new Date().getFullYear()} KAIRA Health. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted/50 text-xs hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
