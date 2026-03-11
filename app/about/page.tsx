"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft, Linkedin, ChevronDown } from "lucide-react"

interface TeamMember {
  name: string
  role: string
  bio: string
  image?: string
  linkedin?: string
  pending?: boolean
}

const leadership: TeamMember[] = [
  {
    name: "Umar Syed",
    role: "Chief Executive Officer (CEO)",
    bio: "Umar Syed is a healthcare and life sciences executive with more than 25 years of experience across the pharmaceutical, biotechnology, and healthcare sectors. As Chief Executive Officer of KAIRA Health, he leads the organization\u2019s strategic development and operational growth, guiding the expansion of a preventive health platform designed to integrate advanced diagnostics, physician expertise, and data-driven health insights.\n\nMr. Syed has co-founded and led several life sciences companies spanning drug development, biotechnology, and healthcare innovation. Through these ventures he has played key roles in building organizations from early-stage concepts through clinical development, regulatory engagement, and commercial growth.\n\nHe holds a Bachelor of Science in Pharmacy and is a post-graduate trained clinical and industrial pharmacist. He also earned an MBA from the Richard Ivey School of Business, where his training focused on strategy, finance, and leadership within complex healthcare markets.\n\nAt KAIRA Health, Mr. Syed brings together his background in life sciences innovation and healthcare entrepreneurship to support the development of a modern preventive health platform. His leadership is focused on building an organization that connects advanced medical diagnostics with physician-led care models aimed at improving how individuals understand and manage their health over time.",
    image: "/images/team/umar-syed.png",
  },
  {
    name: "Dr. Kristy Prouse",
    role: "Chief Medical Officer (CMO)",
    bio: "Dr. Kristy Prouse is an obstetrician\u2013gynecologist and physician leader with a focus on women\u2019s health, preventive medicine, and innovative models of healthcare delivery. As Chief Medical Officer of KAIRA Health, she provides clinical leadership for the organization\u2019s preventive health framework, guiding the medical strategy, clinical standards, and physician governance that underpin the platform.\n\nDr. Prouse brings extensive experience in medical governance and oversight across multidisciplinary clinical environments. Her work has included developing clinical protocols, supporting physician and practitioner teams, and helping design care models that responsibly integrate advanced diagnostics and emerging health technologies within evidence-based medical practice.\n\nAt KAIRA Health, Dr. Prouse\u2019s role is focused on clinical oversight, program development, and maintaining the medical integrity of the platform. She works closely with the organization\u2019s physician network to ensure that KAIRA\u2019s preventive health programs are delivered according to rigorous clinical and ethical standards.\n\nIn addition to her leadership roles, Dr. Prouse has been actively involved in initiatives aimed at advancing preventive and longevity-focused healthcare. Her work centers on bridging traditional medical expertise with evolving diagnostic capabilities in ways that support earlier insight into health risks while maintaining patient safety and professional accountability.\n\nThrough her role at KAIRA Health, Dr. Prouse helps guide the organization\u2019s commitment to delivering thoughtful, physician-directed preventive health programs designed to help individuals better understand and manage their health over time.",
    image: "/images/team/kristy-prouse.png",
  },
  {
    name: "Michael Farley, PhD",
    role: "VP, Corporate Development",
    bio: "Michael leads corporate and business development at KAIRA Health working with investors, clinics and diagnostic partners to accelerate the company\u2019s global expansion plans. Michael co-founded several companies and advised on $US 150M in life science transactions in Canada, United States and Europe. During the 1990s he managed technology investment programs at the Canadian Foreign Affairs Department.",
    image: "/images/team/michael-farley.png",
  },
]

