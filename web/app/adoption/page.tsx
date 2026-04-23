'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Filter, Search, Heart, Info, MapPin, CheckCircle2 } from 'lucide-react';

const PETS = [
  { id: 1, name: 'Buddy', breed: 'Golden Retriever Mix', age: '2 years', size: 'Medium', gender: 'Male', location: 'Saheed Nagar', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400', vaccinated: true },
  { id: 2, name: 'Luna', breed: 'Indie', age: '5 months', size: 'Small', gender: 'Female', location: 'Patia', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400', vaccinated: true },
  { id: 3, name: 'Milo', breed: 'Persian Cat', age: '1 year', size: 'Small', gender: 'Male', location: 'Unit 4', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400', vaccinated: false },
  { id: 4, name: 'Bella', breed: 'Labrador', age: '3 years', size: 'Large', gender: 'Female', location: 'Khandagiri', image: 'https://images.unsplash.com/photo-1591768793355-74d7cbadf603?auto=format&fit=crop&q=80&w=400', vaccinated: true },
  { id: 5, name: 'Oreo', breed: 'Indie', age: '2 months', size: 'Small', gender: 'Male', location: 'IRC Village', image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400', vaccinated: false },
  { id: 6, name: 'Simba', breed: 'Indie Mix', age: '4 years', size: 'Medium', gender: 'Male', location: 'Cuttack Road', image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=400', vaccinated: true },
];

export default function AdoptionPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredPets = PETS.filter(pet => {
    const matchesFilter = filter === 'All' || pet.size === filter || (filter === 'Puppies' && pet.age.includes('month'));
    const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase()) || pet.breed.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--color-mist)', minHeight: '100vh', paddingTop: '100px' }}>
        
        {/* Hero Section */}
        <section className="section-px section-py max-container" style={{ paddingBottom: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="pill" style={{ background: '#ECFDF5', color: '#10B981', marginBottom: '1.5rem' }}>
              <Heart size={14} /> Adoption Marketplace
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1.25rem' }}>
              Find your <span style={{ color: '#10B981' }}>forever friend.</span>
            </h1>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
              Every pet deserves a home. Browse our verified profiles and start your adoption journey today.
            </p>
          </div>

          {/* Filters & Search */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['All', 'Small', 'Medium', 'Large', 'Puppies'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{ 
                    padding: '0.6rem 1.2rem', borderRadius: '99px', border: '1px solid var(--color-border)', 
                    background: filter === f ? '#10B981' : 'white', color: filter === f ? 'white' : 'var(--color-text-secondary)',
                    fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            <div style={{ position: 'relative', width: '300px' }}>
              <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} size={18} />
              <input 
                placeholder="Search breed or name..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '99px', border: '1px solid var(--color-border)', outline: 'none', background: 'white' }}
              />
            </div>
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {filteredPets.map((pet, i) => (
              <motion.div 
                key={pet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card"
                style={{ background: 'white', overflow: 'hidden' }}
              >
                <div style={{ position: 'relative', height: '240px' }}>
                  <img src={pet.image} alt={pet.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {pet.vaccinated && (
                    <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.9)', padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', fontWeight: 800, color: '#10B981', backdropFilter: 'blur(4px)' }}>
                      <CheckCircle2 size={12} /> VACCINATED
                    </div>
                  )}
                  <button style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(255,255,255,0.9)', padding: '8px', borderRadius: '50%', border: 'none', color: '#EF4444', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
                    <Heart size={18} />
                  </button>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>{pet.name}</h3>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{pet.age}</span>
                  </div>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>{pet.breed}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {pet.location}</span>
                    <span>•</span>
                    <span>{pet.size}</span>
                  </div>

                  <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: '#10B981', border: 'none' }}>
                    Adopt {pet.name}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPets.length === 0 && (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <Info size={48} color="var(--color-text-muted)" style={{ margin: '0 auto 1.5rem', opacity: 0.3 }} />
              <h3>No pets found</h3>
              <p style={{ color: 'var(--color-text-muted)' }}>Try adjusting your filters or search terms.</p>
            </div>
          )}
        </section>

        {/* Workflow Section */}
        <section style={{ background: 'var(--color-footer-bg)', color: 'white', padding: '6rem 1.5rem' }}>
          <div className="max-container">
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 800, marginBottom: '4rem' }}>How it works</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
              {[
                { step: '01', title: 'Choose a Pet', desc: 'Browse profiles and find the pet that matches your lifestyle.' },
                { step: '02', title: 'Apply', desc: 'Fill out a simple adoption request form with your details.' },
                { step: '03', title: 'Meet & Greet', desc: 'Visit the pet at our center or foster home to ensure a match.' },
                { step: '04', title: 'Home Check', desc: 'Our team does a quick virtual or physical check of your home.' },
                { step: '05', title: 'Adopt!', desc: 'Sign the papers and take your new family member home.' }
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(255,255,255,0.1)', lineHeight: 1, marginBottom: '0.5rem' }}>{item.step}</div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
