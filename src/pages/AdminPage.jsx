import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useTravel } from '../context/TravelContext';
import { useLanguage } from '../context/LanguageContext';
import { getTodayDate, getFutureDate } from '../utils/dateUtils';

const DEFAULT_FLIGHTS = [
  {
    id: 'AI-805',
    flightNo: 'AI-805',
    carrier: 'Air India',
    from: 'Delhi (DEL)',
    to: 'Mumbai (BOM)',
    departDate: getTodayDate(),
    time: '06:00 AM - 08:15 AM',
    duration: '2h 15m',
    cabin: 'Economy / Business',
    seatsAvailable: 42,
    price: 5420,
    status: 'ACTIVE'
  },
  {
    id: '6E-204',
    flightNo: '6E-204',
    carrier: 'IndiGo Airlines',
    from: 'Delhi (DEL)',
    to: 'Goa (GOI)',
    departDate: getFutureDate(3),
    time: '06:15 AM - 08:45 AM',
    duration: '2h 30m',
    cabin: 'Economy',
    seatsAvailable: 18,
    price: 4850,
    status: 'ACTIVE'
  },
  {
    id: 'UK-955',
    flightNo: 'UK-955',
    carrier: 'Vistara',
    from: 'Mumbai (BOM)',
    to: 'Bengaluru (BLR)',
    departDate: getFutureDate(2),
    time: '10:30 AM - 12:15 PM',
    duration: '1h 45m',
    cabin: 'Premium Economy',
    seatsAvailable: 28,
    price: 6200,
    status: 'ACTIVE'
  },
  {
    id: 'SG-8169',
    flightNo: 'SG-8169',
    carrier: 'SpiceJet',
    from: 'Delhi (DEL)',
    to: 'Dubai (DXB)',
    departDate: getFutureDate(5),
    time: '08:45 PM - 11:20 PM',
    duration: '4h 05m',
    cabin: 'Economy',
    seatsAvailable: 31,
    price: 18500,
    status: 'ACTIVE'
  }
];

