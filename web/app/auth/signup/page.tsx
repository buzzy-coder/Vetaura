'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User as UserIcon, Phone, Mail, Lock, ArrowRight, Loader2, PawPrint } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { signup } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'pet_owner'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signup(formData);
      setSuccess(true);
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-mist)' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: 'var(--color-card-bg)', padding: '3rem', borderRadius: '1.5rem', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', maxWidth: '450px', width: '90%' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ background: '#EFF6FF', padding: '1rem', borderRadius: '50%' }}>
              <PawPrint color="#2563EB" size={32} />
            </div>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>Create Profile</h1>
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>Join the Vetaura community today.</p>

          {success ? (
            <div style={{ textAlign: 'center', color: '#10B981', fontWeight: 700 }}>
              Profile created! Redirecting to login...
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ position: 'relative' }}>
                <UserIcon size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input 
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  placeholder="Full Name" required
                  style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-bg-alt)', color: 'var(--color-text-primary)' }} 
                />
              </div>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input 
                  type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  placeholder="Email Address" required
                  style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-bg-alt)', color: 'var(--color-text-primary)' }} 
                />
              </div>
              <div style={{ position: 'relative' }}>
                <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input 
                  value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                  placeholder="Phone Number" required
                  style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-bg-alt)', color: 'var(--color-text-primary)' }} 
                />
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input 
                  type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} 
                  placeholder="Create Password" required
                  style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-bg-alt)', color: 'var(--color-text-primary)' }} 
                />
              </div>
              
              <select 
                value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value as any})}
                style={{ padding: '0.8rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-bg-alt)', color: 'var(--color-text-primary)', cursor: 'pointer' }}
              >
                <option value="pet_owner">Pet Owner</option>
                <option value="volunteer">Volunteer</option>
                <option value="vet">Veterinarian</option>
              </select>

              {error && <p style={{ color: '#EF4444', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
              
              <button disabled={loading} className="btn-primary" style={{ justifyContent: 'center', border: 'none', cursor: 'pointer', marginTop: '1rem' }}>
                {loading ? <Loader2 className="animate-spin" size={20} /> : <>Create Profile <ArrowRight size={18} /></>}
              </button>
            </form>
          )}

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Already have an account? <Link href="/dashboard" style={{ color: '#2563EB', fontWeight: 600 }}>Log In</Link>
          </p>
        </motion.div>
      </main>
    </>
  );
}
