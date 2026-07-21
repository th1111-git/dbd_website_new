import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, League_Spartan } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })
const leagueSpartan = League_Spartan({ subsets: ['latin'], variable: '--font-display', display: 'swap' })

export const metadata: Metadata = {
  title: { default: "Databased | IISc's Undergraduate CS Club", template: "%s | Databased" },
  description: 'The undergraduate Computer Science club at IISc, run by B.Tech. Mathematics and Computing students under the CSA department.',
  keywords: ['IISc', 'computer science', 'club', 'Databased', 'mathematics', 'computing', 'CTF', 'competitive programming'],
  openGraph: {
    title: "Databased | IISc's Undergraduate CS Club",
    description: 'The undergraduate Computer Science club at IISc.',
    type: 'website',
    siteName: 'Databased',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${leagueSpartan.variable}`} suppressHydrationWarning>
      <body className="bg-bg-base text-text-primary font-sans antialiased">
        <div className="relative flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
