import type { Metadata } from 'next'
import membersData from '@/data/members.json'
import MemberGrid from '@/components/about/MemberGrid'
import SectionHeading from '@/components/ui/SectionHeading'

export const metadata: Metadata = {
  title: 'About',
}

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* About text */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <SectionHeading eyebrow="About" title="Who we are" />
          <div className="mt-8 space-y-4 text-text-secondary leading-relaxed">
            <p>
              Databased is the undergraduate computer science club at the Indian Institute
              of Science (IISc), Bengaluru. We are run by B.Tech. Mathematics and Computing
              students under the Department of Computational and Data Sciences (CDS),
              supervised by Prof. Chiranjib Bhattacharya.
            </p>
            <p>
              Our goal is to build a thriving community of students passionate about
              computer science — from theoretical algorithms to practical systems,
              competitive programming to cybersecurity research. We believe in learning
              by doing, and every event we host reflects that.
            </p>
            <p>
              We host events throughout the academic year: workshops, CTF competitions,
              tech talks from researchers and industry leaders, and collaborative
              hackathons. Everyone is welcome — beginners and experts alike.
            </p>
          </div>

          <div className="mt-8 p-4 bg-bg-surface rounded-lg border border-border">
            <p className="font-mono text-xs text-text-secondary">
              <span className="text-accent">Supervised by</span>{' '}
              Prof. Chiranjib Bhattacharya, CSA Department, IISc Bengaluru
            </p>
          </div>
        </div>
      </section>

      {/* Members */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <SectionHeading
          eyebrow="Team"
          title="Members"
          subtitle="The people who make Databased what it is."
        />
        <div className="mt-10">
          <MemberGrid members={membersData} />
        </div>
      </section>
    </div>
  )
}
