import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: [true, 'Vehicle number is required'], unique: true },
  route: { type: String, required: [true, 'Route is required'] },
  numberOfSeats: { type: Number, required: [true, 'Number of seats is required'] },
  model: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle;
