import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BUSES_DATA } from './bookingData';
import { searchLiveBuses } from '../services/bookingService';
import { getTodayDate, getCurrentTime12, isToday, getTimeStatusBadge } from '../utils/dateUtils';

export const BUS_CITIES = [
  { city: 'Delhi', state: 'Delhi NCR', terminal: 'Kashmere Gate ISBT / Anand Vihar' },
  { city: 'Agra', state: 'Uttar Pradesh', terminal: 'ISBT Agra / Idgah Bus Stand' },
  { city: 'Jaipur', state: 'Rajasthan', terminal: 'Sindhi Camp / 200 Ft Bypass' },
  { city: 'Chandigarh', state: 'Punjab / Haryana', terminal: 'ISBT Sector 43 / Sector 17' },
  { city: 'Shimla', state: 'Himachal Pradesh', terminal: 'New ISBT Tutikandi' },
  { city: 'Manali', state: 'Himachal Pradesh', terminal: 'Private Bus Stand / Mall Road' },
  { city: 'Dehradun', state: 'Uttarakhand', terminal: 'ISBT Dehradun / Haridwar Bypass' },
  { city: 'Rishikesh', state: 'Uttarakhand', terminal: 'Natraj Chowk / Nepali Farm' },
  { city: 'Mussoorie', state: 'Uttarakhand', terminal: 'Picture Palace / Library Bus Stand' },
  { city: 'Amritsar', state: 'Punjab', terminal: 'ISBT Amritsar / Hall Gate' },
  { city: 'Lucknow', state: 'Uttar Pradesh', terminal: 'Alambagh Bus Terminal / Kaisarbagh' },
  { city: 'Kanpur', state: 'Uttar Pradesh', terminal: 'Fazalganj / Jhakarkatti ISBT' },
  { city: 'Varanasi', state: 'Uttar Pradesh', terminal: 'Cantt Bus Station / Lahartara' },
  { city: 'Udaipur', state: 'Rajasthan', terminal: 'Udiapole Bus Stand / Paras Circle' },
  { city: 'Jodhpur', state: 'Rajasthan', terminal: 'Paota Bus Stand / Raika Bagh' },
  { city: 'Mumbai', state: 'Maharashtra', terminal: 'Borivali / Dadar TT / Vashi Highway' },
  { city: 'Pune', state: 'Maharashtra', terminal: 'Swargate / Wakad / Shivaji Nagar' },
  { city: 'Lonavala', state: 'Maharashtra', terminal: 'Lonavala Expressway Bypass' },
  { city: 'Mahabaleshwar', state: 'Maharashtra', terminal: 'Mahabaleshwar ST Bus Stand' },
  { city: 'Shirdi', state: 'Maharashtra', terminal: 'Shirdi Temple Bus Complex' },
  { city: 'Nashik', state: 'Maharashtra', terminal: 'Thakkar Bazaar / CBS' },
  { city: 'Goa', state: 'Goa', terminal: 'Panaji Kadamba Bus Terminus / Mapusa' },
  { city: 'Ahmedabad', state: 'Gujarat', terminal: 'Geeta Mandir / Paldi Cross Road' },
  { city: 'Surat', state: 'Gujarat', terminal: 'Central Bus Station / Sahara Darwaja' },
  { city: 'Vadodara', state: 'Gujarat', terminal: 'Central Bus Terminal / Amit Nagar' },
  { city: 'Bangalore', state: 'Karnataka', terminal: 'Majestic KBS / Madiwala / Anand Rao' },
  { city: 'Mysore', state: 'Karnataka', terminal: 'KSRTC Suburb Bus Stand' },
  { city: 'Coorg', state: 'Karnataka', terminal: 'Madikeri Private Bus Stand' },
  { city: 'Ooty', state: 'Tamil Nadu', terminal: 'Ooty Central Bus Stand' },
  { city: 'Chennai', state: 'Tamil Nadu', terminal: 'CMBT Koyambedu / Kilambakkam KCBT' },
  { city: 'Pondicherry', state: 'Puducherry', terminal: 'New Bus Stand Maraimalai Adigal' },
  { city: 'Coimbatore', state: 'Tamil Nadu', terminal: 'Gandhipuram Central Bus Stand' },
  { city: 'Hyderabad', state: 'Telangana', terminal: 'MGBS Imlibun / Ameerpet' },
  { city: 'Kochi', state: 'Kerala', terminal: 'Vyttila Mobility Hub / Kaloor' },
  { city: 'Munnar', state: 'Kerala', terminal: 'Munnar KSRTC Bus Station' },
  { city: 'Kolkata', state: 'West Bengal', terminal: 'Esplanade Babughat / Karunamoyee' },
  { city: 'Darjeeling', state: 'West Bengal', terminal: 'Chauk Bazaar Bus Stand' },
  { city: 'Siliguri', state: 'West Bengal', terminal: 'Tenzing Norgay Central Bus Terminus' },
  { city: 'Puri', state: 'Odisha', terminal: 'Puri Bus Stand / Grand Road' },
  { city: 'Bhubaneswar', state: 'Odisha', terminal: 'Baramunda ISBT' }
];

