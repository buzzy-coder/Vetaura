'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User as UserIcon, PawPrint, LogOut, Loader2, ArrowRight, ShieldCheck, TrendingUp, FileText } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { getUserProfile, getPetProfile, getAppointments, login } from '@/lib/api';
import { PetProfile, Appointment } from '@/lib/types';

export default function Dashboard() {
  const [phone, setPhone] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  
  const [user, setUser] = useState<any>(null);
  const [pet, setPet] = useState<PetProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('appointments');

  // Check localstorage on mount
  useEffect(() => {
    const savedPhone = localStorage.getItem('vetaura_phone');
    if (savedPhone) {
      setPhone(savedPhone);
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch data when phone changes
  useEffect(() => {
    if (!phone) return;
    
    async function loadDashboard() {
      setLoading(true);
      setError('');
      try {
        const userData = await getUserProfile(phone);
        setUser(userData);
        
        try {
          const petData = await getPetProfile(userData.id);
          setPet(petData);
        } catch (e) {
          console.log("No pet profile found");
        }

        const apptData = await getAppointments(userData.id);
        setAppointments(apptData);
      } catch (err) {
        console.error(err);
        setError('Could not find a profile with this phone number.');
        localStorage.removeItem('vetaura_phone');
        setPhone('');
      } finally {
        setLoading(false);
      }
    }
    
    loadDashboard();
  }, [phone]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPhone || !inputPassword) return;
    setLoading(true);
    setError('');
    try {
      const response = await login({ phone: inputPhone, password: inputPassword });
      localStorage.setItem('vetaura_phone', inputPhone);
      setPhone(inputPhone);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('vetaura_phone');
    setPhone('');
    setUser(null);
    setPet(null);
    setAppointments([]);
  };

  // 1. Loading State
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  // 2. Auth State (Enter Phone)
  if (!phone || !user) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: '100vh', paddingTop: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-mist)' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: 'var(--color-card-bg)', padding: '3rem', borderRadius: '1.5rem', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', maxWidth: '400px', width: '90%' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{ background: '#EFF6FF', padding: '1rem', borderRadius: '50%' }}>
                <UserIcon color="#2563EB" size={32} />
              </div>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>Access Dashboard</h1>
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>Enter the phone number associated with your Vetaura bookings.</p>
            
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                value={inputPhone} 
                onChange={(e) => setInputPhone(e.target.value)} 
                placeholder="Phone Number" 
                required
                style={{ padding: '0.8rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', outline: 'none', width: '100%', background: 'var(--color-bg-alt)', color: 'var(--color-text-primary)' }} 
              />
              <input 
                type="password"
                value={inputPassword} 
                onChange={(e) => setInputPassword(e.target.value)} 
                placeholder="Password" 
                required
                style={{ padding: '0.8rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', outline: 'none', width: '100%', background: 'var(--color-bg-alt)', color: 'var(--color-text-primary)' }} 
              />
              {error && <p style={{ color: '#EF4444', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
              <button className="btn-primary" style={{ justifyContent: 'center', border: 'none', cursor: 'pointer' }}>
                View Dashboard <ArrowRight size={16} />
              </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Don&apos;t have an account? <Link href="/auth/signup" style={{ color: '#2563EB', fontWeight: 600 }}>Create Profile</Link>
            </p>
          </motion.div>
        </main>
      </>
    );
  }

  // 3. User Dashboard
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '100px', background: 'var(--color-mist)' }}>
        <div className="max-container section-px" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 350px) 1fr', gap: '2rem', alignItems: 'start' }}>
          
          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* User Profile Card */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ background: 'var(--color-card-bg)', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {user.avatar ? <img src={user.avatar} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : <UserIcon color="var(--color-text-muted)" />}
                </div>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>{user.name}</h2>
                  <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.9rem' }}>{user.phone}</p>
                </div>
              </div>
              <button onClick={handleLogout} className="btn-secondary" style={{ width: '100%', justifyContent: 'center', border: 'none', cursor: 'pointer', background: '#FEE2E2', color: '#EF4444' }}>
                <LogOut size={16} /> Log Out
              </button>
            </motion.div>

            {/* Pet Profile Card */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }} style={{ background: 'linear-gradient(135deg, #1E3A8A, #3B82F6)', borderRadius: '1.5rem', padding: '2rem', color: 'white', boxShadow: '0 4px 20px rgba(37,99,235,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <PawPrint size={20} />
                <h3 style={{ fontWeight: 700, margin: 0 }}>My Pet</h3>
              </div>
              {pet ? (
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>{pet.petName}</div>
                  <div style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '1rem' }}>{pet.breed} • {pet.age} mos • {pet.weight} kg</div>
                </div>
              ) : (
                <div>
                  <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>No pet registered yet.</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Main Content (Tabs) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Tabs Header */}
            <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
              {['appointments', 'health', 'records'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{ 
                    padding: '0.5rem 1rem', background: 'none', border: 'none', 
                    borderBottom: activeTab === tab ? '2px solid #2563EB' : 'none',
                    color: activeTab === tab ? '#2563EB' : 'var(--color-text-muted)',
                    fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', textTransform: 'capitalize'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content: Appointments */}
            {activeTab === 'appointments' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'var(--color-card-bg)', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', minHeight: '500px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar color="#2563EB" /> Upcoming
                  </h2>
                </div>

                {appointments.length === 0 ? (
                  <div style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    <Calendar size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
                    <p>You have no upcoming appointments.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {appointments.map((appt) => (
                      <div key={appt.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: '1rem' }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                            {appt.serviceType === 'checkup' ? 'Veterinary Checkup' : 
                             appt.serviceType === 'vaccination' ? 'Vaccination' :
                             appt.serviceType === 'grooming' ? 'Grooming' : 'Dog Walking'}
                          </div>
                          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                            {new Date(appt.scheduledAt).toLocaleString()} • {appt.address}
                          </div>
                        </div>
                        <div>
                          <span style={{ 
                            padding: '0.4rem 0.8rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: 600,
                            background: appt.status === 'confirmed' ? '#DCFCE7' : appt.status === 'pending' ? '#FEF9C3' : 'var(--color-bg-alt)',
                            color: appt.status === 'confirmed' ? '#16A34A' : appt.status === 'pending' ? '#CA8A04' : 'var(--color-text-muted)'
                          }}>
                            {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Tab Content: Health (Vaccination & Weight) */}
            {activeTab === 'health' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {/* Vaccination History */}
                <div style={{ background: 'var(--color-card-bg)', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={20} color="#10B981" /> Vaccination Status
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                      { name: 'Rabies', date: 'Jan 12, 2024', status: 'Completed', color: '#10B981' },
                      { name: 'DHPP', date: 'Feb 05, 2024', status: 'Completed', color: '#10B981' },
                      { name: 'Leptospirosis', date: 'June 20, 2024', status: 'Upcoming', color: '#3B82F6' }
                    ].map((v, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '0.75rem' }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{v.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{v.date}</div>
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: v.color }}>{v.status.toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weight Tracking */}
                <div style={{ background: 'var(--color-card-bg)', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <TrendingUp size={20} color="#2563EB" /> Weight Tracking (kg)
                  </h3>
                  {/* Mock Chart */}
                  <div style={{ height: '150px', position: 'relative', display: 'flex', alignItems: 'flex-end', gap: '1rem', padding: '0 1rem' }}>
                    {[12, 12.5, 13.2, 13.8, 14.2].map((w, i) => (
                      <div key={i} style={{ flex: 1, position: 'relative' }}>
                        <motion.div 
                          initial={{ height: 0 }} animate={{ height: `${(w/15) * 100}%` }}
                          style={{ background: 'linear-gradient(to top, #2563EB, #60A5FA)', borderRadius: '4px 4px 0 0', width: '100%' }}
                        />
                        <div style={{ position: 'absolute', top: '-25px', width: '100%', textAlign: 'center', fontSize: '0.7rem', fontWeight: 700 }}>{w}</div>
                        <div style={{ textAlign: 'center', fontSize: '0.65rem', marginTop: '8px', color: 'var(--color-text-muted)' }}>M{i+1}</div>
                      </div>
                    ))}
                  </div>
                  <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                    {pet?.petName}&apos;s weight is within the healthy range for {pet?.breed}.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Tab Content: Records */}
            {activeTab === 'records' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'var(--color-card-bg)', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', minHeight: '500px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText color="#2563EB" /> Medical History
                  </h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { type: 'General Checkup', date: 'March 15, 2024', doctor: 'Dr. Satpathy', notes: 'Overall healthy, slight tartar buildup.' },
                    { type: 'Skin Allergy', date: 'Feb 10, 2024', doctor: 'Dr. Mishra', notes: 'Prescribed Apoquel for seasonal itching.' }
                  ].map((rec, i) => (
                    <div key={i} style={{ padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <h4 style={{ fontWeight: 700, margin: 0 }}>{rec.type}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{rec.date}</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#2563EB', fontWeight: 600, marginBottom: '0.75rem' }}>{rec.doctor}</div>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{rec.notes}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </main>

    </>
  );
}
