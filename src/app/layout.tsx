import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}