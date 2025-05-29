import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

import HomePage from './pages/HomePage';
import SchedulesPage from './pages/SchedulesPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import PassengerDetailsPage from './pages/PassengerDetailsPage';
import PaymentPage from './pages/PaymentPage';
import ConfirmationPage from './pages/ConfirmationPage';
import BookingsPage from './pages/BookingsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
// get/fetches
import GetRoutes from './pages/routes/getRoutes';
function App() {
  return (
    <Router>
      <AuthProvider>
        <BookingProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/schedules" element={<SchedulesPage />} />
            <Route path="/booking/seats" element={<SeatSelectionPage />} />
            <Route path="/booking/passengers" element={<PassengerDetailsPage />} />
            <Route path="/booking/payment" element={<PaymentPage />} />
            <Route path="/booking/confirmation" element={<ConfirmationPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* gets/Fetches */}
            <Route path="/routes" element={<GetRoutes />} />
          </Routes>
        </BookingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;