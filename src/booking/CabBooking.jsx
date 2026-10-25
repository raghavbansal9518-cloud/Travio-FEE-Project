import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { searchLiveCabs } from '../services/bookingService';
import { getTodayDate, getFutureDate, getCurrentTime12, getNearestPickupTime, isToday, timeToMinutes, getCurrentTime24 } from '../utils/dateUtils';

export const CAB_CITIES = [
  { city: 'Delhi NCR', state: 'Delhi NCR' },
  { city: 'Agra', state: 'Uttar Pradesh' },
  { city: 'Jaipur', state: 'Rajasthan' },
  { city: 'Chandigarh', state: 'Punjab / Haryana' },
  { city: 'Shimla', state: 'Himachal Pradesh' },
  { city: 'Manali', state: 'Himachal Pradesh' },
  { city: 'Dehradun', state: 'Uttarakhand' },
  { city: 'Rishikesh', state: 'Uttarakhand' },
  { city: 'Mussoorie', state: 'Uttarakhand' },
  { city: 'Amritsar', state: 'Punjab' },
  { city: 'Lucknow', state: 'Uttar Pradesh' },
  { city: 'Kanpur', state: 'Uttar Pradesh' },
  { city: 'Varanasi', state: 'Uttar Pradesh' },
  { city: 'Udaipur', state: 'Rajasthan' },
  { city: 'Jodhpur', state: 'Rajasthan' },
  { city: 'Mumbai', state: 'Maharashtra' },
  { city: 'Pune', state: 'Maharashtra' },
  { city: 'Lonavala', state: 'Maharashtra' },
  { city: 'Mahabaleshwar', state: 'Maharashtra' },
  { city: 'Shirdi', state: 'Maharashtra' },
  { city: 'Nashik', state: 'Maharashtra' },
  { city: 'Goa', state: 'Goa' },
  { city: 'Ahmedabad', state: 'Gujarat' },
  { city: 'Surat', state: 'Gujarat' },
  { city: 'Vadodara', state: 'Gujarat' },
  { city: 'Bangalore', state: 'Karnataka' },
  { city: 'Mysore', state: 'Karnataka' },
  { city: 'Coorg', state: 'Karnataka' },
  { city: 'Ooty', state: 'Tamil Nadu' },
  { city: 'Chennai', state: 'Tamil Nadu' },
  { city: 'Pondicherry', state: 'Puducherry' },
  { city: 'Coimbatore', state: 'Tamil Nadu' },
  { city: 'Hyderabad', state: 'Telangana' },
  { city: 'Kochi', state: 'Kerala' },
  { city: 'Munnar', state: 'Kerala' },
  { city: 'Kolkata', state: 'West Bengal' },
  { city: 'Darjeeling', state: 'West Bengal' },
  { city: 'Siliguri', state: 'West Bengal' },
  { city: 'Puri', state: 'Odisha' },
  { city: 'Bhubaneswar', state: 'Odisha' }
];

const AIRPORTS_DATA = [
  { name: 'Delhi IGI Airport (T3 / T2 / T1)', city: 'Delhi NCR' },
  { name: 'Mumbai Chhatrapati Shivaji (T2 / T1)', city: 'Mumbai' },
  { name: 'Bengaluru Kempegowda (T1 / T2)', city: 'Bangalore' },
  { name: 'Goa Manohar Mopa / Dabolim', city: 'Goa' },
  { name: 'Jaipur International Airport (T2)', city: 'Jaipur' },
  { name: 'Chennai International Airport', city: 'Chennai' },
  { name: 'Kolkata Netaji Subhash Chandra Bose', city: 'Kolkata' },
  { name: 'Hyderabad Rajiv Gandhi Airport', city: 'Hyderabad' },
  { name: 'Ahmedabad Sardar Vallabhbhai Patel', city: 'Ahmedabad' },
  { name: 'Lucknow Chaudhary Charan Singh Airport', city: 'Lucknow' }
];

