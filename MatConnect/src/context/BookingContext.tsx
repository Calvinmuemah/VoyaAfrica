import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Route, Schedule, Seat, Booking, Passenger } from '../types';

interface BookingContextType {
  selectedRoute: Route | null;
  selectedSchedule: Schedule | null;
  selectedSeats: Seat[];
  passengers: Passenger[];
  totalAmount: number;
  currentStep: number;
  setSelectedRoute: (route: Route | null) => void;
  setSelectedSchedule: (schedule: Schedule | null) => void;
  addSeat: (seat: Seat) => void;
  removeSeat: (seatId: number) => void;
  setPassengers: (passengers: Passenger[]) => void;
  resetBooking: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  const addSeat = (seat: Seat) => {
    // Only add if not already selected
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
  
  // Calculate total amount
  const totalAmount = selectedSeats.reduce((total, seat) => total + seat.price, 0);
  
  const value = {
    selectedRoute,
    selectedSchedule,
    selectedSeats,
    passengers,
    totalAmount,
    currentStep,
    setSelectedRoute,
    setSelectedSchedule,
    addSeat,
    removeSeat,
    setPassengers,
    resetBooking,
    nextStep,
    prevStep,
    setStep
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