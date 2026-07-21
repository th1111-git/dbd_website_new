'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import LiquidEther from '@/components/ui/LiquidEther'
import s from './page.module.css'

/* ── Geometric overlay: circles, arcs, dots (poster 3 style) ── */
function GeoOverlay() {
  return (
    <div className={s.geoOverlay} aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
        {/* Large circle — upper-center */}
        <circle cx="820" cy="340" r="180" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
        {/* Medium circle — lower-left */}
        <circle cx="460" cy="520" r="120" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" />
        {/* Small circle — bottom-right */}
        <circle cx="1100" cy="650" r="60" stroke="rgba(255,255,255,0.05)" strokeWidth="0.6" />
        {/* Arc sweep */}
        <path d="M200 100 Q 700 200 1300 50" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6" />
        <path d="M100 700 Q 600 500 1400 800" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6" />
        {/* Diagonal line */}
        <line x1="300" y1="80" x2="1200" y2="800" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        {/* Dots */}
        <circle cx="620" cy="160" r="3" fill="rgba(255,255,255,0.18)" />
        <circle cx="380" cy="680" r="3" fill="rgba(255,255,255,0.15)" />
        <circle cx="1150" cy="760" r="3" fill="rgba(255,255,255,0.15)" />
        <circle cx="900" cy="200" r="2.5" fill="rgba(255,255,255,0.12)" />
      </svg>
    </div>
  )
}

/* ── Main page ───────────────────────────────────────── */
export default function AxiomPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('mousemove', onMove)
      return () => window.removeEventListener('mousemove', onMove)
    }
  }, [])


  const px = (depth: number) => ({
    transform: `translate(${mousePos.x * depth}px, ${mousePos.y * depth}px)`,
    transition: 'transform 0.15s ease-out',
  })

  return (
    <div className={s.page}>
      {/* ── Background layers ── */}
      <div className={s.bgCanvas}>
        <LiquidEther
          mouseForce={14}
          cursorSize={70}
          viscous={60}
          isViscous={false}
          isBounce={false}
          resolution={0.25}
          colors={['#000000', '#5787ff', '#1014d1']}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
        />
      </div>

      <GeoOverlay />

      {/* ── Content ── */}
      <div className={s.content}>

        {/* ══════════ HERO ══════════ */}
        <section className={s.hero}>

          {/* Top row */}
          <div className={s.topRow}>
            <div className={s.mindsetTag} style={px(3)}>
              O(1) MINDSET. <span className={s.accent}>✦</span>
            </div>
            <div className={s.scanTag} style={px(2)}>
              SCAN TO REGISTER <span style={{ fontSize: '1rem' }}>↙</span>
            </div>
          </div>

          {/* Center title block */}
          <div className={s.centerBlock}>
            <p className={s.eyebrow}>A Competitive Programming Event</p>
            <h1 className={s.title} style={px(1)}>AXIOM</h1>
            <div className={s.arrow}>↙</div>
          </div>

          {/* Event details */}
          <div className={s.detailsRow}>
            <div className={s.detailItem}>
              <div className={s.detailLabel}><span className={s.dia}>✦</span> Round</div>
              <div className={s.detailValue}>Online Prelims</div>
            </div>
            <div className={s.detailItem}>
              <div className={s.detailLabel}><span className={s.dia}>✦</span> Platform</div>
              <div className={s.detailValue}>Codeforces</div>
            </div>
          </div>

          {/* Date */}
          <div className={s.dateRow}>
            <div className={s.detailLabel} style={{ justifyContent: 'center' }}>
              <span className={s.dia}>✦</span> Date
            </div>
            <div className={s.detailValue}>
              27<sup>th</sup> June 2026
            </div>
          </div>

          {/* Tagline */}
          <div className={s.tagline}>
            <p className={s.taglineText}>
              Prove your mettle in the prelims to secure an invite to the final showdown at IISc.
            </p>
          </div>

          {/* Left side label */}
          <div className={s.sideLeft} style={px(2)}>
            <span className={s.vertText}>Registrations Open</span>
            <div className={s.arrows}>
              <span>↗</span>
              <span>↗</span>
            </div>
          </div>

          {/* Sponsors */}
          <div className={s.bottomSection}>
            <div className={s.orgRow}>
              <span className={s.orgLabel}>Organised by</span>
              <div className={s.orgLogos}>
                <span>DBD</span>
                <span>×</span>
                <span>OA</span>
              </div>
            </div>
            <div className={s.supportRow}>
              <div className={s.supportLabel}>Supported by</div>
              <div className={s.supportName}>Walmart Center for Tech Excellence</div>
            </div>
          </div>

        </section>

        {/* ══════════ ABOUT ══════════ */}
        <section className={s.about}>
          <motion.div
            className={s.aboutInner}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75 }}
          >
            <div className={s.sectionEyebrow}>// About</div>
            <h2 className={s.aboutHeading}>
              Where <span className={s.hl}>algorithms</span> meet
              <br />competitive spirit.
            </h2>
            <p className={s.aboutDesc}>
              AXIOM is Databased's flagship competitive programming contest.
              Designed for those who think in asymptotic complexity and dream
              in edge cases — step into the arena where every millisecond
              counts and every byte matters.
            </p>

            <div className={s.stats}>
              {[
                { num: 'O(1)', lbl: 'Mindset Required' },
                { num: '∞', lbl: 'Possibilities' },
                { num: 'AC', lbl: 'The Only Verdict' },
              ].map((st, i) => (
                <motion.div
                  key={i}
                  className={s.stat}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.1 }}
                >
                  <div className={s.statNum}>{st.num}</div>
                  <div className={s.statLbl}>{st.lbl}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ══════════ FEATURES ══════════ */}
        <section className={s.features}>
          <motion.div
            className={s.featHeader}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={s.featTitle}>The Challenge</h2>
            <p className={s.featSub}>What awaits you in AXIOM</p>
          </motion.div>

          <div className={s.featGrid}>
            {[
              {
                icon: '⚡',
                title: 'Time-Bound Execution',
                desc: 'Every problem comes with strict time limits. Your solution must not just be correct — it must be fast. Think optimal, code optimal.',
              },
              {
                icon: '🧠',
                title: 'Algorithmic Depth',
                desc: 'From greedy strategies to dynamic programming, from graph theory to number theory — AXIOM tests the full spectrum of your problem-solving arsenal.',
              },
              {
                icon: '🏆',
                title: 'Live Leaderboard',
                desc: 'Watch your rank climb in real-time. The leaderboard is your battlefield — every accepted submission pushes you closer to the summit.',
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                className={s.featCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div className={s.featIcon}>{f.icon}</div>
                <h3 className={s.featCardTitle}>{f.title}</h3>
                <p className={s.featCardDesc}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════ CTA ══════════ */}
        <section className={s.cta}>
          <motion.div
            className={s.ctaInner}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65 }}
          >
            <div className={s.sectionEyebrow}>// Join</div>
            <h2 className={s.ctaHeading}>
              Ready to prove
              <br />your logic holds?
            </h2>
            <p className={s.ctaDesc}>
              Step into the arena. Write code that survives every hidden test case.
              Compete, optimize, and rise on the leaderboard.
            </p>
            <a href="#" className={s.ctaBtn} onClick={(e) => e.preventDefault()}>
              <span>Enter the Arena</span>
              <span>→</span>
            </a>
          </motion.div>
        </section>

      </div>
    </div>
  )
}
