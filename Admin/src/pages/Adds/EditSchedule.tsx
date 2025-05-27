import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getScheduleById, updateSchedule } from '../../services/scheduleService';
import { getVehicles } from '../../services/vehicleService';
import getRoutes from '../../services/routeService';
import { getDrivers } from '../../services/driverService';

const EditSchedule: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    route: '',
    vehicle: '',
    driver: '',
    departureTime: '',
    arrivalTime: '',
    availableSeats: ''
  });

  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [schedule, routesData, vehiclesData, driversData] = await Promise.all([
        getScheduleById(id!),
        getRoutes(),
        getVehicles(),
        getDrivers()
      ]);

      setFormData({
        route: schedule.route._id,
        vehicle: schedule.vehicle._id,
        driver: schedule.driver._id,
        departureTime: schedule.departureTime.slice(0, 16),
        arrivalTime: schedule.arrivalTime.slice(0, 16),
        availableSeats: schedule.availableSeats
      });

      setRoutes(routesData);
      setVehicles(vehiclesData);
      setDrivers(driversData);
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSchedule(id!, formData);
    navigate('/schedules');
  };

  return (
    <div className="container mt-4">
      <h2>Edit Schedule</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Route</label>
          <select name="route" className="form-select" value={formData.route} onChange={handleChange}>
            {routes.map((r: any) => (
              <option key={r._id} value={r._id}>
                {r.from} → {r.to}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Vehicle</label>
          <select name="vehicle" className="form-select" value={formData.vehicle} onChange={handleChange}>
            {vehicles.map((v: any) => (
              <option key={v._id} value={v._id}>
                {v.vehicleNumber}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Driver</label>
          <select name="driver" className="form-select" value={formData.driver} onChange={handleChange}>
            {drivers.map((d: any) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Departure Time</label>
          <input
            type="datetime-local"
            name="departureTime"
            className="form-control"
            value={formData.departureTime}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Arrival Time</label>
          <input
            type="datetime-local"
            name="arrivalTime"
            className="form-control"
            value={formData.arrivalTime}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Available Seats</label>
          <input
            type="number"
            name="availableSeats"
            className="form-control"
            value={formData.availableSeats}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success">Update Schedule</button>
      </form>
    </div>
  );
};

export default EditSchedule;
