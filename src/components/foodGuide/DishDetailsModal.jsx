import { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FALLBACK_FOOD_IMG, FOOD_DESTINATIONS } from '../../data/foodGuideData';

export default function DishDetailsModal({
  dish,
  onClose,
  isFavourited,
  onToggleFavourite,
  onAddToTrail,
  isInTrail,
  onSeeOnMap
}) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!dish) return null;

  const isVeg = dish.diet === 'Veg' || dish.diet?.toLowerCase().includes('veg');
  const spiceRating = dish.spiceLevel === 'Fiery' ? 3 : dish.spiceLevel === 'Medium' ? 2 : 1;
  const destFlag = dish.flag || FOOD_DESTINATIONS.find(d => d.id === dish.destinationId)?.flag || '📍';

  return (
    <div className="fg-modal-overlay" onClick={onClose}>
      <div 
        className="fg-modal-card" 
        onClick={(e) => e.stopPropagation()} 
        role="dialog" 
        aria-modal="true"
      >
        <button 
          type="button" 
          className="fg-modal-close" 
          onClick={onClose} 
          title="Close details"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Left Side: Photo Gallery */}
        <div className="fg-modal-gallery">
          <img
            src={dish.image || FALLBACK_FOOD_IMG}
            alt={dish.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_FOOD_IMG;
            }}
          />
          <div className="fg-gallery-gradient" />
        </div>

        {/* Right Side: Detailed Culinary Info */}
        <div className="fg-modal-info">
          <div className="fg-modal-eyebrow">
            <span>{destFlag} {dish.destinationName}</span>
            <span>•</span>
            <span>{dish.cuisine}</span>
          </div>

          <h2>{dish.name}</h2>

          <div className="fg-modal-stats-bar">
            <div className="fg-modal-stat-pill" style={{ color: '#FBBF24' }}>
              <i className="fa-solid fa-star"></i>
              <span>{dish.rating} ({dish.reviews?.toLocaleString()} reviews)</span>
            </div>

            <div className="fg-modal-stat-pill" style={{ color: '#34D399' }}>
              <i className="fa-solid fa-indian-rupee-sign"></i>
              <span>₹{dish.minPrice} – ₹{dish.maxPrice}</span>
            </div>

            <div className="fg-modal-stat-pill" style={{ color: isVeg ? '#6EE7B7' : '#FCA5A5' }}>
              <span>●</span>
              <span>{isVeg ? t('phrases.Veg', 'Veg') : t('phrases.Non-Veg', 'Non-Veg')}</span>
            </div>

            <div className="fg-modal-stat-pill" style={{ color: '#C084FC' }}>
              <i className="fa-solid fa-clock"></i>
              <span>{dish.meal}</span>
            </div>
          </div>

          <p className="fg-modal-desc">
            {dish.description}
          </p>

          {/* Taste & Spice Grid */}
          <div className="fg-taste-spice-grid">
            <div className="fg-taste-item">
              <label>{t('phrases.Taste Profile', 'Taste Profile')}</label>
              <span>{dish.tasteProfile || 'Rich & authentic regional flavors'}</span>
            </div>

            <div className="fg-taste-item">
              <label>{t('phrases.Spice Level', 'Spice Level')} ({dish.spiceLevel || 'Mild'})</label>
              <div className="fg-spice-dots">
                {[1, 2, 3].map((lvl) => (
                  <span
                    key={lvl}
                    className={`fg-spice-dot ${lvl <= spiceRating ? 'active' : ''}`}
                    title={dish.spiceLevel}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Origin Story */}
          {dish.origin && (
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--fg-text-muted)', fontWeight: 700, letterSpacing: '0.8px', display: 'block', marginBottom: '4px' }}>
                {t('phrases.Culinary Heritage & Origin', 'Culinary Heritage & Origin')}
              </span>
              <p style={{ fontSize: '13px', color: '#D8B4FE', margin: 0, lineHeight: 1.5 }}>
                {dish.origin}
              </p>
            </div>
          )}

          {/* Ingredients */}
          {dish.ingredients && dish.ingredients.length > 0 && (
            <div className="fg-ingredients-wrap">
              <h4>{t('phrases.Key Ingredients', 'Key Ingredients')}</h4>
              <div className="fg-ing-chips">
                {dish.ingredients.map((ing, i) => (
                  <span key={i} className="fg-ing-chip">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Where to Try It */}
          <div className="fg-places-section">
            <h3>{t('phrases.Where to Try It in', 'Where to Try It in')} {dish.destinationName}</h3>
            {dish.recommendedPlaces && dish.recommendedPlaces.length > 0 ? (
              dish.recommendedPlaces.map((place, index) => (
                <div key={index} className="fg-place-item">
                  <div className="fg-place-meta">
                    <strong>{place.name}</strong>
                    <p>
                      ★ {place.rating} • {place.neighborhood || place.address} • ~{place.distanceKm} km
                    </p>
                    {place.highlight && (
                      <p style={{ color: '#C084FC', fontSize: '11px', marginTop: '2px' }}>
                        ✦ {place.highlight}
                      </p>
                    )}
                  </div>

                  <div className="fg-place-actions">
                    <button
                      type="button"
                      className="fg-btn-see-map"
                      onClick={() => onSeeOnMap(place, dish)}
                      title="See restaurant location on Travio's interactive map"
                    >
                      <i className="fa-solid fa-location-arrow"></i>
                      <span>{t('phrases.See on Map', 'See on Map')}</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ fontSize: '13px', color: 'var(--fg-text-muted)' }}>
                Recommended dining spots available in local food guide directory.
              </p>
            )}
          </div>

          {/* Bottom Actions */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '26px', borderTop: '1px solid var(--fg-border-light)', paddingTop: '18px' }}>
            <button
              type="button"
              className={`fg-btn-add-trail ${isInTrail ? 'added' : ''}`}
              style={{ flex: 1, padding: '12px 20px', fontSize: '14px' }}
              onClick={() => onAddToTrail(dish)}
            >
              <i className={`fa-solid ${isInTrail ? 'fa-check' : 'fa-plus'}`}></i>
              <span>{isInTrail ? t('phrases.Included in Food Trail', 'Included in Food Trail') : t('phrases.Add to Food Trail', 'Add to Food Trail')}</span>
            </button>

            <button
              type="button"
              className={`fg-btn-fav ${isFavourited ? 'favourited' : ''}`}
              style={{ width: '46px', height: '46px' }}
              onClick={() => onToggleFavourite(dish)}
              title={isFavourited ? 'Remove from favourites' : 'Save to favourites'}
            >
              <i className={`fa-${isFavourited ? 'solid' : 'regular'} fa-heart`} style={{ fontSize: '18px' }}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
