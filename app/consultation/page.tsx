"use client"

import { useState } from "react"
import { ArrowLeft, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { KairaLogo } from "@/components/kaira-logo"

const cityOptions = [
  "Toronto",
  "New York",
  "Miami",
  "Chicago",
  "Bahrain",
  "Other",
]

const interestOptions = [
  "Comprehensive Health Assessment",
  "Longevity & Preventive Medicine",
  "AI-Supported Diagnostics",
  "Executive Health Program",
  "Specialist Referral",
  "General Inquiry",
]

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    interest: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    setErrorMsg("")

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Something went wrong")
      }

      setStatus("success")
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (status === "success") {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-dark flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <CheckCircle className="h-16 w-16 text-gold mx-auto mb-6" strokeWidth={1.5} />
            <h1 className="font-serif text-3xl text-cream mb-4">
              Thank You
            </h1>
            <p className="text-muted text-base leading-relaxed mb-8">
              Your consultation request has been received. A member of the KAIRA
              Health team will be in touch within 24-48 hours.
            </p>
            <Button asChild variant="outline" className="rounded-full border-gold/20 text-cream hover:bg-gold/10">
              <a href="/" className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Return Home
              </a>
            </Button>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-dark pt-32 pb-20 px-6">
        <div className="mx-auto max-w-2xl">
          {/* Back link */}
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-cream transition-colors mb-10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </a>

          {/* Header */}
          <div className="mb-12">
            <KairaLogo size={32} />
            <h1 className="font-serif text-3xl md:text-4xl text-cream mt-8 leading-tight">
              Schedule Your Consultation
            </h1>
            <p className="text-muted text-base leading-relaxed mt-4 max-w-lg">
              Complete the form below and a member of our team will reach out to
              discuss your health goals and how KAIRA can support you.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-xs uppercase tracking-[0.15em] text-gold/50 mb-2">
                  First Name *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-teal/[0.15] bg-dark-surface px-4 py-3 text-sm text-cream placeholder:text-muted/40 focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors"
                  placeholder="First name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-xs uppercase tracking-[0.15em] text-gold/50 mb-2">
                  Last Name *
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-teal/[0.15] bg-dark-surface px-4 py-3 text-sm text-cream placeholder:text-muted/40 focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors"
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-[0.15em] text-gold/50 mb-2">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-teal/[0.15] bg-dark-surface px-4 py-3 text-sm text-cream placeholder:text-muted/40 focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors"
                placeholder="you@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-xs uppercase tracking-[0.15em] text-gold/50 mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-teal/[0.15] bg-dark-surface px-4 py-3 text-sm text-cream placeholder:text-muted/40 focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            {/* City + Interest row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-xs uppercase tracking-[0.15em] text-gold/50 mb-2">
                  Preferred City
                </label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-teal/[0.15] bg-dark-surface px-4 py-3 text-sm text-cream focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors appearance-none"
                >
                  <option value="" className="bg-dark-surface text-muted">Select a city</option>
                  {cityOptions.map((city) => (
                    <option key={city} value={city} className="bg-dark-surface text-cream">
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="interest" className="block text-xs uppercase tracking-[0.15em] text-gold/50 mb-2">
                  Area of Interest
                </label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-teal/[0.15] bg-dark-surface px-4 py-3 text-sm text-cream focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors appearance-none"
                >
                  <option value="" className="bg-dark-surface text-muted">Select an area</option>
                  {interestOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-dark-surface text-cream">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-xs uppercase tracking-[0.15em] text-gold/50 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-lg border border-teal/[0.15] bg-dark-surface px-4 py-3 text-sm text-cream placeholder:text-muted/40 focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors resize-none"
                placeholder="Tell us about your health goals or questions..."
              />
            </div>

            {/* Error message */}
            {status === "error" && (
              <p className="text-red-400 text-sm">{errorMsg}</p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-lg bg-gold text-dark hover:bg-gold/90 py-3 h-auto text-sm font-semibold tracking-wide transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              {status === "submitting" ? (
                <span className="inline-flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-dark/30 border-t-dark" />
                  Submitting...
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Submit Consultation Request
                </span>
              )}
            </Button>

            <p className="text-muted/50 text-xs text-center">
              Your information is kept confidential and will only be used to
              arrange your consultation.
            </p>
          </form>
        </div>
      </main>
    </>
  )
}
