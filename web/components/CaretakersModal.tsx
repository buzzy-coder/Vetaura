'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, CheckCircle } from 'lucide-react';
import { getActiveVolunteers, assignCaretaker } from '../lib/api';
import { Volunteer } from '../lib/types';

export default function CaretakersModal({ onClose }: { onClose: () => void }) {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [zone, setZone] = useState('');
  
  // Selection State
  const [selectedCareTaker, setSelectedCareTaker] = useState<Volunteer | null>(null);
  const [phone, setPhone] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [assignmentSuccess, setAssignmentSuccess] = useState(false);

  useEffect(() => {
    fetchVolunteers(zone);
  }, [zone]);

  const fetchVolunteers = async (searchZone: string) => {
    setLoading(true);
    try {
      const data = await getActiveVolunteers(searchZone || undefined);
      setVolunteers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!phone) return alert("Please enter your phone number.");
    if (!selectedCareTaker) return;
    
    setIsAssigning(true);
    try {
      await assignCaretaker(phone, selectedCareTaker.id);
      setAssignmentSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000); // Close after 2 seconds
    } catch (e) {
      console.error(e);
      alert("Error assigning caretaker");
    } finally {
      setIsAssigning(false);
    }
  }

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
          background: 'var(--color-mist)', borderRadius: '1.5rem', width: '90%', maxWidth: '600px', maxHeight: '85vh',
          padding: '2rem', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column'
        }}
      >
        <button onClick={onClose} style={{
          position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem'
        }}>
          <X size={20} color="var(--color-text-muted)" />
        </button>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
          Live Caretakers
        </h2>
        
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex', alignItems: 'center', background: 'var(--color-card-bg)', border: '1px solid var(--color-border)', padding: '0.5rem 1rem', borderRadius: '0.75rem', flex: 1
          }}>
            <Search size={16} color="var(--color-text-muted)" />
            <input 
              placeholder="Search by zone (e.g., Patia)" 
              value={zone} 
              onChange={e => setZone(e.target.value)}
              style={{ border: 'none', outline: 'none', width: '100%', marginLeft: '0.5rem', fontSize: '0.9rem' }}
            />
          </div>
        </div>

        <div style={{ overflowY: 'auto', flex: 1, paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--color-text-muted)' }}>Loading volunteers...</div>
          ) : volunteers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--color-text-muted)' }}>No volunteers found in this zone.</div>
          ) : (
            volunteers.map(v => {
              const isSelected = selectedCareTaker?.id === v.id;
              
              return (
              <div key={v.id} style={{ 
                background: 'var(--color-card-bg)', padding: '1rem', borderRadius: '1rem', 
                border: isSelected ? '2px solid #2563EB' : '1px solid var(--color-border)',
                transition: 'all 0.2s ease',
                display: 'flex', flexDirection: 'column', gap: '1rem' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={v.avatar} alt={v.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    <div>
                      <h4 style={{ fontWeight: 700, margin: 0 }}>{v.name}</h4>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
                        <span style={{ color: '#2563EB', fontWeight: 600 }}>⭐ {v.rating}</span>
                        <span>•</span>
                        <span>{v.location.zone}</span>
                      </div>
                    </div>
                  </div>
                  
                  {!isSelected && (
                    <button 
                      onClick={() => setSelectedCareTaker(v)}
                      className="btn-secondary" 
                      style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                    >
                      Select
                    </button>
                  )}
                </div>

                {/* Inline Assignment Form */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ 
                        borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginTop: '0.5rem',
                        display: 'flex', flexDirection: 'column', gap: '0.75rem' 
                      }}>
                        {assignmentSuccess ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16A34A', fontWeight: 600, justifyContent: 'center' }}>
                            <CheckCircle size={18} /> Assigned to your profile!
                          </div>
                        ) : (
                          <>
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
                              Enter your phone number to assign {v.name} to your profile:
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <input 
                                required
                                placeholder="Phone Number" 
                                value={phone} 
                                onChange={e => setPhone(e.target.value)} 
                                style={{ 
                                  padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', 
                                  fontSize: '0.9rem', outline: 'none', flex: 1 
                                }} 
                              />
                              <button 
                                onClick={handleAssign}
                                disabled={isAssigning || !phone}
                                className="btn-primary" 
                                style={{ padding: '0.5rem 1rem', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}
                              >
                                {isAssigning ? 'Assigning...' : 'Assign'}
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )})
          )}
        </div>
      </motion.div>
    </div>
  );
}
