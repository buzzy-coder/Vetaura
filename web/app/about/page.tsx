'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Target, Heart, Shield, Users } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }
  })
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--color-mist)', minHeight: '100vh', paddingTop: '100px' }}>
        {/* Hero Section */}
        <section className="section-px section-py" style={{ textAlign: 'center' }}>
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <span className="pill" style={{ background: 'rgba(37,99,235,0.08)', color: '#2563EB', marginBottom: '1.5rem' }}>
              Our Story
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Revolutionizing Pet Care in <span style={{ color: '#2563EB' }}>Tier-2 India.</span>
            </h1>
            <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Vetaura was born from a simple observation: pet parents in cities like Bhubaneswar deserve the same world-class ecosystem as those in metros.
            </p>
          </motion.div>
        </section>

        {/* Problem -> Solution -> Vision */}
        <section className="section-px" style={{ paddingBottom: '6rem' }}>
          <div className="max-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {/* Problem */}
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="card" style={{ padding: '2.5rem' }}>
              <div style={{ background: '#FEE2E2', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Target color="#EF4444" size={24} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>The Problem</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Fragmented services, unreliable local help, and lack of digital records make pet parenting stressful in unorganized urban ecosystems.
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="card" style={{ padding: '2.5rem', border: '1px solid #2563EB' }}>
              <div style={{ background: '#EFF6FF', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Shield color="#2563EB" size={24} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Our Solution</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                An all-in-one digital platform connecting you to verified vets, professional groomers, and a community of passionate volunteers.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="card" style={{ padding: '2.5rem' }}>
              <div style={{ background: '#ECFDF5', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Heart color="#10B981" size={24} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>The Vision</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                To create a world where every pet, whether at home or on the streets, has access to immediate care and a loving community.
              </p>
            </motion.div>

          </div>
        </section>

        {/* Impact Section */}
        <section style={{ background: 'var(--color-footer-bg)', color: 'white', padding: '6rem 1.5rem' }}>
          <div className="max-container" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '3rem' }}>Why Vetaura Matters</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
              <div>
                <Users size={40} color="#60A5FA" style={{ margin: '0 auto 1rem' }} />
                <div style={{ fontSize: '2rem', fontWeight: 800 }}>5,000+</div>
                <p style={{ opacity: 0.7 }}>Pet Lives Touched</p>
              </div>
              <div>
                <Heart size={40} color="#F87171" style={{ margin: '0 auto 1rem' }} />
                <div style={{ fontSize: '2rem', fontWeight: 800 }}>200+</div>
                <p style={{ opacity: 0.7 }}>Successful Rescues</p>
              </div>
              <div>
                <Shield size={40} color="#34D399" style={{ margin: '0 auto 1rem' }} />
                <div style={{ fontSize: '2rem', fontWeight: 800 }}>50+</div>
                <p style={{ opacity: 0.7 }}>Verified Partners</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
