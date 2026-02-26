import { KairaLogo } from "@/components/kaira-logo"

const footerLinks = {
  Explore: [
    { label: "The Science", href: "#science" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "For Physicians", href: "#physicians" },
    { label: "About", href: "#about" },
  ],
  Connect: [
    { label: "Contact Us", href: "#begin" },
    { label: "Email", href: "mailto:info@kairahealth.com" },
    { label: "LinkedIn", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-cream/[0.04]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#">
              <KairaLogo size={28} />
            </a>
            <p className="mt-5 text-sm leading-relaxed text-cream-dim/35 max-w-sm">
              The most comprehensive health intelligence platform ever built.
              Serving clients across North America and the Middle East.
            </p>
            <p className="mt-4 text-xs text-cream-dim/20">
              Toronto &middot; Expanding to the United States & Middle East
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-medium text-cream-dim/30">
                {category}
              </h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-cream-dim/40 transition-colors duration-200 hover:text-cream-dim/70"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/[0.04] pt-8 sm:flex-row">
          <p className="text-xs text-cream-dim/20">
            &copy; {new Date().getFullYear()} KAIRA Health. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-cream-dim/20 hover:text-cream-dim/40 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-cream-dim/20 hover:text-cream-dim/40 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
