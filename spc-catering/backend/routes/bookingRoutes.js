// backend/routes/bookingRoutes.js
const express = require("express");
const Booking = require("../models/Booking");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { generateMenuRecommendation } = require("../services/aiService");

const router = express.Router();
const PDFDocument = require("pdfkit");

// User: create booking + get AI recommendation
router.post("/", protect, async (req, res) => {
  try {
    const { eventType, eventDate, venue, guests, preferences, dietaryRestrictions } =
      req.body;

    const recommendedMenu = await generateMenuRecommendation({
      eventType,
      guests,
      preferences,
      dietaryRestrictions
    });

    const booking = await Booking.create({
      user: req.user._id,
      eventType,
      eventDate,
      venue,
      guests,
      estimatedBudget: recommendedMenu.estimatedBudget,
      preferences,
      dietaryRestrictions,
      recommendedMenu,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Failed to create booking", error: err.message });
  }
});

// User: get own bookings
router.get("/my", protect, async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id });
  res.json(bookings);
});

// Admin: get all
router.get("/", protect, adminOnly, async (req, res) => {
  const bookings = await Booking.find().populate("user");
  res.json(bookings);
});

// Admin: update status
router.patch("/:id/status", protect, adminOnly, async (req, res) => {
  const { status } = req.body;
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  ).populate("user");
  res.json(booking);
});
// GET /api/bookings/:id/proposal
router.get("/:id/proposal", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("user");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Allow admin or the booking's user
    if (
      req.user.role !== "admin" &&
      booking.user._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="proposal-${booking._id}.pdf"`
    );

    doc.pipe(res);

    // Title
    doc.fontSize(20).text("Catering Proposal", { align: "center" });
    doc.moveDown();

    // Client & Event info
    doc.fontSize(12).text(`Client: ${booking.user.name}`);
    doc.text(`Email: ${booking.user.email}`);
    doc.text(`Event Type: ${booking.eventType}`);
    doc.text(`Date: ${new Date(booking.eventDate).toLocaleDateString()}`);
    doc.text(`Venue: ${booking.venue}`);
    doc.text(`Guests: ${booking.guests}`);
    doc.moveDown();

    doc.text(
      `Estimated Budget: ₹${booking.recommendedMenu?.estimatedBudget || booking.estimatedBudget}`
    );
    doc.text(
      `Approx. Cost / Person: ₹${booking.recommendedMenu?.perPersonCost || ""}`
    );
    doc.moveDown();

    doc.fontSize(14).text("Recommended Menu:", { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12);

    if (booking.recommendedMenu?.items?.length) {
      booking.recommendedMenu.items.forEach((item) => {
        doc.text(`• ${item}`);
      });
    } else {
      doc.text("No menu items recorded.");
    }

    doc.moveDown();
    doc.fontSize(10).fillColor("gray").text(
      "Note: This is an automatically generated proposal based on your preferences and guest count.",
      { align: "left" }
    );

    doc.end();
  } catch (err) {
    console.error("PDF error:", err);
    res.status(500).json({ message: "Failed to generate proposal" });
  }
});

module.exports = router;
