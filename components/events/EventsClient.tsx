'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EventCard from './EventCard'
import EventFilters from './EventFilters'
import EventsBanner from './EventsBanner'
import EventDetailModal from './EventDetailModal'
import SectionHeading from '@/components/ui/SectionHeading'
import type { Event } from './EventCard'
import PageBackground from '@/components/layout/PageBackground'
import eventsData from '@/data/events.json'

const PROXY_URL = 'https://databased-airtable-proxy.databased-iisc.workers.dev/events'

function mapType(airtableType: string, name: string = "") {
  if (name.toLowerCase().includes('ctf') || name.toLowerCase().includes('capture the flag')) {
    return 'CTF'
  }
  const t = (airtableType || '').trim().toLowerCase()
  if (t === 'talk' || t === 'seminar' || t === 'learning session') return 'Talk'
  if (t === 'workshop' || t === 'problem solving') return 'Workshop'
  if (t === 'hackathon' || t === 'competition') return 'Competition'
  return 'Other'
}

export default function EventsClient() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  useEffect(() => {
    fetch(PROXY_URL)
      .then(res => res.json())
      .then(data => {
        const parsedEvents: Event[] = data.records.map((record: any) => {
          const f = record.fields;
          const name = f.Name || "";
          
          let description = f.Description || "";
          let link = null;
          
          if (description) {
            const linkMatch = description.match(/Link:\s*(https?:\/\/\S+)/i) || description.match(/(https?:\/\/\S+)/i);
            if (linkMatch) {
              link = linkMatch[1].trim();
              description = description.replace(/Link:\s*https?:\/\/\S+/gi, '').trim();
              description = description.replace(/https?:\/\/\S+/gi, '').trim();
            }
          }

          let imagePath = null;
          if (f.Files && f.Files.length > 0) {
            imagePath = f.Files[0].url;
          }

          return {
            id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || record.id,
            title: name,
            date: f.Date || "",
            type: mapType(f.Type, name),
            description: description,
            link: link,
            image: imagePath,
            location: f.Location || null,
            topics: f.Topics || [],
            audience: f.Audience || []
          };
        });

        // Merge with static events from data/events.json
        const staticEvents = eventsData as Event[];
        const combinedEvents = [...staticEvents];
        const staticIds = new Set(staticEvents.map(e => e.id));
        
        parsedEvents.forEach(e => {
          if (!staticIds.has(e.id)) {
            combinedEvents.push(e);
          }
        });

        // Sort events by date descending
        combinedEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setEvents(combinedEvents);
      })
      .catch(err => {
        console.error("Failed to fetch events:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeFilter === 'All' ? events : events.filter((e) => e.type === activeFilter)

  if (loading) {
    return (
      <PageBackground>
        <div className="flex justify-center items-center h-screen font-mono text-sm text-text-secondary">
          <span className="inline-block w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin mr-3" />
          Loading events...
        </div>
      </PageBackground>
    )
  }

  if (error) {
    return (
      <PageBackground>
        <div className="flex justify-center items-center h-screen font-mono text-sm text-text-secondary">
          Failed to load events.
        </div>
      </PageBackground>
    )
  }

  return (
    <PageBackground>
      <EventsBanner events={events} />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeading
          eyebrow="Events"
          title="All Events"
          subtitle="CTF competitions, tech talks, workshops, and more."
        />

        <div className="mt-10">
          <EventFilters active={activeFilter} onFilter={setActiveFilter} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filtered.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <EventCard
                    event={event}
                    onClick={() => {
                      if (event.link && event.link.startsWith('/pages/')) {
                        window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${event.link}`
                      } else {
                        setSelectedEvent(event)
                      }
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-center py-16 text-text-secondary font-mono text-sm">
              No events found for &quot;{activeFilter}&quot;
            </p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <EventDetailModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </PageBackground>
  )
}

