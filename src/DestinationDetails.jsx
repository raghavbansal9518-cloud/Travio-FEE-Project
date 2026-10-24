import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './components/Header';
import { DESTINATIONS } from './data/destinationsData';
import { getDestinationDetails } from './data/destinationDetailsHelper';
import { getDestinationById, findLocalDestination } from './services/destinationService';
import TripPlannerModal from './components/TripPlannerModal';
import { useTravel } from './context/TravelContext';
import { useLanguage } from './context/LanguageContext';
import './DestinationDetails.css';

const DEFAULT_FALLBACK_IMG = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=85';

export default function DestinationDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('places');
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const { isWishlisted, toggleWishlist } = useTravel();
  const { t } = useLanguage();

  // Synchronously initialize if local destination exists
  const [destination, setDestination] = useState(() => {
    const local = findLocalDestination(id);
    return local ? getDestinationDetails(local) : null;
  });
  const [isLoading, setIsLoading] = useState(() => {
    const local = findLocalDestination(id);
    return !local;
  });

  const handleImgFallback = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = DEFAULT_FALLBACK_IMG;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // If local match exists, use it immediately
    const local = findLocalDestination(id);
    if (local) {
      setDestination(getDestinationDetails(local));
      setIsLoading(false);
      return;
    }

    // Otherwise, fetch asynchronously via Google Places & Gemini service
    let isCancelled = false;
    setIsLoading(true);

    getDestinationById(id)
      .then((result) => {
        if (!isCancelled) {
          setDestination(result ? getDestinationDetails(result) : null);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching destination:', err);
        if (!isCancelled) {
          setDestination(null);
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [id]);

  const highlights = destination?.highlights || [
    {
      label: 'Visa',
      value: destination?.country === 'India' ? 'Domestic / No Visa' : 'e-Visa / Visa on Arrival'
    },
    {
      label: 'Language',
      value: `${destination?.country} local languages, English`
    },
    {
      label: 'Currency',
      value: destination?.country === 'India' ? 'Indian Rupee (INR)' : 'Local currency / Cards'
    },
    {
      label: 'Ideal For',
      value: `${destination?.travelType || 'All'} Travelers`
    }
  ];

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="dest-details-container" style={{ textAlign: 'center', padding: '120px 20px' }}>
          <i className="fa-solid fa-compass fa-spin" style={{ fontSize: '46px', color: '#a855f7', marginBottom: '20px' }}></i>
          <h2 style={{ color: '#ffffff', fontFamily: 'var(--font-heading, inherit)', fontSize: '24px' }}>
            Loading Destination Details...
          </h2>
          <p style={{ color: '#8E93A1', fontSize: '14px', marginTop: '8px' }}>
            Fetching verified attractions, authentic photography, and local insights
          </p>
        </div>
      </>
    );
  }

  if (!destination) {
    return (
      <>
        <Header />
        <div className="dest-details-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
          <i className="fa-solid fa-map-location-dot" style={{ fontSize: '46px', color: '#a855f7', marginBottom: '16px' }}></i>
          <h2 style={{ color: '#ffffff', fontFamily: 'var(--font-heading, inherit)', fontSize: '26px' }}>
            {t('explore.noDestinationsFound', 'Destination Not Found')}
          </h2>
          <p style={{ color: '#8E93A1', fontSize: '14px', maxWidth: '420px', margin: '12px auto 24px' }}>
            We couldn't find verified travel details for "{id}". Try searching for another city, country, or landmark.
          </p>
          <Link to="/explore" className="btn-primary" style={{ display: 'inline-flex' }}>
            {t('common.back', 'Back to Explore')}
          </Link>
        </div>
      </>
    );
  }

  const tabs = [
    { id: 'overview', label: t('details.overview', 'Overview'), icon: 'fa-circle-info' },
    { id: 'places', label: t('details.placesToVisit', 'Places to Visit'), icon: 'fa-landmark' },
    { id: 'activities', label: t('nav.activities', 'Activities & Sports'), icon: 'fa-person-hiking' },
    { id: 'stay', label: t('booking.stays', 'Where to Stay'), icon: 'fa-hotel' },
    { id: 'itinerary', label: t('details.itinerary', 'Itinerary'), icon: 'fa-calendar-days' }
  ];

  return (
    <>
      {/* Shared Header (Sun, Notifications, Profile) */}
      <Header />

      <div className="dest-details-container">
        {/* Breadcrumb Navigation */}
        <nav className="dest-breadcrumb" aria-label="Breadcrumb">
          <Link to="/"><i className="fa-solid fa-house"></i> {t('nav.home', 'Home')}</Link>
          <span>/</span>
          <Link to="/explore">{t('nav.explore', 'Explore')}</Link>
          <span>/</span>
          <span className="current">{destination.name}</span>
        </nav>

        {/* 1. CINEMATIC HERO BANNER */}
        <section className="dest-hero-banner">
          <img 
            src={destination.heroImage || destination.cardImage || DEFAULT_FALLBACK_IMG} 
            alt={`${destination.name}, ${destination.country}`}
            className="dest-hero-bg-img"
            onError={handleImgFallback}
          />
          <div className="dest-hero-overlay">
            <div className="dest-hero-content">
              <div className="dest-hero-titles">
                <div className="dest-country-badge">
                  <span>{destination.flag}</span>
                  <span>{destination.country}</span>
                </div>
                <h1 className="dest-main-name">
                  {destination.name.toUpperCase()} {destination.flag}
                </h1>
                <p className="dest-tagline-text">{destination.tagline}</p>
                {destination.photoAttribution && (
                  <div style={{ marginTop: '4px', fontSize: '11px', color: 'rgba(255,255,255,0.75)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <i className="fa-solid fa-camera"></i>
                    <span>Photo by {destination.photoAttribution.name}</span>
                  </div>
                )}

                {/* Quick Hero Stat Badges */}
                <div className="dest-hero-stats-row">
                  <div className="dest-stat-pill" style={{ color: '#fbbf24' }}>
                    <i className="fa-solid fa-star"></i>
                    <span>{destination.rating} ({destination.reviews || 1200}+ reviews)</span>
                  </div>

                  <div className="dest-stat-pill">
                    <i className={`fa-solid ${destination.weather.icon || 'fa-sun'}`}></i>
                    <span>{destination.weather.temp} • {destination.weather.condition}</span>
                  </div>

                  <div className="dest-stat-pill" style={{ color: '#38bdf8' }}>
                    <i className="fa-solid fa-wallet"></i>
                    <span>{t('details.from', 'From')} {destination.budgetStarting}</span>
                  </div>

                  <div className="dest-stat-pill">
                    <i className="fa-solid fa-calendar"></i>
                    <span>{t('details.bestSeason', 'Best')}: {destination.weather.bestSeason}</span>
                  </div>
                </div>
              </div>

              <div className="dest-hero-actions">
                <button 
                  type="button"
                  className={`bookmark-toggle-btn ${isWishlisted(destination.id) ? 'saved' : ''}`}
                  style={{ width: '48px', height: '48px', fontSize: '18px', background: isWishlisted(destination.id) ? '#f43f5e' : 'rgba(8,12,22,0.7)', border: '1px solid rgba(255,255,255,0.15)' }}
                  onClick={() => toggleWishlist(destination)}
                  title={isWishlisted(destination.id) ? t('details.savedInWishlist', 'Saved in Wishlist') : t('details.saveToWishlist', 'Save to Wishlist')}
                >
                  <i className={isWishlisted(destination.id) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
                </button>

                <button 
                  type="button"
                  className="btn-primary" 
                  style={{ padding: '14px 30px', fontSize: '15px' }}
                  onClick={() => setIsPlannerOpen(true)}
                >
                  <i className="fa-solid fa-paper-plane"></i>
                  <span>{t('details.planMyTrip', 'Plan My Trip')}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. TAB NAVIGATION BAR */}
        <div className="dest-tab-bar" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`dest-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              <i className={`fa-solid ${tab.icon}`}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* 3. TAB CONTENT PANES */}

        {/* TAB A: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="dest-tab-pane">
            <div className="overview-grid-layout">
              <div className="overview-main-col">
                {/* About Box */}
                <div className="about-card-box">
                  <div className="hero-tag" style={{ marginBottom: '8px' }}>
                    <i className="fa-solid fa-earth-americas"></i> DESTINATION PROFILE
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading, inherit)', fontSize: '26px', fontWeight: 800, color: 'white' }}>
                    About {destination.name}
                  </h2>
                  <p className="about-paragraph">
                    {destination.about || destination.description || destination.tagline}
                  </p>

                  {/* Highlights Specs Matrix */}
                  <div className="highlights-spec-matrix">
                    {highlights.map((h, i) => (
                      <div key={i} className="highlight-spec-item">
                        <span className="spec-lbl">{h.label}</span>
                        <span className="spec-val">{h.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Food & Culture Showcase */}
                {destination.foodCulture && (
                  <div className="about-card-box food-culture-section">
                    <div className="hero-tag" style={{ marginBottom: '8px' }}>
                      <i className="fa-solid fa-utensils"></i> TASTE & TRADITIONS
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading, inherit)', fontSize: '22px', fontWeight: 800, color: 'white' }}>
                      {destination.foodCulture.title}
                    </h3>
                    <div className="food-dishes-grid">
                      {destination.foodCulture.items.map((item, idx) => (
                        <div key={idx} className="dish-card">
                          <h4 className="dish-name">{item.name}</h4>
                          <p className="dish-desc">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Side Column: Weather & Budget Breakdown */}
              <div className="overview-side-col">
                {/* Weather Matrix Widget */}
                <div className="side-widget-card">
                  <h3 className="side-widget-title">
                    <i className="fa-solid fa-cloud-sun" style={{ color: '#a855f7' }}></i>
                    <span>Weather & Best Time</span>
                  </h3>
                  <div className="weather-matrix-list">
                    {(destination.weatherDetails || []).map((w, index) => (
                      <div key={index} className="weather-month-row">
                        <div>
                          <span className="month-name">{w.month}</span>
                          <div style={{ fontSize: '11px', color: '#8E93A1' }}>{w.desc}</div>
                        </div>
                        <span className="month-temp">{w.temp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Estimated Budget Widget */}
                <div className="side-widget-card">
                  <h3 className="side-widget-title">
                    <i className="fa-solid fa-wallet" style={{ color: '#38bdf8' }}></i>
                    <span>Estimated Budget</span>
                  </h3>
                  <div className="budget-items-list">
                    {(destination.budgetBreakdown || []).map((b, idx) => (
                      <div key={idx} className="budget-item-row">
                        <span className="budget-item-name">
                          <i className={`fa-solid ${b.icon || 'fa-tag'}`}></i>
                          <span>{b.category}</span>
                        </span>
                        <span className="budget-item-cost">{b.cost}</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    type="button"
                    className="btn-primary" 
                    style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}
                    onClick={() => setIsPlannerOpen(true)}
                  >
                    <span>Customize My Budget</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB B: TOP PLACES TO VISIT */}
        {activeTab === 'places' && (
          <div className="dest-tab-pane">
            <div className="section-header">
              <div className="hero-tag" style={{ marginBottom: '8px' }}>
                <i className="fa-solid fa-map-pin"></i> MUST-SEE ATTRACTIONS
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading, inherit)', fontSize: '28px', fontWeight: 800, color: 'white' }}>
                Top Places to Visit in {destination.name}
              </h2>
              <p style={{ color: '#8E93A1', fontSize: '14px' }}>
                Iconic landmarks, scenic vistas, and cultural shrines to include in your trip.
              </p>
            </div>

            <div className="places-grid-layout">
              {(destination.topPlaces || []).map((place, idx) => (
                <div key={idx} className="place-detail-card">
                  <div className="place-img-box">
                    <img 
                      src={place.image || DEFAULT_FALLBACK_IMG} 
                      alt={place.name} 
                      className="place-img" 
                      loading="lazy" 
                      onError={handleImgFallback}
                    />
                    <div className="card-top-badges">
                      <span className="rating-pill" style={{ color: 'white' }}>
                        <i className="fa-solid fa-clock"></i> {place.time}
                      </span>
                    </div>
                  </div>
                  <div className="place-content-box">
                    <h3 className="place-name">{place.name}</h3>
                    <p className="place-desc">{place.desc}</p>
                    <div className="place-meta-footer">
                      <span><i className="fa-solid fa-ticket"></i> Entry: {place.ticket}</span>
                      <span><i className="fa-solid fa-circle-check" style={{ color: '#a855f7' }}></i> Verified</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB C: ACTIVITIES & SPORTS */}
        {activeTab === 'activities' && (
          <div className="dest-tab-pane">
            <div className="section-header">
              <div className="hero-tag" style={{ marginBottom: '8px' }}>
                <i className="fa-solid fa-bolt" style={{ color: '#f59e0b' }}></i> ADVENTURE & SPORTS
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading, inherit)', fontSize: '28px', fontWeight: 800, color: 'white' }}>
                Things to Do in {destination.name}
              </h2>
              <p style={{ color: '#8E93A1', fontSize: '14px' }}>
                High-octane water sports, mountain trails, and immersive local adventures.
              </p>
            </div>

            <div className="activities-grid-layout">
              {(destination.activities || []).map((act) => (
                <div key={act.id} className="activity-detail-card">
                  <div className="act-img-box">
                    <img 
                      src={act.image || DEFAULT_FALLBACK_IMG} 
                      alt={act.title} 
                      className="act-img" 
                      loading="lazy" 
                      onError={handleImgFallback}
                    />
                    <div className="act-emoji-badge">{act.icon || '🏄'}</div>
                    <div className="act-price-pill">From {act.price}</div>
                  </div>
                  <div className="act-body">
                    <h3 className="act-title">{act.title}</h3>
                    <div className="act-loc">
                      <i className="fa-solid fa-location-dot"></i>
                      <span>{act.location}</span>
                    </div>
                    <p className="act-desc">{act.desc}</p>
                    <div className="act-tags-row">
                      <span className="act-tag-item"><i className="fa-solid fa-stopwatch"></i> {act.duration}</span>
                      <span className="act-tag-item"><i className="fa-solid fa-gauge-high"></i> {act.difficulty}</span>
                    </div>
                    <button 
                      type="button"
                      className="btn-glass" 
                      style={{ width: '100%', marginTop: '12px', justifyContent: 'center' }}
                      onClick={() => setIsPlannerOpen(true)}
                    >
                      <span>Book Experience</span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB D: WHERE TO STAY */}
        {activeTab === 'stay' && (
          <div className="dest-tab-pane">
            <div className="section-header">
              <div className="hero-tag" style={{ marginBottom: '8px' }}>
                <i className="fa-solid fa-bed"></i> LUXURY STAYS & BOUTIQUE VILLAS
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading, inherit)', fontSize: '28px', fontWeight: 800, color: 'white' }}>
                Where to Stay in {destination.name}
              </h2>
              <p style={{ color: '#8E93A1', fontSize: '14px' }}>
                Curated luxury resorts, cliffside suites, and eco-lodges with world-class hospitality.
              </p>
            </div>

            <div className="stays-grid-layout">
              {(destination.stays || []).map((stay, idx) => (
                <div key={idx} className="stay-card">
                  <div className="stay-img-box">
                    <img 
                      src={stay.image || DEFAULT_FALLBACK_IMG} 
                      alt={stay.name} 
                      className="stay-img" 
                      loading="lazy" 
                      onError={handleImgFallback}
                    />
                    <div className="card-top-badges">
                      <div className="rating-pill">
                        <i className="fa-solid fa-star"></i> {stay.rating}
                      </div>
                    </div>
                  </div>
                  <div className="stay-body">
                    <div className="stay-title-row">
                      <h3 className="stay-name">{stay.name}</h3>
                    </div>
                    <span className="stay-type">{stay.type}</span>
                    <div className="stay-amenities-wrap">
                      {stay.amenities.map((amenity, i) => (
                        <span key={i} className="amenity-chip">{amenity}</span>
                      ))}
                    </div>
                    <div className="stay-rate-row">
                      <span className="stay-price">{stay.price}</span>
                      <button type="button" className="btn-primary" onClick={() => setIsPlannerOpen(true)}>
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB E: ITINERARY */}
        {activeTab === 'itinerary' && (
          <div className="dest-tab-pane">
            <div className="section-header" style={{ textAlign: 'center' }}>
              <div className="hero-tag" style={{ marginBottom: '8px' }}>
                <i className="fa-solid fa-route"></i> CURATED TRIP BLUEPRINT
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading, inherit)', fontSize: '28px', fontWeight: 800, color: 'white' }}>
                Suggested Itinerary for {destination.name}
              </h2>
              <p style={{ color: '#8E93A1', fontSize: '14px' }}>
                A perfectly balanced 4-day exploration of highlights, meals, and adventures.
              </p>
            </div>

            <div className="itinerary-timeline-wrap">
              {(destination.itinerary || []).map((itin, index) => (
                <div key={index} className="itinerary-day-card">
                  <div className="itinerary-day-circle">{index + 1}</div>
                  <h3 className="itin-day-title">{itin.day}: {itin.title}</h3>
                  <ul className="itin-activities-list">
                    {itin.activities.map((act, aIdx) => (
                      <li key={aIdx}>
                        <i className="fa-solid fa-check"></i>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button 
                type="button"
                className="btn-primary" 
                style={{ padding: '14px 36px', fontSize: '15px' }}
                onClick={() => setIsPlannerOpen(true)}
              >
                <span>Adopt This Itinerary with Travio AI</span>
                <i className="fa-solid fa-wand-magic-sparkles"></i>
              </button>
            </div>
          </div>
        )}

        {/* INTERACTIVE PLANNER MODAL */}
        <TripPlannerModal
          destination={destination}
          isOpen={isPlannerOpen}
          onClose={() => setIsPlannerOpen(false)}
        />
      </div>
    </>
  );
}
