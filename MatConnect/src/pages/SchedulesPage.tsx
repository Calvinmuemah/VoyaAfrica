import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ScheduleList from '../components/schedules/ScheduleList';
import ScheduleFilters from '../components/schedules/ScheduleFilters';
import { ScheduleWithVehicleAndRoute } from '../types';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft, Calendar } from 'lucide-react';
import axios from 'axios';
import { format } from 'date-fns';

const SchedulesPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setSelectedRoute } = useBooking();

  const queryParams = new URLSearchParams(location.search);
  const defaultRouteId = '6837cf7b09662f21e217d98c';
  const defaultDate = '2025-05-31';

  const routeIdParam = queryParams.get('route') || defaultRouteId;
  const dateParam = queryParams.get('date') || defaultDate;

  const [filteredSchedules, setFilteredSchedules] = useState<ScheduleWithVehicleAndRoute[]>([]);
  const [allSchedules, setAllSchedules] = useState<ScheduleWithVehicleAndRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<string>(dateParam);

  useEffect(() => {
    const fetchSchedules = async () => {
      if (!routeIdParam || !date) return;

      setLoading(true);
      try {
        const formattedDate = format(new Date(date), 'yyyy-MM-dd');
        const response = await axios.get('http://localhost:4000/api/getSchedulesByRoute', {
          params: { routeId: routeIdParam, date: formattedDate },
        });

        const schedules: ScheduleWithVehicleAndRoute[] = response.data.map((s: any) => ({
          schedule: {
            ...s.schedule,
            id: s.schedule._id,
          },
          vehicle: {
            ...s.vehicle,
            id: s.vehicle._id,
          },
          route: {
            ...s.route,
            id: s.route._id,
          },
        }));

        setAllSchedules(schedules);
        setFilteredSchedules(schedules);
      } catch (error) {
        console.error('Error fetching schedules:', error);
        setAllSchedules([]);
        setFilteredSchedules([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [routeIdParam, date, setSelectedRoute]);

  const handleFilterChange = (filters: {
    vehicleTypes: string[];
    timeOfDay: string[];
    minPrice: number;
    maxPrice: number;
  }) => {
    let filtered = [...allSchedules];

    if (filters.vehicleTypes.length > 0) {
      filtered = filtered.filter((item) =>
        filters.vehicleTypes.includes(item.vehicle.model)
      );
    }

    if (filters.timeOfDay.length > 0) {
      filtered = filtered.filter((item) => {
        const hour = new Date(item.schedule.departureTime).getHours();
        return (
          (filters.timeOfDay.includes('morning') && hour >= 6 && hour < 12) ||
          (filters.timeOfDay.includes('afternoon') && hour >= 12 && hour < 18) ||
          (filters.timeOfDay.includes('evening') && hour >= 18)
        );
      });
    }

    filtered = filtered.filter(
      (item) =>
        item.schedule.price >= filters.minPrice &&
        item.schedule.price <= filters.maxPrice
    );

    setFilteredSchedules(filtered);
  };

  const handleSortChange = (sortBy: string) => {
    const sorted = [...filteredSchedules];

    switch (sortBy) {
      case 'departureTime':
        sorted.sort(
          (a, b) =>
            new Date(a.schedule.departureTime).getTime() -
            new Date(b.schedule.departureTime).getTime()
        );
        break;
      case 'priceLowToHigh':
        sorted.sort((a, b) => a.schedule.price - b.schedule.price);
        break;
      case 'priceHighToLow':
        sorted.sort((a, b) => b.schedule.price - a.schedule.price);
        break;
      default:
        break;
    }

    setFilteredSchedules(sorted);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center text-primary hover:underline"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Back
        </button>

        <h1 className="text-3xl font-semibold mb-6">Available Schedules</h1>

        <div className="mb-6 flex items-center space-x-4">
          <label htmlFor="schedule-date" className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span>Date:</span>
          </label>
          <input
            type="date"
            id="schedule-date"
            value={date}
            onChange={handleDateChange}
            className="border rounded px-3 py-1"
          />
        </div>

        <ScheduleFilters
          schedules={allSchedules}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />

        {loading ? (
          <div className="text-center py-12">Loading schedules...</div>
        ) : (
          <ScheduleList schedules={filteredSchedules} date={date} />
        )}
      </div>
    </Layout>
  );
};

export default SchedulesPage;
