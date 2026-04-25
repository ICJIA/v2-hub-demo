export interface AuthorRef {
  title: string
  description: string | null
}

export interface Article {
  documentId: string
  title: string
  slug: string
  abstract: string | null
  type: string
  date: string | null
  publishedAt: string
  tags: string[] | null
  categories: string[] | null
  authors: AuthorRef[] | null
  splash: { url: string, alternativeText: string | null } | null
}

interface GraphQLResponse {
  data?: { articles: Article[] }
  errors?: { message: string }[]
}

const ENDPOINT = 'https://v2.hub.icjia-api.cloud/graphql'

const ALL_TYPES = [
  'annualReport',
  'article',
  'dataset',
  'evaluation',
  'general',
  'newsletter',
  'process_evaluation',
  'programEvaluationSummary',
  'researchAtAGlance',
  'researchBulletin',
  'researchReport',
  'strategicPlan',
  'toolkit',
  'update'
] as const

function pickRandomType(): string {
  return ALL_TYPES[Math.floor(Math.random() * ALL_TYPES.length)]!
}

const QUERY = `query AllPublishedArticles {
  articles(status: PUBLISHED, sort: ["publishedAt:desc"], pagination: { limit: 1000 }) {
    documentId
    title
    slug
    abstract
    type
    date
    publishedAt
    tags
    categories
    authors
    splash {
      url
      alternativeText
    }
  }
}`

export function useArticles() {
  return useAsyncData<Article[]>('articles', async () => {
    const res = await $fetch<GraphQLResponse>(ENDPOINT, {
      method: 'POST',
      body: { query: QUERY }
    })
    if (res.errors?.length) {
      throw new Error(res.errors.map(e => e.message).join('; '))
    }
    const articles = res.data?.articles ?? []
    return articles.map(a => a.type ? a : { ...a, type: pickRandomType() })
  })
}
