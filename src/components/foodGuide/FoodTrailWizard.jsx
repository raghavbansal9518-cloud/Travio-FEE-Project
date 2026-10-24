import React, { useState, useMemo, useEffect } from 'react';
import { getTrailTemplates, FOOD_DISHES, FOOD_DESTINATIONS, FALLBACK_FOOD_IMG } from '../../data/foodGuideData';

export default function FoodTrailWizard({
  isOpen,
  onClose,
  currentDestination,
  trailDishes = [],
  onRemoveFromTrail,
  onOpenInMap,
  onSaveTrail,
  initialMode = 'templates'
}) {
  const [step, setStep] = useState(1);
  const [activeTab, setActiveTab] = useState(initialMode === 'custom' ? 'custom' : 'templates');
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);
  const [customSearchQuery, setCustomSearchQuery] = useState('');
  const [customDietFilter, setCustomDietFilter] = useState('all'); // 'all', 'Veg', 'Non-Veg'

  const [customSelectedDishIds, setCustomSelectedDishIds] = useState(() =>
    trailDishes.map((d) => d.id)
  );

  // Curated templates for destination
  const availableTemplates = useMemo(() => {
    return getTrailTemplates(currentDestination?.id || 'goa');
  }, [currentDestination]);

  // Destination specific dishes for custom picker
  const destinationDishes = useMemo(() => {
    const target = (currentDestination?.id || 'goa').toLowerCase();
    return FOOD_DISHES.filter((d) => {
      const dId = d.destinationId.toLowerCase();
      return (
        dId === target ||
        dId.startsWith(target) ||
        target.startsWith(dId) ||
        d.destinationName.toLowerCase().includes(target)
      );
    });
  }, [currentDestination]);

  // Sync dishes and modes whenever modal opens or initialMode changes
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setValidationError('');
      setIsSavedSuccess(false);

      if (trailDishes && trailDishes.length > 0) {
        setCustomSelectedDishIds(trailDishes.map((d) => d.id));
        setActiveTab('custom');
      } else if (initialMode === 'custom') {
        setActiveTab('custom');
        // Pre-select 3 iconic dishes as starter recommendation if none picked
        if (destinationDishes.length > 0) {
          setCustomSelectedDishIds(destinationDishes.slice(0, 3).map((d) => d.id));
        }
      } else {
        setActiveTab('templates');
        if (availableTemplates.length > 0) {
          setSelectedTemplateId(availableTemplates[0].id);
          setStops(JSON.parse(JSON.stringify(availableTemplates[0].stops)));
        }
      }
    }
  }, [isOpen, initialMode, currentDestination]);

  // Step 2 Preferences
  const [preferences, setPreferences] = useState({
    diet: 'all', // 'all', 'Veg', 'Non-Veg'
    maxBudget: 2000,
    stopCount: 4,
    mealPeriod: 'Lunch & Dinner', // 'Morning', 'Lunch', 'Lunch & Dinner', 'Late Night'
    transport: 'driving' // 'walking', 'driving'
  });

  // Step 3 Itinerary Stops state
  const [stops, setStops] = useState([]);

  if (!isOpen) return null;

  // Handle selecting a pre-built template
  const handleSelectTemplate = (template) => {
    setSelectedTemplateId(template.id);
    setValidationError('');
    const dishIds = template.stops.map((s) => s.dishId).filter(Boolean);
    setCustomSelectedDishIds(dishIds);
    setStops(JSON.parse(JSON.stringify(template.stops)));
  };

  // Toggle dish in custom picker
  const handleToggleCustomDish = (dishId) => {
    setSelectedTemplateId(null);
    setValidationError('');
    setCustomSelectedDishIds((prev) =>
      prev.includes(dishId) ? prev.filter((id) => id !== dishId) : [...prev, dishId]
    );
  };

  // Proceed to Step 2 with strict validation
  const handleProceedToStep2 = () => {
    if (activeTab === 'custom') {
      if (!customSelectedDishIds || customSelectedDishIds.length === 0) {
        setValidationError('Please select at least 1 dish (recommended 2–6) to build your custom trail.');
        return;
      }
    } else {
      if (!selectedTemplateId && availableTemplates.length > 0) {
        handleSelectTemplate(availableTemplates[0]);
      }
    }
    setValidationError('');
    setStep(2);
  };

  // Build / update itinerary for Step 3
  const handleBuildTrailItinerary = () => {
    // If a template was selected and stops exist, apply preferences to refine
    if (activeTab === 'templates' && selectedTemplateId) {
      const template = availableTemplates.find((t) => t.id === selectedTemplateId);
      if (template && template.stops.length > 0) {
        let refinedStops = [...template.stops];
        if (preferences.diet === 'Veg') {
          refinedStops = refinedStops.filter((s) => {
            const dish = FOOD_DISHES.find((d) => d.id === s.dishId);
            return dish ? dish.diet === 'Veg' : true;
          });
        }
        if (refinedStops.length === 0) {
          refinedStops = [...template.stops];
        }
        // Slice according to desired stop count
        refinedStops = refinedStops.slice(0, preferences.stopCount).map((s, idx) => ({
          ...s,
          stopNumber: idx + 1
        }));
        setStops(refinedStops);
        setStep(3);
        return;
      }
    }

    // Otherwise build dynamically from selected dish IDs
    const chosenDishes = FOOD_DISHES.filter((d) =>
      customSelectedDishIds.includes(d.id)
    );

    // Fallback if none picked
    const dishesToUse = chosenDishes.length > 0 ? chosenDishes : destinationDishes.slice(0, preferences.stopCount);

    const generatedStops = dishesToUse.slice(0, preferences.stopCount).map((dish, index) => {
      const place = dish.recommendedPlaces && dish.recommendedPlaces[0]
        ? dish.recommendedPlaces[0]
        : {
            name: `${dish.destinationName} Heritage Kitchen`,
            neighborhood: dish.destinationName,
            address: `${dish.destinationName} Central Bazaar`,
            distanceKm: 2.1,
            lat: currentDestination?.coordinates?.lat || 15.2993,
            lng: currentDestination?.coordinates?.lng || 74.1240
          };

      const mealTimes = ['10:00 AM', '1:00 PM', '4:30 PM', '7:30 PM', '9:45 PM'];

      return {
        stopNumber: index + 1,
        dishName: dish.name,
        restaurantName: place.name,
        dishId: dish.id,
        dishImage: dish.image || FALLBACK_FOOD_IMG,
        neighborhood: place.neighborhood || place.address,
        address: place.address,
        mealType: dish.meal,
        suggestedTime: mealTimes[index % mealTimes.length],
        priceEstimate: `₹${dish.minPrice + 50}`,
        distanceToNext: index < dishesToUse.length - 1 ? `${(1.2 + index * 0.8).toFixed(1)} km (${10 + index * 5} min ${preferences.transport})` : 'End of Trail',
        lat: place.lat,
        lng: place.lng,
        notes: place.highlight || `Famous for authentic ${dish.name}`
      };
    });

    setStops(generatedStops);
    setStep(3);
  };

  // Reordering stops in Step 3
  const handleMoveStop = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= stops.length) return;
    const newStops = [...stops];
    const [moved] = newStops.splice(index, 1);
    newStops.splice(targetIndex, 0, moved);
    // Renumber stops
    const renumbered = newStops.map((stop, idx) => ({
      ...stop,
      stopNumber: idx + 1,
      distanceToNext: idx < newStops.length - 1 ? `${(1.2 + idx * 0.7).toFixed(1)} km` : 'End of Trail'
    }));
    setStops(renumbered);
  };

  // Delete stop in Step 3
  const handleDeleteStop = (index) => {
    if (stops.length <= 1) return;
    const filtered = stops.filter((_, idx) => idx !== index);
    const renumbered = filtered.map((stop, idx) => ({
      ...stop,
      stopNumber: idx + 1,
      distanceToNext: idx < filtered.length - 1 ? `${(1.2 + idx * 0.7).toFixed(1)} km` : 'End of Trail'
    }));
    setStops(renumbered);
  };

  // Computed summary
  const summaryBudget = useMemo(() => {
    return stops.reduce((acc, stop) => {
      const num = parseInt(String(stop.priceEstimate).replace(/\D/g, ''), 10) || 300;
      return acc + num;
    }, 0);
  }, [stops]);

  const summaryDistance = useMemo(() => {
    return (stops.length * 2.4).toFixed(1);
  }, [stops]);

  const summaryDuration = useMemo(() => {
    return `${Math.max(2, Math.round(stops.length * 1.25))}–${Math.max(3, Math.round(stops.length * 1.5))} hrs`;
  }, [stops]);

  return (
    <div className="fg-trail-overlay" onClick={onClose}>
      <div 
        className="fg-trail-modal" 
        onClick={(e) => e.stopPropagation()} 
        role="dialog" 
        aria-modal="true"
      >
        {/* Wizard Header */}
        <div className="fg-wizard-header">
          <div className="fg-wizard-title-block">
            <h2>
              <span className="trail-sparkle">✦</span>
              <span>Food Trail Planner</span>
            </h2>
            <p>
              Your personalised culinary journey in {currentDestination?.name || 'Goa'}. Pick dishes &amp; we’ll map the optimal route.
            </p>
          </div>

          {/* 3 Steps Progress Tracker */}
          <div className="fg-step-tracker">
            <div className="fg-step-dot-wrap">
              <span className={`fg-step-num ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>
                {step > 1 ? '✓' : '1'}
              </span>
              <span className={`fg-step-label ${step === 1 ? 'active' : ''}`}>Choose Dishes</span>
            </div>

            <span className={`fg-step-line ${step >= 2 ? 'active' : ''}`}></span>

            <div className="fg-step-dot-wrap">
              <span className={`fg-step-num ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
                {step > 2 ? '✓' : '2'}
              </span>
              <span className={`fg-step-label ${step === 2 ? 'active' : ''}`}>Preferences</span>
            </div>

            <span className={`fg-step-line ${step === 3 ? 'active' : ''}`}></span>

            <div className="fg-step-dot-wrap">
              <span className={`fg-step-num ${step === 3 ? 'active' : ''}`}>
                3
              </span>
              <span className={`fg-step-label ${step === 3 ? 'active' : ''}`}>Your Trail</span>
            </div>
          </div>

          <button
            type="button"
            className="fg-modal-close"
            style={{ position: 'static' }}
            onClick={onClose}
            title="Close Food Trail"
          >
            ✕
          </button>
        </div>

        {/* Wizard Body */}
        <div className="fg-wizard-body">
          {/* STEP 1: CHOOSE DISHES & TEMPLATES */}
          {step === 1 && (
            <div>
              {/* Mode Selection Switcher */}
              <div className="fg-wizard-mode-tabs" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'templates'}
                  className={`fg-mode-tab-btn ${activeTab === 'templates' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('templates');
                    setValidationError('');
                  }}
                >
                  <i className="fa-solid fa-layer-group"></i>
                  <span>Curated Templates ({availableTemplates.length})</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'custom'}
                  className={`fg-mode-tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('custom');
                    setSelectedTemplateId(null);
                    setValidationError('');
                    if (customSelectedDishIds.length === 0 && destinationDishes.length > 0) {
                      setCustomSelectedDishIds(destinationDishes.slice(0, 3).map((d) => d.id));
                    }
                  }}
                >
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                  <span>Custom Trail Builder ({customSelectedDishIds.length} Picked)</span>
                </button>
              </div>

              {/* Validation Error Message */}
              {validationError && (
                <div className="fg-wizard-error-banner" role="alert">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span>{validationError}</span>
                </div>
              )}

              {/* TAB 1: CURATED TEMPLATES */}
              {activeTab === 'templates' && (
                <div>
                  <p className="fg-step-intro-text">
                    Choose a signature chef-curated culinary route in {currentDestination?.name || 'Goa'}.
                  </p>

                  <div className="fg-template-cards-grid">
                    {availableTemplates.map((template) => {
                      const isSelected = selectedTemplateId === template.id;
                      return (
                        <div
                          key={template.id}
                          className={`fg-template-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleSelectTemplate(template)}
                        >
                          <div className="fg-tpl-img-box">
                            <img
                              src={template.heroImage || FALLBACK_FOOD_IMG}
                              alt={template.name}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = FALLBACK_FOOD_IMG;
                              }}
                            />
                            <span className="fg-tpl-tag">{template.tagline}</span>
                          </div>
                          <div className="fg-tpl-body">
                            <h4>{template.name}</h4>
                            <p>{template.tagline}</p>
                            <div className="fg-tpl-meta">
                              <span>📍 {template.totalStops} Stops</span>
                              <span>⏳ {template.estimatedHours}</span>
                              <span style={{ color: '#34D399', fontWeight: 700 }}>
                                ₹{template.totalBudget}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: CUSTOM DISH SELECTOR */}
              {activeTab === 'custom' && (
                <div className="fg-custom-picker-section">
                  <div className="fg-custom-picker-header">
                    <div>
                      <h4>Select Dishes for Your Custom Trail in {currentDestination?.name}</h4>
                      <small style={{ color: 'var(--fg-text-muted)' }}>
                        Click dishes to add or remove ({customSelectedDishIds.length} selected)
                      </small>
                    </div>

                    {/* Quick Filters inside custom picker */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <button
                        type="button"
                        className={`fg-filter-chip ${customDietFilter === 'all' ? 'active' : ''}`}
                        style={{ padding: '4px 10px', fontSize: '11px' }}
                        onClick={() => setCustomDietFilter('all')}
                      >
                        All ({destinationDishes.length})
                      </button>
                      <button
                        type="button"
                        className={`fg-filter-chip ${customDietFilter === 'Veg' ? 'active-diet-veg' : ''}`}
                        style={{ padding: '4px 10px', fontSize: '11px' }}
                        onClick={() => setCustomDietFilter('Veg')}
                      >
                        ● Veg
                      </button>
                      <button
                        type="button"
                        className={`fg-filter-chip ${customDietFilter === 'Non-Veg' ? 'active-diet-nonveg' : ''}`}
                        style={{ padding: '4px 10px', fontSize: '11px' }}
                        onClick={() => setCustomDietFilter('Non-Veg')}
                      >
                        ● Non-Veg
                      </button>
                    </div>
                  </div>

                  <div className="fg-dish-selector-grid">
                    {destinationDishes
                      .filter((d) => customDietFilter === 'all' || d.diet.toLowerCase() === customDietFilter.toLowerCase())
                      .map((dish) => {
                        const isPicked = customSelectedDishIds.includes(dish.id);
                        return (
                          <div
                            key={dish.id}
                            className={`fg-dish-select-item ${isPicked ? 'selected' : ''}`}
                            onClick={() => handleToggleCustomDish(dish.id)}
                          >
                            <img
                              src={dish.image || FALLBACK_FOOD_IMG}
                              alt={dish.name}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = FALLBACK_FOOD_IMG;
                              }}
                            />
                            <div className="fg-dish-select-meta">
                              <strong>{dish.name}</strong>
                              <small>
                                {dish.diet} • ₹{dish.minPrice} • {dish.establishment}
                              </small>
                            </div>
                            <div style={{ marginLeft: 'auto', color: isPicked ? '#C084FC' : 'var(--fg-text-muted)' }}>
                              <i className={`fa-${isPicked ? 'solid fa-circle-check' : 'regular fa-circle'}`}></i>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {/* Selected Tray */}
                  {customSelectedDishIds.length > 0 && (
                    <div className="fg-selected-tray">
                      <span style={{ fontSize: '12px', color: '#D8B4FE', fontWeight: 700, marginRight: '4px' }}>
                        Selected ({customSelectedDishIds.length}):
                      </span>
                      {customSelectedDishIds.map((id) => {
                        const dish = FOOD_DISHES.find((d) => d.id === id);
                        if (!dish) return null;
                        return (
                          <span key={id} className="fg-tray-pill">
                            <span>{dish.name}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleCustomDish(id);
                              }}
                              title={`Remove ${dish.name}`}
                            >
                              ×
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* STEP 2: SET PREFERENCES */}
          {step === 2 && (
            <div>
              <p className="fg-step-intro-text">
                Fine-tune your trail parameters for timing, budget, and travel style across {currentDestination?.name || 'Goa'}.
              </p>

              <div className="fg-pref-grid">
                {/* Dietary Filter */}
                <div className="fg-pref-field">
                  <label>Dietary Requirement</label>
                  <div className="fg-pref-btn-group">
                    {[
                      { id: 'all', label: 'Any Diet / All Flavors' },
                      { id: 'Veg', label: 'Vegetarian Only' },
                      { id: 'Non-Veg', label: 'Non-Veg & Seafood' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`fg-pref-choice-btn ${preferences.diet === item.id ? 'active' : ''}`}
                        onClick={() => setPreferences({ ...preferences, diet: item.id })}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Number of Stops */}
                <div className="fg-pref-field">
                  <label>Desired Number of Stops: {preferences.stopCount}</label>
                  <div className="fg-pref-btn-group">
                    {[2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        className={`fg-pref-choice-btn ${preferences.stopCount === num ? 'active' : ''}`}
                        onClick={() => setPreferences({ ...preferences, stopCount: num })}
                      >
                        {num} Stops
                      </button>
                    ))}
                  </div>
                </div>

                {/* Meal Period */}
                <div className="fg-pref-field">
                  <label>Starting Meal Window</label>
                  <div className="fg-pref-btn-group">
                    {[
                      { id: 'Morning', label: 'Morning / Breakfast' },
                      { id: 'Lunch', label: 'Lunch / Midday' },
                      { id: 'Lunch & Dinner', label: 'Full Day (Lunch + Dinner)' },
                      { id: 'Late Night', label: 'Sunset & Late Night' }
                    ].map((period) => (
                      <button
                        key={period.id}
                        type="button"
                        className={`fg-pref-choice-btn ${preferences.mealPeriod === period.id ? 'active' : ''}`}
                        onClick={() => setPreferences({ ...preferences, mealPeriod: period.id })}
                      >
                        {period.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transport Mode */}
                <div className="fg-pref-field">
                  <label>Transport Mode</label>
                  <div className="fg-pref-btn-group">
                    {[
                      { id: 'walking', label: '🚶 Walking / Old Town' },
                      { id: 'driving', label: '🚗 Cab / Scooter Drive' }
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        className={`fg-pref-choice-btn ${preferences.transport === mode.id ? 'active' : ''}`}
                        onClick={() => setPreferences({ ...preferences, transport: mode.id })}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Maximum Budget */}
                <div className="fg-pref-field" style={{ gridColumn: '1 / -1' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ margin: 0 }}>Budget Cap per Person</label>
                    <span style={{ color: '#34D399', fontWeight: 800 }}>
                      Up to ₹{preferences.maxBudget}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="400"
                    max="4000"
                    step="100"
                    value={preferences.maxBudget}
                    onChange={(e) => setPreferences({ ...preferences, maxBudget: Number(e.target.value) })}
                    className="fg-pref-range-slider"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--fg-text-muted)', marginTop: '4px' }}>
                    <span>₹400 (Street food)</span>
                    <span>₹2,000 (Casual &amp; Bistro)</span>
                    <span>₹4,000+ (Fine Dine)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: YOUR TRAIL (ITINERARY + SUMMARY) */}
          {step === 3 && (
            <div className="fg-trail-results-layout">
              {/* Left Column: Reorderable Ordered Stops */}
              <div>
                <div className="fg-itinerary-header">
                  <h3>
                    Ordered Itinerary ({stops.length} Stops)
                  </h3>
                  <small style={{ color: 'var(--fg-text-muted)' }}>
                    Use arrows to reorder stops
                  </small>
                </div>

                <div className="fg-itinerary-list">
                  {stops.map((stop, index) => (
                    <div key={index} className="fg-itinerary-stop-card">
                      <div className="fg-stop-badge">
                        {stop.stopNumber}
                      </div>

                      <div className="fg-stop-img-box">
                        <img
                          src={stop.dishImage || FALLBACK_FOOD_IMG}
                          alt={stop.dishName}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = FALLBACK_FOOD_IMG;
                          }}
                        />
                      </div>

                      <div className="fg-stop-info">
                        <h4>{stop.restaurantName}</h4>
                        <div className="fg-stop-dish">
                          ✨ Must Order: {stop.dishName}
                        </div>
                        <p className="fg-stop-address">
                          📍 {stop.neighborhood || stop.address} • Suggested: {stop.suggestedTime}
                        </p>
                        <div className="fg-stop-leg-meta">
                          <span style={{ color: '#34D399', fontWeight: 700 }}>
                            {stop.priceEstimate}
                          </span>
                          <span>•</span>
                          <span>{stop.distanceToNext}</span>
                        </div>
                      </div>

                      {/* Reorder & Delete controls */}
                      <div className="fg-stop-controls">
                        <button
                          type="button"
                          className="fg-stop-btn-order"
                          disabled={index === 0}
                          onClick={() => handleMoveStop(index, -1)}
                          title="Move earlier"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          className="fg-stop-btn-order"
                          disabled={index === stops.length - 1}
                          onClick={() => handleMoveStop(index, 1)}
                          title="Move later"
                        >
                          ▼
                        </button>
                        <button
                          type="button"
                          className="fg-stop-btn-delete"
                          onClick={() => handleDeleteStop(index)}
                          title="Remove stop"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Trail Summary Card */}
              <div className="fg-trail-summary-card">
                <div className="fg-summary-badge">
                  <span>✦</span>
                  <span>TRAVIO CURATED ROUTE</span>
                </div>

                <h3>{currentDestination?.name || 'Goa'} Food Trail</h3>

                <div className="fg-summary-stats-grid">
                  <div className="fg-summary-stat-box">
                    <span className="lbl">Total Stops</span>
                    <span className="val purple">{stops.length} Stops</span>
                  </div>

                  <div className="fg-summary-stat-box">
                    <span className="lbl">Est. Budget / Person</span>
                    <span className="val green">₹{summaryBudget}</span>
                  </div>

                  <div className="fg-summary-stat-box">
                    <span className="lbl">Approx Distance</span>
                    <span className="val">{summaryDistance} km</span>
                  </div>

                  <div className="fg-summary-stat-box">
                    <span className="lbl">Est. Duration</span>
                    <span className="val">{summaryDuration}</span>
                  </div>
                </div>

                {/* Primary Action: OPEN IN MAP */}
                <button
                  type="button"
                  className="btn-open-in-map"
                  onClick={() => onOpenInMap(stops, currentDestination)}
                  title="View this entire food trail plotted on Travio's interactive map"
                >
                  <i className="fa-solid fa-map-location-dot" style={{ fontSize: '18px' }}></i>
                  <span>Open in Map</span>
                </button>

                {/* Secondary Action: SAVE TRAIL */}
                <button
                  type="button"
                  className={`btn-save-trail-action ${isSavedSuccess ? 'saved' : ''}`}
                  onClick={() => {
                    const trailObj = {
                      id: `trail-${Date.now()}`,
                      destinationId: currentDestination?.id || 'goa',
                      destinationName: currentDestination?.name || 'Goa',
                      name: `${currentDestination?.name || 'Goa'} Food Trail (${stops.length} Stops)`,
                      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                      stops,
                      summaryBudget,
                      summaryDistance
                    };
                    onSaveTrail(trailObj);
                    setIsSavedSuccess(true);
                  }}
                  title="Save this itinerary to your profile"
                >
                  <i className={`fa-${isSavedSuccess ? 'solid fa-check' : 'solid fa-bookmark'}`}></i>
                  <span>{isSavedSuccess ? 'Saved to Food Journeys!' : 'Save Food Journey'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Controls */}
        <div className="fg-wizard-footer">
          {step > 1 ? (
            <button
              type="button"
              className="fg-btn-wizard-back"
              onClick={() => setStep((s) => s - 1)}
            >
              ← Back
            </button>
          ) : (
            <button
              type="button"
              className="fg-btn-wizard-back"
              onClick={onClose}
            >
              Cancel
            </button>
          )}

          {step === 1 && (
            <button
              type="button"
              className="fg-btn-wizard-next"
              onClick={handleProceedToStep2}
            >
              <span>Next: Set Preferences</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          )}

          {step === 2 && (
            <button
              type="button"
              className="fg-btn-wizard-next"
              onClick={handleBuildTrailItinerary}
            >
              <span>Generate My Trail</span>
              <i className="fa-solid fa-sparkles"></i>
            </button>
          )}

          {step === 3 && (
            <button
              type="button"
              className="fg-btn-wizard-next"
              onClick={() => onOpenInMap(stops, currentDestination)}
            >
              <span>Launch in Map →</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
