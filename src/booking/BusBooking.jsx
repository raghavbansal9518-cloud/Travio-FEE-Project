import React, { useState } from 'react';
import { BUSES_DATA } from './bookingData';

const BUS_CITIES = [
  { city: 'Delhi', state: 'Delhi', terminal: 'Kashmere Gate / ISBT Anand Vihar' },
  { city: 'Kanpur', state: 'Uttar Pradesh', terminal: 'Fazalganj / Rama Devi' },
  { city: 'Jaipur', state: 'Rajasthan', terminal: 'Sindhi Camp / 200 Ft Bypass' },
  { city: 'Lucknow', state: 'Uttar Pradesh', terminal: 'Alambagh / Nahariya Chauraha' },
  { city: 'Manali', state: 'Himachal Pradesh', terminal: 'Private Bus Parking Mall Road' },
  { city: 'Dehradun', state: 'Uttarakhand', terminal: 'ISBT Dehradun' },
  { city: 'Agra', state: 'Uttar Pradesh', terminal: 'ISBT Agra' },
];

export default function BusBooking({ onSelectBookingItem }) {
  const [fromCity, setFromCity] = useState(BUS_CITIES[0]); // Delhi
  const [toCity, setToCity] = useState(BUS_CITIES[1]); // Kanpur
  const [travelDate, setTravelDate] = useState('2026-09-04');
  const [travelersCount, setTravelersCount] = useState(1);
  const [busTypeFilter, setBusTypeFilter] = useState('All');
  const [isSwapping, setIsSwapping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(BUSES_DATA);

  const handleSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      const temp = fromCity;
      setFromCity(toCity);
      setToCity(temp);
      setIsSwapping(false);
    }, 200);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      let filtered = BUSES_DATA;
      if (busTypeFilter !== 'All') {
        filtered = BUSES_DATA.filter(b => b.busType.toLowerCase().includes(busTypeFilter.toLowerCase()));
      }
      setResults(filtered.length ? filtered : BUSES_DATA);
      setIsSearching(false);
    }, 350);
  };

  return (
    <div className="booking-engine-card">
      <div className="bus-sub-header">
        <div className="bus-types-pill-group">
          {['All', 'Sleeper', 'Volvo', 'Electric'].map((type) => (
            <button
              key={type}
              type="button"
              className={`trip-type-pill ${busTypeFilter === type ? 'active' : ''}`}
              onClick={() => setBusTypeFilter(type)}
            >
              <span>{type === 'All' ? 'All Bus Types' : `${type} Buses`}</span>
            </button>
          ))}
        </div>
        <div className="bus-service-guarantee">
          <span className="material-symbols-rounded">verified_user</span>
          <span>TRAVIO Assured On-Time Guarantee</span>
        </div>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSearch} className="booking-unified-form">
        <div className="bus-fields-grid">
          {/* FROM Field */}
          <div className="flight-field-block">
            <span className="field-subhead">FROM</span>
            <div className="field-city-row">
              <span className="field-city-name">{fromCity.city}</span>
              <span className="field-code-badge">{fromCity.state}</span>
            </div>
            <span className="field-airport-desc" title={fromCity.terminal}>
              {fromCity.terminal}
            </span>
            <select 
              className="hidden-native-select"
              value={fromCity.city}
              onChange={(e) => {
                const c = BUS_CITIES.find(x => x.city === e.target.value);
                if (c) setFromCity(c);
              }}
            >
              {BUS_CITIES.map(c => (
                <option key={`bus-from-${c.city}`} value={c.city}>{c.city}, {c.state}</option>
              ))}
            </select>
          </div>

          {/* SWAP BUTTON */}
          <div className="swap-btn-container">
            <button
              type="button"
              className={`swap-btn ${isSwapping ? 'rotating' : ''}`}
              onClick={handleSwap}
              title="Swap Cities"
              aria-label="Swap Cities"
            >
              <span className="material-symbols-rounded">swap_horiz</span>
            </button>
          </div>

          {/* TO Field */}
          <div className="flight-field-block">
            <span className="field-subhead">TO</span>
            <div className="field-city-row">
              <span className="field-city-name">{toCity.city}</span>
              <span className="field-code-badge">{toCity.state}</span>
            </div>
            <span className="field-airport-desc" title={toCity.terminal}>
              {toCity.terminal}
            </span>
            <select 
              className="hidden-native-select"
              value={toCity.city}
              onChange={(e) => {
                const c = BUS_CITIES.find(x => x.city === e.target.value);
                if (c) setToCity(c);
              }}
            >
              {BUS_CITIES.map(c => (
                <option key={`bus-to-${c.city}`} value={c.city}>{c.city}, {c.state}</option>
              ))}
            </select>
          </div>

          {/* TRAVEL DATE */}
          <div className="flight-field-block date-field-block">
            <span className="field-subhead">TRAVEL DATE</span>
            <div className="date-box single-date-box">
              <span className="date-label-tiny">JOURNEY DATE</span>
              <input
                type="date"
                className="glass-date-input"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
              />
            </div>
          </div>

          {/* TRAVELERS */}
          <div className="flight-field-block travelers-field-block">
            <span className="field-subhead">TRAVELERS</span>
            <div className="bus-traveler-counter-wrap">
              <button
                type="button"
                className="counter-btn"
                disabled={travelersCount <= 1}
                onClick={() => setTravelersCount(prev => prev - 1)}
              >
                -
              </button>
              <span className="traveler-count-big" style={{ fontSize: '20px' }}>
                {travelersCount} {travelersCount === 1 ? 'Seat' : 'Seats'}
              </span>
              <button
                type="button"
                className="counter-btn"
                onClick={() => setTravelersCount(prev => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Dedicated Next-Line Action Row */}
        <div className="booking-action-next-row">
          <div className="form-perks-info">
            <span className="material-symbols-rounded">verified_user</span>
            <span>Live GPS Bus Tracking • Air Conditioned Comfort Guarantee</span>
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
              <span>{isSearching ? 'Finding Buses...' : 'SEARCH BUSES'}</span>
            </button>
          </div>
        </div>
      </form>

      {/* BUS SEARCH RESULTS */}
      <div className="flight-results-container">
        <div className="results-header-bar">
          <div className="results-badge-info">
            <span className="material-symbols-rounded">directions_bus</span>
            <span>
              Buses from <strong>{fromCity.city}</strong> to <strong>{toCity.city}</strong> ({results.length} Available)
            </span>
          </div>
          <span className="results-date-tag">Date: {travelDate}</span>
        </div>

        <div className="bus-cards-list">
          {results.map((bus) => (
            <div key={bus.id} className="bus-item-card">
              <div className="bus-operator-col">
                <div className="bus-icon-avatar">
                  <span className="material-symbols-rounded">directions_bus</span>
                </div>
                <div>
                  <h4 className="bus-operator-name">{bus.operator}</h4>
                  <span className="bus-type-subtitle">{bus.busType}</span>
                  <div className="bus-amenities-tags">
                    {bus.amenities.slice(0, 3).map((a, i) => (
                      <span key={i} className="mini-amenity-tag">✓ {a}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bus-timing-col">
                <div className="time-point">
                  <span className="time-val">{bus.departureTime}</span>
                  <span className="airport-code-sub">{bus.from}</span>
                </div>

                <div className="bus-road-graphic">
                  <span className="track-duration">{bus.duration}</span>
                  <div className="road-line-track">
                    <span className="road-dash-line" />
                    <span className="material-symbols-rounded road-bus-icon">directions_bus</span>
                  </div>
                  <span className="bus-seats-badge">{bus.seatsAvailable} Seats Left</span>
                </div>

                <div className="time-point">
                  <span className="time-val">{bus.arrivalTime}</span>
                  <span className="airport-code-sub">{bus.to}</span>
                </div>
              </div>

              <div className="bus-action-col">
                <div className="bus-rating-pill">
                  <span className="material-symbols-rounded">star</span>
                  <span>{bus.rating}</span>
                  <span className="reviews-sub">({bus.reviewsCount})</span>
                </div>

                <div className="price-tag-wrap">
                  <span className="currency-symbol">₹</span>
                  <span className="price-amount">{(bus.price * travelersCount).toLocaleString('en-IN')}</span>
                  <span className="price-sub">{travelersCount > 1 ? `for ${travelersCount} seats` : 'per seat'}</span>
                </div>

                <button
                  type="button"
                  className="btn-select-action"
                  onClick={() => onSelectBookingItem({
                    type: 'BUS',
                    title: `${bus.operator} (${bus.busType})`,
                    from: bus.from,
                    to: bus.to,
                    date: travelDate,
                    time: `${bus.departureTime} - ${bus.arrivalTime}`,
                    price: bus.price * travelersCount,
                    seats: `${travelersCount} Seat(s) Reserved`,
                    extra: `Amenities: ${bus.amenities.join(', ')}`,
                    bookingRef: `TRV-BS-${Math.floor(100000 + Math.random() * 900000)}`,
                  })}
                >
                  <span>Select Seats</span>
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
