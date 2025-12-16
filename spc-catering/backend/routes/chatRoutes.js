// backend/routes/chatRoutes.js
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const MenuItem = require("../models/MenuItem");
const { generateMenuRecommendation } = require("../services/aiService");

const router = express.Router();

// POST /api/chat
router.post("/", protect, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ reply: "Please type your question." });
    }

    const lower = message.toLowerCase();

    // very simple extraction
    let guests = 50;
    const guestsMatch = lower.match(/(\d+)\s*(guests|people|persons)/);
    if (guestsMatch) {
      guests = Number(guestsMatch[1]);
    }

    let eventType = "event";
    if (lower.includes("wedding")) eventType = "wedding";
    else if (lower.includes("corporate")) eventType = "corporate";
    else if (lower.includes("birthday")) eventType = "birthday";

    let dietaryRestrictions = "";
    if (lower.includes("pure veg") || lower.includes("only veg")) {
      dietaryRestrictions = "pure veg";
    }

    const preferences = message; // free text

    const recommendation = await generateMenuRecommendation({
      eventType,
      guests,
      preferences,
      dietaryRestrictions
    });

    const reply =
      `Here's a suggested menu for a ${eventType} with ${guests} guests:\n` +
      recommendation.items.map((i) => `• ${i}`).join("\n") +
      `\nEstimated budget: ₹${recommendation.estimatedBudget}`;

    res.json({
      reply,
      metadata: {
        eventType,
        guests,
        dietaryRestrictions,
        recommendation
      }
    });
  } catch (err) {
    res.status(500).json({ reply: "Something went wrong. Try again later." });
  }
});

module.exports = router;
