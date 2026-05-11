import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono text-7xl font-bold text-accent mb-4">404</p>
        <h1 className="font-display text-2xl font-bold text-text-primary mb-3">Page not found</h1>
        <p className="text-text-secondary mb-8 font-mono text-sm">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button href="/" variant="outlined">
          Go home
        </Button>
      </div>
    </div>
  )
}
