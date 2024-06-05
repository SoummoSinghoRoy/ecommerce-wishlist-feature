import { Schema, model } from 'mongoose';
import { IUser } from '../Types/types';


const userSchema= new Schema<IUser> ({
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
}, {
  timestamps: true
})

const User = model<IUser>('User', userSchema);

export default User;