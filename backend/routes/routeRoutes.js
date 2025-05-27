const express = require('express');
const {
  createRoute,
  getRoutes,
  getRouteById,
  updateRoute,
} = require('../controllers/routeController');
const { protect, admin } = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, admin, createRoute)
  .get(getRoutes);

router.route('/:id')
  .get(getRouteById)
  .put(protect, admin, updateRoute);

module.exports = router;