import express from 'express';
import {
  getRoutes,
  getRoute,
  createRoute,
  updateRoute,
  deleteRoute,
} from '../controllers/routeController.js';

const router = express.Router();

router.get('/getRoutes', getRoutes);
router.get('/getRoutes/:id', getRoute);
router.post('/createRoutes', createRoute);
router.put('/update/:id', updateRoute);
// router.delete('/delete/:routeNumber', deleteRoute);
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
