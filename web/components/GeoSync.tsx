'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Users, MapPin, Zap } from 'lucide-react';

import { getActiveVolunteerCount } from '@/lib/api';

export default function GeoSync() {
  const [count, setCount] = useState<number | '...'>('...');

  // Live DB Fetch
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const data = await getActiveVolunteerCount();
        setCount(data.total);
      } catch (e) {
        console.error(e);
      }
    };
    
    fetchCount();
    const interval = setInterval(fetchCount, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '1rem',
        background: 'var(--color-card-bg)',
        borderRadius: '9999px',
        padding: '0.75rem 1.5rem',
        boxShadow: '0 4px 24px rgba(34,197,94,0.15), 0 2px 8px rgba(0,0,0,0.05)',
        border: '1px solid rgba(34,197,94,0.2)',
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      {/* Pulse dot */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#22C55E',
            position: 'relative',
          }}
        />
        <motion.div
          animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: '-2px',
            borderRadius: '50%',
            background: 'rgba(34,197,94,0.4)',
          }}
        />
      </div>

      {/* Text */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Users size={15} color="#22C55E" />
        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>
          <motion.span
            key={count}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {count}
          </motion.span>
          {' '}Volunteers Active
        </span>
        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', fontWeight: 500 }}>
          in Bhubaneswar Right Now
        </span>
      </div>

      {/* Location pill */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
        background: 'rgba(37,99,235,0.07)',
        borderRadius: '99px',
        padding: '0.25rem 0.75rem',
      }}>
        <MapPin size={12} color="#2563EB" />
        <span style={{ fontSize: '0.78rem', color: '#2563EB', fontWeight: 600 }}>Live</span>
      </div>
    </motion.div>
  );
}
