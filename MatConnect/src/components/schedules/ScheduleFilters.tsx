import React, { useState } from 'react';
import { Filter, ArrowDownUp } from 'lucide-react';

interface ScheduleFiltersProps {
  onFilterChange: (filters: { 
    vehicleTypes: string[];
    timeOfDay: string[];
    minPrice: number;
    maxPrice: number;
  }) => void;
  onSortChange: (sortBy: string) => void;
}

const ScheduleFilters: React.FC<ScheduleFiltersProps> = ({ onFilterChange, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);
  const [timeOfDay, setTimeOfDay] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [sortBy, setSortBy] = useState('departureTime');
  
  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };
  
  const handleVehicleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    
    if (isChecked) {
      setVehicleTypes([...vehicleTypes, value]);
    } else {
      setVehicleTypes(vehicleTypes.filter((type) => type !== value));
    }
  };
  
  const handleTimeOfDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    
    if (isChecked) {
      setTimeOfDay([...timeOfDay, value]);
    } else {
      setTimeOfDay(timeOfDay.filter((time) => time !== value));
    }
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const name = e.target.name;
    
    if (name === 'minPrice') {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
    onSortChange(value);
  };
  
  const applyFilters = () => {
    onFilterChange({
      vehicleTypes,
      timeOfDay,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
    
    // Close filter on mobile
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };
  
  const resetFilters = () => {
    setVehicleTypes([]);
    setTimeOfDay([]);
    setPriceRange([0, 3000]);
    
    onFilterChange({
      vehicleTypes: [],
      timeOfDay: [],
      minPrice: 0,
      maxPrice: 3000,
    });
  };
  
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div className="flex items-center">
          <button
            onClick={toggleFilter}
            className="flex items-center text-gray-700 font-medium md:hidden"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
          <h2 className="text-xl font-semibold text-gray-900 hidden md:block">Filters</h2>
        </div>
        
        <div className="flex items-center mt-4 md:mt-0 w-full md:w-auto">
          <div className="flex items-center">
            <ArrowDownUp className="h-5 w-5 text-gray-500 mr-2" />
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="select py-1 border-none focus:ring-0"
            >
              <option value="departureTime">Departure Time</option>
              <option value="price">Price</option>
              <option value="duration">Duration</option>
              <option value="availableSeats">Available Seats</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className={`md:block ${isOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Vehicle Type */}
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Vehicle Type</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Bus"
                    checked={vehicleTypes.includes('Bus')}
                    onChange={handleVehicleTypeChange}
                    className="h-4 w-4 text-primary focus:ring-primary/50 rounded"
                  />
                  <span className="ml-2 text-gray-700">Bus</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Matatu"
                    checked={vehicleTypes.includes('Matatu')}
                    onChange={handleVehicleTypeChange}
                    className="h-4 w-4 text-primary focus:ring-primary/50 rounded"
                  />
                  <span className="ml-2 text-gray-700">Matatu</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Shuttle"
                    checked={vehicleTypes.includes('Shuttle')}
                    onChange={handleVehicleTypeChange}
                    className="h-4 w-4 text-primary focus:ring-primary/50 rounded"
                  />
                  <span className="ml-2 text-gray-700">Shuttle</span>
                </label>
              </div>
            </div>
            
            {/* Time of Day */}
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Time of Day</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="morning"
                    checked={timeOfDay.includes('morning')}
                    onChange={handleTimeOfDayChange}
                    className="h-4 w-4 text-primary focus:ring-primary/50 rounded"
                  />
                  <span className="ml-2 text-gray-700">Morning (6AM - 12PM)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="afternoon"
                    checked={timeOfDay.includes('afternoon')}
                    onChange={handleTimeOfDayChange}
                    className="h-4 w-4 text-primary focus:ring-primary/50 rounded"
                  />
                  <span className="ml-2 text-gray-700">Afternoon (12PM - 6PM)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="evening"
                    checked={timeOfDay.includes('evening')}
                    onChange={handleTimeOfDayChange}
                    className="h-4 w-4 text-primary focus:ring-primary/50 rounded"
                  />
                  <span className="ml-2 text-gray-700">Evening (6PM - 12AM)</span>
                </label>
              </div>
            </div>
            
            {/* Price Range */}
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Price Range</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">KSh {priceRange[0]}</span>
                  <span className="text-sm text-gray-600">KSh {priceRange[1]}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    name="minPrice"
                    min="0"
                    max="3000"
                    step="100"
                    value={priceRange[0]}
                    onChange={handlePriceChange}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    name="maxPrice"
                    min="0"
                    max="3000"
                    step="100"
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={resetFilters}
              className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 mr-3"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={applyFilters}
              className="btn-primary"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleFilters;