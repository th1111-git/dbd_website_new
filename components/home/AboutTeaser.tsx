'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const stats = [
  { value: '40+', label: 'Members' },
  { value: '3+', label: 'Years Active' },
  { value: '50+', label: 'Events Hosted' },
]

export default function AboutTeaser() {
  return (
    <section className="py-24 bg-bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading eyebrow="About" title="Who we are" />
            <p className="text-text-secondary leading-relaxed mb-4">
              Databased is the undergraduate computer science club at the Indian
              Institute of Science, Bengaluru — run entirely by B.Tech. Mathematics
              and Computing students under the CSA department.
            </p>
            <p className="text-text-secondary leading-relaxed mb-8">
              We host competitive programming contests, CTF competitions, tech talks,
              workshops, and alumni sessions throughout the year. Everyone is welcome —
              from complete beginners to seasoned hackers.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-mono text-sm text-accent hover:gap-3 transition-all duration-200"
            >
              More about us <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 bg-bg-base rounded-lg border border-border text-center hover:border-accent-dim transition-colors duration-300"
              >
                <p className="font-mono text-3xl font-bold text-accent mb-1">{value}</p>
                <p className="text-text-secondary text-xs font-mono">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
