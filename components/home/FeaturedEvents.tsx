'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import EventCard from '@/components/events/EventCard'
import type { Event } from '@/components/events/EventCard'

export default function FeaturedEvents({ events }: { events: Event[] }) {
  return (
    <section className="py-24 bg-bg-base">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <SectionHeading eyebrow="Events" title="Recent Events" />
          <Link
            href="/events"
            className="hidden md:inline-flex items-center gap-2 font-mono text-sm text-text-secondary hover:text-accent transition-colors shrink-0"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 font-mono text-sm text-text-secondary hover:text-accent transition-colors"
          >
            View all events <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
