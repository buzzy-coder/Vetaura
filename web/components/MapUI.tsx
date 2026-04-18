'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { USER_LOCATION, MOCK_MARKETPLACES } from '@/lib/mockData';
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
    const color = type === 'Clinic' ? 'var(--color-coral)' : type === 'Grooming' ? 'var(--color-sun)' : 'var(--color-text-secondary)';
    
    // SVG strings to bypass Lucide render lifecycle issues inside Leaflet
    let innerSvg = '';
    if (type === 'Clinic') {
      innerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>`;
    } else if (type === 'Grooming') {
      innerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`;
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
    <div style={{ height: '450px', width: '100%', borderRadius: 'inherit', overflow: 'hidden' }}>
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
      </MapContainer>

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
