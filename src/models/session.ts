import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  user_id: {
    type: String,
    unique: true,
    required: true
  },
  session_token: {
    type: [String]
  }
});

export default mongoose.model('Session', SessionSchema);
