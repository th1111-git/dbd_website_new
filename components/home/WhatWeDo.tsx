'use client'

import { motion } from 'framer-motion'
import { Code2, Shield, Presentation, Users } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const activities = [
  {
    icon: Code2,
    title: 'Competitive Programming',
    description:
      'Regular contests, ICPC preparation, and algorithm workshops to sharpen problem-solving skills.',
  },
  {
    icon: Shield,
    title: 'Capture the Flag',
    description:
      'CTF competitions covering pwn, crypto, forensics, web exploitation, and reverse engineering.',
  },
  {
    icon: Presentation,
    title: 'Tech Talks & Workshops',
    description:
      'Invited speakers from academia and industry sharing insights on cutting-edge research and tools.',
  },
  {
    icon: Users,
    title: 'Alumni Sessions',
    description:
      'Connect with IISc alumni at top companies and research institutions worldwide.',
  },
]

export default function WhatWeDo() {
  return (
    <section className="py-24 bg-bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="Activities"
          title="What we do"
          subtitle="From competitive programming to cybersecurity, we cover the full spectrum of computer science."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {activities.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-6 bg-bg-surface rounded-lg border border-border hover:border-accent-dim transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-md bg-accent-dim flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                <Icon size={18} className="text-accent" />
              </div>
              <h3 className="font-display font-semibold text-text-primary text-sm mb-2">{title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
