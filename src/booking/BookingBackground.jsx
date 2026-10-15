import React from 'react';

export default function BookingBackground({ activeCategory }) {
  // Background images tailored to MOVE, STAY, EXPERIENCE
  // Using high-res imagery matching TRAVIO Explore's dark aesthetic
  const backgrounds = {
    MOVE: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=1920&auto=format&fit=crop&q=85', // Sleek twilight airport runway / airliner
    STAY: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&auto=format&fit=crop&q=85', // Luxury night resort with infinity pool & villas
    EXPERIENCE: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop&q=85', // Stunning tropical mountain / ocean landscape
  };

  return (
    <div className="booking-bg-viewport">
      {/* Background layer for MOVE */}
      <div 
        className={`booking-bg-layer ${activeCategory === 'MOVE' ? 'active' : ''}`}
        style={{ backgroundImage: `url(${backgrounds.MOVE})` }}
      />
      {/* Background layer for STAY */}
      <div 
        className={`booking-bg-layer ${activeCategory === 'STAY' ? 'active' : ''}`}
        style={{ backgroundImage: `url(${backgrounds.STAY})` }}
      />
      {/* Background layer for EXPERIENCE */}
      <div 
        className={`booking-bg-layer ${activeCategory === 'EXPERIENCE' ? 'active' : ''}`}
        style={{ backgroundImage: `url(${backgrounds.EXPERIENCE})` }}
      />

      {/* Dark Vignette & Glass Blur Overlays */}
      <div className="booking-bg-vignette" />
      <div className="booking-ambient-glow glow-cyan" />
      <div className="booking-ambient-glow glow-purple" />
      <div className="booking-ambient-glow glow-blue" />
    </div>
  );
}
