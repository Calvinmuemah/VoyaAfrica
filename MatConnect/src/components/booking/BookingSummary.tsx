import React from 'react';
import { MapPin, Calendar, Clock, Users, Ticket } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

interface BookingSummaryProps {
  showDetailedSummary?: boolean;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ showDetailedSummary = false }) => {
  const { selectedRoute, selectedSchedule, selectedSeats, totalAmount } = useBooking();
  
  if (!selectedRoute || !selectedSchedule) {
    return null;
  }
  
  return (
    <div className="card border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-800">Booking Summary</h3>
      </div>
      
      <div className="p-4 space-y-4">
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
            <p className="font-medium text-gray-900">
              {/* This would typically come from the selected date */}
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Clock className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Departure Time</p>
            <p className="font-medium text-gray-900">{selectedSchedule.departureTime}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Users className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Vehicle</p>
            <p className="font-medium text-gray-900">
              {selectedSchedule.companyName} - {selectedSchedule.vehicleType}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Ticket className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Seats</p>
            <p className="font-medium text-gray-900">
              {selectedSeats.map(seat => seat.number).join(', ')} ({selectedSeats.length} {selectedSeats.length === 1 ? 'seat' : 'seats'})
            </p>
          </div>
        </div>
        
        {showDetailedSummary && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Seat Price × {selectedSeats.length}</span>
              <span className="font-medium">KSh {selectedSchedule.price * selectedSeats.length}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Booking Fee</span>
              <span className="font-medium">KSh 50</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">KSh 0</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-gray-50 rounded-b-lg">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Total Amount</span>
          <span className="text-xl font-bold text-primary">KSh {totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;