import type { Metadata } from 'next'
import MemberGrid from '@/components/about/MemberGrid'
import SectionHeading from '@/components/ui/SectionHeading'
import PageBackground from '@/components/layout/PageBackground'
import { fetchMembers } from '@/lib/data'

export const metadata: Metadata = {
  title: 'About',
}

export default async function AboutPage() {
  const members = await fetchMembers()

  return (
    <PageBackground>
      {/* About text */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-8">
        <div className="max-w-2xl">
          <SectionHeading eyebrow="About" title="Who we are" />
          <div className="mt-8 space-y-4 text-text-secondary leading-relaxed">
            <p>
              Databased serves as the official undergraduate computer science club at the Indian Institute of Science, Bengaluru. The club is managed by undergraduate students from the Mathematics and Computing program, guided by Prof. Chiranjib Bhattacharya.
            </p>
            <p>
              The club exists to connect students who care about computer science in all its forms. Whether you are interested in theoretical computer science, building software systems, competing in programming contests, or studying cybersecurity, this is a community for hands-on application.
            </p>
            <p>
              We organize a steady schedule of events during the year. These include collaborative hackathons, competitive CTFs, technical workshops, and guest lectures from industry leaders. Our events are open to everyone from absolute beginners to advanced developers.
            </p>
          </div>
          {/*
          <div className="mt-8 p-4 bg-bg-surface rounded-lg border border-border">
            <p className="font-mono text-xs text-text-secondary">
              <span className="text-accent">Supervised by</span>{' '}
              Prof. Chiranjib Bhattacharya, CSA Department, IISc Bengaluru
            </p> 
          </div>
          */}
        </div>
      </section>

      {/* Members */}
      <section className="max-w-6xl mx-auto px-6 pt-8 pb-20">
        <SectionHeading
          eyebrow="Team"
          title="Members"
          subtitle="The people who make Databased what it is."
        />
        <div className="mt-10">
          <MemberGrid members={members} />
        </div>
      </section>
    </PageBackground>
  )
}
