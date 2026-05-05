'use client'

const FILTERS = ['All', 'CTF', 'Talk', 'Workshop', 'Competition', 'Other']

interface EventFiltersProps {
  active: string
  onFilter: (filter: string) => void
}

export default function EventFilters({ active, onFilter }: EventFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter events by type">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilter(filter)}
          aria-pressed={active === filter}
          className={`font-mono text-xs px-3 py-1.5 rounded border transition-all duration-200 ${
            active === filter
              ? 'bg-accent text-bg-base border-accent'
              : 'bg-bg-surface text-text-secondary border-border hover:border-accent/40 hover:text-text-primary'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}
