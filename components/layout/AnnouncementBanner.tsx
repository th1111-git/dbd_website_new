'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="relative bg-mono-dim border-b border-mono/15 px-4 py-2.5 flex items-center justify-center gap-4">
      <p className="text-xs font-mono text-text-primary text-center">
        <span className="text-mono mr-2">→</span>
        Databased is actively recruiting coordinators for 2025–26.{' '}
        <a
          href="mailto:databased.csa@iisc.ac.in"
          className="underline underline-offset-2 hover:text-mono transition-colors"
        >
          Get in touch
        </a>
      </p>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute right-4 text-text-secondary hover:text-text-primary transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  )
}
