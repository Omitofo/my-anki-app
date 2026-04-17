import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-paper flex flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="text-6xl animate-float">🃏</span>
      <div>
        <h1 className="font-display text-4xl text-ink mb-2">404</h1>
        <p className="text-mist">This page doesn't exist — maybe it got shuffled away.</p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-ink text-paper font-body font-medium px-6 py-3 rounded-xl text-sm hover:bg-ink-soft transition-colors duration-200"
      >
        ← Back home
      </Link>
    </div>
  )
}