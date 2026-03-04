import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft, MapPin, ExternalLink, Clock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Clinic {
  name: string
  description: string
  address?: string
  website?: string
}

interface CityNetwork {
  city: string
  status: "active" | "coming-soon"
  year?: string
  clinics?: Clinic[]
}

const clinicNetwork: CityNetwork[] = [
  {
    city: "Toronto",
    status: "active",
    clinics: [
      {
        name: "RegenaLife",
        description:
          "MedAdvance functional medicine clinic offering comprehensive diagnostic panels, hormone optimization, and longevity-focused care.",
        address: "Toronto, ON",
        website: "https://regenalife.ca",
      },
      {
        name: "Venn Med (Intersected Health)",
        description:
          "Multi-disciplinary integrative medicine clinic co-founded by Dr. Elliot Jacobson. Specialising in functional medicine, with over 25 years of clinical experience.",
        address: "Toronto, ON",
        website: "https://vennmed.ca",
      },
      {
        name: "Hui Clinic",
        description:
          "Led by Dr. Melody Hui, MD, CCFP(EM), certified in longevity medicine through the American Academy of Anti-Aging and Regenerative Medicine. Focused on personalised health optimization.",
        address: "Toronto & Oakville, ON",
      },
      {
        name: "Marsden Centre",
        description:
          "Naturopathic and integrative medicine centre offering evidence-based approaches to cancer care, chronic disease management, and preventive health strategies.",
        address: "Toronto, ON",
        website: "https://marsdencentre.com",
      },
    ],
  },
  {
    city: "New York",
    status: "coming-soon",
    year: "2026",
  },
  {
    city: "Miami",
    status: "coming-soon",
    year: "2027",
  },
  {
    city: "Chicago",
    status: "coming-soon",
    year: "2027",
  },
  {
    city: "Bahrain",
    status: "coming-soon",
    year: "2027",
  },
]

export default function ClinicsPage() {
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
              Clinic Network
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-[1.1]">
              Our Partner{" "}
              <span className="text-gold">Clinics</span>
            </h1>
            <p className="mt-6 text-muted text-base md:text-lg leading-relaxed max-w-2xl">
              KAIRA Health partners with leading clinics to deliver consistent,
              physician-led preventive care. Our network is expanding across
              North America and the Middle East.
            </p>
          </div>

          {/* Clinic network by city */}
          <div className="space-y-12">
            {clinicNetwork.map((cityData) => (
              <div key={cityData.city}>
                {/* City header */}
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  <h2 className="font-serif text-2xl md:text-3xl text-cream">
                    {cityData.city}
                  </h2>
                  {cityData.status === "active" ? (
                    <span className="ml-2 rounded-full bg-gold/10 border border-gold/20 px-3 py-0.5 text-[10px] uppercase tracking-widest text-gold">
                      Active
                    </span>
                  ) : (
                    <span className="ml-2 rounded-full bg-cream/5 border border-cream/10 px-3 py-0.5 text-[10px] uppercase tracking-widest text-cream/40">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {cityData.year}
                    </span>
                  )}
                </div>

                {/* Active clinics */}
                {cityData.clinics && cityData.clinics.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cityData.clinics.map((clinic) => (
                      <div
                        key={clinic.name}
                        className="rounded-xl border border-[#1E3A5F] bg-dark-surface p-6 transition-all duration-300 hover:border-gold/20"
                      >
                        <h3 className="font-serif text-lg text-cream">
                          {clinic.name}
                        </h3>
                        {clinic.address && (
                          <p className="mt-1 text-xs text-gold/50">
                            {clinic.address}
                          </p>
                        )}
                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          {clinic.description}
                        </p>
                        {clinic.website && (
                          <a
                            href={clinic.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-1.5 text-xs text-gold/60 hover:text-gold transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Visit Website
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Coming soon city */
                  <div className="rounded-xl border border-dashed border-[#1E3A5F] bg-dark-surface/50 p-8 text-center">
                    <p className="text-muted text-sm">
                      Clinic partnerships in {cityData.city} are being
                      established. Expected launch: {cityData.year}.
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="mt-4 rounded-full border-gold/20 text-cream/60 hover:bg-gold/10 hover:text-cream"
                    >
                      <a
                        href="mailto:consulting@regenalife.ca"
                        className="inline-flex items-center gap-2"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        Contact Us About {cityData.city}
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-20 rounded-xl border border-gold/15 bg-gold/[0.04] p-8 text-center">
            <h3 className="font-serif text-2xl text-cream mb-3">
              Interested in Partnering?
            </h3>
            <p className="text-muted text-sm leading-relaxed max-w-lg mx-auto mb-6">
              If you represent a clinic or practice and are interested in joining
              the KAIRA Health network, we&apos;d like to hear from you.
            </p>
            <Button
              asChild
              className="rounded-full bg-gold text-dark hover:bg-gold/90 px-8 py-3 h-auto text-sm font-semibold cursor-pointer"
            >
              <a href="mailto:consulting@regenalife.ca">
                Get in Touch
              </a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
