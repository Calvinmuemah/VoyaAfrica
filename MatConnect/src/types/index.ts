// types/index.ts

export interface Route {
  id: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
}
// types.ts

export interface Vehicle {
  id: string;
  model: string;
  vehicleNumber: string;
  numberOfSeats: number;
  // Add more fields if needed
}

export interface Schedule {
  id: string;
  routeId: string;
  vehicleId: Vehicle; // ✅ vehicleId is now a Vehicle object
  driverId: string;
  departureTime: string;
  arrivalTime: string;
  availableSeats: number;
  price: number;
  // Add other fields if needed
}


// export interface Schedule {
//   id: string;
//   routeId: string;
//   departureTime: string;
//   arrivalTime: string;
//   price: number;
//   vehicleId: string;
//   availableSeats: number;
// }

// export interface Vehicle {
//   id: string;
//   registrationNumber: string;
//   companyName: string;
//   model: 'Matatu' | 'Bus' | 'Shuttle';
//   capacity: number;
//   features: string[];
// }

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

// Composite type for frontend usage
export interface ScheduleWithVehicleAndRoute {
  schedule: Schedule;
  vehicle: Vehicle;
  route: Route;
}
