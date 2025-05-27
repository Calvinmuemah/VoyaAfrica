import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Layers } from 'lucide-react';

const AuthLayout: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated && !loading) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="text-center mb-4">
          <Layers size={40} className="text-primary mb-2" />
          <h4 className="mb-0">Matatau Connet</h4>
          <p className="text-muted">Admin Panel</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;