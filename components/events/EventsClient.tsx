'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EventCard from './EventCard'
import EventFilters from './EventFilters'
import EventsBanner from './EventsBanner'
import SectionHeading from '@/components/ui/SectionHeading'
import type { Event } from './EventCard'
import PageBackground from '@/components/layout/PageBackground'

export default function EventsClient({ events }: { events: Event[] }) {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered =
    activeFilter === 'All' ? events : events.filter((e) => e.type === activeFilter)

  return (
    <PageBackground>
      <EventsBanner events={events} />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeading
          eyebrow="Events"
          title="All Events"
          subtitle="CTF competitions, tech talks, workshops, and more — everything we've hosted."
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
                  <EventCard event={event} />
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
    </PageBackground>
  )
}
