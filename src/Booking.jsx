import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BookingBackground from './booking/BookingBackground';
import CategoryNav from './booking/CategoryNav';
import MoveSection from './booking/MoveSection';
import StaySection from './booking/StaySection';
import ExperienceSection from './booking/ExperienceSection';
import BookingCheckoutModal from './booking/BookingCheckoutModal';
import MyBookingsModal from './booking/MyBookingsModal';
import BookingsPage from './pages/BookingsPage';
import ToastNotification from './booking/ToastNotification';
import { getTodayDate, getFutureDate, formatDisplayDate } from './utils/dateUtils';
import { useTravel } from './context/TravelContext';
import { useLanguage } from './context/LanguageContext';
import { fetchBookingInventory } from './services/bookingService';
import './Booking.css';

// Default initial seeded bookings with dynamic latest dates for immediate CRUD demonstration
const getInitialSampleBookings = () => [
  {
    id: 'booking-seed-1',
    pnr: 'TRV-894218',
    type: 'FLIGHT',
    title: 'IndiGo Airlines (6E-204)',
    from: 'Delhi (DEL)',
    to: 'Goa (GOI)',
    date: getFutureDate(3),
    time: '06:15 AM - 08:45 AM',
    seatSummary: 'Seat 14A (Window)',
    passenger: {
      fullName: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      phone: '9876543210',
      age: '26',
      gender: 'Male'
    },
    amountPaid: 4850,
    paymentMethod: 'UPI (Google Pay)',
    status: 'CONFIRMED',
    bookingDate: formatDisplayDate(getTodayDate())
  },
  {
    id: 'booking-seed-2',
    pnr: 'TRV-731902',
    type: 'TRAIN',
    title: 'Vande Bharat Express (#22436)',
    from: 'New Delhi (NDLS)',
    to: 'Varanasi (BSB)',
    date: getFutureDate(10),
    time: '06:00 AM - 02:00 PM',
    seatSummary: 'Coach B2 (3A) • Lower Berth',
    passenger: {
      fullName: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      phone: '9876543210',
      age: '26',
      gender: 'Male'
    },
    amountPaid: 1750,
    paymentMethod: 'HDFC NetBanking',
    status: 'CONFIRMED',
    bookingDate: formatDisplayDate(getTodayDate())
  }
];

