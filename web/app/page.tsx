'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServiceCards from '@/components/ServiceCards';
import EducationHub from '@/components/EducationHub';
import Footer from '@/components/Footer';

import TriageChat from '@/components/TriageChat';
import { Star, Smartphone, Download, CheckCircle, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const MapUI = dynamic(() => import('@/components/MapUI'), { 
  ssr: false,
  loading: () => <div style={{ height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Map...</div>
});

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        
        {/* Live Map Section */}
        <section id="map" style={{ padding: '6rem 1.5rem', background: 'var(--color-bg-alt)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
                Live Pet Care <span style={{ color: '#2563EB' }}>Map</span>
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                See our network of verified volunteers, grooming spas, and vet clinics across Bhubaneswar in real-time.
              </p>
            </div>
            <div style={{ borderRadius: '1.5rem', overflow: 'hidden', boxShadow: 'var(--shadow-float)', border: '1px solid var(--color-border)' }}>
              <MapUI />
            </div>
          </div>
        </section>

        <ServiceCards />

        {/* Testimonials Section */}
        <section style={{ padding: '6rem 1.5rem', background: 'var(--color-mist)' }}>
          <div className="max-container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="pill" style={{ background: '#EFF6FF', color: '#2563EB', marginBottom: '1rem' }}>Happy Parents</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>What our community <span style={{ color: '#2563EB' }}>says.</span></h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {[
                { name: 'Ananya Dash', role: 'Golden Retriever Mom', text: "The rescue team responded in under 15 minutes when I reported an injured stray near Patia. Truly life-saving service!", rating: 5 },
                { name: 'Rahul Patnaik', role: 'Cat Parent', text: "Finally, a reliable grooming service in Bhubaneswar that actually cares. The digital health records are a game changer.", rating: 5 },
                { name: 'Sujata Mohanty', role: 'Volunteer', text: "Being a volunteer walker on Vetaura has been so rewarding. The platform is seamless and builds immense trust.", rating: 5 }
              ].map((t, i) => (
                <div key={i} className="card" style={{ padding: '2rem', background: 'white' }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem' }}>
                    {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={16} fill="#FFCA28" color="#FFCA28" />)}
                  </div>
                  <Quote size={32} color="#E2E8F0" style={{ marginBottom: '1rem' }} />
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', fontStyle: 'italic' }}>&quot;{t.text}&quot;</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F1F5F9' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* App CTA Showcase */}
        <section style={{ padding: '6rem 1.5rem', background: 'linear-gradient(135deg, #1E3A8A, #1E293B)', color: 'white', overflow: 'hidden' }}>
          <div className="max-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem' }}>Experience Vetaura <span style={{ color: '#60A5FA' }}>on the go.</span></h2>
              <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '2.5rem' }}>Get instant alerts, book services in one tap, and track your pet&apos;s health with our mobile app.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  'Vaccination & Grooming Reminders',
                  'One-tap Emergency Rescue Reports',
                  'Digital Medical Records Vault',
                  'Live Chat with Verified Vets'
                ].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CheckCircle size={20} color="#60A5FA" />
                    <span style={{ fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
                <button className="btn-primary" style={{ background: 'white', color: '#1E3A8A', border: 'none' }}>
                  <Download size={18} /> App Store
                </button>
                <button className="btn-primary" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <Download size={18} /> Play Store
                </button>
              </div>
            </div>
            
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              {/* Mock Phone Frame */}
              <div style={{ width: '280px', height: '560px', background: '#0F172A', borderRadius: '3rem', border: '8px solid #334155', boxShadow: '0 40px 100px rgba(0,0,0,0.5)', overflow: 'hidden', position: 'relative' }}>
                <div style={{ background: '#2563EB', height: '100%', padding: '2rem 1.5rem' }}>
                   <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                      <Star size={24} color="#2563EB" />
                   </div>
                   <div style={{ height: '15px', width: '60%', background: 'rgba(255,255,255,0.3)', borderRadius: '10px', marginBottom: '10px' }} />
                   <div style={{ height: '15px', width: '90%', background: 'rgba(255,255,255,0.3)', borderRadius: '10px', marginBottom: '30px' }} />
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div style={{ height: '80px', background: 'rgba(255,255,255,0.1)', borderRadius: '1rem' }} />
                      <div style={{ height: '80px', background: 'rgba(255,255,255,0.1)', borderRadius: '1rem' }} />
                      <div style={{ height: '80px', background: 'rgba(255,255,255,0.1)', borderRadius: '1rem' }} />
                      <div style={{ height: '80px', background: 'rgba(255,255,255,0.1)', borderRadius: '1rem' }} />
                   </div>
                </div>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '25px', background: '#334155', borderRadius: '0 0 1rem 1rem' }} />
              </div>
            </div>
          </div>
        </section>

        <EducationHub />
        <TriageChat />
      </main>
      <Footer />
    </>
  );
}

