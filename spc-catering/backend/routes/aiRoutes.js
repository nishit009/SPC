// backend/routes/aiRoutes.js
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { generateMenuRecommendation } = require("../services/aiService");

const router = express.Router();

router.post("/recommend", protect, async (req, res) => {
  try {
    const recommendedMenu = await generateMenuRecommendation(req.body);
    res.json(recommendedMenu);
  } catch (err) {
    res.status(500).json({ message: "AI recommendation failed", error: err.message });
  }
});

module.exports = router;
