import type { Metadata } from 'next'
import Image from 'next/image'
import { Github, ExternalLink } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import PageBackground from '@/components/layout/PageBackground'

export const metadata: Metadata = {
  title: 'Projects',
}

interface ProjectLink {
  label: string
  href: string
  icon: 'github' | 'external'
}

interface Project {
  title: string
  description: string
  image: string
  links: ProjectLink[]
}

const projects: Project[] = [
  {
    title: 'Deemak',
    description:
      'A Text Based Adventure Game Engine written in Rust. Designed to be simple, flexible, and extensible for creating text-based adventure games — playable in the Deemak GUI or on the Web.',
    image: '/projects/project-deemak.png',
    links: [
      { label: 'GitHub', href: 'https://github.com/databasedIISc/deemak', icon: 'github' },
    ],
  },
  {
    title: 'HinglishEval',
    description:
      'A benchmark for evaluating the effectiveness of code-generation models on Hinglish prompts. Presented at COMPUTE 2024.',
    image: '/projects/project-HinglishEval_Compute2024.jpg',
    links: [
      { label: 'View Paper', href: 'https://link.springer.com/chapter/10.1007/978-3-031-84391-4_2', icon: 'external' },
      { label: 'GitHub', href: 'https://github.com/mrigankpawagi/HinglishEval', icon: 'github' },
    ],
  },
  {
    title: 'SaiMan',
    description:
      'A tool designed to encrypt your information — text or images — with a customisable encryption key, so you can securely share your data with others.',
    image: '/projects/project-saiman.png',
    links: [
      { label: 'Visit Page', href: 'https://sathvik040105.github.io/crypto-SaiMan/', icon: 'external' },
      { label: 'GitHub', href: 'https://github.com/Sathvik040105/crypto-SaiMan', icon: 'github' },
    ],
  },
]

export default function ProjectsPage() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

  return (
    <PageBackground>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <SectionHeading
          eyebrow="Projects"
          title="What we've built"
          subtitle="Open source software and research by Databased members."
        />

        <div className="mt-14 flex flex-col gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group flex flex-col md:flex-row gap-0 bg-bg-surface border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-colors duration-300"
            >
              {/* Thumbnail */}
              <div className="md:w-72 lg:w-96 shrink-0 overflow-hidden bg-bg-elevated">
                <Image
                  src={`${base}${project.image}`}
                  alt={project.title}
                  width={480}
                  height={288}
                  className="w-full h-52 md:h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  unoptimized
                />
              </div>

              {/* Info */}
              <div className="flex flex-col justify-between gap-6 p-7">
                <div className="space-y-3">
                  <h2 className="font-display font-bold text-2xl text-text-primary">
                    {project.title}
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed max-w-prose">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded border border-border bg-bg-elevated hover:border-accent/50 hover:text-accent text-text-secondary font-mono text-xs transition-all duration-200"
                    >
                      {link.icon === 'github' ? (
                        <Github size={13} />
                      ) : (
                        <ExternalLink size={13} />
                      )}
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageBackground>
  )
}
