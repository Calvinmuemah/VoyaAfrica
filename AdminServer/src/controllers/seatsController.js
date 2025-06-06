// controllers/scheduleController.js
import Schedule from '../models/scheduleModel.js';
import Vehicle from '../models/Vehicle.js';

export const getScheduleWithVehicle = async (req, res) => {
  const { scheduleId } = req.query;

  try {
    const schedule = await Schedule.findById(scheduleId).populate('vehicle');

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    // Build response
    res.json({
      id: schedule._id,
      route: schedule.route,
      driver: schedule.driver,
      departureTime: schedule.departureTime,
      arrivalTime: schedule.arrivalTime,
      availableSeats: schedule.availableSeats,
      price: schedule.price,
      bookedSeats: schedule.bookedSeats || [],
      vehicle: {
        id: schedule.vehicle._id,
        type: schedule.vehicle.type,       // e.g. "bus", "van"
        capacity: schedule.vehicle.capacity,
      },
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
