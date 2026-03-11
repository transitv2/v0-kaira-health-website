import type { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms of Service | KAIRA Health",
  description:
    "Terms of Service for KAIRA Health — preventive health evaluations, medical disclaimers, and user responsibilities.",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-dark text-cream">
      <Navigation />

      <div className="mx-auto max-w-3xl px-6 pt-40 pb-32 lg:px-8">
        {/* ── Header ── */}
        <h1 className="font-serif text-4xl font-bold tracking-tight text-cream sm:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-muted">
          Effective Date: March 11, 2026 &middot; Last Updated: March 11, 2026
        </p>

        <div className="mt-12 space-y-12">
          {/* ── 1. Acceptance of Terms ── */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-gold">
              1. Acceptance of Terms
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream/80">
              By accessing or using the KAIRA Health website, mobile application,
              or any services provided by KAIRA Health Inc. (&ldquo;KAIRA,&rdquo;
              &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you
              acknowledge that you have read, understood, and agree to be bound by
              these Terms of Service. If you do not agree to these terms, you must
              discontinue use of the platform and services immediately.
            </p>
            <p className="mt-3 text-base leading-relaxed text-cream/80">
              We reserve the right to modify these Terms of Service at any time.
              Changes will be posted on this page with an updated effective date.
              Your continued use of our services after any modifications
              constitutes acceptance of the revised terms.
            </p>
          </section>

          {/* ── 2. Description of Services ── */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-gold">
              2. Description of Services
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream/80">
              KAIRA Health provides preventive health evaluations through
              physician-led clinical assessments, advanced diagnostic imaging,
              laboratory testing, and personalised wellness consultations. Our
              services are designed to identify potential health risks early and
              empower individuals with actionable health insights.
            </p>
            <p className="mt-3 text-base leading-relaxed text-cream/80">
              Services are delivered at KAIRA-operated clinic locations and through
              our digital platform. The scope, availability, and pricing of
              services may vary by location and are subject to change without
              prior notice.
            </p>
          </section>

          {/* ── 3. Medical Disclaimer / No Emergency Services ── */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-gold">
              3. Medical Disclaimer &amp; No Emergency Services
            </h2>
            <div className="mt-4 rounded-lg border border-teal/20 bg-dark-surface p-5">
              <p className="text-base font-medium leading-relaxed text-teal">
                KAIRA provides preventive health evaluations and educational
                health information. The services offered through this platform are
                not intended for emergency medical care. If you are experiencing a
                medical emergency, call emergency services immediately or go to
                the nearest emergency department.
              </p>
            </div>
            <p className="mt-4 text-base leading-relaxed text-cream/80">
              The information and services provided by KAIRA are intended for
              general wellness and preventive health purposes only and do not
              constitute a substitute for professional medical advice, diagnosis,
              or treatment from a qualified healthcare provider. Always seek the
              advice of your physician or other qualified health professional with
              any questions you may have regarding a medical condition.
            </p>
          </section>

          {/* ── 4. AI / Technology Disclaimer ── */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-gold">
              4. AI &amp; Technology Disclaimer
            </h2>
            <div className="mt-4 rounded-lg border border-teal/20 bg-dark-surface p-5">
              <p className="text-base font-medium leading-relaxed text-teal">
                The KAIRA platform may incorporate analytical software tools to
                assist clinicians in reviewing health data. These tools are
                designed to support clinical decision-making and do not provide
                autonomous medical diagnoses or treatment recommendations.
              </p>
            </div>
            <p className="mt-4 text-base leading-relaxed text-cream/80">
              All clinical decisions are made by licensed healthcare
              professionals. Technology-assisted insights are used solely as a
              supplementary resource and are subject to professional clinical
              review before any recommendations are communicated to patients.
            </p>
          </section>

          {/* ── 5. User Responsibilities ── */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-gold">
              5. User Responsibilities
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream/80">
              As a user of KAIRA Health&rsquo;s services, you agree to:
            </p>
            <ul className="mt-3 list-inside list-disc space-y-2 text-base leading-relaxed text-cream/80">
              <li>
                Provide accurate, complete, and current personal and health
                information as requested during registration and evaluations.
              </li>
              <li>
                Maintain the confidentiality of your account credentials and
                notify us immediately of any unauthorised access.
              </li>
              <li>
                Use the platform and services only for lawful purposes and in
                accordance with these Terms of Service.
              </li>
              <li>
                Not attempt to reverse-engineer, decompile, or otherwise tamper
                with any part of the KAIRA platform or its underlying technology.
              </li>
              <li>
                Not reproduce, distribute, or publicly display any content from
                the platform without prior written consent from KAIRA Health.
              </li>
            </ul>
          </section>

          {/* ── 6. Intellectual Property ── */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-gold">
              6. Intellectual Property
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream/80">
              All content, trademarks, logos, service marks, graphics, software,
              and other materials available on or through the KAIRA platform are
              the exclusive property of KAIRA Health Inc. or its licensors and are
              protected by applicable intellectual property laws.
            </p>
            <p className="mt-3 text-base leading-relaxed text-cream/80">
              You are granted a limited, non-exclusive, non-transferable licence
              to access and use the platform for personal, non-commercial purposes
              in connection with the services provided. This licence does not
              include the right to copy, modify, distribute, sell, or lease any
              part of the platform or its content.
            </p>
          </section>

          {/* ── 7. Limitation of Liability ── */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-gold">
              7. Limitation of Liability
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream/80">
              To the fullest extent permitted by applicable law, KAIRA Health
              Inc., its officers, directors, employees, agents, and affiliates
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising out of or related to your
              use of, or inability to use, the platform or services.
            </p>
            <p className="mt-3 text-base leading-relaxed text-cream/80">
              In no event shall KAIRA Health&rsquo;s total aggregate liability
              exceed the amount you have paid to KAIRA Health for the specific
              service giving rise to the claim. This limitation applies regardless
              of the legal theory on which the claim is based, including but not
              limited to breach of contract, tort, negligence, or strict
              liability.
            </p>
            <p className="mt-3 text-base leading-relaxed text-cream/80">
              KAIRA Health does not warrant that the platform will be
              uninterrupted, error-free, or free of harmful components. The
              platform and services are provided on an &ldquo;as is&rdquo; and
              &ldquo;as available&rdquo; basis without warranties of any kind,
              whether express or implied.
            </p>
          </section>

          {/* ── 8. Governing Law and Jurisdiction ── */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-gold">
              8. Governing Law &amp; Jurisdiction
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream/80">
              These Terms of Service shall be governed by and construed in
              accordance with the laws of the Province of Ontario and the federal
              laws of Canada applicable therein, without regard to conflict of law
              principles.
            </p>
            <p className="mt-3 text-base leading-relaxed text-cream/80">
              Any disputes arising out of or in connection with these terms shall
              be submitted to the exclusive jurisdiction of the courts located in
              the Province of Ontario, Canada. By using our services, you consent
              to the personal jurisdiction of such courts.
            </p>
          </section>

          {/* ── 9. Privacy Policy ── */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-gold">
              9. Privacy Policy
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream/80">
              Your use of the KAIRA platform is also governed by our Privacy
              Policy, which describes how we collect, use, store, and protect your
              personal and health information. Please review our{" "}
              <Link
                href="/privacy"
                className="text-teal underline decoration-teal/40 underline-offset-2 transition-colors hover:text-teal-light hover:decoration-teal"
              >
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
          </section>

          {/* ── 10. Contact Information ── */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-gold">
              10. Contact Information
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream/80">
              If you have any questions or concerns about these Terms of Service,
              please contact us:
            </p>
            <div className="mt-4 rounded-lg border border-gold/15 bg-dark-surface p-5">
              <p className="text-base font-semibold text-cream">
                KAIRA Health Inc.
              </p>
              <p className="mt-2 text-base text-cream/80">
                Email:{" "}
                <a
                  href="mailto:info@kairahealth.com"
                  className="text-gold underline decoration-gold/40 underline-offset-2 transition-colors hover:text-gold-sub hover:decoration-gold"
                >
                  info@kairahealth.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
