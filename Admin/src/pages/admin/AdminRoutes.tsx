import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Define HTTP Route interfaces
interface HttpRoute {
  _id: string;
  routeNumber: string;
  name: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description?: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface HttpRouteFormData {
  name: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description?: string;
  active: boolean;
}

// API base URL
const API_BASE = 'http://localhost:4000/api';

// Route service functions
const getAllRoutes = async (): Promise<HttpRoute[]> => {
  const response = await axios.get(`${API_BASE}/getRoutes`);
  return response.data;
};

const deleteRoute = async (routeNumber: string): Promise<void> => {
  await axios.delete(`${API_BASE}/delete/${routeNumber}`);
};

// Main component
const AdminRoutes = () => {
  const [routes, setRoutes] = useState<HttpRoute[]>([]);

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
      <h3>HTTP Routes</h3>
      <Link to="/AdminRoutes/new" className="btn btn-primary mb-3">Add Route</Link>
      <div className="row">
        {routes.map((route) => (
          <div key={route._id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{route.name}</h5>
                <p className="card-text">
                  <strong>Method:</strong> {route.method}<br />
                  <strong>Path:</strong> {route.path}<br />
                  {route.description && (
                    <>
                      <strong>Description:</strong> {route.description}<br />
                    </>
                  )}
                  <strong>Status:</strong> {route.active ? 'Active' : 'Inactive'}
                </p>
                <Link to="/schedules" className="btn btn-info btn-sm me-2">
                  View Schedules
                </Link>
                <Link to={`/routes/${route._id}/edit`} className="btn btn-secondary btn-sm me-2">
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
