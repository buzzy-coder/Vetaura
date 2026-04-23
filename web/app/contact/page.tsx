'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--color-mist)', minHeight: '100vh', paddingTop: '100px' }}>
        
        {/* Header */}
        <section className="section-px section-py max-container" style={{ paddingBottom: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="pill" style={{ background: '#EFF6FF', color: '#2563EB', marginBottom: '1.5rem' }}>
              Contact Us
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1.5rem' }}>
              We&apos;re here to <span style={{ color: '#2563EB' }}>help.</span>
            </h1>
            <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--color-text-secondary)' }}>
              Have questions about our services or need help with a rescue? Reach out to our team in Bhubaneswar.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            
            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="card" style={{ padding: '2rem', background: 'white' }}>
                <h3 style={{ fontWeight: 800, marginBottom: '2rem' }}>Get in Touch</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ background: '#EFF6FF', padding: '10px', borderRadius: '10px' }}>
                      <Mail color="#2563EB" size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Email Support</div>
                      <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>hello@vetaura.in</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ background: '#F0FDF4', padding: '10px', borderRadius: '10px' }}>
                      <Phone color="#22C55E" size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Phone Support</div>
                      <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>+91 98765 43210</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ background: '#FEF2F2', padding: '10px', borderRadius: '10px' }}>
                      <MapPin color="#EF4444" size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Office Address</div>
                      <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Saheed Nagar, Bhubaneswar, Odisha</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: '2rem', background: '#F8FAFC', border: '1px dashed var(--color-border)' }}>
                <h4 style={{ fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={18} color="#2563EB" /> Support Hours
                </h4>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Monday - Friday</span>
                    <span style={{ fontWeight: 600 }}>9:00 AM - 8:00 PM</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Saturday - Sunday</span>
                    <span style={{ fontWeight: 600 }}>10:00 AM - 4:00 PM</span>
                  </div>
                  <div style={{ marginTop: '0.5rem', color: '#EF4444', fontWeight: 600, fontSize: '0.85rem' }}>
                    *Emergency Rescue: 24/7 Available
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card" style={{ padding: '2.5rem', background: 'white' }}>
              <h3 style={{ fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare size={22} color="#2563EB" /> Send a Message
              </h3>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>First Name</label>
                    <input style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="John" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Last Name</label>
                    <input style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email Address</label>
                  <input style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="john@example.com" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Message</label>
                  <textarea style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', outline: 'none', minHeight: '120px', fontFamily: 'inherit' }} placeholder="How can we help you?" />
                </div>
                <button className="btn-primary" style={{ justifyContent: 'center', marginTop: '1rem' }}>
                  Send Message <Send size={18} />
                </button>
              </form>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
