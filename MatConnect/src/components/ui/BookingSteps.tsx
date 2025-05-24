import React from 'react';
import { Check } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

const BookingSteps: React.FC = () => {
  const { currentStep, setStep } = useBooking();
  
  const steps = [
    { id: 1, name: 'Select Seats' },
    { id: 2, name: 'Passenger Details' },
    { id: 3, name: 'Payment' },
    { id: 4, name: 'Confirmation' },
  ];
  
  const handleStepClick = (stepId: number) => {
    // Only allow going to previous steps
    if (stepId < currentStep) {
      setStep(stepId);
    }
  };
  
  return (
    <div className="py-4">
      <div className="flex items-center justify-between w-full">
        {steps.map((step) => (
          <React.Fragment key={step.id}>
            <div 
              className={`flex flex-col items-center ${
                step.id < currentStep ? 'cursor-pointer' : ''
              }`} 
              onClick={() => handleStepClick(step.id)}
            >
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  step.id < currentStep
                    ? 'bg-primary text-white'
                    : step.id === currentStep
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.id < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <div className="text-xs mt-2 font-medium text-center text-gray-500">
                {step.name}
              </div>
            </div>
            
            {step.id < steps.length && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  step.id < currentStep ? 'bg-primary' : 'bg-gray-200'
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BookingSteps;