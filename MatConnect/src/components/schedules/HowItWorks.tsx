import React from 'react';
import { Search, Calendar, CreditCard, Ticket } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Search for routes',
      description: 'Enter your pickup location, destination, and travel date to find available PSVs.',
      icon: <Search className="h-8 w-8 text-primary" />,
    },
    {
      id: 2,
      title: 'Select a schedule',
      description: 'Choose from available schedules based on time, price, and PSV type.',
      icon: <Calendar className="h-8 w-8 text-primary" />,
    },
    {
      id: 3,
      title: 'Make payment',
      description: 'Pay securely using M-Pesa or other payment methods.',
      icon: <CreditCard className="h-8 w-8 text-primary" />,
    },
    {
      id: 4,
      title: 'Get your e-ticket',
      description: 'Receive your ticket via SMS and email for a hassle-free journey.',
      icon: <Ticket className="h-8 w-8 text-primary" />,
    },
  ];
  
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Book your ticket in just a few simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                {step.icon}
              </div>
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white text-sm font-medium mb-4">
                {step.id}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our customer support team is available 24/7 to assist you with any queries or issues.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:+254712345678" className="btn-primary">
              Call Us
            </a>
            <a href="mailto:support@matatuconnect.co.ke" className="btn bg-gray-200 text-gray-800 hover:bg-gray-300">
              Email Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;