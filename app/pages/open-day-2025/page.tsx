'use client'

import { motion } from 'framer-motion'
import PageBackground from '@/components/layout/PageBackground'
import SectionHeading from '@/components/ui/SectionHeading'
import { Calendar, Clock, MapPin, Play } from 'lucide-react'

const projects = [
  {
    title: "Procedural Terrain Generation",
    description: "Have you ever wondered how some of your favorite open world games generate their world maps? Learn about noise based techniques for generating rich terrain with features like biomes.",
    image: "/img/open-day-2025/terrain-gen.webp",
    link: "/pages/open-day-2025/terrain-gen/index.html"
  },
  {
    title: "The Game of Nim",
    description: "Delve into the world of combinatorial games with our interactive demonstration of Nim, a classic math-based puzzle. Explore the logic and challenge of this timeless game firsthand.",
    image: "/img/open-day-2025/nim-game.webp",
    link: "/pages/open-day-2025/nim-game/index.html"
  },
  {
    title: "Maximise The Sum",
    description: "Explore the beauty of algorithms with our “Maximise the Sum” game! Challenge yourself to find optimal winning strategies and uncover the logic behind the problem.",
    image: "/img/open-day-2025/maximise-the-sum.webp",
    link: "/pages/open-day-2025/maximise-the-sum/index.html"
  },
  {
    title: "Semaphores",
    description: "We all use the internet everyday, there are millions of actions happening throughout the day. What if multiple things happen at the same time or conflict with each other? How do we deal with them?",
    image: "/img/open-day-2025/semaphores.webp"
  },
  {
    title: "Computer Vision",
    description: "Ever wondered how a machine can \"see\" faces? Watch as our system analyzes faces in real time, detecting every detail and recognizing patterns faster than the human eye!",
    image: "/img/open-day-2025/cv-game.webp"
  },
  {
    title: "CAPTCHA",
    description: "Test your skills against machines with our interactive CAPTCHA challenge! Dive into the world of automated security as you explore how CAPTCHAs distinguish humans from bots.",
    image: "/img/open-day-2025/captcha.webp"
  }
]

export default function OpenDay2025() {
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
          <SectionHeading
            eyebrow="February 28, 2025"
            title="Open Day '25"
            subtitle="Explore how computers play games, understand languages, and shape our future."
            centered={true}
          />
          
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm font-mono text-text-secondary">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-accent" />
              <span>1st March, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-accent" />
              <span>9:00 AM - 5:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-accent" />
              <span>G01, Old Physics Building</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20 max-w-3xl mx-auto text-text-secondary leading-relaxed text-center"
        >
          <p>
            The IISc Open Day is an annual event hosted by the Indian Institute of Science (IISc) in Bangalore, India, aimed at showcasing the institution's cutting-edge research, state-of-the-art facilities, and academic programs to the public. It provides an opportunity for visitors, including students, educators, and enthusiasts, to interact with faculty members, researchers, and students, gaining insights into various disciplines spanning science and engineering. Through engaging demonstrations, lab tours, and informative sessions, attendees get a glimpse into the groundbreaking work being conducted at IISc and its impact on society and technology. The Open Day fosters a spirit of curiosity, collaboration, and innovation, inspiring the next generation of scientists and engineers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-bg-surface hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="aspect-video w-full overflow-hidden border-b border-border relative">
                <div className="absolute inset-0 bg-gradient-to-t from-bg-surface/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={`${basePath}${project.image}`}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-lg font-display font-semibold text-text-primary mb-3">
                  {project.title}
                </h3>
                <p className="text-sm text-text-secondary flex-1 mb-6">
                  {project.description}
                </p>
                {project.link && (
                  <a
                    href={`${basePath}${project.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white"
                  >
                    <Play size={14} fill="currentColor" />
                    Play Now
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageBackground>
  )
}
