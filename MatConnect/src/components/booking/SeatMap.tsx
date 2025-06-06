import React, { useEffect } from 'react';
import { Seat } from '../../types';
import { useBooking } from '../../context/BookingContext';

interface SeatMapProps {
  totalSeats: number;
  availableSeats: number;
  vehicleModel: 'Matatu' | 'Bus' | 'Shuttle';
}

// Helper function to generate seats array dynamically
const generateSeats = (totalSeats: number, availableSeats: number): Seat[] => {
  return Array.from({ length: totalSeats }, (_, i) => ({
    id: (i + 1).toString(),
    number: `S${i + 1}`,
    status: i < availableSeats ? 'available' : 'booked',
  }));
};

const SeatMap: React.FC<SeatMapProps> = ({ totalSeats, availableSeats, vehicleModel }) => {
  const { selectedSeats, addSeat, removeSeat } = useBooking();

  // Generate the seats array dynamically based on totalSeats and availableSeats
  const seats = React.useMemo(() => generateSeats(totalSeats, availableSeats), [totalSeats, availableSeats]);

  useEffect(() => {
    console.log('[SeatMap] vehicleModel:', vehicleModel);
    console.log('[SeatMap] seats:', seats);
    console.log('[SeatMap] selectedSeats:', selectedSeats);
  }, [vehicleModel, seats, selectedSeats]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'available' || selectedSeats.some(s => s.id === seat.id)) {
      if (selectedSeats.some(s => s.id === seat.id)) {
        removeSeat(seat.id);
      } else {
        addSeat(seat);
      }
    }
  };

  const renderBusSeats = () => {
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

  const renderMatatuSeats = () => {
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
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Select Your Seats
      </h3>

      {vehicleModel === 'Bus' && renderBusSeats()}
      {vehicleModel === 'Matatu' && renderMatatuSeats()}
      {vehicleModel === 'Shuttle' && renderShuttleSeats()}

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
  let bgColor =
    'bg-gray-200 border border-gray-300 cursor-pointer hover:bg-gray-300';

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
