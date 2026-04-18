'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { bookAppointment } from '../lib/api';

export default function BookingModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    ownerName: '',
    phone: '',
    petName: '',
    serviceType: 'checkup',
    date: '',
    address: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create a mock ownerId for the prototype
      const ownerId = 'user_' + formData.phone;

      await bookAppointment({
        petId: 'pet_' + formData.petName,
        ownerId,
        type: 'vet',
        serviceType: formData.serviceType as any,
        scheduledAt: new Date(formData.date).toISOString(),
        address: formData.address,
        notes: `Booked by ${formData.ownerName} for ${formData.petName}`,
      });
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Failed to book appointment.');
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
              Book an Appointment
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Schedule a vet or volunteer exactly when you need them.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input required placeholder="Your Name" value={formData.ownerName} onChange={e => setFormData({...formData, ownerName: e.target.value})} style={inputStyle} />
                <input required placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={inputStyle} />
              </div>
              <input required placeholder="Pet's Name" value={formData.petName} onChange={e => setFormData({...formData, petName: e.target.value})} style={inputStyle} />
              
              <select value={formData.serviceType} onChange={e => setFormData({...formData, serviceType: e.target.value})} style={inputStyle}>
                <option value="checkup">Vet: General Checkup</option>
                <option value="vaccination">Vet: Vaccination</option>
                <option value="grooming">Volunteer: Grooming</option>
                <option value="walking">Volunteer: Dog Walking</option>
              </select>

              <input required type="datetime-local" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} style={inputStyle} />
              <input required placeholder="Full Address in Bhubaneswar" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} style={inputStyle} />

              <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '0.5rem', justifyContent: 'center', width: '100%', border: 'none', cursor: 'pointer' }}>
                {loading ? 'Booking...' : 'Confirm Booking'}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>Booking Confirmed!</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Your request has been successfully saved.</p>
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
