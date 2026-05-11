import Tag from '@/components/ui/Tag'
import { Calendar, User } from 'lucide-react'

export interface Post {
  slug: string
  title: string
  date: string
  author: string
  tags: string[]
  excerpt: string
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="p-6 bg-bg-surface rounded-lg border border-border h-full flex flex-col gap-4 hover:border-accent/25 transition-all duration-300">
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Tag key={tag} type="Other" size="sm">
            {tag}
          </Tag>
        ))}
      </div>

      <div className="flex-1">
        <h3 className="font-display font-semibold text-text-primary mb-2 leading-snug">{post.title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed">{post.excerpt}</p>
      </div>

      <div className="flex items-center justify-between text-text-secondary text-xs font-mono pt-3 border-t border-border">
        <span className="flex items-center gap-1.5">
          <User size={10} />
          {post.author}
        </span>
        <time dateTime={post.date} className="flex items-center gap-1.5">
          <Calendar size={10} />
          {new Date(post.date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </time>
      </div>
    </article>
  )
}
