import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import { useTravel } from '../context/TravelContext';
import { useLanguage } from '../context/LanguageContext';
import {
  FOOD_DESTINATIONS,
  FOOD_DISHES,
  filterFoodDishes
} from '../data/foodGuideData';

import FoodHero from '../components/foodGuide/FoodHero';
import FoodFilters from '../components/foodGuide/FoodFilters';
import FoodCard from '../components/foodGuide/FoodCard';
import DishDetailsModal from '../components/foodGuide/DishDetailsModal';
import FoodTrailWizard from '../components/foodGuide/FoodTrailWizard';
import SavedTrailsModal from '../components/foodGuide/SavedTrailsModal';
import FoodTrailView from '../components/foodGuide/FoodTrailView';

import './FoodGuide.css';

export default function FoodGuide() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { showToast, toggleWishlist, isWishlisted } = useTravel();
  const { t } = useLanguage();

  // Active View Tab: 'dishes' | 'trails'
  const [activeView, setActiveView] = useState(() => {
    return searchParams.get('tab') === 'trails' ? 'trails' : 'dishes';
  });

  // Active Selected Destination (Default: Goa)
  const [currentDestination, setCurrentDestination] = useState(() => {
    const destParam = searchParams.get('destination');
    if (destParam) {
      const target = destParam.toLowerCase();
      const matched = FOOD_DESTINATIONS.find(
        (d) =>
          d.id.toLowerCase() === target ||
          d.id.toLowerCase().startsWith(target) ||
          target.startsWith(d.id.toLowerCase()) ||
          d.name.toLowerCase().includes(target)
      );
      if (matched) return matched;
    }
    return FOOD_DESTINATIONS[0];
  });

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [establishmentFilter, setEstablishmentFilter] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [mustTryOnly, setMustTryOnly] = useState(false);

  // Modals & Panels
  const [selectedDishForModal, setSelectedDishForModal] = useState(null);
  const [isTrailWizardOpen, setIsTrailWizardOpen] = useState(false);
  const [trailWizardMode, setTrailWizardMode] = useState('templates'); // 'templates' | 'custom'
  const [isSavedTrailsOpen, setIsSavedTrailsOpen] = useState(false);

  // Distinct Handlers for Trail Planner vs Custom Trail Planner
  const handleOpenCustomTrailPlanner = () => {
    setTrailWizardMode('custom');
    setIsTrailWizardOpen(true);
  };

  const handleOpenTrailPlanner = () => {
    setTrailWizardMode('templates');
    setIsTrailWizardOpen(true);
  };

  // Custom User Trail Dishes
  const [trailDishes, setTrailDishes] = useState([]);

  // Favourites Persistent State
  const [favouriteDishIds, setFavouriteDishIds] = useState(() => {
    try {
      const saved = localStorage.getItem('travio_food_favourites');
      return saved ? JSON.parse(saved) : ['goa-fish-curry', 'jaipur-dal-baati'];
    } catch {
      return ['goa-fish-curry'];
    }
  });

  // Saved Trails Persistent State
  const [savedTrails, setSavedTrails] = useState(() => {
    try {
      const saved = localStorage.getItem('travio_saved_food_trails');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist favourites
  useEffect(() => {
    try {
      localStorage.setItem('travio_food_favourites', JSON.stringify(favouriteDishIds));
    } catch (e) {
      console.warn('Could not save food favourites', e);
    }
  }, [favouriteDishIds]);

  // Persist saved trails
  useEffect(() => {
    try {
      localStorage.setItem('travio_saved_food_trails', JSON.stringify(savedTrails));
    } catch (e) {
      console.warn('Could not save food trails', e);
    }
  }, [savedTrails]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Sync destination if search param changes
  useEffect(() => {
    const destParam = searchParams.get('destination');
    if (destParam) {
      const target = destParam.toLowerCase();
      const matched = FOOD_DESTINATIONS.find(
        (d) =>
          d.id.toLowerCase() === target ||
          d.id.toLowerCase().startsWith(target) ||
          target.startsWith(d.id.toLowerCase()) ||
          d.name.toLowerCase().includes(target)
      );
      if (matched && matched.id !== currentDestination.id) {
        setCurrentDestination(matched);
      }
    }
    const tabParam = searchParams.get('tab');
    if (tabParam === 'trails' || tabParam === 'trail') {
      setActiveView('trails');
    } else if (tabParam === 'dishes') {
      setActiveView('dishes');
    }
  }, [searchParams, currentDestination.id]);

  // Filtered dishes for current destination
  const filteredDishes = useMemo(() => {
    return filterFoodDishes({
      destinationId: currentDestination.id,
      query: searchQuery,
      diet: dietFilter,
      budget: budgetFilter,
      minRating,
      establishment: establishmentFilter,
      mustTryOnly
    });
  }, [currentDestination, searchQuery, dietFilter, budgetFilter, minRating, establishmentFilter, mustTryOnly]);

  // Total count for current destination
  const totalDestinationDishes = useMemo(() => {
    return FOOD_DISHES.filter((d) => d.destinationId === currentDestination.id).length;
  }, [currentDestination]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setDietFilter('all');
    setBudgetFilter('all');
    setEstablishmentFilter('all');
    setMinRating(0);
    setMustTryOnly(false);
  };

    // Toggle favourite and synchronize with global Wishlist
  const handleToggleFavourite = (dish) => {
    setFavouriteDishIds((prev) => {
      const exists = prev.includes(dish.id);
      if (exists) {
        return prev.filter((id) => id !== dish.id);
      } else {
        return [...prev, dish.id];
      }
    });

    toggleWishlist({
      id: dish.id,
      name: dish.name,
      country: `${dish.destinationName}, India`,
      flag: '🍲',
      rating: dish.rating || 4.8,
      reviews: `${dish.reviews || '500+'} foodies`,
      budgetStarting: `₹${dish.minPrice || 250}`,
      budgetNum: dish.minPrice || 250,
      cardImage: dish.image,
      heroImage: dish.image,
      tagline: `${dish.cuisine} • ${dish.establishment}`,
      category: 'food',
      itemType: 'food',
      tags: ['Culinary', dish.diet || 'Food'],
      status: 'saved'
    });
  };

  // Add / remove dish from active food trail
  const handleToggleDishInTrail = (dish) => {
    setTrailDishes((prev) => {
      const exists = prev.some((d) => d.id === dish.id);
      if (exists) {
        showToast(`Removed "${dish.name}" from food trail`, 'info');
        return prev.filter((d) => d.id !== dish.id);
      } else {
        showToast(`Added "${dish.name}" to Food Trail! 🗺️`, 'success');
        return [...prev, dish];
      }
    });
  };

  // Save trail
  const handleSaveTrail = (newTrail) => {
    setSavedTrails((prev) => [newTrail, ...prev]);
    showToast(`Saved "${newTrail.name}" to your Food Journeys! ✨`, 'success');
    setIsTrailWizardOpen(false);
  };

  // Delete saved trail
  const handleDeleteSavedTrail = (trailId) => {
    setSavedTrails((prev) => prev.filter((t) => t.id !== trailId));
    showToast('Food trail removed', 'info');
  };

  // Navigate to existing map page with Trail Stops
  const handleOpenInMap = (stops, destination) => {
    if (!stops || stops.length === 0) {
      showToast('Please add at least one stop to view on map', 'warning');
      return;
    }

    const firstStop = stops[0];
    const mapLocation = {
      name: `${destination?.name || 'Destination'} Food Trail`,
      lat: firstStop.lat || destination?.coordinates?.lat || 15.2993,
      lon: firstStop.lng || destination?.coordinates?.lng || 74.1240
    };

    navigate('/geoweather', {
      state: {
        from: 'food-guide',
        trailName: `${destination?.name || 'Destination'} Food Trail`,
        trailStops: stops,
        location: mapLocation
      }
    });
  };

  // Navigate to map for a single restaurant
  const handleSeeOnMapSingle = (place, dish) => {
    navigate('/geoweather', {
      state: {
        from: 'food-guide',
        trailName: `${dish.name} @ ${place.name}`,
        trailStops: [
          {
            stopNumber: 1,
            dishName: dish.name,
            restaurantName: place.name,
            dishImage: dish.image,
            address: place.address || place.neighborhood,
            priceEstimate: `₹${dish.minPrice}`,
            lat: place.lat,
            lng: place.lng
          }
        ],
        location: {
          name: `${place.name}, ${dish.destinationName}`,
          lat: place.lat,
          lon: place.lng
        }
      }
    });
  };

  return (
    <div className="food-guide-page">
      {/* Top Header */}
      <Header />

      <div className="fg-container">
        {/* 1. HERO BANNER WITH DESTINATION SWITCHER */}
        <FoodHero
          currentDestination={currentDestination}
          onSelectDestination={(dest) => {
            setCurrentDestination(dest);
            handleResetFilters();
          }}
          onOpenTrailWizard={handleOpenTrailPlanner}
          onOpenCustomPlanner={handleOpenCustomTrailPlanner}
          onSwitchToTrailsView={() => {
            setActiveView('trails');
            setSearchParams((prev) => {
              const next = new URLSearchParams(prev);
              next.set('tab', 'trails');
              return next;
            }, { replace: true });
          }}
          dishCount={totalDestinationDishes}
        />

        {/* VIEW NAVIGATION TABS: DISHES vs FOOD TRAILS */}
        <div className="fg-view-toggle-strip" role="tablist" aria-label="Food Guide Views">
          <div className="fg-view-tabs">
            <button
              type="button"
              role="tab"
              aria-selected={activeView === 'dishes'}
              className={`fg-view-tab-btn ${activeView === 'dishes' ? 'active' : ''}`}
              onClick={() => {
                setActiveView('dishes');
                setSearchParams((prev) => {
                  const next = new URLSearchParams(prev);
                  next.set('tab', 'dishes');
                  return next;
                }, { replace: true });
              }}
            >
              <i className="fa-solid fa-utensils"></i>
              <span>{t('food.dishes', 'Iconic Dishes')}</span>
              <span className="fg-tab-count-badge">{totalDestinationDishes}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeView === 'trails'}
              className={`fg-view-tab-btn ${activeView === 'trails' ? 'active' : ''}`}
              onClick={() => {
                setActiveView('trails');
                setSearchParams((prev) => {
                  const next = new URLSearchParams(prev);
                  next.set('tab', 'trails');
                  return next;
                }, { replace: true });
              }}
            >
              <i className="fa-solid fa-route"></i>
              <span>{t('food.trails', 'Curated Food Trails')}</span>
              <span className="fg-tab-sparkle-pill">✦ {t('phrases.Explore', 'Explore')}</span>
            </button>
          </div>
        </div>

        {/* CONDITIONAL VIEW RENDER */}
        {activeView === 'trails' ? (
          <FoodTrailView
            currentDestination={currentDestination}
            onOpenTrailWizard={handleOpenTrailPlanner}
            onOpenCustomPlanner={handleOpenCustomTrailPlanner}
            onOpenInMap={handleOpenInMap}
            onSaveTrail={handleSaveTrail}
            savedTrails={savedTrails}
            onOpenSavedTrails={() => setIsSavedTrailsOpen(true)}
          />
        ) : (
          <>
            {/* 2. SEARCH & FILTER CONTROLS */}
            <FoodFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              dietFilter={dietFilter}
              onDietChange={setDietFilter}
              budgetFilter={budgetFilter}
              onBudgetChange={setBudgetFilter}
              establishmentFilter={establishmentFilter}
              onEstablishmentChange={setEstablishmentFilter}
              minRating={minRating}
              onMinRatingChange={setMinRating}
              mustTryOnly={mustTryOnly}
              onMustTryChange={setMustTryOnly}
              onResetFilters={handleResetFilters}
              onOpenTrailWizard={handleOpenTrailPlanner}
              onOpenCustomPlanner={handleOpenCustomTrailPlanner}
              onOpenSavedTrails={() => setIsSavedTrailsOpen(true)}
              onSwitchToTrailsView={() => {
                setActiveView('trails');
                setSearchParams((prev) => {
                  const next = new URLSearchParams(prev);
                  next.set('tab', 'trails');
                  return next;
                }, { replace: true });
              }}
              savedTrailsCount={savedTrails.length}
            />

            {/* 3. MUST TRY DISHES SECTION */}
            <section aria-label={`Must Try Dishes in ${currentDestination.name}`}>
              <div className="fg-section-header">
                <div className="fg-section-title-wrap">
                  <p className="eyebrow">{t('phrases.CURATED GASTRONOMY', 'CURATED GASTRONOMY')}</p>
                  <h2>{t('phrases.Must Try in', 'Must Try in')} {currentDestination.name} {currentDestination.flag}</h2>
                  <p className="subtitle">
                    {t('phrases.foodSubtitle', 'Iconic dishes and legendary local spots you simply cannot miss!')}
                  </p>
                </div>
                <div className="fg-results-count">
                  {t('phrases.Showing', 'Showing')} <strong>{filteredDishes.length}</strong> {filteredDishes.length === 1 ? t('phrases.dish', 'dish') : t('phrases.dishes', 'dishes')}
                </div>
              </div>

              {filteredDishes.length > 0 ? (
                <div className="fg-dish-grid">
                  {filteredDishes.map((dish) => {
                    const isFav = favouriteDishIds.includes(dish.id);
                    const isInTrail = trailDishes.some((d) => d.id === dish.id);
                    return (
                      <FoodCard
                        key={dish.id}
                        dish={dish}
                        isFavourited={isFav}
                        onToggleFavourite={handleToggleFavourite}
                        onViewDetails={(d) => setSelectedDishForModal(d)}
                        onAddToTrail={handleToggleDishInTrail}
                        isInTrail={isInTrail}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="fg-empty-state">
                  <i className="fa-solid fa-utensils fg-empty-icon"></i>
                  <h3>{t('phrases.No dishes match your selected filters', 'No dishes match your selected filters')}</h3>
                  <p>
                    Try adjusting your budget, spice, or dietary preferences to explore more local culinary treats in {currentDestination.name}.
                  </p>
                  <button
                    type="button"
                    className="btn-launch-trail"
                    onClick={handleResetFilters}
                  >
                    {t('phrases.Reset All Filters', 'Reset All Filters')}
                  </button>
                </div>
              )}
            </section>
          </>
        )}

        {/* 4. SIGNATURE FEATURE FOOTER STRIP */}
        <div className="fg-feature-strip">
          <div className="fg-feature-item">
            <div className="fg-feature-icon">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <div className="fg-feature-text">
              <strong>Personalised Food Trail</strong>
              <p>Custom multi-stop itineraries mapped in the optimal order.</p>
            </div>
          </div>

          <div className="fg-feature-item">
            <div className="fg-feature-icon">
              <i className="fa-solid fa-map-location-dot"></i>
            </div>
            <div className="fg-feature-text">
              <strong>Interactive Map Integration</strong>
              <p>Plot restaurants directly on Travio's live geographic map.</p>
            </div>
          </div>

          <div className="fg-feature-item">
            <div className="fg-feature-icon">
              <i className="fa-solid fa-certificate"></i>
            </div>
            <div className="fg-feature-text">
              <strong>Authentic Local Recipes</strong>
              <p>Centuries of regional heritage verified with exact coordinates.</p>
            </div>
          </div>

          <div className="fg-feature-item">
            <div className="fg-feature-icon">
              <i className="fa-solid fa-bookmark"></i>
            </div>
            <div className="fg-feature-text">
              <strong>Saved Food Journeys</strong>
              <p>Save and revisit customized culinary trails across visits.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING ACTIVE FOOD TRAIL BAR */}
      {trailDishes.length > 0 && (
        <aside className="fg-floating-trail-bar" role="region" aria-label="Active Food Trail">
          <div className="fg-trail-bar-left">
            <div className="fg-trail-indicator">
              <span className="trail-pulse-dot"></span>
              <span className="material-symbols-rounded" style={{ color: '#E9D5FF' }}>restaurant</span>
            </div>
            <div className="fg-trail-bar-info">
              <div className="fg-trail-bar-title">
                <strong>{currentDestination.name} Food Trail</strong>
                <span className="fg-trail-count-badge">
                  {trailDishes.length} {trailDishes.length === 1 ? 'Dish' : 'Dishes'} Selected
                </span>
                <span className="fg-trail-budget-pill">
                  Est. ₹{trailDishes.reduce((acc, d) => acc + (d.minPrice || 250), 0)}
                </span>
              </div>
              <div className="fg-trail-chips-preview">
                {trailDishes.map((dish, i) => (
                  <span key={dish.id} className="fg-trail-dish-chip">
                    <span className="chip-num">{i + 1}</span>
                    <span className="chip-name">{dish.name}</span>
                    <button
                      type="button"
                      className="chip-remove"
                      onClick={() => handleToggleDishInTrail(dish)}
                      title={`Remove ${dish.name} from trail`}
                    >✕</button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="fg-trail-bar-actions">
            <button
              type="button"
              className="btn-trail-plan-action"
              onClick={() => setIsTrailWizardOpen(true)}
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <span>Plan &amp; Reorder Trail</span>
            </button>

            <button
              type="button"
              className="btn-trail-direct-map"
              onClick={() => {
                const stops = trailDishes.map((d, i) => {
                  const p = d.recommendedPlaces?.[0] || {
                    name: `${d.destinationName} Heritage Spot`,
                    address: d.destinationName,
                    lat: currentDestination.coordinates?.lat || 20.5937,
                    lng: currentDestination.coordinates?.lng || 78.9629
                  };
                  return {
                    stopNumber: i + 1,
                    dishName: d.name,
                    restaurantName: p.name,
                    dishImage: d.image,
                    address: p.address,
                    priceEstimate: `₹${d.minPrice}`,
                    lat: p.lat,
                    lng: p.lng
                  };
                });
                handleOpenInMap(stops, currentDestination);
              }}
            >
              <i className="fa-solid fa-map-location-dot"></i>
              <span>Launch in Map</span>
            </button>

            <button
              type="button"
              className="btn-trail-clear-action"
              onClick={() => {
                setTrailDishes([]);
                showToast('Cleared active food trail', 'info');
              }}
              title="Clear current trail selection"
            >
              Clear
            </button>
          </div>
        </aside>
      )}

      {/* 5. DISH DETAILS MODAL */}
      {selectedDishForModal && (
        <DishDetailsModal
          dish={selectedDishForModal}
          onClose={() => setSelectedDishForModal(null)}
          isFavourited={favouriteDishIds.includes(selectedDishForModal.id)}
          onToggleFavourite={handleToggleFavourite}
          onAddToTrail={handleToggleDishInTrail}
          isInTrail={trailDishes.some((d) => d.id === selectedDishForModal.id)}
          onSeeOnMap={handleSeeOnMapSingle}
        />
      )}

      {/* 6. THREE-STEP FOOD TRAIL WIZARD */}
      <FoodTrailWizard
        isOpen={isTrailWizardOpen}
        onClose={() => setIsTrailWizardOpen(false)}
        currentDestination={currentDestination}
        trailDishes={trailDishes}
        onRemoveFromTrail={handleToggleDishInTrail}
        onOpenInMap={handleOpenInMap}
        onSaveTrail={handleSaveTrail}
        initialMode={trailWizardMode}
      />

      {/* 7. SAVED TRAILS MODAL */}
      <SavedTrailsModal
        isOpen={isSavedTrailsOpen}
        onClose={() => setIsSavedTrailsOpen(false)}
        savedTrails={savedTrails}
        onOpenTrail={(trail) => {
          setIsSavedTrailsOpen(false);
          setIsTrailWizardOpen(true);
        }}
        onDeleteTrail={handleDeleteSavedTrail}
        onOpenInMap={handleOpenInMap}
      />
    </div>
  );
}
