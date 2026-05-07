'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Monitor, QrCode } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, slideLeft, slideRight, stagger, viewport } from '@/lib/animations'
import { useInView } from '@/lib/hooks'

function QRBridge({ inView }) {
  const [scanning, setScanning] = useState(false)
  const [pinged, setPinged] = useState(false)

  useEffect(() => {
    if (!inView) return
    let running = true
    const loop = async () => {
      if (!running) return
      await new Promise(r => setTimeout(r, 1000))
      if (!running) return
      setScanning(true)
      await new Promise(r => setTimeout(r, 1400))
      if (!running) return
      setScanning(false)
      setPinged(true)
      await new Promise(r => setTimeout(r, 600))
      if (!running) return
      setPinged(false)
      await new Promise(r => setTimeout(r, 800))
      if (running) loop()
    }
    loop()
    return () => { running = false }
  }, [inView])

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>

      {/* Sign */}
      <motion.div variants={slideLeft} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '110px', height: '70px', background: '#F59E0B', borderRadius: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(245,158,11,0.3)', border: '3px solid #FCD34D', padding: '0.5rem' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '0.6rem', color: '#1C1917', textAlign: 'center', lineHeight: 1.2 }}>MARTINEZ<br />HVAC</p>
          <div style={{ width: '24px', height: '24px', background: 'rgba(255,255,255,0.8)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4px' }}>
            <QrCode size={14} color="#1C1917" />
          </div>
        </div>
        <div style={{ width: '6px', height: '16px', background: '#64748b' }} />
        <div style={{ width: '24px', height: '4px', background: '#475569', borderRadius: '2px' }} />
        <p style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>Your Sign</p>
      </motion.div>

      {/* QR Scan */}
      <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: '-8px', borderRadius: '1rem', border: '2px solid rgba(14,165,233,0.4)', animation: 'qr-pulse 2s infinite' }} />
          <div style={{ width: '72px', height: '72px', background: 'white', borderRadius: '0.75rem', overflow: 'hidden', position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2px', padding: '8px' }}>
            {[1,1,1,0,1,1,0,1,0,1,1,1,1,0,0,0,0,0,1,1,1,0,1,1,1].map((filled, i) => (
              <div key={i} style={{ background: filled ? '#1C1917' : 'transparent', borderRadius: '2px' }} />
            ))}
            <div style={{ position: 'absolute', left: '6px', right: '6px', height: '2px', background: '#0EA5E9', boxShadow: '0 0 8px 2px rgba(14,165,233,0.6)', borderRadius: '1px', top: scanning ? 'calc(100% - 10px)' : '8px', opacity: scanning ? 1 : 0, transition: scanning ? 'top 1.4s linear, opacity 0.1s ease' : 'opacity 0.3s ease' }} />
          </div>
        </div>
        <p style={{ marginTop: '0.75rem', fontSize: '0.7rem', color: '#0EA5E9', fontFamily: 'var(--font-body)', fontWeight: 500 }}>Customer Scans</p>
      </motion.div>

      {/* Phone */}
      <motion.div variants={slideRight} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '64px', height: '100px', background: '#071527', borderRadius: '14px', border: `2px solid ${pinged ? 'rgba(245,158,11,0.8)' : 'rgba(14,165,233,0.35)'}`, boxShadow: pinged ? '0 0 24px rgba(245,158,11,0.25)' : '0 8px 24px rgba(14,165,233,0.1)', overflow: 'hidden', padding: '8px 6px', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
          <div style={{ width: '24px', height: '3px', background: '#1e293b', borderRadius: '2px', margin: '0 auto 6px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{ height: '5px', background: 'rgba(14,165,233,0.2)', borderRadius: '3px' }} />
            <div style={{ height: '5px', background: 'rgba(14,165,233,0.2)', borderRadius: '3px', width: '75%' }} />
            <div style={{ height: '24px', background: pinged ? 'rgba(245,158,11,0.2)' : 'rgba(245,158,11,0.08)', border: `1px solid ${pinged ? 'rgba(245,158,11,0.5)' : 'rgba(245,158,11,0.2)'}`, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
              <span style={{ fontSize: '7px', fontFamily: 'var(--font-heading)', fontWeight: 900, color: '#F59E0B', letterSpacing: '0.05em' }}>NEW LEAD</span>
            </div>
            <div style={{ height: '5px', background: 'rgba(14,165,233,0.2)', borderRadius: '3px' }} />
            <div style={{ height: '5px', background: 'rgba(14,165,233,0.2)', borderRadius: '3px', width: '60%' }} />
          </div>
        </div>
        <p style={{ marginTop: '0.75rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>Lands in Your CRM</p>
      </motion.div>

    </div>
  )
}

export default function TheSolution() {
  const [ref, inView] = useInView()

  return (
    <section ref={ref} className="section-base" style={{ background: '#0C1E3C', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(14,165,233,0.12) 1px, transparent 0)', backgroundSize: '36px 36px', pointerEvents: 'none' }} />

      <div className="container-px" style={{ position: 'relative' }}>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <motion.span variants={fadeUp} className="section-label">The Phygital Difference</motion.span>
          <motion.h2 variants={fadeUp} style={{ color: 'white' }}>
            One Company. Two Worlds.
            <br />
            <span style={{ color: '#F59E0B' }}>Zero Gap Between Them.</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.55)', marginTop: '1rem', maxWidth: '520px', margin: '1rem auto 0', lineHeight: 1.7 }}>
            Most businesses treat signage and digital marketing as two separate
            expenses. We connect them into one system — where every sign you put
            up drives measurable online results.
          </motion.p>
        </motion.div>

        {/* Desktop layout */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '2rem', flexWrap: 'wrap', marginBottom: '4rem',
          }}
        >
          <motion.div variants={slideLeft} style={{ flex: 1, maxWidth: '280px', textAlign: 'right' }}>
            <div style={{ width: '56px', height: '56px', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', marginBottom: '1rem', fontSize: '1.5rem' }}>🪧</div>
            <h3 style={{ color: '#F59E0B', marginBottom: '0.5rem' }}>Physical Signage</h3>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.7 }}>Yard signs. Banners. Vehicle wraps. Everything your customers see on the street — professionally made and built to convert.</p>
          </motion.div>

          <motion.div variants={fadeUp} style={{ flexShrink: 0 }}>
            <QRBridge inView={inView} />
          </motion.div>

          <motion.div variants={slideRight} style={{ flex: 1, maxWidth: '280px' }}>
            <div style={{ width: '56px', height: '56px', background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.25)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Monitor size={24} color="#0EA5E9" />
            </div>
            <h3 style={{ color: '#0EA5E9', marginBottom: '0.5rem' }}>Digital Presence</h3>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.7 }}>A fast website. Google rankings. A CRM that follows up automatically. Every customer tracked from scan to close.</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link href="/digital" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.875rem 1.5rem', background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.3)', borderRadius: '0.75rem', color: '#0EA5E9', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none' }}>
            Explore Digital Services
          </Link>
          <Link href="/signage" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.875rem 1.5rem', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '0.75rem', color: '#F59E0B', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none' }}>
            Browse Signage Products
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
