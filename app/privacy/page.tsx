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
          Last modified: March 11, 2026
        </p>

        {/* ---- Divider ---- */}
        <hr className="mt-12 border-t border-gold/10" />

        {/* ---- Table of Contents ---- */}
        <nav className="mt-10 rounded-xl border border-teal/[0.15] bg-dark-surface p-6">
          <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-gold/60">
            Contents
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted">
            <li><a href="#introduction" className="hover:text-gold transition-colors">Introduction</a></li>
            <li><a href="#information-we-collect" className="hover:text-gold transition-colors">Information We Collect About You</a></li>
            <li><a href="#how-we-collect" className="hover:text-gold transition-colors">How We Collect Information About You</a></li>
            <li><a href="#cookies" className="hover:text-gold transition-colors">Information We Collect Through Cookies and Automatic Data Collection Technologies</a></li>
            <li><a href="#how-we-use" className="hover:text-gold transition-colors">How We Use Your Information</a></li>
            <li><a href="#ai-tools" className="hover:text-gold transition-colors">Use of Analytical Tools and Artificial Intelligence</a></li>
            <li><a href="#disclosure" className="hover:text-gold transition-colors">Disclosure of Your Information</a></li>
            <li><a href="#transferring" className="hover:text-gold transition-colors">Transferring Your Personal Information</a></li>
            <li><a href="#data-security" className="hover:text-gold transition-colors">Data Security</a></li>
            <li><a href="#breach-notification" className="hover:text-gold transition-colors">Breach Notification</a></li>
            <li><a href="#data-retention" className="hover:text-gold transition-colors">Data Retention</a></li>
            <li><a href="#account-closure" className="hover:text-gold transition-colors">Account Closure and Data Deletion</a></li>
            <li><a href="#choices" className="hover:text-gold transition-colors">Choices About How We Use and Disclose Your Information</a></li>
            <li><a href="#minors" className="hover:text-gold transition-colors">Minors</a></li>
            <li><a href="#accessing-correcting" className="hover:text-gold transition-colors">Accessing and Correcting Your Personal Information</a></li>
            <li><a href="#withdrawing-consent" className="hover:text-gold transition-colors">Withdrawing Your Consent</a></li>
            <li><a href="#changes" className="hover:text-gold transition-colors">Changes to Our Privacy Policy</a></li>
            <li><a href="#contact" className="hover:text-gold transition-colors">Contact Information and Challenging Compliance</a></li>
          </ol>
        </nav>

        {/* ==== Sections ==== */}

        {/* 1 ---------------------------------------------------- */}
        <Section id="introduction" number="1" title="Introduction">
          <p>
            Kaira Health (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy and is committed to protecting it by complying with this policy.
          </p>
          <p>
            This policy describes how we collect, use, disclose, and protect the personal information of our clients and website users (&ldquo;you&rdquo;), describes the types of information we may collect from you or that you may provide when you visit the website www.kairahealth.ai (our &ldquo;Website&rdquo;) or engage with our services, and our practices for collecting, using, maintaining, protecting, and disclosing that information.
          </p>
          <p>
            We will only use your personal information in accordance with this policy unless otherwise required by applicable law. We take steps to ensure that the personal information that we collect about you is adequate, relevant, not excessive, and used for limited purposes.
          </p>
          <p>
            Privacy laws in Canada generally define &ldquo;personal information&rdquo; as any information about an identifiable individual, which includes information that can be used on its own or with other information to identify, contact, or locate a single person. Where we collect personal health information within the meaning of the Personal Health Information Protection Act, 2004 (Ontario) (&ldquo;PHIPA&rdquo;), such information is subject to additional protections described in this policy.
          </p>
          <p>
            The Company operates as a health technology platform that facilitates access to clinical services delivered by independent partner clinics and healthcare providers. In certain circumstances, the Company may act as a service provider or agent to healthcare providers who are Health Information Custodians under PHIPA. Where the Company acts in this capacity, the personal health information it handles is subject to the custodianship and information practices of the relevant healthcare provider. Partner clinics that receive your personal health information through the Platform maintain separate custodianship of that information in accordance with their own obligations under applicable law.
          </p>
          <p>
            Different types of personal information require different types of consent. For non-sensitive information such as technical and browsing data, your consent may be implied through your use of the Website. For personal health information, genetic data, and other sensitive information, we will obtain your express consent at or before the time of collection, except where collection, use, or disclosure without consent is permitted or required by law.
          </p>

          {/* Sub-section: Guiding Principles */}
          <h3 className="mt-8 font-serif text-lg font-semibold text-cream">
            Our Guiding Privacy Principles
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>We do not sell your personal information or personal health information.</li>
            <li>We do not use your health data or genetic data for advertising purposes.</li>
            <li>We limit the personal information we collect to what is necessary to provide our services and improve the Platform.</li>
            <li>We limit how we share your health assessment results with third parties, and we require contractual protections from those who receive your information on our behalf.</li>
            <li>Clinical documentation and medical records relating to care delivered through partner clinics are maintained within the electronic medical record systems used by those clinics, not by the Company.</li>
          </ul>

          <p>
            This policy applies to information we collect, use, or disclose about you:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>On this Website.</li>
            <li>In email, text, and other electronic messages between you and this Website.</li>
            <li>When you schedule a consultation or engage with our services through the Website.</li>
            <li>Through any interaction with our partner clinics, laboratories, or imaging centres facilitated through the Platform.</li>
          </ul>

          <p>
            The Website may include links to third-party websites, plug-ins, services, social networks, or applications. Clicking on those links or enabling those connections may allow the third party to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy practices. When you leave our Website, we encourage you to read the privacy policy of every website you visit.
          </p>
          <p>
            Please read this policy carefully to understand our policies and practices regarding your information and how we will treat it. By accessing or using this Website, you indicate that you understand, accept, and consent to the practices described in this policy. This policy may change from time to time (see Section 17, &ldquo;Changes to Our Privacy Policy&rdquo;). Your continued use of this Website after we make changes indicates that you accept and consent to those changes, so please check the policy periodically for updates.
          </p>
        </Section>

        {/* 2 ---------------------------------------------------- */}
        <Section id="information-we-collect" number="2" title="Information We Collect About You">
          <p>
            We collect and use several types of information from and about you, including:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="text-cream font-medium">Personal information</span>{" "}
              &mdash; your name, postal address, email address, telephone number, date of birth, Internet Protocol (&ldquo;IP&rdquo;) address, and any other identifier by which you may be contacted online or offline.
            </li>
            <li>
              <span className="text-cream font-medium">Personal health information</span>{" "}
              &mdash; information relating to your physical or mental health, including health history, laboratory results, biomarker data, genomic or genetic data, clinical notes and assessments, and health analytics derived from such data. Personal health information is subject to the protections of PHIPA and PIPEDA, as applicable. This includes:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Health history and symptom information provided through intake forms or consultations.</li>
                <li>Laboratory and diagnostic test results, including bloodwork and imaging reports.</li>
                <li>Biomarker data and related wellness metrics.</li>
                <li>Genomic or genetic data obtained through partner testing services.</li>
                <li>Clinical notes, health assessments, and analytics generated through the Platform.</li>
              </ul>
            </li>
            <li>
              <span className="text-cream font-medium">Derived information</span>{" "}
              &mdash; inferences we may draw from your personal information and personal health information, including health status, preferences, or risk profile.
            </li>
            <li>
              <span className="text-cream font-medium">Demographic information</span>{" "}
              &mdash; age, date of birth, gender, and geographic location.
            </li>
            <li>
              <span className="text-cream font-medium">Non-personal information</span>{" "}
              &mdash; statistical or aggregated data that does not directly or indirectly reveal your identity. If we combine or connect non-personal information with your personal information so that it can directly or indirectly identify you, we treat the combined data as personal information.
            </li>
            <li>
              <span className="text-cream font-medium">Technical information</span>{" "}
              &mdash; login information, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform, and other technology identifiers on the devices you use to access the Website.
            </li>
            <li>
              <span className="text-cream font-medium">Website interaction details</span>{" "}
              &mdash; full Uniform Resource Locators (&ldquo;URLs&rdquo;), clickstream to, through, and from our Website (including date and time), page response times, download errors, length of visits to certain pages, page interaction information (such as scrolling, clicks, and mouse-overs), and methods used to browse away from the page.
            </li>
          </ul>
        </Section>

        {/* 3 ---------------------------------------------------- */}
        <Section id="how-we-collect" number="3" title="How We Collect Information About You">
          <p>
            We use different methods to collect your information, including through:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="text-cream font-medium">Direct interactions</span>{" "}
              &mdash; information you provide by filling in forms on our Website, creating an account, scheduling a consultation, completing health intake questionnaires, or corresponding with us by phone, email, or otherwise.
            </li>
            <li>
              <span className="text-cream font-medium">Your treating clinician or partner clinic</span>{" "}
              &mdash; where a healthcare provider delivers clinical services through the Platform, they may collect, create, or share personal health information with us in order to facilitate your care and the operation of the Platform.
            </li>
            <li>
              <span className="text-cream font-medium">Third-party healthcare providers</span>{" "}
              &mdash; with your consent, we may receive information from laboratories, imaging centres, or other healthcare providers involved in delivering services coordinated through the Platform.
            </li>
            <li>
              <span className="text-cream font-medium">Automated technologies or interactions</span>{" "}
              &mdash; as you navigate through our Website, we may automatically collect technical data about your equipment, browsing actions, and patterns using cookies, server logs, and other similar technologies.
            </li>
          </ul>
        </Section>

        {/* 4 ---------------------------------------------------- */}
        <Section id="cookies" number="4" title="Information We Collect Through Cookies and Automatic Data Collection Technologies">
          <p>
            As you navigate through and interact with our Website, we may use automatic data collection technologies to collect certain information about your equipment, browsing actions, and patterns, including details of your visits to our Website and information about your computer and internet connection.
          </p>
          <p>
            The technologies we use for this automatic data collection may include:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="text-cream font-medium">Cookies (or browser cookies)</span>{" "}
              &mdash; a cookie is a small file placed on the hard drive of your computer. You may refuse to accept browser cookies by activating the appropriate setting on your browser. However, if you select this setting, you may be unable to access certain parts of our Website. Unless you have adjusted your browser setting so that it will refuse cookies, our system will issue cookies when you direct your browser to our Website. For more information about the cookies we use, please see our{" "}
              <a href="/cookies" className="text-gold hover:underline">
                Cookie Policy
              </a>
              .
            </li>
            <li>
              <span className="text-cream font-medium">Web beacons</span>{" "}
              &mdash; pages of our Website may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages, to deliver a co-branded service, and for other related website statistics (for example, recording the popularity of certain website content and verifying system and server integrity).
            </li>
          </ul>
        </Section>

        {/* 5 ---------------------------------------------------- */}
        <Section id="how-we-use" number="5" title="How We Use Your Information">
          <p>
            We use information that we collect about you or that you provide to us, including any personal information and personal health information, to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Present our Website and its contents to you.</li>
            <li>Provide you with information, products, or services that you request from us.</li>
            <li>Schedule and coordinate consultations with partner clinics and healthcare providers.</li>
            <li>Facilitate health assessments, including the collection, analysis, and presentation of biomarker, laboratory, and genetic data.</li>
            <li>Fulfill the purposes for which you provided the information or that were described when it was collected, or any other purpose for which you provide it.</li>
            <li>Carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection.</li>
            <li>Notify you about changes to our Website, services, or any products or services we offer or provide through it.</li>
            <li>Improve our Website, services, marketing, and client relationships.</li>
            <li>Create de-identified, aggregated, or anonymised data sets for research, analytics, or service improvement purposes.</li>
            <li>In any other way we may describe when you provide the information.</li>
            <li>For any other purpose with your consent.</li>
          </ul>
          <p>
            We will not use your personal health information for advertising or marketing purposes. We may use non-identifiable, aggregated, or de-identified data for analytics and service improvement without restriction.
          </p>
        </Section>

        {/* 6 ---------------------------------------------------- */}
        <Section id="ai-tools" number="6" title="Use of Analytical Tools and Artificial Intelligence">
          <p>
            The Platform may use analytical tools and artificial intelligence (&ldquo;AI&rdquo;) technologies to assist clinicians in delivering care through the Platform. These tools are designed to support &mdash; not replace &mdash; clinical judgment by healthcare providers. Uses may include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Organising and presenting health data, biomarker trends, and lab results to facilitate clinical review.</li>
            <li>Generating health summaries, risk indicators, or suggested areas of inquiry based on your health information.</li>
            <li>Assisting in the preparation of reports or follow-up recommendations that are reviewed and approved by a clinician.</li>
          </ul>
          <p>
            These tools do not independently diagnose, treat, or prescribe. All clinical decisions are made by licensed healthcare providers. No decisions with legal or similarly significant effects are made solely through automated means without meaningful human involvement.
          </p>
          <p>
            De-identified or aggregated data may be used to improve the accuracy and performance of these tools. We will not use identifiable personal health information to train AI or machine learning models without your explicit consent.
          </p>
        </Section>

        {/* 7 ---------------------------------------------------- */}
        <Section id="disclosure" number="7" title="Disclosure of Your Information">
          <p>
            We may disclose personal information that we collect or that you provide as described in this privacy policy:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="text-cream font-medium">To deliver clinical and health services</span>{" "}
              &mdash; to partner clinics, laboratories, imaging centres, and other healthcare providers who are involved in delivering services you have requested or consented to through the Platform. Where a partner clinic acts as a Health Information Custodian under PHIPA, disclosure of your personal health information to that clinic is made in accordance with applicable law and the consent you have provided.
            </li>
            <li>
              <span className="text-cream font-medium">To your designated providers</span>{" "}
              &mdash; to your family physician or other healthcare providers you designate for purposes of continuity of care, with your consent.
            </li>
            <li>
              <span className="text-cream font-medium">To support business operations</span>{" "}
              &mdash; to our subsidiaries and affiliates, to contractors, service providers, and other third parties we use to support our business and who are bound by contractual obligations to keep personal information confidential and use it only for the purposes for which we disclose it to them.
            </li>
            <li>
              <span className="text-cream font-medium">To a buyer or successor</span>{" "}
              &mdash; to a buyer or other successor in the event of a merger, divestiture, restructuring, reorganisation, dissolution, or other sale or transfer of some or all of the Company&rsquo;s assets, in which personal information held by the Company about our Website users is among the assets transferred.
            </li>
            <li>
              <span className="text-cream font-medium">As required by law</span>{" "}
              &mdash; to comply with any court order, law, or legal process, including responding to any government or regulatory request, in accordance with applicable law.
            </li>
            <li>
              <span className="text-cream font-medium">With your consent</span>{" "}
              &mdash; for any other purpose disclosed by us when you provide the information, or with your consent.
            </li>
          </ul>
          <p>
            We do not sell your personal information or personal health information to third parties.
          </p>
        </Section>

        {/* 8 ---------------------------------------------------- */}
        <Section id="transferring" number="8" title="Transferring Your Personal Information">
          <p>
            The Company is based in Ontario, Canada. The information we collect from you may be stored on servers located in Canada or in other jurisdictions where our service providers operate.
          </p>
          <p>
            If you are accessing our Website from a jurisdiction outside of Canada, please be aware that your information may be transferred to, stored, and processed in Canada or other jurisdictions that may have different data protection rules than those of your jurisdiction.
          </p>
          <p>
            Where your personal information is transferred to a foreign jurisdiction, we take reasonable steps to ensure it is protected through contractual safeguards, data processing agreements, and compliance with applicable privacy legislation.
          </p>
          <p>
            By using the Website and providing your information, you consent to the transfer of your information to Canada and other jurisdictions as described in this policy.
          </p>
        </Section>

        {/* 9 ---------------------------------------------------- */}
        <Section id="data-security" number="9" title="Data Security">
          <p>
            We have implemented physical, electronic, and administrative measures designed to secure your personal information from accidental loss and from unauthorised access, use, alteration, and disclosure.
          </p>
          <p>
            The safety and security of your information also depends on you. Where we have given you (or where you have chosen) a password for access to certain parts of our Website, you are responsible for keeping this password confidential. We ask you not to share your password with anyone.
          </p>
          <p>
            Unfortunately, the transmission of information via the internet is not completely secure. Although we take reasonable steps to protect your personal information, we cannot guarantee the security of your personal information transmitted to our Website. Any transmission of personal information is at your own risk. We are not responsible for circumvention of any privacy settings or security measures contained on the Website.
          </p>
        </Section>

        {/* 10 --------------------------------------------------- */}
        <Section id="breach-notification" number="10" title="Breach Notification">
          <p>
            In the event of a breach of security safeguards involving your personal information that creates a real risk of significant harm to you, we will notify you and, where required, the relevant privacy commissioner or regulatory authority, in accordance with applicable law.
          </p>
          <p>
            Where a breach involves personal health information subject to PHIPA, we will comply with the breach notification requirements applicable to health information custodians or their agents, as the case may be.
          </p>
        </Section>

        {/* 11 --------------------------------------------------- */}
        <Section id="data-retention" number="11" title="Data Retention">
          <p>
            We retain your personal information only for as long as is necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements.
          </p>
          <p>
            Personal health information and clinical records associated with care delivered through partner clinics are subject to the retention policies of the applicable Health Information Custodian. In general, health records are retained for a minimum of ten (10) years from the date of the last entry, or longer where required by applicable law or professional regulatory standards.
          </p>
          <p>
            We may anonymise your personal information (so that it can no longer be associated with you) for research or statistical purposes. We may use anonymised information indefinitely without further notice to you.
          </p>
          <p>
            When your personal information is no longer required, we will securely delete or de-identify it in accordance with our data governance practices.
          </p>
        </Section>

        {/* 12 --------------------------------------------------- */}
        <Section id="account-closure" number="12" title="Account Closure and Data Deletion">
          <p>
            If you wish to close your account or request the deletion of your personal information, you may contact us at{" "}
            <a
              href="mailto:info@kairahealth.com"
              className="text-gold hover:underline"
            >
              info@kairahealth.com
            </a>
            . Upon receiving a verified request, we will take reasonable steps to delete or de-identify your personal information from our active systems, subject to any legal or regulatory retention requirements.
          </p>
          <p>
            Please note that personal health information held by partner clinics as Health Information Custodians is subject to their own retention obligations under applicable law. We are unable to delete records maintained by third-party custodians on your behalf.
          </p>
          <p>
            We may continue to use de-identified or aggregated data derived from your information for analytics and service improvement purposes after account closure.
          </p>
        </Section>

        {/* 13 --------------------------------------------------- */}
        <Section id="choices" number="13" title="Choices About How We Use and Disclose Your Information">
          <p>
            We strive to provide you with choices regarding the personal information you provide to us. The following mechanisms give you control over your information:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="text-cream font-medium">Tracking technologies and cookies</span>{" "}
              &mdash; you can set your browser to refuse all or some browser cookies or to alert you when cookies are being sent. If you disable or refuse cookies, please note that some parts of the Website may become inaccessible or not function properly. For more information, please see our{" "}
              <a href="/cookies" className="text-gold hover:underline">
                Cookie Policy
              </a>
              .
            </li>
            <li>
              <span className="text-cream font-medium">Marketing and promotional communications</span>{" "}
              &mdash; in compliance with Canada&rsquo;s Anti-Spam Legislation (&ldquo;CASL&rdquo;), we will only send you commercial electronic messages where we have obtained your express or implied consent. You may opt out of receiving marketing communications at any time by following the unsubscribe instructions included in each message or by contacting us at{" "}
              <a
                href="mailto:info@kairahealth.com"
                className="text-gold hover:underline"
              >
                info@kairahealth.com
              </a>
              . Opting out of marketing communications does not affect transactional or service-related messages.
            </li>
            <li>
              <span className="text-cream font-medium">Do Not Track signals</span>{" "}
              &mdash; some browsers include a &ldquo;Do Not Track&rdquo; (&ldquo;DNT&rdquo;) feature that signals to websites that you do not wish to have your online activity tracked. At this time, our Website does not respond to DNT signals. We will update this policy if our practices change in the future.
            </li>
          </ul>
        </Section>

        {/* 14 --------------------------------------------------- */}
        <Section id="minors" number="14" title="Minors">
          <p>
            Our Website and services are not intended for individuals under the age of eighteen (18) or under the age of majority in their jurisdiction of residence. We do not knowingly collect personal information from minors. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us at{" "}
            <a
              href="mailto:info@kairahealth.com"
              className="text-gold hover:underline"
            >
              info@kairahealth.com
            </a>
            , and we will take steps to delete such information from our records.
          </p>
        </Section>

        {/* 15 --------------------------------------------------- */}
        <Section id="accessing-correcting" number="15" title="Accessing and Correcting Your Personal Information">
          <p>
            You have the right to access the personal information we hold about you and to request that we correct any inaccurate or incomplete information. To make an access or correction request, please contact us at{" "}
            <a
              href="mailto:info@kairahealth.com"
              className="text-gold hover:underline"
            >
              info@kairahealth.com
            </a>
            .
          </p>
          <p>
            We will respond to your request within thirty (30) days of receipt, or within such other timeframe as may be required by applicable law. We may charge a reasonable fee for access requests where permitted by law, and we will provide advance notice of any such fee.
          </p>
          <p>
            We may not be able to accommodate a request to change information if we believe the change would violate any law or legal requirement, or if it would cause the information to be incorrect. Certain exceptions under applicable privacy legislation may also apply.
          </p>
          <p>
            Where your personal health information is held by a partner clinic acting as a Health Information Custodian, access and correction requests relating to clinical records should be directed to that clinic.
          </p>
        </Section>

        {/* 16 --------------------------------------------------- */}
        <Section id="withdrawing-consent" number="16" title="Withdrawing Your Consent">
          <p>
            You have the right to withdraw your consent to our collection, use, or disclosure of your personal information at any time, subject to legal or contractual restrictions and reasonable notice.
          </p>
          <p>
            If you withdraw your consent, we may not be able to provide you with certain products or services. We will explain the impact of withdrawing your consent at the time of your request.
          </p>
          <p>
            To withdraw your consent, please contact us at{" "}
            <a
              href="mailto:info@kairahealth.com"
              className="text-gold hover:underline"
            >
              info@kairahealth.com
            </a>
            .
          </p>
        </Section>

        {/* 17 --------------------------------------------------- */}
        <Section id="changes" number="17" title="Changes to Our Privacy Policy">
          <p>
            We may update this privacy policy from time to time. If we make material changes to how we treat our users&rsquo; personal information, we will post the new privacy policy on this page with a notice that the privacy policy has been updated and, where appropriate, notify you by email or through a notice on the Website home page.
          </p>
          <p>
            The date the privacy policy was last revised is identified at the top of the page. You are responsible for periodically visiting our Website and this privacy policy to check for any changes.
          </p>
        </Section>

        {/* 18 --------------------------------------------------- */}
        <Section id="contact" number="18" title="Contact Information and Challenging Compliance">
          <p>
            The Company has designated a Privacy Officer who is accountable for our compliance with this policy and applicable privacy legislation. If you have questions, concerns, or complaints about our privacy practices, or if you wish to make an access, correction, or consent withdrawal request, please contact us:
          </p>
          <div className="rounded-xl border border-teal/[0.15] bg-dark-surface p-6 mt-2">
            <p className="text-cream font-medium">KAIRA Health &mdash; Privacy Officer</p>
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
            We have procedures in place to receive and respond to complaints or inquiries about our handling of personal information, our compliance with this policy, and with applicable privacy laws. To discuss our compliance with this policy, please contact our Privacy Officer using the contact information listed above.
          </p>
          <p>
            If you are not satisfied with our response, you may have the right to lodge a complaint with the applicable privacy commissioner or data protection authority in your jurisdiction.
          </p>
        </Section>

        {/* ---- Closing ---- */}
        <hr className="mt-14 border-t border-gold/10" />
        <p className="mt-6 text-sm text-muted/60 italic">
          This Privacy Policy does not constitute legal advice. Kaira Health
          recommends consulting with a qualified legal professional regarding
          your specific privacy obligations.
        </p>
      </div>

      <Footer />
    </main>
  )
}
