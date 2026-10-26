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
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import Sidebar from './components/Sidebar';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';

// Services & Context
import { getCurrentUser } from './services/userProfileService';
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

// App routing and initial landing page controller
function AppRoutes() {
  // In-memory state: always resets to false on every full browser refresh / reload
  const [hasEntered, setHasEntered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // If the user has not clicked "Enter Dashboard" on this page load/refresh:
  // Always present the welcome LandingPage first
  if (!hasEntered) {
    return (
      <LandingPage
        onComplete={() => {
          try {
            sessionStorage.removeItem('travio_logged_out');
            sessionStorage.removeItem('travio_has_seen_splash');
            let email = localStorage.getItem('auth_email');
            if (!email) {
              localStorage.setItem('auth_email', 'aarav.sharma@example.com');
              localStorage.setItem('auth_role', 'user');
              const user = getCurrentUser();
              localStorage.setItem('travio_user_profile', JSON.stringify(user));
            }
          } catch {
            // ignore
          }
          setHasEntered(true);
          navigate('/dashboard');
        }}
      />
    );
  }

  return (
    <Routes>
      {/* Root redirect to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Auth Page: Only shown when explicitly logged out or routed */}
      <Route
        path="/auth"
        element={
          <AuthPage
            onLoginSuccess={() => {
              setHasEntered(true);
              navigate('/dashboard');
            }}
          />
        }
      />

      {/* Main App Routes with Sidebar Navigation */}
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
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/membership" element={<SettingsPage defaultTab="membership" />} />
        </Route>

        {/* Admin Management Console */}
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
            <AppRoutes />
          </BrowserRouter>
        </TravelProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
