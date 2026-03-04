import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const { firstName, lastName, email, phone, city, interest, message } = data

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "First name, last name, and email are required." },
        { status: 400 }
      )
    }

    // Build email body
    const emailBody = [
      `New Consultation Request from KAIRA Health`,
      ``,
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      city ? `City: ${city}` : null,
      interest ? `Area of Interest: ${interest}` : null,
      ``,
      message ? `Message:\n${message}` : null,
      ``,
      `---`,
      `Submitted via kairahealth.com`,
    ]
      .filter(Boolean)
      .join("\n")

    // Send via Resend if API key is configured, otherwise log
    const resendKey = process.env.RESEND_API_KEY

    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "KAIRA Health <noreply@kairahealth.com>",
          to: "consulting@regenalife.ca",
          subject: `Consultation Request: ${firstName} ${lastName}`,
          text: emailBody,
          reply_to: email,
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        console.error("Resend error:", err)
        // Still return success to the user — we'll capture via logs
      }
    } else {
      // No email service configured — log for now
      console.log("=== CONSULTATION REQUEST ===")
      console.log(emailBody)
      console.log("=== END ===")
      console.log("Note: Set RESEND_API_KEY to enable email delivery to consulting@regenalife.ca")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Consultation form error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
