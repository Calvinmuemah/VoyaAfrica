import React from 'react';
import { popularCompanies } from '../../data/mockData';
import { Star } from 'lucide-react';

const PopularCompanies: React.FC = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Transport Partners</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            We've partnered with the most reliable transportation companies to ensure your comfort and safety
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularCompanies.map((company) => (
            <div key={company.id} className="card hover:shadow-lg transition-shadow duration-300">
              <div className="p-5">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{company.name}</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(company.rating)
                                ? 'text-yellow-400 fill-current'
                                : i < company.rating
                                ? 'text-yellow-400 fill-current opacity-50'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{company.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Routes Covered</span>
                    <span className="font-medium text-gray-800">25+</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-500">Daily Trips</span>
                    <span className="font-medium text-gray-800">30+</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCompanies;