import Image from 'next/image'

export interface Member {
  name: string
  role: string
  year: string
  category: string
  bio?: string
  photo?: string
  links?: {
    github?: string
    linkedin?: string
    email?: string
  }
}

export default function MemberCard({ member, onClick }: { member: Member; onClick?: () => void }) {
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <button
      onClick={onClick}
      className="w-full p-5 bg-bg-surface rounded-lg border border-border hover:border-accent/40 hover:bg-bg-elevated transition-all duration-300 flex flex-col items-center text-center gap-3 cursor-pointer group"
    >
      <div className="w-16 h-16 rounded-full overflow-hidden bg-accent-dim flex items-center justify-center shrink-0 ring-1 ring-transparent group-hover:ring-accent/30 transition-all duration-300">
        {member.photo ? (
          <Image
            src={member.photo.startsWith('/') ? `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${member.photo}` : member.photo}
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
        <p className="font-display font-semibold text-text-primary text-sm">{member.name}</p>
        <p className="text-text-secondary text-xs font-mono mt-0.5">{member.role}</p>
        <p className="text-text-secondary text-xs font-mono opacity-50">{member.year}</p>
      </div>
    </button>
  )
}
