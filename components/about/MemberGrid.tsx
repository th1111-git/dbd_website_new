'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MemberCard from './MemberCard'
import MemberModal from './MemberModal'
import type { Member } from './MemberCard'

interface MemberGridProps {
  members: Member[]
}

export default function MemberGrid({ members }: MemberGridProps) {
  const years = [...new Set(members.map((m) => m.year))].sort().reverse()

  const [active, setActive] = useState(years[0] ?? '')
  const [selected, setSelected] = useState<Member | null>(null)

  const filtered = members.filter((m) => m.year === active)

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by batch year">
        {years.map((y) => (
          <button
            key={y}
            onClick={() => setActive(y)}
            aria-pressed={active === y}
            className={`font-mono text-xs px-3 py-1.5 rounded border transition-all duration-200 ${
              active === y
                ? 'bg-accent text-bg-base border-accent'
                : 'bg-bg-surface text-text-secondary border-border hover:border-accent/40 hover:text-text-primary'
            }`}
          >
            {y}
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
              <MemberCard member={member} onClick={() => setSelected(member)} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <MemberModal member={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
