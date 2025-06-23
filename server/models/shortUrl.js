import mongoose from 'mongoose';
//import user from './userModel';
const shortUrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  expiry: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  clicks: [
    {
      timestamp: { type: Date, default: Date.now },
      referrer: String,
      ip: String
    }
  ]
});

const shortUrl=mongoose.model('shortUrl',shortUrlSchema)

export default shortUrl