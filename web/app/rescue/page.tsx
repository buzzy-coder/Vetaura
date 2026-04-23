'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Camera, MapPin, AlertCircle, CheckCircle, Users, Shield, MessageSquare, ArrowRight } from 'lucide-react';

export default function RescuePage() {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState<any>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [description, setDescription] = useState('');
  const [reports, setReports] = useState([
    { id: 1, type: 'Injured Dog', location: 'Saheed Nagar, Bhubaneswar', status: 'verified', upvotes: 12, time: '20 mins ago', image: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&q=80&w=200' },
    { id: 2, type: 'Abandoned Cat', location: 'Patia, Bhubaneswar', status: 'pending', upvotes: 4, time: '1 hour ago', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200' },
  ]);

  const fetchLocation = () => {
    setLoadingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLoadingLocation(false);
      }, (error) => {
        console.error(error);
        // Fallback mock
        setLocation({ lat: 20.2961, lng: 85.8245 }); // Bhubaneswar
        setLoadingLocation(false);
      });
    }
  };

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Show success
  };

  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--color-mist)', minHeight: '100vh', paddingTop: '100px' }}>
        
        {/* Header */}
        <section className="section-px section-py max-container" style={{ paddingBottom: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="pill" style={{ background: '#FEE2E2', color: '#EF4444', marginBottom: '1.5rem' }}>
              <AlertCircle size={14} /> Emergency Rescue System
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1.25rem' }}>
              See a pet in distress? <span style={{ color: '#EF4444' }}>Report it.</span>
            </h1>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
              Our verified network of volunteers and NGOs in Tier-2 cities are ready to act. Quick reporting saves lives.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
            
            {/* Reporting Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="card" style={{ padding: '2.5rem', background: 'white' }}
            >
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h3 style={{ fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      Step 1: Incident Details
                    </h3>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem' }}>Upload Image/Video</label>
                      <div style={{ border: '2px dashed var(--color-border)', borderRadius: '1rem', padding: '3rem', textAlign: 'center', cursor: 'pointer', background: '#F8FAFC' }}>
                        <Camera size={40} color="var(--color-text-muted)" style={{ margin: '0 auto 1rem' }} />
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Tap to capture or upload</p>
                      </div>
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem' }}>Description</label>
                      <textarea 
                        placeholder="Describe the condition of the pet..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', outline: 'none', minHeight: '100px', fontFamily: 'inherit' }}
                      />
                    </div>
                    <button className="btn-primary" onClick={() => setStep(2)} style={{ width: '100%', justifyContent: 'center' }}>
                      Next Step <ArrowRight size={18} />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h3 style={{ fontWeight: 800, marginBottom: '1.5rem' }}>Step 2: Tag Location</h3>
                    <div style={{ marginBottom: '2rem' }}>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                        Accurate location helps volunteers reach the pet faster.
                      </p>
                      <button 
                        onClick={fetchLocation}
                        style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', border: '1.5px solid #2563EB', color: '#2563EB', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: location ? '#EFF6FF' : 'transparent', cursor: 'pointer' }}
                      >
                        <MapPin size={18} /> {loadingLocation ? 'Fetching GPS...' : location ? 'Location Tagged ✓' : 'Auto-fetch Location'}
                      </button>
                      {location && (
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.5rem', textAlign: 'center' }}>
                          Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                        </p>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button className="btn-secondary" onClick={() => setStep(1)} style={{ flex: 1, justifyContent: 'center' }}>Back</button>
                      <button className="btn-primary" onClick={handleReport} style={{ flex: 2, justifyContent: 'center', background: '#EF4444', border: 'none' }}>Submit Report</button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <CheckCircle size={64} color="#10B981" style={{ margin: '0 auto 1.5rem' }} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Report Submitted!</h3>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                      Nearby volunteers and NGOs have been notified. We will update you as soon as someone responds.
                    </p>
                    <button className="btn-primary" onClick={() => {setStep(1); setDescription(''); setLocation(null);}}>Report Another</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Community Feed */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 style={{ fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users color="#2563EB" size={22} /> Community Feed (Bhubaneswar)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {reports.map((report) => (
                  <div key={report.id} className="card" style={{ padding: '1rem', display: 'flex', gap: '1rem', background: 'white' }}>
                    <img src={report.image} alt={report.type} style={{ width: '80px', height: '80px', borderRadius: '0.75rem', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ fontWeight: 700, margin: 0 }}>{report.type}</h4>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '20px', background: report.status === 'verified' ? '#DCFCE7' : '#FEF3C7', color: report.status === 'verified' ? '#16A34A' : '#D97706' }}>
                          {report.status.toUpperCase()}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '0.25rem 0' }}>{report.location} • {report.time}</p>
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                        <button style={{ background: 'none', border: 'none', padding: 0, fontSize: '0.8rem', color: '#2563EB', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle size={14} /> Confirm ({report.upvotes})
                        </button>
                        <button style={{ background: 'none', border: 'none', padding: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MessageSquare size={14} /> Discuss
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ecosystem Support */}
              <div className="card" style={{ marginTop: '2rem', padding: '1.5rem', background: 'linear-gradient(135deg, #1E293B, #0F172A)', color: 'white' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Shield size={18} color="#60A5FA" /> Trust Protocol
                </h4>
                <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '1rem' }}>
                  Our system is inspired by organizations like <strong>PETA India</strong> and <strong>Blue Cross</strong>. Reports are verified by the community and moderated by experts.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 600, padding: '4px 10px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)' }}>NGO VALIDATION</div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 600, padding: '4px 10px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)' }}>VOLUNTEER NETWORK</div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
