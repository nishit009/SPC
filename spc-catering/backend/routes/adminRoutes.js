// backend/routes/adminRoutes.js
const express = require("express");
const Booking = require("../models/Booking");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/admin/stats
router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const completedBookings = await Booking.countDocuments({ status: "completed" });
    const pendingBookings = await Booking.countDocuments({ status: "pending" });

    const upcomingBookings = await Booking.countDocuments({
      eventDate: { $gte: new Date() }
    });

    // sum of estimated budgets
    const agg = await Booking.aggregate([
      { $group: { _id: null, totalEstimated: { $sum: "$estimatedBudget" } } }
    ]);

    const totalEstimated = agg[0]?.totalEstimated || 0;

    res.json({
      totalBookings,
      completedBookings,
      pendingBookings,
      upcomingBookings,
      totalEstimated
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats", error: err.message });
  }
});

module.exports = router;
