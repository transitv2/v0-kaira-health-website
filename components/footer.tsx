import { KairaLogo } from "@/components/kaira-logo"

const footerLinks = {
  Explore: [
    { label: "The Science", href: "/#science" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Global Reach", href: "/#global" },
  ],
  Connect: [
    { label: "Contact Us", href: "mailto:info@kairahealth.com" },
  ],
}

export function Footer() {
  return (
    <footer className="relative">
      {/* Gradient transition — adapts to current scroll brightness */}
      {/* Gold rule */}
      <div className="mx-auto h-px w-full max-w-xs bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#">
              <KairaLogo size={28} />
            </a>
            <p className="mt-5 text-sm leading-relaxed text-sub max-w-sm">
              A comprehensive health intelligence platform.
              Serving clients across North America and the Middle East.
            </p>
            <p className="mt-4 text-xs text-ghost">
              Toronto &middot; Serving North America & the Middle East
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-medium text-sub">
                {category}
              </h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-sub transition-colors duration-200 hover:text-prose-strong"
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
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-ghost">
            &copy; {new Date().getFullYear()} KAIRA Health. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-xs text-ghost hover:text-sub transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-xs text-ghost hover:text-sub transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
