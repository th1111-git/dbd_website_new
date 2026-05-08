import Grainient from '@/components/ui/Grainient'

export default function InnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Fixed viewport-sized container so Grainient (absolute inside) fills the screen */}
      <div
        aria-hidden="true"
        className="pointer-events-none"
        style={{ position: 'fixed', inset: 0, zIndex: 1 }}
      >
        <Grainient />
      </div>
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </>
  )
}
