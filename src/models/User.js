const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    shopifyAdminAccessToken: {
      type: String,
      trim: true,
    },
    apiAccessToken: {
      type: String,
      trim: true,
    },
    apiKey: {
      type: String,
      trim: true,
    },
    shopifyDomain: {
      type: String,
      trim: true,
      match: [/\.myshopify\.com$/, "Shopify domain must end with .myshopify.com"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    storefrontApi: {
      type: String,
      trim: true,
    },
    mobile: {
      type: String,
      trim: true,
      match: [/^\+?\d{10,15}$/, "Please enter a valid mobile number"],
    },
    // New fields added below
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      postalCode: { type: String, trim: true },
      country: { type: String, trim: true },
    },
    profilePicture: {
      type: String,
      trim: true,
      default: null,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);