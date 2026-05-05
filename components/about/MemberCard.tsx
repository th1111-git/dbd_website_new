import { Github, Linkedin } from 'lucide-react'
import Image from 'next/image'

export interface Member {
  name: string
  role: string
  year: string
  category: string
  photo?: string
  links?: {
    github?: string
    linkedin?: string
  }
}

export default function MemberCard({ member }: { member: Member }) {
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const hasLinks = member.links && Object.values(member.links).some(Boolean)

  return (
    <div className="p-5 bg-bg-surface rounded-lg border border-border hover:border-accent-dim transition-all duration-300 flex flex-col items-center text-center gap-3">
      <div className="w-16 h-16 rounded-full overflow-hidden bg-accent-dim flex items-center justify-center shrink-0">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            width={64}
            height={64}
            className="object-cover"
          />
        ) : (
          <span className="font-mono text-accent text-lg font-semibold">{initials}</span>
        )}
      </div>

      <div>
        <p className="font-semibold text-text-primary text-sm">{member.name}</p>
        <p className="text-text-secondary text-xs font-mono mt-0.5">{member.role}</p>
        <p className="text-text-secondary text-xs font-mono opacity-50">{member.year}</p>
      </div>

      {hasLinks && (
        <div className="flex items-center gap-3">
          {member.links?.github && (
            <a
              href={member.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on GitHub`}
              className="text-text-secondary hover:text-accent transition-colors"
            >
              <Github size={14} />
            </a>
          )}
          {member.links?.linkedin && (
            <a
              href={member.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="text-text-secondary hover:text-accent transition-colors"
            >
              <Linkedin size={14} />
            </a>
          )}
        </div>
      )}
    </div>
  )
}
