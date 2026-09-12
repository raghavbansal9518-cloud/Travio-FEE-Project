import { NavLink } from 'react-router-dom';
import { useState } from 'react';

// We pass isHome prop here in case we need to conditionally style based on the page
const Sidebar = ({ isHome }) => {
  // State to handle sidebar expansion on mobile devices
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  // Toggle the sidebar when clicked on mobile
  const toggleMobileSidebar = () => {
    setIsMobileExpanded(!isMobileExpanded);
  };

  return (
    <aside 
      className={`sidebar ${isMobileExpanded ? 'mobile-expanded' : ''}`}
      onClick={toggleMobileSidebar}
    >
      {/* --- Branding & Logo --- */}
      <div className="sidebar-brand">
        <NavLink to="/" className="logo-link">
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
              <span className="nav-text">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore">
              <span className="material-symbols-rounded">explore</span>
              <span className="nav-text">Explore</span>
            </NavLink>
          </li>
          
          <li className="nav-divider"></li>

          {/* Tools & Features */}
          <li><NavLink to="/bookings"><span className="material-symbols-rounded">luggage</span><span className="nav-text">Bookings</span></NavLink></li>
          <li><NavLink to="/transport"><span className="material-symbols-rounded">directions_bus</span><span className="nav-text">Transport</span></NavLink></li>
          <li><NavLink to="/geoweather"><span className="material-symbols-rounded">travel_explore</span><span className="nav-text">GeoWeather</span></NavLink></li>
          <li><NavLink to="/food-guide"><span className="material-symbols-rounded">restaurant</span><span className="nav-text">Food Guide</span></NavLink></li>
          <li><NavLink to="/activities"><span className="material-symbols-rounded">hiking</span><span className="nav-text">Activities</span></NavLink></li>
          <li><NavLink to="/packing"><span className="material-symbols-rounded">backpack</span><span className="nav-text">Packing</span></NavLink></li>
          
          {/* User Specific Pages */}
          <li><NavLink to="/wishlist"><span className="material-symbols-rounded">favorite</span><span className="nav-text">Wishlist</span></NavLink></li>
          <li><NavLink to="/journal"><span className="material-symbols-rounded">menu_book</span><span className="nav-text">Journal</span></NavLink></li>
          <li><NavLink to="/reviews"><span className="material-symbols-rounded">star</span><span className="nav-text">Reviews</span></NavLink></li>
          <li><NavLink to="/settings"><span className="material-symbols-rounded">settings</span><span className="nav-text">Settings</span></NavLink></li>
        </ul>

        {/* --- Bottom Actions --- */}
        <div className="sidebar-bottom">
          {/* Premium Upsell Button */}
          <div className="premium-section">
            <NavLink to="/membership" className="premium-btn">
              <span className="material-symbols-rounded">workspace_premium</span>
              <span className="nav-text">Get Premium</span>
            </NavLink>
          </div>

          {/* Support Info Card */}
          <div className="support-card">
            <h4>Need Help?</h4>
            <p>24/7 Travel Support</p>
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