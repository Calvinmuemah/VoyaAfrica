import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
  routeNumber: { type: String, required: true, unique: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  description: { type: String },       // Route details
  imageUrl: { type: String },          // URL of the route image
}, { timestamps: true });

const Route = mongoose.model('Route', routeSchema);
export default Route;
