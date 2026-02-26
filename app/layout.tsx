import type { Metadata, Viewport } from 'next'
import { Inter, Syne } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'KAIRA Health | See Everything. Miss Nothing.',
  description:
    'KAIRA Health combines the world\'s most advanced diagnostics with AI-powered analysis and physician-led concierge care. The most important medical discovery is the one that happens before you need it.',
  keywords: [
    'preventative healthcare',
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
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
