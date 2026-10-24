import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { useLanguage } from '../context/LanguageContext';

export default function WishlistPage() {
  const navigate = useNavigate();
  const { wishlist, updateWishlistStatus, removeFromWishlist, showToast } = useTravel();
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    if (openDropdownId) {
      window.addEventListener('click', handleClickOutside);
      return () => window.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdownId]);

  // Accurate counts
  const plannedCount = wishlist.filter((item) => item.status === 'planned').length;
  const visitedCount = wishlist.filter((item) => item.status === 'visited').length;
  const savedCount = wishlist.filter((item) => item.status === 'saved' || (item.status !== 'planned' && item.status !== 'visited')).length;

  const filteredItems = wishlist.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'planned') return item.status === 'planned';
    if (activeFilter === 'visited') return item.status === 'visited';
    if (activeFilter === 'saved') return item.status === 'saved' || (item.status !== 'planned' && item.status !== 'visited');
    return true;
  });

  return (
    <>
      <Header />
      <div style={{ padding: '0 0 4rem 0', minHeight: '100vh', background: '#070a13', color: '#ffffff' }}>
        
        {/* --- Top Banner & Header Section --- */}
        <div style={{ padding: '2.5rem 4% 1.5rem 4%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            
            {/* Title & Subtitle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'rgba(244, 63, 94, 0.12)',
                border: '1px solid rgba(244, 63, 94, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fb7185',
                boxShadow: '0 0 20px rgba(244, 63, 94, 0.25)',
                flexShrink: 0
              }}>
                <span className="material-symbols-rounded" style={{ fontSize: '26px', fontVariationSettings: "'FILL' 1" }}>
                  favorite
                </span>
              </div>
              <div>
                <h1 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0 0 4px 0', letterSpacing: '-0.02em', color: '#ffffff' }}>
                  {t('wishlist.title')}
                </h1>
                <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem' }}>
                  {t('wishlist.subtitle')}
                </p>
              </div>
            </div>

            {/* Right Action: Clean Explore More Link */}
            <button
              type="button"
              onClick={() => navigate('/explore')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#e2e8f0',
                padding: '10px 20px',
                borderRadius: '24px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(99, 102, 241, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.color = '#e2e8f0';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: '18px', color: '#818cf8' }}>travel_explore</span>
              <span>{t('dashboard.exploreDestinations', 'Explore Destinations')}</span>
            </button>
          </div>

          {/* --- Filter Pills Bar (100% Accurate Dynamic Counts) --- */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '2rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              style={{
                background: activeFilter === 'all' ? 'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)' : 'rgba(255, 255, 255, 0.04)',
                border: activeFilter === 'all' ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                color: activeFilter === 'all' ? '#ffffff' : '#cbd5e1',
                padding: '8px 20px',
                borderRadius: '24px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeFilter === 'all' ? '0 4px 14px rgba(99, 102, 241, 0.4)' : 'none'
              }}
            >
              {t('common.all', 'All')} ({wishlist.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('planned')}
              style={{
                background: activeFilter === 'planned' ? 'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)' : 'rgba(255, 255, 255, 0.04)',
                border: activeFilter === 'planned' ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                color: activeFilter === 'planned' ? '#ffffff' : '#cbd5e1',
                padding: '8px 20px',
                borderRadius: '24px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeFilter === 'planned' ? '0 4px 14px rgba(99, 102, 241, 0.4)' : 'none'
              }}
            >
              {t('wishlist.planned', 'Planned')} ({plannedCount})
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('saved')}
              style={{
                background: activeFilter === 'saved' ? 'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)' : 'rgba(255, 255, 255, 0.04)',
                border: activeFilter === 'saved' ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                color: activeFilter === 'saved' ? '#ffffff' : '#cbd5e1',
                padding: '8px 20px',
                borderRadius: '24px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeFilter === 'saved' ? '0 4px 14px rgba(99, 102, 241, 0.4)' : 'none'
              }}
            >
              {t('phrases.Saved', 'Saved')} ({savedCount})
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('visited')}
              style={{
                background: activeFilter === 'visited' ? 'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)' : 'rgba(255, 255, 255, 0.04)',
                border: activeFilter === 'visited' ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                color: activeFilter === 'visited' ? '#ffffff' : '#cbd5e1',
                padding: '8px 20px',
                borderRadius: '24px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeFilter === 'visited' ? '0 4px 14px rgba(99, 102, 241, 0.4)' : 'none'
              }}
            >
              {t('wishlist.visited', 'Visited')} ({visitedCount})
            </button>
          </div>
        </div>

        {/* --- Cards Grid Section --- */}
        <div style={{ padding: '0 4%' }}>
          {filteredItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#94a3b8' }}>
              <span className="material-symbols-rounded" style={{ fontSize: '3.5rem', color: activeFilter === 'visited' ? '#10b981' : activeFilter === 'planned' ? '#818cf8' : '#6366f1' }}>
                {activeFilter === 'visited' ? 'done_all' : activeFilter === 'planned' ? 'event_upcoming' : 'travel_explore'}
              </span>
              <h3 style={{ color: '#ffffff', marginTop: '1rem', fontSize: '1.4rem' }}>
                {activeFilter === 'visited'
                  ? t('wishlist.noVisited', 'No Visited Places Yet')
                  : activeFilter === 'planned'
                  ? t('wishlist.noPlanned', 'No Planned Trips Yet')
                  : t('wishlist.noDestinations', 'No destinations in this category')}
              </h3>
              <p style={{ fontSize: '0.95rem', maxWidth: '520px', margin: '8px auto 0 auto', lineHeight: '1.6' }}>
                {activeFilter === 'visited'
                  ? t('wishlist.visitedPrompt', 'Completed a journey? Click the (•••) menu on any destination and choose "Mark as Visited" to log your travel milestones here!')
                  : activeFilter === 'planned'
                  ? t('wishlist.plannedPrompt', 'Have a future trip in mind? Mark destinations as "Planned" from their (•••) menu to build your bucket list.')
                  : t('wishlist.emptyDesc')}
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                {activeFilter !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setActiveFilter('all')}
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      padding: '10px 22px',
                      borderRadius: '24px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {t('common.all', 'All')} ({wishlist.length})
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => navigate('/explore')}
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: '24px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {t('dashboard.exploreDestinations', 'Explore Destinations')}
                </button>
              </div>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: '24px'
            }}>
              {filteredItems.map((dest) => {
                const tags = dest.tags || ['Nature', 'Scenic'];
                return (
                  <div
                    key={dest.id}
                    style={{
                      background: '#0d111d',
                      border: '1px solid rgba(255, 255, 255, 0.07)',
                      borderRadius: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                      zIndex: openDropdownId === dest.id ? 40 : 1
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.5)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.35)';
                    }}
                  >
                    {/* Destination Photo Box (Unclipped so dropdown floats fully) */}
                    <div style={{ position: 'relative', height: '220px' }}>
                      <img
                        src={dest.cardImage || dest.heroImage || dest.image}
                        alt={dest.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px 20px 0 0' }}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80';
                        }}
                      />

                      {/* Top Left Live Status Badge */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          padding: '5px 12px',
                          borderRadius: '20px',
                          fontSize: '11px',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          zIndex: 5,
                          ...(dest.status === 'planned'
                            ? {
                                background: 'rgba(99, 102, 241, 0.9)',
                                color: '#ffffff',
                                boxShadow: '0 2px 10px rgba(99, 102, 241, 0.4)'
                              }
                            : dest.status === 'visited'
                            ? {
                                background: 'rgba(16, 185, 129, 0.9)',
                                color: '#ffffff',
                                boxShadow: '0 2px 10px rgba(16, 185, 129, 0.4)'
                              }
                            : {
                                background: 'rgba(15, 23, 42, 0.85)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                color: '#e2e8f0'
                              })
                        }}
                      >
                        <span className="material-symbols-rounded" style={{ fontSize: '14px' }}>
                          {dest.status === 'planned'
                            ? 'event_upcoming'
                            : dest.status === 'visited'
                            ? 'done_all'
                            : 'bookmark'}
                        </span>
                        <span style={{ textTransform: 'capitalize' }}>{dest.status || 'Saved'}</span>
                      </div>

                      {/* Top Right Glowing Red Heart Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromWishlist(dest.id);
                        }}
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: 'rgba(244, 63, 94, 0.9)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255, 255, 255, 0.35)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 4px 14px rgba(244, 63, 94, 0.45)',
                          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                          zIndex: 5
                        }}
                        title="Remove from Wishlist"
                        aria-label="Remove from Wishlist"
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = 'scale(1.12)';
                          e.currentTarget.style.background = '#e11d48';
                          e.currentTarget.style.boxShadow = '0 6px 18px rgba(225, 29, 72, 0.6)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.background = 'rgba(244, 63, 94, 0.9)';
                          e.currentTarget.style.boxShadow = '0 4px 14px rgba(244, 63, 94, 0.45)';
                        }}
                      >
                        <span className="material-symbols-rounded" style={{ fontVariationSettings: "'FILL' 1", fontSize: '18px', color: '#ffffff' }}>
                          favorite
                        </span>
                      </button>

                      {/* Bottom Right More Options Button (...) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId(openDropdownId === dest.id ? null : dest.id);
                        }}
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          right: '12px',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'rgba(13, 17, 29, 0.75)',
                          backdropFilter: 'blur(6px)',
                          WebkitBackdropFilter: 'blur(6px)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          zIndex: 5
                        }}
                        title="More Options"
                      >
                        <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>
                          more_horiz
                        </span>
                      </button>

                      {/* Options Dropdown Menu (Floating without clipping) */}
                      {openDropdownId === dest.id && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '50px',
                            right: '12px',
                            background: 'rgba(18, 23, 39, 0.98)',
                            border: '1px solid rgba(255, 255, 255, 0.16)',
                            borderRadius: '14px',
                            padding: '6px',
                            zIndex: 60,
                            boxShadow: '0 12px 36px rgba(0,0,0,0.7)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            minWidth: '165px'
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              updateWishlistStatus(dest.id, 'planned');
                              setOpenDropdownId(null);
                            }}
                            style={{ background: 'none', border: 'none', color: '#cbd5e1', padding: '8px 12px', fontSize: '12px', textAlign: 'left', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'none'}
                          >
                            <span className="material-symbols-rounded" style={{ fontSize: '15px', color: '#818cf8' }}>event_upcoming</span>
                            <span>{t('wishlist.markPlanned', 'Mark as Planned')}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              updateWishlistStatus(dest.id, 'visited');
                              setOpenDropdownId(null);
                            }}
                            style={{ background: 'none', border: 'none', color: '#cbd5e1', padding: '8px 12px', fontSize: '12px', textAlign: 'left', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'none'}
                          >
                            <span className="material-symbols-rounded" style={{ fontSize: '15px', color: '#10b981' }}>done_all</span>
                            <span>{t('wishlist.markVisited', 'Mark as Visited')}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              updateWishlistStatus(dest.id, 'saved');
                              setOpenDropdownId(null);
                            }}
                            style={{ background: 'none', border: 'none', color: '#cbd5e1', padding: '8px 12px', fontSize: '12px', textAlign: 'left', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'none'}
                          >
                            <span className="material-symbols-rounded" style={{ fontSize: '15px', color: '#f59e0b' }}>bookmark</span>
                            <span>{t('wishlist.markSaved', 'Mark as Saved')}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              navigate(`/booking?dest=${dest.id}`);
                              setOpenDropdownId(null);
                            }}
                            style={{ background: 'none', border: 'none', color: '#cbd5e1', padding: '8px 12px', fontSize: '12px', textAlign: 'left', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'none'}
                          >
                            <span className="material-symbols-rounded" style={{ fontSize: '15px', color: '#38bdf8' }}>flight_takeoff</span>
                            <span>{t('booking.bookTrip', 'Book This Trip')}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              navigate(`/journal?new=true&destination=${encodeURIComponent(dest.name)}`);
                              setOpenDropdownId(null);
                            }}
                            style={{ background: 'none', border: 'none', color: '#cbd5e1', padding: '8px 12px', fontSize: '12px', textAlign: 'left', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'none'}
                          >
                            <span className="material-symbols-rounded" style={{ fontSize: '15px', color: '#c084fc' }}>menu_book</span>
                            <span>{t('journal.newEntry', 'Write in Journal')}</span>
                          </button>

                          <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '2px 0' }} />

                          <button
                            type="button"
                            onClick={() => {
                              removeFromWishlist(dest.id);
                              setOpenDropdownId(null);
                            }}
                            style={{ background: 'none', border: 'none', color: '#f43f5e', padding: '8px 12px', fontSize: '12px', textAlign: 'left', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(244,63,94,0.1)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'none'}
                          >
                            <span className="material-symbols-rounded" style={{ fontSize: '15px', color: '#f43f5e' }}>delete</span>
                            <span>{t('common.remove', 'Remove')}</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Card Content Body */}
                    <div style={{ padding: '1.25rem 1.4rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      
                      {/* Name */}
                      <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: '800', color: '#ffffff' }}>
                        {dest.name}
                      </h3>

                      {/* Location Pin */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#94a3b8' }}>
                        <i className="fa-solid fa-location-dot" style={{ color: '#818cf8', fontSize: '12px' }}></i>
                        <span>{dest.country || 'India'}</span>
                      </div>

                      {/* Rating Row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12.5px' }}>
                        <i className="fa-solid fa-star" style={{ color: '#fbbf24', fontSize: '12px' }}></i>
                        <span style={{ fontWeight: 700, color: '#ffffff' }}>{dest.rating || 4.5}</span>
                        <span style={{ color: '#94a3b8' }}>({dest.reviews || '12K+ reviews'})</span>
                      </div>

                      {/* Category Tags Pills */}
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '2px 0' }}>
                        {tags.map((tag, idx) => (
                          <span
                            key={idx}
                            style={{
                              background: 'rgba(99, 102, 241, 0.12)',
                              border: '1px solid rgba(99, 102, 241, 0.25)',
                              color: '#a5b4fc',
                              fontSize: '11px',
                              fontWeight: 600,
                              borderRadius: '12px',
                              padding: '3px 10px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <i className={idx === 0 ? 'fa-solid fa-mountain' : 'fa-solid fa-leaf'} style={{ fontSize: '9px' }}></i>
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Description */}
                      <p style={{ margin: '4px 0 8px 0', fontSize: '13px', color: '#94a3b8', lineHeight: '1.5', flex: 1 }}>
                        {dest.description || dest.tagline || 'Experience the wonders of this legendary destination.'}
                      </p>

                      {/* Footer Row */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                        paddingTop: '12px',
                        marginTop: 'auto'
                      }}>
                        {dest.status === 'visited' ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#10b981', fontWeight: 600 }}>
                            <span className="material-symbols-rounded" style={{ fontSize: '16px', color: '#10b981' }}>check_circle</span>
                            <span>{t('wishlist.visited', 'Visited')} • {t('common.completed', 'Completed Trip')}</span>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#94a3b8' }}>
                            <i className="fa-regular fa-calendar" style={{ fontSize: '12px', color: '#818cf8' }}></i>
                            <span>{t('common.addedOn', 'Added on')} {dest.addedDate || '15 Oct 2026'}</span>
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => navigate(`/destination/${dest.id}`)}
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            color: '#ffffff',
                            padding: '6px 14px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)';
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.transform = 'translateX(2px)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <span>{t('details.viewDetails', 'View Details')}</span>
                          <i className="fa-solid fa-arrow-right" style={{ fontSize: '10px' }}></i>
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* --- Bottom Page Footer (Exact Screenshot Match) --- */}
        <div style={{ textAlign: 'center', marginTop: '5rem', padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.15)', color: '#818cf8', fontSize: '15px' }}>
            <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>near_me</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', maxWidth: '360px', width: '100%' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.08)' }}></div>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
              More destinations, more memories
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.08)' }}></div>
          </div>
        </div>

      </div>
    </>
  );
}
