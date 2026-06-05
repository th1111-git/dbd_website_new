'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { Event } from './EventCard'

const ChevronLeft = ({ size = 16, className = '', style = {} }: { size?: number; className?: string; style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="m15 18-6-6 6-6"/>
  </svg>
)

const ChevronRight = ({ size = 16, className = '', style = {} }: { size?: number; className?: string; style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="m9 18 6-6-6-6"/>
  </svg>
)

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

export default function MobileEventsBanner({ events }: { events: Event[] }) {
  const recent = [...events]
    .filter(e => BANNER_EVENT_IDS.includes(e.id))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const go = useCallback((i: number) => {
    setIndex(i)
    setProgress(0)
  }, [])

  const goNext = useCallback(() => {
    setIndex(i => (i + 1) % recent.length)
    setProgress(0)
  }, [recent.length])

  const goPrev = useCallback(() => {
    setIndex(i => (i - 1 + recent.length) % recent.length)
    setProgress(0)
  }, [recent.length])

  // Auto-advance timer
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

  // Touch/swipe handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext()
      else goPrev()
    }
  }, [goNext, goPrev])

  if (!recent.length) return null
  const event = recent[index]
  if (!event) return null

  const color = TYPE_COLOR[event.type] ?? '#8a8f9e'

  return (
    <div
      className="relative w-full border-b border-border overflow-hidden bg-bg-base"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ─── Auto-progress bar ─── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border z-20">
        <motion.div
          className="h-full"
          style={{ width: `${progress}%`, background: color, transition: 'background 0.4s' }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════
          DESKTOP LAYOUT (lg+) — identical to original EventsBanner
          ═══════════════════════════════════════════════════════ */}
      <div className="hidden lg:block relative w-full h-full" style={{ height: '560px' }}>
        {/* Left column — index number */}
        <div className="absolute left-0 top-0 bottom-0 w-16 border-r border-border flex flex-col items-center justify-center z-10">
          <span
            className="font-display font-bold text-4xl tabular-nums leading-none"
            style={{ color, writingMode: 'vertical-rl', letterSpacing: '-0.04em' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Right column — nav dots */}
        <div className="absolute right-0 top-0 bottom-0 w-12 border-l border-border flex flex-col items-center justify-center gap-3 z-10">
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

        {/* Main content area */}
        <div className="absolute left-16 right-16 top-0 bottom-0 flex flex-col">
          {/* Top meta bar */}
          <div className="flex items-center justify-between px-8 py-4 border-b border-border/50">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color }}
            >
              {event.type}
            </span>
            <span className="font-mono text-[10px] text-text-muted tracking-widest">
              {formatDate(event.date)}
            </span>
          </div>

          {/* Body: text + thumbnail */}
          <div className="flex-1 flex flex-row overflow-hidden">
            {/* Text content */}
            <div className="w-[50%] shrink-0 flex flex-col justify-center px-8 py-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.3, ease: [0.25, 0, 0.35, 1] }}
                >
                  <h2
                    className="font-display font-bold text-text-primary leading-[0.92] mb-5"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)', letterSpacing: '-0.03em' }}
                  >
                    {event.title}
                  </h2>
                  <p className="text-text-muted text-sm leading-relaxed max-w-md mb-6">
                    {event.description}
                  </p>
                  {event.link && (
                    <Link
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest transition-opacity duration-200 hover:opacity-70"
                      style={{ color }}
                    >
                      View More <ExternalLink size={11} />
                    </Link>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail */}
            <div className="w-[50%] shrink-0 border-l border-border/50 p-5 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full rounded-lg overflow-hidden relative"
                  style={{
                    background: event.image ? 'transparent' : `linear-gradient(135deg, rgb(var(--c-bg-elevated)) 0%, ${color}18 100%)`,
                    border: event.image ? 'none' : `1px solid ${color}25`,
                    minHeight: '200px',
                  }}
                >
                  {event.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={event.image.startsWith('/') ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${event.image}` : event.image} alt={event.title} className="w-full h-full object-contain" />
                  ) : (
                    <>
                      <div className="absolute inset-0 dot-grid opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        <span
                          className="font-display font-bold select-none leading-none"
                          style={{
                            fontSize: '11rem',
                            color: `${color}20`,
                            WebkitTextStroke: `2px ${color}60`,
                            letterSpacing: '-0.05em',
                            lineHeight: 1,
                          }}
                        >
                          {event.title[0]}
                        </span>
                      </div>
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

          {/* Bottom event strip */}
          <div className="flex border-t border-border/50">
            {recent.map((e, i) => (
              <button
                key={e.id}
                onClick={() => go(i)}
                className="flex-1 px-4 py-3 text-left border-r border-border/50 last:border-r-0 transition-colors duration-200 group"
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

      {/* ═══════════════════════════════════════════════════════
          TABLET LAYOUT (md to lg) — text-only for medium screens
          ═══════════════════════════════════════════════════════ */}
      <div className="hidden md:flex lg:hidden flex-col" style={{ minHeight: '340px' }}>
        {/* Top bar: index + type + date */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-border/50">
          <div className="flex items-center gap-3">
            <span
              className="font-display font-bold text-2xl tabular-nums leading-none"
              style={{ color, letterSpacing: '-0.04em' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="w-px h-5 bg-border" />
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

        {/* Body: text only, full width */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 py-6 overflow-hidden text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0, 0.35, 1] }}
              className="flex flex-col items-center"
            >
              <h2
                className="font-display font-bold text-text-primary leading-[0.92] mb-4"
                style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', letterSpacing: '-0.03em' }}
              >
                {event.title}
              </h2>
              <p className="text-text-muted text-sm leading-relaxed max-w-lg mb-5 mx-auto">
                {event.description}
              </p>
              {event.link && (
                <Link
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-widest transition-opacity duration-200 hover:opacity-70"
                  style={{ color }}
                >
                  View More <ExternalLink size={11} />
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav dots — horizontal, centered */}
        <div className="flex items-center justify-center gap-2 py-3 border-t border-border/50">
          <button
            onClick={goPrev}
            aria-label="Previous event"
            className="p-1.5 rounded-full transition-colors hover:bg-bg-elevated"
          >
            <ChevronLeft size={14} className="text-text-muted" />
          </button>
          {recent.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Event ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === index ? '20px' : '6px',
                height: '6px',
                background: i === index ? color : 'rgb(var(--c-border))',
              }}
            />
          ))}
          <button
            onClick={goNext}
            aria-label="Next event"
            className="p-1.5 rounded-full transition-colors hover:bg-bg-elevated"
          >
            <ChevronRight size={14} className="text-text-muted" />
          </button>
        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════
          MOBILE LAYOUT (< md) — fully adapted for small screens
          ═══════════════════════════════════════════════════════ */}
      <div className="flex md:hidden flex-col">
        {/* Top bar: compact meta with index */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <span
              className="font-display font-bold text-lg tabular-nums leading-none"
              style={{ color, letterSpacing: '-0.04em' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="w-px h-4 bg-border" />
            <span
              className="font-mono text-[10px] uppercase tracking-[0.15em]"
              style={{ color }}
            >
              {event.type}
            </span>
          </div>
          <span className="font-mono text-[10px] text-text-muted tracking-wider">
            {formatDate(event.date)}
          </span>
        </div>



        {/* Text content */}
        <div className="px-4 py-5 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: [0.25, 0, 0.35, 1] }}
            >
              <h2
                className="font-display font-bold text-text-primary leading-[0.95] mb-3"
                style={{ fontSize: 'clamp(1.4rem, 6vw, 2rem)', letterSpacing: '-0.03em' }}
              >
                {event.title}
              </h2>
              <p className="text-text-muted text-xs leading-relaxed mb-4 line-clamp-3 mx-auto max-w-sm">
                {event.description}
              </p>
              {event.link && (
                <Link
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-widest transition-opacity duration-200 hover:opacity-70"
                  style={{ color }}
                >
                  View More <ExternalLink size={10} />
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav dots — horizontal, large touch targets */}
        <div className="flex items-center justify-center gap-2.5 px-4 pb-4">
          {recent.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Event ${i + 1}`}
              className="rounded-full transition-all duration-300 p-1"
            >
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === index ? '18px' : '5px',
                  height: '5px',
                  background: i === index ? color : 'rgb(var(--c-border))',
                }}
              />
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}
