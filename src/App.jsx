import { BrowserRouter, Routes, Route, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import GeoWeather from './pages/GeoWeather';
import ExplorePage from './pages/ExplorePage';
import DestinationDetails from './DestinationDetails';
import BookingsPage from './pages/BookingsPage';
import Booking from './Booking';
import TransportPage from './pages/TransportPage';
import FoodGuide from './pages/FoodGuide';
import Activities from './pages/Activities';
import PackingPage from './pages/PackingPage';
import WishlistPage from './pages/WishlistPage';
import JournalPage from './pages/JournalPage';
import JournalStoryPage from './pages/JournalStoryPage';
import BadgesPage from './pages/BadgesPage';
import ReviewsPage from './pages/ReviewsPage';
import SettingsPage from './pages/SettingsPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import Sidebar from './components/Sidebar';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';

// Context
import { TravelProvider } from './context/TravelContext';
import { LanguageProvider } from './context/LanguageContext';

// Main persistent layout with sidebar and main content area
function MainLayout() {
  return (
    <div className="page-layout home-theme">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

// Landing page / Root route handler
function HomeOrLanding() {
  const [hasSeenSplash, setHasSeenSplash] = useState(() => {
    try {
      return sessionStorage.getItem('travio_has_seen_splash') === 'true';
    } catch {
      return false;
    }
  });
  const navigate = useNavigate();

  const handleSplashComplete = () => {
    try {
      sessionStorage.setItem('travio_has_seen_splash', 'true');
    } catch (e) {
      // ignore
    }
    setHasSeenSplash(true);
    navigate('/auth');
  };

  if (!hasSeenSplash) {
    return <LandingPage onComplete={handleSplashComplete} />;
  }

  return <Navigate to="/dashboard" replace />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <TravelProvider>
          <BrowserRouter>
            <Routes>
              {/* --- Root: Landing splash if first visit, else redirect to dashboard --- */}
              <Route path="/" element={<HomeOrLanding />} />

              {/* --- Auth Page (Full screen, no sidebar) --- */}
              <Route path="/auth" element={<AuthPage />} />

              {/* --- Main App Routes (Wrapped in MainLayout with Sidebar) --- */}
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/destination/:id" element={<DestinationDetails />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/transport" element={<TransportPage />} />
                <Route path="/geoweather" element={<GeoWeather />} />
                <Route path="/food-guide" element={<FoodGuide />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/packing" element={<PackingPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/badges" element={<BadgesPage />} />
                <Route path="/badges/:badgeId" element={<BadgesPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/hotels" element={<Booking />} />
                <Route path="/flights" element={<Booking />} />

                {/* Protected Routes (Authentication Required) */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/bookings" element={<BookingsPage />} />
                  <Route path="/trips" element={<BookingsPage />} />
                  <Route path="/journal" element={<JournalPage />} />
                  <Route path="/journal/:entryId" element={<JournalStoryPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/profile" element={<SettingsPage defaultTab="profile" />} />
                  <Route path="/membership" element={<SettingsPage defaultTab="membership" />} />
                </Route>

                {/* Admin Management Console (Airline Management System) */}
                <Route path="/admin" element={<AdminPage />} />
              </Route>

              {/* --- Dedicated 404 Page for Any Unknown Route --- */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </TravelProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
