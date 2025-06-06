import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import SeatMap from '../components/booking/SeatMap';
import BookingSummary from '../components/booking/BookingSummary';
import BookingSteps from '../components/ui/BookingSteps';
import { Seat, Vehicle, Schedule } from '../types';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const SeatSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const scheduleId = searchParams.get('scheduleId');

  const {
    selectedSchedule,
    setSelectedSchedule,
    selectedSeats,
    setSelectedSeats,
    nextStep,
  } = useBooking();

  const [seats, setSeats] = useState<Seat[]>([]);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        if (!scheduleId) {
          setError('Missing schedule ID');
          return;
        }

        setLoading(true);

        // Fetch schedule details
        const scheduleRes = await axios.get(`/api/schedules/${scheduleId}`);
        const scheduleData: Schedule = scheduleRes.data;
        setSelectedSchedule(scheduleData);

        // Fetch vehicle info
        const vehicleRes = await axios.get(`/api/vehicles/${scheduleData.vehicleId}`);
        const vehicleData: Vehicle = vehicleRes.data;
        setVehicle(vehicleData);

        // Fetch seats
        const seatRes = await axios.get(`/api/schedules/${scheduleId}/seats`);
        const seatsData: Seat[] = seatRes.data;
        setSeats(seatsData);
      } catch (err: any) {
        console.error(err);
        setError('Failed to load schedule or seat data.');
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleData();
  }, [scheduleId, setSelectedSchedule]);

  const handleContinue = async () => {
    if (selectedSeats.length > 0 && scheduleId) {
      try {
        await axios.post(`/api/schedules/${scheduleId}/book`, {
          selectedSeats: selectedSeats.map((s) => s.number),
        });
        nextStep();
        navigate('/booking/passengers');
      } catch (err: any) {
        alert('Failed to book seats. Try again.');
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (error || !selectedSchedule || !vehicle) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <p>{error || 'Schedule or vehicle data not found.'}</p>
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
              <SeatMap
                seats={seats}
                vehicleModel={vehicle.model}
                onSeatSelect={(selected: Seat[]) => setSelectedSeats(selected)}
                selectedSeats={selectedSeats}
              />

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-700">
                      Selected Seats: {selectedSeats.length}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedSeats.length > 0
                        ? `Seats ${selectedSeats.map((seat) => seat.number).join(', ')}`
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
