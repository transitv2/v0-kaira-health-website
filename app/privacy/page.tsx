import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | KAIRA Health",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-navy text-cream">
      <Navigation />
      <div className="mx-auto max-w-3xl px-6 pt-40 pb-32 lg:px-8">
        <h1 className="font-serif text-4xl font-bold text-cream">Privacy Policy</h1>
        <p className="mt-8 text-lg leading-relaxed text-prose">
          This privacy policy is currently being finalised. KAIRA Health is committed to protecting your
          personal information in accordance with applicable privacy legislation, including PIPEDA, PHIPA,
          and HIPAA.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-prose">
          For questions about how we handle your data, please contact us at{" "}
          <a href="mailto:info@kairahealth.com" className="text-gold hover:underline">
            info@kairahealth.com
          </a>.
        </p>
      </div>
      <Footer />
    </main>
  )
}
