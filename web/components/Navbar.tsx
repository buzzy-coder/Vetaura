'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PawPrint, Menu, X } from 'lucide-react';
import { useState } from 'react';

import { useModals } from '@/lib/ModalContext';
import ThemeToggle from '@/components/ThemeToggle';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/#services' },
  { label: 'Rescue', href: '/rescue' },
  { label: 'Adoption', href: '/adoption' },
  { label: 'Donations', href: '/donations' },
  { label: 'App', href: '/app' },
  { label: 'Dashboard', href: '/dashboard' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openBookingModal } = useModals();

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1001,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: 'var(--color-nav-bg)',
        borderBottom: '1px solid var(--color-nav-border)',
        padding: '0 1.5rem',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.4 }}
            style={{
              background: 'linear-gradient(135deg, #2563EB, #60A5FA)',
              borderRadius: '12px',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <PawPrint size={20} color="white" strokeWidth={2.5} />
          </motion.div>
          <span style={{
            fontWeight: 800,
            fontSize: '1.35rem',
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.02em',
          }}>
            Vet<span style={{ color: 'var(--color-logo-accent)' }}>aura</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          className="hide-mobile">
          {NAV_LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              whileHover={{ color: '#2563EB' }}
              style={{
                padding: '0.4rem 0.9rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(37,99,235,0.06)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ThemeToggle />
          <motion.button
            onClick={openBookingModal}
            className="btn-primary hide-mobile"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{ padding: '0.55rem 1.3rem', fontSize: '0.88rem', border: 'none', cursor: 'pointer' }}
          >
            Book Now
          </motion.button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              display: 'none',
              color: 'var(--color-text-primary)',
            }}
            className="show-mobile"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{
            background: 'var(--color-card-bg)',
            borderRadius: '0 0 16px 16px',
            padding: '1rem 1.5rem 1.5rem',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                padding: '0.7rem 0',
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
                borderBottom: '1px solid var(--color-bg-alt)',
              }}
            >
              {link.label}
            </a>
          ))}
          <button onClick={() => { setMobileOpen(false); openBookingModal(); }} className="btn-primary" style={{ marginTop: '1rem', justifyContent: 'center', width: '100%', border: 'none', cursor: 'pointer' }}>
            Book Now
          </button>
        </motion.div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hide-mobile { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
