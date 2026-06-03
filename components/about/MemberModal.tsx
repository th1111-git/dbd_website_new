'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Linkedin, Mail, X } from 'lucide-react'
import type { Member } from './MemberCard'

interface MemberModalProps {
  member: Member | null
  onClose: () => void
}

export default function MemberModal({ member, onClose }: MemberModalProps) {
  useEffect(() => {
    if (!member) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [member, onClose])

  const initials = member
    ? member.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : ''

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
          onClick={onClose}
        >
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-2xl border border-border bg-bg-surface p-14 flex flex-col items-center text-center gap-6 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
            >
              <X size={16} />
            </button>

            {/* Avatar */}
            <div className="relative">
              <div className="w-36 h-36 rounded-full overflow-hidden bg-accent-dim ring-2 ring-accent/30 flex items-center justify-center">
                {member.photo ? (
                  <Image
                    src={member.photo.startsWith('/') ? `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${member.photo}` : member.photo}
                    alt={member.name}
                    width={144}
                    height={144}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="font-display text-accent text-5xl font-bold">{initials}</span>
                )}
              </div>
            </div>

            {/* Batch badge */}
            <span className="font-mono text-[10px] tracking-widest uppercase text-text-muted border border-border px-3 py-1 rounded-sm">
              Batch of {member.year}
            </span>

            {/* Name + role */}
            <div className="space-y-1">
              <h2 className="font-display font-bold text-3xl text-text-primary leading-tight">
                {member.name}
              </h2>
              <p className="font-mono text-xs text-accent">{member.role}</p>
            </div>

            {/* Bio */}
            {member.bio && (
              <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
                {member.bio}
              </p>
            )}

            {/* Social links */}
            {(member.links?.github || member.links?.linkedin || member.links?.email) && (
              <div className="flex items-center gap-3 pt-1">
                {member.links?.email && (
                  <a
                    href={`mailto:${member.links.email}`}
                    aria-label="Email"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                    style={{ backgroundColor: '#f59e0b' }}
                  >
                    <Mail size={15} color="#000" />
                  </a>
                )}
                {member.links?.linkedin && (
                  <a
                    href={member.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                    style={{ backgroundColor: '#0a66c2' }}
                  >
                    <Linkedin size={15} color="#fff" />
                  </a>
                )}
                {member.links?.github && (
                  <a
                    href={member.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                    style={{ backgroundColor: '#24292e' }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
