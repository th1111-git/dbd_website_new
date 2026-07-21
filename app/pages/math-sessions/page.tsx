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

import mathSessionsData from '@/data/math-sessions.json'

async function fetchMathSessions(): Promise<MathSession[]> {
  return (mathSessionsData as MathSession[])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default async function MathSessionsPage() {
  const sessions = await fetchMathSessions()
  return <MathSessionsClient sessions={sessions} />
}
