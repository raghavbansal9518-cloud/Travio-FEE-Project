import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const LandingPage = ({ onComplete }) => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Small delay ensures the browser paints before we trigger the CSS fade-in
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    if (onComplete) {
      onComplete();
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <main className={`landing-container ${isLoaded ? 'animate-in' : ''}`}>
      
      {/* --- High-Speed Airplane Animation --- */}
      <div className="airplane-wrapper">
        <span className="material-symbols-rounded airplane-icon">flight</span>
        <div className="airplane-trail"></div>
      </div>

      {/* --- Cloud Decorations --- */}
      <div className="cloud cloud-1"><span className="material-symbols-rounded">cloud</span></div>
      <div className="cloud cloud-2"><span className="material-symbols-rounded">cloud</span></div>

      {/* --- Background Decorative Blobs --- */}
      <div className="landing-bg-blob blob-1"></div>
      <div className="landing-bg-blob blob-2"></div>
      
      {/* --- Main Glassmorphism Content Card --- */}
      <div className="landing-glass-card">
        <div className="landing-logo">
          <span className="material-symbols-rounded logo-icon-large">flight_takeoff</span>
        </div>
        
        <h1 className="landing-title">Travio</h1>
        <p className="landing-subtitle">
          {t('Your ultimate travel companion. Discover new destinations, organize your trips, and explore the world seamlessly.')}
        </p>
        
        <button className="landing-start-btn" onClick={handleGetStarted}>
          <span>{t('Enter Dashboard')}</span>
          <span className="material-symbols-rounded">arrow_forward</span>
        </button>
        
        <div className="landing-footer-text">
          <p>{t('Adventure awaits.')}</p>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
