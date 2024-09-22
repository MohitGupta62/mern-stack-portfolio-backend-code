import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// User schema define kar rahe hain
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Name Required!"],
  },
  email: {
    type: String,
    required: [true, "Email Required!"],
  },
  phone: {
    type: String,
    required: [true, "Phone number Required!"],
  },
  aboutMe: {
    type: String,
    required: [true, "About me field us Required!"],
  },
  password: {
    type: String,
    required: [true, "Password is Required!"],
    minLength: [0, "Password must contain at least 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  portfolioURL: {
    type: String,
    required: [true, "Portfolio URL is Required!"],
  },
  githubURL: String,
  instagramURL: String,
  facebookURL: String,
  twitterURL: String,
  linkdinURL: String,
  resetPasswordToken: String, //Password reset token
  resetPasswordExpire: Date, // Reset token ka expiry date
});

// Save karne se pehle password ko hash karna
userSchema.pre("save", async function (next) {
  // Agar password modify nahi hua, toh next middleware mein move karna
  if (!this.isModified("password")) {
    next();
  }
  // Password ko hash karna salt factor 10 ke saath
  this.password = await bcrypt.hash(this.password, 10);
});

// Entered password ko hashed password se compare karne ka method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// JSON Web Token generate karne ka method
userSchema.methods.generateJsonWebToken = function () {
  // Payload mein user ka ID rahega
  const payload = { id: this._id };

  // JWT sign karna with payload, secret key aur options
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Method to generate karne ke liye reset password token user ke liye
userSchema.methods.getResetPasswordToken = function () {
  // Crypto ka use karke random token generate karte hain
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Random token ko SHA-256 ka use karke hash karte hain aur resetPasswordToken field mein store karte hain
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Reset password token ka expiration time 15 minutes baad ka set karte hain
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  // Plain reset token (jo hash nahi hua hai) return karte hain
  return resetToken;
};

// User model create aur export kar rahe hain userSchema ke basis par
export const User = mongoose.model("User", userSchema);
