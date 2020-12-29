import mongoose from 'mongoose';

// user Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  }
});

export default mongoose.model('User', UserSchema);
