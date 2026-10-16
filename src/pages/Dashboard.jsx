import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

// Importing our widget components
import TravelCalendar from '../components/TravelCalendar';
import WeatherCard from '../components/WeatherCard';
import PackingAssistant from '../components/PackingAssistant';
import DestinationsCarousel from '../components/DestinationsCarousel';
import { useTravel } from '../context/TravelContext';


// Array of images for the hero slider
const heroImages = [
  '/images/cappadocia_bg.png',
  '/images/swiss_alps_bg.png',
  '/images/maldives_bg.png',
  '/images/santorini_bg.png',
  '/images/bali_bg.png',
  '/images/iceland_bg.png',
  '/images/dubai_bg.png',
  '/images/paris_bg.png',
  '/images/norway_bg.png',
  '/images/new_zealand_bg.png'
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { wishlistCount } = useTravel();
  const handleBrandClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- State Variables ---
  // Controls which background image is currently showing
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
  // Toggle for expanding the featured image
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  // Profile dropdown state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- Refs ---
  // Reference to the hero section for the parallax effecte mouse position
  const heroRef = useRef(null);

  // --- Handlers ---
  const handlePlanTrip = (e) => {
    e.preventDefault();
    const toInput = document.getElementById('to-location');
    const dest = toInput?.value?.trim();
    if (dest) {
      navigate(`/explore?search=${encodeURIComponent(dest)}`);
    } else {
      navigate('/explore');
    }
  };

  // Rotating background images using useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      // Loop back to 0 when we reach the end of the array
      setCurrentBgIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // changes every 6 seconds
    
    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* --- TOP HEADER --- */}
      <header className="top-header">
        <div className="logo-placeholder" style={{ flex: 1 }}></div>

        <div className="header-actions">
          <div className={`notification-container ${isNotificationsOpen ? 'open' : ''}`} ref={notificationsRef}>
            <button
              type="button"
              className="notification-button"
              aria-label="Notifications"
              aria-expanded={isNotificationsOpen}
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <span className="material-symbols-rounded">notifications</span>
              <span className="notification-dot" aria-hidden="true"></span>
            </button>

            <div className="notification-menu" role="status" aria-live="polite">
              <div className="notification-menu-header">
                <strong>Notifications</strong>
                <span>3 new</span>
              </div>
              <div className="notification-item">
                <span className="material-symbols-rounded">luggage</span>
                <div>
                  <strong>Your Bali trip is ready</strong>
                  <p>Review your itinerary and packing list.</p>
                </div>
              </div>
              <div className="notification-item">
                <span className="material-symbols-rounded">sunny</span>
                <div>
                  <strong>Weather update</strong>
                  <p>Expect clear skies in your saved destinations.</p>
                </div>
              </div>
              <div className="notification-item">
                <span className="material-symbols-rounded">favorite</span>
                <div>
                  <strong>Wishlist inspiration</strong>
                  <p>New travel ideas are waiting to be explored.</p>
                </div>
              </div>
            </div>
          </div>
          
          <Link 
            to="/wishlist" 
            className="notification-button" 
            aria-label="Wishlist"
            title="Wishlist"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <span className="material-symbols-rounded">favorite</span>
          </Link>

          <div 
            className={`profile-dropdown-container ${isProfileOpen ? 'open' : ''}`} 
            style={{ position: 'relative' }}
            ref={profileRef}
          >
            {/* We change this to a button or div so it toggles instead of navigating */}
            <div 
              className="profile-link" 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <img 
                src="https://ui-avatars.com/api/?name=Traveler&background=6A4CFF&color=fff" 
                alt="Profile" 
                style={{ width: '36px', height: '36px', borderRadius: '50%' }} 
              />
              <span>Profile</span>
            </div>
            
            <div className="profile-dropdown-menu">
              <Link to="/profile">My Profile</Link>
              <Link to="/auth" style={{ color: '#F43F5E' }}>Logout</Link>
            </div>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section 
        className="hero-section" 
        ref={heroRef}
      >
        <div className="hero-backgrounds">
          {/* Map over our images array to render all backgrounds */}
          {heroImages.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              alt="Hero Background" 
              // Only apply 'active' class to the current index
              className={`hero-bg-image ${idx === currentBgIndex ? 'active' : ''}`}
            />
          ))}
        </div>
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <form 
            className="search-bar hero-search-bar" 
            role="search" 
            onSubmit={(e) => {
              e.preventDefault();
              const query = e.target.search.value;
              if (query.trim()) {
                navigate('/explore?search=' + encodeURIComponent(query));
              }
            }} 
            style={{ marginBottom: '2rem' }}
          >
            <label htmlFor="main-search" className="visually-hidden">Search destinations</label>
            <span className="material-symbols-rounded search-icon" style={{ color: 'var(--text-muted)', paddingLeft: '0.5rem' }}>search</span>
            <input type="search" id="main-search" name="search" placeholder="Search destinations, hotels, activities..." autoComplete="off" />
          </form>

          <p className="hero-small-text">Discover your next adventure</p>
          <h2>Explore the World</h2>
          <p style={{ marginBottom: '0.5rem' }}>Discover amazing places, plan unforgettable trips and create memories that last forever.</p>
          
          <div className="hero-buttons">
            <button onClick={() => navigate('/explore')} className="btn primary-btn">
              Explore Destinations
            </button>
            <button onClick={handlePlanTrip} className="btn secondary-btn">
              Plan My Trip
            </button>
          </div>
        </div>

        {/* --- Popular Searches Aside --- */}
        <aside className="popular-searches">
          <h3>Popular Searches</h3>
          <div className="search-tags">
            <Link to="/explore?search=Bali"><span className="material-symbols-rounded" style={{ fontSize: '14px', verticalAlign: 'middle', marginRight: '4px' }}>beach_access</span> Bali</Link>
            <Link to="/explore?search=Japan"><span className="material-symbols-rounded" style={{ fontSize: '14px', verticalAlign: 'middle', marginRight: '4px' }}>festival</span> Japan</Link>
            <Link to="/explore?search=Dubai"><span className="material-symbols-rounded" style={{ fontSize: '14px', verticalAlign: 'middle', marginRight: '4px' }}>location_city</span> Dubai</Link>
            <Link to="/explore?search=Maldives"><span className="material-symbols-rounded" style={{ fontSize: '14px', verticalAlign: 'middle', marginRight: '4px' }}>sailing</span> Maldives</Link>
            <Link to="/explore?search=Switzerland"><span className="material-symbols-rounded" style={{ fontSize: '14px', verticalAlign: 'middle', marginRight: '4px' }}>landscape</span> Switzerland</Link>
            <Link to="/explore?search=Iceland"><span className="material-symbols-rounded" style={{ fontSize: '14px', verticalAlign: 'middle', marginRight: '4px' }}>ac_unit</span> Iceland</Link>
          </div>
        </aside>
      </section>

      {/* --- QUICK TRIP PLANNER --- */}
      <section className="quick-trip-planner" id="quick-trip-planner">
        <header className="section-header" style={{ marginBottom: '0.5rem' }}>
          <h2>Quick Trip Planner</h2>
        </header>

        <form className="trip-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="from-location">From</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="material-symbols-rounded" style={{ color: 'var(--text-muted)', fontSize: '18px', marginRight: '4px' }}>location_on</span>
              <input type="text" id="from-location" name="from" placeholder="New Delhi" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="to-location">To</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="material-symbols-rounded" style={{ color: 'var(--text-muted)', fontSize: '18px', marginRight: '4px' }}>pin_drop</span>
              <input type="text" id="to-location" name="to" placeholder="Where do you want to go?" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="travel-date">Date</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="material-symbols-rounded" style={{ color: 'var(--text-muted)', fontSize: '18px', marginRight: '4px' }}>calendar_month</span>
              <input type="date" id="travel-date" name="date" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="travel-mode">Travel Mode</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="material-symbols-rounded" style={{ color: 'var(--text-muted)', fontSize: '18px', marginRight: '4px' }}>commute</span>
              <select id="travel-mode" name="travelMode" defaultValue="flight">
                <option value="flight">Flight</option>
                <option value="train">Train</option>
                <option value="bus">Bus</option>
                <option value="car">Car</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="travelers">Travelers</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="material-symbols-rounded" style={{ color: 'var(--text-muted)', fontSize: '18px', marginRight: '4px' }}>group</span>
              <select id="travelers" name="travelers">
                <option value="1">1 Traveler</option>
                <option value="2">2 Travelers</option>
                <option value="3">3 Travelers</option>
                <option value="4">4 Travelers</option>
                <option value="5">5+ Travelers</option>
              </select>
            </div>
          </div>

          <button type="submit" className="plan-trip-btn" onClick={handlePlanTrip}>
            Search
          </button>
        </form>
      </section>

      {/* --- POPULAR DESTINATIONS CAROUSEL --- */}
      <DestinationsCarousel />

      {/* --- DASHBOARD WIDGETS SECTION --- */}
      <section className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* TOP ROW: Travel Highlight (Full width) */}
        <div className="left-column" style={{ width: '100%' }}>
          <article className="featured-destination">
            <header className="section-header" style={{ marginBottom: 0 }}>
              <div>
                <h2 style={{ fontSize: '1.25rem' }}>Travel Highlight</h2>
              </div>
            </header>
            <div className="featured-content" style={{ marginTop: '1rem' }}>
              <div 
                className={`featured-image-container ${isImageExpanded ? 'expanded' : ''}`}
                onClick={() => setIsImageExpanded(!isImageExpanded)}
              >
                <img src="/images/featured-destination.jpg" alt="Featured travel destination" />
                {isImageExpanded && (
                  <div className="expanded-text-overlay">
                    <h2>Amalfi Coast, Italy</h2>
                    <p>Discover the breathtaking views and stunning architecture of the Mediterranean coast.</p>
                  </div>
                )}
              </div>
              <div className="featured-text">
                <h3>Discover Your Next Adventure</h3>
                <p>Explore beautiful destinations, discover local culture and plan experiences for your next journey.</p>
                <h4 style={{ marginTop: '1.5rem' }}>Travel Tips</h4>
                <ul>
                  <li>Research your destination before traveling.</li>
                  <li>Keep important documents safely packed.</li>
                  <li>Check weather conditions before departure.</li>
                  <li>Plan transportation in advance.</li>
                </ul>
                <button onClick={() => navigate('/explore')} className="btn primary-btn" style={{ marginTop: '1rem' }}>Explore Destination</button>
              </div>
            </div>
          </article>
        </div>

        {/* BOTTOM ROW: Calendar, Weather, Packing (Symmetrical 3 Columns) */}
        <div className="dashboard-widgets">
          <TravelCalendar />
          <WeatherCard />
          <PackingAssistant />
        </div>
      </section>

      {/* --- ACTIVITIES & EXPLORE --- */}
      <section className="activities-section">
        <header className="section-header">
          <h2>Activities & Experiences</h2>
          <Link to="/activities">View All</Link>
        </header>
        <div className="activity-grid">
          <article className="activity-card">
            <img src="/images/adventure.jpg" alt="Adventure" />
            <div className="activity-info" style={{ textAlign: 'center' }}>
              <h3>Adventure</h3>
              <p>20+ experiences</p>
            </div>
          </article>
          <article className="activity-card">
            <img src="/images/culture.jpg" alt="Culture" />
            <div className="activity-info" style={{ textAlign: 'center' }}>
              <h3>Culture</h3>
              <p>15+ experiences</p>
            </div>
          </article>
          <article className="activity-card">
            <img src="/images/food.jpg" alt="Food & Drink" />
            <div className="activity-info" style={{ textAlign: 'center' }}>
              <h3>Food & Drink</h3>
              <p>30+ experiences</p>
            </div>
          </article>
          <article className="activity-card">
            <img src="/images/beach.jpg" alt="Beaches" />
            <div className="activity-info" style={{ textAlign: 'center' }}>
              <h3>Beaches</h3>
              <p>25+ experiences</p>
            </div>
          </article>
        </div>
      </section>

      {/* --- HOTELS + REVIEWS --- */}
      <section className="bottom-content">
        <section className="top-hotels">
          <header className="section-header">
            <h2>Top Rated Hotels</h2>
            <Link to="/hotels">View All</Link>
          </header>
          <div className="hotel-list">
            <article className="hotel-item">
              <img src="/images/hotel1.jpg" alt="The Kayon Resort Bali" />
              <div>
                <h3>The Kayon Resort Bali</h3>
                <p style={{ color: '#F59E0B', fontWeight: 600, fontSize: '0.85rem' }}>
                  <span className="material-symbols-rounded" style={{ fontSize: '14px', verticalAlign: '-2px' }}>star</span> 4.8 
                  <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}> (1.2K)</span>
                </p>
                <p style={{ fontSize: '0.85rem' }}>From $150 / night</p>
              </div>
            </article>
            <article className="hotel-item">
              <img src="/images/hotel2.jpg" alt="The Oberoi Beach Resort" />
              <div>
                <h3>The Oberoi Beach Resort</h3>
                <p style={{ color: '#F59E0B', fontWeight: 600, fontSize: '0.85rem' }}>
                  <span className="material-symbols-rounded" style={{ fontSize: '14px', verticalAlign: '-2px' }}>star</span> 4.9 
                  <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}> (980)</span>
                </p>
                <p style={{ fontSize: '0.85rem' }}>From $200 / night</p>
              </div>
            </article>
            <article className="hotel-item">
              <img src="/images/hotel3.jpg" alt="Le Meridien Maldives" />
              <div>
                <h3>Le Meridien Maldives</h3>
                <p style={{ color: '#F59E0B', fontWeight: 600, fontSize: '0.85rem' }}>
                  <span className="material-symbols-rounded" style={{ fontSize: '14px', verticalAlign: '-2px' }}>star</span> 4.7 
                  <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}> (870)</span>
                </p>
                <p style={{ fontSize: '0.85rem' }}>From $300 / night</p>
              </div>
            </article>
          </div>
        </section>

        <section className="reviews-section">
          <header className="section-header">
            <h2>Recent Reviews</h2>
            <Link to="/reviews">View All</Link>
          </header>
          <div className="review-list">
            <article className="review-card">
              <div className="review-header" style={{ width: '100%' }}>
                <img src="/images/switzerland.jpg" alt="User Avatar" className="review-avatar" style={{ objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <h3 style={{ fontSize: '0.95rem', margin: 0 }}>Switzerland Trip</h3>
                    <span style={{ fontSize: '0.85rem', color: '#F59E0B', fontWeight: 600 }}>4.9 <span className="material-symbols-rounded" style={{ fontSize: '12px', verticalAlign: '-1px' }}>star</span></span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>2 days ago</p>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-dark)' }}>The mountains and lakes were absolutely beautiful. An unforgettable experience!</p>
            </article>
            <article className="review-card">
              <div className="review-header" style={{ width: '100%' }}>
                <img src="/images/bali.jpg" alt="User Avatar" className="review-avatar" style={{ objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <h3 style={{ fontSize: '0.95rem', margin: 0 }}>Bali Adventure</h3>
                    <span style={{ fontSize: '0.85rem', color: '#F59E0B', fontWeight: 600 }}>4.8 <span className="material-symbols-rounded" style={{ fontSize: '12px', verticalAlign: '-1px' }}>star</span></span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>3 days ago</p>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-dark)' }}>Amazing beaches, great food and wonderful local experiences.</p>
            </article>
            <article className="review-card">
              <div className="review-header" style={{ width: '100%' }}>
                <img src="/images/japan.jpg" alt="User Avatar" className="review-avatar" style={{ objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <h3 style={{ fontSize: '0.95rem', margin: 0 }}>Japan in Spring</h3>
                    <span style={{ fontSize: '0.85rem', color: '#F59E0B', fontWeight: 600 }}>4.7 <span className="material-symbols-rounded" style={{ fontSize: '12px', verticalAlign: '-1px' }}>star</span></span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>5 days ago</p>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-dark)' }}>Cherry blossoms, temples and amazing food made this trip special.</p>
            </article>
          </div>
        </section>
      </section>

      {/* --- FOOTER --- */}
      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <Link
              to="/"
              onClick={handleBrandClick}
              aria-label="Go to the top of the Travio home page"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}
            >
              <span className="material-symbols-rounded logo-icon">flight_takeoff</span>
              <h2 style={{ margin: 0 }}>Travio</h2>
            </Link>
            <p>Explore the world with smarter travel planning.</p>
          </div>
          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ textDecoration: 'none', color: 'inherit' }}>About Us</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ textDecoration: 'none', color: 'inherit' }}>Careers</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ textDecoration: 'none', color: 'inherit' }}>Blog</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Support</h3>
            <ul>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ textDecoration: 'none', color: 'inherit' }}>Help Center</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ textDecoration: 'none', color: 'inherit' }}>Contact Us</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ textDecoration: 'none', color: 'inherit' }}>Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Explore</h3>
            <ul>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ textDecoration: 'none', color: 'inherit' }}>Destinations</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ textDecoration: 'none', color: 'inherit' }}>Hotels</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ textDecoration: 'none', color: 'inherit' }}>Activities</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ textDecoration: 'none', color: 'inherit' }}>Travel Guide</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Follow Us</h3>
            <div className="social-links" style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="Instagram"><span className="material-symbols-rounded">photo_camera</span></a>
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="Facebook"><span className="material-symbols-rounded">public</span></a>
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="YouTube"><span className="material-symbols-rounded">play_circle</span></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Travio. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Dashboard;


