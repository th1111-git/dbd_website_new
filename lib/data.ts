/**
 * lib/data.ts
 *
 * Reads static JSON data files. No external API dependencies.
 */

import type { Member } from '@/components/about/MemberCard'
import type { Event } from '@/components/events/EventCard'
import staticMembers from '@/data/members.json'
import staticEvents from '@/data/events.json'

export async function fetchMembers(): Promise<Member[]> {
  return staticMembers as Member[]
}

export async function fetchEvents(): Promise<Event[]> {
  const events = staticEvents as Event[]
  // Sort by date descending
  return [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}
