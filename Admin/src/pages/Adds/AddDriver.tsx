import React, { useEffect, useState } from 'react';
import { addDriver } from '../../services/driverService';
import { getVehicles } from '../../services/vehicleService';
import { useNavigate } from 'react-router-dom';

const AddDriver = () => {
  const [form, setForm] = useState({ name: '', phone: '', licenseNumber: '', assignedVehicle: '' });
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      const data = await getVehicles();
      setVehicles(data);
    };
    fetchVehicles();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await addDriver(form);
    navigate('/drivers');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Driver</h2>
      <div className="mb-3">
        <label>Name</label>
        <input name="name" className="form-control" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Phone</label>
        <input name="phone" className="form-control" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>License Number</label>
        <input name="licenseNumber" className="form-control" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Assign Vehicle</label>
        <select name="assignedVehicle" className="form-control" onChange={handleChange} required>
          <option value="">-- Select Vehicle --</option>
          {vehicles.map((v: any) => (
            <option key={v._id} value={v._id}>
              {v.vehicleNumber} ({v.route})
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary">Add Driver</button>
    </form>
  );
};

export default AddDriver;
