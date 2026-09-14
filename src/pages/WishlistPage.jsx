import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('wishlist_destinations') || '[]');
    setWishlist(saved);
  }, []);

  const removeFromWishlist = (id) => {
    const newWishlist = wishlist.filter(item => item.id !== id);
    setWishlist(newWishlist);
    localStorage.setItem('wishlist_destinations', JSON.stringify(newWishlist));
    
    // Also update the ids for DestinationsCarousel
    const savedIds = new Set(JSON.parse(localStorage.getItem('wishlist_ids') || '[]'));
    savedIds.delete(id);
    localStorage.setItem('wishlist_ids', JSON.stringify(Array.from(savedIds)));
  };

  return (
    <>
      <Header />
      <div style={{ padding: '0 0 4rem 0', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-dark)' }}>
        
        {/* Decorative Hero Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(106, 76, 255, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)', 
          padding: '4rem 5%', 
          marginBottom: '3rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #7c3aed 0%, #f43f5e 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(124, 58, 237, 0.4)'
          }}>
            <span className="material-symbols-rounded" style={{ fontSize: '2.5rem', color: '#fff', fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </div>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0 0 0.5rem 0', color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>Dream Destinations</h1>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1.1rem', maxWidth: '600px' }}>
              Your personal collection of places to explore. Plan your next adventure by saving your favorite spots here.
            </p>
          </div>
        </div>

        <div style={{ padding: '0 5%' }}>
          {wishlist.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--card-bg)', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}>
                <span className="material-symbols-rounded" style={{ fontSize: '4rem', color: 'var(--text-muted)' }}>heart_broken</span>
              </div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-dark)', fontSize: '1.5rem' }}>Your wishlist is empty</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Start exploring and add your favorite destinations!</p>
              <Link to="/dashboard" style={{ padding: '0.8rem 2rem', background: 'var(--primary-color)', color: '#fff', borderRadius: '30px', textDecoration: 'none', fontWeight: '600', transition: 'background 0.3s ease', display: 'inline-block' }} onMouseOver={(e) => e.target.style.background = 'var(--primary-hover)'} onMouseOut={(e) => e.target.style.background = 'var(--primary-color)'}>
                Explore Destinations
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
              {wishlist.map((dest) => (
                <div 
                  key={dest.id} 
                  className="destination-card" 
                  style={{ position: 'relative', width: '100%', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                  onClick={() => navigate(`/destination/${dest.id}`)}
                >
                  <div style={{ position: 'relative' }}>
                    <img src={dest.image || dest.cardImage || dest.heroImage} alt={dest.name} style={{ width: '100%', height: '220px', objectFit: 'cover', borderTopLeftRadius: 'var(--border-radius)', borderTopRightRadius: 'var(--border-radius)' }} />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(dest.id);
                      }}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(4px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#F43F5E',
                        transition: 'all 0.2s ease'
                      }}
                      title="Remove from Wishlist"
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.background = 'rgba(0,0,0,0.7)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.background = 'rgba(0,0,0,0.5)';
                      }}
                    >
                      <span className="material-symbols-rounded" style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}>favorite</span>
                    </button>
                  </div>

                  <div style={{ padding: '1.5rem', background: 'var(--card-bg)', borderBottomLeftRadius: 'var(--border-radius)', borderBottomRightRadius: 'var(--border-radius)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem', color: 'var(--text-dark)', fontWeight: '700' }}>{dest.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f59e0b', marginBottom: '1rem' }}>
                        <span className="material-symbols-rounded" style={{ fontSize: '1.2rem', fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span style={{ fontWeight: 'bold' }}>{dest.rating}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>({dest.reviews || 'New'})</span>
                      </div>
                    </div>
                    
                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       {dest.bestTime && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
                           <span className="material-symbols-rounded" style={{ fontSize: '1.1rem' }}>calendar_month</span>
                           <span style={{ fontSize: '0.9rem' }}>{dest.bestTime}</span>
                        </div>
                       )}
                       {dest.budgetStarting && (
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-dark)', fontWeight: '600' }}>
                           {dest.budgetStarting}
                        </div>
                       )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
