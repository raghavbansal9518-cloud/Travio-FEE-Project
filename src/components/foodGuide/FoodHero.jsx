import React from 'react';
import { FOOD_DESTINATIONS, FEATURED_DESTINATION_IDS } from '../../data/foodGuideData';

export default function FoodHero({
  currentDestination,
  onSelectDestination,
  onOpenTrailWizard,
  dishCount = 0
}) {
  const activeDest = FOOD_DESTINATIONS.find(
    (d) => d.id === currentDestination.id
  ) || FOOD_DESTINATIONS[0];

  const featuredDestinations = FOOD_DESTINATIONS.filter((d) =>
    FEATURED_DESTINATION_IDS.includes(d.id)
  );

  return (
    <section className="fg-hero" aria-label="Food Guide Hero Banner">
      <div 
        className="fg-hero-backdrop" 
        style={{ backgroundImage: `url(${activeDest.heroImage})` }}
      />
      <div className="fg-hero-overlay" />

      <div className="fg-hero-content">
        <div className="fg-badge-pill">
          <span className="fg-badge-dot"></span>
          <span>TRAVIO CULINARY EXPEDITION</span>
        </div>

        <h1>
          Taste the <span className="highlight">World</span>, One Place at a Time.
        </h1>

        <p className="fg-hero-tagline">
          {activeDest.flag} {activeDest.name}: {activeDest.tagline}
        </p>

        <p className="fg-hero-desc">
          {activeDest.quote || 'Discover iconic dishes, local flavours and the best places to try them — wherever you go!'}
        </p>

        {/* Quick Destination Switcher */}
        <div className="fg-dest-switcher">
          <span className="fg-dest-switcher-label">
            <i className="fa-solid fa-location-dot" style={{ color: '#A855F7', marginRight: '4px' }}></i>
            Featured:
          </span>
          {featuredDestinations.map((dest) => {
            const isSelected = dest.id === activeDest.id;
            return (
              <button
                key={dest.id}
                type="button"
                className={`fg-dest-pill ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectDestination(dest)}
              >
                <span>{dest.flag}</span>
                <span>{dest.name}</span>
              </button>
            );
          })}

          {/* All 175 Destinations Select Dropdown */}
          <div className="fg-dest-all-selector">
            <i className="fa-solid fa-earth-americas" style={{ color: '#A855F7', fontSize: '13px' }}></i>
            <select
              aria-label="Select any place from Explore"
              value={activeDest.id}
              onChange={(e) => {
                const found = FOOD_DESTINATIONS.find((d) => d.id === e.target.value);
                if (found) onSelectDestination(found);
              }}
              className="fg-dest-select-dropdown"
            >
              <option value="" disabled>-- All Explore Places ({FOOD_DESTINATIONS.length}) --</option>
              {FOOD_DESTINATIONS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.flag} {d.name} ({d.country})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Button Row */}
        <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-launch-trail"
            style={{ padding: '12px 24px', fontSize: '14px' }}
            onClick={onOpenTrailWizard}
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            <span>Start {activeDest.name} Food Trail</span>
          </button>
        </div>
      </div>

      {/* Floating Decorative Cards */}
      <div className="fg-hero-floating-decor">
        <div className="fg-float-card">
          <div className="fg-float-icon">
            <i className="fa-solid fa-utensils"></i>
          </div>
          <div className="fg-float-info">
            <strong>{dishCount} Iconic Dishes</strong>
            <small>Handpicked in {activeDest.name}</small>
          </div>
        </div>

        <div className="fg-float-card alt" onClick={onOpenTrailWizard} style={{ cursor: 'pointer' }}>
          <div className="fg-float-icon" style={{ background: 'linear-gradient(135deg, rgba(176,38,255,0.4) 0%, rgba(124,58,237,0.4) 100%)' }}>
            <i className="fa-solid fa-route"></i>
          </div>
          <div className="fg-float-info">
            <strong style={{ color: '#E9D5FF' }}>Food Trail Ready ✨</strong>
            <small style={{ color: '#A855F7' }}>Click to Plan Custom Route</small>
          </div>
        </div>
      </div>
    </section>
  );
}
