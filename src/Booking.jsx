import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import BookingBackground from './booking/BookingBackground';
import CategoryNav from './booking/CategoryNav';
import MoveSection from './booking/MoveSection';
import StaySection from './booking/StaySection';
import ExperienceSection from './booking/ExperienceSection';
import BookingCheckoutModal from './booking/BookingCheckoutModal';
import MyBookingsModal from './booking/MyBookingsModal';
import ToastNotification from './booking/ToastNotification';
import { useTravel } from './context/TravelContext';
import { useLanguage } from './context/LanguageContext';
import { fetchBookingInventory } from './services/bookingService';
import './Booking.css';

// Coordinate booking inventory, shared booking actions, and checkout modals.
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

  // Adapt shared booking records once per context update for the legacy manager's view.
  const bookings = useMemo(() => (travelContext?.bookings || []).map((booking) => ({
    ...booking,
    pnr: booking.pnr || booking.bookingRef || booking.id,
    from: booking.from || booking.origin || '',
    to: booking.to || booking.destinationName || '',
    date: booking.date || booking.departureDate || '',
    amountPaid: booking.amountPaid || booking.totalCost || booking.price || 0,
    seatSummary: booking.seatSummary || booking.seats || ''
  })), [travelContext?.bookings]);

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

  // Add a dismissible local notification to the booking experience.
  const addToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Remove one notification from the local toast stack.
  const handleDismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeCategory]);

  // Persist a confirmed checkout through the shared travel context.
  const handleBookingComplete = (newBooking) => {
    try {
      if (typeof travelContext?.addBooking !== 'function') {
        throw new Error('Booking storage is unavailable.');
      }
      travelContext.addBooking({
        ...newBooking,
        departureDate: newBooking.date,
        origin: newBooking.from,
        destinationName: newBooking.to,
        totalCost: newBooking.amountPaid
      });
      addToast('Reservation Confirmed! 🎉', `PNR ${newBooking.pnr} issued. E-ticket ready!`, 'success');
      return true;
    } catch (error) {
      addToast('Booking could not be saved', error.message || 'Please try again.', 'error');
      return false;
    }
  };

  // Persist passenger edits through the same shared booking source.
  const handleUpdateBooking = (id, updatedDetails) => {
    try {
      travelContext.updateBooking(id, updatedDetails);
      addToast('Contact Info Updated', 'Passenger details successfully modified', 'info');
    } catch (error) {
      addToast('Update failed', error.message || 'Please try again.', 'error');
    }
  };

  // Cancel after confirmation and report success only after persistence.
  const handleCancelBooking = async (id) => {
    const target = bookings.find((b) => b.id === id);
    if (!target || ['CANCELLED', 'CANCELED'].includes(String(target.status || '').toUpperCase())) {
      addToast('Cancellation unavailable', 'This booking is missing or already cancelled.', 'error');
      return false;
    }
    const refundAmt = target ? Math.max(0, target.amountPaid - 300) : 0;

    try {
      if (typeof travelContext?.cancelBooking !== 'function') {
        throw new Error('Booking cancellation is unavailable.');
      }
      await travelContext.cancelBooking(id);

      addToast(
        'Reservation Cancelled',
        `Refund of ₹${refundAmt.toLocaleString()} initiated to original payment source.`,
        'warning'
      );
      return true;
    } catch (error) {
      addToast('Cancellation failed', error.message || 'Please try again.', 'error');
      return false;
    }
  };

  // Open the ticket modal for the selected eligible booking.
  const handleViewTicket = (bookingItem) => {
    setViewingTicketItem(bookingItem);
    setIsMyBookingsOpen(false);
  };

  const confirmedFlightBookingsCount = travelContext?.confirmedFlightBookingsCount ?? 0;

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
              <span>{t('phrases.TRAVIO FAST-TRACK RESERVATION ENGINE', 'TRAVIO FAST-TRACK RESERVATION ENGINE')}</span>
            </div>

            {/* Quick Access to My Bookings Manager (CRUD) */}
            <Link
              to="/bookings"
              className="btn-my-bookings-trigger"
              title="Open My Bookings"
            >
              <i className="fa-solid fa-suitcase-rolling"></i>
              <span>{t('nav.myBookings', 'My Bookings')}</span>
              <span className="bookings-live-badge">{confirmedFlightBookingsCount}</span>
            </Link>
          </div>

          <h1 className="booking-hero-title">{t('phrases.Your Next Journey, Seamlessly Booked', 'Your Next Journey, Seamlessly Booked')}</h1>
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
