import type { Metadata } from 'next'
import SectionHeading from '@/components/ui/SectionHeading'
import PostCard from '@/components/blog/PostCard'
import type { Post } from '@/components/blog/PostCard'
import PageBackground from '@/components/layout/PageBackground'

export const metadata: Metadata = {
  title: 'Blog',
}

const posts: Post[] = [
]

export default function BlogPage() {
  return (
    <PageBackground>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <SectionHeading
          eyebrow="Blog"
          title="Write-ups & Posts"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-12 p-5 bg-bg-surface rounded-lg border border-border">
          <p className="font-mono text-sm text-text-secondary">
            <span className="text-accent">$</span> More posts coming soon. The blog is
            powered by MDX — contributions are welcome via{' '}
            <a
              href="https://github.com/databasediisc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </PageBackground>
  )
}