const consultants: TeamMember[] = [
  {
    name: "Nate Hough",
    role: "Technology",
    bio: "Nate Hough is a seasoned technology executive with over nine years of experience building and scaling high-growth companies. He currently serves as a transit technology executive at Velocia, where, as Chief Operating Officer, he leads customer success initiatives and scales the company\u2019s solutions. Previously, Nate co-founded Evolution Optiks, an ophthalmology device manufacturer, where he played a pivotal role in the company\u2019s foundational growth and strategic success, establishing a strong track record of leadership in the health-tech space.",
    image: "/images/team/nate-hough.png",
  },
  {
    name: "Eric Feist",
    role: "Legal",
    bio: "Eric Feist (B.A., LL.B.) is a business-focused legal advisor licensed in Quebec and Ontario, with extensive experience in corporate and commercial law spanning the healthcare, technology, and SaaS sectors. He provides strategic counsel on contracts, governance, compliance, and commercial operations across jurisdictions. Eric has built legal functions and operational frameworks from the ground up, bringing depth in cross-border transactions and high-growth environments.",
    image: "/images/team/eric-feist.png",
  },
]

function TeamCard({ member }: { member: TeamMember }) {
  const paragraphs = member.bio.split("\n\n")
  const hasMultipleParagraphs = paragraphs.length > 1
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="group relative rounded-xl border border-teal/[0.15] bg-dark-surface p-6 transition-all duration-300 hover:border-gold/20">
      {/* Photo */}
      <div className="mb-5 flex justify-center">
        {member.image && !member.pending ? (
          <div className="h-40 w-40 overflow-hidden rounded-full border-2 border-gold/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={member.image}
              alt={member.name}
              className="h-full w-full object-cover object-top"
            />
          </div>
        ) : (
          <div className="flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-full bg-[#0F1A2E] text-muted/40">
            <span className="font-serif text-3xl text-gold/40">
              {member.name.charAt(0)}
            </span>
            {member.pending && (
              <span className="text-[10px] uppercase tracking-widest text-gold/30">
                Coming soon
              </span>
            )}
          </div>
        )}
      </div>

      {/* Info */}
      <h3 className="font-serif text-xl text-cream">{member.name}</h3>
      <p className="mt-1 text-xs uppercase tracking-[0.15em] text-gold/60">
        {member.role}
      </p>

      {/* Bio with paragraph breaks and expand/collapse */}
      <div className="mt-4">
        {hasMultipleParagraphs ? (
          <>
            {/* First paragraph always visible */}
            <p className="text-sm leading-relaxed text-muted">
              {paragraphs[0]}
            </p>

            {/* Remaining paragraphs — collapsed by default */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expanded ? "max-h-[2000px] opacity-100 mt-3" : "max-h-0 opacity-0"
              }`}
            >
              {paragraphs.slice(1).map((paragraph, i) => (
                <p
                  key={i}
                  className="text-sm leading-relaxed text-muted mt-3 first:mt-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Toggle button */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-gold/60 hover:text-gold transition-colors cursor-pointer"
            >
              {expanded ? "Show less" : "Read more"}
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </>
        ) : (
          <p className="text-sm leading-relaxed text-muted">
            {member.bio}
          </p>
        )}
      </div>

      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-gold/50 hover:text-gold transition-colors"
        >
          <Linkedin className="h-3.5 w-3.5" />
          LinkedIn
        </a>
      )}
    </div>
  )
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-dark pt-32 pb-20 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Back link */}
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-cream transition-colors mb-10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </a>

          {/* Header */}
          <div className="mb-16 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-5">
              About Us
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-[1.1]">
              The Team Behind{" "}
              <span className="text-gold">KAIRA Health</span>
            </h1>
            <p className="mt-6 text-muted text-base md:text-lg leading-relaxed max-w-2xl">
              KAIRA Health was founded by a team of physicians, technologists,
              and strategic advisors united by a shared conviction: that
              preventive medicine should be comprehensive, data-driven, and
              accessible to those who seek it.
            </p>
          </div>

          {/* Leadership */}
          <div className="mb-20">
            <h2 className="text-xs uppercase tracking-[0.2em] text-gold/50 mb-8">
              Leadership
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {leadership.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </div>

          {/* Consultants */}
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] text-gold/50 mb-8">
              Advisors & Consultants
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultants.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
