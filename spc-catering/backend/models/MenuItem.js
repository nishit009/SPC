// backend/models/MenuItem.js
const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true }, // Starters, Main Course, Desserts, Beverages
    description: String,
    pricePerPerson: { type: Number, required: true },
    veg: { type: Boolean, default: true },
    tags: [String] // spicy, north indian, chinese, etc.
  },
  { timestamps: true }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
