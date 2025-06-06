import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Route {
  _id: string;
  routeNumber: string;
  origin: string;
  destination: string;
  distance?: string;
  duration?: string;
  price: number;
  imageUrl: string;
}

const API_BASE = 'http://localhost:4000/api';

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

        console.log('Fetched routes:', data); // debug
        setRoutes(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch routes');
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);
  // console.log(route.imageUrl);


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
              key={route._id}
              className="card group overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`http://localhost:4000/api/getDailyRoutes${route.imageUrl}`}
                  alt={`${route.origin} to ${route.destination}`}
                  // className="w-full h-full object-cover"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-sm font-medium">Ksh {route.price.toLocaleString()}</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {route.origin} to {route.destination}
                </h3>
                <p className="text-sm text-gray-600">
                  {route.distance} • {route.duration}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">Daily departures</span>
                  <Link
                    to={`/schedules?from=${encodeURIComponent(route.origin)}&to=${encodeURIComponent(route.destination)}`}
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
