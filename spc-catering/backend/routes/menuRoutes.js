// backend/routes/menuRoutes.js
const express = require("express");
const MenuItem = require("../models/MenuItem");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Public: get menu
router.get("/", async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
});

// Admin: add item
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: "Invalid data", error: err.message });
  }
});

// Admin: update item
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
});

// Admin: delete item
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err.message });
  }
});

module.exports = router;
