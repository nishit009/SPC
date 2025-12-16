// backend/seedMenu.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import MenuItem from "./models/MenuItem.js";
import menuData from "./menuSeed.json" with { type: "json" };

dotenv.config();

async function seedMenu() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    await MenuItem.deleteMany();
    console.log("Old menu cleared");

    await MenuItem.insertMany(menuData);
    console.log("Menu inserted successfully!");

    process.exit();
  } catch (err) {
    console.error("Error seeding menu:", err);
    process.exit(1);
  }
}

seedMenu();
