import Schedule from '../models/Schedule.js';

// Create a new schedule
export const createSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.create(req.body);
    res.status(201).json(schedule);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create schedule', details: err.message });
  }
};

// Get all schedules
export const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate('vehicle')
      .populate('route')
      .populate('driver');
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch schedules', details: err.message });
  }
};

// Get schedule by ID
export const getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id)
      .populate('vehicle')
      .populate('route')
      .populate('driver');
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching schedule', details: err.message });
  }
};

// Update schedule
export const updateSchedule = async (req, res) => {
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSchedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    res.json(updatedSchedule);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update schedule', details: err.message });
  }
};

// Delete schedule
export const deleteSchedule = async (req, res) => {
  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!deletedSchedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    res.json({ message: 'Schedule deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete schedule', details: err.message });
  }
};

// SchedulesCount
export const getSchedulesCount = async (req, res) => {
  try {
    const count = await Schedule.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Failed to count Schedules:', err);
    res.status(500).json({ error: 'Failed to count Schedules' });
  }
};
