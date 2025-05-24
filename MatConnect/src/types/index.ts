export interface Route {
  id: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
}

export interface Schedule {
  id: string;
  routeId: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  vehicleId: string;
  availableSeats: number;
  companyName: string;
  vehicleType: 'Matatu' | 'Bus' | 'Shuttle';
}

export interface Vehicle {
  id: string;
  registrationNumber: string;
  companyName: string;
  type: 'Matatu' | 'Bus' | 'Shuttle';
  capacity: number;
  features: string[];
}

export interface Seat {
  id: number;
  number: string;
  status: 'available' | 'selected' | 'booked' | 'unavailable';
  price: number;
}

export interface Booking {
  id: string;
  userId: string;
  scheduleId: string;
  seatIds: number[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'completed' | 'failed';
  bookingDate: string;
  passengers: Passenger[];
}

export interface Passenger {
  name: string;
  phone: string;
  idNumber?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  bookings: string[];
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}