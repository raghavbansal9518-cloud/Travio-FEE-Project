import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  return (
    <header className="top-header">
      <div className="logo-placeholder" style={{ flex: 1 }}></div>

      <div className="header-actions">
        {/* ☀️ Theme / Sun Button */}
        <button 
          type="button" 
          className="theme-button" 
          aria-label="Change theme"
          onClick={() => setIsLightMode(!isLightMode)}
          title="Toggle Theme"
        >
          <span className="material-symbols-rounded">
            {isLightMode ? 'dark_mode' : 'light_mode'}
          </span>
        </button>

        {/* 🔔 Notification Bell Button */}
        <div style={{ position: 'relative' }}>
          <button 
            type="button" 
            className="notification-button" 
            aria-label="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <span className="material-symbols-rounded">notifications</span>
          </button>

          {showNotifications && (
            <div className="profile-dropdown-menu" style={{ display: 'block', width: '280px', right: 0, padding: '12px' }}>
              <div style={{ fontWeight: 700, fontSize: '13px', color: '#ffffff', marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '6px' }}>
                Notifications
              </div>
              <div style={{ fontSize: '12px', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div><strong>🔥 Bali Special:</strong> Flight & Villa packages starting ₹35,000.</div>
                <div><strong>☀️ Weather Alert:</strong> Best season to visit Switzerland & Greece now active.</div>
              </div>
            </div>
          )}
        </div>

        {/* 🟣 Circular "TR" Profile Avatar + Dropdown */}
        <div className="profile-dropdown-container" style={{ position: 'relative' }}>
          <Link to="/profile" className="profile-link">
            <div 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(168, 85, 247, 0.4)'
              }}
            >
              TR
            </div>
            <span>Profile</span>
          </Link>
          
          {/* Glass Dropdown Profile Menu */}
          <div className="profile-dropdown-menu">
            <Link to="/profile">My Profile</Link>
            <Link to="/bookings">My Bookings</Link>
            <Link to="/membership">Membership</Link>
            <Link to="/support">Support</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/" style={{ color: '#F43F5E' }}>Logout</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
