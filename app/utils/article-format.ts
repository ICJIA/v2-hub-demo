import type { Article } from '~/composables/useArticles'

const API_ORIGIN = 'https://v2.hub.icjia-api.cloud'

export function articleAuthorNames(a: Article): string[] {
  if (!Array.isArray(a.authors)) return []
  const names: string[] = []
  for (const x of a.authors) {
    if (x && typeof x === 'object' && typeof x.title === 'string') {
      const trimmed = x.title.trim()
      if (trimmed) names.push(trimmed)
    }
  }
  return names
}

export function authorKey(name: string): string {
  return name
    .replace(/,.*$/, '')
    .replace(/\s*&\s*/g, ' and ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

export function typeLabel(value: string): string {
  return value
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    .replace(/\b\w/g, c => c.toUpperCase())
}

export function imageUrl(path: string | null | undefined): string {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  return `${API_ORIGIN}${path.startsWith('/') ? '' : '/'}${path}`
}

const dateFmt = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' })

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '' : dateFmt.format(d)
}
