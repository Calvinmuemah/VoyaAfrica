import api from './api';

export interface Booking {
  id: string;
  passengerName: string;
  routeName: string;
  seatNumber: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  amountPaid: number;
  createdAt: string;
  updatedAt: string;
}

export interface BookingFormData {
  passengerName: string;
  routeId: string;
  seatNumber: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  amountPaid: number;
}

export interface BookingQueryParams {
  limit?: number;
  status?: string;
}

const bookingService = {
  getBookings: async (params?: BookingQueryParams): Promise<Booking[]> => {
    const response = await api.get('/bookings', { params });
    return response.data;
  },

  getBooking: async (id: string): Promise<Booking> => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  createBooking: async (bookingData: BookingFormData): Promise<Booking> => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  updateBooking: async (id: string, bookingData: BookingFormData): Promise<Booking> => {
    const response = await api.put(`/bookings/${id}`, bookingData);
    return response.data;
  },

  deleteBooking: async (id: string): Promise<void> => {
    await api.delete(`/bookings/${id}`);
  }
};

export default bookingService;
