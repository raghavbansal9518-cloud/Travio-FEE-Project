import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

export default function Header({ variant = '' }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('auth_email');
      localStorage.removeItem('auth_role');
      localStorage.removeItem('auth_password');
    } catch (e) {
      // ignore
    }
    setShowProfileMenu(false);
    navigate('/auth');
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && headerSearch.trim()) {
      navigate(`/explore?search=${encodeURIComponent(headerSearch.trim())}`);
    }
  };

  return (
    <header className={`top-header${variant ? ` top-header--${variant}` : ''}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 28px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', background: 'rgba(11, 15, 25, 0.75)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Search Input Bar (Omitted on Dashboard to avoid duplicate search) */}
      {variant === 'dashboard' ? (
        <div style={{ flex: 1 }} />
      ) : (
        <div style={{ flex: '1', maxWidth: '440px', position: 'relative' }}>
          <span 
            className="material-symbols-rounded" 
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '19px', color: '#8E93A1', pointerEvents: 'none' }}
          >
            search
          </span>
          <input 
            type="text" 
            placeholder={t('header.searchPlaceholder', 'Search destinations...')}
            value={headerSearch}
            onChange={(e) => setHeaderSearch(e.target.value)}
            onKeyDown={handleSearchSubmit}
            style={{
              width: '100%',
              padding: '9px 18px 9px 42px',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              fontSize: variant === 'journal' ? '15px' : '13px',
              outline: 'none',
              transition: 'border-color 0.2s ease, background 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#7c3aed';
              e.target.style.background = 'rgba(255, 255, 255, 0.08)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
          />
        </div>
      )}

      {/* Right Header Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        
        {/* 🔔 Clean Fast Notification Bell */}
        <div style={{ position: 'relative' }} ref={notificationRef}>
          <button 
            type="button" 
            aria-label="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: showNotifications ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              border: showNotifications ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
              color: showNotifications ? '#a5b4fc' : '#cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: showNotifications ? '0 0 16px rgba(99, 102, 241, 0.25)' : 'none'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = showNotifications ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.color = showNotifications ? '#a5b4fc' : '#cbd5e1';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: '20px' }}>notifications</span>
            
            {/* Minimalist Live Pulse Indicator Dot */}
            <span style={{
              position: 'absolute',
              top: '9px',
              right: '9px',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#38bdf8',
              boxShadow: '0 0 8px #38bdf8'
            }} />
          </button>

          {showNotifications && (
            <div 
              className="profile-dropdown-menu" 
              style={{ 
                display: 'block', 
                width: '300px', 
                right: 0, 
                padding: '16px', 
                borderRadius: '16px', 
                background: 'rgba(15, 23, 42, 0.96)', 
                border: '1px solid rgba(255, 255, 255, 0.12)', 
                boxShadow: '0 16px 36px rgba(0,0,0,0.6)', 
                backdropFilter: 'blur(20px)', 
                WebkitBackdropFilter: 'blur(20px)', 
                zIndex: 1000 
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                <span style={{ fontWeight: 700, fontSize: '13px', color: '#ffffff' }}>Notifications</span>
                <span style={{ fontSize: '11px', color: '#818cf8', cursor: 'pointer' }} onClick={() => setShowNotifications(false)}>Close</span>
              </div>
              <div style={{ fontSize: '12px', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)' }}>
                  <strong style={{ color: '#f59e0b' }}>🔥 Travel Deal:</strong> Flight & Villa packages to Bali start from ₹35,000 this October.
                </div>
                <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)' }}>
                  <strong style={{ color: '#38bdf8' }}>☀️ Weather Alert:</strong> Optimal autumn conditions for Ladakh and Shimla currently active.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 💜 Clean Fast Wishlist Heart */}
        <Link 
          to="/wishlist" 
          aria-label="Wishlist"
          title="Wishlist"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#cbd5e1',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(244, 63, 94, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.4)';
            e.currentTarget.style.color = '#fb7185';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 0 16px rgba(244, 63, 94, 0.25)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = '#cbd5e1';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: '20px' }}>favorite</span>
        </Link>

        {/* 🌐 Language Switcher Dropdown */}
        <LanguageSelector />

        {/* 🟣 User Profile Button & Dropdown (Options: Profile and Logout) */}
        <div 
          className={`profile-dropdown-container ${showProfileMenu ? 'open' : ''}`} 
          style={{ position: 'relative' }} 
          ref={profileRef}
        >
          <button 
            type="button" 
            className="profile-link" 
            onClick={() => setShowProfileMenu((prev) => !prev)}
            aria-expanded={showProfileMenu}
            aria-label="User Profile and Menu"
            style={{ 
              background: showProfileMenu ? 'rgba(255, 255, 255, 0.08)' : 'transparent', 
              border: 'none', 
              borderRadius: '24px', 
              padding: '4px 10px 4px 4px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            }}
            onMouseOut={(e) => {
              if (!showProfileMenu) e.currentTarget.style.background = 'transparent';
            }}
          >
            <div 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(124, 58, 237, 0.4)'
              }}
            >
              RB
            </div>
            <span style={{ fontSize: variant === 'journal' ? '15px' : '13px', fontWeight: 600, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Raghav <i className={`fa-solid ${showProfileMenu ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ fontSize: '10px', color: '#94a3b8', transition: 'transform 0.2s ease' }}></i>
            </span>
          </button>
          
          {showProfileMenu && (
            <div 
              className="profile-dropdown-menu" 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                position: 'absolute', 
                top: 'calc(100% + 8px)', 
                right: 0, 
                width: '200px', 
                padding: '8px', 
                borderRadius: '16px', 
                background: 'rgba(15, 23, 42, 0.98)', 
                border: '1px solid rgba(255, 255, 255, 0.14)', 
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)', 
                backdropFilter: 'blur(20px)', 
                WebkitBackdropFilter: 'blur(20px)', 
                zIndex: 1000, 
                gap: '4px',
                opacity: 1,
                visibility: 'visible',
                transform: 'none',
                pointerEvents: 'auto'
              }}
            >
              {/* User Header Info Card */}
              <div style={{ padding: '8px 12px 10px 12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '4px' }}>
                <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#ffffff' }}>Raghav</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>raghav@travio.io</div>
              </div>

              {/* Option 1: Profile */}
              <button
                type="button"
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate('/profile');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'transparent',
                  color: '#e2e8f0',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(99, 102, 241, 0.15)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#e2e8f0';
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: '19px', color: '#818cf8' }}>person</span>
                <span>{t('settings.profileTab', 'Profile')}</span>
              </button>

              {/* Option 2: Logout (Takes user to Login page /auth) */}
              <button
                type="button"
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'transparent',
                  color: '#f43f5e',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(244, 63, 94, 0.14)';
                  e.currentTarget.style.color = '#fb7185';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#f43f5e';
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: '19px', color: '#f43f5e' }}>logout</span>
                <span>{t('header.logout', 'Logout')}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
