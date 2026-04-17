# 🃏 Kardu — Language Flashcard App

A clean, fast flashcard app for learning languages. Think Anki, but web-based and minimal.

---

## What is this?

You pick a **language** → a **category** (like Vocabulary or Grammar) → a **deck** → and then you study flashcards one by one.

- Cards have a **front** (the word/phrase), a **back** (the answer), and optionally an **example sentence**.
- Click or press **Space** to flip a card. Press **→** or **Enter** to go to the next one.
- The app remembers which cards you've seen in your session, so you don't get repeats until you've seen them all.

---

## Tech stack

| Thing | What it does |
|-------|-------------|
| [Next.js 15](https://nextjs.org) | The web framework (pages, routing, API) |
| [Tailwind CSS](https://tailwindcss.com) | Styling — utility classes |
| [Supabase](https://supabase.com) | Database (PostgreSQL) + hosting for your data |
| [React Query](https://tanstack.com/query) | Fetching and caching data from the DB |
| [Zustand](https://zustand-demo.pmnd.rs) | Remembers where you are in the app during your session |

---

## Folder structure

```
src/
├── app/              ← Pages and API routes (Next.js App Router)
├── components/
│   ├── navigation/   ← Selectors for domain / language / category / deck
│   ├── study/        ← The flashcard, controls, keyboard shortcuts
│   └── ui/           ← Reusable UI pieces (Button, Badge, Skeleton…)
├── hooks/            ← Custom React hooks (data fetching, study session)
├── services/         ← Functions that talk to the database
├── store/            ← Zustand store (session state — what you've seen)
├── db/               ← DB client + schema SQL file
├── lib/              ← Utilities (Supabase client, helper functions)
└── types/            ← TypeScript types
```

---

## How to set it up

### 1. Clone and install

```bash
git clone <your-repo-url>
cd anki-app
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free account + project.
2. In the SQL editor, paste and run the contents of `src/db/schema.sql` — this creates all the tables.
3. Copy your **Project URL** and **anon key** from **Settings → API**.

### 3. Set up environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your Supabase values:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Adding content

All content lives in Supabase. The hierarchy is:

```
Domain  (e.g. "Languages")
 └─ Language  (e.g. "Japanese")
     └─ Category  (e.g. "Vocabulary")
         └─ Deck  (e.g. "JLPT N5 — Core Words")
             └─ Cards  (front / back / translation / example / notes)
```

You can add rows directly in the Supabase **Table Editor**, or run SQL inserts.

---

## Keyboard shortcuts (while studying)

| Key | Action |
|-----|--------|
| `Space` or `↑↓` | Flip card |
| `→` or `Enter` | Next card |

---

## Security

- All tables have **Row Level Security** enabled — data is public read-only.
- Write access is restricted to an admin email you set in `schema.sql`.
- No user data is stored — session state (which cards you've seen) lives only in memory and resets on page refresh.

---

## Deployment

Works out of the box on [Vercel](https://vercel.com):

1. Push to GitHub.
2. Import the repo in Vercel.
3. Add your two environment variables in the Vercel dashboard.
4. Deploy.

---

## Future ideas

- User accounts + spaced repetition (SM-2 algorithm)
- Progress tracking across sessions
- Admin UI to add/edit cards without touching Supabase directly
- Audio pronunciation for cards
- Multiple domains (History, Science, etc.)