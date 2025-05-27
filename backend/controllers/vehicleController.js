const Vehicle = require('../models/vehicleModel');

// @desc    Register a new vehicle
// @route   POST /api/vehicles
// @access  Private/Admin
const registerVehicle = async (req, res) => {
  try {
    const {
      registrationNumber,
      driver,
      capacity,
      vehicleType,
      currentLocation,
      route,
    } = req.body;

    const vehicleExists = await Vehicle.findOne({ registrationNumber });

    if (vehicleExists) {
      res.status(400);
      throw new Error('Vehicle already registered');
    }

    const vehicle = await Vehicle.create({
      registrationNumber,
      driver,
      capacity,
      vehicleType,
      currentLocation,
      route,
    });

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all vehicles
// @route   GET /api/vehicles
// @access  Public
const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({})
      .populate('driver', 'name phoneNumber')
      .populate('route', 'name startLocation endLocation');
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get vehicle by ID
// @route   GET /api/vehicles/:id
// @access  Public
const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
      .populate('driver', 'name phoneNumber')
      .populate('route', 'name startLocation endLocation');

    if (vehicle) {
      res.json(vehicle);
    } else {
      res.status(404);
      throw new Error('Vehicle not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Update vehicle location
// @route   PUT /api/vehicles/:id/location
// @access  Private
const updateVehicleLocation = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (vehicle) {
      vehicle.currentLocation = req.body.currentLocation;
      const updatedVehicle = await vehicle.save();
      res.json(updatedVehicle);
    } else {
      res.status(404);
      throw new Error('Vehicle not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  registerVehicle,
  getVehicles,
  getVehicleById,
  updateVehicleLocation,
};