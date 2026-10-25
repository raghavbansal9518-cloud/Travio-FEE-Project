import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import { useTravel } from '../context/TravelContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  getCurrentTime12, 
  getCurrentTime24, 
  timeToMinutes, 
  minutesToTime12, 
  calculateArrivalTime, 
  getTimeStatusBadge 
} from '../utils/dateUtils';

const TRANSPORT_ROUTES = [
  {
    id: 'tr-fl-1',
    mode: 'flight',
    operator: 'Air India / Vistara',
    logo: 'fa-plane',
    routeNumber: 'AI-883 / UK-945',
    origin: 'New Delhi (DEL)',
    destination: 'Goa Dabolim (GOI)',
    departure: '06:15 AM',
    arrival: '08:50 AM',
    duration: '2h 35m (Direct)',
    price: 4850,
    tags: ['Complimentary Meal', 'Cabin 7kg + Check-in 15kg']
  },
  {
    id: 'tr-fl-2',
    mode: 'flight',
    operator: 'IndiGo 6E',
    logo: 'fa-plane-departure',
    routeNumber: '6E-2054',
    origin: 'New Delhi (DEL)',
    destination: 'Kullu-Manali (KUU)',
    departure: '07:45 AM',
    arrival: '09:05 AM',
    duration: '1h 20m (Direct Scenic ATR)',
    price: 6200,
    tags: ['Mountain View Window Guaranteed', 'Pint Refreshment']
  },
  {
    id: 'tr-tr-1',
    mode: 'train',
    operator: 'Indian Railways (Vande Bharat Express)',
    logo: 'fa-train-subway',
    routeNumber: '22447 VB Express',
    origin: 'New Delhi (NDLS)',
    destination: 'Chandigarh / Una Himachal',
    departure: '05:50 AM',
    arrival: '08:45 AM',
    duration: '2h 55m (160 km/h)',
    price: 1350,
    tags: ['AC Executive Chair Car', 'Breakfast & Wi-Fi Included']
  },
  {
    id: 'tr-tr-2',
    mode: 'train',
    operator: 'UNESCO Kalka-Shimla Toy Train (Him Darshan)',
    logo: 'fa-train',
    routeNumber: '52459 Mountain Deluxe',
    origin: 'Kalka Junction',
    destination: 'Shimla Station',
    departure: '07:00 AM',
    arrival: '12:15 PM',
    duration: '5h 15m (102 Tunnels Vista)',
    price: 630,
    tags: ['Glass Panoramic Roof', 'Heritage Railway']
  },
  {
    id: 'tr-tr-3',
    mode: 'train',
    operator: 'JR Tokaido Shinkansen (Nozomi Bullet Train)',
    logo: 'fa-bolt',
    routeNumber: 'Nozomi #23',
    origin: 'Tokyo Station',
    destination: 'Kyoto Station',
    departure: '08:00 AM',
    arrival: '10:15 AM',
    duration: '2h 15m (300 km/h)',
    price: 8400,
    tags: ['Mount Fuji Right-Side View', 'High-Speed Wi-Fi']
  },
  {
    id: 'tr-bs-1',
    mode: 'bus',
    operator: 'Him-Aanchal Luxury Multi-Axle Scania',
    logo: 'fa-bus',
    routeNumber: 'Volvo Gold Class',
    origin: 'Delhi Kashmiri Gate',
    destination: 'Manali Mall Road Private Stand',
    departure: '07:30 PM',
    arrival: '08:00 AM (Next Day)',
    duration: '12h 30m (Overnight Sleeper)',
    price: 1850,
    tags: ['Blanket & Mineral Water', 'Live GPS Tracking']
  },
  {
    id: 'tr-bs-2',
    mode: 'bus',
    operator: 'Glacier Express Scenic Alpine Panorama',
    logo: 'fa-train-tram',
    routeNumber: 'GEX-902',
    origin: 'Zermatt, Switzerland',
    destination: 'St. Moritz, Switzerland',
    departure: '08:52 AM',
    arrival: '04:38 PM',
    duration: '7h 46m (291 Bridges & 91 Tunnels)',
    price: 14200,
    tags: ['3-Course Gourmet Lunch at Seat', 'Audioguide']
  }
];

