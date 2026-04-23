'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { IndianRupee, Heart, ShieldCheck, TrendingUp, PieChart, Users } from 'lucide-react';

export default function DonationPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--color-mist)', minHeight: '100vh', paddingTop: '100px' }}>
        
        {/* Header */}
        <section className="section-px section-py max-container" style={{ paddingBottom: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="pill" style={{ background: '#FEF2F2', color: '#EF4444', marginBottom: '1.5rem' }}>
              <Heart size={14} /> Social Impact
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1.5rem' }}>
              Transparency you can <span style={{ color: '#EF4444' }}>trust.</span>
            </h1>
            <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', color: 'var(--color-text-secondary)' }}>
              We believe every rupee should be accounted for. See exactly how your donations help pets in need.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            
            {/* Donation Tiers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3 style={{ fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={22} color="#2563EB" /> Impact Tiers
              </h3>
              {[
                { amount: '500', title: 'Life-saving Vaccination', desc: 'Provides a complete set of core vaccines for one street dog.', icon: ShieldCheck, color: '#34D399' },
                { amount: '1,000', title: 'Food for a Week', desc: 'Provides nutritious meals for 5 dogs in a local shelter for 7 days.', icon: IndianRupee, color: '#FBBF24' },
                { amount: '2,500', title: 'Emergency Surgery', desc: 'Contributes to life-saving medical procedures for injured rescues.', icon: Heart, color: '#EF4444' }
              ].map((tier, i) => (
                <motion.div 
                  key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="card" style={{ padding: '1.5rem', background: 'white', display: 'flex', gap: '1rem', alignItems: 'center' }}
                >
                  <div style={{ background: `${tier.color}15`, padding: '12px', borderRadius: '12px' }}>
                    <tier.icon color={tier.color} size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>₹{tier.amount}</div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: tier.color }}>{tier.title}</div>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{tier.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Fund Breakdown */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card" style={{ padding: '2.5rem', background: 'white' }}>
              <h3 style={{ fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <PieChart size={22} color="#2563EB" /> Fund Usage Breakdown
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { label: 'Rescue & Medical Care', percentage: 65, color: '#EF4444' },
                  { label: 'Shelter & Food', percentage: 20, color: '#FBBF24' },
                  { label: 'Platform & Operations', percentage: 10, color: '#3B82F6' },
                  { label: 'Community Education', percentage: 5, color: '#10B981' }
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
                      <span>{item.label}</span>
                      <span>{item.percentage}%</span>
                    </div>
                    <div style={{ height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                      <motion.div 
                        initial={{ width: 0 }} animate={{ width: `${item.percentage}%` }} transition={{ duration: 1, delay: 0.5 }}
                        style={{ height: '100%', background: item.color }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '2.5rem', padding: '1.5rem', borderRadius: '1rem', background: '#F8FAFC', border: '1px dashed var(--color-border)' }}>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                  Audited by independent partners for 100% transparency.
                </p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Partnerships */}
        <section style={{ background: 'var(--color-bg-alt)', padding: '6rem 1.5rem' }}>
          <div className="max-container">
            <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 800, marginBottom: '3rem' }}>Trusted by Global & Local Ecosystems</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4rem', alignItems: 'center', opacity: 0.6 }}>
              {/* Mock logos */}
              <div style={{ fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.05em' }}>WWF INDIA</div>
              <div style={{ fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.05em' }}>BLUE CROSS</div>
              <div style={{ fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.05em' }}>PETA INDIA</div>
              <div style={{ fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.05em' }}>PEOPLE FOR ANIMALS</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-px section-py max-container" style={{ textAlign: 'center' }}>
          <div className="card" style={{ padding: '4rem 2rem', background: 'linear-gradient(135deg, #2563EB, #60A5FA)', color: 'white' }}>
            <Users size={48} style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Join the movement.</h2>
            <p style={{ maxWidth: '500px', margin: '0 auto 2.5rem', opacity: 0.9 }}>
              Every contribution, no matter how small, helps us build a better world for our voiceless friends.
            </p>
            <button className="btn-primary" style={{ background: 'white', color: '#2563EB', fontWeight: 800, border: 'none', padding: '1rem 3rem' }}>
              Donate Now
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
