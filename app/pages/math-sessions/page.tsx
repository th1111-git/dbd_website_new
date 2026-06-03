import type { Metadata } from 'next'
import MathSessionsClient from './MathSessionsClient'

export const metadata: Metadata = {
  title: 'Mathematics Problem Solving',
  description:
    'Databased collaborates with Samasya to host regular interactive math problem-solving sessions at IISc — olympiad-style challenges open to all skill levels.',
  keywords: [
    'Databased IISc', 'Samasya IISc', 'IISc math club',
    'Olympiad math sessions IISc', 'Math problem solving IISc',
    'Undergraduate math club IISc', 'CS and math collaboration',
  ],
  openGraph: {
    title: 'Maths Problem Solving | Databased',
    description:
      'Databased and Samasya host regular olympiad-style math problem-solving sessions at IISc.',
    url: 'https://databased.csa.iisc.ac.in/pages/math-sessions/',
    images: [{ url: 'https://databased.csa.iisc.ac.in/img/banner.webp' }],
  },
  twitter: { card: 'summary_large_image', site: '@databasedIISc' },
}

export interface MathSession {
  id: string
  date: string    // "YYYY-MM-DD"
  problems: string
  solutions: string
}

async function fetchMathSessions(): Promise<MathSession[]> {
  const apiKey = process.env.AIRTABLE_API_KEY
  if (!apiKey) {
    console.warn('[math-sessions] AIRTABLE_API_KEY not set — skipping fetch.')
    return []
  }

  try {
    const res = await fetch(
      'https://api.airtable.com/v0/appHwUzo4ARCQQlwr/Math%20Sessions?maxRecords=50&view=Grid%20view',
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )

    if (!res.ok) {
      console.error(`[math-sessions] Airtable error: ${res.status}`)
      return []
    }

    const json = await res.json()

    return (json.records ?? [])
      .map((record: any) => ({
        id: record.id as string,
        date: (record.fields['Date'] as string) ?? '',
        problems: (record.fields['Problems PDF']?.[0]?.url as string) ?? '',
        solutions: (record.fields['Solutions PDF']?.[0]?.url as string) ?? '',
      }))
      // Sort newest first
      .sort((a: MathSession, b: MathSession) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
  } catch (err) {
    console.error('[math-sessions] Fetch failed:', err)
    return []
  }
}

export default async function MathSessionsPage() {
  const sessions = await fetchMathSessions()
  return <MathSessionsClient sessions={sessions} />
}
