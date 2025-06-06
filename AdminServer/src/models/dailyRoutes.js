import mongoose from 'mongoose';

const DailyRoutesSchema = new mongoose.Schema({
  routeNumber: { type: String, required: true, unique: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  distance: { type: String, required: true }, 
  duration: { type: String, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

const DailyRoutes = mongoose.model('DailyRoutes', DailyRoutesSchema);
export default DailyRoutes;
