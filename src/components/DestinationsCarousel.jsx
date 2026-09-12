import { useState } from 'react';

// --- Static Data ---
// Array of popular destinations to display in the carousel
const destinations = [
  {
    id: 1,
    name: 'Bali, Indonesia',
    image: '/images/bali.jpg',
    rating: 4.9,
    reviews: '1.8K',
    bestTime: 'Apr - Oct'
  },
  {
    id: 2,
    name: 'Switzerland',
    image: '/images/switzerland.jpg',
    rating: 4.9,
    reviews: '3.1K',
    bestTime: 'May - Sep'
  },
  {
    id: 3,
    name: 'Japan',
    image: '/images/japan.jpg',
    rating: 4.8,
    reviews: '2.7K',
    bestTime: 'Mar - May'
  },
  {
    id: 4,
    name: 'Maldives',
    image: '/images/maldives.jpg',
    rating: 4.9,
    reviews: '1.2K',
    bestTime: 'Nov - Apr'
  },
  {
    id: 5,
    name: 'Dubai, UAE',
    image: '/images/dubai_bg.png',
    rating: 4.8,
    reviews: '4.5K',
    bestTime: 'Nov - Mar'
  }
];

const DestinationsCarousel = () => {
  // Track which destination card is currently clicked/expanded
  const [expandedId, setExpandedId] = useState(null);
  
  // Track which destinations are in the wishlist (by ID)
  const [likedIds, setLikedIds] = useState(new Set());

  // Duplicate the array 3 times to create a seamless infinite scrolling effect in CSS
  const loopedDestinations = [...destinations, ...destinations, ...destinations];

  // Toggle wishlist heart
  const toggleLike = (e, id) => {
    e.stopPropagation(); // Prevent the image expansion from triggering
    setLikedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section className="popular-destinations">
      {/* Section Header */}
      <header className="section-header">
        <h2>Popular Destinations</h2>
        <a href="/explore">View All</a>
      </header>

      {/* Carousel Track Container */}
      <div className="destination-carousel-container">
        <div className="destination-carousel-track" id="destination-track">
          
          {/* Map through our looped array to render the cards */}
          {loopedDestinations.map((dest, index) => {
            // Check if this specific card is the one expanded
            // We use id + index because the ids repeat in our looped array!
            const isExpanded = expandedId === `${dest.id}-${index}`;
            const isLiked = likedIds.has(dest.id);
            
            return (
              <article 
                className={`destination-card ${isExpanded ? 'expanded' : ''}`} 
                key={`${dest.id}-${index}`}
              >
                {/* Clickable Image Area */}
                <div 
                  className="destination-image" 
                  onClick={() => setExpandedId(isExpanded ? null : `${dest.id}-${index}`)}
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
                    onClick={(e) => toggleLike(e, dest.id)}
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
                  <p>Best time: {dest.bestTime}</p>
                  <a href="/explore">Explore</a>
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