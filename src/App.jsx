import { BrowserRouter, Routes, Route, Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom';
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

// Inner App Controller to handle refresh welcome page and routing
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const isExplicitLogout = () => {
    try {
      return localStorage.getItem('auth_logged_out') === 'true';
    } catch {
      return false;
    }
  };

  // On every browser reload / refresh (F5), hasEntered is initialized to false
  // It ONLY defaults to true if user is currently on /auth AND has explicitly logged out
  const [hasEntered, setHasEntered] = useState(() => {
    if (location.pathname === '/auth' && isExplicitLogout()) {
      return true;
    }
    return false;
  });

  const handleEnterDashboard = () => {
    try {
      localStorage.removeItem('auth_logged_out');
    } catch (e) {
      console.error(e);
    }
    setHasEntered(true);
    navigate('/dashboard');
  };

  // When user refreshes site (or opens site fresh), first comes the opening welcome page!
  // It only skips to AuthPage if user explicitly logged out and is on /auth
  if (!hasEntered && !(location.pathname === '/auth' && isExplicitLogout())) {
    return <LandingPage onComplete={handleEnterDashboard} />;
  }

  return (
    <Routes>
      {/* Root route: always goes to dashboard once entered */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Auth page - ONLY shown when user explicitly logs out */}
      <Route path="/auth" element={<AuthPage onLoginSuccess={() => setHasEntered(true)} />} />

      {/* Main App Routes (Wrapped in MainLayout with Sidebar) */}
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

        {/* Protected Routes (Authentication Required - defaults to active explorer session unless logged out) */}
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

      {/* Dedicated 404 Page for Any Unknown Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <TravelProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TravelProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
