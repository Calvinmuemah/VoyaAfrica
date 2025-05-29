import express from 'express';
import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  getVehiclesCount
} from '../controllers/vehicleController.js';

const router = express.Router();

router.post('/createVehicle', createVehicle);
router.get('/getVehicle', getVehicles);
router.get('/getVehicle/:id', getVehicleById);
router.put('/update/:id', updateVehicle);
router.delete('/delete/:id', deleteVehicle);
router.get('/vehicle/count', getVehiclesCount);

export default router;
