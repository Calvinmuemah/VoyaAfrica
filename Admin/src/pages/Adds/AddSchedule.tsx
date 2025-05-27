import React, { useState, useEffect } from 'react';
import { createSchedule } from '../../services/scheduleService';
import { getDrivers } from '../../services/driverService';
import { getVehicles } from '../../services/vehicleService';
import routeService from '../../services/routeService';

interface Driver {
  _id: string;
  name: string;
}

interface Vehicle {
  _id: string;
  number: string;
}

interface Route {
  _id: string;
  name: string;
}

const AddSchedule = () => {
  const [form, setForm] = useState({
    driver: '',
    vehicle: '',
    route: '',
    departureTime: '',
    arrivalTime: '',
    availableSeats: 0,
    price: 0,
  });

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
  getDrivers().then(setDrivers).catch(console.error);
  getVehicles().then(setVehicles).catch(console.error);
  routeService.getAllRoutes().then(setRoutes).catch(console.error);

}, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Parse numbers for seats and price
    if (name === 'availableSeats' || name === 'price') {
      setForm(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createSchedule(form);
      alert('Schedule added!');
      // Optionally reset form here
      setForm({
        driver: '',
        vehicle: '',
        route: '',
        departureTime: '',
        arrivalTime: '',
        availableSeats: 0,
        price: 0,
      });
    } catch (error) {
      console.error('Failed to create schedule:', error);
      alert('Failed to add schedule.');
    }
  };

  return (
    <div className="container">
      <h3>Add Schedule</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Driver</label>
          <select
            name="driver"
            className="form-control"
            value={form.driver}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            {drivers.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label>Vehicle</label>
          <select
            name="vehicle"
            className="form-control"
            value={form.vehicle}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            {vehicles.map((v) => (
              <option key={v._id} value={v._id}>
                {v.number}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label>Route</label>
          <select
            name="route"
            className="form-control"
            value={form.route}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            {routes.map((r) => (
              <option key={r._id} value={r._id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label>Departure Time</label>
          <input
            type="datetime-local"
            name="departureTime"
            className="form-control"
            value={form.departureTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <label>Arrival Time</label>
          <input
            type="datetime-local"
            name="arrivalTime"
            className="form-control"
            value={form.arrivalTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <label>Available Seats</label>
          <input
            type="number"
            name="availableSeats"
            className="form-control"
            value={form.availableSeats}
            onChange={handleChange}
            min={0}
            required
          />
        </div>

        <div className="mb-2">
          <label>Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={form.price}
            onChange={handleChange}
            min={0}
            step="0.01"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Schedule
        </button>
      </form>
    </div>
  );
};

export default AddSchedule;
