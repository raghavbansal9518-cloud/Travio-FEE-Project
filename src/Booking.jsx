import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BookingBackground from './booking/BookingBackground';
import CategoryNav from './booking/CategoryNav';
import MoveSection from './booking/MoveSection';
import StaySection from './booking/StaySection';
import ExperienceSection from './booking/ExperienceSection';
import BookingResultModal from './booking/BookingResultModal';
import './Booking.css';

export default function Booking() {
  // Main Category state: 'MOVE' | 'STAY' | 'EXPERIENCE'
  const [activeCategory, setActiveCategory] = useState('MOVE');

  // Modal state for selected reservation / e-ticket
  const [selectedBookingItem, setSelectedBookingItem] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeCategory]);

  return (
    <div className="booking-page-root">
      {/* Dynamic Ambient Travel Background */}
      <BookingBackground activeCategory={activeCategory} />

      {/* Shared Top-Right Header (Sun/Theme, Notifications Bell, Purple TR Avatar) */}
      <Header />

      {/* Main Booking Operating System Content */}
      <div className="booking-content-container">
        {/* Hero Branding Header */}
        <div className="booking-hero-header">
          <div className="booking-hero-pill">
            <span className="material-symbols-rounded">rocket_launch</span>
            <span>TRAVIO FAST-TRACK RESERVATION ENGINE</span>
          </div>
          <h1 className="booking-hero-title">
            Your Next Journey, <span className="title-accent">Seamlessly Booked</span>
          </h1>
          <p className="booking-hero-subtitle">
            Compare live flights, high-speed rail, premium coaches, chauffeur cabs, luxury villas, and exclusive attraction passes in real-time.
          </p>
        </div>

        {/* 3 Main Categories: MOVE, STAY, EXPERIENCE */}
        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={(catId) => setActiveCategory(catId)}
        />

        {/* Dynamic Category Engine Views */}
        <div className="booking-active-category-viewport">
          {activeCategory === 'MOVE' && (
            <MoveSection onSelectBookingItem={(item) => setSelectedBookingItem(item)} />
          )}

          {activeCategory === 'STAY' && (
            <StaySection onSelectBookingItem={(item) => setSelectedBookingItem(item)} />
          )}

          {activeCategory === 'EXPERIENCE' && (
            <ExperienceSection onSelectBookingItem={(item) => setSelectedBookingItem(item)} />
          )}
        </div>
      </div>

      {/* E-Ticket & Confirmation Modal */}
      {selectedBookingItem && (
        <BookingResultModal
          item={selectedBookingItem}
          onClose={() => setSelectedBookingItem(null)}
        />
      )}
    </div>
  );
}
