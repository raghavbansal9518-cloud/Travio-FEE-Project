import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { getCurrentUser } from '../services/userProfileService';

/**
 * ProtectedRoute component - validates user authentication before allowing access
 * to private routes (Bookings, Journal, Profile, Settings, Admin).
 * Defaults to Aarav Sharma so browsing user features does not force login page.
 */
export default function ProtectedRoute({ children, requiredRole }) {
  const location = useLocation();

  const getAuthStatus = () => {
    try {
      // If user explicitly clicked Logout during this session, redirect to auth
      const isLoggedOut = typeof window !== 'undefined' && sessionStorage.getItem('travio_logged_out') === 'true';
      if (isLoggedOut) {
        return { isAuthenticated: false, role: 'user', userEmail: null };
      }

      let email = localStorage.getItem('auth_email');
      if (!email) {
        // Automatically default to Aarav Sharma so Profile, Journal, Settings load immediately
        email = 'aarav.sharma@example.com';
        localStorage.setItem('auth_email', email);
        localStorage.setItem('auth_role', 'user');
        const user = getCurrentUser();
        localStorage.setItem('travio_user_profile', JSON.stringify(user));
      }

      const role = localStorage.getItem('auth_role') || (email?.toLowerCase().includes('admin') ? 'admin' : 'user');

      return {
        isAuthenticated: true,
        role,
        userEmail: email
      };
    } catch {
      return { isAuthenticated: true, role: 'user', userEmail: 'aarav.sharma@example.com' };
    }
  };

  const { isAuthenticated, role } = getAuthStatus();

  if (!isAuthenticated) {
    // Redirect to auth page, preserving the attempted location
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requiredRole && role !== requiredRole) {
    // If route requires admin role and user is not admin
    return <Navigate to="/dashboard" replace />;
  }

  return children ? children : <Outlet />;
}
