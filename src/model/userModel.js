import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: [true, 'Username already exists'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: [true, 'Email already exists'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
  },
  profilePhoto: {
    type: String,
    default:
      'https://res.cloudinary.com/dag9zpmoy/image/upload/v1713355124/u2wmvxzxslqhrox0ovsa.png',
  },
  location: {
    type: String,
    default: 'Earth',
  },
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
