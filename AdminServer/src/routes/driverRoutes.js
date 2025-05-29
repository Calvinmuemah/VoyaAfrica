import express from 'express';
import Driver from '../models/Driver.js';
import Vehicle from '../models/Vehicle.js';

const router = express.Router();

// Create a driver
router.post('/createDriver', async (req, res) => {
  try {
    const { name, phone, licenseNumber, assignedVehicle } = req.body;
    const vehicle = await Vehicle.findById(assignedVehicle);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    const driver = new Driver({ name, phone, licenseNumber, assignedVehicle });
    await driver.save();
    res.status(201).json(driver);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all drivers
router.get('/getDriver', async (req, res) => {
  try {
    const drivers = await Driver.find().populate('assignedVehicle');
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a driver
router.delete('/delete/:id', async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.json({ message: 'Driver deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//DriversCount
router.get('/driversCount', async (req, res) => {
  try {
    const count = await Driver.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Failed to count Drivers', err);
    res.status(500).json({ error: 'Failed to count Drivers' });
  }
});
export default router;
