import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createVehicle, getVehicle, updateVehicle } from '../../services/vehicleService';

const AddVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    registrationNumber: '',
    route: '',
    numberOfSeats: '', // string for input compatibility
    model: '',
    status: 'active',
  });

  useEffect(() => {
    const load = async () => {
      if (id) {
        const v = await getVehicle(id);
        setForm({
          ...v,
          numberOfSeats: v.numberOfSeats.toString(), // convert number to string for input
        });
      }
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
          name="registrationNumber"
          value={form.registrationNumber}
          onChange={handleChange}
          placeholder="Registration Number"
          className="form-control mb-2"
          required
        />
        <input
          name="route"
          value={form.route}
          onChange={handleChange}
          placeholder="Route"
          className="form-control mb-2"
          required
        />
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
