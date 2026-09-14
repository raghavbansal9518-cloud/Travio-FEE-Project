import React, { useState } from 'react';

export default function FilterModal({ 
  isOpen, 
  onClose, 
  filters, 
  onApplyFilters, 
  onResetFilters,
  matchingCount 
}) {
  const [localFilters, setLocalFilters] = useState(filters);

  if (!isOpen) return null;

  const countries = ['India', 'Japan', 'France', 'Switzerland', 'UAE', 'Indonesia', 'Italy', 'Greece'];
  const weatherOptions = [
    { label: '☀️ Sunny', value: 'sunny' },
    { label: '❄️ Cold', value: 'cold' },
    { label: '🌧️ Rainy', value: 'rainy' },
    { label: '🌤️ Mild', value: 'mild' }
  ];
  const travelTypes = [
    { label: '🏖️ Beach', value: 'Beach' },
    { label: '🏔️ Mountain', value: 'Mountain' },
    { label: '🎢 Adventure', value: 'Adventure' },
    { label: '💕 Romantic', value: 'Romantic' },
    { label: '👨‍👩‍👧 Family', value: 'Family' },
    { label: '🏛️ Cultural', value: 'Cultural' }
  ];
  const durations = ['Weekend', '3–5 Days', '1 Week', '2+ Weeks'];

  const toggleArrayItem = (key, value) => {
    const current = localFilters[key] || [];
    const exists = current.includes(value);
    const updated = exists ? current.filter((item) => item !== value) : [...current, value];
    setLocalFilters({ ...localFilters, [key]: updated });
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const emptyFilters = {
      country: null,
      maxBudget: 100000,
      weather: [],
      travelTypes: [],
      duration: []
    };
    setLocalFilters(emptyFilters);
    onResetFilters();
  };

  return (
    <div className="filter-modal-backdrop" onClick={onClose}>
      <div className="filter-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="filter-modal-header">
          <div className="filter-modal-title">
            <i className="fa-solid fa-sliders" style={{ color: 'var(--primary-color)' }}></i>
            <span>Filter Destinations</span>
          </div>
          <button type="button" className="filter-modal-close" onClick={onClose} aria-label="Close modal">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="filter-modal-body">
          {/* COUNTRY */}
          <div className="filter-group-block">
            <div className="filter-group-title">
              <span>Country</span>
              {localFilters.country && (
                <span 
                  style={{ color: 'var(--primary-color)', cursor: 'pointer', fontSize: '11px', textTransform: 'none' }}
                  onClick={() => setLocalFilters({ ...localFilters, country: null })}
                >
                  Clear
                </span>
              )}
            </div>
            <div className="filter-chips-wrap">
              {countries.map((c) => {
                const isSelected = localFilters.country === c;
                return (
                  <button
                    key={c}
                    type="button"
                    className={`filter-select-chip ${isSelected ? 'active' : ''}`}
                    onClick={() => setLocalFilters({
                      ...localFilters,
                      country: isSelected ? null : c
                    })}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* BUDGET */}
          <div className="filter-group-block">
            <div className="filter-group-title">
              <span>Max Budget (₹10K – ₹1L+)</span>
            </div>
            <div className="budget-range-box">
              <div className="budget-slider-labels">
                <span>₹10,000</span>
                <span>Up to ₹{(localFilters.maxBudget || 100000).toLocaleString('en-IN')}{localFilters.maxBudget >= 100000 ? '+' : ''}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="100000"
                step="5000"
                value={localFilters.maxBudget || 100000}
                onChange={(e) => setLocalFilters({ ...localFilters, maxBudget: Number(e.target.value) })}
                className="custom-range-slider"
              />
            </div>
          </div>

          {/* WEATHER */}
          <div className="filter-group-block">
            <div className="filter-group-title">
              <span>Weather</span>
            </div>
            <div className="filter-chips-wrap">
              {weatherOptions.map((w) => {
                const isSelected = (localFilters.weather || []).includes(w.value);
                return (
                  <button
                    key={w.value}
                    type="button"
                    className={`filter-select-chip ${isSelected ? 'active' : ''}`}
                    onClick={() => toggleArrayItem('weather', w.value)}
                  >
                    {w.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* TRAVEL TYPE */}
          <div className="filter-group-block">
            <div className="filter-group-title">
              <span>Travel Type</span>
            </div>
            <div className="filter-chips-wrap">
              {travelTypes.map((t) => {
                const isSelected = (localFilters.travelTypes || []).includes(t.value);
                return (
                  <button
                    key={t.value}
                    type="button"
                    className={`filter-select-chip ${isSelected ? 'active' : ''}`}
                    onClick={() => toggleArrayItem('travelTypes', t.value)}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* DURATION */}
          <div className="filter-group-block">
            <div className="filter-group-title">
              <span>Duration</span>
            </div>
            <div className="filter-chips-wrap">
              {durations.map((d) => {
                const isSelected = (localFilters.duration || []).includes(d);
                return (
                  <button
                    key={d}
                    type="button"
                    className={`filter-select-chip ${isSelected ? 'active' : ''}`}
                    onClick={() => toggleArrayItem('duration', d)}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="filter-modal-footer">
          <button type="button" className="btn-glass" onClick={handleReset}>
            <i className="fa-solid fa-rotate-left"></i> Reset
          </button>
          
          <button type="button" className="btn-primary" onClick={handleApply}>
            <span>Apply Filters ({matchingCount} Matches)</span>
            <i className="fa-solid fa-check"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
