import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { useLanguage } from '../context/LanguageContext';
import './BookingsPage.css';

// Transport Category Metadata Helper
const getCategoryMeta = (rawType = '') => {
  const type = String(rawType).toUpperCase();
  switch (type) {
    case 'FLIGHT':
      return {
        label: 'Flight',
        icon: 'flight_takeoff',
        badgeClass: 'badge-flight',
        headerClass: 'ticket-header-flight',
        brandTitle: 'TRAVIO AIRWAYS • BOARDING PASS',
        serviceLabel: 'FLIGHT / AIRLINE',
        allocationLabel: 'SEAT / CLASS'
      };
    case 'TRAIN':
      return {
        label: 'Train',
        icon: 'directions_subway',
        badgeClass: 'badge-train',
        headerClass: 'ticket-header-train',
        brandTitle: 'IRCTC / TRAVIO • E-RESERVATION SLIP',
        serviceLabel: 'TRAIN NAME & NUMBER',
        allocationLabel: 'COACH & BERTH'
      };
    case 'HOTEL':
    case 'STAY':
      return {
        label: 'Luxury Stay',
        icon: 'hotel',
        badgeClass: 'badge-hotel',
        headerClass: 'ticket-header-hotel',
        brandTitle: 'TRAVIO LUXURY RETREATS • STAY VOUCHER',
        serviceLabel: 'PROPERTY / RESORT',
        allocationLabel: 'ROOM & GUESTS'
      };
    case 'BUS':
      return {
        label: 'Intercity Bus',
        icon: 'directions_bus',
        badgeClass: 'badge-bus',
        headerClass: 'ticket-header-bus',
        brandTitle: 'TRAVIO EXPRESS COACH • BOARDING PASS',
        serviceLabel: 'OPERATOR & COACH',
        allocationLabel: 'SEAT ALLOCATION'
      };
    case 'CAB':
      return {
        label: 'Chauffeur Cab',
        icon: 'local_taxi',
        badgeClass: 'badge-cab',
        headerClass: 'ticket-header-cab',
        brandTitle: 'TRAVIO CHAUFFEUR • TRIP RECEIPT',
        serviceLabel: 'VEHICLE MODEL',
        allocationLabel: 'CAPACITY / SEATING'
      };
    case 'EXPERIENCE':
      return {
        label: 'Experience Pass',
        icon: 'confirmation_number',
        badgeClass: 'badge-experience',
        headerClass: 'ticket-header-experience',
        brandTitle: 'TRAVIO VIP EXPERIENCES • ACTIVITY PASS',
        serviceLabel: 'ATTRACTION / TOUR',
        allocationLabel: 'PASS ALLOCATION'
      };
    default:
      return {
        label: 'Travel Package',
        icon: 'luggage',
        badgeClass: 'badge-trip',
        headerClass: 'ticket-header-trip',
        brandTitle: 'TRAVIO VERIFIED TRAVEL PASS',
        serviceLabel: 'PACKAGE TITLE',
        allocationLabel: 'TRAVELERS ALLOCATION'
      };
  }
};

