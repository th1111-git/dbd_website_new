'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MemberCard from './MemberCard'
import type { Member } from './MemberCard'

const FILTERS = ['All', 'Core Team', 'Coordinators']

export default function MemberGrid({ members }: { members: Member[] }) {
  const [active, setActive] = useState('All')

  const filtered =
    active === 'All' ? members : members.filter((m) => m.category === active)

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter members">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            aria-pressed={active === f}
            className={`font-mono text-xs px-3 py-1.5 rounded border transition-all duration-200 ${
              active === f
                ? 'bg-accent text-bg-base border-accent'
                : 'bg-bg-surface text-text-secondary border-border hover:border-accent/40 hover:text-text-primary'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filtered.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <MemberCard member={member} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
