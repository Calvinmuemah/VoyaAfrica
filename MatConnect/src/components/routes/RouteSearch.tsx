import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, ArrowRight } from 'lucide-react';
import { routes } from '../../data/mockData';

const RouteSearch: React.FC = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  const uniqueLocations = Array.from(
    new Set([
      ...routes.map(route => route.from),
      ...routes.map(route => route.to)
    ])
  ).sort();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (from && to) {
      // In a real app, we would encode these parameters properly
      navigate(`/schedules?from=${from}&to=${to}&date=${date}`);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <label htmlFor="from" className="label">From</label>
        <div className="relative">
          <select
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="select pl-10"
            required
          >
            <option value="">Select pickup location</option>
            {uniqueLocations.map(location => (
              <option key={`from-${location}`} value={location}>
                {location}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="relative">
        <label htmlFor="to" className="label">To</label>
        <div className="relative">
          <select
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="select pl-10"
            required
          >
            <option value="">Select destination</option>
            {uniqueLocations.map(location => (
              <option key={`to-${location}`} value={location}>
                {location}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="relative">
        <label htmlFor="date" className="label">Date of Travel</label>
        <div className="relative">
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input pl-10"
            min={new Date().toISOString().split('T')[0]}
            required
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      <button type="submit" className="btn-primary w-full flex items-center justify-center">
        Search Trips
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </form>
  );
};

export default RouteSearch;