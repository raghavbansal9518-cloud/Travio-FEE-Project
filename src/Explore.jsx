import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from './components/Header';
import SearchHero from './components/SearchHero';
import CategoryGrid from './components/CategoryGrid';
import TrendingCarousel from './components/TrendingCarousel';
import PopularCountries from './components/PopularCountries';
import HiddenGems from './components/HiddenGems';
import RecommendedSection from './components/RecommendedSection';
import FilterModal from './components/FilterModal';
import DestinationCard from './components/DestinationCard';
import { DESTINATIONS } from './data/destinationsData';
import { searchDestination, KNOWN_GLOBAL_CITY_ALIASES } from './services/destinationService';
import './Explore.css';

export default function Explore() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchInputRef = useRef(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    country: null,
    maxBudget: 100000,
    weather: [],
    travelTypes: [],
    duration: []
  });

  const [dynamicDestination, setDynamicDestination] = useState(null);
  const [isSearchingDynamic, setIsSearchingDynamic] = useState(false);

  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null && q !== undefined) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Calculate active filter count for badge
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (advancedFilters.country) count++;
    if (advancedFilters.maxBudget < 100000) count++;
    if (advancedFilters.weather?.length > 0) count += advancedFilters.weather.length;
    if (advancedFilters.travelTypes?.length > 0) count += advancedFilters.travelTypes.length;
    if (advancedFilters.duration?.length > 0) count += advancedFilters.duration.length;
    return count;
  }, [advancedFilters]);

  // Dynamic Destination Filtering with smart alias and keyword recognition
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((dest) => {
      // 1. Search Query Match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const aliasTarget = KNOWN_GLOBAL_CITY_ALIASES?.[q];
        const matchesAlias = Boolean(
          aliasTarget && (
            dest.id.toLowerCase() === aliasTarget ||
            dest.country.toLowerCase() === aliasTarget ||
            dest.id.toLowerCase().startsWith(aliasTarget)
          )
        );
        const matchesName = dest.name.toLowerCase().includes(q);
        const matchesCountry = dest.country.toLowerCase().includes(q);
        const matchesTagline = dest.tagline?.toLowerCase().includes(q);
        const matchesDesc = dest.description?.toLowerCase().includes(q);
        if (!matchesAlias && !matchesName && !matchesCountry && !matchesTagline && !matchesDesc) {
          return false;
        }
      }

      // 2. Category Match
      if (selectedCategory && dest.category !== selectedCategory) {
        return false;
      }

      // 3. Country Quick Filter
      if (selectedCountry && dest.country.toLowerCase() !== selectedCountry.toLowerCase()) {
        return false;
      }

      // 4. Advanced Country Filter from Modal
      if (advancedFilters.country && dest.country.toLowerCase() !== advancedFilters.country.toLowerCase()) {
        return false;
      }

      // 5. Budget Filter
      if (advancedFilters.maxBudget && dest.budgetNum > advancedFilters.maxBudget) {
        return false;
      }

      // 6. Travel Type Filter
      if (advancedFilters.travelTypes?.length > 0) {
        const matchesType = advancedFilters.travelTypes.some(
          (t) => dest.travelType?.toLowerCase() === t.toLowerCase()
        );
        if (!matchesType) return false;
      }

      // 7. Duration Filter
      if (advancedFilters.duration?.length > 0) {
        const matchesDuration = advancedFilters.duration.includes(dest.duration);
        if (!matchesDuration) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedCountry, advancedFilters]);

  // Dynamic Google Places + Gemini search when no local destination matches query
  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (!trimmed || trimmed.length < 2) {
      setDynamicDestination(null);
      setIsSearchingDynamic(false);
      return;
    }

    // If local destinations match, don't trigger dynamic search
    if (filteredDestinations.length > 0) {
      setDynamicDestination(null);
      setIsSearchingDynamic(false);
      return;
    }

    setIsSearchingDynamic(true);
    setDynamicDestination(null);
    let isCancelled = false;

    const timer = setTimeout(async () => {
      try {
        const result = await searchDestination(trimmed);
        if (!isCancelled) {
          setDynamicDestination(result);
        }
      } catch (err) {
        if (!isCancelled) {
          setDynamicDestination(null);
        }
      } finally {
        if (!isCancelled) {
          setIsSearchingDynamic(false);
        }
      }
    }, 250);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [searchQuery, filteredDestinations.length]);

  // Subsets for clean layout
  const trendingList = useMemo(() => DESTINATIONS.filter((d) => d.isTrending), []);
  const hiddenGemsList = useMemo(() => DESTINATIONS.filter((d) => d.isHiddenGem).slice(0, 8), []);
  const recommendedList = useMemo(() => DESTINATIONS.filter((d) => d.isRecommended), []);

  // Is user actively filtering/searching (other than browsing full category)?
  const isSearchOrFilterActive = Boolean(
    searchQuery.trim() || 
    selectedCountry || 
    activeFilterCount > 0
  );

  const handleChipClick = (chip) => {
    setSearchQuery(chip);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSurpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * DESTINATIONS.length);
    const randomDest = DESTINATIONS[randomIndex];
    navigate(`/destination/${randomDest.id}`);
  };

  const handleResetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedCountry(null);
    setDynamicDestination(null);
    setIsSearchingDynamic(false);
    setAdvancedFilters({
      country: null,
      maxBudget: 100000,
      weather: [],
      travelTypes: [],
      duration: []
    });
    if (searchParams.get('search')) {
      navigate('/explore', { replace: true });
    }
  };

  return (
    <>
      {/* Shared Top-Right Header (Sun, Notifications, Purple Profile) */}
      <Header />

      <div className="explore-container">
        {/* 1. HERO + SEARCH SECTION */}
        <SearchHero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenFilters={() => setIsFilterModalOpen(true)}
          activeFilterCount={activeFilterCount}
          onSurpriseMe={handleSurpriseMe}
          onChipClick={handleChipClick}
          searchInputRef={searchInputRef}
        />

        {/* DYNAMIC SEARCH & ADVANCED FILTER RESULTS (When search input or country/budget filter active) */}
        {isSearchOrFilterActive ? (
          <section className="search-results-section" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="filter-active-summary-bar">
              <div>
                <span>Found <strong>{filteredDestinations.length || (dynamicDestination ? 1 : 0)}</strong> destination{(filteredDestinations.length === 1 || (!filteredDestinations.length && dynamicDestination)) ? '' : 's'} matching your criteria</span>
                {searchQuery && <span style={{ opacity: 0.8 }}> for "{searchQuery}"</span>}
                {selectedCategory && <span style={{ opacity: 0.8 }}> in {selectedCategory.toUpperCase()}</span>}
                {selectedCountry && <span style={{ opacity: 0.8 }}> in {selectedCountry}</span>}
                {dynamicDestination && !filteredDestinations.length && <span style={{ color: '#38bdf8', marginLeft: '6px', fontSize: '12px' }}><i className="fa-solid fa-sparkles"></i> Worldwide Verified</span>}
              </div>
              <button 
                type="button"
                className="btn-glass" 
                style={{ padding: '6px 14px', fontSize: '12px' }}
                onClick={handleResetAllFilters}
              >
                <i className="fa-solid fa-rotate-left"></i> Reset All Filters
              </button>
            </div>

            {isSearchingDynamic ? (
              <div style={{ background: 'rgba(18, 26, 45, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '20px', padding: '48px 24px', textAlign: 'center', backdropFilter: 'blur(16px)' }}>
                <i className="fa-solid fa-compass fa-spin" style={{ fontSize: '42px', color: '#a855f7', marginBottom: '16px' }}></i>
                <h3 style={{ fontFamily: 'var(--font-heading, inherit)', fontSize: '20px', color: '#ffffff', marginBottom: '8px' }}>
                  Searching Global Destinations...
                </h3>
                <p style={{ color: '#8E93A1', fontSize: '14px', maxWidth: '420px', margin: '0 auto' }}>
                  Connecting to Google Places and authentic photography for "{searchQuery}"
                </p>
              </div>
            ) : filteredDestinations.length > 0 ? (
              <div className="gems-grid">
                {filteredDestinations.map((dest) => (
                  <DestinationCard key={dest.id} destination={dest} isGem={dest.isHiddenGem} />
                ))}
              </div>
            ) : dynamicDestination ? (
              <div className="gems-grid">
                <DestinationCard 
                  key={dynamicDestination.id} 
                  destination={dynamicDestination} 
                  aiTag={dynamicDestination.aiTag || 'Google Places Verified'} 
                />
              </div>
            ) : (
              <div style={{ background: 'rgba(18, 26, 45, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '20px', padding: '48px 24px', textAlign: 'center', backdropFilter: 'blur(16px)' }}>
                <i className="fa-solid fa-compass" style={{ fontSize: '42px', color: '#a855f7', marginBottom: '16px' }}></i>
                <h3 style={{ fontFamily: 'var(--font-heading, inherit)', fontSize: '22px', color: '#ffffff', marginBottom: '8px' }}>
                  No Destinations Found
                </h3>
                <p style={{ color: '#8E93A1', fontSize: '14px', maxWidth: '440px', margin: '0 auto 20px' }}>
                  We couldn't find any destinations matching all selected filters. Try broadening your budget, weather or category preferences.
                </p>
                <button type="button" className="btn-primary" onClick={handleResetAllFilters}>
                  <span>Clear All Filters</span>
                </button>
              </div>
            )}
          </section>
        ) : (
          /* STANDARD EXPLORE FLOW WITH LIVE CATEGORY FILTERING */
          <>
            {/* 2. EXPLORE BY CATEGORY */}
            <CategoryGrid 
              selectedCategory={selectedCategory}
              onSelectCategory={(catId) => setSelectedCategory(catId)}
            />

            {/* If a category is selected, display all 28 destinations for that category */}
            {selectedCategory ? (
              <section className="category-results-view" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="filter-active-summary-bar" style={{ background: 'linear-gradient(135deg, rgba(106,76,255,0.2) 0%, rgba(56,189,248,0.15) 100%)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fa-solid fa-layer-group" style={{ color: '#a855f7' }}></i>
                    <span>Showing all <strong>{filteredDestinations.length}</strong> destinations in <strong>{selectedCategory.toUpperCase()}</strong></span>
                  </div>
                  <button 
                    type="button"
                    className="btn-glass" 
                    style={{ padding: '6px 14px', fontSize: '12px' }}
                    onClick={() => setSelectedCategory(null)}
                  >
                    <i className="fa-solid fa-xmark"></i> Close Category
                  </button>
                </div>

                <div className="gems-grid">
                  {filteredDestinations.map((dest) => (
                    <DestinationCard key={dest.id} destination={dest} isGem={dest.isHiddenGem} />
                  ))}
                </div>
              </section>
            ) : null}

            {/* 3. TRENDING DESTINATIONS CAROUSEL (Auto-sliding with India & Global) */}
            <TrendingCarousel destinations={trendingList} />

            {/* 4. POPULAR COUNTRIES */}
            <PopularCountries 
              selectedCountry={selectedCountry}
              onSelectCountry={setSelectedCountry}
            />

            {/* 5. HIDDEN GEMS */}
            <HiddenGems destinations={hiddenGemsList} />

            {/* 6. RECOMMENDED FOR YOU */}
            <RecommendedSection destinations={recommendedList} />
          </>
        )}

        {/* FILTER MODAL */}
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          filters={advancedFilters}
          onApplyFilters={(newFilters) => setAdvancedFilters(newFilters)}
          onResetFilters={handleResetAllFilters}
          matchingCount={filteredDestinations.length}
        />
      </div>
    </>
  );
}
