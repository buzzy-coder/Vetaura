'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

// Dynamically import MapUI bypassing SSR
const MapUI = dynamic(() => import('./MapUI'), {
  ssr: false,
  loading: () => (
    <div style={{ 
      height: '450px', 
      width: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--color-bg-alt)',
      color: 'var(--color-text-muted)' 
    }}>
      Loading local map...
    </div>
  )
});

export default function GeoSync() {
  return (
    <section id="map" style={{ padding: '6rem 1.5rem', background: 'var(--color-bg-alt)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(37, 99, 235, 0.1)',
              color: 'var(--color-primary-light)',
              padding: '0.4rem 1rem',
              borderRadius: '99px',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              <MapPin size={14} /> LIVE COVERAGE
            </span>
            <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              Local Pet Care <span style={{ color: 'var(--color-primary)' }}>Near You.</span>
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--color-text-secondary)',
              maxWidth: '600px',
              margin: '1rem auto 0',
              lineHeight: 1.6,
            }}>
              Whether you need to book a vet or find a local grooming store, our platform maps everything you need around your home base.
            </p>
          </motion.div>
        </div>

        {/* Map Container Wrapper */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
          style={{
            padding: '1rem',
            borderRadius: '2rem', // Larger outer radius
          }}
        >
          {/* Inner Map Box with border radius matching inner */}
          <div style={{ 
            borderRadius: '1.25rem', 
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
          }}>
            <MapUI />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
