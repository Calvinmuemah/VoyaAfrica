import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import BookingSteps from '../components/ui/BookingSteps';
import PassengerDetails from '../components/booking/PassengerDetails';
import BookingSummary from '../components/booking/BookingSummary';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PassengerDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { nextStep, prevStep, passengers } = useBooking();
  
  const handleContinue = () => {
    // Check if all passenger details are filled
    const allPassengersFilled = passengers.every(
      passenger => passenger.name && passenger.phone
    );
    
    if (allPassengersFilled) {
      nextStep();
      navigate('/booking/payment');
    } else {
      alert('Please fill in all passenger details.');
    }
  };
  
  const handleBack = () => {
    prevStep();
    navigate('/booking/seats');
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-primary mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Seat Selection
          </button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Passenger Details
          </h1>
          
          <BookingSteps />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card p-6 border border-gray-200">
              <PassengerDetails />
              
              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between">
                <button
                  onClick={handleBack}
                  className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </button>
                
                <button
                  onClick={handleContinue}
                  className="btn-primary flex items-center"
                >
                  Continue to Payment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <BookingSummary />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PassengerDetailsPage;