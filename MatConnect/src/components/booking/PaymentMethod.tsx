import React, { useState } from 'react';
import { CreditCard, Phone, Check } from 'lucide-react';
import { paymentMethods } from '../../data/mockData';

interface PaymentMethodProps {
  onPaymentMethodSelect: (methodId: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ onPaymentMethodSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState('mpesa');
  
  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    onPaymentMethodSelect(methodId);
  };
  
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
      
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`card p-4 border transition-all duration-200 cursor-pointer ${
              selectedMethod === method.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-primary/50'
            }`}
            onClick={() => handleMethodSelect(method.id)}
          >
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                {method.icon === 'credit-card' && <CreditCard className="h-5 w-5 text-primary" />}
                {method.icon === 'phone' && <Phone className="h-5 w-5 text-primary" />}
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{method.name}</h4>
                <p className="text-sm text-gray-500">
                  {method.id === 'mpesa' && 'Pay directly with your M-Pesa account'}
                  {method.id === 'card' && 'Pay with Visa, Mastercard, or American Express'}
                </p>
              </div>
              
              {selectedMethod === method.id && (
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {selectedMethod === 'mpesa' && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">M-Pesa Payment Instructions</h4>
          <p className="text-sm text-green-700 mb-4">
            You will receive an M-Pesa push notification to complete the payment. Please ensure your phone is on and has sufficient balance.
          </p>
          <div className="bg-white p-3 rounded border border-green-200">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Business Name:</span>
              <span className="text-sm font-medium">MatatuConnect</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Till Number:</span>
              <span className="text-sm font-medium">123456</span>
            </div>
          </div>
        </div>
      )}
      
      {selectedMethod === 'card' && (
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="cardNumber" className="label">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              className="input"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiry" className="label">Expiry Date</label>
              <input
                type="text"
                id="expiry"
                placeholder="MM/YY"
                className="input"
              />
            </div>
            <div>
              <label htmlFor="cvv" className="label">CVV</label>
              <input
                type="text"
                id="cvv"
                placeholder="123"
                className="input"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="cardName" className="label">Name on Card</label>
            <input
              type="text"
              id="cardName"
              placeholder="John Doe"
              className="input"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;