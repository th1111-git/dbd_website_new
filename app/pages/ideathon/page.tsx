'use client'

import { motion } from 'framer-motion'
import PageBackground from '@/components/layout/PageBackground'
import SectionHeading from '@/components/ui/SectionHeading'
import { Calendar, Download, Trophy, FileText, CheckCircle2 } from 'lucide-react'

const schedule = [
  {
    day: "Thursday, 08/08/2024",
    events: [
      { time: "All Day", title: "Last Day of Registration", color: "text-red-400" }
    ]
  },
  {
    day: "Saturday, 10/08/2024",
    events: [
      { time: "10:00 AM - 10:30 AM", title: "Introduction" },
      { time: "10:30 AM - 11:30 AM", title: "Talk by Prof. C Pandu Rangan" },
      { time: "11:30 AM - 12:15 PM", title: "Problem Statement Reveal", link: "/pages/ideathon/slides.pdf", linkText: "Download Slides" },
      { time: "12:15 PM onwards", title: "Ideathon Commences", color: "text-green-400" }
    ]
  },
  {
    day: "Sunday, 11/08/2024",
    events: [
      { time: "10:00 AM", title: "Deadline for Presentation Submission", color: "text-red-400" },
      { time: "10:00 AM - 10:30 AM", title: "Session Kick-off" },
      { time: "10:30 AM - 11:30 AM", title: "Talk by Shri. Sunny Manchanda" },
      { time: "11:30 AM - 01:00 PM", title: "Presentations by Teams" },
      { time: "01:00 PM - 02:30 PM", title: "Lunch Break" },
      { time: "02:30 PM - 04:30 PM", title: "Presentations by Teams" },
      { time: "04:30 PM - 05:00 PM", title: "Winner Announcement", color: "text-yellow-400" }
    ]
  }
]

const rules = [
  "Teams will have time from 12:15 PM on Day 1 to 10:00 AM on Day 2 to brainstorm an idea and submit their presentations.",
  "Each team will be given 10 minutes to present their ideas on stage followed by 5 minutes for critique by other teams and response to the criticism.",
  "The presentation should include the following sections - Problem Identification, Solution, Implementation, Impact (optional), and any other relevant information (optional).",
  "Use of the Internet and AI tools is encouraged for research on the problem. However, plagiarism of solutions will be countered with strict measures.",
  "All teams must work independently on their solution and presentations. If teams are found to be collaborating with others, the teams may be disqualified at the discretion of the judges.",
  "The ideas presented will be judged over various criteria. Teams can also earn bonus points for valid criticism of other ideas as well as prompt counters to received criticism.",
  "Databased reserves the sole right to make decisions pertaining to the evaluation of presented ideas, managing the participating teams, and any other matters involving the event."
]

export default function Ideathon2024() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

  return (
    <PageBackground>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <SectionHeading
            eyebrow="August 10-11, 2024"
            title="Tech Ideathon '24"
            subtitle="A 24-hour sprint to solve real-world problems with innovative tech solutions."
            centered={true}
          />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
                <Calendar className="text-accent" />
                <h2 className="text-2xl font-display font-semibold text-text-primary">Event Schedule</h2>
              </div>
              
              <div className="space-y-8">
                {schedule.map((day, dayIdx) => (
                  <div key={dayIdx} className="rounded-xl border border-border bg-bg-surface overflow-hidden">
                    <div className="bg-border/50 px-6 py-3 border-b border-border">
                      <h3 className="font-semibold text-text-primary">{day.day}</h3>
                    </div>
                    <div className="p-6 space-y-6">
                      {day.events.map((event, eventIdx) => (
                        <div key={eventIdx} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                          <div className="text-text-secondary sm:w-40 shrink-0 font-mono text-sm pt-0.5">
                            {event.time}
                          </div>
                          <div className="flex-1">
                            <div className={`font-medium ${event.color || 'text-text-primary'}`}>
                              {event.title}
                            </div>
                            {event.link && (
                              <a
                                href={`${basePath}${event.link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 mt-2 text-sm text-accent hover:text-accent-hover transition-colors"
                              >
                                <Download size={14} />
                                {event.linkText}
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
                <Trophy className="text-yellow-400" />
                <h2 className="text-2xl font-display font-semibold text-text-primary">Winners</h2>
              </div>
              <div className="rounded-xl overflow-hidden border border-border shadow-lg">
                <img 
                  src={`${basePath}/img/ideathon/ideathon_winners.png`} 
                  alt="Winners of Ideathon 2024" 
                  className="w-full h-auto"
                />
                <div className="p-4 bg-bg-surface border-t border-border text-center text-sm text-text-secondary">
                  Team: Error 404 Team Not Found
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
                <FileText className="text-accent" />
                <h2 className="text-2xl font-display font-semibold text-text-primary">Rules & Guidelines</h2>
              </div>
              <ul className="space-y-4">
                {rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-text-secondary text-sm leading-relaxed">
                    <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </PageBackground>
  )
}
