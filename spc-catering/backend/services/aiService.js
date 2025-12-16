const MenuItem = require("../models/MenuItem");

async function generateMenuRecommendation({
  eventType,
  guests,
  preferences,
  dietaryRestrictions
}) {
  const allItems = await MenuItem.find();

  // 1. Determine estimated budget automatically
  let baseCostPerPerson = 350;

  if (eventType.toLowerCase().includes("wedding")) baseCostPerPerson = 600;
  else if (eventType.toLowerCase().includes("corporate")) baseCostPerPerson = 400;
  else if (eventType.toLowerCase().includes("birthday")) baseCostPerPerson = 300;

  const estimatedBudget = baseCostPerPerson * guests;

  // 2. Filter based on veg preferences
  let filtered = [...allItems];
  if (dietaryRestrictions?.toLowerCase().includes("veg")) {
    filtered = filtered.filter((i) => i.veg);
  }

  // 3. Score based on taste keywords
  const prefText = preferences.toLowerCase();
  function scoreItem(item) {
    let score = 0;
    if (prefText.includes("spicy") && item.tags?.includes("spicy")) score += 2;
    if (prefText.includes("south") && item.tags?.includes("south indian")) score += 2;
    if (prefText.includes("north") && item.tags?.includes("north indian")) score += 2;
    return score;
  }

  const scored = filtered
    .map((item) => ({ item, score: scoreItem(item) }))
    .sort((a, b) => b.score - a.score);

  // 4. Select best combination within budget
  let totalCostPerPerson = 0;
  const selectedItems = [];

  for (const s of scored) {
    if (totalCostPerPerson + s.item.pricePerPerson <= baseCostPerPerson * 1.4) {
      totalCostPerPerson += s.item.pricePerPerson;
      selectedItems.push(s.item.name);
    }
  }

  // Return clean output
  return {
    estimatedBudget,
    perPersonCost: totalCostPerPerson,
    items: selectedItems
  };
}

module.exports = { generateMenuRecommendation };
