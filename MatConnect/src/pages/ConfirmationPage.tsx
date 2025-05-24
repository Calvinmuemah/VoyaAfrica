import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import BookingSteps from '../components/ui/BookingSteps';
import { useBooking } from '../context/BookingContext';
import { CheckCircle, Download, Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

const ConfirmationPage: React.FC = () => {
  const { selectedRoute, selectedSchedule, selectedSeats, totalAmount } = useBooking();
  
  // Generate a random booking reference number
  const bookingReference = `MTC${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Format the booking date
  const bookingDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);
  
  if (!selectedRoute || !selectedSchedule) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <p>No booking information found.</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Booking Confirmation
          </h1>
          
          <BookingSteps />
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-success/10 mb-4">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Successful!</h2>
            <p className="text-gray-600">
              Your booking has been confirmed. You will receive an SMS and email confirmation shortly.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-8">
            <div className="p-6 bg-primary/5 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>
                  <p className="text-sm text-gray-600">Reference: {bookingReference}</p>
                </div>
                <button className="btn bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download Ticket
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Route</p>
                      <p className="font-medium text-gray-900">
                        {selectedRoute.from} to {selectedRoute.to}
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedRoute.distance} • {selectedRoute.duration}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Travel Date</p>
                      <p className="font-medium text-gray-900">{bookingDate}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Departure</p>
                      <p className="font-medium text-gray-900">{selectedSchedule.departureTime}</p>
                      <p className="text-xs text-gray-500">{selectedSchedule.companyName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-gray-400 mr-3 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M6 8h.01M18 8h.01M6 12h.01M18 12h.01M6 16h.01M18 16h.01M10 8h4M10 12h4M10 16h4" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Seats</p>
                      <p className="font-medium text-gray-900">
                        {selectedSeats.map(seat => seat.number).join(', ')} ({selectedSeats.length} {selectedSeats.length === 1 ? 'seat' : 'seats'})
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">Total Amount Paid:</span>
                  <span className="text-lg font-bold text-primary">KSh {totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mx-auto max-w-md">
              <p className="text-green-800 font-medium">
                Remember to arrive at least 30 minutes before departure time.
              </p>
            </div>
            
            <div className="space-x-4">
              <Link to="/bookings" className="btn-primary">
                <div className="flex items-center">
                  View My Bookings
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
              
              <Link to="/" className="btn bg-gray-200 text-gray-800 hover:bg-gray-300">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConfirmationPage;