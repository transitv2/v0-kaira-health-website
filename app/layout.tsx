import type { Metadata, Viewport } from 'next'
import { Montserrat, Cormorant } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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
    <html lang="en" className={`${montserrat.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
