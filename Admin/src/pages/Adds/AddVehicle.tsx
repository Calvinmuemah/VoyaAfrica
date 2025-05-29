import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createVehicle, getVehicle, updateVehicle } from '../../services/vehicleService';
import routeService from '../../services/routeService';

const AddVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [routes, setRoutes] = useState([]); // <-- for dropdown
  const [form, setForm] = useState({
    vehicleNumber: '',
    route: '',
    numberOfSeats: '',
    model: '',
    status: 'active',
  });

  useEffect(() => {
    const load = async () => {
      if (id) {
        const v = await getVehicle(id);
        setForm({
          ...v,
          numberOfSeats: v.numberOfSeats.toString(),
        });
      }

      // Load available routes
      const fetchedRoutes = await routeService.getAllRoutes();

      setRoutes(fetchedRoutes);
    };
    load();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numberOfSeatsNum = Number(form.numberOfSeats);
    if (isNaN(numberOfSeatsNum) || numberOfSeatsNum <= 0) {
      alert('Please enter a valid number of seats.');
      return;
    }

    const payload = {
      ...form,
      numberOfSeats: numberOfSeatsNum,
    };

    try {
      if (id) {
        await updateVehicle(id, payload);
      } else {
        await createVehicle(payload);
      }
      navigate('/vehicles');
    } catch (err) {
      console.error('Vehicle save failed:', err);
      alert('Something went wrong while saving the vehicle.');
    }
  };

  return (
    <div>
      <h3>{id ? 'Edit' : 'Add'} Vehicle</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="vehicleNumber"
          value={form.vehicleNumber}
          onChange={handleChange}
          placeholder="Vehicle Number"
          className="form-control mb-2"
          required
        />

        {/* Route dropdown */}
        <select
          name="route"
          value={form.route}
          onChange={handleChange}
          className="form-control mb-2"
          required
        >
          <option value="">Select Route</option>
          {routes.map((route: any) => (
            <option key={route._id} value={route._id}>
              {route.routeNumber} - {route.startLocation} to {route.endLocation}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="numberOfSeats"
          value={form.numberOfSeats}
          onChange={handleChange}
          placeholder="Seats"
          className="form-control mb-2"
          required
          min="1"
        />
        <input
          name="model"
          value={form.model}
          onChange={handleChange}
          placeholder="Model"
          className="form-control mb-2"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="form-control mb-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button type="submit" className="btn btn-success">
          {id ? 'Update' : 'Add'} Vehicle
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;
