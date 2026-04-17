import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-paper flex flex-col">
      {/* Nav */}
      <header className="max-w-5xl mx-auto w-full px-6 h-16 flex items-center justify-between">
        <span className="font-display text-2xl text-ink tracking-tight">
          Kardu<span className="text-accent">.</span>
        </span>
        <Link
          href="/study"
          className="text-sm font-body font-medium text-mist hover:text-accent transition-colors duration-150"
        >
          Study →
        </Link>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center gap-8">
        {/* Floating cards illustration */}
        <div className="relative w-64 h-48 sm:w-80 sm:h-56 mb-4" aria-hidden>
          {/* Back cards */}
          <div className="absolute left-4 top-6 w-44 sm:w-52 h-32 sm:h-36 bg-paper-card rounded-2xl border border-mist/20 shadow-md rotate-[-8deg] opacity-40" />
          <div className="absolute left-8 top-3 w-44 sm:w-52 h-32 sm:h-36 bg-paper-card rounded-2xl border border-mist/20 shadow-md rotate-[-4deg] opacity-70" />
          {/* Front card */}
          <div className="absolute left-6 top-0 w-44 sm:w-52 h-32 sm:h-36 bg-paper-card rounded-2xl border border-mist/15 shadow-xl flex flex-col items-center justify-center gap-2 animate-float">
            <div className="h-0.5 w-12 bg-accent rounded-full" />
            <p className="font-display text-3xl text-ink">こんにちは</p>
            <p className="text-xs text-mist">Hello</p>
          </div>
        </div>

        {/* Headline */}
        <div className="max-w-xl">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink leading-tight mb-4">
            Learn any language,
            <br />
            <span className="text-accent italic">one card at a time.</span>
          </h1>
          <p className="text-mist text-base sm:text-lg leading-relaxed max-w-md mx-auto">
            Kardu is a clean, distraction-free flashcard app for language learners.
            Study vocabulary, grammar, and phrases at your own pace.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/study"
          className="inline-flex items-center gap-2 bg-ink text-paper font-body font-medium px-8 py-4 rounded-xl text-base hover:bg-ink-soft active:scale-[0.97] transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Start studying
          <span aria-hidden>→</span>
        </Link>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl w-full mt-8 text-left">
          {[
            { icon: '🃏', title: 'Smart shuffle', desc: 'See every card before repeats' },
            { icon: '⌨️', title: 'Keyboard first', desc: 'Space to flip, arrow to next' },
            { icon: '🌐', title: 'Any language', desc: 'Japanese, Spanish, German & more' },
          ].map((f) => (
            <div key={f.title} className="bg-paper-card rounded-2xl p-5 border border-mist/10">
              <span className="text-2xl block mb-2">{f.icon}</span>
              <h3 className="font-body font-medium text-sm text-ink mb-1">{f.title}</h3>
              <p className="text-xs text-mist leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-mist/10 py-5">
        <p className="text-center text-xs text-mist/40 font-mono">
          Kardu · built with Next.js + Supabase
        </p>
      </footer>
    </div>
  )
}