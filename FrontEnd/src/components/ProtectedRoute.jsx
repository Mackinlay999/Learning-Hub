import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust import path as needed (where AuthContext is defined)

/**
 * ProtectedRoute checks auth state and user role before rendering children.
 * - If still loading auth state, shows a spinner or loading indicator.
 * - If not authenticated, redirects to /login.
 * - If authenticated but role not allowed, redirects to /not-authorized.
 * - Otherwise, renders the child component.
 */
const ProtectedRoute = ({ allowedRoles, children }) => {
  const { auth } = useAuth();
  const { token, role, loading } = auth;

  // Show loading indicator while checking auth status
  if (loading) {
    return <div>Loading...</div>; // You can replace with a fancier spinner
  }

  // If not logged in, redirect to login page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If user does not have required role, redirect to NotAuthorized page
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/not-authorized" replace />;
  }

  // Authorized: render the child component(s)
  return <>{children}</>;
};

export default ProtectedRoute;