export default function TransportPage() {
  const { addBooking, showToast } = useTravel();
  const { t } = useLanguage();
  const [activeMode, setActiveMode] = useState('all');
  const [fromCity, setFromCity] = useState('New Delhi');
  const [toCity, setToCity] = useState('');
  const [selectedRoute, setSelectedRoute] = useState(null);

  const currentTime12 = getCurrentTime12();
  const nowMins = timeToMinutes(getCurrentTime24());

  const filteredRoutes = TRANSPORT_ROUTES.filter((r) => {
    const matchesMode = activeMode === 'all' || r.mode === activeMode;
    const matchesQuery = !toCity.trim() || 
      r.origin.toLowerCase().includes(toCity.toLowerCase()) ||
      r.destination.toLowerCase().includes(toCity.toLowerCase()) ||
      r.operator.toLowerCase().includes(toCity.toLowerCase());
    return matchesMode && matchesQuery;
  });

  // Calculate live upcoming departures from present time onwards
  const processedRoutes = useMemo(() => {
    return filteredRoutes.map((route, idx) => {
      const origDepMins = timeToMinutes(route.departure);
      let depTime = route.departure;
      let arrTime = route.arrival;

      // If scheduled time has already passed today, generate next upcoming slot
      if (origDepMins <= nowMins + 10) {
        const nextDepMins = nowMins + 20 + (idx * 35);
        depTime = minutesToTime12(nextDepMins);
        arrTime = calculateArrivalTime(depTime, route.duration);
      }

      const badge = getTimeStatusBadge(depTime);
      return {
        ...route,
        computedDeparture: depTime,
        computedArrival: arrTime,
        badge
      };
    });
  }, [filteredRoutes, nowMins]);

  const handleBookTicket = (route) => {
    setSelectedRoute(route);
    const bookingType = route.mode === 'flight' ? 'FLIGHT' : route.mode === 'train' ? 'TRAIN' : 'BUS';
    const depTime = route.computedDeparture || route.departure;
    const arrTime = route.computedArrival || route.arrival;
    const newBooking = {
      id: `TRV-${bookingType.slice(0, 2)}-${Date.now().toString(36).toUpperCase()}`,
      type: bookingType,
      title: `${route.operator} (${route.routeNumber})`,
      carrier: route.operator,
      origin: route.origin,
      destinationName: route.destination,
      destinationCountry: `${route.origin} → ${route.destination}`,
      destinationFlag: route.mode === 'flight' ? '✈️' : route.mode === 'train' ? '🚆' : '🚌',
      destinationImage: route.mode === 'flight' 
        ? 'https://images.unsplash.com/photo-1540339832862-474599807836?w=800&auto=format&fit=crop&q=80'
        : route.mode === 'train'
        ? 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80',
      departureDate: new Date().toISOString().split('T')[0],
      returnDate: new Date(Date.now() + 6 * 86400000).toISOString().split('T')[0],
      time: `${depTime} - ${arrTime} (${route.duration})`,
      duration: route.duration,
      durationDays: 1,
      travelers: 1,
      seats: route.mode === 'flight' ? 'Seat 14C • Standard' : route.mode === 'train' ? 'Coach B3 • Berth 42' : 'Seat 18 • Window',
      travelStyle: bookingType,
      totalCost: route.price,
      specialNotes: route.tags.join(' • '),
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    addBooking(newBooking);
    showToast(`Reserved ticket on ${route.operator} (${route.origin} → ${route.destination})! Saved to My Bookings 🎟️`, 'success');
  };

  return (
    <>
      <Header />
      <div style={{ padding: '0 0 5rem 0', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-dark)' }}>
        
        {/* Header Banner */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(124, 58, 237, 0.08) 100%)', 
          padding: '3.5rem 5%', 
          marginBottom: '2.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
            <div style={{
              width: '76px',
              height: '76px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(6, 182, 212, 0.35)',
              flexShrink: 0
            }}>
              <span className="material-symbols-rounded" style={{ fontSize: '2.5rem', color: '#fff' }}>
                directions_bus
              </span>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: 0, color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>
                  {t('transport.title', 'Smart Transport Hub')}
                </h1>
                <span style={{ 
                  background: 'rgba(6, 182, 212, 0.15)', 
                  color: '#38bdf8', 
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  padding: '4px 12px', 
                  borderRadius: '999px', 
                  fontSize: '13px', 
                  fontWeight: 700 
                }}>
                  {t('transport.liveStatus', 'Live Route Schedules')}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', margin: '6px 0 0 0', fontSize: '1rem', maxWidth: '620px' }}>
                {t('Compare flights, Vande Bharat trains, UNESCO heritage toy trains, Shinkansen bullet trains, and mountain luxury Volvo buses.')}
              </p>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder={t('header.searchPlaceholder', 'Search destination or train/flight...')}
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-dark)',
                padding: '11px 18px 11px 42px',
                borderRadius: '24px',
                fontSize: '13px',
                outline: 'none',
                minWidth: '260px'
              }}
            />
            <span className="material-symbols-rounded" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px', color: 'var(--text-muted)' }}>
              search
            </span>
          </div>
        </div>

        <div style={{ padding: '0 5%' }}>
          
          {/* Mode Selector Tabs */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            {[
              { id: 'all', label: t('common.all', 'All Modes'), icon: 'fa-globe' },
              { id: 'flight', label: t('booking.flights', 'Domestic & Intl Flights'), icon: 'fa-plane' },
              { id: 'train', label: t('booking.trains', 'Express & Toy Trains'), icon: 'fa-train' },
              { id: 'bus', label: t('booking.buses', 'Luxury Volvo & Panoramic'), icon: 'fa-bus' }
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                style={{
                  background: activeMode === mode.id ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' : 'rgba(255, 255, 255, 0.04)',
                  color: activeMode === mode.id ? '#ffffff' : 'var(--text-muted)',
                  border: activeMode === mode.id ? 'none' : '1px solid var(--border-color)',
                  padding: '10px 18px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: activeMode === mode.id ? '0 4px 14px rgba(6, 182, 212, 0.3)' : 'none'
                }}
              >
                <i className={`fa-solid ${mode.icon}`}></i>
                <span>{mode.label}</span>
              </button>
            ))}
          </div>

          {/* Real-time Schedule Live Banner */}
          <div className="live-current-time-banner" style={{ margin: '0 0 1.5rem 0' }}>
            <div className="banner-left-info">
              <span className="material-symbols-rounded live-clock-icon">schedule</span>
              <span>
                {t('Current Real-Time Clock:')} <strong style={{ color: '#38bdf8' }}>{currentTime12}</strong> — {t('Schedules strictly calculated from present moment onwards')}
              </span>
            </div>
            <span className="live-status-pill">
              <span className="live-pulse-dot"></span>
              {t('Live Dispatch Active')}
            </span>
          </div>

          {/* Transport Routes List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {processedRoutes.map((route) => (
              <div
                key={route.id}
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '18px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Operator info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '220px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '14px',
                    background: route.mode === 'flight' ? 'rgba(56, 189, 248, 0.15)' : route.mode === 'train' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                    color: route.mode === 'flight' ? '#38bdf8' : route.mode === 'train' ? '#a855f7' : '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px'
                  }}>
                    <i className={`fa-solid ${route.logo}`}></i>
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                      {route.operator}
                    </h3>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {route.routeNumber}
                    </span>
                  </div>
                </div>

                {/* Timings and Schedule */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: '1 1 300px' }}>
                  <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                      {route.computedDeparture || route.departure}
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{route.origin}</span>
                    {route.badge && (
                      <div>
                        <span style={{
                          background: route.badge.isUrgent ? 'rgba(245, 158, 11, 0.15)' : 'rgba(56, 189, 248, 0.12)',
                          border: route.badge.isUrgent ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(56, 189, 248, 0.3)',
                          color: route.badge.isUrgent ? '#fbbf24' : '#38bdf8',
                          padding: '2px 8px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          marginTop: '4px'
                        }}>
                          <span className="live-pulse-dot" style={{ background: route.badge.isUrgent ? '#f59e0b' : '#38bdf8', width: '5px', height: '5px' }}></span>
                          {route.badge.label}
                        </span>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      {route.duration}
                    </span>
                    <div style={{ width: '100%', height: '2px', background: 'rgba(255, 255, 255, 0.1)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ position: 'absolute', width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8' }}></div>
                    </div>
                    <span style={{ fontSize: '10px', color: '#10b981', marginTop: '4px', fontWeight: 600 }}>{t('On Schedule')}</span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                      {route.computedArrival || route.arrival}
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{route.destination}</span>
                  </div>
                </div>

                {/* Tags and price */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', minWidth: '220px', justifyContent: 'flex-end' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{t('Starting from')}</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#38bdf8' }}>
                      ₹{route.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleBookTicket(route)}
                    style={{
                      background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(6, 182, 212, 0.3)'
                    }}
                  >
                    {t('Select Fare', 'Select Fare')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
