import express from 'express';
import {
  createSchedule,
  getSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
  getSchedulesCount
} from '../controllers/scheduleController.js';

const router = express.Router();

router.post('/createSchedule', createSchedule);
router.get('/getSchedules', getSchedules);
router.get('/getSchedules/:id', getScheduleById);
router.put('/update/:id', updateSchedule);
router.delete('/delete/:id', deleteSchedule);
router.get('/schedule/count', getSchedulesCount);

// ✅ Use default export
export default router;
