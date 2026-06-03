'use client'

import { motion } from 'framer-motion'
import PageBackground from '@/components/layout/PageBackground'
import SectionHeading from '@/components/ui/SectionHeading'
import { Calendar, FileText, BookOpen, Users } from 'lucide-react'
import type { MathSession } from './page'

interface Props {
  sessions: MathSession[]
}

function formatDate(iso: string): string {
  if (!iso) return 'TBD'
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function isUpcoming(iso: string): boolean {
  if (!iso) return false
  return new Date(iso + 'T00:00:00').getTime() > Date.now()
}

export default function MathSessionsClient({ sessions }: Props) {
  return (
    <PageBackground>
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* ── Header ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <SectionHeading
            eyebrow="Mathematics for CS"
            title="Math Problem Solving Sessions"
            subtitle="A series of olympiad-style problem solving sessions jointly organised by Databased and Samasya."
            centered={true}
          />

          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm font-mono text-text-secondary">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-accent" />
              <span>Ongoing · 2024 – 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-accent" />
              <span>Open to all IISc undergraduates</span>
            </div>
          </div>
        </motion.div>

        {/* ── Session rows ────────────────────────────────────── */}
        {sessions.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-text-muted font-mono text-sm py-24"
          >
            No sessions found. Check back soon!
          </motion.p>
        ) : (
          <div className="space-y-3">
            {sessions.map((session, i) => {
              const upcoming = isUpcoming(session.date)
              return (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                  className={`
                    flex flex-col sm:flex-row sm:items-center justify-between gap-4
                    rounded-lg border px-5 py-4
                    ${upcoming
                      ? 'border-accent/40 bg-accent/5'
                      : 'border-border bg-bg-surface'}
                  `}
                >
                  {/* Date */}
                  <span className={`text-xl font-semibold font-display ${upcoming ? 'text-accent' : 'text-text-primary'}`}>
                    {formatDate(session.date)}
                    {upcoming && (
                      <span className="ml-3 text-xs font-mono font-normal bg-accent/20 text-accent px-2 py-0.5 rounded-full align-middle">
                        upcoming
                      </span>
                    )}
                  </span>

                  {/* Buttons */}
                  <div className="flex gap-3 sm:ml-auto shrink-0">
                    <ResourceButton
                      href={session.problems}
                      label="Problems"
                      icon={<FileText size={14} />}
                      id={`problems-${session.id}`}
                    />
                    <ResourceButton
                      href={session.solutions}
                      label="Solutions"
                      icon={<BookOpen size={14} />}
                      id={`solutions-${session.id}`}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

      </div>
    </PageBackground>
  )
}

/* ── Resource button ──────────────────────────────────────── */

interface BtnProps {
  href: string
  label: string
  icon: React.ReactNode
  id: string
}

function ResourceButton({ href, label, icon, id }: BtnProps) {
  if (!href) {
    return (
      <span
        id={id}
        aria-disabled="true"
        title="Not available yet"
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2
          text-sm font-mono text-text-muted cursor-not-allowed select-none opacity-40"
      >
        {icon}
        {label}
      </span>
    )
  }

  return (
    <a
      id={id}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2
        text-sm font-mono text-text-primary transition-all duration-150
        hover:border-accent hover:text-accent hover:-translate-y-0.5"
    >
      {icon}
      {label}
    </a>
  )
}
