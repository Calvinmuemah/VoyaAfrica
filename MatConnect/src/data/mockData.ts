import { Route, Schedule, Vehicle, Seat, PaymentMethod } from '../types';
import { format, addHours, addMinutes } from 'date-fns';

// Generate today's date and a range of times
const today = new Date();
const formatTime = (date: Date) => format(date, 'h:mm a');
const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');

// Routes
export const routes: Route[] = [
  {
    id: '1',
    from: 'Nairobi',
    to: 'Mombasa',
    distance: '485 km',
    duration: '7-8 hours',
  },
  {
    id: '2',
    from: 'Nairobi',
    to: 'Kisumu',
    distance: '340 km',
    duration: '5-6 hours',
  },
  {
    id: '3',
    from: 'Nairobi',
    to: 'Nakuru',
    distance: '160 km',
    duration: '2-3 hours',
  },
  {
    id: '4',
    from: 'Mombasa',
    to: 'Malindi',
    distance: '120 km',
    duration: '2 hours',
  },
  {
    id: '5',
    from: 'Nairobi',
    to: 'Eldoret',
    distance: '310 km',
    duration: '4-5 hours',
  },
];

// Vehicles
export const vehicles: Vehicle[] = [
  {
    id: 'v1',
    registrationNumber: 'KAA 001A',
    companyName: 'Modern Coast',
    type: 'Bus',
    capacity: 45,
    features: ['Air Conditioning', 'WiFi', 'USB Charging', 'Reclining Seats'],
  },
  {
    id: 'v2',
    registrationNumber: 'KBB 002B',
    companyName: 'Easy Coach',
    type: 'Bus',
    capacity: 49,
    features: ['Air Conditioning', 'Reclining Seats', 'Onboard Entertainment'],
  },
  {
    id: 'v3',
    registrationNumber: 'KCC 003C',
    companyName: 'Super Metro',
    type: 'Matatu',
    capacity: 14,
    features: ['USB Charging', 'Music'],
  },
  {
    id: 'v4',
    registrationNumber: 'KDD 004D',
    companyName: 'Express Travel',
    type: 'Shuttle',
    capacity: 11,
    features: ['Air Conditioning', 'WiFi', 'USB Charging'],
  },
];

// Schedules
let morningTime = new Date(today);
morningTime.setHours(6, 0, 0, 0);

export const schedules: Schedule[] = [
  // Nairobi to Mombasa schedules
  {
    id: 's1',
    routeId: '1',
    departureTime: formatTime(morningTime),
    arrivalTime: formatTime(addHours(morningTime, 8)),
    price: 1500,
    vehicleId: 'v1',
    availableSeats: 30,
    companyName: 'Modern Coast',
    vehicleType: 'Bus',
  },
  {
    id: 's2',
    routeId: '1',
    departureTime: formatTime(addHours(morningTime, 2)),
    arrivalTime: formatTime(addHours(addHours(morningTime, 2), 8)),
    price: 1300,
    vehicleId: 'v2',
    availableSeats: 25,
    companyName: 'Easy Coach',
    vehicleType: 'Bus',
  },
  
  // Nairobi to Kisumu schedules
  {
    id: 's3',
    routeId: '2',
    departureTime: formatTime(addHours(morningTime, 1)),
    arrivalTime: formatTime(addHours(addHours(morningTime, 1), 6)),
    price: 1200,
    vehicleId: 'v1',
    availableSeats: 20,
    companyName: 'Modern Coast',
    vehicleType: 'Bus',
  },
  
  // Nairobi to Nakuru schedules
  {
    id: 's4',
    routeId: '3',
    departureTime: formatTime(addHours(morningTime, 0.5)),
    arrivalTime: formatTime(addHours(addHours(morningTime, 0.5), 2.5)),
    price: 600,
    vehicleId: 'v3',
    availableSeats: 10,
    companyName: 'Super Metro',
    vehicleType: 'Matatu',
  },
  {
    id: 's5',
    routeId: '3',
    departureTime: formatTime(addHours(morningTime, 1.5)),
    arrivalTime: formatTime(addHours(addHours(morningTime, 1.5), 2.5)),
    price: 800,
    vehicleId: 'v4',
    availableSeats: 8,
    companyName: 'Express Travel',
    vehicleType: 'Shuttle',
  },
  
  // More schedules with different times
  {
    id: 's6',
    routeId: '1',
    departureTime: formatTime(addHours(morningTime, 4)),
    arrivalTime: formatTime(addHours(addHours(morningTime, 4), 8)),
    price: 1400,
    vehicleId: 'v1',
    availableSeats: 40,
    companyName: 'Modern Coast',
    vehicleType: 'Bus',
  },
  {
    id: 's7',
    routeId: '2',
    departureTime: formatTime(addHours(morningTime, 3)),
    arrivalTime: formatTime(addHours(addHours(morningTime, 3), 6)),
    price: 1100,
    vehicleId: 'v2',
    availableSeats: 30,
    companyName: 'Easy Coach',
    vehicleType: 'Bus',
  },
];

// Generate seats for a vehicle
export const generateSeats = (vehicleType: 'Matatu' | 'Bus' | 'Shuttle', capacity: number): Seat[] => {
  const seats: Seat[] = [];
  
  for (let i = 1; i <= capacity; i++) {
    // Generate some random booked seats
    const status = Math.random() > 0.7 ? 'booked' : 'available';
    
    seats.push({
      id: i,
      number: i.toString(),
      status,
      price: vehicleType === 'Bus' ? 1500 : vehicleType === 'Shuttle' ? 800 : 600,
    });
  }
  
  return seats;
};

// Payment methods
export const paymentMethods: PaymentMethod[] = [
  {
    id: 'mpesa',
    name: 'M-Pesa',
    icon: 'phone',
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: 'credit-card',
  },
];

// Featured routes
export const featuredRoutes = [
  {
    id: '1',
    from: 'Nairobi',
    to: 'Mombasa',
    image: 'https://images.pexels.com/photos/10290258/pexels-photo-10290258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 'From KSh 1,300',
  },
  {
    id: '2',
    from: 'Nairobi',
    to: 'Kisumu',
    image: 'https://images.pexels.com/photos/6283255/pexels-photo-6283255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 'From KSh 1,100',
  },
  {
    id: '3',
    from: 'Nairobi',
    to: 'Nakuru',
    image: 'https://images.pexels.com/photos/7020135/pexels-photo-7020135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 'From KSh 600',
  },
];

// Popular companies
export const popularCompanies = [
  {
    id: '1',
    name: 'Modern Coast',
    logo: 'https://images.pexels.com/photos/1426620/pexels-photo-1426620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Easy Coach',
    logo: 'https://images.pexels.com/photos/3787149/pexels-photo-3787149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.3,
  },
  {
    id: '3',
    name: 'Super Metro',
    logo: 'https://images.pexels.com/photos/7439154/pexels-photo-7439154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.1,
  },
];