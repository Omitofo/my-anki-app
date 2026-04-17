import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

export const LANGUAGE_FLAGS: Record<string, string> = {
  japanese: '🇯🇵',
  spanish: '🇪🇸',
  german: '🇩🇪',
  french: '🇫🇷',
  italian: '🇮🇹',
  portuguese: '🇧🇷',
  mandarin: '🇨🇳',
  korean: '🇰🇷',
  arabic: '🇸🇦',
  english: '🇬🇧',
}

export function getLanguageFlag(slug: string): string {
  return LANGUAGE_FLAGS[slug.toLowerCase()] ?? '🌐'
}

export function formatDifficulty(level: number): string {
  const labels: Record<number, string> = {
    1: 'Beginner',
    2: 'Elementary',
    3: 'Intermediate',
    4: 'Advanced',
    5: 'Expert',
  }
  return labels[level] ?? 'Unknown'
}