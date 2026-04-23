'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  PawPrint,
  Share2,
  MessageCircle,
  Globe,
  Mail,
  Phone,
  MapPin,
  Heart,
} from 'lucide-react';

const FOOTER_LINKS = {
  Services: [
    { label: 'Vet Booking',       href: '/#services' },
    { label: 'Rescue Reports',    href: '/rescue' },
    { label: 'Adoption Market',   href: '/adoption' },
    { label: 'Donations',         href: '/donations' },
    { label: 'Mobile App',        href: '/app' },
  ],
  Company: [
    { label: 'About Vetaura',     href: '/about' },
    { label: 'How It Works',      href: '/#services' },
    { label: 'Our Vision',        href: '/about' },
    { label: 'Contact Us',        href: '/contact' },
    { label: 'Pet Tips Blog',     href: '/#tips' },
  ],
  Legal: [
    { label: 'Privacy Policy',    href: '#' },
    { label: 'Terms of Service',  href: '#' },
    { label: 'Cookie Policy',     href: '#' },
    { label: 'Impact Reports',    href: '/donations' },
  ],
};

const SOCIALS = [
  { icon: Share2,         href: '#', label: 'Instagram' },
  { icon: MessageCircle,  href: '#', label: 'Twitter / X' },
  { icon: Globe,          href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-footer-bg)',
        color: 'var(--color-border)',
        paddingTop: '5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative blobs */}
      <div aria-hidden style={{
        position: 'absolute', top: '-60px', left: '-60px',
        width: '320px', height: '320px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div aria-hidden style={{
        position: 'absolute', bottom: '0', right: '-40px',
        width: '280px', height: '280px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,107,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div className="max-container section-px" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '3rem',
          paddingBottom: '3.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          {/* Brand column */}
          <div style={{ gridColumn: 'span 1' }}>
            {/* Logo */}
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '1.25rem' }}>
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
                style={{
                  background: 'linear-gradient(135deg, #2563EB, #60A5FA)',
                  borderRadius: '12px', padding: '7px',
                  display: 'flex', alignItems: 'center',
                }}
              >
                <PawPrint size={20} color="white" strokeWidth={2.5} />
              </motion.div>
              <span style={{ fontWeight: 800, fontSize: '1.35rem', letterSpacing: '-0.02em', color: 'var(--color-footer-logo)' }}>
                Vet<span style={{ color: 'var(--color-logo-accent)' }}>aura</span>
              </span>
            </Link>

            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '240px' }}>
              Weightless pet care for busy parents in Bhubaneswar, Odisha. Because every pet deserves the best.
            </p>

            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem' }}>
              {[
                { icon: Mail,  text: 'hello@vetaura.in' },
                { icon: Phone, text: '+91 98765 43210' },
                { icon: MapPin, text: 'Bhubaneswar, Odisha 751001' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.83rem', color: 'var(--color-text-muted)' }}>
                  <Icon size={13} style={{ flexShrink: 0, color: '#60A5FA' }} />
                  {text}
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: '38px', height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--color-text-muted)',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(37,99,235,0.2)';
                    el.style.color = '#60A5FA';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(255,255,255,0.06)';
                    el.style.color = 'var(--color-text-muted)';
                  }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 style={{
                fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'var(--color-text-muted)',
                marginBottom: '1.1rem',
              }}>
                {category}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <motion.a
                      href={href}
                      whileHover={{ x: 4, color: '#60A5FA' }}
                      style={{
                        fontSize: '0.88rem', color: 'var(--color-text-muted)', textDecoration: 'none',
                        fontWeight: 500, transition: 'color 0.2s', display: 'inline-block',
                      }}
                    >
                      {label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '0.75rem',
          padding: '1.5rem 0',
          fontSize: '0.82rem', color: 'var(--color-text-secondary)',
        }}>
          <span>
            © {new Date().getFullYear()} Vetaura Technologies Pvt. Ltd. · Bhubaneswar, India
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Made with <Heart size={13} fill="#FF6B6B" color="#FF6B6B" /> for pet parents of Bhubaneswar
          </span>
        </div>
      </div>
    </footer>
  );
}
