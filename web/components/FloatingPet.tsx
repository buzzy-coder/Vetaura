'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function FloatingPet() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const imageSrc = mounted && resolvedTheme === 'dark' ? '/pets-hero-dark.png' : '/pets-hero.png';

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      {/* Glow blob behind the image */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          inset: '10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(255,107,107,0.06) 60%, transparent 80%)',
          filter: 'blur(30px)',
          zIndex: 0,
        }}
      />

      {/* Floating pet illustration */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 1.5, 0, -1.5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Image
          src={imageSrc}
          alt="Happy dog and cat floating weightlessly — Vetaura mascots"
          width={480}
          height={420}
          priority
          style={{
            width: '100%',
            height: 'auto',
            filter: 'drop-shadow(0 24px 48px rgba(37,99,235,0.18))',
          }}
        />
      </motion.div>

      {/* Floating badge — "Trusted by 500+ families" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6, type: 'spring' }}
        style={{
          position: 'absolute',
          bottom: '12%',
          left: '-5%',
          background: 'var(--color-card-bg)',
          borderRadius: '16px',
          padding: '10px 16px',
          boxShadow: 'var(--shadow-float)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 2,
        }}
      >
        <div style={{ fontSize: '1.4rem' }}>🐾</div>
        <div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Trusted by</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>500+ Families</div>
        </div>
      </motion.div>

      {/* Floating badge — "4.9 Star Rating" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.6, type: 'spring' }}
        style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          background: 'var(--color-card-bg)',
          borderRadius: '16px',
          padding: '10px 16px',
          boxShadow: 'var(--shadow-float)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 2,
        }}
      >
        <div style={{ fontSize: '1.4rem' }}>⭐</div>
        <div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Rating</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>4.9 / 5.0</div>
        </div>
      </motion.div>
    </div>
  );
}
