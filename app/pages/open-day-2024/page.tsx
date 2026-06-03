'use client'

import { motion } from 'framer-motion'
import PageBackground from '@/components/layout/PageBackground'
import SectionHeading from '@/components/ui/SectionHeading'
import { Calendar, Clock, MapPin, Play, Code } from 'lucide-react'

const projects = [
  {
    title: "Tic Tac Toe",
    description: "Try your hand at beating Databased in a game of 4x4 Tic Tac Toe. Get to learn about the amazing field of Game Theory where mathematics and strategy meet to create the most optimal gameplay model.",
    image: "/img/open-day-2024/tictactoe.png",
    link: "/pages/open-day-2024/tictactoe/index.html",
    linkText: "Play Now!"
  },
  {
    title: "Catch Us or Be Fooled!",
    description: "Learn how Information Theory is used to fool people with card tricks. Explore the various fields and general aspects of life in which this field of science is applied - from error correction algorithms to signal processing. Try our error correction demonstration with your friends!",
    image: "/img/open-day-2024/card-trick.png",
    link: "/pages/open-day-2024/ecc/index.html",
    linkText: "Try Now!"
  },
  {
    title: "Rock Paper Scissors",
    description: "Learn how the game Rock Paper Scissors can be implemented with a computer determining what has been played, and see how the determination of hand gestures are made. Get the code for the demo and try it at home!",
    image: "/img/open-day-2024/rockpaperscissors.png",
    link: "https://github.com/databasedIISc/Open_Day-RockPaperScissors",
    linkText: "Get The Code",
    isExternal: true
  },
  {
    title: "Prompt Engineering",
    description: "Explore the new dimensions of coding by using tools like GitHub copilot. Join us on Open Day for a hands on demonstration on how Generative AI tooling is changing the software development landscape.",
    image: "/img/open-day-2024/encoding.png"
  },
  {
    title: "Demystifying QR Codes",
    description: "Quick Response Codes have become quite ubiquitous in today's world. They serve as real-life hyperlinks where a single scan with your mobile device can take you anywhere on the web. Learn what all goes on within your device to unpack the information encoded within QR Codes.",
    image: "/img/open-day-2024/qr-codes.png"
  }
]

export default function OpenDay2024() {
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
            eyebrow="February 24, 2024"
            title="Open Day '24"
            subtitle="Game Theory, Information Theory, and Generative AI brought to life."
            centered={true}
          />
          
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm font-mono text-text-secondary">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-accent" />
              <span>24th February, 2024</span>
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
                  src={`${project.image.startsWith('http') ? '' : basePath}${project.image}`}
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
                    href={project.isExternal ? project.link : `${basePath}${project.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white"
                  >
                    {project.isExternal ? <Code size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                    {project.linkText}
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
