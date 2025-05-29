import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  price: { type: Number, required: true },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  availableSeats: { type: Number, required: true },
  companyName: {type: String, required: true},
  vehicleType: {type: String, required: true}
}, { timestamps: true });

const DailyDepartures = mongoose.model('DailyDeparture', scheduleSchema);
export default DailyDepartures;
