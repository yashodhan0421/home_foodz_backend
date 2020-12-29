import mongoose from 'mongoose';

// user Schema
const AuthSchema = new mongoose.Schema({
  user_id: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: true,
    required: true
  }
});

export default mongoose.model('Auth', AuthSchema);
