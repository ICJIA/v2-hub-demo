import type { Article } from '~/composables/useArticles'

const API_ORIGIN = 'https://v2.hub.icjia-api.cloud'

export const CHIP_TYPES = [
  'researchReport',
  'annualReport',
  'programEvaluationSummary',
  'update',
  'strategicPlan'
]

export function pluralize(noun: string): string {
  if (/[^aeiou]y$/i.test(noun)) {
    return noun.slice(0, -1) + 'ies'
  }
  if (/(s|x|z|ch|sh)$/i.test(noun)) {
    return noun + 'es'
  }
  return noun + 's'
}

export const KNOWN_CENTERS = [
  'Center for Justice Research and Evaluation',
  'Center for Sponsored Research & Program Development',
  'Center for Victim Studies',
  'Center for Violence Prevention and Intervention Research',
  'Research & Analysis Unit'
]

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

export interface HighlightSegment {
  text: string
  match: boolean
}

export function highlightSegments(text: string | null | undefined, query: string): HighlightSegment[] {
  if (!text) return []
  if (!query) return [{ text, match: false }]
  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const out: HighlightSegment[] = []
  let i = 0
  let next = lowerText.indexOf(lowerQuery)
  while (next !== -1) {
    if (next > i) out.push({ text: text.slice(i, next), match: false })
    out.push({ text: text.slice(next, next + query.length), match: true })
    i = next + query.length
    next = lowerText.indexOf(lowerQuery, i)
  }
  if (i < text.length) out.push({ text: text.slice(i), match: false })
  return out
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
