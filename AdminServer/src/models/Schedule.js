import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  availableSeats: { type: Number, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

const Schedule = mongoose.model('Schedule', scheduleSchema);

// ✅ Use ESM default export
export default Schedule;
