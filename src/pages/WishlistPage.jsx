import { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { useLanguage } from '../context/LanguageContext';

export default function WishlistPage() {
  const navigate = useNavigate();
  const { wishlist, updateWishlistStatus, removeFromWishlist, showToast } = useTravel();
  const { t } = useLanguage();
  
  // Filters: Category & Status
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeStatus, setActiveStatus] = useState('all'); // 'all' | 'saved' | 'planned' | 'visited'
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    if (openDropdownId) {
      window.addEventListener('click', handleClickOutside);
      return () => window.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdownId]);

  // Helper to determine category metadata & icons
  const getItemCategoryMeta = (item) => {
    const cat = String(item.category || item.itemType || '').toLowerCase();
    if (cat.includes('beach')) return { label: t('phrases.Beaches', 'Beach & Coastal'), icon: 'fa-umbrella-beach', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' };
    if (cat.includes('mountain') || cat.includes('hill')) return { label: t('phrases.Mountains', 'Mountain Escape'), icon: 'fa-mountain', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' };
    if (cat.includes('heritage') || cat.includes('culture')) return { label: t('phrases.Heritage', 'Heritage & Culture'), icon: 'fa-landmark-dome', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)' };
    if (cat.includes('activit') || item.itemType === 'activity') return { label: t('nav.activities', 'Activity & Adventure'), icon: 'fa-person-hiking', color: '#c084fc', bg: 'rgba(192, 132, 252, 0.15)' };
    if (cat.includes('food') || item.itemType === 'food') return { label: t('nav.foodGuide', 'Food & Dining'), icon: 'fa-utensils', color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.15)' };
    return { label: t('phrases.Destination', 'Destination'), icon: 'fa-map-pin', color: '#818cf8', bg: 'rgba(129, 140, 248, 0.15)' };
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: wishlist.length, beaches: 0, mountains: 0, heritage: 0, activities: 0, food: 0 };
    wishlist.forEach((item) => {
      const cat = String(item.category || item.itemType || '').toLowerCase();
      const tags = Array.isArray(item.tags) ? item.tags.join(' ').toLowerCase() : '';
      const combo = `${cat} ${tags} ${String(item.name || '').toLowerCase()}`;
      if (combo.includes('beach') || combo.includes('coastal')) counts.beaches++;
      else if (combo.includes('mountain') || combo.includes('hill') || combo.includes('alps')) counts.mountains++;
      else if (combo.includes('heritage') || combo.includes('culture') || combo.includes('historic') || combo.includes('cit')) counts.heritage++;
      else if (combo.includes('activit') || combo.includes('adventur') || combo.includes('sport') || combo.includes('trek') || item.itemType === 'activity') counts.activities++;
      else if (combo.includes('food') || combo.includes('culinary') || combo.includes('dining') || item.itemType === 'food') counts.food++;
    });
    return counts;
  }, [wishlist]);

  // Status counts
  const plannedCount = wishlist.filter((item) => item.status === 'planned').length;
  const visitedCount = wishlist.filter((item) => item.status === 'visited').length;
  const savedCount = wishlist.filter((item) => item.status === 'saved' || (item.status !== 'planned' && item.status !== 'visited')).length;

  // Filtered List
  const filteredItems = useMemo(() => {
    return wishlist.filter((item) => {
      // 1. Status Filter
      if (activeStatus === 'planned' && item.status !== 'planned') return false;
      if (activeStatus === 'visited' && item.status !== 'visited') return false;
      if (activeStatus === 'saved' && (item.status === 'planned' || item.status === 'visited')) return false;

      // 2. Category Filter
      if (selectedCategory !== 'all') {
        const cat = String(item.category || item.itemType || '').toLowerCase();
        if (selectedCategory === 'beaches' && !cat.includes('beach')) return false;
        if (selectedCategory === 'mountains' && !cat.includes('mountain') && !cat.includes('hill')) return false;
        if (selectedCategory === 'heritage' && !cat.includes('heritage') && !cat.includes('culture')) return false;
        if (selectedCategory === 'activities' && !cat.includes('activit') && item.itemType !== 'activity') return false;
        if (selectedCategory === 'food' && !cat.includes('food') && item.itemType !== 'food') return false;
      }

      // 3. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = String(item.name || '').toLowerCase().includes(q);
        const matchesCountry = String(item.country || '').toLowerCase().includes(q);
        const matchesTags = (item.tags || []).some((t) => String(t).toLowerCase().includes(q));
        if (!matchesName && !matchesCountry && !matchesTags) return false;
      }

      return true;
    });
  }, [wishlist, activeStatus, selectedCategory, searchQuery]);

  return (
    <>
      <Header />
      <div style={{ padding: '0 0 5rem 0', minHeight: '100vh', background: '#070a13', color: '#ffffff' }}>
        
        {/* --- Top Banner & Header Section --- */}
        <div style={{ padding: '2.5rem 4% 1.5rem 4%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            
            {/* Title & Subtitle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
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
                <span className="material-symbols-rounded" style={{ fontSize: '28px', fontVariationSettings: "'FILL' 1" }}>
                  favorite
                </span>
              </div>
              <div>
                <h1 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0 0 4px 0', letterSpacing: '-0.02em', color: '#ffffff' }}>
                  {t('wishlist.title', 'My Saved Travel Wishlist')}
                </h1>
                <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem' }}>
                  {t('wishlist.subtitle', 'Organize your dream destinations, booked journeys, outdoor adventures, and food trails by category.')}
                </p>
              </div>
            </div>

            {/* Right Action: Clean Explore More Link */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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
                  padding: '10px 18px',
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
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.color = '#e2e8f0';
                }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: '18px', color: '#818cf8' }}>travel_explore</span>
                <span>{t('dashboard.exploreDestinations', 'Explore Destinations')}</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/activities')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#34d399',
                  padding: '10px 18px',
                  borderRadius: '24px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <i className="fa-solid fa-person-hiking" style={{ fontSize: '14px' }}></i>
                <span>{t('nav.activities', 'Activities')}</span>
              </button>
            </div>
          </div>

          {/* Quick Search in Wishlist */}
          <div style={{ marginTop: '1.5rem', maxWidth: '420px', position: 'relative' }}>
            <span className="material-symbols-rounded" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '18px' }}>
              search
            </span>
            <input
              type="text"
              placeholder={t('phrases.Search in your wishlist...', 'Search your saved places, activities or dishes...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 16px 9px 40px',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          {/* --- 1. CATEGORY PILLS BAR (Categorization from All Pages) --- */}
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8', fontWeight: 700, marginBottom: '8px' }}>
              {t('phrases.Filter by Category', 'Filter by Travel Category')}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'all', icon: '🌐', label: t('phrases.All Saved Items', 'All Saved Items'), count: categoryCounts.all },
                { id: 'beaches', icon: '🏖️', label: t('phrases.Beaches & Coastal', 'Beaches & Coastal'), count: categoryCounts.beaches },
                { id: 'mountains', icon: '🏔️', label: t('phrases.Mountains & Hills', 'Mountains & Hills'), count: categoryCounts.mountains },
                { id: 'heritage', icon: '🏛️', label: t('phrases.Heritage & Cities', 'Heritage & Cities'), count: categoryCounts.heritage },
                { id: 'activities', icon: '🤿', label: t('phrases.Activities & Sports', 'Activities & Sports'), count: categoryCounts.activities },
                { id: 'food', icon: '🍲', label: t('phrases.Food & Culinary', 'Food & Culinary'), count: categoryCounts.food }
              ].map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      background: isActive ? 'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)' : 'rgba(255, 255, 255, 0.04)',
                      border: isActive ? '1px solid rgba(124, 58, 237, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: isActive ? '#ffffff' : '#cbd5e1',
                      padding: '7px 16px',
                      borderRadius: '20px',
                      fontSize: '12.5px',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isActive ? '0 4px 14px rgba(99, 102, 241, 0.35)' : 'none'
                    }}
                  >
                    <span>{cat.icon} {cat.label}</span>
                    <span style={{ marginLeft: '6px', opacity: 0.75, fontSize: '11.5px' }}>({cat.count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* --- 2. STATUS PILLS BAR (Saved, Planned, Visited) --- */}
          <div style={{ marginTop: '1.25rem' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8', fontWeight: 700, marginBottom: '8px' }}>
              {t('phrases.Filter by Status', 'Trip Planning Status')}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setActiveStatus('all')}
                style={{
                  background: activeStatus === 'all' ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.03)',
                  border: activeStatus === 'all' ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.06)',
                  color: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: '16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {t('common.all', 'All Statuses')} ({wishlist.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveStatus('saved')}
                style={{
                  background: activeStatus === 'saved' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  border: activeStatus === 'saved' ? '1px solid rgba(245, 158, 11, 0.5)' : '1px solid rgba(255, 255, 255, 0.06)',
                  color: activeStatus === 'saved' ? '#fbbf24' : '#cbd5e1',
                  padding: '6px 14px',
                  borderRadius: '16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                ❤️ {t('phrases.Saved', 'Saved (Dream)')} ({savedCount})
              </button>

              <button
                type="button"
                onClick={() => setActiveStatus('planned')}
                style={{
                  background: activeStatus === 'planned' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                  border: activeStatus === 'planned' ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid rgba(255, 255, 255, 0.06)',
                  color: activeStatus === 'planned' ? '#a5b4fc' : '#cbd5e1',
                  padding: '6px 14px',
                  borderRadius: '16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                📅 {t('wishlist.planned', 'Planned Trips')} ({plannedCount})
              </button>

              <button
                type="button"
                onClick={() => setActiveStatus('visited')}
                style={{
                  background: activeStatus === 'visited' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  border: activeStatus === 'visited' ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid rgba(255, 255, 255, 0.06)',
                  color: activeStatus === 'visited' ? '#34d399' : '#cbd5e1',
                  padding: '6px 14px',
                  borderRadius: '16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                🏆 {t('wishlist.visited', 'Visited Milestones')} ({visitedCount})
              </button>
            </div>
          </div>
        </div>

        {/* --- Cards Grid Section --- */}
        <div style={{ padding: '0 4%' }}>
          {filteredItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#94a3b8' }}>
              <span className="material-symbols-rounded" style={{ fontSize: '3.5rem', color: '#818cf8', opacity: 0.8 }}>
                favorite_border
              </span>
              <h3 style={{ color: '#ffffff', marginTop: '1rem', fontSize: '1.4rem' }}>
                {t('wishlist.noDestinations', 'No items in this category or status filter')}
              </h3>
              <p style={{ fontSize: '0.95rem', maxWidth: '520px', margin: '8px auto 0 auto', lineHeight: '1.6' }}>
                Add items to your wishlist from the <strong>Explore Page</strong>, <strong>Activities Page</strong>, or <strong>Food Guide</strong> by clicking their heart icons!
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => { setSelectedCategory('all'); setActiveStatus('all'); setSearchQuery(''); }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    padding: '10px 22px',
                    borderRadius: '24px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Reset All Filters
                </button>

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
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {filteredItems.map((dest) => {
                const tags = dest.tags || ['Nature', 'Scenic'];
                const meta = getItemCategoryMeta(dest);
                const isActivity = dest.itemType === 'activity' || String(dest.category).toLowerCase().includes('activit');
                const isFood = dest.itemType === 'food' || String(dest.category).toLowerCase().includes('food');

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
                    {/* Media Thumbnail */}
                    <div style={{ position: 'relative', height: '220px' }}>
                      <img
                        src={dest.cardImage || dest.heroImage || dest.image}
                        alt={dest.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px 20px 0 0' }}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80';
                        }}
                      />

                      {/* Top Left: Category Badge */}
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
                          gap: '6px',
                          background: meta.bg,
                          color: meta.color,
                          border: `1px solid ${meta.color}40`,
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          zIndex: 5
                        }}
                      >
                        <i className={`fa-solid ${meta.icon}`}></i>
                        <span>{meta.label}</span>
                      </div>

                      {/* Top Right: Glowing Red Heart Button */}
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
                        title={t('common.remove', 'Remove from Wishlist')}
                        aria-label="Remove from Wishlist"
                      >
                        <span className="material-symbols-rounded" style={{ fontVariationSettings: "'FILL' 1", fontSize: '18px', color: '#ffffff' }}>
                          favorite
                        </span>
                      </button>

                      {/* Bottom Left: Status Tag */}
                      <div style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '12px',
                        background: 'rgba(15, 23, 42, 0.85)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: dest.status === 'visited' ? '#34d399' : dest.status === 'planned' ? '#a5b4fc' : '#fbbf24',
                        padding: '3px 10px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 600,
                        backdropFilter: 'blur(6px)'
                      }}>
                        {dest.status === 'visited' ? '🏆 Visited' : dest.status === 'planned' ? '📅 Planned' : '❤️ Dream List'}
                      </div>

                      {/* Bottom Right: More Options Button (...) */}
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
                          background: 'rgba(13, 17, 29, 0.85)',
                          backdropFilter: 'blur(6px)',
                          WebkitBackdropFilter: 'blur(6px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          zIndex: 5
                        }}
                        title="Status Options"
                      >
                        <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>
                          more_horiz
                        </span>
                      </button>

                      {/* Options Dropdown Menu */}
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
                          >
                            <span className="material-symbols-rounded" style={{ fontSize: '15px', color: '#f59e0b' }}>bookmark</span>
                            <span>{t('wishlist.markSaved', 'Mark as Saved')}</span>
                          </button>

                          <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '2px 0' }} />

                          <button
                            type="button"
                            onClick={() => {
                              removeFromWishlist(dest.id);
                              setOpenDropdownId(null);
                            }}
                            style={{ background: 'none', border: 'none', color: '#f43f5e', padding: '8px 12px', fontSize: '12px', textAlign: 'left', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}
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

                      {/* Price / Budget Row */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12.5px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <i className="fa-solid fa-star" style={{ color: '#fbbf24', fontSize: '12px' }}></i>
                          <span style={{ fontWeight: 700, color: '#ffffff' }}>{dest.rating || 4.5}</span>
                          <span style={{ color: '#94a3b8' }}>({dest.reviews || '12K+ reviews'})</span>
                        </div>
                        <div style={{ fontWeight: 700, color: '#38bdf8' }}>
                          {dest.budgetStarting || (dest.price ? `₹${dest.price}` : '₹15,000')}
                        </div>
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
                            <i className="fa-solid fa-tag" style={{ fontSize: '9px' }}></i>
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Description */}
                      <p style={{ margin: '4px 0 8px 0', fontSize: '13px', color: '#94a3b8', lineHeight: '1.5', flex: 1 }}>
                        {dest.description || dest.tagline || 'Experience the wonders of this legendary travel highlight.'}
                      </p>

                      {/* Footer Row with Smart Action Button */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                        paddingTop: '12px',
                        marginTop: 'auto'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#94a3b8' }}>
                          <i className="fa-regular fa-calendar" style={{ fontSize: '12px', color: '#818cf8' }}></i>
                          <span>{dest.addedDate || '15 Oct 2026'}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (isActivity) navigate('/activities');
                            else if (isFood) navigate('/food-guide');
                            else navigate(`/destination/${dest.id}`);
                          }}
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
                          <span>{isActivity ? 'Book Activity' : isFood ? 'View Food Guide' : t('details.viewDetails', 'View Details')}</span>
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

        {/* --- Bottom Page Footer --- */}
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
