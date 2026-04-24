'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Smartphone, Bell, QrCode, Zap, ShieldCheck, HeartPulse } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }
  })
};

export default function AppDownloadPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--color-mist)', minHeight: '100vh', paddingTop: '100px' }}>
        
        {/* Main Section */}
        <section className="section-px section-py max-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            
            {/* Left Content */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <span className="pill" style={{ background: '#EFF6FF', color: '#2563EB', marginBottom: '1.5rem' }}>
                <Smartphone size={14} /> Vetaura Mobile App
              </span>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem' }}>
                Pet Care in your <span style={{ color: '#2563EB' }}>pocket.</span>
              </h1>
              <p style={{ fontSize: '1.15rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem', maxWidth: '500px' }}>
                Get real-time vaccination reminders, instant vet consultations, and nearby rescue alerts right on your phone.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ background: '#F0FDF4', padding: '10px', borderRadius: '10px' }}>
                    <Bell color="#22C55E" size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, margin: 0 }}>Smart Reminders</h4>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>Never miss a vaccination or grooming appointment again.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ background: '#EFF6FF', padding: '10px', borderRadius: '10px' }}>
                    <Zap color="#2563EB" size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, margin: 0 }}>Instant Rescue Alerts</h4>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>Get notified when a pet needs help in your immediate vicinity.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ background: '#FEF2F2', padding: '10px', borderRadius: '10px' }}>
                    <HeartPulse color="#EF4444" size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, margin: 0 }}>Health Tracking</h4>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>Monitor weight, activity, and medical records on the go.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: QR Code & Mockup */}
            <motion.div 
              custom={1} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div className="card" style={{ padding: '2rem', textAlign: 'center', maxWidth: '350px', background: 'white' }}>
                <div style={{ background: '#F1F5F9', padding: '2rem', borderRadius: '1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                  {/* Mock QR Code */}
                  <div style={{ width: '200px', height: '200px', background: 'white', padding: '10px', border: '1px solid #E2E8F0', borderRadius: '1rem', display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '2px' }}>
                    {Array.from({ length: 100 }).map((_, i) => (
                      <div key={i} style={{ background: Math.random() > 0.5 ? '#0F172A' : 'transparent', borderRadius: '1px' }} />
                    ))}
                  </div>
                </div>
                <h3 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Scan to Download</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Available for iOS and Android</p>
                
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                  <div style={{ background: 'black', color: 'white', padding: '8px 16px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Smartphone size={14} /> App Store
                  </div>
                  <div style={{ background: 'black', color: 'white', padding: '8px 16px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Smartphone size={14} /> Play Store
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)' }}>
                <ShieldCheck size={16} />
                <span style={{ fontSize: '0.85rem' }}>Secure & Ad-free experience</span>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Benefits Table Section */}
        <section style={{ background: 'var(--color-bg-alt)', padding: '6rem 1.5rem' }}>
          <div className="max-container">
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 800, marginBottom: '4rem' }}>App vs Website</h2>
            <div className="card" style={{ overflow: 'hidden', maxWidth: '800px', margin: '0 auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--color-mist-deep)' }}>
                    <th style={{ padding: '1.5rem', fontWeight: 700 }}>Feature</th>
                    <th style={{ padding: '1.5rem', fontWeight: 700 }}>Website</th>
                    <th style={{ padding: '1.5rem', fontWeight: 700, color: '#2563EB' }}>Mobile App</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1.25rem' }}>Booking Services</td>
                    <td style={{ padding: '1.25rem' }}>✅</td>
                    <td style={{ padding: '1.25rem' }}>✅</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1.25rem' }}>Push Notifications</td>
                    <td style={{ padding: '1.25rem' }}>❌</td>
                    <td style={{ padding: '1.25rem' }}>✅</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1.25rem' }}>Offline Mode (Records)</td>
                    <td style={{ padding: '1.25rem' }}>❌</td>
                    <td style={{ padding: '1.25rem' }}>✅</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1.25rem' }}>Real-time GPS Tracking</td>
                    <td style={{ padding: '1.25rem' }}>Limited</td>
                    <td style={{ padding: '1.25rem' }}>High Precision</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1.25rem' }}>One-tap Rescue Report</td>
                    <td style={{ padding: '1.25rem' }}>❌</td>
                    <td style={{ padding: '1.25rem' }}>✅</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
