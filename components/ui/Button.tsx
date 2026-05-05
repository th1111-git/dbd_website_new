import Link from 'next/link'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'filled' | 'outlined' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  external?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const variantStyles = {
  // Primary: green border + green text on elevated surface — logo green as accent, never as fill
  filled:   'bg-bg-elevated text-accent border border-accent hover:bg-accent/5',
  // Outlined: dim border, switches to orange on hover
  outlined: 'bg-transparent text-text-secondary border border-border hover:border-mono hover:text-mono',
  ghost:    'bg-transparent text-text-secondary border border-transparent hover:text-text-primary',
}

const sizeStyles = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-sm px-6 py-3',
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'filled',
  size = 'md',
  className = '',
  external = false,
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const base = `inline-flex items-center gap-2 font-mono rounded transition-all duration-200 ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''} ${className}`

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
        {children}
      </a>
    ) : (
      <Link href={href} className={base}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  )
}
