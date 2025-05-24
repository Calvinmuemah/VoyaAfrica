import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Ticket, Download, ExternalLink } from 'lucide-react';
import { Booking } from '../../types';

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  // This would typically be populated with data from the API
  const route = { from: 'Nairobi', to: 'Mombasa' };
  const schedule = { departureTime: '8:00 AM', vehicleType: 'Bus', companyName: 'Modern Coast' };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success/10 text-success';
      case 'pending':
        return 'bg-warning/10 text-warning';
      case 'cancelled':
        return 'bg-error/10 text-error';
      case 'completed':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
  
  return (
    <div className="card border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">Booking #{booking.id.substring(0, 8)}</h3>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="flex items-start">
          <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Route</p>
            <p className="font-medium text-gray-900">
              {route.from} to {route.to}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Travel Date</p>
            <p className="font-medium text-gray-900">
              {new Date(booking.bookingDate).toLocaleDateString('en-US', {
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
            <p className="text-sm text-gray-500">Departure</p>
            <p className="font-medium text-gray-900">{schedule.departureTime}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Ticket className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Vehicle & Seats</p>
            <p className="font-medium text-gray-900">
              {schedule.companyName} {schedule.vehicleType} • {booking.seatIds.length} {booking.seatIds.length === 1 ? 'seat' : 'seats'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="font-bold text-primary">KSh {booking.totalAmount}</p>
        </div>
        
        <div className="flex space-x-2">
          <Link
            to={`/bookings/${booking.id}`}
            className="btn bg-white border border-gray-300 text-gray-700 py-1 px-3 hover:bg-gray-50"
          >
            <div className="flex items-center">
              <ExternalLink className="h-4 w-4 mr-1" />
              <span>View</span>
            </div>
          </Link>
          
          {booking.status === 'confirmed' && (
            <button
              className="btn bg-primary text-white py-1 px-3"
            >
              <div className="flex items-center">
                <Download className="h-4 w-4 mr-1" />
                <span>Ticket</span>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;