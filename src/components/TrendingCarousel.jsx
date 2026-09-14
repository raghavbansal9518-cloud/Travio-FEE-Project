import React, { useRef, useState, useEffect } from 'react';
import DestinationCard from './DestinationCard';

export default function TrendingCarousel({ destinations }) {
  const carouselRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Automatic Smooth Carousel Sliding (slides every 3.5s, pauses on hover)
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        // If near end, loop back smoothly to start
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 360, behavior: 'smooth' });
        }
      }
    }, 3500);

    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section 
      className="trending-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="trending-carousel-header">
        <div className="section-header" style={{ marginBottom: 0 }}>
          <div className="section-tag">
            <i className="fa-solid fa-fire-flame-curved" style={{ color: '#f97316' }}></i> TRENDING NOW
          </div>
          <h2 className="section-title">POPULAR DESTINATIONS</h2>
          <p className="section-subtitle">
            Places travellers are exploring right now across India & the globe (Auto-sliding).
          </p>
        </div>

        <div className="carousel-nav-arrows">
          <button 
            type="button"
            className="carousel-arrow-btn" 
            onClick={() => scroll('left')}
            aria-label="Previous destinations"
            title="Scroll Left"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button 
            type="button"
            className="carousel-arrow-btn" 
            onClick={() => scroll('right')}
            aria-label="Next destinations"
            title="Scroll Right"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div className="trending-cards-carousel" ref={carouselRef}>
        {destinations.map((dest) => (
          <DestinationCard key={dest.id} destination={dest} />
        ))}
      </div>
    </section>
  );
}
