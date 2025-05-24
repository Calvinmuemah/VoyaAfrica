import React, { useState } from 'react';
import { User, Phone, CreditCard } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Passenger } from '../../types';

const PassengerDetails: React.FC = () => {
  const { selectedSeats, setPassengers } = useBooking();
  const [passengersList, setPassengersList] = useState<Passenger[]>(
    selectedSeats.map(() => ({ name: '', phone: '', idNumber: '' }))
  );
  
  const handleInputChange = (index: number, field: keyof Passenger, value: string) => {
    const updatedPassengers = [...passengersList];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    setPassengersList(updatedPassengers);
    setPassengers(updatedPassengers);
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Passenger Information</h3>
      
      {selectedSeats.map((seat, index) => (
        <div 
          key={seat.id} 
          className="card p-4 border border-gray-200"
        >
          <div className="flex items-center mb-4">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <User className="h-4 w-4 text-primary" />
            </div>
            <h4 className="font-medium text-gray-800">
              Passenger {index + 1} - Seat {seat.number}
            </h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor={`name-${index}`} className="label">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  id={`name-${index}`}
                  value={passengersList[index]?.name || ''}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  placeholder="Enter passenger's full name"
                  className="input pl-10"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor={`phone-${index}`} className="label">Phone Number</label>
              <div className="relative">
                <input
                  type="tel"
                  id={`phone-${index}`}
                  value={passengersList[index]?.phone || ''}
                  onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                  placeholder="e.g., 0712345678"
                  className="input pl-10"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor={`idNumber-${index}`} className="label">ID Number (Optional)</label>
              <div className="relative">
                <input
                  type="text"
                  id={`idNumber-${index}`}
                  value={passengersList[index]?.idNumber || ''}
                  onChange={(e) => handleInputChange(index, 'idNumber', e.target.value)}
                  placeholder="Enter ID number"
                  className="input pl-10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PassengerDetails;