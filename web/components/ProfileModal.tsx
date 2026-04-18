'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { upsertPetProfile } from '../lib/api';

export default function ProfileModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    petName: '',
    species: 'dog',
    breed: '',
    age: '',
    weight: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await upsertPetProfile({
        ownerId: 'user_' + formData.ownerPhone, // Mock logic for ownerId
        ownerName: formData.ownerName,
        ownerPhone: formData.ownerPhone,
        ownerEmail: formData.ownerEmail,
        petName: formData.petName,
        species: formData.species as any,
        breed: formData.breed,
        age: Number(formData.age),
        weight: Number(formData.weight),
        vaccinations: [],
        medicalHistory: []
      } as any);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Failed to register pet profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        style={{
          background: 'var(--color-card-bg)', borderRadius: '1.5rem', width: '90%', maxWidth: '500px',
          padding: '2rem', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
        }}
      >
        <button onClick={onClose} style={{
          position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem'
        }}>
          <X size={20} color="var(--color-text-muted)" />
        </button>

        {!success ? (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
              Create Pet Profile
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Register your furry friend to experience weightless pet care.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input required placeholder="Your Name" value={formData.ownerName} onChange={e => setFormData({...formData, ownerName: e.target.value})} style={inputStyle} />
                <input required placeholder="Phone Number" value={formData.ownerPhone} onChange={e => setFormData({...formData, ownerPhone: e.target.value})} style={inputStyle} />
              </div>
              <input required type="email" placeholder="Email Address" value={formData.ownerEmail} onChange={e => setFormData({...formData, ownerEmail: e.target.value})} style={inputStyle} />
              
              <div style={{ padding: '1rem', border: '1px dashed var(--color-border)', borderRadius: '1rem', marginTop: '0.5rem' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem' }}>Pet Details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <input required placeholder="Pet's Name" value={formData.petName} onChange={e => setFormData({...formData, petName: e.target.value})} style={inputStyle} />
                    <select value={formData.species} onChange={e => setFormData({...formData, species: e.target.value})} style={inputStyle}>
                      <option value="dog">Dog</option>
                      <option value="cat">Cat</option>
                      <option value="bird">Bird</option>
                      <option value="rabbit">Rabbit</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <input required placeholder="Breed" value={formData.breed} onChange={e => setFormData({...formData, breed: e.target.value})} style={inputStyle} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <input required type="number" placeholder="Age (Months)" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} style={inputStyle} />
                    <input required type="number" placeholder="Weight (kg)" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} style={inputStyle} />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '0.5rem', justifyContent: 'center', width: '100%', border: 'none', cursor: 'pointer' }}>
                {loading ? 'Saving...' : 'Register Pet'}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🐾</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>Profile Created!</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>You're all set to book appointments.</p>
            <button onClick={onClose} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
              Close
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

const inputStyle = {
  padding: '0.8rem 1rem',
  borderRadius: '0.75rem',
  border: '1px solid var(--color-border)',
  fontSize: '0.95rem',
  outline: 'none',
  width: '100%',
  fontFamily: 'inherit',
};
