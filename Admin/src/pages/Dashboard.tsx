import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Route as RouteIcon,
  Users,
  Truck,
  User,
  CalendarCheck,
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [counts, setCounts] = useState({
    routes: 0,
    users: 0,
    vehicles: 0,
    drivers: 0,
    schedules: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Replace these URLs with your real backend API endpoints
    const fetchCounts = async () => {
      try {
        setLoading(true);
        const [routesRes, usersRes, vehiclesRes, driversRes, schedulesRes] =
          await Promise.all([
            fetch('/api/routes/count'),
            fetch('/api/users/count'),
            fetch('/api/vehicles/count'),
            fetch('/api/drivers/count'),
            fetch('/api/schedules/count'),
          ]);
        if (
          !routesRes.ok ||
          !usersRes.ok ||
          !vehiclesRes.ok ||
          !driversRes.ok ||
          !schedulesRes.ok
        ) {
          throw new Error('Failed to fetch counts');
        }
        const routesCount = await routesRes.json();
        const usersCount = await usersRes.json();
        const vehiclesCount = await vehiclesRes.json();
        const driversCount = await driversRes.json();
        const schedulesCount = await schedulesRes.json();

        setCounts({
          routes: routesCount.count,
          users: usersCount.count,
          vehicles: vehiclesCount.count,
          drivers: driversCount.count,
          schedules: schedulesCount.count,
        });
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading)
    return <div className="text-center mt-5">Loading dashboard data...</div>;

  if (error)
    return (
      <div className="alert alert-danger mt-5 text-center">
        Error: {error}
      </div>
    );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>
      <div className="row g-4">
        {/* Routes */}
        <div className="col-md-4">
          <Link to="/routes" className="card text-decoration-none text-dark h-100 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <RouteIcon size={36} className="text-primary me-3" />
              <div>
                <h5>Routes</h5>
                <p className="mb-0 fs-4">{counts.routes}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Users */}
        <div className="col-md-4">
          <Link to="/users" className="card text-decoration-none text-dark h-100 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <Users size={36} className="text-success me-3" />
              <div>
                <h5>Users</h5>
                <p className="mb-0 fs-4">{counts.users}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Vehicles */}
        <div className="col-md-4">
          <Link to="/vehicles" className="card text-decoration-none text-dark h-100 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <Truck size={36} className="text-warning me-3" />
              <div>
                <h5>Vehicles</h5>
                <p className="mb-0 fs-4">{counts.vehicles}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Drivers */}
        <div className="col-md-4">
          <Link to="/drivers" className="card text-decoration-none text-dark h-100 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <User size={36} className="text-info me-3" />
              <div>
                <h5>Drivers</h5>
                <p className="mb-0 fs-4">{counts.drivers}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Schedules */}
        <div className="col-md-4">
          <Link to="/schedules" className="card text-decoration-none text-dark h-100 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <CalendarCheck size={36} className="text-danger me-3" />
              <div>
                <h5>Schedules</h5>
                <p className="mb-0 fs-4">{counts.schedules}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
