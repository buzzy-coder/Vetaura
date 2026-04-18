'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServiceCards from '@/components/ServiceCards';
import EducationHub from '@/components/EducationHub';
import Footer from '@/components/Footer';

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
        <EducationHub />
      </main>
      <Footer />
    </>
  );
}
