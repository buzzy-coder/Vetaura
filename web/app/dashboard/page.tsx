'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User as UserIcon, PawPrint, LogOut, Loader2, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { getUserProfile, getPetProfile, getAppointments } from '@/lib/api';
import { PetProfile, Appointment } from '@/lib/types';

export default function Dashboard() {
  const [phone, setPhone] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  
  const [user, setUser] = useState<any>(null);
  const [pet, setPet] = useState<PetProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPhone) return;
    localStorage.setItem('vetaura_phone', inputPhone);
    setPhone(inputPhone);
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
        <main style={{ minHeight: '100vh', paddingTop: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: 'white', padding: '3rem', borderRadius: '1.5rem', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', maxWidth: '400px', width: '90%' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{ background: '#EFF6FF', padding: '1rem', borderRadius: '50%' }}>
                <UserIcon color="#2563EB" size={32} />
              </div>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.5rem', color: '#0F172A' }}>Access Dashboard</h1>
            <p style={{ textAlign: 'center', color: '#64748B', marginBottom: '2rem', fontSize: '0.9rem' }}>Enter the phone number associated with your Vetaura bookings.</p>
            
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                value={inputPhone} 
                onChange={(e) => setInputPhone(e.target.value)} 
                placeholder="Phone Number" 
                required
                style={{ padding: '0.8rem 1rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0', outline: 'none', width: '100%' }} 
              />
              {error && <p style={{ color: '#EF4444', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
              <button className="btn-primary" style={{ justifyContent: 'center', border: 'none', cursor: 'pointer' }}>
                View Dashboard <ArrowRight size={16} />
              </button>
            </form>
          </motion.div>
        </main>
      </>
    );
  }

  // 3. User Dashboard
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '100px', background: '#F8FAFC' }}>
        <div className="max-container section-px" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 350px) 1fr', gap: '2rem', alignItems: 'start' }}>
          
          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* User Profile Card */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {user.avatar ? <img src={user.avatar} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : <UserIcon color="#94A3B8" />}
                </div>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>{user.name}</h2>
                  <p style={{ color: '#64748B', margin: 0, fontSize: '0.9rem' }}>{user.phone}</p>
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

          {/* Main Content (Appointments) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', minHeight: '600px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar color="#2563EB" /> Appointments
              </h2>
            </div>

            {appointments.length === 0 ? (
              <div style={{ padding: '4rem 0', textAlign: 'center', color: '#94A3B8' }}>
                <Calendar size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
                <p>You have no upcoming appointments.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {appointments.map((appt) => (
                  <div key={appt.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', border: '1px solid #E2E8F0', borderRadius: '1rem' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0F172A', marginBottom: '0.25rem' }}>
                        {appt.serviceType === 'checkup' ? 'Veterinary Checkup' : 
                         appt.serviceType === 'vaccination' ? 'Vaccination' :
                         appt.serviceType === 'grooming' ? 'Grooming' : 'Dog Walking'}
                      </div>
                      <div style={{ color: '#64748B', fontSize: '0.9rem' }}>
                        {new Date(appt.scheduledAt).toLocaleString()} • {appt.address}
                      </div>
                    </div>
                    <div>
                      <span style={{ 
                        padding: '0.4rem 0.8rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: 600,
                        background: appt.status === 'confirmed' ? '#DCFCE7' : appt.status === 'pending' ? '#FEF9C3' : '#F1F5F9',
                        color: appt.status === 'confirmed' ? '#16A34A' : appt.status === 'pending' ? '#CA8A04' : '#64748B'
                      }}>
                        {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
}
