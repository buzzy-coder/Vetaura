'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { EDUCATION_TIPS } from '@/lib/mockData';

// ─── Tag color map ────────────────────────────────────────────
const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  Health:    { bg: 'rgba(37,99,235,0.10)',   color: '#1D4ED8' },
  Seasonal:  { bg: 'rgba(255,202,40,0.14)',  color: '#B45309' },
  Nutrition: { bg: 'rgba(52,211,153,0.13)',  color: '#065F46' },
  Grooming:  { bg: 'rgba(168,85,247,0.10)',  color: '#6D28D9' },
  Emergency: { bg: 'rgba(255,107,107,0.12)', color: '#B91C1C' },
  Beginner:  { bg: 'rgba(251,146,60,0.12)',  color: '#C2410C' },
};
const DEFAULT_TAG = { bg: 'rgba(148,163,184,0.12)', color: '#475569' };

// Duplicate for seamless infinite loop
const DOUBLED_TIPS = [...EDUCATION_TIPS, ...EDUCATION_TIPS];

// ─── Component ───────────────────────────────────────────────
export default function EducationHub() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="tips"
      ref={ref}
      className="bg-edu-gradient section-py"
      style={{ overflow: 'hidden' }}
    >
      {/* Header */}
      <div className="section-px" style={{ marginBottom: '3rem' }}>
        <div className="max-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                maxWidth: '640px',
              }}
            >
              <span
                className="pill"
                style={{
                  background: 'rgba(255,202,40,0.14)',
                  color: '#B45309',
                  border: '1px solid rgba(255,202,40,0.3)',
                  display: 'inline-flex',
                  width: 'fit-content',
                }}
              >
                <Sparkles size={12} />
                Pet Parenting 101
              </span>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                      fontWeight: 800,
                      color: '#0F172A',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.2,
                    }}
                  >
                    New to Pet Parenting?
                    <br />
                    <span style={{ color: '#D97706' }}>
                      We&apos;ve got you covered.
                    </span>
                  </h2>
                  <p
                    style={{
                      marginTop: '0.75rem',
                      fontSize: '1rem',
                      color: '#64748B',
                      lineHeight: 1.7,
                      maxWidth: '480px',
                    }}
                  >
                    Bite-sized expert tips tailored for Indian pet owners — from
                    monsoon paw care to the perfect vaccination schedule.
                  </p>
                </div>

                <a
                  href="#tips"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: '#2563EB',
                    textDecoration: 'none',
                    padding: '0.55rem 1.1rem',
                    borderRadius: '0.75rem',
                    background: 'rgba(37,99,235,0.08)',
                    border: '1px solid rgba(37,99,235,0.15)',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  <BookOpen size={15} />
                  All Tips
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="marquee-wrapper"
        style={{
          /* Override gradient edges with edu-gradient colors */
          '--tw-gradient-from': '#EEF2FF',
          '--tw-gradient-to': '#FFF7ED',
        } as React.CSSProperties}
      >
        <div
          className="marquee-track"
          style={{ padding: '0.75rem 0 1.25rem' }}
        >
          {DOUBLED_TIPS.map((tip, idx) => (
            <TipCard key={`${tip.id}-${idx}`} tip={tip} />
          ))}
        </div>
      </motion.div>

      {/* Bottom CTA strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="section-px"
        style={{ marginTop: '3rem' }}
      >
        <div
          className="max-container"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(226,232,240,0.8)',
              borderRadius: '1.25rem',
              padding: '1.5rem 2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              boxShadow: '0 4px 24px rgba(37,99,235,0.07)',
              maxWidth: '680px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2rem' }}>🐾</div>
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#0F172A',
                  marginBottom: '0.25rem',
                }}
              >
                Get personalised tips for your pet
              </div>
              <div style={{ fontSize: '0.88rem', color: '#64748B' }}>
                Join 500+ Bhubaneswar families already on Vetaura
              </div>
            </div>
            <motion.a
              href="#hero"
              className="btn-primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{ padding: '0.7rem 1.4rem', fontSize: '0.88rem' }}
            >
              Get Started Free
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Tip Card ────────────────────────────────────────────────
function TipCard({ tip }: { tip: (typeof EDUCATION_TIPS)[0] }) {
  const tagStyle = TAG_COLORS[tip.tag] ?? DEFAULT_TAG;

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 16px 40px rgba(37,99,235,0.12), 0 4px 16px rgba(0,0,0,0.06)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        background: '#ffffff',
        borderRadius: '1.25rem',
        border: '1px solid rgba(226,232,240,0.8)',
        boxShadow: 'var(--shadow-card)',
        padding: '1.5rem',
        width: '280px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.9rem',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top gradient accent */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${tagStyle.color}55, ${tagStyle.color}22)`,
          borderRadius: '1.25rem 1.25rem 0 0',
        }}
      />

      {/* Top row: emoji + tag */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: '2rem', lineHeight: 1 }}>{tip.emoji}</span>
        <span
          className="pill"
          style={{
            background: tagStyle.bg,
            color: tagStyle.color,
            fontSize: '0.68rem',
          }}
        >
          {tip.tag}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontWeight: 700,
          fontSize: '0.98rem',
          color: '#0F172A',
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
        }}
      >
        {tip.title}
      </h3>

      {/* Body */}
      <p
        style={{
          fontSize: '0.83rem',
          color: '#64748B',
          lineHeight: 1.65,
          flex: 1,
        }}
      >
        {tip.body}
      </p>
    </motion.div>
  );
}
