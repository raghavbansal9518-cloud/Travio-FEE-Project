import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import GeoWeather from './pages/GeoWeather';
import ExplorePage from './pages/ExplorePage';
import DestinationDetails from './DestinationDetails';
import BookingsPage from './pages/BookingsPage';
import TransportPage from './pages/TransportPage';
import FoodGuide from './pages/FoodGuide';
import Activities from './pages/Activities';
import PackingPage from './pages/PackingPage';
import WishlistPage from './pages/WishlistPage';
import JournalPage from './pages/JournalPage';
import ReviewsPage from './pages/ReviewsPage';
import SettingsPage from './pages/SettingsPage';

// Components
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import FloatingChatbot from './components/FloatingChatbot';

export default function App() {
  const [hasSeenSplash, setHasSeenSplash] = useState(false);

  return (
    <BrowserRouter>
      {!hasSeenSplash ? (
        <LandingPage onComplete={() => setHasSeenSplash(true)} />
      ) : (
        <>
          <Routes>
            {/* --- Auth Page (NO SIDEBAR, NO MARGINS) --- */}
            <Route path="/auth" element={<AuthPage />} />

            {/* --- Main App Layout (HAS SIDEBAR AND FOOTER) --- */}
            <Route path="/*" element={
              <div className="page-layout home-theme">
                <Sidebar />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/destination/:id" element={<DestinationDetails />} />
                    <Route path="/bookings" element={<BookingsPage />} />
                    <Route path="/transport" element={<TransportPage />} />
                    <Route path="/geoweather" element={<GeoWeather />} />
                    <Route path="/food-guide" element={<FoodGuide />} />
                    <Route path="/activities" element={<Activities />} />
                    <Route path="/packing" element={<PackingPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/journal" element={<JournalPage />} />
                    <Route path="/reviews" element={<ReviewsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </Routes>
                  <Footer />
                </main>
              </div>
            } />
          </Routes>
          
          <FloatingChatbot />
        </>
      )}
    </BrowserRouter>
  );
}
