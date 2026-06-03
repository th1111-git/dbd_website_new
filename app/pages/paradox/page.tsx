'use client'

import { motion } from 'framer-motion'
import PageBackground from '@/components/layout/PageBackground'
import SectionHeading from '@/components/ui/SectionHeading'
import { Calendar, MapPin } from 'lucide-react'

const paradoxes = [
  {
    title: "Berry's paradox",
    description: "In this presentation of Berry's Paradox, we take a more general approach towards how we see and solve such paradoxes. We see how these kinds of self-referential paradoxes arise in certain language domains only, and the reason behind them doing so.",
    presenters: "Hridam Majumder and Sirjan Hansda",
    videoUrl: "https://www.youtube.com/embed/ylxNBoe8Sq4"
  },
  {
    title: "Cramer's Paradox",
    description: "The Cramer-Euler paradox is a mathematical paradox found within the realm of differential geometry. It presents a situation where the number of intersections between two curves of higher order in the plane can exceed the number of arbitrary points typically required to define one of those curves.",
    presenters: "Varivashya Poladi, Anishka Vaitla and Sannidhi V. Hebbar",
    videoUrl: "https://www.youtube.com/embed/ZU9MXg9xC8M"
  },
  {
    title: "Is it all Incomplete?",
    description: "Gödel's theorem of incompleteness revolutionized our understanding of the foundation of mathematics, shook its limits of concreteness, and shattered the dreams of complete and consistent proof. 1 Line. 4 words. At the core of what broke mathematics: “This statement is False.”",
    presenters: "Anushka Dassi and Pinakin Choudhary",
    videoUrl: "https://www.youtube.com/embed/JnH4MOSvZ5E"
  },
  {
    title: "\"Just One More\" Paradox",
    description: "Addiction to gambling is a paradoxical dance between fleeting wins and inevitable losses. In this presentation, we'll delve into this perplexing phenomenon, exploring why gamblers always feel the urge to play \"just one more\" despite the odds stacking against them.",
    presenters: "Sahil Chaudhary and Mrigank Pawagi",
    videoUrl: "https://www.youtube.com/embed/QOHKsUL5plQ"
  },
  {
    title: "Grelling-Nelson Paradox",
    description: "Prepare to have your perception of language and logic turned on its head as you join us on a mind-twisting journey into the fascinating realm of the Grelling Nelson Paradox. Have you ever come across words that describe themselves? Words like \"autological\" and \"heterological\"?",
    presenters: "Naman Mishra and Indrayudh Das",
    videoUrl: "https://www.youtube.com/embed/5jjya2HjWHw"
  },
  {
    title: "Banach-Tarski Paradox",
    description: "The Banach Tarski Paradox was proposed by Stefan Banach and Alfred Tarski, is all about creating two identical objects from one (without cheating!) by using math! It's all about creating “something from nothing”. Believe it or not, it can help you create a Sun using a pea, knife, and a lot of math.",
    presenters: "Armaan Khetarpaul",
    videoUrl: "https://www.youtube.com/embed/ueUJ4NTjj9E"
  },
  {
    title: "Gabriel's Horn Paradox",
    description: "In this thought-provoking video, we explore the mind-boggling world of a shape with infinite surface area but finite volume. Join us on an intellectual journey as we delve into the enigmatic paradox known as Gabriel's Horn, a trumpet-shaped object with a finite length but an infinitely expanding curve.",
    presenters: "Sanidhya Kaushik, Arnav Bhatt and Ayush Raina",
    videoUrl: "https://www.youtube.com/embed/Ib9YwQsSYs0"
  },
  {
    title: "Sierpinski-Mazurkiewicz Paradox",
    description: "We give you a special lemon (possibly larger and any object you could think of) and chop it into pieces in a weird way, only to group them into two parts which we move around and magically obtain two lemons back at the chopping board.",
    presenters: "Maitreya Bhaduri and Ishaq Hamza",
    videoUrl: "https://www.youtube.com/embed/ySwbvBRmT08"
  },
  {
    title: "Unexpected Hanging Paradox",
    description: "Prepare to be captivated as you join us to explore the enigmatic world of the Unexpected Hanging Paradox. Picture a prisoner on death row, facing an execution that will surprise even the keenest of minds. How can a seemingly certain outcome turn into an unexpected twist?",
    presenters: "R.K. Shishir and Aditya Gupta",
    videoUrl: "https://www.youtube.com/embed/6XVAfLQie54"
  }
]

export default function ParadoxFestival() {
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
            eyebrow="May 14, 2023"
            title="Paradox Festival"
            subtitle="An event introducing the audience to the world of paradoxes in science and mathematics."
            centered={true}
          />
          
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm font-mono text-text-secondary">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-accent" />
              <span>14th May, 2023</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-accent" />
              <span>IISc Bangalore</span>
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
            The Paradox festival is an event organised by Databased and the IISc ACM-W Student Chapter under the guidance of Prof. Pandurangan and the Kotak IISc AI ML Center. It aims to introduce the audience to the world of paradoxes, and how they are used in various fields of science and mathematics.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paradoxes.map((paradox, i) => (
            <motion.div
              key={paradox.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-bg-surface hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="aspect-video w-full overflow-hidden border-b border-border bg-black relative">
                <iframe 
                  loading="lazy" 
                  className="w-full h-full" 
                  src={paradox.videoUrl} 
                  title={`${paradox.title} - YT video`} 
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-lg font-display font-semibold text-text-primary mb-2">
                  {paradox.title}
                </h3>
                <p className="text-xs font-mono text-accent mb-4">
                  Presented by: {paradox.presenters}
                </p>
                <p className="text-sm text-text-secondary flex-1">
                  {paradox.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageBackground>
  )
}
