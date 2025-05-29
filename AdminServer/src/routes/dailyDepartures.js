import express from 'express';
import {
  createDailyDeparture,
  getDailyDeparture,
  getDailyDepartureById,
  updateDailyDeparture,
  deleteDailyDeparture,
  getDailyDeparturesCount
} from '../controllers/dailyDepartures.js';

const router = express.Router();

router.post('/createDailyDeparture', createDailyDeparture);
router.get('/getDailyDepartures', getDailyDeparture);
router.get('/getDailyDeparture/:id', getDailyDepartureById);
router.put('/updateDailyDeparture/:id', updateDailyDeparture);
router.delete('/deleteDailyDeparture/:id', deleteDailyDeparture);
router.get('/DailyDeparture/count', getDailyDeparturesCount);

// ✅ Use default export
export default router;
