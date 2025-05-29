import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Define Route type consistent with your backend data
interface Route {
  id: string;
  from: string;
  to: string;
  distance?: string;
  duration?: string;
  price?: string;       // Optional, if backend provides
  image?: string;       // Optional, if backend provides
}

const API_BASE = 'http://localhost:4000/api';  // Change to your backend URL

const FeaturedRoutes: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await fetch(`${API_BASE}/getDailyRoutes`);
        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
        const data: Route[] = await res.json();

        // Optional: Add default images or prices if missing
        const enrichedData = data.map(route => ({
          ...route,
          image: route.image || '/default-route.jpg',
          price: route.price || 'KES 1500',
        }));

        setRoutes(enrichedData);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch routes');
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  if (loading) return <p className="text-center py-10">Loading routes...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Popular Routes</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Discover our most traveled routes with frequent departures and competitive prices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {routes.map((route) => (
            <div
              key={route.id}
              className="card group overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={route.image}
                  alt={`${route.from} to ${route.to}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-sm font-medium">{route.price}</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {route.from} to {route.to}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">Daily departures</span>
                  <Link
                    to={`/schedules?from=${route.from}&to=${route.to}`}
                    className="text-primary hover:text-primary/80 font-medium text-sm flex items-center"
                  >
                    View Schedules
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/routes"
            className="btn-primary inline-flex items-center"
          >
            View All Routes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRoutes;
