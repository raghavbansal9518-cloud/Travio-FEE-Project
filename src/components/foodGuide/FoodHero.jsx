import React from 'react';
import { FOOD_DESTINATIONS, FEATURED_DESTINATION_IDS } from '../../data/foodGuideData';

export default function FoodHero({
  currentDestination,
  onSelectDestination,
  onOpenTrailWizard,
  onSwitchToTrailsView,
  dishCount = 0
}) {
  const activeDest = FOOD_DESTINATIONS.find(
    (d) => d.id === currentDestination.id
  ) || FOOD_DESTINATIONS[0];

  // Curate exactly 6 flagship iconic cities so the header looks pristine and never congested
  const MAIN_CITY_IDS = ['goa', 'mumbai', 'delhi', 'paris', 'japan', 'rome-city'];
  const featuredDestinations = MAIN_CITY_IDS.map((id) =>
    FOOD_DESTINATIONS.find((d) => d.id === id)
  ).filter(Boolean);

  const isCurrentInFeatured = MAIN_CITY_IDS.includes(activeDest.id);

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

        {/* Quick Destination Switcher (Clean 5-6 Main Cities + Beautified All-Places Dropdown) */}
        <div className="fg-dest-switcher">
          <span className="fg-dest-switcher-label">
            <i className="fa-solid fa-compass" style={{ color: '#A855F7', marginRight: '4px' }}></i>
            Popular:
          </span>

          {featuredDestinations.map((dest) => {
            const isSelected = dest.id === activeDest.id;
            return (
              <button
                key={dest.id}
                type="button"
                className={`fg-dest-pill ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectDestination(dest)}
                title={`Explore ${dest.name} Food`}
              >
                <span>{dest.flag}</span>
                <span>{dest.name}</span>
              </button>
            );
          })}

          {/* Current City Pill (if selected outside the main 6) */}
          {!isCurrentInFeatured && (
            <button
              type="button"
              className="fg-dest-pill active fg-dest-pill-custom"
              title={`Currently viewing ${activeDest.name}`}
            >
              <span>{activeDest.flag}</span>
              <span>{activeDest.name}</span>
              <span className="fg-pill-active-dot">●</span>
            </button>
          )}

          {/* Beautified All 175 Destinations Select Dropdown */}
          <div className="fg-dest-all-selector">
            <span className="fg-dest-select-icon">
              <i className="fa-solid fa-earth-americas"></i>
            </span>
            <select
              aria-label="Select any place from all 175 Explore destinations"
              value={activeDest.id}
              onChange={(e) => {
                const found = FOOD_DESTINATIONS.find((d) => d.id === e.target.value);
                if (found) onSelectDestination(found);
              }}
              className="fg-dest-select-dropdown"
            >
              <option value="" disabled>Choose from 175 Destinations...</option>
              {FOOD_DESTINATIONS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.flag} {d.name} — {d.country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Button Row */}
        <div style={{ marginTop: '22px', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            className="btn-launch-trail"
            style={{ padding: '12px 26px', fontSize: '14px' }}
            onClick={onSwitchToTrailsView || onOpenTrailWizard}
          >
            <i className="fa-solid fa-route"></i>
            <span>Explore {activeDest.name} Food Trails</span>
          </button>

          <button
            type="button"
            style={{
              padding: '12px 22px',
              fontSize: '14px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#F8F7FF',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onClick={onOpenTrailWizard}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
          >
            <i className="fa-solid fa-wand-magic-sparkles" style={{ color: '#C084FC' }}></i>
            <span>Custom Trail Planner</span>
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

        <div className="fg-float-card alt" onClick={onSwitchToTrailsView || onOpenTrailWizard} style={{ cursor: 'pointer' }}>
          <div className="fg-float-icon" style={{ background: 'linear-gradient(135deg, rgba(176,38,255,0.4) 0%, rgba(124,58,237,0.4) 100%)' }}>
            <i className="fa-solid fa-route"></i>
          </div>
          <div className="fg-float-info">
            <strong style={{ color: '#E9D5FF' }}>Food Trail Ready ✨</strong>
            <small style={{ color: '#A855F7' }}>Click to View Curated Routes</small>
          </div>
        </div>
      </div>
    </section>
  );
}
