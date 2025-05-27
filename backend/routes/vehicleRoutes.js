const express = require('express');
const {
  registerVehicle,
  getVehicles,
  getVehicleById,
  updateVehicleLocation,
} = require('../controllers/vehicleController');
const { protect, admin } = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, admin, registerVehicle)
  .get(getVehicles);

router.route('/:id')
  .get(getVehicleById);

router.route('/:id/location')
  .put(protect, updateVehicleLocation);

module.exports = router;