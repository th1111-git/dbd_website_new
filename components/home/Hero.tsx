'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-25" />

      {/* Vignette — bottom fade into next section */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/40 to-transparent" />


      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-20 max-w-4xl mx-auto w-full">

        {/* Logo image — the primary visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative w-full max-w-2xl mb-10"
          style={{
            /* Fade the white margins out so the logo floats against the dark bg */
            maskImage:
              'radial-gradient(ellipse 88% 78% at 50% 50%, black 55%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 88% 78% at 50% 50%, black 55%, transparent 100%)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/textOld.png`}
            alt="Databased"
            width={800}
            height={260}
            className="w-full h-auto"
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Button href="/about" variant="filled" size="lg">
            About Us
          </Button>
          <Button href="/events" variant="outlined" size="lg">
            View Events
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 p-20 text-text-muted hover:text-accent transition-colors duration-300 cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={22} strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </section>
  )
}
