import React from 'react';
import { Seat } from '../../types';
import { useBooking } from '../../context/BookingContext';

interface SeatMapProps {
  seats: Seat[];
  vehicleType: 'Matatu' | 'Bus' | 'Shuttle';
}

const SeatMap: React.FC<SeatMapProps> = ({ seats, vehicleType }) => {
  const { selectedSeats, addSeat, removeSeat } = useBooking();
  
  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'available') {
      if (selectedSeats.some(s => s.id === seat.id)) {
        removeSeat(seat.id);
      } else {
        addSeat(seat);
      }
    }
  };
  
  const renderBusSeats = () => {
    // Create a grid layout for bus
    const rows = Math.ceil(seats.length / 4);
    const seatGrid = [];
    
    for (let i = 0; i < rows; i++) {
      const rowSeats = seats.slice(i * 4, (i + 1) * 4);
      
      seatGrid.push(
        <div key={`row-${i}`} className="flex justify-center mb-4">
          {rowSeats.map((seat, index) => (
            <React.Fragment key={seat.id}>
              <SeatButton
                seat={seat}
                onClick={() => handleSeatClick(seat)}
                isSelected={selectedSeats.some(s => s.id === seat.id)}
              />
              {index === 1 && <div className="w-8" />} {/* Aisle */}
            </React.Fragment>
          ))}
        </div>
      );
    }
    
    return (
      <div className="max-w-md mx-auto mb-6">
        <div className="bg-gray-100 p-3 rounded-t-lg text-center font-medium text-gray-700 mb-4">
          Front
        </div>
        {seatGrid}
        <div className="bg-gray-100 p-3 rounded-b-lg text-center font-medium text-gray-700 mt-2">
          Back
        </div>
      </div>
    );
  };
  
  const renderMatutuSeats = () => {
    // Create a layout for matatu (typically 2-1 or 2-2 arrangement)
    const rows = Math.ceil(seats.length / 3);
    const seatGrid = [];
    
    for (let i = 0; i < rows; i++) {
      const rowSeats = seats.slice(i * 3, (i + 1) * 3);
      
      seatGrid.push(
        <div key={`row-${i}`} className="flex justify-center mb-4">
          {rowSeats.map((seat, index) => (
            <React.Fragment key={seat.id}>
              <SeatButton
                seat={seat}
                onClick={() => handleSeatClick(seat)}
                isSelected={selectedSeats.some(s => s.id === seat.id)}
              />
              {index === 1 && <div className="w-8" />} {/* Aisle */}
            </React.Fragment>
          ))}
        </div>
      );
    }
    
    return (
      <div className="max-w-sm mx-auto mb-6">
        <div className="bg-gray-100 p-3 rounded-t-lg text-center font-medium text-gray-700 mb-4">
          Front
        </div>
        {seatGrid}
        <div className="bg-gray-100 p-3 rounded-b-lg text-center font-medium text-gray-700 mt-2">
          Back
        </div>
      </div>
    );
  };
  
  const renderShuttleSeats = () => {
    // Create a layout for shuttle (typically 2-1 arrangement)
    const rows = Math.ceil(seats.length / 3);
    const seatGrid = [];
    
    for (let i = 0; i < rows; i++) {
      const rowSeats = seats.slice(i * 3, (i + 1) * 3);
      
      seatGrid.push(
        <div key={`row-${i}`} className="flex justify-center mb-4">
          {rowSeats.map((seat, index) => (
            <React.Fragment key={seat.id}>
              <SeatButton
                seat={seat}
                onClick={() => handleSeatClick(seat)}
                isSelected={selectedSeats.some(s => s.id === seat.id)}
              />
              {index === 1 && <div className="w-8" />} {/* Aisle */}
            </React.Fragment>
          ))}
        </div>
      );
    }
    
    return (
      <div className="max-w-sm mx-auto mb-6">
        <div className="bg-gray-100 p-3 rounded-t-lg text-center font-medium text-gray-700 mb-4">
          Front
        </div>
        {seatGrid}
        <div className="bg-gray-100 p-3 rounded-b-lg text-center font-medium text-gray-700 mt-2">
          Back
        </div>
      </div>
    );
  };
  
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Select Your Seats</h3>
      
      {vehicleType === 'Bus' && renderBusSeats()}
      {vehicleType === 'Matatu' && renderMatutuSeats()}
      {vehicleType === 'Shuttle' && renderShuttleSeats()}
      
      <div className="flex justify-center space-x-6 mb-6">
        <div className="flex items-center">
          <div className="h-6 w-6 rounded bg-gray-200 border border-gray-300 mr-2"></div>
          <span className="text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center">
          <div className="h-6 w-6 rounded bg-primary text-white flex items-center justify-center mr-2"></div>
          <span className="text-sm text-gray-600">Selected</span>
        </div>
        <div className="flex items-center">
          <div className="h-6 w-6 rounded bg-gray-400 text-white flex items-center justify-center mr-2"></div>
          <span className="text-sm text-gray-600">Booked</span>
        </div>
      </div>
    </div>
  );
};

interface SeatButtonProps {
  seat: Seat;
  onClick: () => void;
  isSelected: boolean;
}

const SeatButton: React.FC<SeatButtonProps> = ({ seat, onClick, isSelected }) => {
  let bgColor = 'bg-gray-200 border border-gray-300 cursor-pointer hover:bg-gray-300';
  
  if (seat.status === 'booked' || seat.status === 'unavailable') {
    bgColor = 'bg-gray-400 text-white cursor-not-allowed';
  } else if (isSelected) {
    bgColor = 'bg-primary text-white';
  }
  
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={seat.status === 'booked' || seat.status === 'unavailable'}
      className={`h-10 w-10 rounded flex items-center justify-center font-medium m-1 transition-colors duration-200 ${bgColor}`}
    >
      {seat.number}
    </button>
  );
};

export default SeatMap;