export default function CabBooking({ onSelectBookingItem }) {
  const { t } = useLanguage();
  const [serviceType, setServiceType] = useState('one-way'); // 'one-way', 'round-trip', 'airport', 'hourly'
  const [fromCity, setFromCity] = useState('Delhi NCR');
  const [toCity, setToCity] = useState('Agra');
  const [departDate, setDepartDate] = useState(getTodayDate());
  const [returnDate, setReturnDate] = useState(getFutureDate(2));
  const [pickupTime, setPickupTime] = useState(() => getNearestPickupTime(15, 15));
  const [dropTime, setDropTime] = useState('21:30');

  // Airport Specific
  const [airportDirection, setAirportDirection] = useState('to-airport'); // 'to-airport' or 'from-airport'
  const [selectedAirport, setSelectedAirport] = useState(AIRPORTS_DATA[0].name);
  const [cityAddress, setCityAddress] = useState('Connaught Place / Hotel Aerocity');

  // Hourly Rental Package
  const [hourlyPackage, setHourlyPackage] = useState('8h-80km'); // '4h-40km', '8h-80km', '12h-120km'

  // Interactive Stops
  const [stops, setStops] = useState([]); // Array of strings e.g. ['Mathura']

  // Search state
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);

  // Recalculate cabs dynamically whenever inputs change
  useEffect(() => {
    const nextCabs = searchLiveCabs({
      fromCity,
      toCity,
      serviceType,
      departDate,
      returnDate,
      pickupTime,
      hourlyPackage,
      airportTerminal: selectedAirport
    });
    setResults(nextCabs);
  }, [serviceType, fromCity, toCity, departDate, returnDate, pickupTime, hourlyPackage, selectedAirport]);

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
      const nextCabs = searchLiveCabs({
        fromCity,
        toCity,
        serviceType,
        departDate,
        returnDate,
        pickupTime,
        hourlyPackage,
        airportTerminal: selectedAirport
      });
      setResults(nextCabs);
      setIsSearching(false);
    }, 200);
  };

  const destinationDisplay = () => {
    if (serviceType === 'hourly') return `${fromCity} (Local City Package)`;
    if (serviceType === 'airport') {
      return airportDirection === 'to-airport' ? `${selectedAirport}` : `${cityAddress} (${fromCity})`;
    }
    return toCity;
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

        {/* Dynamic Context Tag */}
        <div className="bus-service-guarantee">
          <span className="material-symbols-rounded">verified_user</span>
          <span>
            {serviceType === 'hourly'
              ? 'Local Multi-Stop Chauffeur'
              : serviceType === 'airport'
              ? 'Guaranteed Flight Delay Protection'
              : serviceType === 'round-trip'
              ? 'Save 20% on Round-Trip Highway Fares'
              : 'Direct Doorstep Interstate Cab'}
          </span>
        </div>
      </div>

      {/* Main Glass Booking Form */}
      <form onSubmit={handleSearch} className="cab-form-layout">
        <div className="flight-form-grid cab-grid-row">
          
          {/* 1. PICKUP CITY / ADDRESS */}
          <div className="flight-field-block">
            <span className="field-subhead">
              {serviceType === 'hourly' ? 'CITY OF RENTAL' : 'FROM (PICKUP)'}
            </span>
            <div className="field-city-row">
              <span className="field-city-name">{fromCity}</span>
              <span className="field-code-badge">PICKUP</span>
            </div>
            <span className="field-airport-desc">
              {CAB_CITIES.find(c => c.city === fromCity)?.state || 'Verified State Route'}
            </span>
            <select
              className="hidden-native-select"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
            >
              {CAB_CITIES.map(c => (
                <option key={`cab-from-${c.city}`} value={c.city}>
                  {c.city} — {c.state}
                </option>
              ))}
            </select>
          </div>

          {/* 2. MODE-SPECIFIC DESTINATION BLOCK */}
          {serviceType === 'hourly' ? (
            <div className="flight-field-block">
              <span className="field-subhead">RENTAL DURATION & DISTANCE</span>
              <div className="field-city-row">
                <span className="field-city-name">
                  {hourlyPackage === '4h-40km' ? '4 Hours' : hourlyPackage === '12h-120km' ? '12 Hours' : '8 Hours (Full Day)'}
                </span>
                <span className="field-code-badge">PACKAGE</span>
              </div>
              <span className="field-airport-desc">
                {hourlyPackage === '4h-40km' ? '40 km included • City errands' : hourlyPackage === '12h-120km' ? '120 km included • Day excursion' : '80 km included • Business / Sightseeing'}
              </span>
              <select
                className="hidden-native-select"
                value={hourlyPackage}
                onChange={(e) => setHourlyPackage(e.target.value)}
              >
                <option value="4h-40km">4 Hours / 40 Kms Package (Half Day)</option>
                <option value="8h-80km">8 Hours / 80 Kms Package (Recommended Full Day)</option>
                <option value="12h-120km">12 Hours / 120 Kms Package (Extended Day Tour)</option>
              </select>
            </div>
          ) : serviceType === 'airport' ? (
            <div className="flight-field-block">
              <span className="field-subhead">
                {airportDirection === 'to-airport' ? 'SELECT AIRPORT & TERMINAL' : 'PICKUP AIRPORT'}
              </span>
              <div className="field-city-row">
                <span className="field-city-name" style={{ fontSize: '15px' }}>{selectedAirport}</span>
                <span className="field-code-badge">AIRPORT</span>
              </div>
              <span className="field-airport-desc">Includes 45m delay waiting & toll</span>
              <select
                className="hidden-native-select"
                value={selectedAirport}
                onChange={(e) => setSelectedAirport(e.target.value)}
              >
                {AIRPORTS_DATA.map(a => (
                  <option key={a.name} value={a.name}>
                    {a.name} ({a.city})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="flight-field-block">
              <span className="field-subhead">TO (DESTINATION)</span>
              <div className="field-city-row">
                <span className="field-city-name">{toCity}</span>
                <span className="field-code-badge">DROP</span>
              </div>
              <span className="field-airport-desc">
                {CAB_CITIES.find(c => c.city === toCity)?.state || 'Verified State Route'}
              </span>
              <select
                className="hidden-native-select"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
              >
                {CAB_CITIES.map(c => (
                  <option key={`cab-to-${c.city}`} value={c.city}>
                    {c.city} — {c.state}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 3. DEPARTURE DATE & PICKUP TIME */}
          <div className="flight-field-block date-field-block">
            <span className="field-subhead">DEPARTURE & PICKUP</span>
            <div className="dates-display-row">
              <div className="date-box">
                <span className="date-label-tiny">DATE</span>
                <input
                  type="date"
                  className="glass-date-input"
                  value={departDate}
                  min={getTodayDate()}
                  onChange={(e) => {
                    const newDepart = e.target.value;
                    setDepartDate(newDepart);
                    if (returnDate && returnDate < newDepart) {
                      setReturnDate(getFutureDate(2, newDepart));
                    }
                  }}
                />
              </div>
              <div className="date-box">
                <span className="date-label-tiny">TIME</span>
                <input
                  type="time"
                  className="glass-date-input"
                  value={pickupTime}
                  min={isToday(departDate) ? getCurrentTime24() : undefined}
                  onChange={(e) => {
                    const newTime = e.target.value;
                    if (isToday(departDate) && timeToMinutes(newTime) < timeToMinutes(getCurrentTime24())) {
                      setPickupTime(getNearestPickupTime(15, 15));
                    } else {
                      setPickupTime(newTime);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* 4. RETURN DATE & DROP TIME (For Outstation Round-Trip) */}
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
                    min={departDate || getTodayDate()}
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

        {/* Dynamic Intermediate Stops Row (For Outstation) */}
        {(serviceType === 'one-way' || serviceType === 'round-trip') && (
          <div className="cab-stops-control-row">
            {stops.map((stop, index) => (
              <div key={index} className="cab-stop-input-pill">
                <span className="material-symbols-rounded stop-pin">add_location_alt</span>
                <input
                  type="text"
                  placeholder={`Via Stop #${index + 1} (e.g. Mathura, Neemrana)`}
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
                <span>+ Add Sightseeing Stop</span>
              </button>
            )}
          </div>
        )}

        {/* Dedicated Next-Line Action Row */}
        <div className="booking-action-next-row">
          <div className="form-perks-info">
            <span className="material-symbols-rounded">local_taxi</span>
            <span>100% Sanitized Fleet • Verified Highway Chauffeurs • Real-Time Route Pricing</span>
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
              <span>{isSearching ? 'Calculating Cabs...' : t('SEARCH CABS')}</span>
            </button>
          </div>
        </div>
      </form>

      {/* CAB RESULTS LIST */}
      <div className="flight-results-container">
        {/* Live Current Time Chauffeur Banner */}
        {isToday(departDate) && (
          <div className="live-current-time-banner">
            <div className="banner-left-info">
              <span className="material-symbols-rounded live-clock-icon">local_taxi</span>
              <span>
                Instant Chauffeur Available Now • Direct doorstep pickup scheduled at <strong>{pickupTime}</strong> (within 15–20m from current time {getCurrentTime12()})
              </span>
            </div>
            <span className="live-status-pill">
              <span className="live-pulse-dot"></span>
              <span>IMMEDIATE DISPATCH</span>
            </span>
          </div>
        )}

        <div className="results-header-bar">
          <div className="results-badge-info">
            <span className="material-symbols-rounded">local_taxi</span>
            <span>
              {serviceType === 'hourly' ? (
                <>Local Hourly Rental Packages in <strong>{fromCity}</strong> ({results.length} Options)</>
              ) : serviceType === 'airport' ? (
                <>Airport Chauffeur Transfer for <strong>{selectedAirport}</strong> ({results.length} Options)</>
              ) : serviceType === 'round-trip' ? (
                <>Round-Trip Chauffeur Cabs for <strong>{fromCity}</strong> ⇄ <strong>{toCity}</strong></>
              ) : (
                <>Available Chauffeur Cabs for <strong>{fromCity}</strong> → <strong>{toCity}</strong></>
              )}
            </span>
            <span className="live-verified-pill" title="Live route distance and chauffeur fare calculation">
              <span className="live-pulse-dot"></span>
              <span>Verified Route</span>
            </span>
          </div>
          <span className="results-date-tag">
            Pickup: {departDate} at {pickupTime}
          </span>
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
                  <div className="cab-rate-km">{cab.ratePerKm}</div>
                  <div className="price-tag-wrap">
                    <span className="currency-symbol">₹</span>
                    <span className="price-amount">{cab.basePrice.toLocaleString('en-IN')}</span>
                  </div>
                  <span className="price-sub" title={cab.estHours}>
                    {cab.estHours}
                  </span>
                </div>

                <button
                  type="button"
                  className="btn-glowing-cyan btn-cab-book"
                  onClick={() => onSelectBookingItem({
                    type: 'CAB',
                    title: `${cab.category} — ${cab.model}`,
                    carrier: cab.model,
                    from: fromCity,
                    to: destinationDisplay(),
                    fromCity: fromCity,
                    toCity: destinationDisplay(),
                    date: departDate,
                    departureDate: departDate,
                    returnDate: serviceType === 'round-trip' ? returnDate : departDate,
                    time: `Pickup: ${pickupTime}`,
                    duration: cab.estHours,
                    price: cab.basePrice,
                    seats: cab.capacity,
                    extra: `Service: ${serviceType.toUpperCase()} • Rate: ${cab.ratePerKm} • ${cab.fuel}`,
                    bookingRef: `TRV-CB-${Math.floor(100000 + Math.random() * 900000)}`,
                    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
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
