import mongoose from 'mongoose';

const OtpSchema = new mongoose.Schema({
  user_id: {
    type: String,
    unique: true,
    required: true
  },
  otp: {
    type: Number,
    unique: true,
    required: true
  },
  verified: {
    type: Boolean,
    default: false,
    required: true
  }
});

export default mongoose.model('Otp', OtpSchema);
