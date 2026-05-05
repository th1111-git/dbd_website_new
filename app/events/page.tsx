import type { Metadata } from 'next'
import eventsData from '@/data/events.json'
import EventsClient from '@/components/events/EventsClient'

export const metadata: Metadata = {
  title: 'Events',
}

export default function EventsPage() {
  return <EventsClient events={eventsData} />
}
