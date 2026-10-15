import React, { useState, useMemo } from 'react';
import { ACTIVITIES_DATA } from './bookingData';

const POPULAR_EXPERIENCE_DESTINATIONS = [
  'Singapore',
  'Dubai',
  'Paris',
  'Bangkok',
  'London',
  'Tokyo',
  'Phuket',
  'Kuala Lumpur',
  'Goa',
];

const ACTIVITY_CATEGORIES = [
  'All',
  'Sightseeing',
  'Theme Parks',
  'Adventure',
  'Cultural Tours',
  'Water Sports',
];

export default function ExperienceSection({ onSelectBookingItem }) {
  const [searchDestination, setSearchDestination] = useState('');
  const [activityDate, setActivityDate] = useState('');
  const [selectedDestinationFilter, setSelectedDestinationFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSearching, setIsSearching] = useState(false);

  // Filter activities dynamically
  const filteredActivities = useMemo(() => {
    return ACTIVITIES_DATA.filter((act) => {
      // 1. Text Search Match
      if (searchDestination.trim()) {
        const query = searchDestination.toLowerCase().trim();
        const matchesDest = act.destination.toLowerCase().includes(query);
        const matchesName = act.name.toLowerCase().includes(query);
        if (!matchesDest && !matchesName) return false;
      }

      // 2. Destination Filter Match
      if (selectedDestinationFilter && act.destination.toLowerCase() !== selectedDestinationFilter.toLowerCase()) {
        return false;
      }

      // 3. Category Match
      if (selectedCategory !== 'All' && act.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [searchDestination, selectedDestinationFilter, selectedCategory]);

  const handleDestinationPill = (dest) => {
    if (selectedDestinationFilter === dest) {
      setSelectedDestinationFilter('');
    } else {
      setSelectedDestinationFilter(dest);
      setSearchDestination(dest);
    }
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 300);
  };

  return (
    <div className="experience-section-container">
      {/* Search Destination & Activity Glass Card */}
      <div className="booking-engine-card experience-engine-card">
        <div className="stay-sub-header">
          <div className="stay-title-tag">
            <span className="material-symbols-rounded">attractions</span>
            <span>Tours, Attractions & Unforgettable Experiences</span>
          </div>
          <span className="stay-verified-badge">
            <span className="material-symbols-rounded">bolt</span>
            <span>Instant Confirmation Tickets</span>
          </span>
        </div>

        <form onSubmit={handleSearchSubmit} className="booking-unified-form">
          <div className="experience-fields-grid">
            {/* SEARCH DESTINATION */}
            <div className="flight-field-block experience-dest-block">
              <span className="field-subhead">SEARCH DESTINATION</span>
              <div className="field-city-row">
                <span className="material-symbols-rounded" style={{ color: '#a855f7', fontSize: '22px' }}>explore</span>
                <input
                  type="text"
                  className="glass-text-input"
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  placeholder="Where do you want to explore? (e.g. Singapore, Dubai)"
                />
              </div>
              <span className="field-airport-desc">Tours, Theme Parks, Museums, Water Sports</span>
            </div>

            {/* DATE OF ACTIVITY (OPTIONAL) */}
            <div className="flight-field-block date-field-block experience-date-block">
              <div className="field-header-split">
                <span className="field-subhead">DATE OF ACTIVITY</span>
                <span className="mini-note">Optional</span>
              </div>
              <div className="date-box single-date-box">
                <span className="date-label-tiny">EXPERIENCE DATE</span>
                <input
                  type="date"
                  className="glass-date-input"
                  value={activityDate}
                  onChange={(e) => setActivityDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Dedicated Next-Line Action Row */}
          <div className="booking-action-next-row">
            <div className="form-perks-info">
              <span className="material-symbols-rounded">bolt</span>
              <span>Instant QR Mobile Pass • Priority Skip-the-Line Admission Included</span>
            </div>

            <div className="flight-submit-container">
              <button
                type="submit"
                className="btn-glowing-cyan search-main-action-btn"
                disabled={isSearching}
              >
                <span className="material-symbols-rounded">
                  {isSearching ? 'sync' : 'search'}
                </span>
                <span>{isSearching ? 'Finding Tours...' : 'SEARCH ACTIVITIES'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* POPULAR DESTINATIONS PILLS */}
      <div className="popular-destinations-bar">
        <div className="destinations-bar-label">
          <span className="material-symbols-rounded">travel_explore</span>
          <span>Popular Destinations:</span>
        </div>
        <div className="destinations-pill-scroll">
          {POPULAR_EXPERIENCE_DESTINATIONS.map((dest) => (
            <button
              key={dest}
              type="button"
              className={`dest-filter-pill ${selectedDestinationFilter === dest ? 'active' : ''}`}
              onClick={() => handleDestinationPill(dest)}
            >
              <span className="material-symbols-rounded pill-dot-icon">location_on</span>
              <span>{dest}</span>
            </button>
          ))}
          {selectedDestinationFilter && (
            <button
              type="button"
              className="dest-filter-pill clear-pill"
              onClick={() => {
                setSelectedDestinationFilter('');
                setSearchDestination('');
              }}
            >
              <span className="material-symbols-rounded">close</span>
              <span>Clear Filter</span>
            </button>
          )}
        </div>
      </div>

      {/* CATEGORY FILTER TABS */}
      <div className="activity-categories-row">
        {ACTIVITY_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`activity-cat-chip ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* TRENDING ACTIVITIES GRID */}
      <div className="experience-cards-section">
        <div className="section-title-row">
          <div>
            <h3 className="section-heading">
              Trending Activities & Attractions {selectedDestinationFilter ? `in ${selectedDestinationFilter}` : ''}
            </h3>
            <p className="section-subtext">
              Showing {filteredActivities.length} top-rated experiences with skip-the-line QR vouchers
            </p>
          </div>
          <div className="hotel-guarantee-pill">
            <span className="material-symbols-rounded">qr_code_scanner</span>
            <span>Direct Mobile Gate Entry</span>
          </div>
        </div>

        <div className="activity-cards-grid">
          {filteredActivities.map((act) => (
            <div key={act.id} className="activity-card-item">
              {/* Image & Badge */}
              <div className="activity-image-box">
                <img
                  src={act.image}
                  alt={act.name}
                  className="activity-card-img"
                  loading="lazy"
                />
                <div className="activity-image-overlay" />
                <span className="activity-badge-pill">{act.badge}</span>
                <span className="activity-duration-pill">
                  <span className="material-symbols-rounded">schedule</span>
                  <span>{act.duration}</span>
                </span>
              </div>

              {/* Body */}
              <div className="activity-card-body">
                <div className="activity-location-tag">
                  <span className="material-symbols-rounded">location_on</span>
                  <span>{act.destination} • {act.category}</span>
                </div>

                <h4 className="activity-title" title={act.name}>
                  {act.name}
                </h4>

                <div className="activity-rating-row">
                  <span className="material-symbols-rounded star-icon">star</span>
                  <span className="rating-bold">{act.rating}</span>
                  <span className="reviews-sub">({act.reviewsCount.toLocaleString()} reviews)</span>
                </div>

                {/* Highlights */}
                <div className="activity-highlights-list">
                  {act.highlights.slice(0, 2).map((h, idx) => (
                    <div key={idx} className="activity-hl-item">
                      <span className="material-symbols-rounded">check</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Footer with Price and Explore Button */}
                <div className="activity-card-footer">
                  <div className="activity-price-box">
                    <span className="price-strike">₹{act.originalPrice.toLocaleString('en-IN')}</span>
                    <div className="price-active-row">
                      <span className="curr">₹</span>
                      <span className="amt">{act.price.toLocaleString('en-IN')}</span>
                      <span className="unit">/ person</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-explore-activity"
                    onClick={() => onSelectBookingItem({
                      type: 'EXPERIENCE',
                      title: act.name,
                      from: `Destination: ${act.destination}`,
                      to: act.category,
                      date: activityDate || 'Open Flexible Date (Valid 90 Days)',
                      time: `Duration: ${act.duration}`,
                      price: act.price,
                      seats: '1 Guest Pass',
                      extra: `${act.badge} • Instant Mobile Voucher`,
                      bookingRef: `TRV-EXP-${Math.floor(100000 + Math.random() * 900000)}`,
                    })}
                  >
                    <span>Explore</span>
                    <span className="material-symbols-rounded">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
