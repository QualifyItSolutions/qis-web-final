import type { Metadata } from 'next'
import '../styles/globals.css'
import { AuthProvider } from '../lib/auth-context'
import { ErrorBoundary } from '../components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'Qualify IT Solutions',
  description: 'Pharmaceutical consulting website - Expert validation, compliance, and engineering services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans bg-white text-neutral-900 antialiased">
        <ErrorBoundary>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}


