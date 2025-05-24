import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SeatMap from '../components/booking/SeatMap';
import BookingSummary from '../components/booking/BookingSummary';
import BookingSteps from '../components/ui/BookingSteps';
import { schedules, generateSeats, vehicles } from '../data/mockData';
import { Seat, Vehicle, Schedule } from '../types';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const SeatSelectionPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSchedule, selectedSeats, setSelectedSchedule, nextStep } = useBooking();
  
  const [seats, setSeats] = useState<Seat[]>([]);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  
  const queryParams = new URLSearchParams(location.search);
  const scheduleId = queryParams.get('scheduleId');
  
  useEffect(() => {
    if (scheduleId) {
      const schedule = schedules.find(s => s.id === scheduleId);
      
      if (schedule) {
        setSelectedSchedule(schedule);
        
        // Find the vehicle for this schedule
        const vehicleData = vehicles.find(v => v.id === schedule.vehicleId);
        
        if (vehicleData) {
          setVehicle(vehicleData);
          
          // Generate seats for this vehicle
          const generatedSeats = generateSeats(vehicleData.type, vehicleData.capacity);
          setSeats(generatedSeats);
        }
      }
    }
  }, [scheduleId, setSelectedSchedule]);
  
  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      nextStep();
      navigate('/booking/passengers');
    }
  };
  
  if (!selectedSchedule || !vehicle) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-primary mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Schedules
          </button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Select Your Seats
          </h1>
          
          <BookingSteps />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card p-6 border border-gray-200">
              <SeatMap seats={seats} vehicleType={vehicle.type} />
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-700">Selected Seats: {selectedSeats.length}</p>
                    <p className="text-sm text-gray-500">
                      {selectedSeats.length > 0
                        ? `Seats ${selectedSeats.map(seat => seat.number).join(', ')}`
                        : 'No seats selected'}
                    </p>
                  </div>
                  
                  <button
                    onClick={handleContinue}
                    className="btn-primary flex items-center"
                    disabled={selectedSeats.length === 0}
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <BookingSummary />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SeatSelectionPage;