export default function Booking() {
  const travelContext = useTravel ? useTravel() : null;
  const { t } = useLanguage();
  // Main Category state: 'MOVE' | 'STAY' | 'EXPERIENCE'
  const [activeCategory, setActiveCategory] = useState('MOVE');

  // Checkout modal state for selected reservation / e-ticket
  const [selectedBookingItem, setSelectedBookingItem] = useState(null);
  const [viewingTicketItem, setViewingTicketItem] = useState(null);

  // My Bookings Manager Modal state
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  // Persistent Bookings Storage (CRUD: Read, Create, Update, Delete)
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('travio_user_bookings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // If any old bookings contain the stale September 2026 date, refresh to latest
          return parsed.map(b => {
            if (b.date === '2026-09-04' || (b.date && b.date.startsWith('2026-09-'))) {
              return { ...b, date: getFutureDate(4), bookingDate: formatDisplayDate(getTodayDate()) };
            }
            return b;
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
    return getInitialSampleBookings();
  });

  // Toast Notifications State
  const [toasts, setToasts] = useState([]);
  const [isInventorySynced, setIsInventorySynced] = useState(false);

  // Syllabus: Asynchronous dynamic inventory loading with Fetch API & useEffect
  useEffect(() => {
    let isMounted = true;
    const loadDynamicData = async () => {
      try {
        const inventory = await fetchBookingInventory();
        if (inventory && isMounted) {
          setIsInventorySynced(true);
        }
      } catch (err) {
        console.warn('Inventory sync note:', err);
      }
    };
    loadDynamicData();
    return () => { isMounted = false; };
  }, []);

  const addToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('travio_user_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeCategory]);

  // CRUD: CREATE
  const handleBookingComplete = (newBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
    if (travelContext && typeof travelContext.addBooking === 'function') {
      try {
        travelContext.addBooking({
          ...newBooking,
          departureDate: newBooking.date,
          origin: newBooking.from,
          destinationName: newBooking.to,
          totalCost: newBooking.amountPaid
        });
      } catch (e) {
        console.error(e);
      }
    }
    addToast('Reservation Confirmed! 🎉', `PNR ${newBooking.pnr} issued. E-ticket ready!`, 'success');
  };

  // CRUD: UPDATE
  const handleUpdateBooking = (id, updatedDetails) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              passenger: { ...b.passenger, ...updatedDetails }
            }
          : b
      )
    );
    addToast('Contact Info Updated', 'Passenger details successfully modified', 'info');
  };

  // CRUD: DELETE / CANCEL
  const handleCancelBooking = (id) => {
    const target = bookings.find((b) => b.id === id);
    const refundAmt = target ? Math.max(0, target.amountPaid - 300) : 0;

    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: 'CANCELLED' }
          : b
      )
    );

    addToast(
      'Reservation Cancelled',
      `Refund of ₹${refundAmt.toLocaleString()} initiated to original payment source.`,
      'warning'
    );
  };

  // View specific confirmed ticket
  const handleViewTicket = (bookingItem) => {
    setViewingTicketItem(bookingItem);
    setIsMyBookingsOpen(false);
  };

  const activeConfirmedCount = bookings.filter((b) => b.status === 'CONFIRMED').length;

  return (
    <div className="booking-page-root">
      {/* Toast Notification Container */}
      <ToastNotification toasts={toasts} onDismiss={handleDismissToast} />

      {/* Dynamic Ambient Travel Background */}
      <BookingBackground activeCategory={activeCategory} />

      {/* Shared Top-Right Header */}
      <Header />

      {/* Main Booking Operating System Content */}
      <div className="booking-content-container">
        {/* Hero Branding Header with Quick My Bookings Access */}
        <div className="booking-hero-header">
          <div className="booking-hero-top-row">
            <div className="booking-hero-pill">
              <span className="material-symbols-rounded">rocket_launch</span>
              <span>TRAVIO FAST-TRACK RESERVATION ENGINE</span>
            </div>

            {/* Quick Access to My Bookings Manager (CRUD) */}
            <Link
              to="/bookings"
              className="btn-my-bookings-trigger"
              title="Open My Bookings"
            >
              <i className="fa-solid fa-suitcase-rolling"></i>
              <span>{t('nav.myBookings', 'My Bookings')}</span>
              {activeConfirmedCount > 0 && (
                <span className="bookings-live-badge">{activeConfirmedCount}</span>
              )}
            </Link>
          </div>

          <h1 className="booking-hero-title">
            Your Next Journey, <span className="title-accent">Seamlessly Booked</span>
          </h1>
          <p className="booking-hero-subtitle">
            {t('booking.subtitle', 'Instant reservations for flights, luxury stays, scenic trains, intercity coaches, and chauffeur cabs.')}
          </p>
        </div>

        {/* 3 Main Categories: MOVE, STAY, EXPERIENCE */}
        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={(catId) => setActiveCategory(catId)}
        />

        {/* Dynamic Category Engine Views (All moving train/car/bus animations preserved!) */}
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

      {/* 1. Multi-Step Checkout Funnel & Proper Payment Gateway Modal */}
      {selectedBookingItem && (
        <BookingCheckoutModal
          item={selectedBookingItem}
          onClose={() => setSelectedBookingItem(null)}
          onBookingComplete={handleBookingComplete}
        />
      )}

      {/* 2. Direct E-Ticket View Modal */}
      {viewingTicketItem && (
        <BookingCheckoutModal
          item={viewingTicketItem}
          initialTicket={viewingTicketItem}
          onClose={() => setViewingTicketItem(null)}
        />
      )}

      {/* 3. My Bookings Manager Dashboard Modal (Full CRUD: View, Edit, Cancel) */}
      {isMyBookingsOpen && (
        <MyBookingsModal
          bookings={bookings}
          onClose={() => setIsMyBookingsOpen(false)}
          onCancelBooking={handleCancelBooking}
          onUpdateBooking={handleUpdateBooking}
          onViewTicket={handleViewTicket}
        />
      )}
    </div>
  );
}
