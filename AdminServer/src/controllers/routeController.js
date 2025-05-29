import Route from '../models/routes.js';

// GET all routes
export const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find().sort({ createdAt: -1 });
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch routes' });
  }
};

// GET a single route
export const getRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) return res.status(404).json({ error: 'Route not found' });
    res.json(route);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch route' });
  }
};

// CREATE a new route
export const createRoute = async (req, res) => {
  try {
    const { routeNumber, origin, destination, description, imageUrl, distance,
      duration } = req.body;
    console.log('Received route data:', req.body);
    const newRoute = new Route({
      routeNumber,
      origin,
      destination,
      description,
      imageUrl,
      distance,
      duration
    });

    const savedRoute = await newRoute.save();
    res.status(201).json(savedRoute);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE a route
export const updateRoute = async (req, res) => {
  try {
    const updatedRoute = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoute) return res.status(404).json({ error: 'Route not found' });
    res.json(updatedRoute);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE a route
export const deleteRoute = async (req, res) => {
  try {
    const { routeNumber } = req.params;
    const deleted = await Route.findOneAndDelete({ routeNumber });

    if (!deleted) {
      return res.status(404).json({ error: 'Route not found' });
    }

    res.json({ message: 'Route deleted successfully' });
  } catch (err) {
    console.error('Error deleting route:', err);
    res.status(500).json({ error: 'Failed to delete route' });
  }
};

// Count all routes
export const getRoutesCount = async (req, res) => {
  try {
    const count = await Route.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Failed to count routes:', err);
    res.status(500).json({ error: 'Failed to count routes' });
  }
};

