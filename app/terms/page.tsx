import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms of Service | KAIRA Health",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-navy text-cream">
      <Navigation />
      <div className="mx-auto max-w-3xl px-6 pt-40 pb-32 lg:px-8">
        <h1 className="font-serif text-4xl font-bold text-cream">Terms of Service</h1>
        <p className="mt-8 text-lg leading-relaxed text-prose">
          Our terms of service are currently being finalised. KAIRA Health operates in compliance with
          applicable Canadian and international healthcare regulations.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-prose">
          For any questions, please contact us at{" "}
          <a href="mailto:info@kairahealth.com" className="text-gold hover:underline">
            info@kairahealth.com
          </a>.
        </p>
      </div>
      <Footer />
    </main>
  )
}
