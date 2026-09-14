import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MAP_PINS, DESTINATIONS } from '../data/destinationsData';

export default function InteractiveMap() {
  const [activePinId, setActivePinId] = useState('switzerland');
  const navigate = useNavigate();

  const currentDestination = DESTINATIONS.find((d) => d.id === activePinId) || DESTINATIONS[3];

  return (
    <section className="map-section">
      <div className="section-header">
        <div className="section-tag">
          <i className="fa-solid fa-map-location-dot"></i> GEOGRAPHIC EXPLORER
        </div>
        <h2 className="section-title">DISCOVER ON MAP</h2>
        <p className="section-subtitle">
          Interactive dark map previewing iconic global hotspots and destinations.
        </p>
      </div>

      <div className="map-explorer-layout">
        {/* Dark World Map Canvas Box */}
        <div className="interactive-map-canvas-box">
          <svg
            className="world-map-svg-bg"
            viewBox="0 0 1000 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M150,120 Q180,80 280,100 Q320,130 300,200 Q240,240 180,210 Q140,160 150,120 Z 
                 M250,260 Q320,280 340,380 Q310,460 270,440 Q230,360 250,260 Z
                 M450,90 Q540,60 580,110 Q560,180 490,190 Q430,150 450,90 Z
                 M480,210 Q580,200 620,300 Q580,420 500,400 Q470,300 480,210 Z
                 M600,100 Q780,80 880,160 Q840,260 740,240 Q620,200 600,100 Z
                 M750,320 Q840,310 860,390 Q800,440 740,400 Q720,350 750,320 Z"
              fill="rgba(106, 76, 255, 0.2)"
            />
            <circle cx="500" cy="250" r="230" fill="none" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 6" />
            <circle cx="500" cy="250" r="140" fill="none" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 6" />
          </svg>

          <div className="map-grid-overlay"></div>

          {/* Glowing Map Pins */}
          {MAP_PINS.map((pin) => {
            const isSelected = pin.id === activePinId;
            return (
              <div
                key={pin.id}
                className={`map-location-pin ${isSelected ? 'active' : ''}`}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                onClick={() => setActivePinId(pin.id)}
                title={`${pin.name}, ${pin.country}`}
                role="button"
                tabIndex={0}
              >
                <div className="pin-pulse-ring"></div>
                <div className="pin-core-marker">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="pin-label-tag">
                  {pin.flag} {pin.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Destination Preview Card */}
        <div className="map-preview-card">
          <div className="map-preview-img-box">
            <img 
              src={currentDestination.cardImage || currentDestination.heroImage} 
              alt={currentDestination.name} 
              className="map-preview-img"
            />
            <div className="card-top-badges">
              <div className="rating-pill">
                <i className="fa-solid fa-star"></i> {currentDestination.rating}
              </div>
              <span className="country-pill-flag" style={{ fontSize: '20px' }}>
                {currentDestination.flag}
              </span>
            </div>
          </div>

          <div className="map-preview-content">
            <div className="preview-dest-header">
              <h3 className="preview-name">{currentDestination.name.toUpperCase()} {currentDestination.flag}</h3>
            </div>

            <p className="preview-desc">{currentDestination.description}</p>

            <div className="preview-meta-grid">
              <div className="preview-meta-item">
                <span className="p-meta-lbl">Best Time:</span>
                <span className="p-meta-val">{currentDestination.weather.bestSeason}</span>
              </div>
              <div className="preview-meta-item">
                <span className="p-meta-lbl">Starting From:</span>
                <span className="p-meta-val" style={{ color: '#38bdf8' }}>
                  {currentDestination.budgetStarting}
                </span>
              </div>
            </div>

            <button 
              type="button"
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => navigate(`/destination/${currentDestination.id}`)}
            >
              <span>Explore Destination</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
