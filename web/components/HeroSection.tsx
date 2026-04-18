'use client';

import { motion } from 'framer-motion';
import { Search, Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import FloatingPet from './FloatingPet';
import { useModals } from '@/lib/ModalContext';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

export default function HeroSection() {
  const { openBookingModal, openCaretakersModal } = useModals();

  return (
    <section
      id="hero"
      className="bg-hero-gradient"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '68px',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem', width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
        }}>

          {/* Left: Text Content */}
          <div>
            {/* Trust pill */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{ marginBottom: '1.5rem' }}
            >
              <span className="pill" style={{
                background: 'rgba(37,99,235,0.08)',
                color: '#2563EB',
                border: '1px solid rgba(37,99,235,0.15)',
              }}>
                <Sparkles size={13} />
                Bhubaneswar&apos;s #1 Pet Platform
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: '#0F172A',
                marginBottom: '1.25rem',
              }}
            >
              Weightless Pet Care{' '}
              <span style={{ color: '#2563EB' }}>for Busy Parents</span>{' '}
              in Bhubaneswar.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                fontSize: '1.1rem',
                color: '#475569',
                lineHeight: 1.7,
                marginBottom: '2.25rem',
                maxWidth: '520px',
              }}
            >
              From local volunteer dog walkers to complete medical care — we take
              the stress out of pet parenting, one pawstep at a time.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              custom={0.3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.9rem', marginBottom: '3rem' }}
            >
              <motion.button
                onClick={openCaretakersModal}
                className="btn-primary"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{ border: 'none', cursor: 'pointer' }}
              >
                <Search size={17} />
                Find a Caretaker
                <ArrowRight size={16} />
              </motion.button>
              <motion.button
                onClick={openBookingModal}
                className="btn-secondary"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{ border: 'none', cursor: 'pointer' }}
              >
                <Calendar size={17} />
                Book a Vet
              </motion.button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              custom={0.4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}
            >
              {[
                { value: '500+', label: 'Happy Pets' },
                { value: '50+', label: 'Volunteers' },
                { value: '15+', label: 'Partner Vets' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#94A3B8', fontWeight: 500, marginTop: '0.2rem' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Location Tag */}
            <motion.div
              custom={0.5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94A3B8' }}
            >
              <MapPin size={14} />
              <span style={{ fontSize: '0.82rem', fontWeight: 500 }}>Currently serving Bhubaneswar, Odisha</span>
            </motion.div>
          </div>

          {/* Right: Floating Pet Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as any }}
          >
            <FloatingPet />
          </motion.div>
        </div>

        {/* Bottom wave / scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{ textAlign: 'center', marginTop: '4rem' }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'inline-block', color: '#CBD5E1', fontSize: '1.5rem' }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
