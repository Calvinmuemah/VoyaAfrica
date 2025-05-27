import React, { useState } from 'react';

const AddBooking: React.FC = () => {
  const [passengerName, setPassengerName] = useState('');
  const [routeId, setRouteId] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [status, setStatus] = useState('pending');
  const [amountPaid, setAmountPaid] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passengerName,
          routeId,
          vehicleId,
          seatNumber,
          status,
          amountPaid: Number(amountPaid),
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to add booking');
      }

      setPassengerName('');
      setRouteId('');
      setVehicleId('');
      setSeatNumber('');
      setStatus('pending');
      setAmountPaid('');
      setMessage('Booking added successfully!');
    } catch (err) {
      setMessage((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Booking</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Passenger Name</label>
          <input
            type="text"
            className="form-control"
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Route ID</label>
          <input
            type="text"
            className="form-control"
            value={routeId}
            onChange={(e) => setRouteId(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Vehicle ID</label>
          <input
            type="text"
            className="form-control"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Seat Number</label>
          <input
            type="text"
            className="form-control"
            value={seatNumber}
            onChange={(e) => setSeatNumber(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Amount Paid</label>
          <input
            type="number"
            className="form-control"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            min={0}
            required
          />
        </div>

        <button type="submit" className="btn btn-warning" disabled={loading}>
          {loading ? 'Adding...' : 'Add Booking'}
        </button>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default AddBooking;
