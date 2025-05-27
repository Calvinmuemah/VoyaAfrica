import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getVehicles, deleteVehicle } from '../../services/vehicleService';

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  const loadVehicles = async () => {
    const data = await getVehicles();
    setVehicles(data);
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteVehicle(id);
    loadVehicles();
  };

  return (
    <div>
      <h3>Vehicles</h3>
      <Link to="/vehicles/new" className="btn btn-primary mb-3">Add Vehicle</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Number</th>
            <th>Route</th>
            <th>Seats</th>
            <th>Model</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v: any) => (
            <tr key={v._id}>
              <td>{v.vehicleNumber}</td>
              <td>{v.route}</td>
              <td>{v.numberOfSeats}</td>
              <td>{v.model}</td>
              <td>{v.status}</td>
              <td>
                <Link to={`/vehicles/${v._id}/edit`} className="btn btn-sm btn-secondary me-2">Edit</Link>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(v._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminVehicles;
