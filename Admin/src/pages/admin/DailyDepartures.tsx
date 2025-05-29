import React, { useEffect, useState } from 'react';
import { getSchedules, deleteSchedule } from '../../services/DailyDepartures';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, Plus } from 'lucide-react';

const DailyDepartures: React.FC = () => {
  const [schedules, setSchedules] = useState([]);

  const fetchSchedules = async () => {
    try {
      const data = await getSchedules();
      setSchedules(data);
    } catch (err) {
      console.error('Failed to fetch schedules:', err);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      await deleteSchedule(id);
      fetchSchedules(); // refresh
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Schedules</h2>
        <Link to="/createDailyDepartures" className="btn btn-primary">
          <Plus size={18} className="me-1" /> Add DailyDepartures
        </Link>
      </div>
      <div className="row">
        {schedules.map((schedule: any) => (
          <div className="col-md-4 mb-3" key={schedule._id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">
                  {schedule.route?.from} → {schedule.route?.to}
                </h5>
                <p><strong>Departure:</strong> {schedule.departureTime}</p>
                <p><strong>Arrival:</strong> {schedule.arrivalTime}</p>
                <p><strong>Available Seats:</strong> {schedule.availableSeats}</p>
                <p><strong>Driver:</strong> {schedule.driver?.name}</p>
                <p><strong>Vehicle:</strong> {schedule.vehicle?.vehicleNumber}</p>
                <div className="d-flex justify-content-between mt-3">
                  <Link to={`/schedules/edit/${schedule._id}`} className="btn btn-warning btn-sm">
                    <Pencil size={16} /> Edit
                  </Link>
                  <button onClick={() => handleDelete(schedule._id)} className="btn btn-danger btn-sm">
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyDepartures;
