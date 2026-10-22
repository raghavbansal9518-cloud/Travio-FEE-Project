import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';

export default function DestinationCard({ destination, isGem = false, aiTag = null }) {
  const navigate = useNavigate();
  const { isWishlisted, toggleWishlist } = useTravel();

  const isBookmarked = isWishlisted(destination.id);

  const handleCardClick = (e) => {
    if (e.target.closest('.bookmark-toggle-btn')) return;
    navigate(`/destination/${destination.id}`);
  };

  const handleBookmarkToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(destination);
  };

  const cardAiTag = aiTag || destination.aiTag;
  const fallbackImg = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80';

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = fallbackImg;
  };

  return (
    <div 
      className="destination-card" 
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${destination.name}`}
    >
      <div className="card-media-box">
        <img 
          src={destination.cardImage || destination.heroImage || fallbackImg} 
          alt={`${destination.name}, ${destination.country}`}
          className="card-image"
          loading="lazy"
          onError={handleImgError}
        />

        <div className="card-top-badges">
          <div className="rating-pill">
            <i className="fa-solid fa-star"></i>
            <span>{destination.rating}</span>
          </div>

          <button
            type="button"
            className="card-food-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/food-guide?destination=${destination.id}`);
            }}
            title={`View local food guide for ${destination.name}`}
            style={{
              background: 'rgba(16, 12, 32, 0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(168, 85, 247, 0.45)',
              color: '#F3E8FF',
              padding: '4px 9px',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <i className="fa-solid fa-utensils" style={{ color: '#C084FC', fontSize: '10px' }}></i>
            <span>Food</span>
          </button>

          <button 
            type="button"
            className={`bookmark-toggle-btn ${isBookmarked ? 'saved' : ''}`}
            onClick={handleBookmarkToggle}
            title={isBookmarked ? 'Saved to Wishlist' : 'Bookmark Destination'}
            aria-label="Save to Wishlist"
          >
            <i className={isBookmarked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
          </button>
        </div>

        {isGem && (
          <div className="gem-tag-pill">
            <i className="fa-solid fa-gem"></i> Hidden Gem
          </div>
        )}

        {cardAiTag && (
          <div className="gem-tag-pill" style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' }}>
            <i className="fa-solid fa-wand-magic-sparkles"></i> {cardAiTag}
          </div>
        )}

        {destination.photoAttribution && (
          <div style={{ position: 'absolute', bottom: '6px', left: '8px', fontSize: '9px', color: 'rgba(255,255,255,0.7)', textShadow: '0 1px 3px rgba(0,0,0,0.8)', pointerEvents: 'none', zIndex: 2 }}>
            📷 {destination.photoAttribution.name}
          </div>
        )}
      </div>

      <div className="card-info-body">
        <div className="card-title-row">
          <h3 className="card-dest-name">{destination.name}</h3>
          <span className="card-country-flag">
            <span>{destination.flag}</span>
            <span>{destination.country}</span>
          </span>
        </div>

        <p className="card-short-desc">
          {destination.tagline && <strong>{destination.tagline}</strong>}
          {destination.description && <span>{destination.description}</span>}
        </p>

        <div className="card-footer-row">
          <div className="budget-group">
            <span className="budget-lbl">Starting From</span>
            <span className="budget-val">{destination.budgetStarting}</span>
          </div>

          <span className="card-explore-link">
            Explore <i className="fa-solid fa-arrow-right"></i>
          </span>
        </div>
      </div>
    </div>
  );
}