export default function BusBooking({ onSelectBookingItem }) {
  const { t } = useLanguage();
  const [fromCity, setFromCity] = useState(BUS_CITIES[0]); // Delhi
  const [toCity, setToCity] = useState(BUS_CITIES[1]); // Agra
  const [travelDate, setTravelDate] = useState(getTodayDate());
  const [travelersCount, setTravelersCount] = useState(1);
  const [busTypeFilter, setBusTypeFilter] = useState('All');
  const [isSwapping, setIsSwapping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [allBuses, setAllBuses] = useState(BUSES_DATA);
  const [isLiveInventory, setIsLiveInventory] = useState(false);

  const handleSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      const temp = fromCity;
      setFromCity(toCity);
      setToCity(temp);
      setIsSwapping(false);
    }, 200);
  };

  const handleSearch = async (e) => {
    e?.preventDefault();
    setIsSearching(true);
    try {
      const liveData = await searchLiveBuses({
        fromCity: fromCity.city,
        toCity: toCity.city,
        travelDate,
        busType: 'All'
      });
      if (liveData && liveData.length > 0) {
        setAllBuses(liveData);
        setIsLiveInventory(liveData.some(b => b.isLive));
      }
    } catch (err) {
      console.warn('Bus search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  // Only trigger network search when route or date changes (filter is instant in memory!)
  useEffect(() => {
    handleSearch();
  }, [fromCity.city, toCity.city, travelDate]);

  // Instant in-memory filtering: 0ms lag
  const results = allBuses.filter(b => {
    if (busTypeFilter === 'All') return true;
    const t = (b.busType || '').toLowerCase();
    const td = (b.busTypeDetail || '').toLowerCase();
    const f = busTypeFilter.toLowerCase();
    return t.includes(f) || td.includes(f);
  });

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
            <span className="field-subhead">{t('TRAVEL DATE')}</span>
            <div className="date-box single-date-box">
              <span className="date-label-tiny">JOURNEY DATE</span>
              <input
                type="date"
                className="glass-date-input"
                value={travelDate}
                min={getTodayDate()}
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
              <span>{isSearching ? 'Finding Buses...' : t('SEARCH BUSES')}</span>
            </button>
          </div>
        </div>
      </form>

      {/* BUS SEARCH RESULTS */}
      <div className="flight-results-container">
        {/* Live Current Time Departure Banner */}
        {isToday(travelDate) && (
          <div className="live-current-time-banner">
            <div className="banner-left-info">
              <span className="material-symbols-rounded live-clock-icon">schedule</span>
              <span>
                Showing intercity buses departing from present time (<strong>{getCurrentTime12()}</strong> onwards) • Live Terminal GPS
              </span>
            </div>
            <span className="live-status-pill">
              <span className="live-pulse-dot"></span>
              <span>LIVE BUS SCHEDULE</span>
            </span>
          </div>
        )}

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
          {results.map((bus) => {
            const timeBadge = getTimeStatusBadge(bus.departureTime, travelDate);

            return (
              <div key={bus.id} className="bus-item-card">
                <div className="bus-operator-col">
                  <div className="bus-icon-avatar">
                    <span className="material-symbols-rounded">directions_bus</span>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h4 className="bus-operator-name">{bus.operator}</h4>
                      {isToday(travelDate) && (
                        <span className={`flight-departure-badge ${timeBadge.isUrgent ? 'urgent' : ''}`}>
                          <span className="material-symbols-rounded" style={{ fontSize: '12px' }}>
                            {timeBadge.isUrgent ? 'timer' : 'directions_bus'}
                          </span>
                          <span>{timeBadge.label}</span>
                        </span>
                      )}
                    </div>
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
                    carrier: bus.operator,
                    from: bus.from || `${fromCity.city} (${fromCity.terminal})`,
                    to: bus.to || `${toCity.city} (${toCity.terminal})`,
                    fromCity: fromCity.city,
                    toCity: toCity.city,
                    date: travelDate,
                    time: `${bus.departureTime} - ${bus.arrivalTime}`,
                    duration: bus.duration,
                    price: bus.price * travelersCount,
                    travelersCount: travelersCount,
                    seats: `${travelersCount} Seat(s) Reserved`,
                    extra: `Amenities: ${bus.amenities ? bus.amenities.join(', ') : 'AC, WiFi, Charging Port'}`,
                    bookingRef: `TRV-BS-${Math.floor(100000 + Math.random() * 900000)}`,
                    image: bus.image || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80',
                  })}
                >
                  <span>Select Seats</span>
                  <span className="material-symbols-rounded">chevron_right</span>
                </button>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