export default function BookingsPage() {
  const navigate = useNavigate();
  const { bookings, cancelBooking, deleteBooking, showToast } = useTravel();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'confirmed' | 'cancelled'
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | 'FLIGHT' | 'TRAIN' | 'HOTEL' | 'BUS' | 'CAB' | 'EXPERIENCE'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [cancellationTarget, setCancellationTarget] = useState(null);
  const [cancellationReason, setCancellationReason] = useState('Change of travel schedule');

  // Filter bookings based on status, category, and search query
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      // 1. Status Filter
      const isConfirmed = String(b.status || '').toLowerCase() === 'confirmed';
      const isCancelled = String(b.status || '').toLowerCase() === 'cancelled';
      if (activeTab === 'confirmed' && !isConfirmed) return false;
      if (activeTab === 'cancelled' && !isCancelled) return false;

      // 2. Category Filter
      if (selectedCategory !== 'all') {
        const itemType = String(b.type || '').toUpperCase();
        if (selectedCategory === 'HOTEL' && (itemType === 'HOTEL' || itemType === 'STAY')) {
          // match
        } else if (itemType !== selectedCategory) {
          return false;
        }
      }

      // 3. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = String(b.title || '').toLowerCase().includes(q);
        const matchesDest = String(b.destinationName || '').toLowerCase().includes(q);
        const matchesOrigin = String(b.origin || '').toLowerCase().includes(q);
        const matchesCarrier = String(b.carrier || '').toLowerCase().includes(q);
        const matchesRef = String(b.id || '').toLowerCase().includes(q);
        const matchesSeats = String(b.seats || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesDest && !matchesOrigin && !matchesCarrier && !matchesRef && !matchesSeats) {
          return false;
        }
      }

      return true;
    });
  }, [bookings, activeTab, selectedCategory, searchQuery]);

  // Aggregate Metrics
  const confirmedCount = bookings.filter((b) => String(b.status || '').toLowerCase() === 'confirmed').length;
  const totalInvestment = bookings
    .filter((b) => String(b.status || '').toLowerCase() === 'confirmed')
    .reduce((sum, b) => sum + (Number(b.totalCost) || 0), 0);

  const handleCopyRef = (refId) => {
    if (!refId) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(refId);
      setCopiedRef(true);
      showToast?.(`Reference #${refId} copied to clipboard! 📋`, 'info');
      setTimeout(() => setCopiedRef(false), 2400);
    }
  };

  return (
    <div className="bookings-page-root">
      <Header />

      {/* Cinematic Hero Section */}
      <div className="bookings-hero-banner">
        <div className="bookings-hero-left">
          <div className="bookings-hero-avatar">
            <span className="material-symbols-rounded">luggage</span>
          </div>
          <div>
            <div className="bookings-title-row">
              <h1 className="bookings-main-title">{t('booking.myBookings', 'My Booked Journeys')}</h1>
              <span className="bookings-active-counter">
                {confirmedCount} Confirmed {confirmedCount === 1 ? 'Trip' : 'Trips'}
              </span>
            </div>
            <p className="bookings-hero-desc">
              Track live airline boarding passes, IRCTC rail reservations, luxury villa vouchers, and verified activities in real-time.
            </p>
          </div>
        </div>

        <div>
          <Link to="/booking" className="btn-book-new-trip">
            <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>
              airplane_ticket
            </span>
            <span>{t('phrases.Book New Trip', 'Book New Trip')}</span>
          </Link>
        </div>
      </div>

      <div style={{ padding: '0 5%' }}>
        {/* KPI Summary Cards */}
        <div className="bookings-kpi-grid">
          <div className="bookings-kpi-card">
            <div className="kpi-icon-wrap" style={{ background: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8' }}>
              <i className="fa-solid fa-plane-departure"></i>
            </div>
            <div>
              <span className="kpi-label">Total Bookings</span>
              <div className="kpi-value" style={{ color: 'var(--text-dark, #fff)' }}>
                {bookings.length}
              </div>
            </div>
          </div>

          <div className="bookings-kpi-card">
            <div className="kpi-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}>
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <div>
              <span className="kpi-label">Active / Confirmed</span>
              <div className="kpi-value" style={{ color: '#10b981' }}>
                {confirmedCount}
              </div>
            </div>
          </div>

          <div className="bookings-kpi-card">
            <div className="kpi-icon-wrap" style={{ background: 'rgba(168, 85, 247, 0.12)', color: '#a855f7' }}>
              <i className="fa-solid fa-receipt"></i>
            </div>
            <div>
              <span className="kpi-label">Total Package Value</span>
              <div className="kpi-value" style={{ color: 'var(--text-dark, #fff)' }}>
                ₹{totalInvestment.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div className="bookings-kpi-card">
            <div className="kpi-icon-wrap" style={{ background: 'rgba(244, 63, 94, 0.12)', color: '#f43f5e' }}>
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div>
              <span className="kpi-label">Travio Guarantee</span>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f43f5e', marginTop: '4px' }}>
                100% Verified Passes
              </div>
            </div>
          </div>
        </div>

        {/* Filter Navigation Panel */}
        <div className="bookings-controls-panel">
          <div className="bookings-filter-tabs-row">
            {/* Status Tabs */}
            <div className="status-tabs-group">
              <button
                type="button"
                className={`status-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                {t('phrases.All Trips', 'All Trips')} ({bookings.length})
              </button>
              <button
                type="button"
                className={`status-tab-btn ${activeTab === 'confirmed' ? 'confirmed-active' : ''}`}
                onClick={() => setActiveTab('confirmed')}
              >
                {t('phrases.Confirmed', 'Confirmed')} ({confirmedCount})
              </button>
              <button
                type="button"
                className={`status-tab-btn ${activeTab === 'cancelled' ? 'cancelled-active' : ''}`}
                onClick={() => setActiveTab('cancelled')}
              >
                {t('phrases.Cancelled', 'Cancelled')} ({bookings.length - confirmedCount})
              </button>
            </div>

            {/* Quick Search */}
            <div className="search-bookings-box">
              <span className="material-symbols-rounded">search</span>
              <input
                type="text"
                placeholder={t('phrases.Search by city, airline, PNR...', 'Search by city, airline, PNR...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: '16px' }}>
                    close
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="category-pills-row">
            <button
              type="button"
              className={`category-filter-chip ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              <span>🌐 {t('phrases.All Modes', 'All Modes')}</span>
            </button>
            <button
              type="button"
              className={`category-filter-chip ${selectedCategory === 'FLIGHT' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('FLIGHT')}
            >
              <span>✈️ {t('transport.flights', 'Flights')}</span>
            </button>
            <button
              type="button"
              className={`category-filter-chip ${selectedCategory === 'TRAIN' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('TRAIN')}
            >
              <span>🚆 {t('transport.trains', 'Trains')}</span>
            </button>
            <button
              type="button"
              className={`category-filter-chip ${selectedCategory === 'HOTEL' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('HOTEL')}
            >
              <span>🏨 {t('booking.stays', 'Stays & Villas')}</span>
            </button>
            <button
              type="button"
              className={`category-filter-chip ${selectedCategory === 'BUS' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('BUS')}
            >
              <span>🚌 {t('transport.buses', 'Intercity Buses')}</span>
            </button>
            <button
              type="button"
              className={`category-filter-chip ${selectedCategory === 'CAB' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('CAB')}
            >
              <span>🚕 {t('phrases.Cabs', 'Cabs & Taxis')}</span>
            </button>
            <button
              type="button"
              className={`category-filter-chip ${selectedCategory === 'EXPERIENCE' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('EXPERIENCE')}
            >
              <span>🎟️ {t('booking.activities', 'Experiences')}</span>
            </button>
          </div>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="bookings-empty-state">
            <div className="empty-state-icon-bubble">
              <span className="material-symbols-rounded">travel_explore</span>
            </div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-dark, #fff)', fontSize: '1.6rem', fontWeight: 800 }}>
              {t('phrases.No Trips Booked Yet', 'No Trips Booked Yet')}
            </h3>
            <p style={{ color: 'var(--text-muted, #94a3b8)', marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.6' }}>
              You haven't locked any itineraries yet. Compare live flights, high-speed rail, or boutique villas across India & the globe!
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/booking" className="btn-book-new-trip">
                <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>
                  airplane_ticket
                </span>
                <span>Book Flight, Train or Villa</span>
              </Link>
              <Link
                to="/wishlist"
                style={{
                  padding: '10px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-dark, #fff)',
                  borderRadius: '24px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '13px',
                  border: '1px solid var(--border-color, rgba(255,255,255,0.1))',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <i className="fa-solid fa-heart" style={{ color: '#f43f5e' }}></i>
                <span>View Wishlist</span>
              </Link>
            </div>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted, #94a3b8)' }}>
            <span className="material-symbols-rounded" style={{ fontSize: '3rem', opacity: 0.5 }}>
              filter_alt_off
            </span>
            <p style={{ fontSize: '1.1rem', marginTop: '1rem' }}>No trips match this filter or search query.</p>
            <button
              type="button"
              onClick={() => {
                setActiveTab('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              style={{
                marginTop: '0.5rem',
                background: 'rgba(56, 189, 248, 0.1)',
                color: '#38bdf8',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                padding: '6px 16px',
                borderRadius: '16px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 600
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="bookings-list-container">
            {filteredBookings.map((b) => {
              const meta = getCategoryMeta(b.type);
              const isConfirmed = String(b.status || '').toLowerCase() === 'confirmed';
              const isStay = b.type === 'HOTEL' || b.type === 'STAY';

              return (
                <div key={b.id} className="booking-item-card">
                  {/* Media Thumbnail */}
                  <div className="booking-card-media">
                    <img
                      src={
                        b.destinationImage ||
                        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80'
                      }
                      alt={b.destinationName || b.title}
                      className="booking-card-img"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80';
                      }}
                    />
                    {/* Category Badge Overlay */}
                    <div className={`booking-type-badge-overlay ${meta.badgeClass}`}>
                      <span className="material-symbols-rounded" style={{ fontSize: '14px' }}>
                        {meta.icon}
                      </span>
                      <span>{meta.label}</span>
                    </div>

                    <div className="booking-flag-overlay">
                      {b.destinationFlag || '🌍'} {b.destinationName || 'India'}
                    </div>
                  </div>

                  {/* Information Body */}
                  <div className="booking-card-info-col">
                    <div className="booking-title-bar">
                      <h3 className="booking-title-text">{b.title || b.destinationName}</h3>
                      <span
                        className={`booking-status-tag ${
                          isConfirmed ? 'status-tag-confirmed' : 'status-tag-cancelled'
                        }`}
                      >
                        {b.status}
                      </span>
                      <span className="booking-ref-code">REF: {b.id}</span>
                    </div>

                    {/* Route Line */}
                    <div className="booking-route-line">
                      {isStay ? (
                        <>
                          <span className="material-symbols-rounded" style={{ fontSize: '16px' }}>
                            location_on
                          </span>
                          <span>{b.origin || b.destinationName}</span>
                        </>
                      ) : (
                        <>
                          <span>{b.origin}</span>
                          <span className="booking-route-arrow">&rarr;</span>
                          <span>{b.destinationName}</span>
                        </>
                      )}
                    </div>

                    {/* Attributes Grid */}
                    <div className="booking-attrs-row">
                      {/* Dates */}
                      <div className="booking-attr-item">
                        <i className="fa-regular fa-calendar" style={{ color: '#38bdf8' }}></i>
                        <span>
                          <strong>{b.departureDate}</strong>
                          {b.returnDate && b.returnDate !== b.departureDate ? ` ➔ ${b.returnDate}` : ''}
                          {b.durationDays > 1 ? ` (${b.durationDays} Days)` : ''}
                        </span>
                      </div>

                      {/* Timings */}
                      {b.time && (
                        <div className="booking-attr-item">
                          <span className="material-symbols-rounded" style={{ color: '#10b981' }}>
                            schedule
                          </span>
                          <span>
                            <strong>{b.time}</strong>
                          </span>
                        </div>
                      )}

                      {/* Seat Allocation */}
                      {b.seats && (
                        <div className="booking-attr-item">
                          <span className="material-symbols-rounded" style={{ color: '#fbbf24' }}>
                            airline_seat_recline_extra
                          </span>
                          <span>{b.seats}</span>
                        </div>
                      )}

                      {/* Travelers */}
                      {b.travelers > 0 && (
                        <div className="booking-attr-item">
                          <i className="fa-solid fa-user-group" style={{ color: '#a855f7' }}></i>
                          <span>
                            {b.travelers} {b.travelers === 1 ? 'Traveler' : 'Travelers'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Notes & Amenities Callout */}
                    {b.specialNotes && (
                      <div className="booking-notes-callout">
                        <span>{b.specialNotes}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions & Price Column */}
                  <div className="booking-card-action-col">
                    <div className="booking-pricing-box">
                      <span className="pricing-label-tiny">Total Paid</span>
                      <div className="pricing-grand-total">₹{Number(b.totalCost).toLocaleString('en-IN')}</div>
                    </div>

                    <div className="booking-action-btns-row">
                      {/* Digital E-Ticket Pass Modal Trigger */}
                      <button
                        type="button"
                        className="btn-open-ticket"
                        onClick={() => setSelectedTicket(b)}
                        title="View & Print Official E-Ticket Pass"
                      >
                        <i className="fa-solid fa-ticket"></i>
                        <span>E-Ticket</span>
                      </button>

                      {/* Journal Memory Link */}
                      <button
                        type="button"
                        className="btn-dest-explore"
                        style={{
                          background: 'rgba(192, 132, 252, 0.12)',
                          color: '#c084fc',
                          borderColor: 'rgba(192, 132, 252, 0.3)'
                        }}
                        onClick={() => navigate(`/journal?new=true&tripId=${encodeURIComponent(b.id)}&destination=${encodeURIComponent(b.destinationName || b.title)}`)}
                        title="Write a travel story for this trip in your Journal"
                      >
                        <span className="material-symbols-rounded" style={{ fontSize: '15px' }}>menu_book</span>
                        <span>Journal</span>
                      </button>

                      {/* Destination Explore Link */}
                      {b.destinationId && (
                        <button
                          type="button"
                          className="btn-dest-explore"
                          onClick={() => navigate(`/destination/${b.destinationId}`)}
                          title="Explore destination guide & highlights"
                        >
                          Guide
                        </button>
                      )}

                      {/* Cancel / Delete Record */}
                      {isConfirmed ? (
                        <button
                          type="button"
                          className="btn-cancel-trip"
                          onClick={() => setCancellationTarget(b)}
                          title="Cancel Trip Reservation & View Refund Policy"
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn-remove-record"
                          onClick={() => deleteBooking(b.id)}
                          title="Remove Archived Record"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ==========================================================================
          DYNAMIC DIGITAL E-TICKET & BOARDING PASS MODAL
          ========================================================================== */}
      {selectedTicket && (
        <div className="ticket-modal-overlay" onClick={() => setSelectedTicket(null)}>
          <div className="ticket-modal-container" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const meta = getCategoryMeta(selectedTicket.type);
              const isStay = selectedTicket.type === 'HOTEL' || selectedTicket.type === 'STAY';
              const isFlight = selectedTicket.type === 'FLIGHT';
              const isTrain = selectedTicket.type === 'TRAIN';
              const isBus = selectedTicket.type === 'BUS';

              return (
                <>
                  {/* Modal Header Band */}
                  <div className={`ticket-header-band ${meta.headerClass}`}>
                    <div className="ticket-brand-topline">
                      <div className="ticket-brand-badge">
                        <span className="material-symbols-rounded">{meta.icon}</span>
                        <span>{meta.brandTitle}</span>
                      </div>
                      <button
                        type="button"
                        className="btn-close-ticket-modal"
                        onClick={() => setSelectedTicket(null)}
                        aria-label="Close Ticket"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>

                    <div className="ticket-service-subline">
                      <div>
                        <div className="ticket-service-main">
                          {selectedTicket.title || selectedTicket.destinationName}
                        </div>
                        <div className="ticket-carrier-name">
                          {selectedTicket.carrier || 'TRAVIO Verified Partner'}
                        </div>
                      </div>

                      <div className="ticket-ref-box">
                        <span className="ticket-ref-title">PNR / Booking Ref</span>
                        <div className="ticket-ref-number">{selectedTicket.id}</div>
                      </div>
                    </div>
                  </div>

                  {/* Journey Visual Track */}
                  <div className="ticket-journey-strip">
                    <div className="journey-node">
                      <div className="journey-node-code">{selectedTicket.origin}</div>
                      <div className="journey-node-sub">
                        {isFlight
                          ? 'Departure Airport'
                          : isTrain
                          ? 'Origin Station'
                          : isStay
                          ? 'Prime Location'
                          : isBus
                          ? 'Boarding Point'
                          : 'Pickup Point'}
                      </div>
                    </div>

                    <div className="journey-path-middle">
                      <span className="journey-duration-tag">
                        {selectedTicket.duration || (isStay ? 'Confirmed Stay' : 'Direct Express')}
                      </span>
                      <div className="journey-track-graphic">
                        <div className="journey-track-line"></div>
                        <span className="material-symbols-rounded journey-mode-icon">
                          {meta.icon}
                        </span>
                      </div>
                    </div>

                    <div className="journey-node right">
                      <div className="journey-node-code">{selectedTicket.destinationName}</div>
                      <div className="journey-node-sub">
                        {isFlight
                          ? 'Arrival Airport'
                          : isTrain
                          ? 'Destination Station'
                          : isStay
                          ? 'Retreat Destination'
                          : isBus
                          ? 'Drop-off Terminal'
                          : 'Drop Location'}
                      </div>
                    </div>
                  </div>

                  {/* Ticket Details Grid */}
                  <div className="ticket-details-body">
                    <div className="ticket-data-grid">
                      <div className="ticket-cell">
                        <span className="ticket-cell-label">PASSENGER / GUEST</span>
                        <div className="ticket-cell-val">Verified TRAVIO Explorer</div>
                      </div>

                      <div className="ticket-cell">
                        <span className="ticket-cell-label">{meta.allocationLabel}</span>
                        <div className="ticket-cell-val highlight">{selectedTicket.seats}</div>
                      </div>

                      <div className="ticket-cell">
                        <span className="ticket-cell-label">DEPARTURE / DATE</span>
                        <div className="ticket-cell-val">{selectedTicket.departureDate}</div>
                      </div>

                      <div className="ticket-cell">
                        <span className="ticket-cell-label">
                          {isStay ? 'CHECK-OUT DATE' : 'SCHEDULE / TIMINGS'}
                        </span>
                        <div className="ticket-cell-val">
                          {isStay ? selectedTicket.returnDate : selectedTicket.time}
                        </div>
                      </div>

                      <div className="ticket-cell">
                        <span className="ticket-cell-label">RESERVATION STATUS</span>
                        <div className="ticket-cell-val accent-green">
                          {String(selectedTicket.status || '').toLowerCase() === 'confirmed' ? 'CNF • Confirmed' : 'Cancelled'}
                        </div>
                      </div>

                      <div className="ticket-cell">
                        <span className="ticket-cell-label">GATE / PLATFORM</span>
                        <div className="ticket-cell-val">
                          {isFlight
                            ? 'Gate 4B • Terminal 3'
                            : isTrain
                            ? 'Platform #1 (Check Displays)'
                            : isStay
                            ? 'VIP Concierge Desk'
                            : 'Bay #3 (Terminal A)'}
                        </div>
                      </div>
                    </div>

                    {/* Special Notes & Amenities */}
                    {selectedTicket.specialNotes && (
                      <div className="ticket-inclusions-bar">
                        <span className="material-symbols-rounded">verified</span>
                        <span>{selectedTicket.specialNotes}</span>
                      </div>
                    )}
                  </div>

                  {/* Authentic Perforation Cutout */}
                  <div className="ticket-perforation-divider">
                    <div className="perf-notch-left"></div>
                    <div className="perf-dashed-line"></div>
                    <div className="perf-notch-right"></div>
                  </div>

                  {/* Barcode & Total Price Footer */}
                  <div className="ticket-barcode-footer">
                    <div className="ticket-fare-summary">
                      <span className="fare-title-sub">TOTAL AMOUNT PAID</span>
                      <div className="fare-total-number">
                        ₹{Number(selectedTicket.totalCost).toLocaleString('en-IN')}
                      </div>
                      <span className="fare-tax-tag">Inclusive of all GST, taxes & fees</span>
                    </div>

                    <div className="ticket-codes-group">
                      {/* Realistic Barcode Graphic */}
                      <div className="ticket-barcode-bars">
                        <div className="barcode-svg-pattern">
                          {[3, 1, 4, 2, 5, 1, 3, 4, 2, 5, 2, 4, 1, 3, 5, 2, 4, 1, 3, 5, 2, 4, 3, 1, 5, 2].map(
                            (width, i) => (
                              <span
                                key={i}
                                style={{
                                  width: `${width}px`,
                                  height: '32px',
                                  background: '#38bdf8',
                                  opacity: (i % 2 === 0) ? 0.9 : 0.4
                                }}
                              />
                            )
                          )}
                        </div>
                        <span className="barcode-sub-text">{selectedTicket.id}</span>
                      </div>

                      {/* Live Dynamic QR Code Server */}
                      <div className="ticket-qr-container">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=TRAVIO-${selectedTicket.id}-${selectedTicket.type}`}
                          alt="Ticket QR"
                          className="ticket-qr-img"
                        />
                        <span className="qr-verified-text">TRAVIO PASS</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="ticket-actions-bar">
                    <button
                      type="button"
                      className="btn-print-pass"
                      onClick={() => window.print()}
                      title="Print or Save PDF"
                    >
                      <i className="fa-solid fa-print"></i>
                      <span>Print / Save E-Ticket</span>
                    </button>

                    <button
                      type="button"
                      className="btn-dest-explore"
                      style={{
                        padding: '10px 18px',
                        background: 'rgba(192, 132, 252, 0.15)',
                        color: '#c084fc',
                        border: '1px solid rgba(192, 132, 252, 0.35)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontWeight: 600,
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        const tripId = selectedTicket.id;
                        const dest = selectedTicket.destinationName || selectedTicket.title;
                        setSelectedTicket(null);
                        navigate(`/journal?new=true&tripId=${encodeURIComponent(tripId)}&destination=${encodeURIComponent(dest)}`);
                      }}
                      title="Write a travel story for this ticket in your Journal"
                    >
                      <span className="material-symbols-rounded" style={{ fontSize: '16px' }}>menu_book</span>
                      <span>Story Journal</span>
                    </button>

                    <button
                      type="button"
                      className="btn-copy-ref"
                      onClick={() => handleCopyRef(selectedTicket.id)}
                      title="Copy Reference ID"
                    >
                      <span className="material-symbols-rounded" style={{ fontSize: '16px' }}>
                        {copiedRef ? 'check' : 'content_copy'}
                      </span>
                      <span>{copiedRef ? 'Copied!' : 'Copy Ref'}</span>
                    </button>

                    <button
                      type="button"
                      className="btn-close-pass"
                      onClick={() => setSelectedTicket(null)}
                    >
                      Close
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* ==========================================================================
          DYNAMIC CANCELLATION & REFUND BREAKDOWN MODAL (Aviation Regulation Compliance)
          ========================================================================== */}
      {cancellationTarget && (() => {
        const grossFare = Number(cancellationTarget.totalCost) || 0;
        const cancellationCharge = Math.round(grossFare * 0.15); // 15% cancellation fee
        const netRefund = Math.max(0, grossFare - cancellationCharge); // 85% net refund
        const refundArn = `TRV-ARN-${Math.floor(100000 + Math.random() * 900000)}`;

        const handleProcessCancellation = () => {
          cancelBooking(cancellationTarget.id);
          setCancellationTarget(null);
          showToast?.(
            `Cancellation confirmed for #${cancellationTarget.id}. Refund of ₹${netRefund.toLocaleString('en-IN')} initiated to original payment method (ARN: ${refundArn}).`,
            'info'
          );
        };

        return (
          <div className="ticket-modal-overlay" onClick={() => setCancellationTarget(null)}>
            <div
              className="ticket-modal-container"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '540px',
                padding: '32px 28px',
                background: 'linear-gradient(145deg, #181b24, #0f1218)',
                borderRadius: '24px',
                border: '1px solid rgba(244, 63, 94, 0.35)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 40px rgba(244, 63, 94, 0.15)',
                color: '#ffffff'
              }}
            >
              {/* Modal Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'rgba(244, 63, 94, 0.15)',
                      border: '1px solid rgba(244, 63, 94, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#f43f5e'
                    }}
                  >
                    <span className="material-symbols-rounded">cancel</span>
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Cancel Reservation</h3>
                    <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                      Airline Regulation & Refund Breakdown
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCancellationTarget(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>close</span>
                </button>
              </div>

              {/* Service & Ticket Target Card */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '16px',
                  marginBottom: '20px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '1.05rem', color: '#fff' }}>
                    {cancellationTarget.title || cancellationTarget.destinationName}
                  </strong>
                  <span
                    style={{
                      background: 'rgba(56, 189, 248, 0.15)',
                      color: '#38bdf8',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '6px'
                    }}
                  >
                    REF: {cancellationTarget.id}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <span><i className="fa-regular fa-calendar" style={{ marginRight: '6px', color: '#38bdf8' }}></i> {cancellationTarget.departureDate}</span>
                  {cancellationTarget.seats && <span><i className="fa-solid fa-couch" style={{ marginRight: '6px', color: '#a78bfa' }}></i> {cancellationTarget.seats}</span>}
                </div>
              </div>

              {/* Refund Calculation Breakdown Box */}
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '14px',
                  padding: '18px',
                  marginBottom: '20px'
                }}
              >
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                  Statutory Fare & Refund Computation
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Total Ticket Fare Paid</span>
                  <span style={{ fontWeight: 600 }}>₹{grossFare.toLocaleString('en-IN')}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                  <span style={{ color: '#f87171' }}>Airline Cancellation Fee (15% Deduction)</span>
                  <span style={{ fontWeight: 600, color: '#f87171' }}>- ₹{cancellationCharge.toLocaleString('en-IN')}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.9rem' }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Convenience Fee & Taxes</span>
                  <span style={{ fontWeight: 600, color: '#34d399' }}>Waived (₹0)</span>
                </div>

                <div
                  style={{
                    borderTop: '1px dashed rgba(255, 255, 255, 0.15)',
                    paddingTop: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline'
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '1rem', color: '#38bdf8' }}>Net Refund Amount</strong>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)' }}>85% of Gross Value Credited</div>
                  </div>
                  <strong style={{ fontSize: '1.4rem', color: '#38bdf8', fontWeight: 800 }}>
                    ₹{netRefund.toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>

              {/* Cancellation Reason Dropdown */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '6px' }}>
                  Reason for Cancellation
                </label>
                <select
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                >
                  <option value="Change of travel schedule" style={{ background: '#1e293b', color: '#fff' }}>Change of travel schedule</option>
                  <option value="Personal or medical emergency" style={{ background: '#1e293b', color: '#fff' }}>Personal or medical emergency</option>
                  <option value="Flight rescheduled or delayed by operator" style={{ background: '#1e293b', color: '#fff' }}>Flight rescheduled or delayed by operator</option>
                  <option value="Booked alternate flight / transport" style={{ background: '#1e293b', color: '#fff' }}>Booked alternate flight / transport</option>
                  <option value="Other reason" style={{ background: '#1e293b', color: '#fff' }}>Other reason</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setCancellationTarget(null)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Keep Reservation
                </button>

                <button
                  type="button"
                  onClick={handleProcessCancellation}
                  style={{
                    flex: 1.4,
                    padding: '12px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    border: 'none',
                    color: '#fff',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(239, 68, 68, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>check_circle</span>
                  <span>Confirm & Refund ₹{netRefund.toLocaleString('en-IN')}</span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
