import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const DIR = path.join(process.cwd(), 'content', 'work')

export type CaseStudy = {
  slug: string
  title: string
  client: string
  year: number
  capability: 'ship' | 'automate' | 'decide'
  summary: string
  outcome: string
  draft: boolean
  body: string
}

/** Files prefixed with `_` are templates, never published. */
const isPublishable = (file: string) => file.endsWith('.mdx') && !file.startsWith('_')

export function getCaseStudies(): CaseStudy[] {
  if (!fs.existsSync(DIR)) return []
  return fs
    .readdirSync(DIR)
    .filter(isPublishable)
    .map((file) => readCaseStudy(file.replace(/\.mdx$/, '')))
    .filter((entry): entry is CaseStudy => entry !== null && !entry.draft)
    .sort((a, b) => b.year - a.year)
}

export function readCaseStudy(slug: string): CaseStudy | null {
  const file = path.join(DIR, `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const { data, content } = matter(fs.readFileSync(file, 'utf8'))
  return {
    slug,
    title: data.title ?? slug,
    client: data.client ?? '',
    year: Number(data.year) || 0,
    capability: data.capability ?? 'ship',
    summary: data.summary ?? '',
    outcome: data.outcome ?? '',
    draft: data.draft !== false,
    body: content,
  }
}
