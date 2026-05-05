import type { Metadata } from 'next'
import SectionHeading from '@/components/ui/SectionHeading'
import PostCard from '@/components/blog/PostCard'
import type { Post } from '@/components/blog/PostCard'

export const metadata: Metadata = {
  title: 'Blog',
}

const posts: Post[] = [
  {
    slug: 'picoctf-2024-writeup',
    title: 'PicoCTF 2024 — Web Exploitation Write-up',
    date: '2024-03-20',
    author: 'Databased Team',
    tags: ['CTF', 'Web'],
    excerpt:
      'A walkthrough of the web exploitation challenges from PicoCTF 2024, covering SQL injection, SSRF, XSS, and CSRF — with annotated solution scripts.',
  },
  {
    slug: 'intro-to-competitive-programming',
    title: 'Getting Started with Competitive Programming',
    date: '2024-02-10',
    author: 'Databased Team',
    tags: ['Tutorial', 'CompProg'],
    excerpt:
      'A beginner-friendly guide to competitive programming — which resources to use, how to practice effectively, and which contests to target first.',
  },
  {
    slug: 'open-day-2024-recap',
    title: 'IISc Open Day 2024 — Highlights & Recap',
    date: '2024-03-02',
    author: 'Databased Team',
    tags: ['Event', 'Recap'],
    excerpt:
      'A recap of the demos and activities we ran at IISc Open Day 2024, including live CTF challenges and interactive algorithm visualisations for school students.',
  },
]

export default function BlogPage() {
  return (
    <div className="pt-16">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <SectionHeading
          eyebrow="Blog"
          title="Write-ups & Posts"
          subtitle="CTF write-ups, tutorials, event recaps, and thoughts from the Databased team."
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
    </div>
  )
}