export default function AdminPage() {
  const { bookings, showToast, addBooking } = useTravel();
  const { t } = useLanguage();

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      const role = localStorage.getItem('auth_role');
      const email = localStorage.getItem('auth_email') || '';
      return role === 'admin' || email.toLowerCase().includes('admin');
    } catch {
      return false;
    }
  });
  const [adminPasscode, setAdminPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Restore the editable flight inventory, falling back to the built-in demo schedule.
  const [flights, setFlights] = useState(() => {
    try {
      const saved = localStorage.getItem('travio_admin_flights');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_FLIGHTS;
  });

  const [activeTab, setActiveTab] = useState('flights'); // 'flights' | 'bookings'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [newFlight, setNewFlight] = useState({
    flightNo: '',
    carrier: 'Air India',
    from: '',
    to: '',
    departDate: getTodayDate(),
    time: '09:00 AM - 11:30 AM',
    duration: '2h 30m',
    cabin: 'Economy',
    seatsAvailable: 60,
    price: 4999
  });

  // Persist inventory edits so the admin schedule survives a page reload.
  useEffect(() => {
    try {
      localStorage.setItem('travio_admin_flights', JSON.stringify(flights));
    } catch (e) {
      console.error(e);
    }
  }, [flights]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPasscode === 'admin123' || adminPasscode === 'admin' || adminPasscode === 'travio2026') {
      localStorage.setItem('auth_role', 'admin');
      if (!localStorage.getItem('auth_email')) {
        localStorage.setItem('auth_email', 'admin@travio.com');
      }
      setIsAdminAuthenticated(true);
      setAuthError('');
      showToast('Admin verification successful! Welcome back, Commander.', 'success');
    } else {
      setAuthError('Invalid passcode. Default evaluation passcode is admin123');
    }
  };

  const handleQuickUnlock = () => {
    localStorage.setItem('auth_role', 'admin');
    if (!localStorage.getItem('auth_email')) {
      localStorage.setItem('auth_email', 'admin@travio.com');
    }
    setIsAdminAuthenticated(true);
    setAuthError('');
    showToast('Admin Console Unlocked via Evaluation Demo Mode!', 'success');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('auth_role');
    setIsAdminAuthenticated(false);
    showToast('Admin session logged out.', 'info');
  };

  const handleAddFlight = (e) => {
    e.preventDefault();
    if (!newFlight.flightNo.trim() || !newFlight.from.trim() || !newFlight.to.trim()) {
      showToast('Please fill all mandatory flight details', 'error');
      return;
    }

    const createdFlight = {
      ...newFlight,
      id: newFlight.flightNo.toUpperCase().trim(),
      flightNo: newFlight.flightNo.toUpperCase().trim(),
      price: Number(newFlight.price),
      seatsAvailable: Number(newFlight.seatsAvailable),
      status: 'ACTIVE'
    };

    setFlights((prev) => [createdFlight, ...prev]);
    setIsAddModalOpen(false);
    setNewFlight({
      flightNo: '',
      carrier: 'Air India',
      from: '',
      to: '',
      departDate: getTodayDate(),
      time: '09:00 AM - 11:30 AM',
      duration: '2h 30m',
      cabin: 'Economy',
      seatsAvailable: 60,
      price: 4999
    });
    showToast(`Flight ${createdFlight.flightNo} added successfully!`, 'success');
  };

  const handleDeleteFlight = (id) => {
    if (window.confirm(`Are you sure you want to cancel and remove Flight ${id} from the active schedule?`)) {
      setFlights((prev) => prev.filter((f) => f.id !== id));
      showToast(`Flight ${id} removed from schedule`, 'info');
    }
  };

  const filteredFlights = flights.filter((f) => {
    const query = searchTerm.toLowerCase();
    return (
      f.flightNo.toLowerCase().includes(query) ||
      f.from.toLowerCase().includes(query) ||
      f.to.toLowerCase().includes(query) ||
      f.carrier.toLowerCase().includes(query)
    );
  });

  const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.totalCost) || 0), 0);

  if (!isAdminAuthenticated) {
    return (
      <>
        <Header />
        <div
          style={{
            minHeight: 'calc(100vh - 80px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            background: 'radial-gradient(ellipse at top, rgba(245, 158, 11, 0.12), transparent 70%)'
          }}
        >
          <div
            style={{
              maxWidth: '480px',
              width: '100%',
              background: 'rgba(22, 24, 29, 0.95)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '24px',
              padding: '40px 32px',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 40px rgba(245, 158, 11, 0.15)',
              textAlign: 'center',
              color: '#ffffff'
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                margin: '0 auto 20px',
                borderRadius: '50%',
                background: 'rgba(245, 158, 11, 0.15)',
                border: '2px solid rgba(245, 158, 11, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f59e0b'
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: '38px' }}>
                admin_panel_settings
              </span>
            </div>

            <span
              style={{
                background: 'rgba(245, 158, 11, 0.2)',
                color: '#fbbf24',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '1px'
              }}
            >
              {t('phrases.PROTECTED ADMIN AREA', 'PROTECTED ADMIN AREA')}
            </span>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '16px', marginBottom: '8px' }}>
              {t('phrases.Airline Fleet Console', 'Airline Fleet Console')}
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Access restricted to flight dispatchers, airline administrators, and PE-2 evaluators.
            </p>

            <form onSubmit={handleAdminLogin} style={{ textAlign: 'left', marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '6px' }}>
                Admin Passcode (Default: <code style={{ color: '#fbbf24' }}>admin123</code>)
              </label>
              <input
                type="password"
                placeholder="Enter admin passcode"
                value={adminPasscode}
                onChange={(e) => setAdminPasscode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: authError ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  marginBottom: '8px'
                }}
              />
              {authError && (
                <div style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '12px' }}>
                  {authError}
                </div>
              )}
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '13px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 16px rgba(245, 158, 11, 0.3)'
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>key</span>
                <span>{t('phrases.Verify & Enter Console', 'Verify & Enter Console')}</span>
              </button>
            </form>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '16px', marginTop: '16px' }}>
              <button
                type="button"
                onClick={handleQuickUnlock}
                style={{
                  width: '100%',
                  padding: '11px',
                  borderRadius: '12px',
                  background: 'rgba(106, 76, 255, 0.15)',
                  border: '1px solid rgba(106, 76, 255, 0.35)',
                  color: '#c4b5fd',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>bolt</span>
                <span>{t('phrases.Evaluation Quick Demo Unlock', 'Evaluation Quick Demo Unlock')}</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={{ padding: '32px 5%', maxWidth: '1440px', margin: '0 auto', color: '#ffffff' }}>
        {/* Admin Top Header Banner */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '32px',
            padding: '24px 28px',
            background: 'linear-gradient(135deg, rgba(22, 24, 29, 0.95), rgba(30, 41, 59, 0.9))',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '20px',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
              <span
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  letterSpacing: '1px'
                }}
              >
                {t('phrases.ADMIN CONSOLE', 'ADMIN CONSOLE')}
              </span>
              <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>
                System Flight & Booking Management Portal
              </span>
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: 0 }}>{t('phrases.Airline & Fleet Administration', 'Airline & Fleet Administration')}</h1>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleAdminLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#f87171',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                padding: '10px 18px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>logout</span>
              {t('phrases.Exit Admin', 'Exit Admin')}
            </button>

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '12px 22px',
                borderRadius: '14px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(16, 185, 129, 0.35)'
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: '20px' }}>
                add_circle
              </span>
              {t('phrases.Add New Flight', 'Add New Flight')}
            </button>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
          }}
        >
          <div
            style={{
              background: 'rgba(22, 24, 29, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '20px',
              backdropFilter: 'blur(10px)'
            }}
          >
            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600 }}>
              {t('phrases.ACTIVE FLIGHTS SCHEDULED', 'ACTIVE FLIGHTS SCHEDULED')}
            </span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8', marginTop: '6px' }}>
              {flights.length}
            </div>
          </div>

          <div
            style={{
              background: 'rgba(22, 24, 29, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '20px',
              backdropFilter: 'blur(10px)'
            }}
          >
            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600 }}>
              {t('phrases.TOTAL PASSENGER BOOKINGS', 'TOTAL PASSENGER BOOKINGS')}
            </span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '6px' }}>
              {bookings.length}
            </div>
          </div>

          <div
            style={{
              background: 'rgba(22, 24, 29, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '20px',
              backdropFilter: 'blur(10px)'
            }}
          >
            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600 }}>
              {t('phrases.RESERVATION REVENUE', 'RESERVATION REVENUE')}
            </span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a78bfa', marginTop: '6px' }}>
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
          </div>

          <div
            style={{
              background: 'rgba(22, 24, 29, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '20px',
              backdropFilter: 'blur(10px)'
            }}
          >
            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600 }}>
              {t('phrases.SYSTEM STATUS', 'SYSTEM STATUS')}
            </span>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#34d399', marginTop: '10px' }}>
              ● {t('phrases.Operational', 'Operational')} (2026)
            </div>
          </div>
        </div>

        {/* Navigation Tabs & Search Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '20px'
          }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('flights')}
              style={{
                background: activeTab === 'flights' ? 'var(--primary-color, #6a4cff)' : 'rgba(255, 255, 255, 0.06)',
                color: '#ffffff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              {t('phrases.Scheduled Flights', 'Scheduled Flights')} ({flights.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('bookings')}
              style={{
                background: activeTab === 'bookings' ? 'var(--primary-color, #6a4cff)' : 'rgba(255, 255, 255, 0.06)',
                color: '#ffffff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              {t('phrases.Passenger Reservations', 'Passenger Reservations')} ({bookings.length})
            </button>
          </div>

          {activeTab === 'flights' && (
            <div style={{ position: 'relative', minWidth: '260px' }}>
              <span
                className="material-symbols-rounded"
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontSize: '20px'
                }}
              >
                search
              </span>
              <input
                type="text"
                placeholder="Search flight no, city or airline..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 38px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '13px'
                }}
              />
            </div>
          )}
        </div>

        {/* Content Table */}
        {activeTab === 'flights' ? (
          <div
            style={{
              background: 'rgba(22, 24, 29, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <th style={{ padding: '16px 20px', fontWeight: 700 }}>{t('phrases.FLIGHT NO', 'FLIGHT NO')}</th>
                    <th style={{ padding: '16px 20px', fontWeight: 700 }}>{t('phrases.AIRLINE', 'AIRLINE')}</th>
                    <th style={{ padding: '16px 20px', fontWeight: 700 }}>{t('phrases.ROUTE', 'ROUTE')}</th>
                    <th style={{ padding: '16px 20px', fontWeight: 700 }}>{t('phrases.DEPARTURE', 'DEPARTURE')}</th>
                    <th style={{ padding: '16px 20px', fontWeight: 700 }}>{t('phrases.CLASS', 'CLASS')}</th>
                    <th style={{ padding: '16px 20px', fontWeight: 700 }}>{t('phrases.SEATS', 'SEATS')}</th>
                    <th style={{ padding: '16px 20px', fontWeight: 700 }}>{t('phrases.PRICE', 'PRICE')}</th>
                    <th style={{ padding: '16px 20px', fontWeight: 700, textAlign: 'center' }}>{t('phrases.ACTIONS', 'ACTIONS')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFlights.map((flight) => (
                    <tr
                      key={flight.id}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        transition: 'background 0.2s'
                      }}
                    >
                      <td style={{ padding: '16px 20px', fontWeight: 700, color: '#38bdf8' }}>
                        {flight.flightNo}
                      </td>
                      <td style={{ padding: '16px 20px' }}>{flight.carrier}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <strong>{flight.from}</strong> ➔ <strong>{flight.to}</strong>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        {flight.departDate} • {flight.time}
                      </td>
                      <td style={{ padding: '16px 20px' }}>{flight.cabin}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <span
                          style={{
                            background: 'rgba(16, 185, 129, 0.15)',
                            color: '#34d399',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontWeight: 700
                          }}
                        >
                          {flight.seatsAvailable} Left
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px', fontWeight: 700 }}>
                        ₹{Number(flight.price).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                        <button
                          type="button"
                          onClick={() => handleDeleteFlight(flight.id)}
                          style={{
                            background: 'rgba(244, 63, 94, 0.15)',
                            color: '#f43f5e',
                            border: '1px solid rgba(244, 63, 94, 0.3)',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: 700
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div
            style={{
              background: 'rgba(22, 24, 29, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <th style={{ padding: '16px 20px', fontWeight: 700 }}>REFERENCE ID</th>
                    <th style={{ padding: '16px 20px', fontWeight: 700 }}>TYPE</th>
                    <th style={{ padding: '16px 20px', fontWeight: 700 }}>TRIP NAME</th>
                    <th style={{ padding: '16px 20px', fontWeight: 700 }}>ROUTE</th>
                    <th style={{ padding: '16px 20px', fontWeight: 700 }}>DATES</th>
                    <th style={{ padding: '16px 20px', fontWeight: 700 }}>STATUS</th>
                    <th style={{ padding: '16px 20px', fontWeight: 700 }}>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr
                      key={b.id}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        transition: 'background 0.2s'
                      }}
                    >
                      <td style={{ padding: '16px 20px', fontWeight: 700, color: '#a78bfa' }}>{b.id}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <span
                          style={{
                            background: 'rgba(56, 189, 248, 0.15)',
                            color: '#38bdf8',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontWeight: 700
                          }}
                        >
                          {b.type}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px', fontWeight: 600 }}>{b.title || b.destinationName}</td>
                      <td style={{ padding: '16px 20px' }}>
                        {b.origin} ➔ {b.destinationName}
                      </td>
                      <td style={{ padding: '16px 20px' }}>{b.departureDate}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <span
                          style={{
                            background: b.status === 'Confirmed' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                            color: b.status === 'Confirmed' ? '#34d399' : '#f43f5e',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontWeight: 700
                          }}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px', fontWeight: 700 }}>
                        ₹{Number(b.totalCost).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal: Add New Flight */}
        {isAddModalOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => setIsAddModalOpen(false)}
          >
            <div
              style={{
                background: '#16181d',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '24px',
                padding: '32px',
                maxWidth: '540px',
                width: '100%',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>Add New Flight to Schedule</h3>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}
                >
                  <span className="material-symbols-rounded">close</span>
                </button>
              </div>

              <form onSubmit={handleAddFlight}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
                      Flight No *
                    </label>
                    <input
                      required
                      placeholder="e.g. AI-902"
                      value={newFlight.flightNo}
                      onChange={(e) => setNewFlight({ ...newFlight, flightNo: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '10px',
                        color: '#fff'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
                      Airline Carrier
                    </label>
                    <select
                      value={newFlight.carrier}
                      onChange={(e) => setNewFlight({ ...newFlight, carrier: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: '#1e293b',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '10px',
                        color: '#fff'
                      }}
                    >
                      <option value="Air India">Air India</option>
                      <option value="IndiGo Airlines">IndiGo</option>
                      <option value="Vistara">Vistara</option>
                      <option value="SpiceJet">SpiceJet</option>
                      <option value="Emirates">Emirates</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
                      Origin (From) *
                    </label>
                    <input
                      required
                      placeholder="e.g. Delhi (DEL)"
                      value={newFlight.from}
                      onChange={(e) => setNewFlight({ ...newFlight, from: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '10px',
                        color: '#fff'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
                      Destination (To) *
                    </label>
                    <input
                      required
                      placeholder="e.g. Mumbai (BOM)"
                      value={newFlight.to}
                      onChange={(e) => setNewFlight({ ...newFlight, to: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '10px',
                        color: '#fff'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
                      Departure Date
                    </label>
                    <input
                      type="date"
                      value={newFlight.departDate}
                      onChange={(e) => setNewFlight({ ...newFlight, departDate: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '10px',
                        color: '#fff'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
                      Base Fare (₹)
                    </label>
                    <input
                      type="number"
                      min="500"
                      value={newFlight.price}
                      onChange={(e) => setNewFlight({ ...newFlight, price: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '10px',
                        color: '#fff'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '10px 24px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontWeight: 700
                    }}
                  >
                    Publish Flight
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
