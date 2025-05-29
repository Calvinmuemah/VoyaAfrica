import express from 'express';
import {
  getDailyRoutes,
  getRoute,
  createDailyRoutes,
  updateDailyRoute,
//   deleteDailyRoutes,
  getDailyRoutesCount,
} from '../controllers/dailyRoutes.js';

const router = express.Router();

router.get('/getDailyRoutes', getDailyRoutes);
router.get('/getDailyRoute/:id', getRoute);
router.post('/createDailyRoutes', createDailyRoutes);
router.put('/updateDailyRoute/:id', updateDailyRoute);
router.get('/getDailyRoutesCount/count', getDailyRoutesCount);

// router.delete('/delete/:routeNumber', deleteDailyRoutes);
router.delete('/delete/:routeNumber', async (req, res) => {
  try {
    const { routeNumber } = req.params;

    const deletedRoute = await RouteModel.findOneAndDelete({ routeNumber });

    if (!deletedRoute) {
      return res.status(404).json({ message: 'Route not found' });
    }

    res.status(200).json({ message: 'Route deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
