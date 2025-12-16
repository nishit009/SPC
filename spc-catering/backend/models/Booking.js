const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    eventType: { type: String, required: true },
    eventDate: { type: Date, required: true },
    venue: { type: String, required: true },
    guests: { type: Number, required: true },

    // Remove: budget from user input
    estimatedBudget: { type: Number, required: true },

    preferences: String,
    dietaryRestrictions: String,

    // NEW FORMAT
    recommendedMenu: {
      estimatedBudget: Number,
      perPersonCost: Number,
      items: [String]
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
