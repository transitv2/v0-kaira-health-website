import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft, Linkedin } from "lucide-react"

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
    name: "Nate Hough",
    role: "Founder & CEO",
    bio: "Nate brings a background in health technology and business strategy to KAIRA Health. With experience across clinical operations, digital health platforms, and corporate development, he founded KAIRA to bridge the gap between advanced diagnostics and accessible, physician-led preventive care.",
    image: "/images/team/nate-hough.jpg",
  },
  {
    name: "Kristy",
    role: "Co-Founder & COO",
    bio: "Kristy oversees clinical operations and client experience at KAIRA Health. With deep expertise in healthcare administration and patient-centred program design, she ensures every client interaction reflects the rigour and warmth that define the KAIRA standard.",
    image: "/images/team/kristy.jpg",
  },
  {
    name: "Farley",
    role: "VP, Corporate Development",
    bio: "Farley leads corporate development and strategic partnerships at KAIRA Health, working to expand the clinic network and build relationships with leading diagnostic and technology partners across North America and the Middle East.",
    pending: true,
  },
]

const consultants: TeamMember[] = [
  {
    name: "You",
    role: "Consultant — Technology",
    bio: "Technology strategy consultant advising KAIRA Health on platform architecture, AI-supported analytics infrastructure, and digital health integrations. Focused on building scalable systems that support physician-led care with data-driven precision.",
    pending: true,
  },
  {
    name: "Eric",
    role: "Consultant — Legal",
    bio: "Legal counsel advising KAIRA Health on regulatory compliance, healthcare privacy law (PIPEDA/PHIPA, HIPAA), corporate structuring, and cross-border operational requirements across North American and Middle Eastern markets.",
    pending: true,
  },
]

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="group relative rounded-xl border border-[#2A2A2A] bg-dark-surface p-6 transition-all duration-300 hover:border-gold/20">
      {/* Photo */}
      <div className="mb-5 h-48 w-full overflow-hidden rounded-lg bg-[#1A1A1A] flex items-center justify-center">
        {member.image && !member.pending ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.image}
            alt={member.name}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted/40">
            <div className="h-16 w-16 rounded-full bg-gold/10 flex items-center justify-center">
              <span className="font-serif text-2xl text-gold/40">
                {member.name.charAt(0)}
              </span>
            </div>
            {member.pending && (
              <span className="text-[10px] uppercase tracking-widest text-gold/30">
                Photo coming soon
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
      <p className="mt-4 text-sm leading-relaxed text-muted">
        {member.bio}
      </p>

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

          {/* Note about pending content */}
          <div className="mt-16 rounded-xl border border-gold/10 bg-gold/[0.03] p-6">
            <p className="text-sm text-cream/60 leading-relaxed">
              <span className="text-gold font-medium">Note:</span>{" "}
              Photos and full bios for Farley, Eric, and the Technology Consultant
              are being finalised. Please send headshots and bios to Nate for
              inclusion.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
