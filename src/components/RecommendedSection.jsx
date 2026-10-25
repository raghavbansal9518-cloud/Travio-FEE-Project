import { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import DestinationCard from './DestinationCard';

export default function RecommendedSection({ destinations }) {
  const { t } = useLanguage();
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
      className="recommended-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="trending-carousel-header">
        <div className="section-header" style={{ marginBottom: 0 }}>
          <div className="section-tag">
            <i className="fa-solid fa-wand-magic-sparkles"></i> {t('phrases.CURATED AI PICKS', 'CURATED AI PICKS')}
          </div>
          <h2 className="section-title">✨ {t('phrases.RECOMMENDED FOR YOU', 'RECOMMENDED FOR YOU')}</h2>
          <p className="section-subtitle">
            {t('phrases.recommendedSubtitle', 'Personalized destinations tailored to your travel vibes & affinity (Auto-sliding).')}
          </p>
        </div>

        <div className="carousel-nav-arrows">
          <button 
            type="button"
            className="carousel-arrow-btn" 
            onClick={() => scroll('left')}
            aria-label="Previous recommended destinations"
            title="Scroll Left"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button 
            type="button"
            className="carousel-arrow-btn" 
            onClick={() => scroll('right')}
            aria-label="Next recommended destinations"
            title="Scroll Right"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div className="trending-cards-carousel" ref={carouselRef}>
        {destinations.map((dest) => (
          <DestinationCard 
            key={dest.id} 
            destination={dest} 
            aiTag={dest.aiMatchTag || '98% Match'} 
          />
        ))}
      </div>
    </section>
  );
}
