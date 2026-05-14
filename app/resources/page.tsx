import type { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import resourcesData from '@/data/resources.json'
import PageBackground from '@/components/layout/PageBackground'

export const metadata: Metadata = {
  title: 'Resources',
}

const difficultyStyles: Record<string, string> = {
  Beginner:     'text-accent border-accent/20 bg-accent/8',
  Intermediate: 'text-sky-400 border-sky-400/20 bg-sky-400/8',
  Advanced:     'text-mono   border-mono/20   bg-mono/8',
}

export default function ResourcesPage() {
  const categories = [...new Set(resourcesData.map((r) => r.category))]

  return (
    <PageBackground>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <SectionHeading
          eyebrow="Resources"
          title="Learning Resources"
          subtitle="Curated links, reading lists, and guides across all areas of computer science."
        />

        <div className="mt-12 flex flex-col gap-14">
          {categories.map((category) => (
            <div key={category}>
              <div className="flex items-center gap-4 mb-5">
                <h2 className="font-mono text-xs text-accent uppercase tracking-widest shrink-0">
                  {category}
                </h2>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {resourcesData
                  .filter((r) => r.category === category)
                  .map((resource) => (
                    <a
                      key={resource.title}
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 bg-bg-surface rounded-lg border border-border hover:border-accent/25 transition-all duration-200 flex flex-col gap-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display font-semibold text-text-primary text-sm leading-snug group-hover:text-accent transition-colors">
                          {resource.title}
                        </h3>
                        <ExternalLink
                          size={12}
                          className="text-text-secondary shrink-0 mt-0.5 group-hover:text-accent transition-colors"
                        />
                      </div>
                      <p className="text-text-secondary text-xs leading-relaxed flex-1">
                        {resource.description}
                      </p>
                      <span
                        className={`self-start font-mono text-xs px-2 py-0.5 rounded border ${
                          difficultyStyles[resource.difficulty] ?? ''
                        }`}
                      >
                        {resource.difficulty}
                      </span>
                    </a>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageBackground>
  )
}
