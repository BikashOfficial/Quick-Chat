import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      minlength: 1,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    profilePic: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User1", userSchema);

export default User;
