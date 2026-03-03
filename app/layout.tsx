import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
// import { Syne } from 'next/font/google' // kept for easy A/B comparison
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'KAIRA Health | See More. Miss Less.',
  description:
    'KAIRA Health combines advanced diagnostics with AI-supported analysis and physician-led concierge care — delivering a comprehensive view of your health so that risks can be identified early and addressed proactively.',
  keywords: [
    'preventive healthcare',
    'longevity medicine',
    'AI diagnostics',
    'functional medicine',
    'KAIRA Health',
    'early detection',
    'concierge medicine',
    'health optimization',
  ],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A1628',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
