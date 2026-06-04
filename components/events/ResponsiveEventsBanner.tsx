'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { Event } from './EventCard'

const TYPE_COLOR: Record<string, string> = {
  CTF:         '#ff6600',
  Competition: '#ff6600',
  Talk:        '#10f933',
  Workshop:    '#10f933',
  Other:       '#8a8f9e',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

const BANNER_EVENT_IDS = [
  'open-day-2024',
  'iisc-open-day-2024',
  'open-day-2025',
  'iisc-open-day-2025',
  'hack-and-seek-2025',
  'algorithm-festival-2024',
  'ideathon-2024',
]

export default function ResponsiveEventsBanner({ events }: { events: Event[] }) {
  const recent = [...events]
    .filter(e => BANNER_EVENT_IDS.includes(e.id))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const go = useCallback((i: number) => {
    setIndex(i)
    setProgress(0)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setIndex(i => (i + 1) % recent.length)
          return 0
        }
        return p + 0.5
      })
    }, 25)
    return () => clearInterval(interval)
  }, [recent.length])

  const event = recent[index]
  if (!event) return null

  const color = TYPE_COLOR[event.type] ?? '#8a8f9e'

  return (
    <div className="relative w-full border-b border-border overflow-hidden bg-bg-base h-[500px] sm:h-[520px] md:h-[540px] lg:h-[560px]">

      {/* Auto-progress bar at very top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border z-20">
        <motion.div
          className="h-full"
          style={{ width: `${progress}%`, background: color, transition: 'background 0.4s' }}
        />
      </div>

      {/* Left column — index number (visible on lg screens and above) */}
      <div className="hidden lg:flex absolute left-0 top-0 bottom-0 w-16 border-r border-border flex-col items-center justify-center z-10">
        <span
          className="font-display font-bold text-4xl tabular-nums leading-none"
          style={{ color, writingMode: 'vertical-rl', letterSpacing: '-0.04em' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Right column — nav dots (visible on lg screens and above) */}
      <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-12 border-l border-border flex-col items-center justify-center gap-3 z-10">
        {recent.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Event ${i + 1}`}
            className="w-1.5 rounded-full transition-all duration-300"
            style={{
              height: i === index ? '28px' : '6px',
              background: i === index ? color : 'rgb(var(--c-border))',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative w-full h-full flex flex-col lg:absolute lg:w-auto lg:left-16 lg:right-12 lg:top-0 lg:bottom-0">

        {/* Top meta bar */}
        <div className="flex items-center justify-between px-6 lg:px-8 py-4 border-b border-border/50">
          <div className="flex items-center gap-2">
            {/* Index number integrated for mobile/tablet */}
            <span className="lg:hidden font-mono text-[10px] font-bold" style={{ color }}>
              [{String(index + 1).padStart(2, '0')}]
            </span>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color }}
            >
              {event.type}
            </span>
          </div>
          <span className="font-mono text-[10px] text-text-muted tracking-widest">
            {formatDate(event.date)}
          </span>
        </div>

        {/* Main body: text + thumbnail */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

          {/* Text content */}
          <div className="flex-1 flex flex-col justify-center px-6 lg:px-8 py-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.3, ease: [0.25, 0, 0.35, 1] }}
              >
                <h2
                  className="font-display font-bold text-text-primary leading-[0.92] mb-4 sm:mb-5"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 3.8rem)', letterSpacing: '-0.03em' }}
                >
                  {event.title}
                </h2>
                <p className="text-text-muted text-xs sm:text-sm leading-relaxed max-w-md mb-5 sm:mb-6 line-clamp-4 md:line-clamp-none">
                  {event.description}
                </p>
                <div className="flex items-center justify-between lg:justify-start lg:gap-6">
                  {event.link && (
                    <Link
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest transition-opacity duration-200 hover:opacity-70"
                      style={{ color }}
                    >
                      View More <ExternalLink size={11} />
                    </Link>
                  )}
                  
                  {/* Nav dots integrated below text for mobile/tablet */}
                  <div className="flex lg:hidden items-center gap-2">
                    {recent.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => go(i)}
                        aria-label={`Event ${i + 1}`}
                        className="h-1 rounded-full transition-all duration-300"
                        style={{
                          width: i === index ? '18px' : '4px',
                          background: i === index ? color : 'rgb(var(--c-border))',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Thumbnail — half width (hidden on mobile, shown from md) */}
          <div className="hidden md:flex w-[40%] lg:w-1/2 shrink-0 border-l border-border/50 p-5 items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-lg overflow-hidden relative"
                style={{
                  background: `linear-gradient(135deg, rgb(var(--c-bg-elevated)) 0%, ${color}18 100%)`,
                  border: `1px solid ${color}25`,
                  minHeight: '200px',
                }}
              >
                {event.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={event.image.startsWith('/') ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${event.image}` : event.image} alt={event.title} className="w-full h-full object-cover" />
                ) : (
                  <>
                    {/* Decorative grid */}
                    <div className="absolute inset-0 dot-grid opacity-20" />
                    {/* Single initial — fills the box */}
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                      <span
                        className="font-display font-bold select-none leading-none"
                        style={{
                          fontSize: '8rem',
                          color: `${color}20`,
                          WebkitTextStroke: `2px ${color}60`,
                          letterSpacing: '-0.05em',
                          lineHeight: 1,
                        }}
                      >
                        {event.title[0]}
                      </span>
                    </div>
                    {/* Type label bottom-left */}
                    <div className="absolute bottom-3 left-3">
                      <span
                        className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 rounded"
                        style={{ color, background: `${color}15`, border: `1px solid ${color}25` }}
                      >
                        {event.type}
                      </span>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom: event list strip */}
        <div className="flex overflow-x-auto lg:overflow-visible border-t border-border/50 scrollbar-none">
          {recent.map((e, i) => (
            <button
              key={e.id}
              onClick={() => go(i)}
              className="flex-1 min-w-[140px] lg:min-w-0 px-4 py-3 text-left border-r border-border/50 last:border-r-0 transition-colors duration-200 group shrink-0"
              style={{ background: i === index ? `${color}08` : 'transparent' }}
            >
              <p
                className="font-display font-semibold text-xs leading-snug line-clamp-1 transition-colors duration-200"
                style={{ color: i === index ? color : 'rgb(var(--c-text-muted))' }}
              >
                {e.title}
              </p>
              <p className="font-mono text-[9px] text-text-muted mt-0.5 opacity-60">
                {e.type}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
