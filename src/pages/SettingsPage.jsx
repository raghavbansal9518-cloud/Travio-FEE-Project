import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BadgeArtwork from '../components/BadgeArtwork';
import { BADGE_DEFINITIONS, loadBadgeAchievements } from '../services/badgeService';
import { useTravel } from '../context/TravelContext';
import { useLanguage } from '../context/LanguageContext';
import { getCurrentTime12 } from '../utils/dateUtils';

const DEFAULT_PROFILE = {
  name: 'Raghav',
  email: 'raghav@travio.io',
  phone: '+91 98765 43210',
  homeCity: 'New Delhi (DEL)',
  passportNumber: 'Z8924018',
  preferredSeat: 'Window',
  dietary: 'Vegetarian',
  currency: 'INR (₹)',
  preferredClass: 'Economy Prime',
  liveSyncEnabled: true,
  notificationsEnabled: true,
  whatsAppAlerts: true
};

function ProfileBadgesShowcase() {
  const [earned, setEarned] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const achievements = loadBadgeAchievements();
      setEarned(BADGE_DEFINITIONS.filter((badge) => achievements[badge.id]));
      setError('');
    } catch (loadError) {
      setError(loadError.message || 'Your achievements could not be loaded.');
    }
  }, []);

  return (
    <section className="profile-badges-showcase" aria-labelledby="profile-badges-heading">
      <div className="profile-badges-showcase__heading">
        <div>
          <h2 id="profile-badges-heading">Travel Achievements</h2>
          <p>{earned.length} badges earned · private to this browser profile</p>
        </div>
        <Link to="/badges">Explore all badges <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span></Link>
      </div>
      {error ? <p className="profile-badges-showcase__message" role="alert">{error}</p> : earned.length ? (
        <div className="profile-badges-showcase__list">
          {earned.slice(0, 5).map((badge) => (
            <Link key={badge.id} to={`/badges/${badge.id}`} aria-label={`View ${badge.name} badge`}>
              <BadgeArtwork badgeId={badge.id} className="profile-badge-art" />
              <span>{badge.name}</span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="profile-badges-showcase__message">Complete recorded trips and journal achievements to see your badges here.</p>
      )}
    </section>
  );
}

export default function SettingsPage({ defaultTab = 'profile' }) {
  const { showToast } = useTravel();
  const { currentLanguage, changeLanguage, languages, t } = useLanguage();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [currentTime, setCurrentTime] = useState(getCurrentTime12());

  // Load from localStorage or use defaults
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('travio_user_profile');
      return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime12());
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    try {
      localStorage.setItem('travio_user_profile', JSON.stringify(profile));
      setSavedSuccess(true);
      showToast?.('Settings and preferences saved successfully! 💾', 'success');
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      showToast?.('Could not save settings.', 'error');
    }
  };

  return (
    <>
      <Header />
      <div style={{ padding: '0 0 5rem 0', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-dark)' }}>
        
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(56, 189, 248, 0.1) 50%, rgba(16, 185, 129, 0.08) 100%)',
          padding: '3.5rem 5%',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
            <div style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed 0%, #38bdf8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(124, 58, 237, 0.4)',
              fontSize: '28px',
              fontWeight: 800,
              color: '#ffffff',
              border: '3px solid rgba(255, 255, 255, 0.2)'
            }}>
              RB
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: 0, color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>
                  {profile.name}
                </h1>
                <span style={{
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.3) 100%)',
                  color: '#fbbf24',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <span className="material-symbols-rounded" style={{ fontSize: '15px' }}>workspace_premium</span>
                  TRAVIO ELITE BLACK
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', margin: '6px 0 0 0', fontSize: '0.95rem' }}>
                Member #TRV-88219 • 18,450 Travio Miles available • Real-Time Synchronized
              </p>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-color)',
            padding: '12px 20px',
            borderRadius: '16px',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}>
            <span className="material-symbols-rounded" style={{ fontSize: '24px', color: '#38bdf8' }}>
              schedule
            </span>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Present Live Clock
              </div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#38bdf8' }}>
                {currentTime}
              </div>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div style={{ padding: '0 5%', maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', flexWrap: 'wrap' }}>
            {[
              { id: 'profile', label: 'Profile & Passport', icon: 'person' },
              { id: 'membership', label: 'Membership & Miles', icon: 'workspace_premium' },
              { id: 'preferences', label: 'Travel Preferences', icon: 'tune' },
              { id: 'sync', label: 'Live Sync & Alerts', icon: 'sync' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? 'linear-gradient(135deg, #7c3aed 0%, #38bdf8 100%)' : 'rgba(255, 255, 255, 0.04)',
                  color: activeTab === tab.id ? '#ffffff' : 'var(--text-muted)',
                  border: activeTab === tab.id ? 'none' : '1px solid var(--border-color)',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: activeTab === tab.id ? '0 4px 14px rgba(124, 58, 237, 0.35)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* TAB 1: Profile & Passport */}
          {activeTab === 'profile' && (
            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: '2.5rem',
              backdropFilter: 'blur(16px)'
            }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 1.5rem 0', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="material-symbols-rounded" style={{ color: '#7c3aed' }}>badge</span>
                Personal & Travel Credentials
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-dark)',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-dark)',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-dark)',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Home Airport / City
                  </label>
                  <input
                    type="text"
                    value={profile.homeCity}
                    onChange={(e) => handleInputChange('homeCity', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-dark)',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Passport / Govt ID Number
                  </label>
                  <input
                    type="text"
                    value={profile.passportNumber}
                    onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-dark)',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleSave}
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #38bdf8 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 28px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)'
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>save</span>
                Save Profile Changes
              </button>
              <ProfileBadgesShowcase />
            </div>
          )}

          {/* TAB 2: Membership & Miles */}
          {activeTab === 'membership' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '24px',
                padding: '2.5rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      VIP Loyalty Program
                    </span>
                    <h2 style={{ fontSize: '2rem', fontWeight: 900, margin: '6px 0', color: '#ffffff' }}>
                      TRAVIO BLACK CONCIERGE
                    </h2>
                    <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.95rem' }}>
                      Unrestricted priority lounge access, 0% platform surcharge & live transport re-routing guarantee.
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '12px', color: '#cbd5e1', textTransform: 'uppercase' }}>Available Balance</span>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fbbf24' }}>
                      18,450 <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Miles</span>
                    </div>
                    <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 700 }}>≈ ₹18,450 redeemable value</span>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
                  {[
                    { icon: 'flight_class', title: 'Airport Lounges', desc: 'Unlimited access across 120+ hubs including DEL & BOM' },
                    { icon: 'bolt', title: 'Zero Surcharge', desc: 'No convenience fee on flights, IRCTC trains or cabs' },
                    { icon: 'support_agent', title: '24/7 Butler', desc: 'Dedicated concierge for emergency changes' },
                    { icon: 'luggage', title: '+15kg Luggage', desc: 'Complimentary baggage upgrade on partner airlines' }
                  ].map((perk, i) => (
                    <div key={i} style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '1.2rem' }}>
                      <span className="material-symbols-rounded" style={{ color: '#fbbf24', fontSize: '24px', marginBottom: '8px', display: 'block' }}>{perk.icon}</span>
                      <h4 style={{ margin: '0 0 4px 0', color: '#ffffff', fontSize: '14px', fontWeight: 700 }}>{perk.title}</h4>
                      <p style={{ margin: 0, color: '#94a3b8', fontSize: '12px' }}>{perk.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Travel Preferences */}
          {activeTab === 'preferences' && (
            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: '2.5rem',
              backdropFilter: 'blur(16px)'
            }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 1.5rem 0', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="material-symbols-rounded" style={{ color: '#38bdf8' }}>tune</span>
                Default Travel Preferences
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Flight Seating Preference
                  </label>
                  <select
                    value={profile.preferredSeat}
                    onChange={(e) => handleInputChange('preferredSeat', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-dark)',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Window">Window Seat Guaranteed</option>
                    <option value="Aisle">Aisle Seat</option>
                    <option value="Extra Legroom">Extra Legroom (Emergency Exit)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    In-Flight Dietary Choice
                  </label>
                  <select
                    value={profile.dietary}
                    onChange={(e) => handleInputChange('dietary', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-dark)',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Vegetarian">Pure Vegetarian Meal (AVML)</option>
                    <option value="Non-Veg">Asian Non-Vegetarian</option>
                    <option value="Jain">Jain Vegetarian (VJML)</option>
                    <option value="Vegan">Strict Vegan (VGML)</option>
                    <option value="Halal">Halal Certified (MOML)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Display Currency
                  </label>
                  <select
                    value={profile.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-dark)',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="INR (₹)">Indian Rupee (INR ₹)</option>
                    <option value="USD ($)">US Dollar (USD $)</option>
                    <option value="EUR (€)">Euro (EUR €)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Interface Language (i18n Context)
                  </label>
                  <select
                    value={currentLanguage}
                    onChange={(e) => {
                      changeLanguage(e.target.value);
                      showToast?.(`Language switched to ${languages.find(l => l.code === e.target.value)?.name}! 🌐`, 'success');
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-dark)',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    {languages.map((l) => (
                      <option key={l.code} value={l.code} style={{ background: '#1e293b', color: '#fff' }}>
                        {l.flag} {l.name} ({l.nativeName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSave}
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #38bdf8 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 28px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)'
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>save</span>
                Save Preferences
              </button>
            </div>
          )}

          {/* TAB 4: Live Sync & Alerts */}
          {activeTab === 'sync' && (
            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: '2.5rem',
              backdropFilter: 'blur(16px)'
            }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 1.5rem 0', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="material-symbols-rounded" style={{ color: '#10b981' }}>sensors</span>
                Real-Time Dispatch & Notification Engine
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: 'var(--text-dark)' }}>Live Present-Time Transport Anchoring</h4>
                    <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-muted)' }}>
                      Automatically purges past expired departures and only displays flights, trains, and buses leaving from {currentTime} onwards.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.liveSyncEnabled}
                    onChange={(e) => handleInputChange('liveSyncEnabled', e.target.checked)}
                    style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#10b981' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: 'var(--text-dark)' }}>WhatsApp Smart Boarding Pass Delivery</h4>
                    <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-muted)' }}>
                      Send confirmed PNR tickets, seat passes and driver tracking links straight to {profile.phone}.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.whatsAppAlerts}
                    onChange={(e) => handleInputChange('whatsAppAlerts', e.target.checked)}
                    style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#10b981' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: 'var(--text-dark)' }}>Gate Change & Flight Delay Radar</h4>
                    <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-muted)' }}>
                      Receive instant push notifications 45 minutes prior to boarding and in case of runway delays.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.notificationsEnabled}
                    onChange={(e) => handleInputChange('notificationsEnabled', e.target.checked)}
                    style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#10b981' }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleSave}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #38bdf8 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 28px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>save</span>
                Save Sync Preferences
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
