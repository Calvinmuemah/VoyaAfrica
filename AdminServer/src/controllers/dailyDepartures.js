import DailyDeparture from '../models/dailyDepartures.js';

// Create a new DailyDeparture
export const createDailyDeparture = async (req, res) => {
  try {
    const dailyDeparture = await DailyDeparture.create(req.body);
    res.status(201).json(dailyDeparture);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create DailyDeparture', details: err.message });
  }
};

// Get all DailyDepartures
export const getDailyDeparture = async (req, res) => {
  try {
    const dailyDeparture = await DailyDeparture.find()
      .populate('vehicleId')
      .populate('routeId')
    res.status(200).json(dailyDeparture);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch DailyDepartures', details: err.message });
  }
};

// Get DailyDeparture by ID
export const getDailyDepartureById = async (req, res) => {
  try {
    const dailyDeparture = await DailyDeparture.findById(req.params.id)
      populate('vehicleId')
      .populate('routeId')
    if (!dailyDeparture) {
      return res.status(404).json({ error: 'DailyDeparture not found' });
    }
    res.json(dailyDeparture);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching DailyDeparture', details: err.message });
  }
};

// Update DailyDeparture
export const updateDailyDeparture = async (req, res) => {
  try {
    const updatedDailyDeparture = await DailyDeparture.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDailyDeparture) {
      return res.status(404).json({ error: 'DailyDeparture not found' });
    }
    res.json(updatedDailyDeparture);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update DailyDeparture', details: err.message });
  }
};

// Delete DailyDeparture
export const deleteDailyDeparture = async (req, res) => {
  try {
    const deletedDailyDeparture = await DailyDeparture.findByIdAndDelete(req.params.id);
    if (!deletedDailyDeparture) {
      return res.status(404).json({ error: 'DailyDeparture not found' });
    }
    res.json({ message: 'DailyDeparture deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete DailyDeparture', details: err.message });
  }
};

// DailyDeparturesCount
export const getDailyDeparturesCount = async (req, res) => {
  try {
    const count = await DailyDeparture.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Failed to count DailyDepartures', err);
    res.status(500).json({ error: 'Failed to count DailyDepartures' });
  }
};
