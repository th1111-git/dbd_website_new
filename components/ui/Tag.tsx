import { ReactNode } from 'react'

type TagType = 'CTF' | 'Talk' | 'Workshop' | 'Competition' | 'Other' | 'default'

interface TagProps {
  children: ReactNode
  type?: TagType
  size?: 'sm' | 'md'
}

const typeStyles: Record<TagType, string> = {
  // Orange — logo orange, per design spec for CTF/competition tags
  CTF:         'text-mono   bg-mono/10   border-mono/25',
  Competition: 'text-mono   bg-mono/10   border-mono/25',
  // Green — logo green for talks (primary, featured)
  Talk:        'text-accent bg-accent/10 border-accent/25',
  // Blue-ish for workshops (neutral, neither brand colour)
  Workshop:    'text-sky-400 bg-sky-400/10 border-sky-400/20',
  Other:       'text-text-muted bg-bg-elevated border-border',
  default:     'text-text-muted bg-bg-elevated border-border',
}

const sizeStyles = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
}

export default function Tag({ children, type = 'default', size = 'md' }: TagProps) {
  const colorClass = typeStyles[type] ?? typeStyles.default
  return (
    <span className={`inline-flex items-center font-mono rounded border ${colorClass} ${sizeStyles[size]}`}>
      {children}
    </span>
  )
}
