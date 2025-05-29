import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/layout/Layout';  // Adjust the path if needed

interface TransportRoute {
  _id: string;
  routeNumber: string;
  origin: string;
  destination: string;
  description?: string;
  imageUrl?: string;
  distance?: string;
  duration?: string;
  createdAt?: string;
  updatedAt?: string;
}

const API_BASE = 'http://localhost:4000/api';

const getAllRoutes = async (): Promise<TransportRoute[]> => {
  const response = await axios.get(`${API_BASE}/getRoutes`);
  return response.data;
};

const GetRoutes = () => {
  const [routes, setRoutes] = useState<TransportRoute[]>([]);

  useEffect(() => {
    const loadRoutes = async () => {
      try {
        const data = await getAllRoutes();
        setRoutes(data);
      } catch (error) {
        console.error('Failed to load routes:', error);
      }
    };
    loadRoutes();
  }, []);

  return (
    <Layout>
      <div style={{ padding: '1.5rem', width: '100%', boxSizing: 'border-box' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>All Transport Routes</h3>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            justifyContent: 'center',
          }}
        >
          {routes.map((route) => (
            <div
              key={route._id}
              style={{
                flex: '0 1 320px',
                display: 'flex',
              }}
            >
              <div
                className="card h-100 shadow-sm border-0 rounded-4"
                style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
              >
                {route.imageUrl && (
                  <img
                    src={`http://localhost:4000${route.imageUrl}`}
                    className="card-img-top rounded-top-4"
                    alt="Route"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body d-flex flex-column" style={{ flexGrow: 1 }}>
                  <h5 className="card-title text-primary">Route {route.routeNumber}</h5>
                  <p className="card-text flex-grow-1" style={{ marginBottom: '1rem' }}>
                    <strong>From:</strong> {route.origin}
                    <br />
                    <strong>To:</strong> {route.destination}
                    <br />
                    <strong>Distance:</strong> {route.distance || 'N/A'}
                    <br />
                    <strong>Duration:</strong> {route.duration || 'N/A'}
                    <br />
                    {route.description && (
                      <>
                        <strong>Description:</strong> {route.description}
                        <br />
                      </>
                    )}
                  </p>
                  <Link
                    to="/schedules"
                    style={{
                      marginTop: 'auto',
                      textDecoration: 'underline',
                      color: '#0d6efd',
                      cursor: 'pointer',
                      alignSelf: 'flex-start',
                      fontWeight: '500',
                    }}
                  >
                    View Schedules
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default GetRoutes;
