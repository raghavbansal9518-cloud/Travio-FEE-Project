import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function FoodFilters({
  searchQuery,
  onSearchChange,
  dietFilter,
  onDietChange,
  budgetFilter,
  onBudgetChange,
  establishmentFilter,
  onEstablishmentChange,
  minRating,
  onMinRatingChange,
  mustTryOnly,
  onMustTryChange,
  onResetFilters,
  onOpenTrailWizard,
  onOpenSavedTrails,
  onSwitchToTrailsView,
  savedTrailsCount = 0
}) {
  const { t } = useLanguage();
  const isAnyFilterActive =
    Boolean(searchQuery.trim()) ||
    dietFilter !== 'all' ||
    budgetFilter !== 'all' ||
    establishmentFilter !== 'all' ||
    minRating > 0 ||
    mustTryOnly;

  return (
    <section className="fg-filter-section" aria-label="Food Search and Filters">
      {/* Search Input and Food Trail Action */}
      <div className="fg-search-trail-row">
        <div className="fg-search-box">
          <i className="fa-solid fa-magnifying-glass fg-search-icon"></i>
          <input
            type="text"
            placeholder={t('header.searchPlaceholder', 'Search dishes, restaurants, spices or cuisines...')}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="fg-clear-search"
              onClick={() => onSearchChange('')}
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <button
          type="button"
          className="btn-launch-trail"
          onClick={onSwitchToTrailsView || onOpenTrailWizard}
          title="Switch to Curated Food Trails"
        >
          <i className="fa-solid fa-route"></i>
          <span>Curated Food Trails</span>
        </button>

        <button
          type="button"
          className="btn-launch-trail"
          style={{
            background: 'rgba(168, 85, 247, 0.15)',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            color: '#E9D5FF'
          }}
          onClick={onOpenTrailWizard}
          title="Open interactive 3-step Food Trail planner"
        >
          <i className="fa-solid fa-wand-magic-sparkles"></i>
          <span>Trail Planner</span>
        </button>

        {savedTrailsCount > 0 && (
          <button
            type="button"
            className="btn-saved-trails"
            onClick={onOpenSavedTrails}
            title="View your saved food itineraries"
          >
            <i className="fa-solid fa-bookmark" style={{ color: '#C084FC' }}></i>
            <span>Saved Trails ({savedTrailsCount})</span>
          </button>
        )}
      </div>

      {/* Filter Chips Bar */}
      <div className="fg-chips-row">
        {/* Must Try Toggle */}
        <button
          type="button"
          className={`fg-filter-chip ${mustTryOnly ? 'active' : ''}`}
          onClick={() => onMustTryChange(!mustTryOnly)}
        >
          <i className="fa-solid fa-fire" style={{ color: '#F59E0B' }}></i>
          <span>{t('food.mustTry', 'Must Try Iconic')}</span>
        </button>

        {/* Veg Only */}
        <button
          type="button"
          className={`fg-filter-chip ${dietFilter === 'Veg' ? 'active-diet-veg' : ''}`}
          onClick={() => onDietChange(dietFilter === 'Veg' ? 'all' : 'Veg')}
        >
          <span style={{ color: '#10B981', fontSize: '10px' }}>●</span>
          <span>{t('food.vegetarian', 'Veg Only')}</span>
        </button>

        {/* Non-Veg Only */}
        <button
          type="button"
          className={`fg-filter-chip ${dietFilter === 'Non-Veg' ? 'active-diet-nonveg' : ''}`}
          onClick={() => onDietChange(dietFilter === 'Non-Veg' ? 'all' : 'Non-Veg')}
        >
          <span style={{ color: '#EF4444', fontSize: '10px' }}>●</span>
          <span>{t('food.nonVeg', 'Non-Veg Only')}</span>
        </button>

        {/* Budget: Under 150 */}
        <button
          type="button"
          className={`fg-filter-chip ${budgetFilter === 'budget' ? 'active' : ''}`}
          onClick={() => onBudgetChange(budgetFilter === 'budget' ? 'all' : 'budget')}
        >
          <i className="fa-solid fa-wallet"></i>
          <span>Budget (&lt; ₹150)</span>
        </button>

        {/* Budget: 150 - 400 */}
        <button
          type="button"
          className={`fg-filter-chip ${budgetFilter === 'moderate' ? 'active' : ''}`}
          onClick={() => onBudgetChange(budgetFilter === 'moderate' ? 'all' : 'moderate')}
        >
          <i className="fa-solid fa-tag"></i>
          <span>₹150 - ₹400</span>
        </button>

        {/* Rating 4.8+ */}
        <button
          type="button"
          className={`fg-filter-chip ${minRating === 4.8 ? 'active' : ''}`}
          onClick={() => onMinRatingChange(minRating === 4.8 ? 0 : 4.8)}
        >
          <i className="fa-solid fa-star" style={{ color: '#FBBF24' }}></i>
          <span>4.8+ Top Rated</span>
        </button>

        {/* Street Food */}
        <button
          type="button"
          className={`fg-filter-chip ${establishmentFilter === 'Street Food' ? 'active' : ''}`}
          onClick={() => onEstablishmentChange(establishmentFilter === 'Street Food' ? 'all' : 'Street Food')}
        >
          <i className="fa-solid fa-bowl-food"></i>
          <span>Street Food</span>
        </button>

        {/* Café & Dessert */}
        <button
          type="button"
          className={`fg-filter-chip ${establishmentFilter === 'Bakery & Dessert' ? 'active' : ''}`}
          onClick={() => onEstablishmentChange(establishmentFilter === 'Bakery & Dessert' ? 'all' : 'Bakery & Dessert')}
        >
          <i className="fa-solid fa-cake-candles"></i>
          <span>Bakery & Sweets</span>
        </button>

        {/* Clear All Filters */}
        {isAnyFilterActive && (
          <button
            type="button"
            className="fg-btn-clear-all"
            onClick={onResetFilters}
          >
            <i className="fa-solid fa-rotate-left" style={{ marginRight: '4px' }}></i>
            Clear Filters
          </button>
        )}
      </div>
    </section>
  );
}
