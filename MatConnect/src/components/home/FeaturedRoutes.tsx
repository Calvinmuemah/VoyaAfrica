import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { featuredRoutes } from '../../data/mockData';

const FeaturedRoutes: React.FC = () => {
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
          {featuredRoutes.map((route) => (
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