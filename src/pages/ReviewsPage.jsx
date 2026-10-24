import React, { useState } from 'react';
import Header from '../components/Header';
import { useTravel } from '../context/TravelContext';
import { useLanguage } from '../context/LanguageContext';

const DEFAULT_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    destination: 'Solang Valley, Manali',
    rating: 5,
    date: '12 Oct 2026',
    verified: true,
    title: 'Paragliding at 8,500 ft was utterly mesmerizing!',
    comment: 'Booked tandem paragliding directly through Travio. The pilot was super experienced and the HD GoPro footage was delivered immediately after landing. Do carry an extra thermal layer as the summit winds are chilly!',
    helpfulCount: 38
  },
  {
    id: 'rev-2',
    author: 'Ananya Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    destination: 'South Goa Beachfronts',
    rating: 5,
    date: '05 Oct 2026',
    verified: true,
    title: 'Peaceful coastal retreat away from noisy crowds',
    comment: 'Palolem and Agonda in South Goa are idyllic. The luxury cab service booked on Travio arrived punctually at Dabolim airport with cold water bottles and a very courteous chauffeur. Seamless booking experience!',
    helpfulCount: 29
  },
  {
    id: 'rev-3',
    author: 'Kenji Takahashi',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    destination: 'Shinjuku & Shibuya, Tokyo',
    rating: 5,
    date: '28 Sep 2026',
    verified: true,
    title: 'Flawless culinary walk and Nozomi bullet train sync',
    comment: 'The Shinkansen bullet train connection from Tokyo to Kyoto was clockwork precise. Food guide recommendations for yakitori alleyways led us to one of the best dinners we ever had in Japan.',
    helpfulCount: 44
  }
];

export default function ReviewsPage() {
  const { showToast } = useTravel();
  const { t } = useLanguage();
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('travio_user_reviews');
      return saved ? JSON.parse(saved) : DEFAULT_REVIEWS;
    } catch {
      return DEFAULT_REVIEWS;
    }
  });

  const [filterRating, setFilterRating] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newDestination, setNewDestination] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');

  const filteredReviews = reviews.filter(r => {
    if (filterRating === 'all') return true;
    return r.rating === Number(filterRating);
  });

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newDestination.trim() || !newTitle.trim() || !newComment.trim()) {
      showToast?.('Please complete all review fields.', 'error');
      return;
    }

    const review = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80`,
      destination: newDestination.trim(),
      rating: Number(newRating),
      date: 'Just now',
      verified: true,
      title: newTitle.trim(),
      comment: newComment.trim(),
      helpfulCount: 1
    };

    const updated = [review, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('travio_user_reviews', JSON.stringify(updated));
    } catch (err) {
      // ignore
    }

    showToast?.('Review published with Verified Explorer badge! ⭐', 'success');
    setShowAddModal(false);
    setNewAuthor('');
    setNewDestination('');
    setNewTitle('');
    setNewComment('');
  };

  const handleHelpful = (id) => {
    const updated = reviews.map(r => r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r);
    setReviews(updated);
    try {
      localStorage.setItem('travio_user_reviews', JSON.stringify(updated));
    } catch (err) {
      // ignore
    }
    showToast?.('Thanks for your feedback! 👍', 'info');
  };

  return (
    <>
      <Header />
      <div style={{ padding: '0 0 5rem 0', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-dark)' }}>
        
        {/* Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(234, 88, 12, 0.1) 50%, rgba(124, 58, 237, 0.08) 100%)',
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
              background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(245, 158, 11, 0.35)',
              flexShrink: 0
            }}>
              <span className="material-symbols-rounded" style={{ fontSize: '2.5rem', color: '#fff' }}>
                grade
              </span>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: 0, color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>
                  {t('reviews.title')}
                </h1>
                <span style={{
                  background: 'rgba(245, 158, 11, 0.15)',
                  color: '#fbbf24',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 700
                }}>
                  ⭐ 4.9 Average Rating
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', margin: '6px 0 0 0', fontSize: '1rem', maxWidth: '620px' }}>
                {t('reviews.subtitle')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
              color: '#ffffff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '16px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 16px rgba(245, 158, 11, 0.4)'
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: '20px' }}>rate_review</span>
            {t('reviews.writeReview')}
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '0 5%', maxWidth: '1100px', margin: '0 auto' }}>
          
          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            {[
              { id: 'all', label: 'All Reviews' },
              { id: '5', label: '5 Stars ★★★★★' },
              { id: '4', label: '4 Stars ★★★★☆' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterRating(tab.id)}
                style={{
                  background: filterRating === tab.id ? 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)' : 'rgba(255, 255, 255, 0.04)',
                  color: filterRating === tab.id ? '#ffffff' : 'var(--text-muted)',
                  border: filterRating === tab.id ? 'none' : '1px solid var(--border-color)',
                  padding: '9px 18px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Review Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {filteredReviews.map(rev => (
              <div
                key={rev.id}
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '20px',
                  padding: '1.8rem',
                  backdropFilter: 'blur(16px)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255, 255, 255, 0.1)' }}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--text-dark)' }}>
                          {rev.author}
                        </h4>
                        {rev.verified && (
                          <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            <span className="material-symbols-rounded" style={{ fontSize: '13px' }}>verified</span>
                            Verified Traveler
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        📍 {rev.destination} • 🗓️ {rev.date}
                      </span>
                    </div>
                  </div>

                  <div style={{ color: '#fbbf24', fontSize: '16px', letterSpacing: '2px' }}>
                    {'★'.repeat(rev.rating)}
                    {'☆'.repeat(5 - rev.rating)}
                  </div>
                </div>

                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                  {rev.title}
                </h3>
                <p style={{ margin: '0 0 1.2rem 0', color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6 }}>
                  {rev.comment}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => handleHelpful(rev.id)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-muted)',
                      padding: '6px 14px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: '15px', color: '#10b981' }}>thumb_up</span>
                    Helpful ({rev.helpfulCount})
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for writing review */}
        {showAddModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.98)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '520px', boxShadow: '0 24px 64px rgba(0,0,0,0.8)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>Share Travel Experience</h2>
                <span className="material-symbols-rounded" style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => setShowAddModal(false)}>close</span>
              </div>

              <form onSubmit={handleAddReview} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Raghav B."
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>Destination Visited</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Manali, India"
                      value={newDestination}
                      onChange={(e) => setNewDestination(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>Rating</label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                    >
                      <option value={5}>5 Stars ★★★★★</option>
                      <option value={4}>4 Stars ★★★★☆</option>
                      <option value={3}>3 Stars ★★★☆☆</option>
                      <option value={2}>2 Stars ★★☆☆☆</option>
                      <option value={1}>1 Star ★☆☆☆☆</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>Headline</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Breathtaking views!"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>Review Details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share honest feedback about the journey, driver, amenities, or hotel room..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    style={{ padding: '10px 18px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', color: '#cbd5e1', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '10px 22px', borderRadius: '10px', background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                  >
                    Post Review
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
