import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import BookingSteps from '../components/ui/BookingSteps';
import PaymentMethod from '../components/booking/PaymentMethod';
import BookingSummary from '../components/booking/BookingSummary';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { nextStep, prevStep, totalAmount } = useBooking();
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handlePaymentMethodSelect = (methodId: string) => {
    setPaymentMethod(methodId);
  };
  
  const handleBack = () => {
    prevStep();
    navigate('/booking/passengers');
  };
  
  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      nextStep();
      navigate('/booking/confirmation');
    }, 2000);
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
            Back to Passenger Details
          </button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Payment
          </h1>
          
          <BookingSteps />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card p-6 border border-gray-200">
              <PaymentMethod onPaymentMethodSelect={handlePaymentMethodSelect} />
              
              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between">
                <button
                  onClick={handleBack}
                  className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 flex items-center"
                  disabled={isProcessing}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </button>
                
                <button
                  onClick={handlePayment}
                  className={`btn-primary flex items-center ${
                    isProcessing ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay KSh {totalAmount}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <BookingSummary showDetailedSummary={true} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentPage;