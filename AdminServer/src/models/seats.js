// models/Schedule.js or .ts
const seatSchema = new mongoose.Schema({
  number: String,
  status: {
    type: String,
    enum: ['available', 'booked', 'unavailable'],
    default: 'available'
  },
  price: Number,
});

const scheduleSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
  seats: [seatSchema],
  // other fields
});

module.exports = mongoose.model('Schedule', scheduleSchema);
