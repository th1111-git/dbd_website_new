import Hero from '@/components/home/Hero'
import AboutTeaser from '@/components/home/AboutTeaser'
import FeaturedEvents from '@/components/home/FeaturedEvents'
import WhatWeDo from '@/components/home/WhatWeDo'
import eventsData from '@/data/events.json'

export default function HomePage() {
  const featured = eventsData.slice(0, 4)
  return (
    <>
      <Hero />
      <AboutTeaser />
      <WhatWeDo />
      <FeaturedEvents events={featured} />
    </>
  )
}
