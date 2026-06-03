'use client'

import { motion } from 'framer-motion'
import PageBackground from '@/components/layout/PageBackground'
import { Terminal, FileText, ChevronRight } from 'lucide-react'

const schedule = [
  {
    day: "Friday, 01/08/2025",
    events: [
      { time: "11:00 PM onwards", title: "Game Night", color: "text-green-400" }
    ]
  },
  {
    day: "Saturday, 02/08/2025",
    events: [
      { time: "09:30 AM - 11:00 AM", title: "Talk by Prof. C Pandu Rangan in MLH" },
      { time: "11:00 AM onwards", title: "Start of the Treasure Hunt", color: "text-yellow-400" },
      { time: "08:00 PM", title: "Release of first set of frenzy problems" },
      { time: "11:00 PM onwards", title: "Game Night", color: "text-green-400" }
    ]
  },
  {
    day: "Sunday, 03/08/2025",
    events: [
      { time: "02:00 AM", title: "Event Pause", color: "text-orange-400" },
      { time: "07:00 AM", title: "Event Resumes", color: "text-green-400" },
      { time: "11:00 AM - 11:45 AM", title: "Talk by Ullas Aparanji, CSA in G-01" },
      { time: "08:00 PM", title: "Release of second set of frenzy problems" },
      { time: "11:00 PM", title: "Competition ends", color: "text-red-400" },
      { time: "11:00 PM onwards", title: "Game Night", color: "text-green-400" }
    ]
  }
]

export default function HackAndSeek2025() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

  return (
    <PageBackground>
      <div className="max-w-4xl mx-auto px-6 py-16 font-mono">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-accent/10 text-accent mb-6">
            <Terminal size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-4">
            hACK&amp;seEK.dbd
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Explore. Hack. Seek. Join Databased's 36-hour competition for freshers. A hunt for glory, brains, and the One Piece.
          </p>
        </motion.div>

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-border bg-bg-surface p-8 shadow-lg shadow-black/20"
          >
            <h2 className="text-2xl font-semibold text-text-primary mb-8 flex items-center gap-3 border-b border-border pb-4">
              <span className="text-accent">~/</span> schedule.sh
            </h2>
            
            <div className="space-y-10">
              {schedule.map((day, dayIdx) => (
                <div key={dayIdx}>
                  <h3 className="text-lg font-bold text-text-primary mb-4 bg-accent/10 text-accent inline-block px-3 py-1 rounded">
                    {day.day}
                  </h3>
                  <div className="space-y-4">
                    {day.events.map((event, eventIdx) => (
                      <div key={eventIdx} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 group">
                        <div className="text-text-secondary sm:w-48 shrink-0 flex items-center gap-2">
                          <ChevronRight size={14} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                          {event.time}
                        </div>
                        <div className={`${event.color || 'text-text-primary'}`}>
                          {event.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-border bg-bg-surface p-8 shadow-lg shadow-black/20 text-center"
          >
            <h2 className="text-2xl font-semibold text-text-primary mb-4">Rules & Regulations</h2>
            <p className="text-text-secondary mb-8">
              Everything you need to know about the format, scoring, and FAQs.
            </p>
            <a
              href={`${basePath}/pages/hack-and-seek/rules.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover hover:-translate-y-0.5"
            >
              <FileText size={18} />
              Read the Rules Document
            </a>
          </motion.div>
        </div>
      </div>
    </PageBackground>
  )
}
