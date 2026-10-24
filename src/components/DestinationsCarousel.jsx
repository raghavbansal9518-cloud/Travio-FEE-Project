import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { useLanguage } from '../context/LanguageContext';

// --- Static Data ---
// Array of popular destinations to display in the carousel
const destinations = [
  {
    id: 'bali',
    name: 'Bali, Indonesia',
    image: '/images/bali.jpg',
    rating: 4.9,
    reviews: '1.8K',
    bestTime: 'Apr - Oct'
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    image: '/images/switzerland.jpg',
    rating: 4.9,
    reviews: '3.1K',
    bestTime: 'May - Sep'
  },
  {
    id: 'japan',
    name: 'Japan',
    image: '/images/japan.jpg',
    rating: 4.8,
    reviews: '2.7K',
    bestTime: 'Mar - May'
  },
  {
    id: 'maldives',
    name: 'Maldives',
    image: '/images/maldives.jpg',
    rating: 4.9,
    reviews: '1.2K',
    bestTime: 'Nov - Apr'
  },
  {
    id: 'dubai',
    name: 'Dubai, UAE',
    image: '/images/dubai_bg.png',
    rating: 4.8,
    reviews: '4.5K',
    bestTime: 'Nov - Mar'
  }
];

const DestinationsCarousel = () => {
  const navigate = useNavigate();
  // Reference to the carousel container for scrolling
  const carouselRef = useRef(null);

  // Track which destination card is currently clicked/expanded
  const [expandedId, setExpandedId] = useState(null);
  
  // Global Wishlist from TravelContext
  const { isWishlisted, toggleWishlist } = useTravel();
  const { t } = useLanguage();

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollLeft = carousel.scrollWidth / 3;
    }
  }, []);

  const handleCarouselScroll = (event) => {
    const carousel = event.currentTarget;
    const copyWidth = carousel.scrollWidth / 3;

    if (carousel.scrollLeft <= 0) {
      carousel.scrollLeft += copyWidth;
    } else if (carousel.scrollLeft >= copyWidth * 2) {
      carousel.scrollLeft -= copyWidth;
    }
  };

  const handleCarouselWheel = (event) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) {
      return;
    }

    event.preventDefault();
    event.currentTarget.scrollLeft += event.deltaX;
  };

  // Duplicate the array 3 times to create a seamless infinite scrolling effect in CSS
  const loopedDestinations = [...destinations, ...destinations, ...destinations];

  // Toggle wishlist heart via Global TravelContext
  const toggleLike = (e, dest) => {
    e.stopPropagation(); // Prevent navigation or image expansion
    toggleWishlist({
      id: dest.id,
      name: dest.name,
      rating: dest.rating,
      reviews: dest.reviews,
      bestTime: dest.bestTime,
      cardImage: dest.image,
      heroImage: dest.image,
      image: dest.image
    });
  };

  return (
    <section className="popular-destinations">
      {/* Section Header */}
      <header className="section-header">
        <h2>{t('dashboard.featuredDestinations', 'Popular Destinations')}</h2>
        <Link to="/explore">{t('common.viewAll', 'View All')}</Link>
      </header>

      {/* Carousel Track Container */}
      <div
        className="destination-carousel-container"
        ref={carouselRef}
        onScroll={handleCarouselScroll}
        onWheel={handleCarouselWheel}
      >
        <div className="destination-carousel-track" id="destination-track">
          
          {/* Map through our looped array to render the cards */}
          {loopedDestinations.map((dest, index) => {
            // Check if this specific card is the one expanded
            // We use id + index because the ids repeat in our looped array!
            const isExpanded = expandedId === `${dest.id}-${index}`;
            const isLiked = isWishlisted(dest.id);
            
            return (
              <article 
                className={`destination-card ${isExpanded ? 'expanded' : ''}`} 
                key={`${dest.id}-${index}`}
              >
                {/* Clickable Image Area */}
                <div 
                  className="destination-image" 
                  onClick={() => navigate(`/destination/${dest.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={dest.image} alt={dest.name} />
                  
                  {/* Show overlay text only if the card is expanded */}
                  {isExpanded && (
                    <div className="carousel-expanded-overlay" style={{
                      position: 'absolute', bottom: 0, left: 0, width: '100%',
                      padding: '1rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                      color: 'white', zIndex: 3, animation: 'fadeIn 0.3s ease'
                    }}>
                      <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{dest.name}</h3>
                      {/* Grab just the first part of the name (e.g., 'Bali' instead of 'Bali, Indonesia') */}
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#ccc' }}>Experience the magic of {dest.name.split(',')[0]}.</p>
                    </div>
                  )}
                  
                  {/* Wishlist Heart Button */}
                  <button 
                    type="button" 
                    className="wishlist-btn" 
                    onClick={(e) => toggleLike(e, dest)}
                    aria-label={`Add ${dest.name} to wishlist`}
                  >
                    <span 
                      className="material-symbols-rounded"
                      style={{ 
                        color: isLiked ? '#F43F5E' : 'inherit',
                        fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0"
                      }}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                {/* Destination Details */}
                <div className="destination-info">
                  <h3>{dest.name}</h3>
                  <p style={{ color: '#F59E0B', fontWeight: 600 }}>
                    <span className="material-symbols-rounded" style={{ fontSize: '16px', verticalAlign: '-3px' }}>star</span> 
                    {dest.rating} <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.8rem' }}>({dest.reviews})</span>
                  </p>
                  <p>{t('details.bestSeason', 'Best time')}: {dest.bestTime}</p>
                  <Link to="/explore">{t('nav.explore', 'Explore')}</Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DestinationsCarousel;