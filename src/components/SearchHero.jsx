import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=1600&auto=format&fit=crop&q=85',
    tagline: 'Pangong Lake & The Himalayas',
    location: 'Ladakh, India 🇮🇳'
  },
  {
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&auto=format&fit=crop&q=85',
    tagline: 'Emerald Terraces & Ocean Cliffs',
    location: 'Bali, Indonesia 🇮🇩'
  },
  {
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1600&auto=format&fit=crop&q=85',
    tagline: 'Alpine Peaks & Glacial Lakes',
    location: 'Swiss Alps, Switzerland 🇨🇭'
  },
  {
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1600&auto=format&fit=crop&q=85',
    tagline: 'Golden Coastlines & Sunset Shacks',
    location: 'Goa, India 🇮🇳'
  },
  {
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&auto=format&fit=crop&q=85',
    tagline: 'Neon Skylines & Historic Shrines',
    location: 'Tokyo & Kyoto, Japan 🇯🇵'
  },
  {
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1600&auto=format&fit=crop&q=85',
    tagline: 'Cobalt Domes & Aegean Sunsets',
    location: 'Santorini, Greece 🇬🇷'
  }
];

const SLOGANS = [
  'Uncover extraordinary destinations across India and the globe, tailored for every traveler.',
  'From snow-capped Himalayan peaks to tranquil tropical lagoons, explore your way.',
  'Discover places worth travelling to, from iconic wonders to uncharted hidden gems.',
  'Curated travel itineraries, world-class stays, and authentic cultural wonders.'
];

export default function SearchHero({ 
  searchQuery, 
  setSearchQuery, 
  onOpenFilters, 
  activeFilterCount, 
  onSurpriseMe, 
  onChipClick, 
  searchInputRef 
}) {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sloganIndex, setSloganIndex] = useState(0);
  const quickChips = ['Ladakh', 'Goa', 'Paris', 'Kashmir', 'Bali', 'Switzerland', 'Tokyo', 'Dubai'];

  // Automatic Background Image Slider & Slogan Rotation (every 4.5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      setSloganIndex((prev) => (prev + 1) % SLOGANS.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="explore-hero">
      {/* Sliding Background Images with Smooth Crossfade */}
      <div className="hero-slider-bg-container">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`hero-slide-img-layer ${idx === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
        {/* Dark Vignette Overlay for Readability */}
        <div className="hero-dark-vignette-overlay" />
      </div>

      <div className="hero-glow-blob"></div>

      <div className="hero-header-content">
        <div className="hero-tag">
          <i className="fa-solid fa-compass"></i> {t('DISCOVER DESTINATIONS', 'DISCOVER DESTINATIONS')}
        </div>

        <h1 className="hero-main-title">{t('explore.heroTitle', 'EXPLORE THE WORLD')}</h1>

        {/* Dynamic Sliding Slogan */}
        <p className="hero-main-subtitle hero-sliding-slogan" key={sloganIndex}>
          {SLOGANS[sloganIndex]}
        </p>

        {/* Current Slide Location Badge */}
        <div className="hero-slide-location-pill">
          <i className="fa-solid fa-location-dot"></i>
          <span>{HERO_SLIDES[currentSlide].location}</span>
          <span style={{ opacity: 0.6 }}>•</span>
          <span style={{ fontStyle: 'italic', opacity: 0.9 }}>{HERO_SLIDES[currentSlide].tagline}</span>
        </div>
      </div>

      {/* Main Glass Search Bar with Action Buttons */}
      <div className="search-control-group">
        <div className="glass-search-input-box">
          <i className="fa-solid fa-magnifying-glass search-field-icon"></i>
          <input
            ref={searchInputRef}
            type="text"
            className="search-text-input"
            placeholder={t('explore.searchPlaceholder', 'Search destinations, countries, attractions...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search destinations"
          />
          {searchQuery && (
            <button 
              type="button"
              className="search-clear-btn" 
              onClick={() => setSearchQuery('')}
              title="Clear search"
              aria-label="Clear search"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>

        {/* Filters Button */}
        <button 
          type="button"
          className={`hero-action-btn btn-filter ${activeFilterCount > 0 ? 'has-active' : ''}`}
          onClick={onOpenFilters}
          title="Open Filter Modal"
        >
          <i className="fa-solid fa-sliders"></i>
          <span>{t('explore.filters', 'Filters')}</span>
          {activeFilterCount > 0 && (
            <span className="active-filter-badge">{activeFilterCount}</span>
          )}
        </button>

        {/* Surprise Me Button */}
        <button 
          type="button"
          className="hero-action-btn btn-surprise"
          onClick={onSurpriseMe}
          title="Pick a random dream destination"
        >
          <span>{t('explore.surpriseMe', '✨ Surprise Me')}</span>
        </button>
      </div>

      {/* Quick Search Chips */}
      <div className="quick-chips-container">
        <span className="chips-label">{t('dashboard.popularSearches', 'Popular Searches')}:</span>
        {quickChips.map((chip) => {
          const isActive = searchQuery.toLowerCase() === chip.toLowerCase();
          return (
            <button
              key={chip}
              type="button"
              className={`quick-chip ${isActive ? 'active' : ''}`}
              onClick={() => onChipClick(chip)}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {/* Slider Pagination Dots */}
      <div className="hero-slide-dots">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`hero-slide-dot ${i === currentSlide ? 'active' : ''}`}
            onClick={() => {
              setCurrentSlide(i);
              setSloganIndex(i % SLOGANS.length);
            }}
            aria-label={`Slide to image ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
