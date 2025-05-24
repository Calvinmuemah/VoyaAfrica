import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ScheduleList from '../components/schedules/ScheduleList';
import ScheduleFilters from '../components/schedules/ScheduleFilters';
import { schedules, routes } from '../data/mockData';
import { Schedule, Route } from '../types';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft, Calendar } from 'lucide-react';

const SchedulesPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setSelectedRoute } = useBooking();
  
  const queryParams = new URLSearchParams(location.search);
  const fromParam = queryParams.get('from');
  const toParam = queryParams.get('to');
  const dateParam = queryParams.get('date') || new Date().toISOString().split('T')[0];
  
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);
  const [date, setDate] = useState(dateParam);
  
  // Filter for schedules based on route
  useEffect(() => {
    setLoading(true);
    
    // Find the current route
    const route = routes.find(
      (r) => r.from === fromParam && r.to === toParam
    );
    
    if (route) {
      setCurrentRoute(route);
      setSelectedRoute(route);
      
      // Filter schedules based on route
      const filtered = schedules.filter((schedule) => schedule.routeId === route.id);
      setFilteredSchedules(filtered);
    } else {
      setFilteredSchedules([]);
    }
    
    setLoading(false);
  }, [fromParam, toParam, setSelectedRoute]);
  
  const handleFilterChange = (filters: {
    vehicleTypes: string[];
    timeOfDay: string[];
    minPrice: number;
    maxPrice: number;
  }) => {
    if (!currentRoute) return;
    
    // Filter schedules based on route and filters
    let filtered = schedules.filter((schedule) => schedule.routeId === currentRoute.id);
    
    // Apply vehicle type filter
    if (filters.vehicleTypes.length > 0) {
      filtered = filtered.filter((schedule) =>
        filters.vehicleTypes.includes(schedule.vehicleType)
      );
    }
    
    // Apply time of day filter
    if (filters.timeOfDay.length > 0) {
      filtered = filtered.filter((schedule) => {
        const hour = parseInt(schedule.departureTime.split(':')[0]);
        
        if (filters.timeOfDay.includes('morning') && hour >= 6 && hour < 12) {
          return true;
        }
        
        if (filters.timeOfDay.includes('afternoon') && hour >= 12 && hour < 18) {
          return true;
        }
        
        if (filters.timeOfDay.includes('evening') && hour >= 18) {
          return true;
        }
        
        return false;
      });
    }
    
    // Apply price filter
    filtered = filtered.filter(
      (schedule) => schedule.price >= filters.minPrice && schedule.price <= filters.maxPrice
    );
    
    setFilteredSchedules(filtered);
  };
  
  const handleSortChange = (sortBy: string) => {
    const sorted = [...filteredSchedules];
    
    switch (sortBy) {
      case 'departureTime':
        sorted.sort((a, b) => {
          const timeA = a.departureTime.split(':').map(Number);
          const timeB = b.departureTime.split(':').map(Number);
          return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
        });
        break;
      case 'price':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'duration':
        // This would require calculating duration, using arrival/departure difference
        // As a simplification, we'll sort by route distance instead
        sorted.sort((a, b) => {
          const routeA = routes.find(r => r.id === a.routeId);
          const routeB = routes.find(r => r.id === b.routeId);
          if (!routeA || !routeB) return 0;
          return parseInt(routeA.distance) - parseInt(routeB.distance);
        });
        break;
      case 'availableSeats':
        sorted.sort((a, b) => b.availableSeats - a.availableSeats);
        break;
      default:
        break;
    }
    
    setFilteredSchedules(sorted);
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDate(newDate);
    
    // Update URL with new date
    queryParams.set('date', newDate);
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-primary mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {fromParam} to {toParam}
          </h1>
          
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-500 mr-2" />
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="border-none focus:ring-0 text-gray-700 font-medium p-0"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <ScheduleFilters
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
          
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <p>Loading schedules...</p>
              </div>
            ) : (
              <ScheduleList schedules={filteredSchedules} date={date} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SchedulesPage;