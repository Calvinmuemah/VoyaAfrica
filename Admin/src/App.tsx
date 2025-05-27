import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layers } from 'lucide-react';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
// import RoutesList from './pages/routes/RoutesList';
// import RouteForm from './pages/routes/RouteForm';
import NotFound from './pages/NotFound';
import Register from './pages/Register';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';

// drivers
import AdminDrivers from './pages/admin/DriverList';
import AddDriver from './pages/Adds/AddDriver';
// vehicles
import AdminVehicles from './pages/admin/AdminVehicles';
import AddVehicle from './pages/Adds/AddVehicle';
// routes
import AdminRoutes from './pages/admin/AdminRoutes';
import AddRoute from './pages/Adds/AddRoute';
// schedules
// import RouteSchedules from './pages/RouteSchedules';
import ViewSchedules from './pages/admin/ViewSchedules';
import AddSchedule from './pages/Adds/AddSchedule';
import EditSchedule from './pages/Adds/EditSchedule';
// Users
import AdminUsers from './pages/admin/AdminUsers';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Initial loading simulation (e.g., checking token/auth)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Page transition loading simulation
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <Layers size={48} className="text-primary mb-3" />
          <LoadingSpinner />
          <p className="mt-3 text-muted">Loading Mat Connet Admin...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/routes" element={<RoutesList />} /> */}
        {/* <Route path="/routes/new" element={<RouteForm />} /> */}
        {/* <Route path="/routes/edit/:id" element={<RouteForm />} /> */}
        {/* drivers */}
        <Route path="/drivers" element={<AdminDrivers />} />
        <Route path="/drivers/new" element={<AddDriver />} />
        <Route path="/drivers/:id/edit" element={<AddDriver />} />
        {/* vehicles */}
        <Route path="/vehicles" element={<AdminVehicles />} />
        <Route path="/vehicles/new" element={<AddVehicle />} />
        <Route path="/vehicles/:id/edit" element={<AddVehicle />} />
        {/* routes */}
        <Route path="/AdminRoutes" element={<AdminRoutes />} />
        <Route path="/AdminRoutes/new" element={<AddRoute />} />
        <Route path="/routes/:id/edit" element={<AddRoute />} />
        
        {/* schedules */}
        {/* <Route path="/routes/:id/schedules" element={<RouteSchedules />} /> */}
        <Route path="/schedules" element={<ViewSchedules />} />
        <Route path="/createSchedule" element={<AddSchedule />} />
        <Route path="/schedules/edit/:id" element={<EditSchedule />} />
        {/* users */}
        <Route path="/users" element={<AdminUsers />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
