import { ArrowUpRight } from "lucide-react"

const footerLinks = {
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Our Mission", href: "#mission" },
    { label: "Services", href: "#services" },
    { label: "The Science", href: "#science" },
  ],
  Services: [
    { label: "Full-Body MRI", href: "#services" },
    { label: "Cancer Detection", href: "#services" },
    { label: "Cardiac Screening", href: "#services" },
    { label: "Genome Sequencing", href: "#services" },
  ],
  Connect: [
    { label: "Contact Us", href: "#contact" },
    { label: "Email Us", href: "mailto:info@kairahealth.com" },
    { label: "Call Us", href: "tel:18007502745" },
    { label: "LinkedIn", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
                <span className="text-sm font-bold text-accent-foreground font-serif">K</span>
              </div>
              <span className="text-xl font-bold tracking-tight font-serif text-foreground">
                Kaira<span className="text-accent">.</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-xs">
              AI-enabled longevity medicine. Live younger, live longer. The future
              of preventative healthcare is here.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-foreground">{category}</h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                    >
                      {link.label}
                      {link.href.startsWith("http") || link.href.startsWith("mailto") || link.href.startsWith("tel") ? (
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Kaira Health. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Use
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
