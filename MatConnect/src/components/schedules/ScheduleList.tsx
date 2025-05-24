import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Bus, Users, ChevronRight } from 'lucide-react';
import { Schedule } from '../../types';
import { useBooking } from '../../context/BookingContext';

interface ScheduleListProps {
  schedules: Schedule[];
  date: string;
}

const ScheduleList: React.FC<ScheduleListProps> = ({ schedules, date }) => {
  const navigate = useNavigate();
  const { setSelectedSchedule } = useBooking();
  
  const handleScheduleSelect = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    navigate(`/booking/seats?scheduleId=${schedule.id}`);
  };
  
  if (schedules.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <Bus className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No schedules found</h3>
        <p className="text-gray-600">
          We couldn't find any schedules for this route on the selected date.
          <br />
          Please try a different date or route.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {schedules.map((schedule) => (
        <div
          key={schedule.id}
          className="card p-4 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 mr-3">
                  <Bus className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{schedule.companyName}</h3>
                  <p className="text-sm text-gray-500">{schedule.vehicleType}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Departure</p>
                    <p className="font-medium text-gray-900">{schedule.departureTime}</p>
                    <p className="text-sm text-gray-500">{date}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Arrival</p>
                    <p className="font-medium text-gray-900">{schedule.arrivalTime}</p>
                    <p className="text-sm text-gray-500">{date}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Available Seats</p>
                    <p className="font-medium text-gray-900">{schedule.availableSeats}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-center">
              <p className="text-2xl font-bold text-primary mb-2">
                KSh {schedule.price}
              </p>
              <button
                onClick={() => handleScheduleSelect(schedule)}
                className="btn-primary w-full flex items-center justify-center"
                disabled={schedule.availableSeats === 0}
              >
                {schedule.availableSeats === 0 ? 'Sold Out' : 'Select Seats'}
                <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleList;