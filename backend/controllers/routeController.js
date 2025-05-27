const Route = require('../models/routeModel');

// @desc    Create a new route
// @route   POST /api/routes
// @access  Private/Admin
const createRoute = async (req, res) => {
  try {
    const {
      name,
      startLocation,
      endLocation,
      stops,
      fare,
      estimatedDuration,
    } = req.body;

    const route = await Route.create({
      name,
      startLocation,
      endLocation,
      stops,
      fare,
      estimatedDuration,
    });

    res.status(201).json(route);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all routes
// @route   GET /api/routes
// @access  Public
const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find({});
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get route by ID
// @route   GET /api/routes/:id
// @access  Public
const getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);

    if (route) {
      res.json(route);
    } else {
      res.status(404);
      throw new Error('Route not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Update route
// @route   PUT /api/routes/:id
// @access  Private/Admin
const updateRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);

    if (route) {
      route.name = req.body.name || route.name;
      route.startLocation = req.body.startLocation || route.startLocation;
      route.endLocation = req.body.endLocation || route.endLocation;
      route.stops = req.body.stops || route.stops;
      route.fare = req.body.fare || route.fare;
      route.estimatedDuration = req.body.estimatedDuration || route.estimatedDuration;

      const updatedRoute = await route.save();
      res.json(updatedRoute);
    } else {
      res.status(404);
      throw new Error('Route not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createRoute,
  getRoutes,
  getRouteById,
  updateRoute,
};