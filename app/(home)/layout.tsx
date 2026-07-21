import BackgroundEffects from '@/components/layout/BackgroundEffects'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* DotField background — only renders on the home page */}
      <BackgroundEffects />
      {children}
    </>
  )
}
