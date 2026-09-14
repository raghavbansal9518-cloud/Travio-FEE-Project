import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DestinationCard({ destination, isGem = false, aiTag = null }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    if (e.target.closest('.bookmark-toggle-btn')) return;
    navigate(`/destination/${destination.id}`);
  };

  const handleBookmarkToggle = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
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
          src={destination.cardImage || destination.heroImage} 
          alt={`${destination.name}, ${destination.country}`}
          className="card-image"
          loading="lazy"
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
            <i className="fa-solid fa-gem"></i> Hidden Gem
          </div>
        )}

        {aiTag && (
          <div className="gem-tag-pill" style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' }}>
            <i className="fa-solid fa-wand-magic-sparkles"></i> {aiTag}
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
          {destination.description || destination.tagline}
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
