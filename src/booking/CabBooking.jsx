import React, { useState } from 'react';
import { CABS_DATA } from './bookingData';

const CAB_CITIES = [
  'Delhi NCR',
  'Bangalore',
  'Mumbai',
  'Jaipur',
  'Agra',
  'Chandigarh',
  'Hyderabad',
  'Goa',
  'Chennai',
  'Pune'
];

export default function CabBooking({ onSelectBookingItem }) {
  const [serviceType, setServiceType] = useState('one-way'); // 'one-way', 'round-trip', 'airport', 'hourly'
  const [fromCity, setFromCity] = useState('Delhi NCR');
  const [toCity, setToCity] = useState('Bangalore');
  const [departDate, setDepartDate] = useState('2026-09-04');
  const [returnDate, setReturnDate] = useState('2026-09-12');
  const [pickupTime, setPickupTime] = useState('06:00');
  const [dropTime, setDropTime] = useState('21:30');
  
  // Interactive Stops
  const [stops, setStops] = useState([]); // Array of strings e.g. ['Jaipur']
  
  // Search state
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(CABS_DATA);

  const handleAddStop = () => {
    if (stops.length < 3) {
      setStops([...stops, '']);
    }
  };

  const handleStopChange = (index, value) => {
    const nextStops = [...stops];
    nextStops[index] = value;
    setStops(nextStops);
  };

  const handleRemoveStop = (index) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setResults(CABS_DATA);
      setIsSearching(false);
    }, 350);
  };

  return (
    <div className="booking-engine-card">
      {/* Cab Service Type Switcher */}
      <div className="cab-sub-header">
        <div className="cab-types-pill-group">
          <button
            type="button"
            className={`trip-type-pill ${serviceType === 'one-way' ? 'active' : ''}`}
            onClick={() => setServiceType('one-way')}
          >
            <span className="material-symbols-rounded">arrow_forward</span>
            <span>Outstation One-Way</span>
          </button>
          <button
            type="button"
            className={`trip-type-pill ${serviceType === 'round-trip' ? 'active' : ''}`}
            onClick={() => setServiceType('round-trip')}
          >
            <span className="material-symbols-rounded">sync_alt</span>
            <span>Outstation Round-Trip</span>
          </button>
          <button
            type="button"
            className={`trip-type-pill ${serviceType === 'airport' ? 'active' : ''}`}
            onClick={() => setServiceType('airport')}
          >
            <span className="material-symbols-rounded">flight_takeoff</span>
            <span>Airport Transfers</span>
          </button>
          <button
            type="button"
            className={`trip-type-pill ${serviceType === 'hourly' ? 'active' : ''}`}
            onClick={() => setServiceType('hourly')}
          >
            <span className="material-symbols-rounded">schedule</span>
            <span>Hourly Rentals</span>
          </button>
        </div>
      </div>

      {/* Main Glass Booking Form */}
      <form onSubmit={handleSearch} className="cab-form-layout">
        <div className="flight-form-grid cab-grid-row">
          {/* FROM */}
          <div className="flight-field-block">
            <span className="field-subhead">FROM</span>
            <div className="field-city-row">
              <span className="field-city-name">{fromCity}</span>
              <span className="field-code-badge">PICKUP</span>
            </div>
            <select
              className="hidden-native-select"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
            >
              {CAB_CITIES.map(c => (
                <option key={`cab-from-${c}`} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* TO (Not shown if Hourly) */}
          {serviceType !== 'hourly' && (
            <div className="flight-field-block">
              <span className="field-subhead">TO</span>
              <div className="field-city-row">
                <span className="field-city-name">{toCity}</span>
                <span className="field-code-badge">DESTINATION</span>
              </div>
              <select
                className="hidden-native-select"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
              >
                {CAB_CITIES.map(c => (
                  <option key={`cab-to-${c}`} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}

          {/* DEPARTURE DATE & PICKUP TIME */}
          <div className="flight-field-block date-field-block">
            <span className="field-subhead">DEPARTURE & PICKUP</span>
            <div className="dates-display-row">
              <div className="date-box">
                <span className="date-label-tiny">DATE</span>
                <input
                  type="date"
                  className="glass-date-input"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                />
              </div>
              <div className="date-box">
                <span className="date-label-tiny">TIME</span>
                <input
                  type="time"
                  className="glass-date-input"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* RETURN DATE & DROP TIME (For Round-Trip) */}
          {serviceType === 'round-trip' && (
            <div className="flight-field-block date-field-block">
              <span className="field-subhead">RETURN & DROP</span>
              <div className="dates-display-row">
                <div className="date-box">
                  <span className="date-label-tiny">RETURN DATE</span>
                  <input
                    type="date"
                    className="glass-date-input"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </div>
                <div className="date-box">
                  <span className="date-label-tiny">DROP TIME</span>
                  <input
                    type="time"
                    className="glass-date-input"
                    value={dropTime}
                    onChange={(e) => setDropTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Dynamic Intermediate Stops Row */}
        <div className="cab-stops-control-row">
          {stops.map((stop, index) => (
            <div key={index} className="cab-stop-input-pill">
              <span className="material-symbols-rounded stop-pin">add_location_alt</span>
              <input
                type="text"
                placeholder={`Via Stop #${index + 1} (e.g. Jaipur)`}
                value={stop}
                onChange={(e) => handleStopChange(index, e.target.value)}
                className="glass-stop-input"
              />
              <button
                type="button"
                className="btn-remove-stop"
                onClick={() => handleRemoveStop(index)}
                title="Remove Stop"
              >
                <span className="material-symbols-rounded">close</span>
              </button>
            </div>
          ))}

          {stops.length < 3 && (
            <button
              type="button"
              className="btn-add-stop"
              onClick={handleAddStop}
            >
              <span className="material-symbols-rounded">add_circle</span>
              <span>+ Add Stops</span>
            </button>
          )}
        </div>

        {/* Dedicated Next-Line Action Row */}
        <div className="booking-action-next-row">
          <div className="form-perks-info">
            <span className="material-symbols-rounded">local_taxi</span>
            <span>100% Sanitized Fleet • Verified Highway Chauffeurs • Toll Calculator</span>
          </div>

          <div className="flight-submit-container">
            <button
              type="submit"
              className="btn-glowing-cyan search-main-action-btn"
              disabled={isSearching}
            >
              <span className="material-symbols-rounded">
                {isSearching ? 'sync' : 'local_taxi'}
              </span>
              <span>{isSearching ? 'Checking Cabs...' : 'SEARCH CABS'}</span>
            </button>
          </div>
        </div>
      </form>

      {/* CAB RESULTS LIST */}
      <div className="flight-results-container">
        <div className="results-header-bar">
          <div className="results-badge-info">
            <span className="material-symbols-rounded">local_taxi</span>
            <span>
              Available Chauffeur Cabs for <strong>{fromCity}</strong> → <strong>{toCity}</strong>
            </span>
          </div>
          <span className="results-date-tag">Pickup: {departDate} at {pickupTime}</span>
        </div>

        <div className="cab-cards-grid">
          {results.map((cab) => (
            <div key={cab.id} className="cab-item-card">
              <div className="cab-card-header">
                <div>
                  <h4 className="cab-category-name">{cab.category}</h4>
                  <span className="cab-model-subtitle">{cab.model}</span>
                </div>
                <div className="cab-rating-chip">
                  <span className="material-symbols-rounded">star</span>
                  <span>{cab.rating}</span>
                </div>
              </div>

              <div className="cab-specs-row">
                <div className="cab-spec-item">
                  <span className="material-symbols-rounded">group</span>
                  <span>{cab.capacity}</span>
                </div>
                <div className="cab-spec-item">
                  <span className="material-symbols-rounded">local_gas_station</span>
                  <span>{cab.fuel}</span>
                </div>
                <div className="cab-spec-item">
                  <span className="material-symbols-rounded">ac_unit</span>
                  <span>AC Guaranteed</span>
                </div>
              </div>

              <div className="cab-features-list">
                {cab.features.map((f, i) => (
                  <div key={i} className="cab-feature-line">
                    <span className="material-symbols-rounded">check_circle</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="cab-pricing-footer">
                <div className="cab-price-col">
                  <div className="cab-rate-km">{cab.ratePerKm} (Base Fare)</div>
                  <div className="price-tag-wrap">
                    <span className="currency-symbol">₹</span>
                    <span className="price-amount">{cab.basePrice.toLocaleString('en-IN')}</span>
                  </div>
                  <span className="price-sub">Tolls & Parking extra</span>
                </div>

                <button
                  type="button"
                  className="btn-glowing-cyan btn-cab-book"
                  onClick={() => onSelectBookingItem({
                    type: 'CAB',
                    title: `${cab.category} — ${cab.model}`,
                    from: fromCity,
                    to: toCity,
                    date: departDate,
                    time: `Pickup: ${pickupTime}`,
                    price: cab.basePrice,
                    seats: cab.capacity,
                    extra: `Rate: ${cab.ratePerKm} • ${cab.fuel}`,
                    bookingRef: `TRV-CB-${Math.floor(100000 + Math.random() * 900000)}`,
                  })}
                >
                  <span>Book Cab</span>
                  <span className="material-symbols-rounded">chevron_right</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
