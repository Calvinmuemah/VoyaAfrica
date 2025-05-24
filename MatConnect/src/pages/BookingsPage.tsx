import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import BookingCard from '../components/bookings/BookingCard';
import { Booking } from '../types';

const BookingsPage: React.FC = () => {
  // Mock bookings data
  const [bookings] = useState<Booking[]>([
    {
      id: '123456789',
      userId: '1',
      scheduleId: 's1',
      seatIds: [1, 2],
      totalAmount: 3000,
      status: 'confirmed',
      paymentStatus: 'completed',
      bookingDate: new Date().toISOString(),
      passengers: [
        {
          name: 'John Doe',
          phone: '0712345678',
          idNumber: '12345678',
        },
        {
          name: 'Jane Doe',
          phone: '0723456789',
          idNumber: '23456789',
        },
      ],
    },
    {
      id: '987654321',
      userId: '1',
      scheduleId: 's3',
      seatIds: [5],
      totalAmount: 1200,
      status: 'pending',
      paymentStatus: 'pending',
      bookingDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      passengers: [
        {
          name: 'John Doe',
          phone: '0712345678',
          idNumber: '12345678',
        },
      ],
    },
    {
      id: '456789123',
      userId: '1',
      scheduleId: 's2',
      seatIds: [10, 11, 12],
      totalAmount: 3900,
      status: 'completed',
      paymentStatus: 'completed',
      bookingDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
      passengers: [
        {
          name: 'John Doe',
          phone: '0712345678',
          idNumber: '12345678',
        },
        {
          name: 'Jane Doe',
          phone: '0723456789',
          idNumber: '23456789',
        },
        {
          name: 'James Doe',
          phone: '0734567890',
          idNumber: '34567890',
        },
      ],
    },
  ]);
  
  const [filter, setFilter] = useState<string>('all');
  
  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });
  
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          My Bookings
        </h1>
        
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setFilter('all')}
              className={`py-4 px-1 font-medium text-sm border-b-2 ${
                filter === 'all'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('confirmed')}
              className={`py-4 px-1 font-medium text-sm border-b-2 ${
                filter === 'confirmed'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`py-4 px-1 font-medium text-sm border-b-2 ${
                filter === 'pending'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`py-4 px-1 font-medium text-sm border-b-2 ${
                filter === 'completed'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Past
            </button>
            <button
              onClick={() => setFilter('cancelled')}
              className={`py-4 px-1 font-medium text-sm border-b-2 ${
                filter === 'cancelled'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Cancelled
            </button>
          </nav>
        </div>
        
        <div className="space-y-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-6">
                You don't have any {filter !== 'all' ? filter : ''} bookings yet.
              </p>
              <a href="/routes" className="btn-primary">
                Book a Trip
              </a>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BookingsPage;