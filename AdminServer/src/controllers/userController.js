import User from '../models/user.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // optionally exclude sensitive data
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users', details: error.message });
  }
};
