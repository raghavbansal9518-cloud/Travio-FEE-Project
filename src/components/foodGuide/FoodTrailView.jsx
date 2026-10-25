import { useState, useMemo } from 'react';
import { getTrailTemplates, FOOD_DESTINATIONS, FOOD_DISHES, FALLBACK_FOOD_IMG } from '../../data/foodGuideData';

export default function FoodTrailView({
  currentDestination,
  onOpenTrailWizard,
  onOpenCustomPlanner,
  onOpenInMap,
  onSaveTrail,
  savedTrails = [],
  onOpenSavedTrails
}) {
  // Available templates for the current destination
  const destinationTemplates = useMemo(() => {
    return getTrailTemplates(currentDestination?.id || 'goa');
  }, [currentDestination]);

  // Selected Trail State (default to first available template)
  const [selectedTrailId, setSelectedTrailId] = useState(() => {
    return destinationTemplates[0]?.id || null;
  });

  // Keep selectedTrail in sync if destination changes
  const activeTrail = useMemo(() => {
    const found = destinationTemplates.find((t) => t.id === selectedTrailId);
    return found || destinationTemplates[0] || null;
  }, [destinationTemplates, selectedTrailId]);

  // Active selected stop inside the active trail
  const [activeStopIndex, setActiveStopIndex] = useState(0);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all', 'Street Food', 'Heritage', 'Cafes', 'Fine Dining', 'Local Favorites'
  const [budgetFilter, setBudgetFilter] = useState('all'); // 'all', 'budget', 'moderate', 'premium'
  const [mealTypeFilter, setMealTypeFilter] = useState('all'); // 'all', 'Morning', 'Lunch', 'Evening', 'Night'

  // Categories definitions
  const categories = [
    { id: 'all', label: 'All Trails', icon: 'fa-route' },
    { id: 'Street Food', label: 'Street Food', icon: 'fa-bowl-food' },
    { id: 'Heritage', label: 'Heritage & Culture', icon: 'fa-landmark' },
    { id: 'Cafes', label: 'Cafes & Bakeries', icon: 'fa-mug-hot' },
    { id: 'Fine Dining', label: 'Fine Dining', icon: 'fa-wine-glass' },
    { id: 'Local Favorites', label: 'Local Favorites', icon: 'fa-heart' }
  ];

  // Filtered Templates
  const filteredTemplates = useMemo(() => {
    let list = [...destinationTemplates];

    if (categoryFilter !== 'all') {
      list = list.filter((t) => {
        const text = `${t.name} ${t.tagline} ${(t.highlights || []).join(' ')}`.toLowerCase();
        return text.includes(categoryFilter.toLowerCase());
      });
    }

    if (budgetFilter === 'budget') {
      list = list.filter((t) => t.totalBudget <= 600);
    } else if (budgetFilter === 'moderate') {
      list = list.filter((t) => t.totalBudget > 600 && t.totalBudget <= 1400);
    } else if (budgetFilter === 'premium') {
      list = list.filter((t) => t.totalBudget > 1400);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((t) => {
        const inName = t.name.toLowerCase().includes(q);
        const inTagline = t.tagline.toLowerCase().includes(q);
        const inStops = t.stops.some(
          (s) =>
            s.restaurantName.toLowerCase().includes(q) ||
            s.dishName.toLowerCase().includes(q) ||
            (s.address && s.address.toLowerCase().includes(q))
        );
        return inName || inTagline || inStops;
      });
    }

    return list;
  }, [destinationTemplates, categoryFilter, budgetFilter, searchQuery]);

  const isAnyFilterActive = Boolean(searchQuery.trim()) || categoryFilter !== 'all' || budgetFilter !== 'all' || mealTypeFilter !== 'all';

  const handleResetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setBudgetFilter('all');
    setMealTypeFilter('all');
  };

  const isTrailSaved = (trailId) => {
    return savedTrails.some((t) => t.id === trailId);
  };

  return (
    <div className="fg-trail-view-container" aria-label="Food Trail Experience">
      {/* A. FOOD TRAIL HERO BANNER */}
      <section className="fg-trail-hero">
        <div 
          className="fg-trail-hero-bg" 
          style={{ backgroundImage: `url(${activeTrail?.heroImage || currentDestination?.heroImage || FALLBACK_FOOD_IMG})` }}
        />
        <div className="fg-trail-hero-overlay" />

        <div className="fg-trail-hero-inner">
          <div className="fg-trail-hero-badge">
            <span className="material-symbols-rounded" style={{ fontSize: '16px', color: '#C084FC' }}>route</span>
            <span>CURATED GASTRONOMIC EXPEDITIONS</span>
          </div>

          <h2>
            Culinary <span className="highlight">Food Trails</span> in {currentDestination?.name || 'Your Destination'}
          </h2>

          <p className="fg-trail-hero-desc">
            Follow chef-designed walking paths through the most legendary kitchens, secret street stalls, and historic bakeries. Or customize your own bespoke route.
          </p>

          <div className="fg-trail-hero-actions">
            <button
              type="button"
              className="btn-create-trail-primary"
              onClick={onOpenCustomPlanner || onOpenTrailWizard}
              title="Launch interactive Custom Trail Planner"
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <span>Create Your Own Trail</span>
            </button>

            {savedTrails.length > 0 && (
              <button
                type="button"
                className="btn-view-saved-trails-alt"
                onClick={onOpenSavedTrails}
              >
                <i className="fa-solid fa-bookmark"></i>
                <span>Saved Journeys ({savedTrails.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Hero Quick Stats Pill */}
        <div className="fg-trail-hero-stats-floating">
          <div className="fg-hero-stat-item">
            <strong>{destinationTemplates.length}</strong>
            <small>Curated Trails</small>
          </div>
          <div className="fg-hero-stat-sep" />
          <div className="fg-hero-stat-item">
            <strong>100%</strong>
            <small>Mapped Stops</small>
          </div>
          <div className="fg-hero-stat-sep" />
          <div className="fg-hero-stat-item">
            <strong>Leaflet</strong>
            <small>Live Map Ready</small>
          </div>
        </div>
      </section>

      {/* B. SEARCH AND CATEGORY FILTERS */}
      <section className="fg-trail-filter-bar" aria-label="Trail Filters">
        <div className="fg-trail-search-box">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search trails by dish, restaurant, neighborhood, or theme..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="fg-trail-search-clear"
              onClick={() => setSearchQuery('')}
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="fg-trail-category-pills">
          {categories.map((cat) => {
            const isSelected = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`fg-trail-cat-btn ${isSelected ? 'active' : ''}`}
                onClick={() => setCategoryFilter(cat.id)}
              >
                <i className={`fa-solid ${cat.icon}`}></i>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Budget & Meal Dropdowns */}
        <div className="fg-trail-secondary-filters">
          <select
            className="fg-trail-select-mini"
            value={budgetFilter}
            onChange={(e) => setBudgetFilter(e.target.value)}
            aria-label="Filter by estimated budget"
          >
            <option value="all">Any Budget</option>
            <option value="budget">Budget (≤ ₹600)</option>
            <option value="moderate">Moderate (₹600 - ₹1,400)</option>
            <option value="premium">Fine Dining (&gt; ₹1,400)</option>
          </select>

          <select
            className="fg-trail-select-mini"
            value={mealTypeFilter}
            onChange={(e) => setMealTypeFilter(e.target.value)}
            aria-label="Filter by meal period"
          >
            <option value="all">Any Pacing / Time</option>
            <option value="Morning">Morning &amp; Breakfast</option>
            <option value="Lunch">Lunch Feasts</option>
            <option value="Evening">Evening Snacks &amp; Sunset</option>
            <option value="Night">Dinner &amp; Late Night</option>
          </select>

          {isAnyFilterActive && (
            <button
              type="button"
              className="btn-trail-reset-filters"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          )}
        </div>
      </section>

      {/* C. POPULAR FOOD TRAILS GRID */}
      <section className="fg-popular-trails-section">
        <div className="fg-section-header">
          <div className="fg-section-title-wrap">
            <p className="eyebrow">POPULAR CURATED ROUTES</p>
            <h3>Signature Food Trails in {currentDestination?.name} {currentDestination?.flag}</h3>
            <p className="subtitle">
              Select a trail to inspect each stop, review travel legs, or plot live on the interactive map.
            </p>
          </div>
          <div className="fg-results-count">
            Showing <strong>{filteredTemplates.length}</strong> {filteredTemplates.length === 1 ? 'trail' : 'trails'}
          </div>
        </div>

        {filteredTemplates.length > 0 ? (
          <div className="fg-trails-cards-grid">
            {filteredTemplates.map((trail) => {
              const isSelected = activeTrail?.id === trail.id;
              const isSaved = isTrailSaved(trail.id);

              return (
                <div
                  key={trail.id}
                  className={`fg-trail-card ${isSelected ? 'active-trail-card' : ''}`}
                  onClick={() => {
                    setSelectedTrailId(trail.id);
                    setActiveStopIndex(0);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedTrailId(trail.id);
                    }
                  }}
                >
                  <div className="fg-trail-card-image-wrap">
                    <img
                      src={trail.heroImage || FALLBACK_FOOD_IMG}
                      alt={trail.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_FOOD_IMG;
                      }}
                    />
                    <div className="fg-trail-card-tag-pill">
                      <span>✦ {trail.totalStops} Stops</span>
                    </div>

                    <button
                      type="button"
                      className={`fg-trail-card-save-btn ${isSaved ? 'saved' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSaveTrail(trail);
                      }}
                      title={isSaved ? 'Trail Saved' : 'Save this trail'}
                    >
                      <i className={`fa-${isSaved ? 'solid' : 'regular'} fa-bookmark`}></i>
                    </button>
                  </div>

                  <div className="fg-trail-card-content">
                    <h4>{trail.name}</h4>
                    <p className="fg-trail-tagline">{trail.tagline}</p>

                    <div className="fg-trail-card-meta-chips">
                      <span className="fg-trail-meta-pill">
                        <i className="fa-solid fa-clock"></i> {trail.estimatedHours}
                      </span>
                      <span className="fg-trail-meta-pill">
                        <i className="fa-solid fa-person-walking"></i> {trail.approxDistance}
                      </span>
                      <span className="fg-trail-meta-pill budget">
                        <i className="fa-solid fa-indian-rupee-sign"></i> ₹{trail.totalBudget} / person
                      </span>
                    </div>

                    {trail.highlights && trail.highlights.length > 0 && (
                      <div className="fg-trail-highlights">
                        {trail.highlights.map((h, i) => (
                          <span key={i} className="fg-trail-hl-badge">
                            ✓ {h}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="fg-trail-card-actions">
                      <button
                        type="button"
                        className="btn-trail-inspect"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTrailId(trail.id);
                          setActiveStopIndex(0);
                        }}
                      >
                        <span>{isSelected ? 'Viewing Stops Below' : 'View Trail Stops'}</span>
                        <i className="fa-solid fa-arrow-down"></i>
                      </button>

                      <button
                        type="button"
                        className="btn-trail-card-map"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenInMap(trail.stops, currentDestination);
                        }}
                        title="Plot all stops directly on Travio Map"
                      >
                        <i className="fa-solid fa-map-location-dot"></i>
                        <span>Open in Map</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="fg-empty-state">
            <i className="fa-solid fa-route fg-empty-icon"></i>
            <h3>No curated trails match your filters</h3>
            <p>Try resetting filters or build a brand-new custom route for {currentDestination?.name}.</p>
            <button
              type="button"
              className="btn-launch-trail"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* D. SELECTED TRAIL DETAILS (NUMBERED SEQUENCE) */}
      {activeTrail && (
        <section className="fg-selected-trail-details" id="selected-trail-details">
          <div className="fg-detail-header-card">
            <div className="fg-detail-title-block">
              <div className="fg-detail-badge">
                <span className="trail-sparkle">✦</span>
                <span>SELECTED ITINERARY</span>
              </div>
              <h3>{activeTrail.name}</h3>
              <p>{activeTrail.tagline}</p>
            </div>

            <div className="fg-detail-header-actions">
              <button
                type="button"
                className="btn-launch-map-primary"
                onClick={() => onOpenInMap(activeTrail.stops, currentDestination)}
                title="Plot this entire trail on Travio's interactive map"
              >
                <i className="fa-solid fa-map-location-dot"></i>
                <span>Open in Map</span>
              </button>

              <button
                type="button"
                className="btn-customize-trail-action"
                onClick={() => (onOpenCustomPlanner ? onOpenCustomPlanner() : onOpenTrailWizard())}
                title="Customize stops, add more dishes or change order"
              >
                <i className="fa-solid fa-sliders"></i>
                <span>Customize in Planner</span>
              </button>

              <button
                type="button"
                className={`btn-save-itinerary-action ${isTrailSaved(activeTrail.id) ? 'saved' : ''}`}
                onClick={() => onSaveTrail(activeTrail)}
                title="Save to your Food Journeys"
              >
                <i className={`fa-${isTrailSaved(activeTrail.id) ? 'solid' : 'regular'} fa-bookmark`}></i>
                <span>{isTrailSaved(activeTrail.id) ? 'Saved' : 'Save Trail'}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="fg-trail-quick-metrics">
            <div className="metric-box">
              <span className="lbl">Total Stops</span>
              <span className="val purple">{activeTrail.stops.length} Venues</span>
            </div>
            <div className="metric-box">
              <span className="lbl">Estimated Budget</span>
              <span className="val green">₹{activeTrail.totalBudget} / person</span>
            </div>
            <div className="metric-box">
              <span className="lbl">Total Distance</span>
              <span className="val">{activeTrail.approxDistance}</span>
            </div>
            <div className="metric-box">
              <span className="lbl">Suggested Duration</span>
              <span className="val">{activeTrail.estimatedHours}</span>
            </div>
          </div>

          {/* Numbered Sequence Stops List */}
          <div className="fg-stops-timeline">
            {activeTrail.stops.map((stop, index) => {
              const isSelectedStop = activeStopIndex === index;

              return (
                <div
                  key={index}
                  className={`fg-timeline-stop-card ${isSelectedStop ? 'active-stop' : ''}`}
                  onClick={() => setActiveStopIndex(index)}
                >
                  {/* Stop Number Circle */}
                  <div className="fg-stop-num-col">
                    <div className="fg-stop-num-circle">
                      {stop.stopNumber || index + 1}
                    </div>
                    {index < activeTrail.stops.length - 1 && (
                      <div className="fg-timeline-connector-line" />
                    )}
                  </div>

                  {/* Stop Content Body */}
                  <div className="fg-stop-card-main">
                    <div className="fg-stop-photo-box">
                      <img
                        src={stop.dishImage || FALLBACK_FOOD_IMG}
                        alt={stop.dishName}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = FALLBACK_FOOD_IMG;
                        }}
                      />
                    </div>

                    <div className="fg-stop-details-col">
                      <div className="fg-stop-primary-row">
                        <h4>{stop.restaurantName}</h4>
                        <span className="fg-stop-meal-tag">{stop.mealType || 'Specialty'}</span>
                      </div>

                      <div className="fg-stop-must-try">
                        <span className="sparkle-icon">✨</span>
                        <strong>Must Try:</strong>
                        <span className="dish-highlight-name">{stop.dishName}</span>
                      </div>

                      <p className="fg-stop-address-line">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>{stop.address || stop.neighborhood}</span>
                      </p>

                      <div className="fg-stop-meta-line">
                        <span className="fg-stop-time-badge">
                          <i className="fa-regular fa-clock"></i> Suggested: {stop.suggestedTime}
                        </span>
                        <span className="fg-stop-price-badge">
                          <i className="fa-solid fa-tag"></i> {stop.priceEstimate}
                        </span>
                        {stop.notes && (
                          <span className="fg-stop-notes-badge">
                            💡 {stop.notes}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Single Stop Action */}
                    <div className="fg-stop-actions-col">
                      <button
                        type="button"
                        className="btn-stop-see-map"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenInMap([stop], currentDestination);
                        }}
                        title={`View ${stop.restaurantName} on map`}
                      >
                        <i className="fa-solid fa-location-crosshairs"></i>
                        <span>See on Map</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* E. CREATE YOUR OWN TRAIL BANNER */}
      <section className="fg-create-trail-banner">
        <div className="fg-create-banner-content">
          <div className="fg-create-badge">
            <span>✨</span>
            <span>BUILD BESPOKE EXPERIENCES</span>
          </div>
          <h3>Want to Design Your Own Food Trail?</h3>
          <p>
            Pick any combination of iconic dishes, choose your transportation mode, set your dining pace, and let Travio generate the optimal multi-stop walking route.
          </p>
          <button
            type="button"
            className="btn-create-trail-primary"
            onClick={onOpenCustomPlanner || onOpenTrailWizard}
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            <span>Launch Food Trail Planner</span>
          </button>
        </div>
      </section>
    </div>
  );
}
