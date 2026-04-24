'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Stethoscope, User, Bot } from 'lucide-react';

export default function TriageChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm Vetaura's triage assistant. How is your pet feeling today?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      let response = "I understand. Is your pet showing any other symptoms like lethargy or loss of appetite?";
      if (input.toLowerCase().includes('blood') || input.toLowerCase().includes('breathing')) {
        response = "This sounds like an emergency. I'm connecting you to a live vet immediately. Please stay calm.";
      }
      setMessages([...newMessages, { role: 'bot', text: response }]);
    }, 1000);
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 2000 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{ 
              width: '350px', height: '500px', background: 'var(--color-card-bg)', 
              borderRadius: '1.5rem', boxShadow: 'var(--shadow-float-md)', 
              border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{ background: '#2563EB', padding: '1.25rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '6px', borderRadius: '8px' }}>
                  <Stethoscope size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Live Vet Triage</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '6px', height: '6px', background: '#4ADE80', borderRadius: '50%' }} /> Vets Online
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  {msg.role === 'bot' && (
                    <div style={{ background: '#F1F5F9', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Bot size={16} color="#64748B" />
                    </div>
                  )}
                  <div style={{ 
                    padding: '0.8rem 1rem', borderRadius: '1rem', fontSize: '0.9rem',
                    background: msg.role === 'user' ? '#2563EB' : 'var(--color-bg-alt)',
                    color: msg.role === 'user' ? 'white' : 'var(--color-text-primary)',
                    borderTopRightRadius: msg.role === 'user' ? '0' : '1rem',
                    borderTopLeftRadius: msg.role === 'bot' ? '0' : '1rem'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Input */}
            <form onSubmit={handleSend} style={{ padding: '1rem', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '0.5rem' }}>
              <input 
                placeholder="Type your concern..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ flex: 1, padding: '0.6rem 1rem', borderRadius: '99px', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-bg-alt)', fontSize: '0.9rem' }}
              />
              <button type="submit" style={{ background: '#2563EB', color: 'white', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width: '60px', height: '60px', borderRadius: '50%', background: '#2563EB', 
          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', 
          boxShadow: '0 8px 32px rgba(37, 99, 235, 0.4)', border: 'none', cursor: 'pointer'
        }}
      >
        <MessageSquare size={24} />
      </motion.button>
    </div>
  );
}
