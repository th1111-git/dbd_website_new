import { ExternalLink, Calendar } from 'lucide-react'
import Tag from '@/components/ui/Tag'
import Link from 'next/link'

export interface Event {
  id: string
  title: string
  date: string
  type: string
  description: string
  link?: string | null
  image?: string | null
  location?: string | null
  topics?: string[]
  audience?: string[]
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function EventCard({ event, onClick }: { event: Event; onClick?: () => void }) {
  const isPast = new Date(event.date) < new Date()

  return (
    <div
      onClick={onClick}
      className={`h-full p-5 rounded-lg border transition-all duration-300 flex flex-col gap-3 group hover:-translate-y-0.5 ${
        onClick ? 'cursor-pointer hover:shadow-lg hover:shadow-black/5' : ''
      } ${
        isPast
          ? 'border-border bg-bg-surface hover:border-border/60'
          : 'border-accent/30 bg-bg-surface hover:border-accent/60'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <Tag type={event.type as Parameters<typeof Tag>[0]['type']}>{event.type}</Tag>
        {event.link && (
          <Link
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Open ${event.title}`}
            className="text-text-secondary hover:text-accent transition-colors"
          >
            <ExternalLink size={13} />
          </Link>
        )}
      </div>

      <h3 className="font-display font-semibold text-text-primary leading-snug text-sm flex-1">
        {event.title}
      </h3>

      <p className="text-text-secondary text-xs leading-relaxed line-clamp-3">
        {event.description}
      </p>

      <div className="flex items-center gap-1.5 text-text-secondary pt-1 border-t border-border">
        <Calendar size={10} />
        <time dateTime={event.date} className="font-mono text-xs">
          {formatDate(event.date)}
        </time>
      </div>
    </div>
  )
}
