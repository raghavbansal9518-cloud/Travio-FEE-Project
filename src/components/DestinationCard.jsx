import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { useLanguage } from '../context/LanguageContext';

export default function DestinationCard({ destination, isGem = false, aiTag = null }) {
  const navigate = useNavigate();
  const { isWishlisted, toggleWishlist } = useTravel();
  const { t } = useLanguage();

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
            <i className="fa-solid fa-gem"></i> {t('explore.hiddenGems', 'Hidden Gem')}
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
            <span className="budget-lbl">{t('details.startingFrom', 'Starting From')}</span>
            <span className="budget-val">{destination.budgetStarting}</span>
          </div>

          <span className="card-explore-link">
            {t('nav.explore', 'Explore')} <i className="fa-solid fa-arrow-right"></i>
          </span>
        </div>
      </div>
    </div>
  );
}
