import ClientPage from './ClientPage'

async function getPresentations() {
  try {
    const res = await fetch(
      'https://api.airtable.com/v0/appHwUzo4ARCQQlwr/Algorithm%20Festival?maxRecords=20&view=Grid%20view',
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        // In Next.js App Router with static export, this runs at build time
        next: { revalidate: false }
      }
    )
    if (!res.ok) {
      console.error('Failed to fetch Algorithm Festival data:', res.statusText)
      return []
    }
    const data = await res.json()
    return data.records.map((r: any) => ({
      title: r.fields.Title || '',
      presenters: (r.fields.Presenters || '').split('\n').filter(Boolean),
      usernames: (r.fields.Usernames || '').split('\n').filter(Boolean),
      abstract: r.fields.Abstract || ''
    }))
  } catch (err) {
    console.error('Error fetching Algorithm Festival data:', err)
    return []
  }
}

export default async function AlgorithmsPage() {
  const presentations = await getPresentations()
  return <ClientPage presentations={presentations} />
}
