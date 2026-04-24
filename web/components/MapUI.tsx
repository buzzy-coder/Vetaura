'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { USER_LOCATION, MOCK_MARKETPLACES, MOCK_VOLUNTEERS } from '@/lib/mockData';
import { Home, Store, Stethoscope, Scissors } from 'lucide-react';

// Fix for default Leaflet marker icons in Next.js
const initLeaflet = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

export default function MapUI() {
  useEffect(() => {
    initLeaflet();
  }, []);

  // Custom icon for the user using Leaflet divIcon
  const userIcon = L.divIcon({
    html: `<div style="background: var(--color-primary); color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-float); border: 2px solid white;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
           </div>`,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });

  const getShopIcon = (type: string) => {
    const color = 
      type === 'Clinic' ? '#EF4444' : 
      type === 'Grooming' ? '#F59E0B' : 
      type === 'Pet Shop' ? '#2563EB' : 
      type === 'Shelter' ? '#10B981' : 
      'var(--color-text-secondary)';
    
    let innerSvg = '';
    if (type === 'Clinic') {
      innerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
    } else if (type === 'Grooming') {
      innerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`;
    } else if (type === 'Pet Shop') {
      innerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>`;
    } else if (type === 'Shelter') {
      innerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9 12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
    } else {
      innerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
    }

    return L.divIcon({
      html: `<div style="background: var(--color-card-bg); color: ${color}; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-card); border: 1.5px solid ${color};">
              ${innerSvg}
             </div>`,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  };

  return (
    <div style={{ height: '450px', width: '100%', borderRadius: 'inherit', overflow: 'hidden', position: 'relative' }}>
      <MapContainer 
        center={[USER_LOCATION.lat, USER_LOCATION.lng]} 
        zoom={14} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {/* User Marker */}
        <Marker position={[USER_LOCATION.lat, USER_LOCATION.lng]} icon={userIcon}>
          <Popup className="custom-popup">
            <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
              {USER_LOCATION.name}'s Home
            </div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
              Base Location for services in {USER_LOCATION.address}.
            </div>
          </Popup>
        </Marker>

        {/* Pet Shop Marketplaces */}
        {MOCK_MARKETPLACES.map(shop => (
          <Marker 
            key={shop.id} 
            position={[shop.lat, shop.lng]} 
            icon={getShopIcon(shop.type)}
          >
            <Popup className="custom-popup">
              <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                {shop.name} <span style={{ fontSize: '0.75rem', fontWeight: 500, padding: '2px 6px', background: 'var(--color-bg-base)', borderRadius: '4px', marginLeft: '4px' }}>{shop.type}</span>
              </div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                {shop.description}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Volunteer Markers */}
        {MOCK_VOLUNTEERS.map(vol => (
          <Marker 
            key={vol.id} 
            position={[vol.location.lat, vol.location.lng]} 
            icon={L.divIcon({
              html: `<div style="background: white; color: #2563EB; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-float); border: 1.5px solid #2563EB;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                     </div>`,
              className: '',
              iconSize: [30, 30],
              iconAnchor: [15, 30],
              popupAnchor: [0, -30],
            })}
          >
            <Popup className="custom-popup">
              <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                {vol.name} <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#16A34A', marginLeft: '4px' }}>● Verified</span>
              </div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>
                {vol.bio}
              </div>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {vol.servicesOffered.map(s => (
                  <span key={s} style={{ fontSize: '0.7rem', padding: '2px 6px', background: '#EFF6FF', color: '#2563EB', borderRadius: '4px' }}>{s}</span>
                ))}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

        {/* Map Legend */}
        <div style={{ 
          position: 'absolute', bottom: '20px', left: '20px', zIndex: 1000, 
          background: 'var(--color-card-bg)', padding: '10px 14px', borderRadius: '12px',
          boxShadow: 'var(--shadow-float)', border: '1px solid var(--color-border)',
          display: 'flex', gap: '12px', fontSize: '0.75rem', fontWeight: 600
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} /> Clinic</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} /> Grooming</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563EB' }} /> Shop</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} /> Shelter</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ border: '1px solid #2563EB', width: '8px', height: '8px', borderRadius: '50%', background: 'white' }} /> Volunteer</div>
        </div>

        {/* Global override for Leaflet popup styles to match Antigravity theme */}
        <style>{`
          .leaflet-popup-content-wrapper {
            background: var(--color-card-bg);
            border-radius: var(--radius-btn);
            box-shadow: var(--shadow-float);
            padding: 8px;
          }
          .leaflet-popup-tip {
            background: var(--color-card-bg);
          }
          .leaflet-container a.leaflet-popup-close-button {
            color: var(--color-text-muted);
            padding: 10px 10px 0 0;
          }
        `}</style>
    </div>
  );
}
