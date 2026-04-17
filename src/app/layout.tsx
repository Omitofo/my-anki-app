import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { BackgroundProvider } from '@/components/ui/BackgroundProvider'

export const metadata: Metadata = {
  title: 'Kardu — Language Flashcards',
  description: 'Study languages with smart flashcard decks. Vocabulary, grammar, and phrases.',
  keywords: ['flashcards', 'language learning', 'Japanese', 'vocabulary', 'anki'],
  openGraph: {
    title: 'Kardu — Language Flashcards',
    description: 'Study languages with smart flashcard decks.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <BackgroundProvider />
        <div className="relative z-10">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  )
}