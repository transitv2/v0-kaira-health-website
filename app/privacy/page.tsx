import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | KAIRA Health",
  description:
    "Learn how KAIRA Health collects, uses, stores, and protects your personal and health-related information.",
}

/* ------------------------------------------------------------------ */
/*  Section helper — keeps the JSX readable                           */
/* ------------------------------------------------------------------ */
function Section({
  id,
  number,
  title,
  children,
}: {
  id: string
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-32">
      <h2 className="mt-14 flex items-baseline gap-3 font-serif text-2xl font-semibold text-cream">
        <span className="text-gold">{number}.</span> {title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
        {children}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-dark text-cream">
      <Navigation />

      <div className="mx-auto max-w-3xl px-6 pt-40 pb-32 lg:px-8">
        {/* ---- Header ---- */}
        <p className="text-xs uppercase tracking-[0.2em] text-gold mb-5">
          Legal
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-cream leading-[1.1]">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted">
          Effective Date: March 1, 2025 &mdash; Last Updated: March 11, 2026
        </p>

        {/* ---- Opening ---- */}
        <p className="mt-10 text-base leading-relaxed text-muted">
          KAIRA Health is committed to protecting the privacy and security of
          your personal information. This Privacy Policy explains how we
          collect, use, store, and protect personal and health-related
          information submitted through our platform. KAIRA is designed to
          support compliance with applicable privacy legislation, including the
          Personal Information Protection and Electronic Documents Act (PIPEDA),
          the Personal Health Information Protection Act (PHIPA), and the Health
          Insurance Portability and Accountability Act (HIPAA), where
          applicable.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted">
          By using the KAIRA Health website or submitting information through
          our platform, you acknowledge that you have read and understand this
          Privacy Policy. If you do not agree with the practices described
          herein, please do not use our services.
        </p>

        {/* ---- Divider ---- */}
        <hr className="mt-12 border-t border-gold/10" />

        {/* ---- Table of Contents ---- */}
        <nav className="mt-10 rounded-xl border border-teal/[0.15] bg-dark-surface p-6">
          <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-gold/60">
            Contents
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted">
            <li><a href="#information-collected" className="hover:text-gold transition-colors">Information We Collect</a></li>
            <li><a href="#how-we-use" className="hover:text-gold transition-colors">How We Use Your Information</a></li>
            <li><a href="#data-storage" className="hover:text-gold transition-colors">Data Storage and Protection</a></li>
            <li><a href="#data-retention" className="hover:text-gold transition-colors">Data Retention</a></li>
            <li><a href="#third-party" className="hover:text-gold transition-colors">Third-Party Data Sharing</a></li>
            <li><a href="#cross-border" className="hover:text-gold transition-colors">Cross-Border Data Transfers</a></li>
            <li><a href="#your-rights" className="hover:text-gold transition-colors">Your Rights</a></li>
            <li><a href="#cookies" className="hover:text-gold transition-colors">Cookies and Analytics</a></li>
            <li><a href="#childrens-privacy" className="hover:text-gold transition-colors">Children&rsquo;s Privacy</a></li>
            <li><a href="#changes" className="hover:text-gold transition-colors">Changes to This Policy</a></li>
            <li><a href="#contact" className="hover:text-gold transition-colors">Contact Us</a></li>
          </ol>
        </nav>

        {/* ==== Sections ==== */}

        {/* 1 ---------------------------------------------------- */}
        <Section id="information-collected" number="1" title="Information We Collect">
          <p>
            When you interact with KAIRA Health &mdash; whether by requesting a
            consultation, completing an intake form, or contacting our team
            &mdash; we may collect the following categories of personal
            information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="text-cream">Identifying information</span>{" "}
              &mdash; full name, email address, phone number, date of birth,
              and mailing address.
            </li>
            <li>
              <span className="text-cream">Health-related intake data</span>{" "}
              &mdash; medical history, current symptoms, health goals,
              physician referrals, lifestyle information, and any diagnostic
              results you choose to share.
            </li>
            <li>
              <span className="text-cream">Account and communication data</span>{" "}
              &mdash; correspondence with our team, consultation preferences,
              and scheduling details.
            </li>
            <li>
              <span className="text-cream">Technical data</span> &mdash; IP
              address, browser type, device information, and usage analytics
              collected through cookies and similar technologies.
            </li>
          </ul>
          <p>
            We collect information directly from you, and in some cases from
            referring healthcare providers with your consent.
          </p>
        </Section>

        {/* 2 ---------------------------------------------------- */}
        <Section id="how-we-use" number="2" title="How We Use Your Information">
          <p>
            KAIRA Health uses the personal information we collect for the
            following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="text-cream">Consultation coordination</span>{" "}
              &mdash; to schedule, prepare for, and follow up on your health
              consultations with KAIRA-affiliated physicians and partner
              clinics.
            </li>
            <li>
              <span className="text-cream">Communication</span> &mdash; to
              respond to your inquiries, send appointment reminders, and provide
              relevant health-related updates you have opted into.
            </li>
            <li>
              <span className="text-cream">Platform improvement</span> &mdash;
              to analyze aggregated, de-identified usage data in order to
              enhance the quality, safety, and functionality of our platform.
            </li>
            <li>
              <span className="text-cream">Legal and regulatory obligations</span>{" "}
              &mdash; to comply with applicable laws, regulations, and
              professional standards governing healthcare information.
            </li>
          </ul>
          <p>
            We will not use your personal health information for marketing
            purposes without your explicit, informed consent.
          </p>
        </Section>

        {/* 3 ---------------------------------------------------- */}
        <Section id="data-storage" number="3" title="Data Storage and Protection">
          <p>
            KAIRA Health employs industry-standard administrative, technical,
            and physical safeguards designed to protect the confidentiality,
            integrity, and availability of your personal information. These
            measures include, but are not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="text-cream">Encryption</span> &mdash; data is
              encrypted in transit (TLS 1.2+) and at rest using AES-256 or
              equivalent standards.
            </li>
            <li>
              <span className="text-cream">Access controls</span> &mdash;
              role-based access ensures that only authorized personnel can view
              or process personal health information.
            </li>
            <li>
              <span className="text-cream">Infrastructure</span> &mdash; data
              is hosted on secure, SOC 2-compliant cloud infrastructure with
              regular security audits and monitoring.
            </li>
            <li>
              <span className="text-cream">Incident response</span> &mdash; we
              maintain documented breach notification and incident response
              procedures in alignment with applicable privacy legislation.
            </li>
          </ul>
          <p>
            While no method of electronic transmission or storage is completely
            secure, KAIRA Health is committed to maintaining protections that
            meet or exceed the standards expected under PIPEDA, PHIPA, and
            HIPAA, as applicable.
          </p>
        </Section>

        {/* 4 ---------------------------------------------------- */}
        <Section id="data-retention" number="4" title="Data Retention">
          <p>
            We retain personal information only for as long as necessary to
            fulfill the purposes outlined in this policy, or as required by
            applicable law. General retention guidelines include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="text-cream">Health-related records</span>{" "}
              &mdash; retained for a minimum of 10 years from the date of the
              last consultation, or longer where required by provincial or
              federal regulation.
            </li>
            <li>
              <span className="text-cream">Account and contact information</span>{" "}
              &mdash; retained for the duration of your relationship with KAIRA
              Health and for a reasonable period thereafter to address any
              follow-up inquiries.
            </li>
            <li>
              <span className="text-cream">Technical and analytics data</span>{" "}
              &mdash; retained in aggregated or de-identified form and purged
              periodically in accordance with our data governance procedures.
            </li>
          </ul>
          <p>
            When personal information is no longer required, it is securely
            deleted or de-identified in a manner designed to prevent
            reconstruction.
          </p>
        </Section>

        {/* 5 ---------------------------------------------------- */}
        <Section id="third-party" number="5" title="Third-Party Data Sharing">
          <p>
            KAIRA Health does not sell your personal information. We may share
            information with third parties only in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="text-cream">Partner clinics and physicians</span>{" "}
              &mdash; to facilitate your consultation, diagnostic assessments,
              or treatment plan with KAIRA-affiliated healthcare providers.
            </li>
            <li>
              <span className="text-cream">Service providers</span> &mdash;
              trusted vendors who assist with platform hosting, email delivery,
              scheduling, and analytics, bound by contractual obligations to
              protect your data.
            </li>
            <li>
              <span className="text-cream">Legal requirements</span> &mdash;
              where disclosure is required by law, regulation, court order, or
              governmental request.
            </li>
            <li>
              <span className="text-cream">With your consent</span> &mdash;
              where you have provided explicit authorization for a specific
              disclosure.
            </li>
          </ul>
          <p>
            All third-party recipients are contractually required to handle your
            information in a manner consistent with this Privacy Policy and
            applicable privacy legislation.
          </p>
        </Section>

        {/* 6 ---------------------------------------------------- */}
        <Section id="cross-border" number="6" title="Cross-Border Data Transfers">
          <p>
            KAIRA Health operates across multiple jurisdictions, including
            Canada, the United States, and the Middle East. As a result, your
            personal information may be transferred to, stored in, or processed
            in a jurisdiction other than the one in which it was originally
            collected.
          </p>
          <p>
            Where personal information is transferred across borders, KAIRA
            Health takes reasonable steps to ensure that the information
            continues to receive a level of protection consistent with the
            privacy legislation applicable in the originating jurisdiction. This
            may include the use of contractual safeguards, data processing
            agreements, and periodic assessments of third-party security
            practices.
          </p>
          <p>
            By submitting your information through our platform, you acknowledge
            that your data may be processed in jurisdictions with different
            privacy standards. KAIRA Health is designed to support compliance
            with PIPEDA, PHIPA, and HIPAA requirements governing cross-border
            data transfers, where applicable.
          </p>
        </Section>

        {/* 7 ---------------------------------------------------- */}
        <Section id="your-rights" number="7" title="Your Rights">
          <p>
            Depending on the jurisdiction in which you reside, you may have the
            following rights with respect to your personal information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="text-cream">Right of access</span> &mdash; you
              may request a copy of the personal information we hold about you.
            </li>
            <li>
              <span className="text-cream">Right of correction</span> &mdash;
              you may request that we correct inaccurate or incomplete personal
              information.
            </li>
            <li>
              <span className="text-cream">Right of deletion</span> &mdash;
              you may request that we delete your personal information, subject
              to legal retention requirements and legitimate operational needs.
            </li>
            <li>
              <span className="text-cream">Right to withdraw consent</span>{" "}
              &mdash; where processing is based on consent, you may withdraw
              that consent at any time. Withdrawal does not affect the
              lawfulness of processing carried out prior to withdrawal.
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a
              href="mailto:info@kairahealth.com"
              className="text-gold hover:underline"
            >
              info@kairahealth.com
            </a>
            . We will respond to verified requests within 30 days, or as
            otherwise required by applicable law.
          </p>
        </Section>

        {/* 8 ---------------------------------------------------- */}
        <Section id="cookies" number="8" title="Cookies and Analytics">
          <p>
            KAIRA Health uses cookies and similar tracking technologies to
            improve your experience on our platform. These technologies help us
            understand how visitors interact with our website, remember your
            preferences, and analyze traffic patterns.
          </p>
          <p>
            You may control or disable cookies through your browser settings.
            Please note that disabling certain cookies may affect the
            functionality of our platform.
          </p>
          <p>
            Where analytics data is collected, it is aggregated and
            de-identified wherever possible to minimize the collection of
            personally identifiable information.
          </p>
        </Section>

        {/* 9 ---------------------------------------------------- */}
        <Section id="childrens-privacy" number="9" title="Children&rsquo;s Privacy">
          <p>
            KAIRA Health&rsquo;s platform is not directed to individuals under
            the age of 18. We do not knowingly collect personal information from
            minors. If we become aware that we have inadvertently collected
            information from a child, we will take reasonable steps to delete it
            promptly.
          </p>
        </Section>

        {/* 10 --------------------------------------------------- */}
        <Section id="changes" number="10" title="Changes to This Policy">
          <p>
            KAIRA Health reserves the right to update or modify this Privacy
            Policy at any time. When we make material changes, we will update
            the &ldquo;Last Updated&rdquo; date at the top of this page and, where
            appropriate, provide notice through our platform or via email.
          </p>
          <p>
            We encourage you to review this Privacy Policy periodically to stay
            informed about how we are protecting your information.
          </p>
        </Section>

        {/* 11 --------------------------------------------------- */}
        <Section id="contact" number="11" title="Contact Us">
          <p>
            If you have questions, concerns, or requests regarding this Privacy
            Policy or the handling of your personal information, please contact
            us:
          </p>
          <div className="rounded-xl border border-teal/[0.15] bg-dark-surface p-6 mt-2">
            <p className="text-cream font-medium">KAIRA Health &mdash; Privacy Inquiries</p>
            <p className="mt-2">
              Email:{" "}
              <a
                href="mailto:info@kairahealth.com"
                className="text-gold hover:underline"
              >
                info@kairahealth.com
              </a>
            </p>
          </div>
          <p className="mt-4">
            We aim to acknowledge all privacy-related inquiries within five (5)
            business days and to provide a substantive response within thirty
            (30) days.
          </p>
        </Section>

        {/* ---- Closing ---- */}
        <hr className="mt-14 border-t border-gold/10" />
        <p className="mt-6 text-sm text-muted/60 italic">
          This Privacy Policy is designed to support compliance with applicable
          privacy legislation and does not constitute legal advice. KAIRA Health
          recommends consulting with a qualified legal professional regarding
          your specific privacy obligations.
        </p>
      </div>

      <Footer />
    </main>
  )
}
