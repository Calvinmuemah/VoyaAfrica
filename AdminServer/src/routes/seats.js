import express from 'express';
import Schedule from '../models/Schedule.js';
const router = express.Router();

// routes/schedules.js
router.get('/:id/seats', async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id).lean();
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });

    return res.json(schedule.seats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// routes/schedules.js
router.post('/:id/book', async (req, res) => {
  const { selectedSeats } = req.body; // Array of seat numbers like ["A1", "A2"]

  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });

    // Update seat status
    schedule.seats = schedule.seats.map(seat => {
      if (selectedSeats.includes(seat.number)) {
        if (seat.status === 'booked') throw new Error(`Seat ${seat.number} is already booked`);
        seat.status = 'booked';
      }
      return seat;
    });

    await schedule.save();
    res.json({ message: 'Seats booked successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
