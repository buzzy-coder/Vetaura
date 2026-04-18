'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  PawPrint,
  Stethoscope,
  MapPin,
  Star,
  ArrowRight,
  Users,
  Scissors,
  Clock,
  ShieldCheck,
  Syringe,
  Bug,
} from 'lucide-react';
import { useModals } from '@/lib/ModalContext';
import { ACTIVE_VOLUNTEER_COUNT } from '@/lib/mockData';

// ─── Animation Variants ──────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as any },
  },
};

// ─── Data ────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 'volunteer',
    icon: PawPrint,
    iconBg: 'rgba(37, 99, 235, 0.08)',
    iconColor: '#2563EB',
    accent: '#2563EB',
    accentLight: 'rgba(37, 99, 235, 0.06)',
    tag: 'Most Popular',
    tagBg: 'rgba(37,99,235,0.09)',
    tagColor: '#2563EB',
    title: 'Volunteer Care',
    subtitle: 'Trusted locals who love pets',
    description:
      'Background-verified neighbourhood volunteers handle daily walks, professional grooming sessions, and overnight pet sitting — so your furry family is always in good hands.',
    features: [
      { icon: Users, text: 'Verified & background-checked' },
      { icon: Scissors, text: 'Grooming & bathing' },
      { icon: Clock, text: 'Flexible scheduling' },
    ],
    cta: 'Find a Caretaker',
    href: '#caretakers',
    live: true,
    liveLabel: `${ACTIVE_VOLUNTEER_COUNT} Active Now`,
  },
  {
    id: 'medical',
    icon: Stethoscope,
    iconBg: 'rgba(255, 107, 107, 0.08)',
    iconColor: '#FF6B6B',
    accent: '#FF6B6B',
    accentLight: 'rgba(255, 107, 107, 0.06)',
    tag: 'Vet Approved',
    tagBg: 'rgba(255,107,107,0.09)',
    tagColor: '#FF6B6B',
    title: 'Medical Booking',
    subtitle: 'Partner clinics across Bhubaneswar',
    description:
      'One-tap scheduling for vaccinations, de-worming, sterilization, and health check-ups. We partner with 15+ trusted veterinary clinics, so quality care is always nearby.',
    features: [
      { icon: Syringe, text: 'Vaccination tracking' },
      { icon: Bug, text: 'De-worming reminders' },
      { icon: ShieldCheck, text: 'Sterilization support' },
    ],
    cta: 'Book a Vet',
    href: '#services',
    live: false,
    liveLabel: '',
  },
  {
    id: 'geolocation',
    icon: MapPin,
    iconBg: 'rgba(255, 202, 40, 0.12)',
    iconColor: '#D97706',
    accent: '#F59E0B',
    accentLight: 'rgba(255, 202, 40, 0.07)',
    tag: 'Live',
    tagBg: 'rgba(34,197,94,0.10)',
    tagColor: '#16A34A',
    title: 'Geolocation Sync',
    subtitle: 'Real-time coverage map',
    description:
      'Our smart map shows exactly which zones have active volunteers right now. Get matched with the nearest available caretaker in your neighbourhood — instantly.',
    features: [
      { icon: MapPin, text: 'Saheed Nagar, Patia & more' },
      { icon: Users, text: 'Live volunteer positions' },
      { icon: Star, text: 'Rating-based matching' },
    ],
    cta: 'View Live Map',
    href: '#caretakers',
    live: true,
    liveLabel: 'Bhubaneswar Online',
  },
];

// ─── Component ───────────────────────────────────────────────
export default function ServiceCards() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { openBookingModal, openCaretakersModal } = useModals();

  return (
    <section
      id="services"
      ref={ref}
      className="bg-services-gradient section-py section-px"
    >
      <div className="max-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span
            className="pill"
            style={{
              background: 'rgba(37,99,235,0.08)',
              color: '#2563EB',
              border: '1px solid rgba(37,99,235,0.15)',
              marginBottom: '1rem',
              display: 'inline-flex',
            }}
          >
            <ShieldCheck size={12} />
            What We Offer
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}
          >
            Everything your pet needs,
            <br />
            <span style={{ color: '#2563EB' }}>right in your city.</span>
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: '#64748B',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Three pillars of pet care designed for the busy Bhubaneswar family.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {SERVICES.map((svc) => (
            <ServiceCard 
              key={svc.id} 
              svc={svc} 
              onClick={svc.href === '#caretakers' ? openCaretakersModal : openBookingModal} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Individual Card ─────────────────────────────────────────
function ServiceCard({ svc, onClick }: { svc: (typeof SERVICES)[0], onClick: () => void }) {
  const Icon = svc.icon;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -14,
        boxShadow:
          '0 28px 80px rgba(37, 99, 235, 0.14), 0 8px 32px rgba(0,0,0,0.08)',
      }}
      style={{
        background: '#ffffff',
        borderRadius: '1.5rem',
        border: '1px solid rgba(226,232,240,0.8)',
        boxShadow: 'var(--shadow-card)',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        cursor: 'default',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Decorative blob */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: svc.accentLight,
          filter: 'blur(48px)',
          pointerEvents: 'none',
        }}
      />

      {/* Header Row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '1.5rem',
        }}
      >
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
          transition={{ duration: 0.4 }}
          style={{
            background: svc.iconBg,
            borderRadius: '1rem',
            width: '56px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon size={26} color={svc.iconColor} strokeWidth={2} />
        </motion.div>

        {/* Tag + Live indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
          <span
            className="pill"
            style={{
              background: svc.tagBg,
              color: svc.tagColor,
              fontSize: '0.7rem',
            }}
          >
            {svc.tag}
          </span>
          {svc.live && (
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.72rem',
                fontWeight: 600,
                color: '#16A34A',
              }}
            >
              <span className="pulse-dot" />
              {svc.liveLabel}
            </span>
          )}
        </div>
      </div>

      {/* Text */}
      <div style={{ marginBottom: '1.5rem', flex: 1 }}>
        <p
          style={{
            fontSize: '0.78rem',
            fontWeight: 600,
            color: svc.accent,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '0.4rem',
          }}
        >
          {svc.subtitle}
        </p>
        <h3
          style={{
            fontSize: '1.3rem',
            fontWeight: 800,
            color: '#0F172A',
            letterSpacing: '-0.02em',
            marginBottom: '0.8rem',
            lineHeight: 1.25,
          }}
        >
          {svc.title}
        </h3>
        <p
          style={{
            fontSize: '0.9rem',
            color: '#64748B',
            lineHeight: 1.7,
          }}
        >
          {svc.description}
        </p>
      </div>

      {/* Feature List */}
      <ul
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.55rem',
          marginBottom: '1.75rem',
          padding: 0,
          listStyle: 'none',
        }}
      >
        {svc.features.map((feat, i) => {
          const FeatIcon = feat.icon;
          return (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.85rem',
                color: '#475569',
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  background: svc.accentLight,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <FeatIcon size={13} color={svc.accent} strokeWidth={2.5} />
              </span>
              {feat.text}
            </li>
          );
        })}
      </ul>

      {/* CTA */}
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.85rem 1.25rem',
          borderRadius: '1rem',
          background: svc.accentLight,
          border: `1.5px solid ${svc.accent}22`,
          color: svc.accent,
          fontWeight: 700,
          fontSize: '0.9rem',
          cursor: 'pointer',
          transition: 'background 0.25s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = svc.iconBg;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = svc.accentLight;
        }}
      >
        {svc.cta}
        <ArrowRight size={16} strokeWidth={2.5} />
      </motion.button>
    </motion.div>
  );
}
