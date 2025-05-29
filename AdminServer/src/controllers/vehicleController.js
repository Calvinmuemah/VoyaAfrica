import Vehicle from '../models/Vehicle.js';

export const createVehicle = async (req, res) => {
  try {
    console.log("Received payload:", req.body); // ADD THIS
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    console.error("Vehicle creation failed:", err.message); // ADD THIS
    res.status(400).json({ error: err.message });
  }
};


export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    res.json(vehicle);
  } catch (err) {
    res.status(404).json({ error: 'Vehicle not found' });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const updated = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// VehicleCount
export const getVehiclesCount = async (req, res) => {
  try {
    const count = await Vehicle.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Failed to count Vehicles', err);
    res.status(500).json({ error: 'Failed to count Vehicles' });
  }
};
