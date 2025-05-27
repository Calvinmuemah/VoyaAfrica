import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDrivers, deleteDriver, toggleDriverStatus } from '../../services/driverService';

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    const data = await getDrivers();
    setDrivers(data);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this driver?')) {
      await deleteDriver(id);
      fetchDrivers();
    }
  };

  const handleAddDriver = () => {
    navigate('/drivers/new');
  };

  const handleEdit = (id: string) => {
    navigate(`/drivers/edit/${id}`);
  };

  const handleView = (id: string) => {
    navigate(`/drivers/view/${id}`);
  };

  const handleAssignVehicle = (id: string) => {
    navigate(`/drivers/assign-vehicle/${id}`);
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    // Assuming toggleDriverStatus switches active/inactive
    await toggleDriverStatus(id, !currentStatus);
    fetchDrivers();
  };

  return (
    <div>
      <h2>Drivers</h2>
      <button onClick={handleAddDriver} className="btn btn-primary mb-3">
        Add Driver
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>License</th>
            <th>Vehicle</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver: any) => (
            <tr key={driver._id}>
              <td>{driver.name}</td>
              <td>{driver.phone}</td>
              <td>{driver.licenseNumber}</td>
              <td>{driver.assignedVehicle?.vehicleNumber || '-'}</td>
              <td>{driver.active ? 'Active' : 'Inactive'}</td>
              <td>
                <button onClick={() => handleView(driver._id)} className="btn btn-info btn-sm me-1">
                  View
                </button>
                <button onClick={() => handleEdit(driver._id)} className="btn btn-warning btn-sm me-1">
                  Edit
                </button>
                <button onClick={() => handleAssignVehicle(driver._id)} className="btn btn-secondary btn-sm me-1">
                  Assign Vehicle
                </button>
                <button
                  onClick={() => handleToggleActive(driver._id, driver.active)}
                  className={`btn btn-sm me-1 ${driver.active ? 'btn-outline-danger' : 'btn-outline-success'}`}
                >
                  {driver.active ? 'Deactivate' : 'Activate'}
                </button>
                <button onClick={() => handleDelete(driver._id)} className="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverList;
