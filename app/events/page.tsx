import type { Metadata } from 'next'
import EventsClient from '@/components/events/EventsClient'
import { fetchEvents } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Events',
}

export default async function EventsPage() {
  const events = await fetchEvents()
  return <EventsClient events={events} />
}
