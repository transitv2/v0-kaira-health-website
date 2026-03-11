import type { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms of Service | KAIRA Health",
  description:
    "Terms of Service for KAIRA Health — preventive health intelligence platform, medical disclaimers, and user responsibilities.",
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
export default function TermsPage() {
  return (
    <main className="min-h-screen bg-dark text-cream">
      <Navigation />

      <div className="mx-auto max-w-3xl px-6 pt-40 pb-32 lg:px-8">
        {/* ---- Header ---- */}
        <p className="text-xs uppercase tracking-[0.2em] text-gold mb-5">
          Legal
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-cream leading-[1.1]">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-muted">
          Last Modified: March 11, 2026
        </p>

        {/* ---- Divider ---- */}
        <hr className="mt-12 border-t border-gold/10" />

        {/* ---- Table of Contents ---- */}
        <nav className="mt-10 rounded-xl border border-teal/[0.15] bg-dark-surface p-6">
          <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-gold/60">
            Contents
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted">
            <li><a href="#acceptance" className="hover:text-gold transition-colors">Acceptance of These Terms</a></li>
            <li><a href="#description" className="hover:text-gold transition-colors">Description of the KAIRA Platform</a></li>
            <li><a href="#medical-disclaimer" className="hover:text-gold transition-colors">Medical Disclaimer</a></li>
            <li><a href="#health-assessments" className="hover:text-gold transition-colors">Important Information About Health Assessments and Results</a></li>
            <li><a href="#ai-tools" className="hover:text-gold transition-colors">Analytical Tools and Artificial Intelligence</a></li>
            <li><a href="#representations" className="hover:text-gold transition-colors">Your Representations and Warranties</a></li>
            <li><a href="#modifications" className="hover:text-gold transition-colors">Modifications to These Terms and to the Website</a></li>
            <li><a href="#security" className="hover:text-gold transition-colors">Your Use of the Website and Security</a></li>
            <li><a href="#prohibited-uses" className="hover:text-gold transition-colors">Prohibited Uses</a></li>
            <li><a href="#ip-rights" className="hover:text-gold transition-colors">Intellectual Property Rights and Ownership</a></li>
            <li><a href="#partner-clinics" className="hover:text-gold transition-colors">Partner Clinics and Third-Party Service Providers</a></li>
            <li><a href="#no-reliance" className="hover:text-gold transition-colors">No Reliance</a></li>
            <li><a href="#privacy-data" className="hover:text-gold transition-colors">Privacy, Data Protection, and Cookies</a></li>
            <li><a href="#electronic-communications" className="hover:text-gold transition-colors">Consent to Electronic Communications</a></li>
            <li><a href="#consultation-booking" className="hover:text-gold transition-colors">Consultation Booking and Inquiries</a></li>
            <li><a href="#third-party-websites" className="hover:text-gold transition-colors">Third-Party Websites</a></li>
            <li><a href="#geographic-restrictions" className="hover:text-gold transition-colors">Geographic Restrictions</a></li>
            <li><a href="#disclaimer-warranties" className="hover:text-gold transition-colors">Disclaimer of Warranties</a></li>
            <li><a href="#limitation-liability" className="hover:text-gold transition-colors">Limitation on Liability</a></li>
            <li><a href="#indemnification" className="hover:text-gold transition-colors">Indemnification</a></li>
            <li><a href="#governing-law" className="hover:text-gold transition-colors">Governing Law and Choice of Forum</a></li>
            <li><a href="#waiver" className="hover:text-gold transition-colors">Waiver</a></li>
            <li><a href="#severability" className="hover:text-gold transition-colors">Severability</a></li>
            <li><a href="#assignment" className="hover:text-gold transition-colors">Assignment</a></li>
            <li><a href="#no-third-party" className="hover:text-gold transition-colors">No Third-Party Beneficiaries</a></li>
            <li><a href="#survival" className="hover:text-gold transition-colors">Survival</a></li>
            <li><a href="#language" className="hover:text-gold transition-colors">Language</a></li>
            <li><a href="#entire-agreement" className="hover:text-gold transition-colors">Entire Agreement</a></li>
            <li><a href="#contact" className="hover:text-gold transition-colors">Contact</a></li>
          </ol>
        </nav>

        {/* ==== Sections ==== */}

        {/* 1 ---------------------------------------------------- */}
        <Section id="acceptance" number="1" title="Acceptance of These Terms">
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) constitute a legal agreement
            between you (&ldquo;you&rdquo; or &ldquo;your&rdquo;) and Kaira Health
            (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;). These Terms govern your access to and use of the
            website located at{" "}
            <a
              href="https://www.kairahealth.ai"
              className="text-gold hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.kairahealth.ai
            </a>
            , including any content, functionality, and services offered on or through
            the Website (collectively, the &ldquo;Website&rdquo;).
          </p>
          <p className="font-semibold text-cream">
            BY USING THE WEBSITE, YOU ACCEPT AND AGREE TO BE BOUND BY THESE TERMS OF
            SERVICE. IF YOU DO NOT AGREE TO THESE TERMS, YOU MUST NOT ACCESS OR USE
            THE WEBSITE.
          </p>
          <p>
            You must be the legal age of majority in your jurisdiction of residence to
            use the Website. By using the Website, you represent and warrant that you
            meet this requirement.
          </p>
        </Section>

        {/* 2 ---------------------------------------------------- */}
        <Section id="description" number="2" title="Description of the KAIRA Platform">
          <p>
            KAIRA is a preventive health intelligence platform that integrates
            advanced diagnostics, healthcare practitioner expertise, and a network of
            partner clinics to deliver personalised health insights and proactive care
            programmes (&ldquo;Platform&rdquo;).
          </p>
          <p>
            Clinical services available through the Platform are provided by licensed
            clinicians who are credentialed in the jurisdictions in which they
            practise. Partner clinics that participate in the KAIRA network are
            independently owned and operated; they are not subsidiaries or divisions
            of the Company.
          </p>
          <p>
            The Company does not itself provide medical care, diagnose medical
            conditions, or prescribe treatments. The Platform is not an insurance
            product and does not replace health insurance or government health
            coverage.
          </p>
          <p>
            Virtual care services are available only where permitted by applicable law
            and regulation. These Terms govern your use of the Website only; clinical
            services obtained through the Platform may be subject to separate
            agreements between you and the applicable clinician or partner clinic.
          </p>
        </Section>

        {/* 3 ---------------------------------------------------- */}
        <Section id="medical-disclaimer" number="3" title="Medical Disclaimer">
          <div className="rounded-xl border border-teal/[0.15] bg-dark-surface p-6">
            <p className="text-base font-semibold leading-relaxed text-teal">
              THE INFORMATION PROVIDED ON THE WEBSITE IS FOR GENERAL INFORMATIONAL
              PURPOSES ONLY AND DOES NOT CONSTITUTE MEDICAL ADVICE, DIAGNOSIS, OR
              TREATMENT. ALWAYS SEEK THE ADVICE OF A QUALIFIED HEALTHCARE
              PRACTITIONER WITH ANY QUESTIONS YOU MAY HAVE REGARDING A MEDICAL
              CONDITION. NEVER DISREGARD PROFESSIONAL MEDICAL ADVICE OR DELAY IN
              SEEKING IT BECAUSE OF SOMETHING YOU HAVE READ ON THE WEBSITE.
            </p>
          </div>
          <p>
            Services available through the Platform are designed to complement &mdash;
            not replace &mdash; your relationship with your primary-care provider or
            other treating clinicians.
          </p>

          {/* Sub-section: No Emergency Services */}
          <h3 className="mt-6 font-serif text-lg font-semibold text-cream">
            No Emergency Services
          </h3>
          <div className="rounded-xl border border-red-500/20 bg-dark-surface p-6">
            <p className="text-base font-semibold leading-relaxed text-red-400">
              THE WEBSITE AND THE PLATFORM ARE NOT DESIGNED FOR AND SHOULD NOT BE USED
              IN A MEDICAL EMERGENCY. IF YOU BELIEVE YOU ARE EXPERIENCING A MEDICAL
              EMERGENCY, CALL 911 (OR YOUR LOCAL EMERGENCY NUMBER) OR GO TO THE
              NEAREST EMERGENCY DEPARTMENT IMMEDIATELY. DO NOT RELY ON THE WEBSITE OR
              THE PLATFORM FOR EMERGENCY MEDICAL NEEDS.
            </p>
          </div>

          {/* Sub-section: No Healthcare Practitioner-Patient Relationship */}
          <h3 className="mt-6 font-serif text-lg font-semibold text-cream">
            No Healthcare Practitioner&ndash;Patient Relationship
          </h3>
          <p>
            No healthcare practitioner&ndash;patient relationship is created by your
            use of the Website, by any communication submitted through the Website, or
            by any exchange of information between you and the Company through the
            Website. A healthcare practitioner&ndash;patient relationship is
            established only when you are formally accepted as a patient by a licensed
            clinician through the Platform&rsquo;s clinical services and is governed
            by a separate clinical services agreement.
          </p>
        </Section>

        {/* 4 ---------------------------------------------------- */}
        <Section id="health-assessments" number="4" title="Important Information About Health Assessments and Results">
          <h3 className="font-serif text-lg font-semibold text-cream">
            Health Assessment Results May Be Unexpected or Distressing
          </h3>
          <p>
            Health assessments and diagnostic tests may reveal information about your
            health that you did not anticipate, including the identification of
            risk factors, incidental findings, or conditions that require further
            medical evaluation. By using the Platform, you acknowledge that assessment
            results may be unexpected or emotionally distressing.
          </p>

          <h3 className="mt-6 font-serif text-lg font-semibold text-cream">
            Diagnostic Procedures Carry Inherent Risks
          </h3>
          <p>
            Diagnostic procedures &mdash; including laboratory blood draws, imaging
            studies, and other clinical assessments &mdash; carry inherent risks such
            as discomfort, bruising, allergic reactions, or, in rare cases, more
            significant complications. You should discuss the risks, benefits, and
            alternatives of any diagnostic procedure with your treating clinician
            before proceeding.
          </p>

          <h3 className="mt-6 font-serif text-lg font-semibold text-cream">
            Results May Not Be Complete or Fully Accurate
          </h3>
          <p>
            No diagnostic test or health assessment is 100% accurate. Results may be
            subject to false positives, false negatives, laboratory error, or
            limitations inherent in the methodology used. Results should be
            interpreted in the context of your overall health and in consultation with
            a qualified healthcare practitioner.
          </p>

          <h3 className="mt-6 font-serif text-lg font-semibold text-cream">
            Exercise Discretion When Sharing Your Results
          </h3>
          <p>
            Health assessment results may contain sensitive information. You are
            encouraged to exercise discretion when deciding whether and with whom to
            share your results. The Company is not responsible for any consequences
            that arise from your voluntary disclosure of results to third parties.
          </p>
        </Section>

        {/* 5 ---------------------------------------------------- */}
        <Section id="ai-tools" number="5" title="Analytical Tools and Artificial Intelligence">
          <p>
            The Platform may incorporate analytical software tools, including
            artificial intelligence (&ldquo;AI&rdquo;) and machine-learning
            (&ldquo;ML&rdquo;) technologies, that assist clinicians in reviewing and
            interpreting health data. These tools may be used to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              identify patterns, trends, or anomalies in diagnostic results;
            </li>
            <li>
              generate preliminary risk assessments or health summaries; and
            </li>
            <li>
              support clinical decision-making by highlighting relevant biomarkers
              or data points.
            </li>
          </ul>
          <p>
            AI and ML tools deployed on the Platform function as decision-support aids
            only and are not classified or regulated as medical devices. All clinical
            decisions remain the responsibility of the licensed clinician overseeing
            your care.
          </p>
          <p>
            The Company makes no warranties or representations regarding the accuracy,
            completeness, or reliability of outputs generated by AI or ML tools.
            De-identified and aggregated data may be used to improve the performance
            of these tools; however, no individually identifiable health data will be
            used for AI model training without your informed consent.
          </p>
          <p>
            Certain analytical tools available through the Platform may rely on
            third-party technologies that are not developed or controlled by KAIRA.
            The Company is not responsible for the performance, accuracy, or
            availability of such third-party technologies.
          </p>
        </Section>

        {/* 6 ---------------------------------------------------- */}
        <Section id="representations" number="6" title="Your Representations and Warranties">
          <p>
            By using the Website and the Platform, you represent and warrant that:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              all information you provide &mdash; including personal, health, and
              contact information &mdash; is accurate, complete, and current;
            </li>
            <li>
              you will promptly update any information that becomes inaccurate or
              incomplete;
            </li>
            <li>
              you are providing information about yourself only (or about an
              individual for whom you have legal authority to act), and not about any
              third party without proper authorisation; and
            </li>
            <li>
              your use of the Website and the Platform does not violate any
              applicable law, regulation, or professional obligation.
            </li>
          </ul>
          <p>
            The Company may rely on the accuracy of the information you provide when
            coordinating services, communicating with clinicians, and fulfilling its
            obligations under these Terms.
          </p>
        </Section>

        {/* 7 ---------------------------------------------------- */}
        <Section id="modifications" number="7" title="Modifications to These Terms and to the Website">
          <p>
            The Company reserves the right to revise and update these Terms at any
            time in its sole discretion. All changes are effective immediately when
            posted and apply to all access to, and use of, the Website thereafter.
          </p>
          <p>
            Your continued use of the Website following the posting of revised Terms
            means that you accept and agree to the changes. You are expected to check
            this page frequently so that you are aware of any changes, as they are
            binding on you.
          </p>
          <p>
            The Company may also modify, suspend, or discontinue the Platform or any
            part of its functionality at any time, with or without notice, and without
            liability to you or any third party.
          </p>
        </Section>

        {/* 8 ---------------------------------------------------- */}
        <Section id="security" number="8" title="Your Use of the Website and Security">
          <p>
            The Company implements reasonable administrative, technical, and physical
            security measures designed to protect the integrity and confidentiality of
            information transmitted through the Website.
          </p>
          <p>
            You are responsible for maintaining the security of your own computing
            environment, including your device, internet connection, and any
            credentials used to access the Website. The safety and security of your
            information also depends on you.
          </p>
          <p>
            The transmission of information via the internet is not completely secure.
            Although the Company takes reasonable steps to protect your information,
            the Company cannot guarantee the security of information transmitted to or
            through the Website. Any transmission of personal information is at your
            own risk.
          </p>
          <p>
            Any credentials &mdash; such as usernames, passwords, or access codes
            &mdash; issued to you or created by you must be treated as confidential.
            You must not disclose them to any third party. The Company has the right
            to disable any user account, username, or password at any time in its sole
            discretion, including if, in the Company&rsquo;s opinion, you have
            violated any provision of these Terms.
          </p>
        </Section>

        {/* 9 ---------------------------------------------------- */}
        <Section id="prohibited-uses" number="9" title="Prohibited Uses">
          <p>
            You agree not to use the Website in any way that:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              attempts to gain unauthorised access to, interfere with, damage, or
              disrupt any parts of the Website, the server on which the Website is
              stored, or any server, computer, or database connected to the Website;
            </li>
            <li>
              breaches or tests the vulnerability of any security or authentication
              measures on the Website;
            </li>
            <li>
              restricts or inhibits any other person from using the Website,
              including by means of hacking or defacing any portion of the Website;
            </li>
            <li>
              disrupts the normal flow of communication or otherwise acts in a manner
              that negatively affects other users&rsquo; ability to use the Website;
            </li>
            <li>
              uses any robot, spider, scraper, or other automated means to access the
              Website for any purpose without the Company&rsquo;s express prior
              written consent;
            </li>
            <li>
              introduces any viruses, Trojan horses, worms, logic bombs, or other
              material that is malicious or technologically harmful; or
            </li>
            <li>
              engages in any denial-of-service attack or similar conduct designed to
              overwhelm or impair the Website&rsquo;s infrastructure.
            </li>
          </ul>
        </Section>

        {/* 10 --------------------------------------------------- */}
        <Section id="ip-rights" number="10" title="Intellectual Property Rights and Ownership">
          <p>
            The Website and its entire contents, features, and functionality &mdash;
            including but not limited to all information, text, graphics, logos,
            images, audio, video, software, code, data compilations, and the design,
            selection, and arrangement thereof &mdash; are owned by the Company, its
            licensors, or other providers of such material and are protected by
            Canadian and international copyright, trademark, patent, trade secret, and
            other intellectual property or proprietary rights laws.
          </p>
          <p>
            &ldquo;KAIRA,&rdquo; the KAIRA logo, and all related names, logos,
            product and service names, designs, and slogans are trademarks of the
            Company or its affiliates. You must not use such marks without the prior
            written permission of the Company.
          </p>
          <p>
            Subject to your compliance with these Terms, the Company grants you a
            limited, non-exclusive, non-transferable, revocable licence to access and
            use the Website for your personal, non-commercial purposes. This licence
            does not include the right to reproduce, distribute, modify, create
            derivative works of, publicly display, publicly perform, republish,
            download, store, or transmit any of the material on the Website, except as
            may be incidentally necessary in the ordinary course of using the Website
            (e.g., browser caching).
          </p>
        </Section>

        {/* 11 --------------------------------------------------- */}
        <Section id="partner-clinics" number="11" title="Partner Clinics and Third-Party Service Providers">
          <p>
            The Platform connects users with a network of partner clinics and
            healthcare practitioners. Each partner clinic is an independently owned
            and operated medical practice; it is not a subsidiary, division, or agent
            of the Company.
          </p>
          <p>
            Diagnostic testing ordered through the Platform may be conducted by
            established third-party laboratories and imaging centres. The Company
            coordinates the logistics of testing but does not itself perform
            laboratory analyses or imaging studies.
          </p>
          <p>
            Certain features of the Platform may rely on technologies, services, or
            content provided by third parties. The listing or availability of any
            partner clinic, laboratory, or third-party service provider on or through
            the Website does not constitute an endorsement, guarantee, or warranty by
            the Company with respect to the quality, accuracy, or reliability of
            services provided by such third parties.
          </p>
        </Section>

        {/* 12 --------------------------------------------------- */}
        <Section id="no-reliance" number="12" title="No Reliance">
          <p>
            The content on the Website is provided for general information only. It is
            not intended to amount to advice on which you should rely. You must obtain
            professional or specialist advice before taking, or refraining from, any
            action on the basis of the content on the Website.
          </p>
          <p>
            Although the Company makes reasonable efforts to update the information on
            the Website, the Company makes no representations, warranties, or
            guarantees, whether express or implied, that the content on the Website is
            accurate, complete, or up to date.
          </p>
          <p>
            Biomarker panels and health assessments available through the Platform may
            include 200+ individual markers depending on the programme selected; the
            scope and composition of each panel may change without prior notice.
          </p>
          <p>
            Nothing in this section limits or excludes the professional obligations of
            any licensed clinician who provides clinical services through the Platform.
          </p>
        </Section>

        {/* 13 --------------------------------------------------- */}
        <Section id="privacy-data" number="13" title="Privacy, Data Protection, and Cookies">
          <p>
            You retain ownership of any personal data you submit through the Website.
            By submitting data, you grant the Company a limited, non-exclusive licence
            to use that data for the purposes described in the Company&rsquo;s{" "}
            <Link
              href="/privacy"
              className="text-gold hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <p>
            The Platform is designed to support compliance with applicable data
            protection and privacy legislation, including the Personal Information
            Protection and Electronic Documents Act (PIPEDA), the Personal Health
            Information Protection Act (PHIPA), and other relevant provincial,
            federal, and international privacy frameworks.
          </p>
          <p>
            The Website uses cookies and similar tracking technologies. By continuing
            to use the Website, you consent to the use of cookies in accordance with
            the Company&rsquo;s{" "}
            <Link
              href="/cookies"
              className="text-gold hover:underline"
            >
              Cookie Policy
            </Link>
            . You may manage your cookie preferences through your browser settings or
            through any cookie-consent mechanism provided on the Website.
          </p>
        </Section>

        {/* 14 --------------------------------------------------- */}
        <Section id="electronic-communications" number="14" title="Consent to Electronic Communications">
          <p>
            By providing your contact information through the Website, you consent to
            receive electronic communications from the Company, including but not
            limited to emails, text messages, and push notifications related to your
            use of the Platform, appointment confirmations, health-related updates,
            and promotional materials.
          </p>
          <p>
            The Company&rsquo;s electronic communications are designed to comply with
            Canada&rsquo;s Anti-Spam Legislation (CASL) and other applicable
            electronic messaging laws.
          </p>
          <p>
            You may withdraw your consent to receive promotional communications at any
            time by using the unsubscribe mechanism included in each communication or
            by contacting us at{" "}
            <a
              href="mailto:info@kairahealth.com"
              className="text-gold hover:underline"
            >
              info@kairahealth.com
            </a>
            . Withdrawal of consent to promotional communications does not affect
            transactional or service-related communications that are necessary for
            the operation of the Platform.
          </p>
        </Section>

        {/* 15 --------------------------------------------------- */}
        <Section id="consultation-booking" number="15" title="Consultation Booking and Inquiries">
          <p>
            Information submitted through consultation request forms, contact forms,
            or other inquiry mechanisms on the Website will be used by the Company to
            respond to your inquiry, schedule a consultation, or connect you with an
            appropriate clinician or partner clinic.
          </p>
          <p>
            By submitting such information, you consent to its collection, use, and
            storage in accordance with the Company&rsquo;s{" "}
            <Link
              href="/privacy"
              className="text-gold hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </Section>

        {/* 16 --------------------------------------------------- */}
        <Section id="third-party-websites" number="16" title="Third-Party Websites">
          <p>
            The Website may contain links or references to third-party websites,
            applications, or services that are not owned or controlled by the Company.
            If you choose to follow any such link, you do so at your own risk. The
            Company has no control over, and assumes no responsibility for, the
            content, privacy policies, or practices of any third-party website.
          </p>
          <p>
            You must not frame, mirror, or otherwise incorporate any part of the
            Website into any other website or application without the Company&rsquo;s
            prior written consent.
          </p>
        </Section>

        {/* 17 --------------------------------------------------- */}
        <Section id="geographic-restrictions" number="17" title="Geographic Restrictions">
          <p>
            The Company is based in the Province of Ontario, Canada. The Website and
            the Platform are not intended for use in any jurisdiction where such use
            would be contrary to applicable law or regulation.
          </p>
          <p>
            Clinical services available through the Platform are provided by licensed
            clinicians who are credentialed in the jurisdictions in which they
            practise. Virtual care services are offered only where permitted by
            applicable law and may be subject to additional terms, regulations, or
            restrictions imposed by the relevant regulatory authority.
          </p>
        </Section>

        {/* 18 --------------------------------------------------- */}
        <Section id="disclaimer-warranties" number="18" title="Disclaimer of Warranties">
          <div className="rounded-xl border border-teal/[0.15] bg-dark-surface p-6">
            <p className="text-base font-semibold leading-relaxed text-teal">
              THE WEBSITE AND ALL INFORMATION, CONTENT, MATERIALS, PRODUCTS, AND
              SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE
              WEBSITE ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS
              AVAILABLE&rdquo; BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER
              EXPRESS OR IMPLIED.
            </p>
          </div>
          <p className="font-semibold text-cream">
            NEITHER THE COMPANY NOR ANY PERSON ASSOCIATED WITH THE COMPANY MAKES ANY
            WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY,
            RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE WEBSITE.
          </p>
          <p className="font-semibold text-cream">
            THE FOREGOING DOES NOT AFFECT ANY WARRANTIES THAT CANNOT BE EXCLUDED OR
            LIMITED UNDER APPLICABLE LAW. TO THE FULLEST EXTENT PROVIDED BY LAW, THE
            COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS,
            IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY
            WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR A
            PARTICULAR PURPOSE.
          </p>
          <p className="font-semibold text-cream">
            THE COMPANY DOES NOT WARRANT THAT THE WEBSITE, ITS CONTENT, OR ANY
            SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE WILL BE ACCURATE,
            RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED,
            OR THAT THE WEBSITE OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF
            VIRUSES OR OTHER HARMFUL COMPONENTS.
          </p>
        </Section>

        {/* 19 --------------------------------------------------- */}
        <Section id="limitation-liability" number="19" title="Limitation on Liability">
          <div className="rounded-xl border border-teal/[0.15] bg-dark-surface p-6">
            <p className="text-base font-semibold leading-relaxed text-teal">
              TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE COMPANY, ITS
              AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS,
              OFFICERS, OR DIRECTORS BE LIABLE FOR ANY DAMAGES OF ANY KIND, UNDER ANY
              LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY
              TO USE, THE WEBSITE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE
              WEBSITE, OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL,
              INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED
              TO PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF
              REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS
              OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT
              (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF
              FORESEEABLE.
            </p>
          </div>
          <p className="font-semibold text-cream">
            IN NO EVENT SHALL THE COMPANY&rsquo;S TOTAL AGGREGATE LIABILITY TO YOU
            FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR USE OF
            THE WEBSITE EXCEED THE GREATER OF (A) CAD $100 OR (B) THE TOTAL AMOUNT
            YOU HAVE PAID TO THE COMPANY DURING THE TWELVE (12) MONTHS IMMEDIATELY
            PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
          </p>
          <p>
            Nothing in these Terms excludes or limits any liability that cannot be
            excluded or limited under applicable law, including liability for fraud or
            fraudulent misrepresentation.
          </p>
          <p>
            Nothing in these Terms limits or excludes your rights against any partner
            clinic, clinician, or third-party service provider that provides clinical
            services to you through the Platform. Any claims against such parties are
            governed by your separate agreement with that party and applicable law.
          </p>
        </Section>

        {/* 20 --------------------------------------------------- */}
        <Section id="indemnification" number="20" title="Indemnification">
          <p>
            You agree to defend, indemnify, and hold harmless the Company, its
            affiliates, licensors, and service providers, and its and their respective
            officers, directors, employees, contractors, agents, licensors, suppliers,
            successors, and assigns from and against any claims, liabilities, damages,
            judgments, awards, losses, costs, expenses, or fees (including reasonable
            legal fees) arising out of or relating to your violation of these Terms or
            your use of the Website, including but not limited to any use of the
            Website&rsquo;s content, services, and products other than as expressly
            authorised in these Terms, or your use of any information obtained from
            the Website.
          </p>
        </Section>

        {/* 21 --------------------------------------------------- */}
        <Section id="governing-law" number="21" title="Governing Law and Choice of Forum">
          <p>
            These Terms and any dispute or claim arising out of or in connection with
            them, their subject matter, or their formation (including non-contractual
            disputes or claims) shall be governed by and construed in accordance with
            the laws of the Province of Ontario and the federal laws of Canada
            applicable therein, without giving effect to any choice or conflict-of-law
            provision or rule.
          </p>
          <p>
            Any legal suit, action, or proceeding arising out of or related to these
            Terms or the Website shall be instituted exclusively in the courts of the
            Province of Ontario, Canada. You waive any and all objections to the
            exercise of jurisdiction over you by such courts and to venue in such
            courts.
          </p>
        </Section>

        {/* 22 --------------------------------------------------- */}
        <Section id="waiver" number="22" title="Waiver">
          <p>
            No failure or delay by the Company in exercising any right or remedy
            provided under these Terms or by law shall constitute a waiver of that
            right or remedy, nor shall it preclude or restrict the further exercise
            of that or any other right or remedy.
          </p>
        </Section>

        {/* 23 --------------------------------------------------- */}
        <Section id="severability" number="23" title="Severability">
          <p>
            If any provision of these Terms is held to be invalid, illegal, or
            unenforceable for any reason, such provision shall be eliminated or
            limited to the minimum extent necessary so that the remaining provisions
            of these Terms will continue in full force and effect.
          </p>
        </Section>

        {/* 24 --------------------------------------------------- */}
        <Section id="assignment" number="24" title="Assignment">
          <p>
            You may not assign or transfer these Terms, by operation of law or
            otherwise, without the Company&rsquo;s prior written consent. Any attempt
            by you to assign or transfer these Terms without such consent will be null
            and void. The Company may freely assign or transfer these Terms without
            restriction.
          </p>
        </Section>

        {/* 25 --------------------------------------------------- */}
        <Section id="no-third-party" number="25" title="No Third-Party Beneficiaries">
          <p>
            These Terms are intended solely for the benefit of the Company and you.
            Nothing in these Terms is intended to, nor shall it, confer any
            third-party beneficiary rights on any person or entity that is not a party
            to these Terms.
          </p>
        </Section>

        {/* 26 --------------------------------------------------- */}
        <Section id="survival" number="26" title="Survival">
          <p>
            The following sections of these Terms shall survive any termination or
            expiration: Section 3 (Medical Disclaimer), Section 5 (Analytical Tools
            and Artificial Intelligence), Section 10 (Intellectual Property Rights
            and Ownership), Section 12 (No Reliance), Section 18 (Disclaimer of
            Warranties), Section 19 (Limitation on Liability), Section 20
            (Indemnification), Section 21 (Governing Law and Choice of Forum),
            Section 25 (No Third-Party Beneficiaries), and this Section 26
            (Survival).
          </p>
        </Section>

        {/* 27 --------------------------------------------------- */}
        <Section id="language" number="27" title="Language">
          <p>
            The parties have expressly requested that these Terms and all related
            documents be drafted in English.
          </p>
          <p className="italic text-cream/60">
            Les parties aux pr&eacute;sentes confirment leur volont&eacute; que cette
            entente et tous les documents connexes soient r&eacute;dig&eacute;s en
            anglais seulement.
          </p>
        </Section>

        {/* 28 --------------------------------------------------- */}
        <Section id="entire-agreement" number="28" title="Entire Agreement">
          <p>
            These Terms, together with the{" "}
            <Link
              href="/privacy"
              className="text-gold hover:underline"
            >
              Privacy Policy
            </Link>{" "}
            and the{" "}
            <Link
              href="/cookies"
              className="text-gold hover:underline"
            >
              Cookie Policy
            </Link>
            , constitute the sole and entire agreement between you and the Company
            regarding the Website and supersede all prior and contemporaneous
            understandings, agreements, representations, and warranties, both written
            and oral, regarding the Website.
          </p>
          <p>
            If you enrol in clinical services through the Platform, a separate client
            services agreement will govern the terms of those clinical services. In
            the event of a conflict between these Terms and a client services
            agreement, the client services agreement shall prevail with respect to the
            clinical services.
          </p>
        </Section>

        {/* 29 --------------------------------------------------- */}
        <Section id="contact" number="29" title="Contact">
          <p>
            The Website is operated by Kaira Health. If you become aware of any
            misuse of the Website, or wish to report a violation of these Terms,
            please contact us at{" "}
            <a
              href="mailto:legal@kairahealth.ai"
              className="text-gold hover:underline"
            >
              legal@kairahealth.ai
            </a>
            .
          </p>
          <div className="rounded-xl border border-teal/[0.15] bg-dark-surface p-6 mt-2">
            <p className="text-cream font-medium">Kaira Health</p>
            <p className="mt-2">
              General inquiries:{" "}
              <a
                href="mailto:info@kairahealth.com"
                className="text-gold hover:underline"
              >
                info@kairahealth.com
              </a>
            </p>
            <p className="mt-1">
              Legal:{" "}
              <a
                href="mailto:legal@kairahealth.ai"
                className="text-gold hover:underline"
              >
                legal@kairahealth.ai
              </a>
            </p>
          </div>
          <p className="mt-4">
            All other feedback, comments, and requests for technical support may be
            directed to{" "}
            <a
              href="mailto:info@kairahealth.com"
              className="text-gold hover:underline"
            >
              info@kairahealth.com
            </a>
            .
          </p>
        </Section>

        {/* ---- Closing ---- */}
        <hr className="mt-14 border-t border-gold/10" />
        <p className="mt-6 text-sm text-muted/60 italic">
          These Terms of Service are provided for informational purposes and do not
          constitute legal advice. KAIRA Health recommends consulting with a
          qualified legal professional regarding your specific rights and
          obligations.
        </p>
      </div>

      <Footer />
    </main>
  )
}
