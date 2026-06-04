'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MemberCard from './MemberCard'
import MemberModal from './MemberModal'
import type { Member } from './MemberCard'

const AIRTABLE_URL = 'https://api.airtable.com/v0/appHwUzo4ARCQQlwr/Profiles?maxRecords=1000&view=Grid%20view'
const AIRTABLE_TOKEN = 'pat2bEq3dsaXHSBH9.2edd33a7b1c2de8fd5e4fe14b82900cf807d2c9b56dfead6a8bdd48715826409'

export default function MemberGrid() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [active, setActive] = useState('')
  const [selected, setSelected] = useState<Member | null>(null)

  useEffect(() => {
    fetch(AIRTABLE_URL, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // Map Airtable response to Member interface
        const parsedMembers: Member[] = data.records.map((record: any) => {
          const f = record.fields;
          const links: any = {};
          if (f.GitHub) links.github = f.GitHub;
          if (f.LinkedIn) links.linkedin = f.LinkedIn;
          if (f.Email) links.email = f.Email;
          
          let photoPath = undefined;
          if (f.Photo && f.Photo.length > 0) {
            photoPath = f.Photo[0].url;
          }

          return {
            name: (f.Name || '').trim(),
            role: 'Member',
            year: String(f.Batch ?? ''),
            category: 'Members',
            ...(f.Bio?.trim() ? { bio: f.Bio.trim() } : {}),
            ...(photoPath ? { photo: photoPath } : {}),
            ...(Object.keys(links).length ? { links } : {}),
          };
        });

        setMembers(parsedMembers)
        const years = [...new Set(parsedMembers.map((m) => m.year))].sort().reverse()
        if (years.length) setActive(years[0])
      })
      .catch((err) => {
        console.error("Failed to fetch members:", err)
        setError(true)
      })
      .finally(() => setLoading(false))
  }, [])

  const years = [...new Set(members.map((m) => m.year))].sort().reverse()
  const filtered = members.filter((m) => m.year === active)

  if (loading) {
    return (
      <div className="py-16 min-h-[200px]"></div>
    )
  }

  if (error) {
    return (
      <p className="py-16 font-mono text-xs text-text-muted">
        Failed to load members.
      </p>
    )
  }

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
