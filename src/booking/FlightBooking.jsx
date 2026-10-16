import React, { useState, useEffect } from 'react';
import { FLIGHTS_DATA } from './bookingData';
import { searchLiveFlights } from '../services/bookingService';
import { getTodayDate, getFutureDate, getCurrentTime12, isToday, getTimeStatusBadge } from '../utils/dateUtils';

const AIRPORTS_LIST = [
  { city: 'Delhi', code: 'DEL', name: 'Indira Gandhi International Airport' },
  { city: 'Mumbai', code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport' },
  { city: 'Bengaluru', code: 'BLR', name: 'Kempegowda International Airport' },
  { city: 'Goa', code: 'GOI', name: 'Dabolim / Manohar International Airport' },
  { city: 'Jaipur', code: 'JAI', name: 'Jaipur International Airport' },
  { city: 'Kolkata', code: 'CCU', name: 'Netaji Subhash Chandra Bose Intl' },
  { city: 'Chennai', code: 'MAA', name: 'Chennai International Airport' },
  { city: 'Hyderabad', code: 'HYD', name: 'Rajiv Gandhi International Airport' },
  { city: 'Dubai', code: 'DXB', name: 'Dubai International Airport' },
  { city: 'Singapore', code: 'SIN', name: 'Singapore Changi Airport' },
  { city: 'London', code: 'LHR', name: 'London Heathrow Airport' },
  { city: 'Paris', code: 'CDG', name: 'Paris Charles de Gaulle' },
  { city: 'Bangkok', code: 'BKK', name: 'Suvarnabhumi Airport' },
  { city: 'Tokyo', code: 'HND', name: 'Tokyo Haneda International Airport' },
  { city: 'Bali', code: 'DPS', name: 'Ngurah Rai International Airport' },
];

export default function FlightBooking({ onSelectBookingItem }) {
  const [tripType, setTripType] = useState('round'); // 'round', 'oneway', 'multi'
  const [cabinClass, setCabinClass] = useState('Economy');
  const [directOnly, setDirectOnly] = useState(true);

  // Form Fields
  const [fromAirport, setFromAirport] = useState(AIRPORTS_LIST[0]); // Delhi
  const [toAirport, setToAirport] = useState(AIRPORTS_LIST[1]); // Mumbai
  const [departDate, setDepartDate] = useState(getTodayDate());
  const [returnDate, setReturnDate] = useState(getFutureDate(6));

  // Travelers state
  const [showTravelersDropdown, setShowTravelersDropdown] = useState(false);
  const [travelers, setTravelers] = useState({ adults: 1, children: 0, infants: 0 });

  // Swap Animation State
  const [isSwapping, setIsSwapping] = useState(false);

  // Search Results State
  const [isSearched, setIsSearched] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(FLIGHTS_DATA);
  const [isLiveInventory, setIsLiveInventory] = useState(false);

  const totalTravelers = travelers.adults + travelers.children + travelers.infants;

  const handleSwapAirports = () => {
    setIsSwapping(true);
    setTimeout(() => {
      const temp = fromAirport;
      setFromAirport(toAirport);
      setToAirport(temp);
      setIsSwapping(false);
    }, 200);
  };

  const handleSearch = async (e) => {
    e?.preventDefault();
    setSearchLoading(true);
    try {
      const liveData = await searchLiveFlights({
        fromCity: fromAirport.city,
        fromCode: fromAirport.code,
        toCity: toAirport.city,
        toCode: toAirport.code,
        departDate,
        cabinClass,
        directOnly
      });
      if (liveData && liveData.length > 0) {
        setSearchResults(liveData);
        setIsLiveInventory(liveData.some(f => f.isLive));
      }
    } catch (err) {
      console.warn('Flight search error:', err);
    } finally {
      setIsSearched(true);
      setSearchLoading(false);
    }
  };

  // Perform search on mount or when route / class / date changes
  useEffect(() => {
    handleSearch();
  }, [fromAirport.code, toAirport.code, cabinClass, departDate, directOnly]);

  return (
    <div className="booking-engine-card">
      {/* Top Filter Bar: Trip Type, Class, Direct Only */}
      <div className="flight-sub-header">
        <div className="trip-type-pill-group">
          <button
            type="button"
            className={`trip-type-pill ${tripType === 'round' ? 'active' : ''}`}
            onClick={() => setTripType('round')}
          >
            <span className="material-symbols-rounded">sync_alt</span>
            <span>Round Trip</span>
          </button>
          <button
            type="button"
            className={`trip-type-pill ${tripType === 'oneway' ? 'active' : ''}`}
            onClick={() => setTripType('oneway')}
          >
            <span className="material-symbols-rounded">arrow_right_alt</span>
            <span>One Way</span>
          </button>
          <button
            type="button"
            className={`trip-type-pill ${tripType === 'multi' ? 'active' : ''}`}
            onClick={() => setTripType('multi')}
          >
            <span className="material-symbols-rounded">alt_route</span>
            <span>Multi City</span>
          </button>
        </div>

        <div className="flight-options-row">
          <div className="dropdown-field-wrapper">
            <span className="dropdown-label">Cabin Class</span>
            <select
              className="glass-select"
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value)}
            >
              <option value="Economy">Economy</option>
              <option value="Premium Economy">Premium Economy</option>
              <option value="Business">Business Class</option>
              <option value="First">First Class</option>
            </select>
          </div>

          <label className="glass-checkbox-label">
            <input
              type="checkbox"
              checked={directOnly}
              onChange={(e) => setDirectOnly(e.target.checked)}
            />
            <span className="custom-checkbox-indicator">
              <span className="material-symbols-rounded">check</span>
            </span>
            <span>Direct Flights Only</span>
          </label>
        </div>
      </div>

      {/* Main Glass Booking Form Grid */}
      <form onSubmit={handleSearch} className="booking-unified-form">
        <div className="flight-fields-grid">
          {/* FROM Field */}
          <div className="flight-field-block">
            <span className="field-subhead">FROM</span>
            <div className="field-city-row">
              <span className="field-city-name">{fromAirport.city}</span>
              <span className="field-code-badge">{fromAirport.code}</span>
            </div>
            <span className="field-airport-desc" title={fromAirport.name}>
              {fromAirport.name}
            </span>
            <select 
              className="hidden-native-select"
              value={fromAirport.code}
              onChange={(e) => {
                const selected = AIRPORTS_LIST.find(a => a.code === e.target.value);
                if (selected) setFromAirport(selected);
              }}
            >
              {AIRPORTS_LIST.map(a => (
                <option key={`from-${a.code}`} value={a.code}>{a.city} ({a.code}) - {a.name}</option>
              ))}
            </select>
          </div>

          {/* SWAP BUTTON */}
          <div className="swap-btn-container">
            <button
              type="button"
              className={`swap-btn ${isSwapping ? 'rotating' : ''}`}
              onClick={handleSwapAirports}
              title="Swap Origin and Destination"
              aria-label="Swap Origin and Destination"
            >
              <span className="material-symbols-rounded">swap_horiz</span>
            </button>
          </div>

          {/* TO Field */}
          <div className="flight-field-block">
            <span className="field-subhead">TO</span>
            <div className="field-city-row">
              <span className="field-city-name">{toAirport.city}</span>
              <span className="field-code-badge">{toAirport.code}</span>
            </div>
            <span className="field-airport-desc" title={toAirport.name}>
              {toAirport.name}
            </span>
            <select 
              className="hidden-native-select"
              value={toAirport.code}
              onChange={(e) => {
                const selected = AIRPORTS_LIST.find(a => a.code === e.target.value);
                if (selected) setToAirport(selected);
              }}
            >
              {AIRPORTS_LIST.map(a => (
                <option key={`to-${a.code}`} value={a.code}>{a.city} ({a.code}) - {a.name}</option>
              ))}
            </select>
          </div>

          {/* DATES Field */}
          <div className="flight-field-block date-field-block">
            <div className="field-header-split">
              <span className="field-subhead">TRAVEL DATES</span>
              <span className="mini-note">{tripType === 'round' ? 'Round Trip' : 'One Way'}</span>
            </div>
            <div className="dates-display-row">
              <div className="date-box">
                <span className="date-label-tiny">DEPART</span>
                <input 
                  type="date" 
                  className="glass-date-input" 
                  value={departDate} 
                  min={getTodayDate()}
                  onChange={(e) => setDepartDate(e.target.value)}
                />
              </div>
              {tripType === 'round' && (
                <div className="date-box">
                  <span className="date-label-tiny">RETURN</span>
                  <input 
                    type="date" 
                    className="glass-date-input" 
                    value={returnDate} 
                    min={departDate || getTodayDate()}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* TRAVELERS Field */}
          <div className="flight-field-block travelers-field-block">
            <span className="field-subhead">TRAVELERS</span>
            <button
              type="button"
              className="traveler-selector-btn"
              onClick={() => setShowTravelersDropdown(!showTravelersDropdown)}
            >
              <div className="traveler-val-wrap">
                <span className="traveler-count-big">{totalTravelers}</span>
                <span className="traveler-label-text">
                  {totalTravelers === 1 ? 'Traveler' : 'Travelers'}
                </span>
              </div>
              <span className="material-symbols-rounded">expand_more</span>
            </button>

            {showTravelersDropdown && (
              <div className="glass-travelers-popover">
                <div className="traveler-counter-row">
                  <div>
                    <div className="traveler-type-title">Adults</div>
                    <div className="traveler-type-hint">12+ years</div>
                  </div>
                  <div className="counter-controls">
                    <button
                      type="button"
                      className="counter-btn"
                      disabled={travelers.adults <= 1}
                      onClick={() => setTravelers(prev => ({ ...prev, adults: prev.adults - 1 }))}
                    >
                      -
                    </button>
                    <span className="counter-number">{travelers.adults}</span>
                    <button
                      type="button"
                      className="counter-btn"
                      onClick={() => setTravelers(prev => ({ ...prev, adults: prev.adults + 1 }))}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="traveler-counter-row">
                  <div>
                    <div className="traveler-type-title">Children</div>
                    <div className="traveler-type-hint">2-11 years</div>
                  </div>
                  <div className="counter-controls">
                    <button
                      type="button"
                      className="counter-btn"
                      disabled={travelers.children <= 0}
                      onClick={() => setTravelers(prev => ({ ...prev, children: prev.children - 1 }))}
                    >
                      -
                    </button>
                    <span className="counter-number">{travelers.children}</span>
                    <button
                      type="button"
                      className="counter-btn"
                      onClick={() => setTravelers(prev => ({ ...prev, children: prev.children + 1 }))}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="popover-done-btn"
                  onClick={() => setShowTravelersDropdown(false)}
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dedicated Next-Line Action Row */}
        <div className="booking-action-next-row">
          <div className="form-perks-info">
            <span className="material-symbols-rounded">verified</span>
            <span>Zero cancellation fee on select flights • Real-time lowest fare lock</span>
          </div>

          <div className="flight-submit-container">
            <button
              type="submit"
              className="btn-glowing-cyan search-main-action-btn"
              disabled={searchLoading}
            >
              <span className="material-symbols-rounded">
                {searchLoading ? 'sync' : 'search'}
              </span>
              <span>{searchLoading ? 'Searching Flights...' : 'SEARCH FLIGHTS'}</span>
            </button>
          </div>
        </div>
      </form>

      {/* SEARCH RESULTS VIEW */}
      {isSearched && (
        <div className="flight-results-container">
          {/* Live Current Time Departure Banner */}
          {isToday(departDate) && (
            <div className="live-current-time-banner">
              <div className="banner-left-info">
                <span className="material-symbols-rounded live-clock-icon">schedule</span>
                <span>
                  Showing flights available from present time (<strong>{getCurrentTime12()}</strong> onwards) • Live ATC & Gate Updates
                </span>
              </div>
              <span className="live-status-pill">
                <span className="live-pulse-dot"></span>
                <span>LIVE PRESENT SCHEDULE</span>
              </span>
            </div>
          )}

          <div className="results-header-bar">
            <div className="results-badge-info">
              <span className="material-symbols-rounded">flight_takeoff</span>
              <span>
                Available Flights from <strong>{fromAirport.city}</strong> to <strong>{toAirport.city}</strong> ({searchResults.length} Options)
              </span>
              {isLiveInventory && (
                <span className="live-pulse-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid #38bdf8', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', color: '#38bdf8', fontWeight: 600, marginLeft: '8px' }}>
                  ● LIVE INVENTORY
                </span>
              )}
            </div>
            <span className="results-date-tag">Date: {departDate}</span>
          </div>

          <div className="flight-cards-list">
            {searchResults.map((flight) => {
              const timeBadge = getTimeStatusBadge(flight.departureTime, departDate);

              return (
                <div key={flight.id} className="flight-item-card">
                  <div className="flight-airline-col">
                    <div className="airline-avatar">
                      <span className="material-symbols-rounded">flight</span>
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h4 className="airline-name">{flight.airline}</h4>
                        {isToday(departDate) && (
                          <span className={`flight-departure-badge ${timeBadge.isUrgent ? 'urgent' : ''}`}>
                            <span className="material-symbols-rounded" style={{ fontSize: '12px' }}>
                              {timeBadge.isUrgent ? 'timer' : 'bolt'}
                            </span>
                            <span>{timeBadge.label}</span>
                          </span>
                        )}
                      </div>
                      <span className="flight-code-label">{flight.airlineCode} • {flight.aircraft}</span>
                    </div>
                  </div>

                  <div className="flight-timing-col">
                    <div className="time-point">
                      <span className="time-val">{flight.departureTime}</span>
                      <span className="airport-code-sub">{flight.fromCode}</span>
                    </div>

                    <div className="flight-duration-diagram">
                      <span className="duration-label">{flight.duration}</span>
                      <div className="flight-line">
                        <span className="line-dot start" />
                        <span className="line-track" />
                        <span className="material-symbols-rounded flight-glyph">flight</span>
                        <span className="line-dot end" />
                      </div>
                      <span className="flight-stop-label">{flight.stops}</span>
                    </div>

                    <div className="time-point">
                      <span className="time-val">{flight.arrivalTime}</span>
                      <span className="airport-code-sub">{flight.toCode}</span>
                    </div>
                  </div>

                  <div className="flight-price-col">
                    <div className="price-tag-wrap">
                      <span className="currency-symbol">₹</span>
                      <span className="price-amount">{flight.price.toLocaleString('en-IN')}</span>
                      <span className="price-sub">per adult</span>
                    </div>
                    <button
                      type="button"
                      className="btn-select-action"
                      onClick={() => onSelectBookingItem({
                        type: 'FLIGHT',
                        title: `${flight.airline} (${flight.airlineCode})`,
                        carrier: flight.airline,
                        from: `${flight.fromCity} (${flight.fromCode})`,
                        to: `${flight.toCity} (${flight.toCode})`,
                        fromCity: flight.fromCity,
                        toCity: flight.toCity,
                        date: departDate,
                        time: `${flight.departureTime} - ${flight.arrivalTime}`,
                        duration: flight.duration,
                        price: flight.price * totalTravelers,
                        seats: `${totalTravelers} Traveler(s) • ${cabinClass}`,
                        extra: `${flight.aircraft} • ${flight.stops}`,
                        bookingRef: flight.airlineCode ? `TRV-${flight.airlineCode.replace(/[^a-zA-Z0-9]/g, '')}-${Math.floor(1000 + Math.random() * 9000)}` : `TRV-FL-${Math.floor(100000 + Math.random() * 900000)}`,
                        image: flight.logo || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=80',
                      })}
                    >
                      <span>Select Flight</span>
                      <span className="material-symbols-rounded">chevron_right</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
