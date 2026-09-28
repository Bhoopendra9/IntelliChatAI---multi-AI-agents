import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true },
);

const User = mongoose.Model.user || mongoose.model("User", userSchema);

export default User;
