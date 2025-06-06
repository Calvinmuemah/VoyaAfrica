import DailyRoutes from '../models/dailyRoutes.js';

// GET all DailyRoutes
// export const getDailyRoutes = async (req, res) => {
//   try {
//     const DailyRoutes = await DailyRoutes.find().sort({ createdAt: -1 });
//     res.json(DailyRoutes);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch DailyRoutes' });
//   }
// };
export const getDailyRoutes = async (req, res) => {
  try {
    const DailyRoute = await DailyRoutes.find().sort({ createdAt: -1 });
    res.json(DailyRoute);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch DailyRoutes' });
  }
};
// GET a single DailyRoute
export const getRoute = async (req, res) => {
  try {
    const DailyRoutes = await DailyRoutes.findById(req.params.id);
    if (!DailyRoutes) return res.status(404).json({ error: 'DailyRoute not found' });
    res.json(DailyRoutes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch DailyRoute' });
  }
};

// CREATE a new DailyRoutes
export const createDailyRoutes = async (req, res) => {
  try {
    const { routeNumber, origin, destination, description, imageUrl, distance,
      duration, price } = req.body;
    console.log('Received DailyRoutes data:', req.body);
    const newDailyRoute = new DailyRoutes({
      routeNumber,
      origin,
      destination,
      description,
      imageUrl,
      distance,
      duration,
      price
    });

    const savedDailyRoute = await newDailyRoute.save();
    res.status(201).json(savedDailyRoute);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE a DailyRoutes
export const updateDailyRoute = async (req, res) => {
  try {
    const updatedDailyRoute = await DailyRoutes.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDailyRoute) return res.status(404).json({ error: 'DailyRoutes not found' });
    res.json(updatedDailyRoute);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE a DailyRoutes
export const deleteDailyRoutes = async (req, res) => {
  try {
    const { routeNumber } = req.params;
    const deleted = await DailyRoutes.findOneAndDelete({ routeNumber });

    if (!deleted) {
      return res.status(404).json({ error: 'DailyRoutes not found' });
    }

    res.json({ message: 'DailyRoutes deleted successfully' });
  } catch (err) {
    console.error('Error deleting DailyRoutes:', err);
    res.status(500).json({ error: 'Failed to delete DailyRoutes' });
  }
};

// Count all routes
export const getDailyRoutesCount = async (req, res) => {
  try {
    const count = await DailyRoutes.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Failed to count DailyRoutes', err);
    res.status(500).json({ error: 'Failed to count DailyRoutes' });
  }
};

