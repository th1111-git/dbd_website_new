import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BackgroundEffects from '@/components/layout/BackgroundEffects'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Databased — IISc Undergraduate CS Club', template: '%s | Databased' },
  description: 'The undergraduate Computer Science club at IISc, run by B.Tech. Mathematics and Computing students under the CSA department.',
  keywords: ['IISc', 'computer science', 'club', 'Databased', 'mathematics', 'computing', 'CTF', 'competitive programming'],
  openGraph: {
    title: 'Databased — IISc Undergraduate CS Club',
    description: 'The undergraduate Computer Science club at IISc.',
    type: 'website',
    siteName: 'Databased',
  },
}

// Prevents theme flash — runs before React hydrates
const themeScript = `
(function(){
  var t=localStorage.getItem('theme');
  if(!t) t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';
  if(t==='light') document.documentElement.classList.add('light');
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-bg-base text-text-primary font-sans antialiased">
        {/* Fixed background layer — z:0, behind all content */}
        <BackgroundEffects />

        {/* Content wrapper — positioned after BackgroundEffects in DOM so it
            paints above it without needing an explicit z-index */}
        <div className="relative flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
