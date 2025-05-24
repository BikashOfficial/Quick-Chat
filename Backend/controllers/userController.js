import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utis.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password || !bio) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.json({ success: false, message: "Account already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    const token = generateToken(newUser._id);

    res.json({
      success: true,
      userData: newUser,
      token,
      message: "Account Created",
    });
  } catch (error) {
    console.log(error.message);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Password or Email is Missing",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User Doesn't exists." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      userData: user,
      token,
      message: "Logged in ",
    });
  } catch (error) {
    console.log(error.message);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

//user authntication
export const authUser = (req, res) => {
  res.json({ success: true, user: req.user });
};

//update Profile
export const updateProfile = async (req, res) => {
  try {
    const { profilePic, bio, fullName } = req.body;
    const userId = req.user._id;
    let updatedUser;

    if (!profilePic) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { bio, fullName },
        { new: true }
      ).select("-password");
    } else {
      try {
        // Upload to cloudinary
        const upload = await cloudinary.uploader.upload(profilePic, {
          folder: "chat_app_profiles",
          width: 500,
          crop: "scale",
        });

        if (!upload || !upload.secure_url) {
          throw new Error("Failed to upload image");
        }

        // Update user with the secure URL
        updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            profilePic: upload.secure_url,
            bio,
            fullName,
          },
          { new: true }
        ).select("-password");
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.json({
          success: false,
          message: "Failed to upload profile picture. Please try again.",
        });
      }
    }

    if (!updatedUser) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Update profile error:", error);
    res.json({
      success: false,
      message: `Unable to update the user data: ${error.message}`,
    });
  }
};
