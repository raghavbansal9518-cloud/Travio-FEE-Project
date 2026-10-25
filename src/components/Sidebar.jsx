import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { logoutCurrentUser } from '../services/userProfileService';

// We pass isHome prop here in case we need to conditionally style based on the page
const Sidebar = ({ isHome }) => {
  // State to handle sidebar expansion on mobile devices
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleBrandClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle the sidebar when clicked on mobile
  const toggleMobileSidebar = () => {
    setIsMobileExpanded(!isMobileExpanded);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logoutCurrentUser();
    navigate('/auth');
  };

  return (
    <aside 
      className={`sidebar ${isMobileExpanded ? 'mobile-expanded' : ''}`}
      onClick={toggleMobileSidebar}
    >
      {/* --- Branding & Logo --- */}
      <div className="sidebar-brand">
        <NavLink to="/" className="logo-link" onClick={handleBrandClick}>
          <span className="material-symbols-rounded logo-icon">flight_takeoff</span>
          <div className="logo-text">
            <h1>Travio</h1>
            <p>Explore. Plan. Travel.</p>
          </div>
        </NavLink>
      </div>

      {/* --- Main Navigation Links --- */}
      <nav className="sidebar-nav" aria-label="Main navigation">
        <ul className="nav-list">
          {/* Core Pages */}
          <li>
            <NavLink to="/dashboard">
              <span className="material-symbols-rounded">home</span>
              <span className="nav-text">{t('nav.home', 'Home')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore">
              <span className="material-symbols-rounded">explore</span>
              <span className="nav-text">{t('nav.explore', 'Explore')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/wishlist">
              <span className="material-symbols-rounded">favorite</span>
              <span className="nav-text">{t('nav.wishlist', 'Wishlist')}</span>
            </NavLink>
          </li>
          
          <li className="nav-divider"></li>

          {/* Tools & Features */}
          <li>
            <NavLink to="/booking">
              <span className="material-symbols-rounded">airplane_ticket</span>
              <span className="nav-text">{t('nav.bookTrip', 'Book a Trip')}</span>
            </NavLink>
          </li>
          <li><NavLink to="/geoweather"><span className="material-symbols-rounded">travel_explore</span><span className="nav-text">{t('nav.geoWeather', 'GeoWeather')}</span></NavLink></li>
          <li><NavLink to="/food-guide"><span className="material-symbols-rounded">restaurant</span><span className="nav-text">{t('nav.foodGuide', 'Food Guide')}</span></NavLink></li>
          <li><NavLink to="/packing"><span className="material-symbols-rounded">backpack</span><span className="nav-text">{t('nav.packing', 'Packing')}</span></NavLink></li>
          
          {/* User Specific Pages */}

          <li>
            <NavLink to="/journal">
              <span className="material-symbols-rounded">menu_book</span>
              <span className="nav-text">{t('nav.journal', 'Journal')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/badges">
              <span className="material-symbols-rounded">workspace_premium</span>
              <span className="nav-text">{t('nav.badges', 'Badges')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile">
              <span className="material-symbols-rounded">person</span>
              <span className="nav-text">{t('nav.profile', 'Profile')}</span>
            </NavLink>
          </li>
          <li><NavLink to="/settings"><span className="material-symbols-rounded">settings</span><span className="nav-text">{t('nav.settings', 'Settings')}</span></NavLink></li>
          <li><NavLink to="/admin"><span className="material-symbols-rounded">admin_panel_settings</span><span className="nav-text">{t('nav.admin', 'Admin')}</span></NavLink></li>

          {/* Direct Logout / Auth Navigation */}
          <li>
            <a 
              href="/auth" 
              onClick={handleLogout} 
              style={{ color: '#f43f5e' }}
              title="Logout to Login Screen"
            >
              <span className="material-symbols-rounded" style={{ color: '#f43f5e' }}>logout</span>
              <span className="nav-text">{t('header.logout', 'Logout')}</span>
            </a>
          </li>
        </ul>

        {/* --- Bottom Actions --- */}
        <div className="sidebar-bottom">
          {/* Premium Upsell Button */}
          <div className="premium-section">
            <NavLink to="/membership" className="premium-btn">
              <span className="material-symbols-rounded">workspace_premium</span>
              <span className="nav-text">{t('nav.getPremium', 'Get Premium')}</span>
            </NavLink>
          </div>

          {/* Support Info Card */}
          <div className="support-card">
            <h4>{t('nav.needHelp', 'Need Help?')}</h4>
            <p>{t('nav.support', '24/7 Travel Support')}</p>
            <a href="tel:+910000000000" className="support-link">
              <span className="material-symbols-rounded">support_agent</span>
              <span>+91 XXXXX XXXXX</span>
            </a>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
