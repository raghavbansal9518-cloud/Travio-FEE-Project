import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import {
  getCurrentUser,
  saveUserProfile,
  getInitials,
  PRESET_AVATARS
} from '../services/userProfileService';
import { BADGE_DEFINITIONS, loadBadgeAchievements } from '../services/badgeService';
import { useTravel } from '../context/TravelContext';
import './ProfilePage.css';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { showToast, bookings, wishlist } = useTravel();

  // Active User Profile State
  const [user, setUser] = useState(() => getCurrentUser());

  // Modals state
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false);

  // Edit Form Fields State
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    location: user?.location || '',
    tagline: user?.tagline || '',
    preferredSeat: user?.preferredSeat || 'Window Seat',
    preferredClass: user?.preferredClass || 'Economy',
    currency: user?.currency || 'INR (₹)',
    language: user?.language || 'English'
  });

  // Avatar Selection State
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState(user?.avatar || '');
  const [avatarUploadError, setAvatarUploadError] = useState('');
  const fileInputRef = useRef(null);

  // Travel Badges Progress
  const [earnedBadges, setEarnedBadges] = useState([]);

  // Sync profile when custom event or user logs in/out
  const refreshProfile = () => {
    const updated = getCurrentUser();
    setUser(updated);
    setEditForm({
      name: updated?.name || '',
      phone: updated?.phone || '',
      location: updated?.location || '',
      tagline: updated?.tagline || '',
      preferredSeat: updated?.preferredSeat || 'Window Seat',
      preferredClass: updated?.preferredClass || 'Economy',
      currency: updated?.currency || 'INR (₹)',
      language: updated?.language || 'English'
    });
    setSelectedAvatarUrl(updated?.avatar || '');
  };

  useEffect(() => {
    refreshProfile();
    window.addEventListener('travio_profile_updated', refreshProfile);
    window.addEventListener('storage', refreshProfile);
    return () => {
      window.removeEventListener('travio_profile_updated', refreshProfile);
      window.removeEventListener('storage', refreshProfile);
    };
  }, []);

  // Calculate live badges
  useEffect(() => {
    try {
      const achievements = loadBadgeAchievements();
      const earned = BADGE_DEFINITIONS.filter((b) => achievements[b.id]);
      setEarnedBadges(earned);
    } catch {
      setEarnedBadges([]);
    }
  }, []);

  // Compute stats: Aarav has demo seed, new users strictly start at 0
  const isAarav = user?.email === 'aarav.sharma@example.com';
  const userBookings = (bookings || []).filter(b => b.userEmail === user?.email || b.email === user?.email);
  const userVisited = (wishlist || []).filter(w => (w.userEmail === user?.email || w.email === user?.email) && w.status === 'visited');
  const userBadges = (earnedBadges || []).filter(bg => bg.userEmail === user?.email);

  const tripsCount = isAarav ? (bookings?.length || 12) : userBookings.length;
  const destinationsCount = isAarav ? (wishlist?.length || 8) : userVisited.length;
  const badgesCount = isAarav ? (earnedBadges?.length || 4) : userBadges.length;

  // Reset edit form when closing/cancelling
  const handleCancelEdit = () => {
    setEditForm({
      name: user?.name || '',
      phone: user?.phone || '',
      location: user?.location || '',
      tagline: user?.tagline || '',
      preferredSeat: user?.preferredSeat || 'Window Seat',
      preferredClass: user?.preferredClass || 'Economy',
      currency: user?.currency || 'INR (₹)',
      language: user?.language || 'English'
    });
    setIsEditProfileOpen(false);
  };

  // Handle Edit Profile Save
  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!editForm.name.trim()) {
      showToast?.('Name cannot be empty', 'warning');
      return;
    }

    const success = saveUserProfile({
      ...editForm,
      name: editForm.name.trim()
    });

    if (success) {
      refreshProfile();
      setIsEditProfileOpen(false);
      showToast?.('Profile updated successfully! ✨', 'success');
    } else {
      showToast?.('Failed to save profile changes.', 'error');
    }
  };

  // Handle Photo File Upload
  const handleFileUpload = (e) => {
    setAvatarUploadError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setAvatarUploadError('Please select a valid image file (JPEG, PNG, WEBP).');
      return;
    }

    if (file.size > 1.5 * 1024 * 1024) {
      setAvatarUploadError('Image size must be under 1.5 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result;
      if (base64) {
        setSelectedAvatarUrl(base64);
      }
    };
    reader.onerror = () => {
      setAvatarUploadError('Failed to read image file. Please try another.');
    };
    reader.readAsDataURL(file);
  };

  // Apply Selected or Uploaded Avatar
  const handleApplyAvatar = () => {
    const success = saveUserProfile({ avatar: selectedAvatarUrl });
    if (success) {
      refreshProfile();
      setIsAvatarModalOpen(false);
      showToast?.('Avatar updated successfully! 🎨', 'success');
    } else {
      showToast?.('Failed to update avatar.', 'error');
    }
  };

  // Reset Photo to Initials
  const handleRemoveAvatar = () => {
    setSelectedAvatarUrl('');
    const success = saveUserProfile({ avatar: '' });
    if (success) {
      refreshProfile();
      setIsAvatarModalOpen(false);
      showToast?.('Avatar reset to default initials.', 'info');
    }
  };

  return (
    <div className="profile-page-container">
      {/* 1. Global Header */}
      <Header />

      <main className="profile-dashboard-content" aria-label="User Profile Dashboard">
        {/* ========================================================
            2. HERO PROFILE BANNER
            ======================================================== */}
        <section className="profile-banner-card" aria-label="Profile Banner">
          <div className="profile-banner-backdrop" />
          <div className="profile-banner-tagline-quote">
            Collect moments not things ✈
          </div>

          <div className="profile-banner-left">
            {/* Glowing Avatar */}
            <div className="profile-avatar-wrap">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || 'User'}
                  className="profile-avatar-img"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="profile-avatar-initials">
                  {getInitials(user?.name)}
                </div>
              )}

              {/* Upload / Change Photo Camera Button */}
              <button
                type="button"
                className="profile-avatar-camera-btn"
                onClick={() => {
                  setSelectedAvatarUrl(user?.avatar || '');
                  setAvatarUploadError('');
                  setIsAvatarModalOpen(true);
                }}
                title="Change cute avatar or upload personal photo"
                aria-label="Upload photo"
              >
                <i className="fa-solid fa-camera"></i>
              </button>
            </div>

            {/* User Meta Information */}
            <div className="profile-user-info">
              <div className="profile-name-row">
                <h1 className="profile-name">{user?.name || 'Traveler'}</h1>
                <span className="profile-verified-badge" title="Travio Member">
                  <i className="fa-solid fa-check"></i>
                </span>
              </div>
              <p className="profile-email-text">{user?.email || 'traveler@travio.io'}</p>
              
              {user?.tagline ? (
                <p className="profile-tagline">{user.tagline}</p>
              ) : (
                <button
                  type="button"
                  className="profile-tagline-add-btn"
                  onClick={() => setIsEditProfileOpen(true)}
                  title="Add your travel tagline"
                >
                  <i className="fa-solid fa-plus" style={{ fontSize: '11px' }}></i>
                  <span>Add your travel motto ✈</span>
                </button>
              )}
            </div>
          </div>

          {/* Edit Profile Action */}
          <button
            type="button"
            className="profile-btn-edit-banner"
            onClick={() => {
              setEditForm({
                name: user?.name || '',
                phone: user?.phone || '',
                location: user?.location || '',
                tagline: user?.tagline || '',
                preferredSeat: user?.preferredSeat || 'Window Seat',
                preferredClass: user?.preferredClass || 'Economy',
                currency: user?.currency || 'INR (₹)',
                language: user?.language || 'English'
              });
              setIsEditProfileOpen(true);
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
            <span>Edit Profile</span>
          </button>
        </section>

        {/* ========================================================
            3. MAIN 2-COLUMN DASHBOARD GRID
            ======================================================== */}
        <div className="profile-main-grid">
          {/* LEFT MAIN COLUMN */}
          <div className="profile-column-left">
            {/* 3 Middle Stat Cards */}
            <div className="profile-stats-row">
              <Link to="/bookings" className="profile-stat-card" title="View your planned and upcoming trips">
                <div className="profile-stat-inner">
                  <div className="profile-stat-icon-box purple">
                    <i className="fa-solid fa-plane-departure"></i>
                  </div>
                  <div className="profile-stat-data">
                    <span className="profile-stat-val">{tripsCount}</span>
                    <span className="profile-stat-lbl">Trips Planned</span>
                  </div>
                </div>
                <span className="profile-stat-arrow">
                  <i className="fa-solid fa-chevron-right"></i>
                </span>
              </Link>

              <Link to="/explore" className="profile-stat-card" title="Explore and view visited destinations">
                <div className="profile-stat-inner">
                  <div className="profile-stat-icon-box blue">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="profile-stat-data">
                    <span className="profile-stat-val">{destinationsCount}</span>
                    <span className="profile-stat-lbl">Destinations Visited</span>
                  </div>
                </div>
                <span className="profile-stat-arrow">
                  <i className="fa-solid fa-chevron-right"></i>
                </span>
              </Link>

              <div 
                className="profile-stat-card" 
                onClick={() => setIsBadgesModalOpen(true)}
                title="View your earned travel achievement badges"
              >
                <div className="profile-stat-inner">
                  <div className="profile-stat-icon-box gold">
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <div className="profile-stat-data">
                    <span className="profile-stat-val">{badgesCount}</span>
                    <span className="profile-stat-lbl">Travel Badges</span>
                  </div>
                </div>
                <span className="profile-stat-arrow">
                  <i className="fa-solid fa-chevron-right"></i>
                </span>
              </div>
            </div>

            {/* Travel Badges Section (5 Hexagons) */}
            <section className="profile-badges-card" aria-labelledby="travel-badges-heading">
              <div className="profile-section-header">
                <div className="profile-section-title-wrap">
                  <i className="fa-solid fa-shield-halved profile-section-title-icon"></i>
                  <h2 id="travel-badges-heading" className="profile-section-title">Travel Badges</h2>
                </div>
                <button
                  type="button"
                  className="profile-btn-link-action"
                  onClick={() => setIsBadgesModalOpen(true)}
                >
                  <span>View All</span>
                  <i className="fa-solid fa-arrow-right" style={{ fontSize: '11px' }}></i>
                </button>
              </div>

              <div className="profile-badges-hex-grid">
                {/* 1. Explorer */}
                <div 
                  className="profile-hex-badge-item"
                  onClick={() => setIsBadgesModalOpen(true)}
                  title="Explorer: Visited 5+ countries or iconic destinations"
                >
                  <div className="profile-hex-shape explorer">
                    <i className="fa-solid fa-mountain-sun"></i>
                  </div>
                  <h3 className="profile-badge-name">Explorer</h3>
                  <p className="profile-badge-desc">Visited 5+ countries</p>
                </div>

                {/* 2. Photographer */}
                <div 
                  className="profile-hex-badge-item"
                  onClick={() => setIsBadgesModalOpen(true)}
                  title="Photographer: Uploaded 20+ travel photos"
                >
                  <div className="profile-hex-shape photographer">
                    <i className="fa-solid fa-camera"></i>
                  </div>
                  <h3 className="profile-badge-name">Photographer</h3>
                  <p className="profile-badge-desc">Uploaded 20+ photos</p>
                </div>

                {/* 3. Foodie */}
                <div 
                  className="profile-hex-badge-item"
                  onClick={() => setIsBadgesModalOpen(true)}
                  title="Foodie: Tried 10+ authentic local cuisines"
                >
                  <div className="profile-hex-shape foodie">
                    <i className="fa-solid fa-utensils"></i>
                  </div>
                  <h3 className="profile-badge-name">Foodie</h3>
                  <p className="profile-badge-desc">Tried 10+ local cuisines</p>
                </div>

                {/* 4. Weekend Wanderer */}
                <div 
                  className="profile-hex-badge-item"
                  onClick={() => setIsBadgesModalOpen(true)}
                  title="Weekend Wanderer: Completed 5+ quick getaways"
                >
                  <div className="profile-hex-shape wanderer">
                    <i className="fa-solid fa-umbrella-beach"></i>
                  </div>
                  <h3 className="profile-badge-name">Weekend Wanderer</h3>
                  <p className="profile-badge-desc">Completed 5+ short trips</p>
                </div>

                {/* 5. Night Owl */}
                <div 
                  className="profile-hex-badge-item"
                  onClick={() => setIsBadgesModalOpen(true)}
                  title="Night Owl: Booked 5+ late evening trips"
                >
                  <div className="profile-hex-shape nightowl">
                    <i className="fa-solid fa-moon"></i>
                  </div>
                  <h3 className="profile-badge-name">Night Owl</h3>
                  <p className="profile-badge-desc">Booked 5+ night trips</p>
                </div>
              </div>
            </section>

            {/* Personal Information Section */}
            <section className="profile-info-card" aria-labelledby="personal-info-heading">
              <div className="profile-section-header">
                <div className="profile-section-title-wrap">
                  <i className="fa-solid fa-user-circle profile-section-title-icon"></i>
                  <h2 id="personal-info-heading" className="profile-section-title">Personal Information</h2>
                </div>
                <button
                  type="button"
                  className="profile-btn-link-action"
                  onClick={() => setIsEditProfileOpen(true)}
                >
                  <i className="fa-solid fa-pen" style={{ fontSize: '11px' }}></i>
                  <span>Edit</span>
                </button>
              </div>

              <div className="profile-info-grid">
                {/* Full Name */}
                <div className="profile-info-field">
                  <div className="profile-info-icon-box">
                    <i className="fa-solid fa-user"></i>
                  </div>
                  <div className="profile-info-text-group">
                    <span className="profile-info-lbl">Full Name</span>
                    <span className="profile-info-val">{user?.name || 'Traveler'}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="profile-info-field">
                  <div className="profile-info-icon-box">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="profile-info-text-group">
                    <span className="profile-info-lbl">Location</span>
                    <span className={user?.location ? "profile-info-val" : "profile-info-placeholder"}>
                      {user?.location || 'Not provided yet'}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="profile-info-field">
                  <div className="profile-info-icon-box">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div className="profile-info-text-group">
                    <span className="profile-info-lbl">Email</span>
                    <span className="profile-info-val">{user?.email || 'traveler@travio.io'}</span>
                  </div>
                </div>

                {/* Member Since */}
                <div className="profile-info-field">
                  <div className="profile-info-icon-box">
                    <i className="fa-solid fa-calendar-check"></i>
                  </div>
                  <div className="profile-info-text-group">
                    <span className="profile-info-lbl">Member Since</span>
                    <span className="profile-info-val">{user?.memberSince || 'Oct 2026'}</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="profile-info-field">
                  <div className="profile-info-icon-box">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div className="profile-info-text-group">
                    <span className="profile-info-lbl">Phone</span>
                    <span className={user?.phone ? "profile-info-val" : "profile-info-placeholder"}>
                      {user?.phone || 'Not provided yet'}
                    </span>
                  </div>
                </div>

                {/* Preferred Language */}
                <div className="profile-info-field">
                  <div className="profile-info-icon-box">
                    <i className="fa-solid fa-globe"></i>
                  </div>
                  <div className="profile-info-text-group">
                    <span className="profile-info-lbl">Preferred Language</span>
                    <span className="profile-info-val">{user?.language || 'English'}</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR COLUMN */}
          <div className="profile-column-right">
            {/* Quick Links Card (Combined Wishlist & Saved Destinations + Journal) */}
            <section className="profile-quicklinks-card" aria-label="Quick Links">
              <div className="profile-section-header" style={{ marginBottom: '16px' }}>
                <div className="profile-section-title-wrap">
                  <i className="fa-solid fa-link profile-section-title-icon"></i>
                  <h2 className="profile-section-title">Quick Links</h2>
                </div>
              </div>

              <div className="profile-quicklinks-list">
                <Link to="/bookings" className="profile-quicklink-item">
                  <div className="profile-quicklink-left">
                    <div className="profile-quicklink-icon-box purple">
                      <i className="fa-solid fa-suitcase-rolling"></i>
                    </div>
                    <div className="profile-quicklink-text">
                      <span className="profile-quicklink-title">My Bookings</span>
                      <span className="profile-quicklink-subtitle">Upcoming &amp; completed trips</span>
                    </div>
                  </div>
                  <span className="profile-quicklink-arrow">
                    <i className="fa-solid fa-chevron-right"></i>
                  </span>
                </Link>

                {/* Single unified Saved Destinations & Wishlist link */}
                <Link to="/wishlist" className="profile-quicklink-item">
                  <div className="profile-quicklink-left">
                    <div className="profile-quicklink-icon-box pink">
                      <i className="fa-solid fa-heart"></i>
                    </div>
                    <div className="profile-quicklink-text">
                      <span className="profile-quicklink-title">Saved Wishlist</span>
                      <span className="profile-quicklink-subtitle">Dream places &amp; saved spots</span>
                    </div>
                  </div>
                  <span className="profile-quicklink-arrow">
                    <i className="fa-solid fa-chevron-right"></i>
                  </span>
                </Link>

                {/* Travel Journal link */}
                <Link to="/journal" className="profile-quicklink-item">
                  <div className="profile-quicklink-left">
                    <div className="profile-quicklink-icon-box violet">
                      <i className="fa-solid fa-book-open"></i>
                    </div>
                    <div className="profile-quicklink-text">
                      <span className="profile-quicklink-title">Travel Journal</span>
                      <span className="profile-quicklink-subtitle">Stories, photos &amp; memories</span>
                    </div>
                  </div>
                  <span className="profile-quicklink-arrow">
                    <i className="fa-solid fa-chevron-right"></i>
                  </span>
                </Link>
              </div>
            </section>

            {/* Travel Preferences Card */}
            <section className="profile-prefs-card" aria-label="Travel Preferences">
              <div className="profile-section-header" style={{ marginBottom: '16px' }}>
                <div className="profile-section-title-wrap">
                  <i className="fa-solid fa-sliders profile-section-title-icon"></i>
                  <h2 className="profile-section-title">Travel Preferences</h2>
                </div>
                <Link to="/settings" className="profile-btn-link-action" title="Edit in Settings">
                  <i className="fa-solid fa-gear" style={{ fontSize: '11px' }}></i>
                </Link>
              </div>

              <div className="profile-prefs-chips-grid">
                <div className="profile-pref-chip">
                  <i className="fa-solid fa-couch profile-pref-chip-icon"></i>
                  <span>{user?.preferredSeat || 'Window Seat'}</span>
                </div>
                <div className="profile-pref-chip">
                  <i className="fa-solid fa-plane profile-pref-chip-icon"></i>
                  <span>{user?.preferredClass || 'Economy'}</span>
                </div>
                <div className="profile-pref-chip">
                  <i className="fa-solid fa-indian-rupee-sign profile-pref-chip-icon"></i>
                  <span>{user?.currency || 'INR (₹)'}</span>
                </div>
                <div className="profile-pref-chip">
                  <i className="fa-solid fa-comment-dots profile-pref-chip-icon"></i>
                  <span>{user?.language || 'English'}</span>
                </div>
                <div className="profile-pref-chip">
                  <i className="fa-solid fa-moon profile-pref-chip-icon"></i>
                  <span>{user?.darkMode !== false ? 'Dark Mode' : 'Light Mode'}</span>
                </div>
              </div>
            </section>

            {/* Decorative Scenic Card */}
            <section className="profile-decorative-card" aria-label="Inspirational Travel Card">
              <div className="profile-decorative-backdrop" />
              <div className="profile-decorative-content">
                <p className="profile-decorative-script">
                  More Adventures Ahead ✈
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* ========================================================
          EDIT PROFILE MODAL
          ======================================================== */}
      {isEditProfileOpen && (
        <div className="profile-modal-overlay" onClick={handleCancelEdit}>
          <div 
            className="profile-modal-box" 
            onClick={(e) => e.stopPropagation()} 
            role="dialog" 
            aria-modal="true"
          >
            <div className="profile-modal-header">
              <h3>
                <i className="fa-solid fa-pen-to-square" style={{ color: '#a855f7' }}></i>
                <span>Edit Profile</span>
              </h3>
              <button 
                type="button" 
                className="profile-modal-close-btn"
                onClick={handleCancelEdit}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile}>
              <div className="profile-modal-body">
                <div className="profile-input-group">
                  <label htmlFor="edit-name">Full Name *</label>
                  <input
                    id="edit-name"
                    type="text"
                    className="profile-input-field"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="profile-input-group">
                  <label htmlFor="edit-tagline">Travel Motto / Tagline</label>
                  <input
                    id="edit-tagline"
                    type="text"
                    className="profile-input-field"
                    value={editForm.tagline}
                    onChange={(e) => setEditForm({ ...editForm, tagline: e.target.value })}
                    placeholder="e.g. New places. Same me, happier. ✈"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="profile-input-group">
                    <label htmlFor="edit-phone">Phone Number</label>
                    <input
                      id="edit-phone"
                      type="tel"
                      className="profile-input-field"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div className="profile-input-group">
                    <label htmlFor="edit-location">Location / Home City</label>
                    <input
                      id="edit-location"
                      type="text"
                      className="profile-input-field"
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      placeholder="e.g. Mumbai, India"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="profile-input-group">
                    <label htmlFor="edit-seat">Preferred Seat</label>
                    <div className="profile-select-wrapper">
                      <select
                        id="edit-seat"
                        className="profile-input-field profile-select-custom"
                        value={editForm.preferredSeat}
                        onChange={(e) => setEditForm({ ...editForm, preferredSeat: e.target.value })}
                      >
                        <option value="Window Seat">🪟 Window Seat</option>
                        <option value="Aisle Seat">🚶 Aisle Seat</option>
                        <option value="Extra Legroom">✨ Extra Legroom</option>
                      </select>
                      <i className="fa-solid fa-chevron-down profile-select-chevron"></i>
                    </div>
                  </div>

                  <div className="profile-input-group">
                    <label htmlFor="edit-class">Travel Class</label>
                    <div className="profile-select-wrapper">
                      <select
                        id="edit-class"
                        className="profile-input-field profile-select-custom"
                        value={editForm.preferredClass}
                        onChange={(e) => setEditForm({ ...editForm, preferredClass: e.target.value })}
                      >
                        <option value="Economy">✈️ Economy</option>
                        <option value="Economy Prime">⭐ Economy Prime</option>
                        <option value="Business">💼 Business Class</option>
                        <option value="First Class">👑 First Class</option>
                      </select>
                      <i className="fa-solid fa-chevron-down profile-select-chevron"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile-modal-footer">
                <button
                  type="button"
                  className="profile-btn-cancel"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
                <button type="submit" className="profile-btn-save">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          AVATAR MANAGEMENT MODAL (Cute Animals, Flowers & Upload)
          ======================================================== */}
      {isAvatarModalOpen && (
        <div className="profile-modal-overlay" onClick={() => setIsAvatarModalOpen(false)}>
          <div 
            className="profile-modal-box" 
            onClick={(e) => e.stopPropagation()} 
            role="dialog" 
            aria-modal="true"
          >
            <div className="profile-modal-header">
              <h3>
                <i className="fa-solid fa-icons" style={{ color: '#a855f7' }}></i>
                <span>Choose Cute Avatar or Upload</span>
              </h3>
              <button 
                type="button" 
                className="profile-modal-close-btn"
                onClick={() => setIsAvatarModalOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="profile-modal-body">
              {/* Device Photo Upload Area */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0', display: 'block', marginBottom: '8px' }}>
                  Upload Personal Photo from Device:
                </label>
                <div 
                  className="avatar-upload-zone"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <i className="fa-solid fa-cloud-arrow-up" style={{ fontSize: '28px', color: '#a855f7', marginBottom: '8px' }}></i>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#ffffff' }}>
                    Click to browse your phone / gallery
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(203, 213, 225, 0.7)', marginTop: '4px' }}>
                    Supports PNG, JPG, WEBP (Max 1.5MB)
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                  />
                </div>
                {avatarUploadError && (
                  <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '6px' }}>
                    {avatarUploadError}
                  </p>
                )}
              </div>

              {/* Predefined Cute Animal, Cartoon & Flower Avatars */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0', display: 'block', marginTop: '8px' }}>
                  Or Pick a Cute Cartoon, Animal or Flower Avatar:
                </label>
                <div className="avatar-preset-grid">
                  {PRESET_AVATARS.map((avatar) => {
                    const isSelected = selectedAvatarUrl === avatar.url;
                    return (
                      <div
                        key={avatar.id}
                        className={`avatar-preset-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedAvatarUrl(avatar.url)}
                        title={avatar.label}
                      >
                        <img src={avatar.url} alt={avatar.label} />
                        <span className="avatar-preset-label-badge">{avatar.label}</span>
                        {isSelected && (
                          <div className="avatar-preset-check">
                            <i className="fa-solid fa-check"></i>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="profile-modal-footer" style={{ justifyContent: 'space-between' }}>
              <button
                type="button"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
                onClick={handleRemoveAvatar}
              >
                Reset to Initials
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  className="profile-btn-cancel"
                  onClick={() => setIsAvatarModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="profile-btn-save"
                  onClick={handleApplyAvatar}
                >
                  Apply Avatar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TRAVEL BADGES MODAL
          ======================================================== */}
      {isBadgesModalOpen && (
        <div className="profile-modal-overlay" onClick={() => setIsBadgesModalOpen(false)}>
          <div 
            className="profile-modal-box" 
            style={{ maxWidth: '640px' }}
            onClick={(e) => e.stopPropagation()} 
            role="dialog" 
            aria-modal="true"
          >
            <div className="profile-modal-header">
              <h3>
                <i className="fa-solid fa-award" style={{ color: '#fbbf24' }}></i>
                <span>All Travel Achievements</span>
              </h3>
              <button 
                type="button" 
                className="profile-modal-close-btn"
                onClick={() => setIsBadgesModalOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="profile-modal-body" style={{ maxHeight: '60vh' }}>
              <p style={{ color: 'rgba(203, 213, 225, 0.8)', fontSize: '0.85rem', margin: '0 0 12px 0' }}>
                Earn travel badges by exploring new cities, saving wishlist spots, recording journal entries, and completing flights on Travio.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {BADGE_DEFINITIONS.slice(0, 8).map((badge) => {
                  const isUnlocked = earnedBadges.some((b) => b.id === badge.id) || ['mountain-explorer', 'city-wanderer', 'photo-master', 'foodie'].includes(badge.id);
                  return (
                    <div
                      key={badge.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '14px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: isUnlocked ? '1px solid rgba(168, 85, 247, 0.35)' : '1px solid rgba(255, 255, 255, 0.06)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '10px',
                            background: isUnlocked ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                            color: isUnlocked ? '#c084fc' : '#64748b',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '18px'
                          }}
                        >
                          <i className={`fa-solid ${isUnlocked ? 'fa-award' : 'fa-lock'}`}></i>
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.92rem', color: isUnlocked ? '#ffffff' : '#94a3b8' }}>
                            {badge.name}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'rgba(203, 213, 225, 0.65)' }}>
                            {badge.requirement || badge.description}
                          </div>
                        </div>
                      </div>

                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: '999px',
                          background: isUnlocked ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                          color: isUnlocked ? '#4ade80' : '#94a3b8',
                          border: isUnlocked ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        {isUnlocked ? '✓ Unlocked' : 'Locked'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="profile-modal-footer">
              <Link 
                to="/badges" 
                className="profile-btn-save" 
                style={{ textDecoration: 'none', display: 'inline-block' }}
                onClick={() => setIsBadgesModalOpen(false)}
              >
                Go to Badges Page →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
