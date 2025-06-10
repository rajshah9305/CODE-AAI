import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { QueryProvider } from '@/lib/providers/QueryProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AI Coding Assistant | Your Intelligent Programming Partner',
  description: 'A powerful AI-powered coding assistant that helps you write, debug, and optimize code with multiple AI providers including OpenAI, Anthropic, and more.',
  keywords: [
    'AI coding assistant',
    'programming help',
    'code generation',
    'OpenAI',
    'Anthropic',
    'Claude',
    'GPT-4',
    'developer tools',
    'coding help',
    'AI programming',
  ],
  authors: [{ name: 'AI Coding Assistant Team' }],
  creator: 'AI Coding Assistant',
  publisher: 'AI Coding Assistant',
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'AI Coding Assistant',
    description: 'Your intelligent programming partner powered by multiple AI providers',
    siteName: 'AI Coding Assistant',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Coding Assistant - Your Intelligent Programming Partner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Coding Assistant',
    description: 'Your intelligent programming partner powered by multiple AI providers',
    images: ['/og-image.png'],
    creator: '@aicodingassist',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'technology',
  classification: 'Developer Tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="relative flex min-h-screen flex-col bg-background">
              <div className="flex-1">
                {children}
              </div>
            </div>
            <Toaster
              position="top-right"
              expand={true}
              richColors
              closeButton
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'hsl(var(--background))',
                  color: 'hsl(var(--foreground))',
                  border: '1px solid hsl(var(--border))',
                },
              }}
            />
          </QueryProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
