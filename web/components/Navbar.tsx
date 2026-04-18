'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PawPrint, Menu, X } from 'lucide-react';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Find a Caretaker', href: '#caretakers' },
  { label: 'Pet Tips', href: '#tips' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
        zIndex: 100,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(248, 250, 252, 0.85)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.6)',
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
            color: '#0F172A',
            letterSpacing: '-0.02em',
          }}>
            Vet<span style={{ color: '#2563EB' }}>aura</span>
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
                color: '#475569',
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
          <motion.a
            href="#services"
            className="btn-primary hide-mobile"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{ padding: '0.55rem 1.3rem', fontSize: '0.88rem' }}
          >
            Book Now
          </motion.a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              display: 'none',
              color: '#0F172A',
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
            background: 'white',
            borderRadius: '0 0 16px 16px',
            padding: '1rem 1.5rem 1.5rem',
            borderTop: '1px solid #E2E8F0',
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
                color: '#475569',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
                borderBottom: '1px solid #F1F5F9',
              }}
            >
              {link.label}
            </a>
          ))}
          <a href="#services" className="btn-primary" style={{ marginTop: '1rem', justifyContent: 'center' }}>
            Book Now
          </a>
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
