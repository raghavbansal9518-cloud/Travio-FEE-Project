import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

/**
 * ProtectedRoute component - validates user authentication before allowing access
 * to private routes (Bookings, Journal, Profile, Settings, Admin).
 */
export default function ProtectedRoute({ children, requiredRole }) {
  const location = useLocation();

  const getAuthStatus = () => {
    try {
      const email = localStorage.getItem('auth_email');
      const profile = JSON.parse(localStorage.getItem('travio_user_profile') || '{}');
      const userEmail = email || profile.email;
      const role = localStorage.getItem('auth_role') || (userEmail?.toLowerCase().includes('admin') ? 'admin' : 'user');

      return {
        isAuthenticated: !!userEmail,
        role,
        userEmail
      };
    } catch {
      return { isAuthenticated: false, role: 'user', userEmail: null };
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
