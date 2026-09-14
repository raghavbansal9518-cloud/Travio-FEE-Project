import React from 'react';
import DestinationCard from './DestinationCard';

export default function HiddenGems({ destinations }) {
  return (
    <section className="gems-section">
      <div className="section-header">
        <div className="section-tag">
          <i className="fa-solid fa-sparkles" style={{ color: '#ec4899' }}></i> UNCHARTED WONDERS
        </div>
        <h2 className="section-title">✨ HIDDEN GEMS</h2>
        <p className="section-subtitle">
          Discover places beyond the usual tourist paths and commercial crowds.
        </p>
      </div>

      <div className="gems-grid">
        {destinations.map((dest) => (
          <DestinationCard 
            key={dest.id} 
            destination={dest} 
            isGem={true} 
          />
        ))}
      </div>
    </section>
  );
}
