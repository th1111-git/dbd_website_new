'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Calendar, MapPin, ExternalLink } from 'lucide-react'
import type { Event } from './EventCard'

interface EventDetailModalProps {
  event: Event
  onClose: () => void
}

const TYPE_COLOR: Record<string, string> = {
  CTF:         '#ff6600',
  Competition: '#ff6600',
  Talk:        '#10f933',
  Workshop:    '#10f933',
  Other:       '#8a8f9e',
}

const TYPE_BADGE_STYLE: Record<string, string> = {
  CTF:         'bg-[#e65100] text-white',
  Competition: 'bg-[#e65100] text-white',
  Talk:        'bg-[#d84315] text-white',
  Workshop:    'bg-[#00695c] text-white',
  Other:       'bg-[#37474f] text-white',
}

const AUDIENCE_BADGE_STYLE: Record<string, string> = {
  beginner:     'bg-[#d81b60] text-white',
  intermediate: 'bg-[#8e24aa] text-white',
  advanced:     'bg-[#3949ab] text-white',
}

function formatDateTime(dateStr: string) {
  const d = new Date(dateStr)
  const hasTime = dateStr.includes('T')
  
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }

  if (hasTime) {
    return d.toLocaleDateString('en-IN', {
      ...dateOptions,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return d.toLocaleDateString('en-IN', dateOptions)
}

export default function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  const color = TYPE_COLOR[event.type] ?? '#8a8f9e'
  const typeBadgeClass = TYPE_BADGE_STYLE[event.type] ?? 'bg-bg-elevated text-text-secondary'

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    // Prevent scrolling behind modal
    document.body.style.overflow = 'hidden'
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
      />

      {/* Modal card wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-xl bg-bg-surface border border-border/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col z-10 max-h-[90vh]"
      >
        {/* Close button top right */}
        <button
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white transition-colors"
        >
          <X size={16} />
        </button>

        {/* Poster / Image Header */}
        <div className="relative w-full aspect-[4/3] bg-bg-base/60 border-b border-border/50 flex items-center justify-center overflow-hidden shrink-0">
          {event.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={event.image.startsWith('/') ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${event.image}` : event.image}
              alt={event.title}
              className="w-full h-full object-contain bg-black/10"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center select-none bg-gradient-to-br from-bg-surface to-bg-elevated">
              <div className="absolute inset-0 dot-grid opacity-20" />
              <span
                className="font-display font-bold select-none leading-none opacity-20"
                style={{
                  fontSize: '9rem',
                  color,
                  WebkitTextStroke: `2px ${color}80`,
                  letterSpacing: '-0.05em',
                }}
              >
                {event.title[0]}
              </span>
            </div>
          )}

        </div>

        {/* Content details scrollable area */}
        <div className="p-6 md:p-8 overflow-y-auto flex flex-col gap-5">
          {/* Title */}
          <h2 className="font-display font-bold text-text-primary text-xl md:text-2xl leading-tight text-center tracking-tight">
            {event.title}
          </h2>

          {/* Badges strip */}
          <div className="flex flex-wrap gap-2 justify-center items-center">
            {/* Event Type Badge */}
            <span className={`text-[10px] tracking-wider uppercase font-mono px-2.5 py-1 rounded font-semibold ${typeBadgeClass}`}>
              {event.type}
            </span>

            {/* Audience Badge */}
            {event.audience && event.audience.map((aud) => {
              const audClass = AUDIENCE_BADGE_STYLE[aud.toLowerCase()] ?? 'bg-[#8e24aa] text-white'
              return (
                <span key={aud} className={`text-[10px] tracking-wider uppercase font-mono px-2.5 py-1 rounded font-semibold ${audClass}`}>
                  {aud}
                </span>
              )
            })}

            {/* Topics Tags */}
            {event.topics && event.topics.map((topic) => (
              <span
                key={topic}
                className="text-[10px] tracking-tight uppercase font-mono px-3 py-1 rounded-full border border-border/80 text-text-primary bg-bg-elevated/40"
              >
                {topic}
              </span>
            ))}
          </div>

          {/* Meta Info: Date and Location */}
          <div className="flex flex-col gap-3.5 border-t border-b border-border/40 py-4 mt-1">
            {/* Calendar / Date-Time */}
            <div className="flex items-center gap-3 text-text-primary/95 font-sans">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <Calendar size={15} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-text-secondary uppercase tracking-widest font-mono leading-none">Date & Time</span>
                <span className="text-sm font-medium mt-0.5">{formatDateTime(event.date)}</span>
              </div>
            </div>

            {/* Location */}
            {event.location && (
              <div className="flex items-center gap-3 text-text-primary/95 font-sans">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <MapPin size={15} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-secondary uppercase tracking-widest font-mono leading-none">Venue / Location</span>
                  <span className="text-sm font-medium mt-0.5">{event.location}</span>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] text-text-secondary uppercase tracking-widest font-mono">About the event</span>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed whitespace-pre-line">
              {event.description || 'No description available for this event.'}
            </p>
          </div>

          {/* Registration / External Link Button */}
          {event.link && !event.link.startsWith('/pages/') && (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg font-mono text-xs uppercase tracking-widest text-center text-white bg-accent hover:bg-accent/80 transition-all duration-300 font-semibold shadow-lg shadow-accent/10 hover:shadow-accent/25 hover:-translate-y-0.5"
            >
              Join / Register <ExternalLink size={12} />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  )
}
