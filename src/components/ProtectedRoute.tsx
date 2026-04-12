import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext, UserRole } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user, role, isAuthReady, isLoadingRole } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthReady || isLoadingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khamoun-primary"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login but save the location they were trying to access
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    // User is logged in but doesn't have the right role
    // Redirect students to dashboard and teachers to teacher portal
    const fallbackPath = role === 'teacher' ? '/teacher' : '/dashboard';
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};
