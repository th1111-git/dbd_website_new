'use client'

import DotField from '@/components/background/DotField'

export default function BackgroundEffects() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: -1 }}
    >
      <DotField
        dotRadius={3.2}
        dotSpacing={18}
        cursorRadius={80}
        bulgeOnly
        bulgeStrength={80}
        glowRadius={60}
        gradientFrom="rgba(255,102,0,0.65)"
        gradientTo="rgba(16,249,51,0.45)"
        glowColor="rgba(255,102,0,0.12)"
        sparkle={false}
        waveAmplitude={0}
      />
    </div>
  )
}
