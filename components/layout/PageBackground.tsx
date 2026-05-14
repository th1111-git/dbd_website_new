export default function PageBackground({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="pt-16 min-h-screen bg-bg-base relative overflow-x-hidden"
      style={{
        backgroundImage: `
          linear-gradient(rgba(46,50,62,0.27) 1px, transparent 1px),
          linear-gradient(90deg, rgba(46,50,62,0.35) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }}
    >
      <div className="relative">{children}</div>
    </div>
  )
}
