import { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTravel } from '../context/TravelContext';
import { HOTELS_DATA } from './bookingData';
import { searchLiveStays } from '../services/bookingService';
import { getTodayDate, getFutureDate } from '../utils/dateUtils';

const POPULAR_HOTEL_DESTINATIONS = [
  'Goa',
  'Dubai',
  'Singapore',
  'Bangkok',
  'Paris',
  'London',
  'Tokyo',
  'Bali',
  'Maldives',
];

export default function StaySection({ onSelectBookingItem }) {
  const { t } = useLanguage();
  const { isWishlisted, toggleWishlist } = useTravel();

  const [destination, setDestination] = useState('Goa, India');
  const [checkIn, setCheckIn] = useState(getTodayDate());
  const [checkOut, setCheckOut] = useState(getFutureDate(2));
  const [roomsGuests, setRoomsGuests] = useState({ rooms: 1, adults: 2, children: 0 });
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
  const [maxPrice, setMaxPrice] = useState(150000);
  const [selectedDestinationFilter, setSelectedDestinationFilter] = useState('Goa');
  const [isSearching, setIsSearching] = useState(false);
  const [allHotels, setAllHotels] = useState(HOTELS_DATA);
  const [isLiveInventory, setIsLiveInventory] = useState(false);

  const handleSearchHotels = async (e) => {
    e?.preventDefault();
    setIsSearching(true);
    const targetDest = destination.trim() || selectedDestinationFilter || 'Goa';
    try {
      const liveHotels = await searchLiveStays({
        destination: targetDest,
        checkIn,
        checkOut,
        guests: roomsGuests.adults + roomsGuests.children,
        maxPrice
      });
      if (liveHotels && liveHotels.length > 0) {
        setAllHotels(liveHotels);
        setIsLiveInventory(liveHotels.some(h => h.isLive));
      }
    } catch (err) {
      console.warn('Hotel search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    handleSearchHotels();
  }, [selectedDestinationFilter, checkIn, checkOut]);

  // Filtered hotels
  const filteredHotels = useMemo(() => {
    const query = destination.toLowerCase().trim();
    return allHotels.filter((hotel) => {
      // If user selected a specific pill and input matches or is empty, filter by pill
      if (selectedDestinationFilter && (!query || query.includes(selectedDestinationFilter.toLowerCase()))) {
        if (hotel.destination.toLowerCase() !== selectedDestinationFilter.toLowerCase()) {
          return false;
        }
      } else if (query) {
        // Otherwise, filter by the typed query
        const matchesDest = hotel.destination.toLowerCase().includes(query);
        const matchesName = hotel.name.toLowerCase().includes(query);
        const matchesLoc = (hotel.location || '').toLowerCase().includes(query);
        if (!matchesDest && !matchesName && !matchesLoc) return false;
      }
      // Match price filter
      if (hotel.pricePerNight > maxPrice) {
        return false;
      }
      return true;
    });
  }, [allHotels, selectedDestinationFilter, destination, maxPrice]);

  const handleDestinationPillClick = (dest) => {
    if (selectedDestinationFilter.toLowerCase() === dest.toLowerCase()) {
      setSelectedDestinationFilter('');
      setDestination('');
    } else {
      setSelectedDestinationFilter(dest);
      setDestination(dest);
    }
  };

  return (
    <div className="stay-section-container">
      {/* Hotel Search Glass Booking Card */}
      <div className="booking-engine-card stay-engine-card">
        <div className="stay-sub-header">
          <div className="stay-title-tag">
            <span className="material-symbols-rounded">apartment</span>
            <span>Worldwide Luxury Stays & Resort Escapes</span>
          </div>
          <span className="stay-verified-badge">
            <span className="material-symbols-rounded">verified</span>
            <span>Best Price Guarantee</span>
          </span>
        </div>

        <form onSubmit={handleSearchHotels} className="booking-unified-form">
          <div className="stay-fields-grid">
            {/* WHERE Field */}
            <div className="flight-field-block stay-where-block">
              <span className="field-subhead">{t('WHERE ARE YOU STAYING?', 'WHERE ARE YOU STAYING?')}</span>
              <div className="field-city-row">
                <span className="material-symbols-rounded" style={{ color: '#38bdf8', fontSize: '20px' }}>location_on</span>
                <input
                  type="text"
                  className="glass-text-input"
                  value={destination}
                  onChange={(e) => {
                    const val = e.target.value;
                    setDestination(val);
                    const match = POPULAR_HOTEL_DESTINATIONS.find(d => 
                      val.toLowerCase().includes(d.toLowerCase())
                    );
                    setSelectedDestinationFilter(match || '');
                  }}
                  placeholder="City, Resort or Destination"
                />
              </div>
              <span className="field-airport-desc">India & International Luxury Hotels</span>
            </div>

            {/* CHECK-IN */}
            <div className="flight-field-block date-field-block">
              <span className="field-subhead">{t('CHECK-IN', 'CHECK-IN')}</span>
              <div className="date-box single-date-box">
                <span className="date-label-tiny">ARRIVAL</span>
                <input
                  type="date"
                  className="glass-date-input"
                  value={checkIn}
                  min={getTodayDate()}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
            </div>

            {/* CHECK-OUT */}
            <div className="flight-field-block date-field-block">
              <span className="field-subhead">{t('CHECK-OUT', 'CHECK-OUT')}</span>
              <div className="date-box single-date-box">
                <span className="date-label-tiny">DEPARTURE</span>
                <input
                  type="date"
                  className="glass-date-input"
                  value={checkOut}
                  min={checkIn || getTodayDate()}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
            </div>

            {/* ROOMS & GUESTS */}
            <div className="flight-field-block travelers-field-block">
              <span className="field-subhead">{t('GUESTS & ROOMS', 'GUESTS & ROOMS')}</span>
              <button
                type="button"
                className="traveler-selector-btn"
                onClick={() => setShowGuestsDropdown(!showGuestsDropdown)}
              >
                <div className="traveler-val-wrap">
                  <span className="traveler-count-big" style={{ fontSize: '18px' }}>
                    {roomsGuests.rooms} Room • {roomsGuests.adults} Adults
                  </span>
                  {roomsGuests.children > 0 && (
                    <span className="traveler-label-text">+{roomsGuests.children} Child</span>
                  )}
                </div>
                <span className="material-symbols-rounded">expand_more</span>
              </button>

              {showGuestsDropdown && (
                <div className="glass-travelers-popover">
                  <div className="traveler-counter-row">
                    <div>
                      <div className="traveler-type-title">Rooms</div>
                      <div className="traveler-type-hint">Private Suites</div>
                    </div>
                    <div className="counter-controls">
                      <button
                        type="button"
                        className="counter-btn"
                        disabled={roomsGuests.rooms <= 1}
                        onClick={() => setRoomsGuests(p => ({ ...p, rooms: p.rooms - 1 }))}
                      >
                        -
                      </button>
                      <span className="counter-number">{roomsGuests.rooms}</span>
                      <button
                        type="button"
                        className="counter-btn"
                        onClick={() => setRoomsGuests(p => ({ ...p, rooms: p.rooms + 1 }))}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="traveler-counter-row">
                    <div>
                      <div className="traveler-type-title">Adults</div>
                      <div className="traveler-type-hint">Age 18+</div>
                    </div>
                    <div className="counter-controls">
                      <button
                        type="button"
                        className="counter-btn"
                        disabled={roomsGuests.adults <= 1}
                        onClick={() => setRoomsGuests(p => ({ ...p, adults: p.adults - 1 }))}
                      >
                        -
                      </button>
                      <span className="counter-number">{roomsGuests.adults}</span>
                      <button
                        type="button"
                        className="counter-btn"
                        onClick={() => setRoomsGuests(p => ({ ...p, adults: p.adults + 1 }))}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="traveler-counter-row">
                    <div>
                      <div className="traveler-type-title">Children</div>
                      <div className="traveler-type-hint">Age 0-17</div>
                    </div>
                    <div className="counter-controls">
                      <button
                        type="button"
                        className="counter-btn"
                        disabled={roomsGuests.children <= 0}
                        onClick={() => setRoomsGuests(p => ({ ...p, children: p.children - 1 }))}
                      >
                        -
                      </button>
                      <span className="counter-number">{roomsGuests.children}</span>
                      <button
                        type="button"
                        className="counter-btn"
                        onClick={() => setRoomsGuests(p => ({ ...p, children: p.children + 1 }))}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="popover-done-btn"
                    onClick={() => setShowGuestsDropdown(false)}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            {/* PRICE PER NIGHT SLIDER */}
            <div className="flight-field-block price-slider-block">
              <div className="field-header-split">
                <span className="field-subhead">{t('PRICE PER NIGHT', 'PRICE PER NIGHT')}</span>
                <span className="price-slider-readout">Up to ₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="150000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="glass-range-slider"
              />
            </div>
          </div>

          {/* Dedicated Next-Line Action Row */}
          <div className="booking-action-next-row">
            <div className="form-perks-info">
              <span className="material-symbols-rounded">hotel</span>
              <span>Free Cancellation on Most Stays • Complimentary Breakfast & Spa Privileges</span>
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
                <span>{isSearching ? 'Searching...' : t('SEARCH STAYS', 'SEARCH STAYS')}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* POPULAR DESTINATIONS PILL BAR */}
      <div className="popular-destinations-bar">
        <div className="destinations-bar-label">
          <span className="material-symbols-rounded">trending_up</span>
          <span>Popular Stay Destinations:</span>
        </div>
        <div className="destinations-pill-scroll">
          {POPULAR_HOTEL_DESTINATIONS.map((dest) => (
            <button
              key={dest}
              type="button"
              className={`dest-filter-pill ${selectedDestinationFilter === dest ? 'active' : ''}`}
              onClick={() => handleDestinationPillClick(dest)}
            >
              <span className="material-symbols-rounded pill-dot-icon">fiber_manual_record</span>
              <span>{dest}</span>
            </button>
          ))}
          <button
            type="button"
            className={`dest-filter-pill ${!selectedDestinationFilter ? 'active' : ''}`}
            onClick={() => setSelectedDestinationFilter('')}
          >
            <span>Show All</span>
          </button>
        </div>
      </div>

      {/* LUXURY HOTEL CARDS GRID */}
      <div className="stay-cards-section">
        <div className="section-title-row">
          <div>
            <h3 className="section-heading">
              Luxury Hotels & Resorts {selectedDestinationFilter ? `in ${selectedDestinationFilter}` : ''}
            </h3>
            <p className="section-subtext">
              Showing {filteredHotels.length} hand-picked luxury suites & villas with exclusive TRAVIO perks
            </p>
          </div>
          <div className="hotel-guarantee-pill">
            <span className="material-symbols-rounded">spa</span>
            <span>Complimentary Breakfast & Spa Credits</span>
          </div>
        </div>

        <div className="hotel-cards-grid">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="hotel-card-item">
              {/* Hotel Image with Zoom effect */}
              <div className="hotel-image-wrapper">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="hotel-card-img"
                  loading="lazy"
                />
                <div className="hotel-image-overlay" />
                <span className="hotel-tag-badge">{hotel.tag}</span>
                <button
                  type="button"
                  className={`hotel-wishlist-btn ${isWishlisted(`hotel-${hotel.id}`) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist({
                      id: `hotel-${hotel.id}`,
                      name: hotel.name,
                      country: hotel.location,
                      flag: '🏨',
                      rating: hotel.rating,
                      reviews: `${hotel.reviewsCount} reviews`,
                      budgetStarting: `₹${hotel.price?.toLocaleString('en-IN')}`,
                      budgetNum: hotel.price,
                      cardImage: hotel.image,
                      heroImage: hotel.image,
                      tagline: `${hotel.tag} • ${hotel.type}`,
                      category: hotel.location.toLowerCase().includes('goa') || hotel.location.toLowerCase().includes('beach') ? 'beaches' : hotel.location.toLowerCase().includes('manali') ? 'mountains' : 'heritage',
                      itemType: 'stay',
                      tags: ['Hotel', 'Stay', hotel.tag],
                      status: 'saved'
                    });
                  }}
                  title={isWishlisted(`hotel-${hotel.id}`) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                  aria-label="Save to Wishlist"
                >
                  <span className="material-symbols-rounded" style={{ color: isWishlisted(`hotel-${hotel.id}`) ? '#f43f5e' : 'inherit' }}>
                    favorite
                  </span>
                </button>
              </div>

              {/* Hotel Card Body */}
              <div className="hotel-card-body">
                <div className="hotel-title-row">
                  <h4 className="hotel-name">{hotel.name}</h4>
                  <div className="hotel-rating-box">
                    <span className="material-symbols-rounded">star</span>
                    <span className="rating-num">{hotel.rating}</span>
                    <span className="reviews-count">({hotel.reviewsCount})</span>
                  </div>
                </div>

                <div className="hotel-location-row">
                  <span className="material-symbols-rounded">location_on</span>
                  <span>{hotel.location}</span>
                </div>

                {/* Amenities Badges */}
                <div className="hotel-amenities-cloud">
                  {hotel.amenities.map((amenity, i) => (
                    <span key={i} className="hotel-amenity-chip">
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Pricing & View Hotel Button */}
                <div className="hotel-card-footer">
                  <div className="hotel-price-block">
                    <span className="price-old">₹{hotel.originalPrice.toLocaleString('en-IN')}</span>
                    <div className="price-current-row">
                      <span className="curr-sym">₹</span>
                      <span className="price-val">{hotel.pricePerNight.toLocaleString('en-IN')}</span>
                      <span className="per-night">/ night</span>
                    </div>
                    <span className="tax-subtext">+ ₹{Math.round(hotel.pricePerNight * 0.12).toLocaleString('en-IN')} taxes & fees</span>
                  </div>

                  <button
                    type="button"
                    className="btn-view-hotel"
                    onClick={() => onSelectBookingItem({
                      type: 'HOTEL',
                      title: hotel.name,
                      carrier: hotel.name,
                      from: `Check-in: ${checkIn}`,
                      to: `Check-out: ${checkOut}`,
                      fromCity: hotel.location || 'Resort City',
                      toCity: hotel.destination || 'Luxury Retreat',
                      date: `${checkIn} to ${checkOut}`,
                      time: 'Check-in: 02:00 PM • Check-out: 11:00 AM',
                      duration: `${Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)))} Night(s)`,
                      price: hotel.pricePerNight * roomsGuests.rooms,
                      seats: `${roomsGuests.rooms} Room(s), ${roomsGuests.adults} Adults`,
                      extra: `${hotel.location} • ${hotel.tag}`,
                      bookingRef: `TRV-HT-${Math.floor(100000 + Math.random() * 900000)}`,
                      image: hotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
                    })}
                  >
                    <span>{t('Reserve Suite', 'Reserve Suite')}</span>
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
