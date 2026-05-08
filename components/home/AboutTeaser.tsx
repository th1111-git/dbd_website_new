'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

export default function AboutTeaser() {
  return (
    <section className="py-24 bg-bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading eyebrow="About" title="Who we are" />
            <p className="text-text-secondary leading-relaxed mb-4 text-justify">
Welcome to Databased, the CS Crew at the Indian Institute of Science (IISc), where curiosity and innovation come together to create something extraordinary! We're a community of students passionate about diving deep into the world of computer science and related fields. We're here to provide a comprehensive resource for beginners to learn, grow, and create.

            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-mono text-sm text-accent hover:gap-3 transition-all duration-200"
            >
              More about us <ArrowRight size={14} />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/iisc-linesketch.png`}
              alt="IISc campus line sketch"
              className="w-full max-w-md opacity-80"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
