import React from 'react';
import { FALLBACK_FOOD_IMG } from '../../data/foodGuideData';

export default function FoodCard({
  dish,
  isFavourited,
  onToggleFavourite,
  onViewDetails,
  onAddToTrail,
  isInTrail
}) {
  const isVeg = dish.diet === 'Veg' || dish.diet.toLowerCase().includes('veg');

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = FALLBACK_FOOD_IMG;
  };

  return (
    <article className="fg-dish-card">
      <div className="fg-card-image-box">
        <img
          src={dish.image || FALLBACK_FOOD_IMG}
          alt={dish.name}
          className="fg-card-img"
          loading="lazy"
          onError={handleImgError}
        />

        {/* Top Badges */}
        <div className="fg-card-badges-top">
          <span className={`fg-badge-diet ${isVeg ? 'veg' : 'non-veg'}`}>
            <span>●</span>
            <span>{isVeg ? 'Veg' : 'Non-Veg'}</span>
          </span>

          <span className="fg-badge-rating">
            <i className="fa-solid fa-star"></i>
            <span>{dish.rating}</span>
          </span>
        </div>

        {/* Top Action: Favourite Button */}
        <div className="fg-card-actions-top">
          <button
            type="button"
            className={`fg-btn-fav ${isFavourited ? 'favourited' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavourite(dish);
            }}
            title={isFavourited ? 'Remove from favourites' : 'Save to favourites'}
            aria-label={`Favourite ${dish.name}`}
          >
            <i className={`fa-${isFavourited ? 'solid' : 'regular'} fa-heart`}></i>
          </button>
        </div>

        {/* Bottom Destination Tag */}
        <div className="fg-card-location-tag">
          📍 {dish.destinationName}
        </div>
      </div>

      <div className="fg-card-body">
        <div className="fg-card-cuisine-meta">
          <span className="fg-card-cuisine">{dish.cuisine}</span>
          <span className="fg-card-est-type">{dish.establishment}</span>
        </div>

        <h3 className="fg-card-title" title={dish.name}>
          {dish.name}
        </h3>

        <p className="fg-card-desc">
          {dish.description}
        </p>

        <div className="fg-card-price-taste">
          <span className="fg-price-tag">
            ₹{dish.minPrice}–₹{dish.maxPrice}
          </span>
          <span className="fg-taste-tag" title={dish.tasteProfile}>
            {dish.tasteProfile}
          </span>
        </div>

        <div className="fg-card-footer-btns">
          <button
            type="button"
            className="fg-btn-view-details"
            onClick={() => onViewDetails(dish)}
          >
            <span>Details</span>
            <i className="fa-solid fa-arrow-right" style={{ marginLeft: '4px', fontSize: '11px' }}></i>
          </button>

          <button
            type="button"
            className={`fg-btn-add-trail ${isInTrail ? 'added' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToTrail(dish);
            }}
            title={isInTrail ? 'Included in your Food Trail' : 'Add to Food Trail itinerary'}
          >
            <i className={`fa-solid ${isInTrail ? 'fa-check' : 'fa-plus'}`}></i>
            <span>{isInTrail ? 'In Trail' : 'Add Trail'}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
