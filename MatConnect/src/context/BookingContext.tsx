import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Route, Schedule, Seat, Passenger } from '../types';

// Step 1: Add setSelectedSeats to the context type
interface BookingContextType {
  selectedRoute: Route | null;
  selectedSchedule: Schedule | null;
  selectedSeats: Seat[];
  passengers: Passenger[];
  totalAmount: number;
  currentStep: number;
  setSelectedRoute: (route: Route | null) => void;
  setSelectedSchedule: (schedule: Schedule | null) => void;
  setSelectedSeats: (seats: Seat[]) => void;
  addSeat: (seat: Seat) => void;
  removeSeat: (seatId: number) => void;
  setPassengers: (passengers: Passenger[]) => void;
  resetBooking: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  createBooking: (userId: string) => Promise<any>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const addSeat = (seat: Seat) => {
    if (!selectedSeats.some(s => s.id === seat.id)) {
      setSelectedSeats([...selectedSeats, { ...seat, status: 'selected' }]);
    }
  };

  const removeSeat = (seatId: number) => {
    setSelectedSeats(selectedSeats.filter(seat => seat.id !== seatId));
  };

  const resetBooking = () => {
    setSelectedRoute(null);
    setSelectedSchedule(null);
    setSelectedSeats([]);
    setPassengers([]);
    setCurrentStep(1);
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const setStep = (step: number) => {
    setCurrentStep(step);
  };

  const totalAmount = selectedSeats.reduce((total, seat) => total + seat.price, 0);

  const createBooking = async (userId: string) => {
    if (!selectedRoute || !selectedSchedule) {
      throw new Error('Route and Schedule must be selected');
    }

    const bookingData = {
      userId,
      routeId: selectedRoute.id,
      scheduleId: selectedSchedule.id,
      seats: selectedSeats.map(seat => seat.id),
      passengers,
      amountPaid: totalAmount,
    };

    try {
      const response = await fetch('http://localhost:4500/api/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Booking failed');
      }

      const data = await response.json();
      resetBooking(); // Reset state after successful booking
      return data;
    } catch (error) {
      console.error('Booking error:', error);
      throw error;
    }
  };

  // Step 2: Include setSelectedSeats in the value passed to the context
  const value: BookingContextType = {
    selectedRoute,
    selectedSchedule,
    selectedSeats,
    passengers,
    totalAmount,
    currentStep,
    setSelectedRoute,
    setSelectedSchedule,
    setSelectedSeats,
    addSeat,
    removeSeat,
    setPassengers,
    resetBooking,
    nextStep,
    prevStep,
    setStep,
    createBooking,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
