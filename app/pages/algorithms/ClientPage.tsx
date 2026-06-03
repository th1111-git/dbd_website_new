'use client'

import { motion } from 'framer-motion'
import PageBackground from '@/components/layout/PageBackground'
import SectionHeading from '@/components/ui/SectionHeading'
import { Calendar, MapPin, Video, Users, FileText } from 'lucide-react'

interface Presentation {
  title: string
  presenters: string[]
  usernames: string[]
  abstract: string
}

const schedule = [
  { time: "09:30 AM - 10:00 AM", title: "Opening Ceremony", type: "event" },
  { time: "10:00 AM - 11:00 AM", title: "Secure Multiparty Computation", type: "presentation" },
  { time: "10:00 AM - 11:00 AM", title: "Optimal Resource Management With Online Decision Making Strategies", type: "presentation" },
  { time: "11:00 AM - 11:30 AM", title: "Tea Break", type: "break" },
  { time: "11:30 AM - 12:30 PM", title: "From Monkeys to Markets: Harnessing Genetic Algorithms for Financial Forecasting", type: "presentation" },
  { time: "11:30 AM - 12:30 PM", title: "Shor's Algorithm", type: "presentation" },
  { time: "12:30 PM - 01:30 PM", title: "Lunch Break", type: "break" },
  { time: "01:30 PM - 03:00 PM", title: "Dicing with Dice", type: "presentation" },
  { time: "01:30 PM - 03:00 PM", title: "Efficient Register Allocation through Chaitin's Graph-Coloring Algorithm", type: "presentation" },
  { time: "01:30 PM - 03:00 PM", title: "Spectral Clustering Algorithm", type: "presentation" },
  { time: "01:30 PM - 03:00 PM", title: "Understanding Protein Behavior: The Power of MCMC Algorithms", type: "presentation" },
  { time: "03:00 PM - 03:30 PM", title: "Tea Break", type: "break" },
  { time: "03:30 PM - 04:00 PM", title: "Monte Carlo Tree Search", type: "presentation" },
  { time: "04:00 PM", title: "Closing Remarks", type: "event" }
]

export default function ClientPage({ presentations }: { presentations: Presentation[] }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

  return (
    <PageBackground>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center gap-4 mb-8">
            <img src={`${basePath}/img/algorithms/dbd_acm_transparent.png`} alt="Databased and ACM-W Logo" className="h-20" />
          </div>
          
          <SectionHeading
            eyebrow="October 20, 2024"
            title="Algorithm Festival"
            subtitle="Organized by Databased & ACM-W, under the mentorship of Prof. C Pandurangan."
            centered={true}
          />
          
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm font-mono text-text-secondary">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-accent" />
              <span>20th October, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-accent" />
              <span>CSA-104 Seminar Hall</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-border bg-bg-surface p-8 shadow-lg shadow-black/20"
            >
              <h2 className="text-2xl font-semibold text-text-primary mb-6 flex items-center gap-3">
                <Video className="text-accent" />
                Live Stream
              </h2>
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-black/50">
                <iframe 
                  src="https://www.youtube.com/embed/n9je5Mocqnc?si=CR8qsoTxsB5ucMuI" 
                  title="YouTube video player" 
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-border bg-bg-surface p-8 shadow-lg shadow-black/20"
            >
              <h2 className="text-2xl font-semibold text-text-primary mb-6 flex items-center gap-3">
                <Calendar className="text-accent" />
                Schedule
              </h2>
              <div className="space-y-4">
                {schedule.map((item, idx) => (
                  <div key={idx} className={`flex items-start gap-4 pb-4 border-b border-border/50 last:border-0 last:pb-0 ${item.type === 'break' ? 'opacity-60' : ''}`}>
                    <div className="text-text-secondary text-sm font-mono w-28 shrink-0">{item.time.split(' - ')[0]}</div>
                    <div className={`flex-1 text-sm ${item.type === 'break' ? 'italic' : 'font-medium text-text-primary'}`}>
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-semibold text-text-primary mb-8 flex items-center gap-3">
                <FileText className="text-accent" />
                Presentations
              </h2>
              
              <div className="space-y-6">
                {presentations.map((p, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="rounded-xl border border-border bg-bg-surface p-6 shadow-lg hover:border-accent/30 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-text-primary mb-4 leading-snug">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-6 flex-wrap">
                      <Users size={16} className="text-text-secondary" />
                      {p.presenters.map((presenter, i) => (
                        <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                          {presenter}
                        </span>
                      ))}
                    </div>
                    <div className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">
                      <span className="font-semibold text-text-primary">Abstract: </span>
                      {p.abstract}
                    </div>
                  </motion.div>
                ))}
                
                {presentations.length === 0 && (
                  <div className="text-center py-12 text-text-secondary border border-dashed border-border rounded-xl">
                    Failed to load presentations.
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageBackground>
  )
}
