import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
