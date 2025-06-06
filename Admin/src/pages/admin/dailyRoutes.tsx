import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Define Transport Route interface
interface TransportRoute {
  _id: string;
  routeNumber: string;
  origin: string;
  destination: string;
  description?: string;
  imageUrl?: string;
  distance?: string;
  duration?: string;
  price?: number;
  createdAt?: string;
  updatedAt?: string;
}

// API base URL
const API_BASE = 'http://localhost:4000/api';

// Route service functions
const getAllRoutes = async (): Promise<TransportRoute[]> => {
  const response = await axios.get(`${API_BASE}/getDailyRoutes`);
  return response.data;
};

const deleteRoute = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE}/updateDailyRoute/${id}`);
};

// Main component
const AdminRoutes = () => {
  const [routes, setRoutes] = useState<TransportRoute[]>([]);

  const loadRoutes = async () => {
    try {
      const data = await getAllRoutes();
      setRoutes(data);
    } catch (error) {
      console.error('Failed to load routes:', error);
    }
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  const handleDelete = async (routeNumber: string) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      try {
        await deleteRoute(routeNumber);
        loadRoutes();
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  return (
    <div>
      <h3>All Transport Routes</h3>
      <Link to="/AddDailyRoute/new" className="btn btn-primary mb-3">
        Add Route
      </Link>
      <div className="row">
        {routes.map((route) => (
          <div key={route._id} className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              {route.imageUrl && (
                <img
                  src={`http://localhost:4000${route.imageUrl}`}
                  className="card-img-top"
                  alt="Route"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">Route {route.routeNumber}</h5>
                <p className="card-text">
                  <strong>From:</strong> {route.origin}<br />
                  <strong>To:</strong> {route.destination}<br />
                  <strong>Distance:</strong> {route.distance || 'N/A'}<br />
                  <strong>Duration:</strong> {route.duration || 'N/A'}<br />
                  <strong>Price:</strong> {route.price || 'N/A'}<br />
                  {route.description && (
                    <>
                      <strong>Description:</strong> {route.description}<br />
                    </>
                  )}
                </p>
                <Link to="/dailyDepartures" className="btn btn-info btn-sm me-2">
                  View Schedules
                </Link>
                <Link to={`/AdminRoutes/${route._id}`} className="btn btn-secondary btn-sm me-2">
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(route.routeNumber)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRoutes;
